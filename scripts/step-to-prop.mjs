import { createRequire } from "node:module";
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { gzipSync } from "node:zlib";
import * as THREE from "three";
import { mergeGeometries, mergeVertices, toCreasedNormals } from "three/examples/jsm/utils/BufferGeometryUtils.js";

const require = createRequire(import.meta.url);
const occtFactory = require("occt-import-js");

const src = "/workspace/public/models/prop-simulator.step";
const outDir = "/workspace/public/models";
mkdirSync(outDir, { recursive: true });

const t0 = Date.now();
const log = (m) => console.log(`${((Date.now() - t0) / 1000).toFixed(1)}s  ${m}`);

const occt = await occtFactory();
log("occt ready");

const buf = readFileSync(src);
log(`read step ${(buf.length / 1e6).toFixed(1)} MB`);

const result = occt.ReadStepFile(new Uint8Array(buf), {
  linearUnit: "inch",
  linearDeflectionType: "bounding_box_ratio",
  linearDeflection: 0.04,
  angularDeflection: 0.7,
});
log(`import success=${result.success} meshes=${result.meshes?.length ?? 0}`);
if (!result.success) process.exit(1);

const meshGroup = new Int16Array(result.meshes.length);
meshGroup.fill(-1);

function classifyName(name) {
  const n = (name || "").toLowerCase();
  if (
    n.includes("guard") ||
    n.includes("back panel") ||
    n.includes("fren") ||
    n.includes("ben") ||
    n.includes("perf") ||
    n.includes("acrylic")
  ) {
    return 1;
  }
  if (
    n.includes("motor") ||
    n.includes("3502") ||
    n.includes("2764") ||
    n.includes("1346") ||
    n.includes("4453") ||
    n.includes("controller")
  ) {
    return 2;
  }
  return 0;
}

function walk(node, inherited) {
  const tagged = classifyName(node.name);
  const g = tagged ?? inherited;
  for (const mi of node.meshes || []) {
    if (meshGroup[mi] < 0) meshGroup[mi] = g ?? 0;
  }
  for (const ch of node.children || []) walk(ch, g);
}

walk(result.root, 0);

const counts = [0, 0, 0];
for (let i = 0; i < meshGroup.length; i++) {
  const g = meshGroup[i] < 0 ? 0 : meshGroup[i];
  meshGroup[i] = g;
  counts[g]++;
}
log(`meshes base=${counts[0]} guard=${counts[1]} drive=${counts[2]}`);

function steelify(c) {
  const luma = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  if (luma < 0.14) return c;
  const target = 0.24 + Math.min(1, (luma - 0.14) / 0.86) * 0.16;
  const s = target / luma;
  return [c[0] * s, c[1] * s, c[2] * s];
}

const buckets = new Map();
for (let i = 0; i < result.meshes.length; i++) {
  const m = result.meshes[i];
  if (!m.attributes?.position || !m.index) continue;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(m.attributes.position.array), 3),
  );
  if (m.attributes.normal) {
    geo.setAttribute(
      "normal",
      new THREE.BufferAttribute(new Float32Array(m.attributes.normal.array), 3),
    );
  } else {
    geo.computeVertexNormals();
  }
  geo.setIndex(Array.from(m.index.array));
  const group = meshGroup[i];
  const native = m.color;
  const c = steelify(native || [0.62, 0.62, 0.63]);
  const key = `${group}:${c.map((v) => Math.round(v * 32)).join(",")}`;
  if (!buckets.has(key)) buckets.set(key, { group, color: c, geos: [] });
  buckets.get(key).geos.push(geo);
}

const rot = new THREE.Matrix4().makeRotationX(-Math.PI / 2);
const chunks = [];
let triTotal = 0;
let vertTotal = 0;
for (const { group, color, geos } of buckets.values()) {
  const merged = mergeGeometries(geos, false);
  if (!merged) continue;
  merged.applyMatrix4(rot);
  const nVert = merged.attributes.position.count;
  let src;
  if (nVert > 28000) {
    // Perforated wrap: skip weld/crease so the viewer can load.
    src = merged;
    log(`skip crease group=${group} verts=${nVert}`);
  } else {
    const welded = mergeVertices(merged, 1.5e-4);
    merged.dispose();
    src = toCreasedNormals(welded, (42 * Math.PI) / 180);
    welded.dispose();
  }
  if (!src.attributes.normal) src.computeVertexNormals();
  const pos = src.attributes.position.array;
  const nrm = src.attributes.normal.array;
  const idx = src.index ? src.index.array : null;
  const index = idx
    ? idx instanceof Uint32Array
      ? idx
      : Uint32Array.from(idx)
    : Uint32Array.from({ length: pos.length / 3 }, (_, i) => i);
  chunks.push({
    group,
    color,
    pos: Float32Array.from(pos),
    nrm: Float32Array.from(nrm),
    index,
  });
  triTotal += index.length / 3;
  vertTotal += pos.length / 3;
  src.dispose();
  for (const g of geos) g.dispose();
}
log(`tessellation ${vertTotal.toLocaleString()} verts  ${triTotal.toLocaleString()} tris  chunks=${chunks.length}`);

let minX = Infinity, minY = Infinity, minZ = Infinity;
let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
for (const c of chunks) {
  const p = c.pos;
  for (let i = 0; i < p.length; i += 3) {
    minX = Math.min(minX, p[i]);
    minY = Math.min(minY, p[i + 1]);
    minZ = Math.min(minZ, p[i + 2]);
    maxX = Math.max(maxX, p[i]);
    maxY = Math.max(maxY, p[i + 1]);
    maxZ = Math.max(maxZ, p[i + 2]);
  }
}
const cx = (minX + maxX) * 0.5;
const cy = (minY + maxY) * 0.5;
const cz = (minZ + maxZ) * 0.5;
const hx = Math.max((maxX - minX) * 0.5, 1e-6);
const hy = Math.max((maxY - minY) * 0.5, 1e-6);
const hz = Math.max((maxZ - minZ) * 0.5, 1e-6);

function qpos(v, c, h) {
  return Math.max(-32767, Math.min(32767, Math.round(((v - c) / h) * 32767)));
}
function qn(v) {
  return Math.max(-32767, Math.min(32767, Math.round(v * 32767)));
}

const outChunks = [];
for (const c of chunks) {
  const verts = c.pos.length / 3;
  if (verts > 65535) {
    log(`warn chunk group=${c.group} verts=${verts} — splitting`);
  }
  let start = 0;
  const maxV = 65535;
  if (verts <= maxV) {
    outChunks.push(c);
  } else {
    // keep as-is if indices reference all verts; skip split (use first 65535 unique via remap later)
    outChunks.push(c);
  }
}

const ready = [];
for (const c of outChunks) {
  const verts = c.pos.length / 3;
  if (verts > 65535 || c.index.some((i) => i > 65535)) {
    // remap into 65535-sized pieces by triangle batches
    const map = new Map();
    let pos = [];
    let nrm = [];
    let idx = [];
    const flush = () => {
      if (!idx.length) return;
      ready.push({
        group: c.group,
        color: c.color,
        pos: Int16Array.from(pos),
        nrm: Int16Array.from(nrm),
        idx: Uint16Array.from(idx),
        ox: 0,
        oy: 0,
        oz: 0,
      });
      map.clear();
      pos = [];
      nrm = [];
      idx = [];
    };
    const take = (v) => {
      let nv = map.get(v);
      if (nv === undefined) {
        if (map.size >= 65535) return -1;
        nv = map.size;
        map.set(v, nv);
        pos.push(qpos(c.pos[v * 3], cx, hx), qpos(c.pos[v * 3 + 1], cy, hy), qpos(c.pos[v * 3 + 2], cz, hz));
        nrm.push(qn(c.nrm[v * 3]), qn(c.nrm[v * 3 + 1]), qn(c.nrm[v * 3 + 2]));
      }
      return nv;
    };
    for (let t = 0; t < c.index.length; t += 3) {
      const a0 = take(c.index[t]);
      const a1 = take(c.index[t + 1]);
      const a2 = take(c.index[t + 2]);
      if (a0 < 0 || a1 < 0 || a2 < 0) {
        flush();
        const b0 = take(c.index[t]);
        const b1 = take(c.index[t + 1]);
        const b2 = take(c.index[t + 2]);
        idx.push(b0, b1, b2);
      } else {
        idx.push(a0, a1, a2);
      }
    }
    flush();
  } else {
    const pq = new Int16Array(verts * 3);
    const nq = new Int16Array(verts * 3);
    let sx = 0, sy = 0, sz = 0;
    for (let i = 0; i < verts; i++) {
      pq[i * 3] = qpos(c.pos[i * 3], cx, hx);
      pq[i * 3 + 1] = qpos(c.pos[i * 3 + 1], cy, hy);
      pq[i * 3 + 2] = qpos(c.pos[i * 3 + 2], cz, hz);
      nq[i * 3] = qn(c.nrm[i * 3]);
      nq[i * 3 + 1] = qn(c.nrm[i * 3 + 1]);
      nq[i * 3 + 2] = qn(c.nrm[i * 3 + 2]);
      sx += pq[i * 3];
      sy += pq[i * 3 + 1];
      sz += pq[i * 3 + 2];
    }
    ready.push({
      group: c.group,
      color: c.color,
      pos: pq,
      nrm: nq,
      idx: Uint16Array.from(c.index),
      ox: sx / verts / 32767,
      oy: sy / verts / 32767,
      oz: sz / verts / 32767,
    });
  }
}

let byteLen = 32;
for (const c of ready) {
  byteLen += 28 + 8 + c.pos.byteLength + c.nrm.byteLength + c.idx.byteLength;
  byteLen = (byteLen + 3) & ~3;
}

const out = new ArrayBuffer(byteLen);
const dv = new DataView(out);
const u8 = new Uint8Array(out);
u8[0] = 0x42;
u8[1] = 0x52;
u8[2] = 0x4b;
u8[3] = 0x34; // BRK4
dv.setUint32(4, ready.length, true);
dv.setFloat32(8, cx, true);
dv.setFloat32(12, cy, true);
dv.setFloat32(16, cz, true);
dv.setFloat32(20, hx, true);
dv.setFloat32(24, hy, true);
dv.setFloat32(28, hz, true);
let o = 32;
for (const c of ready) {
  dv.setUint32(o, c.group, true);
  dv.setFloat32(o + 4, c.color[0], true);
  dv.setFloat32(o + 8, c.color[1], true);
  dv.setFloat32(o + 12, c.color[2], true);
  dv.setFloat32(o + 16, c.ox, true);
  dv.setFloat32(o + 20, c.oy, true);
  dv.setFloat32(o + 24, c.oz, true);
  o += 28;
  dv.setUint32(o, c.pos.length / 3, true);
  dv.setUint32(o + 4, c.idx.length, true);
  o += 8;
  u8.set(new Uint8Array(c.pos.buffer, c.pos.byteOffset, c.pos.byteLength), o);
  o += c.pos.byteLength;
  u8.set(new Uint8Array(c.nrm.buffer, c.nrm.byteOffset, c.nrm.byteLength), o);
  o += c.nrm.byteLength;
  u8.set(new Uint8Array(c.idx.buffer, c.idx.byteOffset, c.idx.byteLength), o);
  o += c.idx.byteLength;
  o = (o + 3) & ~3;
}

const gz = gzipSync(Buffer.from(out), { level: 9 });
writeFileSync(`${outDir}/prop-simulator.bin`, Buffer.from(out));
writeFileSync(`${outDir}/prop-simulator.bin.gz`, gz);
const byG = [0, 0, 0];
for (const c of ready) byG[c.group] += c.pos.length / 3;
log(
  JSON.stringify({
    chunks: ready.length,
    rawKB: +(out.byteLength / 1024).toFixed(1),
    gzipKB: +(gz.length / 1024).toFixed(1),
    verts: { base: byG[0], guard: byG[1], drive: byG[2] },
    envelopeIn: {
      x: +(hx * 2).toFixed(2),
      y: +(hy * 2).toFixed(2),
      z: +(hz * 2).toFixed(2),
    },
  }),
);
