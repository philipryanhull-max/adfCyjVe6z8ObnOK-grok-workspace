import { createRequire } from "node:module";
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { gzipSync } from "node:zlib";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

const require = createRequire(import.meta.url);
const occtFactory = require("occt-import-js");

const src = "/workspace/attachments/Josh David Espers 50 BRK 480.step";
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
  linearDeflection: 0.014,
  angularDeflection: 0.6,
});
log(`import success=${result.success} meshes=${result.meshes?.length ?? 0}`);
if (!result.success) process.exit(1);

const byColor = new Map();
for (const m of result.meshes) {
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
  const c = m.color ?? [0.72, 0.74, 0.73];
  const key = c.map((v) => Math.round(v * 32)).join(",");
  if (!byColor.has(key)) byColor.set(key, { color: c, geos: [] });
  byColor.get(key).geos.push(geo);
}
log(`grouped ${byColor.size} colors`);

// STEP/Inventor is Z-up. Bake a -90° X rotation so three.js Y-up is native.
const rot = new THREE.Matrix4().makeRotationX(-Math.PI / 2);
const nrmMat = new THREE.Matrix3().getNormalMatrix(rot);

const chunks = [];
let triTotal = 0;
let vertTotal = 0;
for (const { color, geos } of byColor.values()) {
  const merged = mergeGeometries(geos, false);
  if (!merged) continue;
  merged.applyMatrix4(rot);
  merged.computeVertexNormals();
  const pos = merged.attributes.position.array;
  const nrm = merged.attributes.normal.array;
  const idx = merged.index ? merged.index.array : null;
  const index = idx
    ? idx instanceof Uint32Array
      ? idx
      : Uint32Array.from(idx)
    : Uint32Array.from({ length: pos.length / 3 }, (_, i) => i);
  chunks.push({ color, pos: Float32Array.from(pos), nrm: Float32Array.from(nrm), index });
  triTotal += index.length / 3;
  vertTotal += pos.length / 3;
  merged.dispose();
  for (const g of geos) g.dispose();
}

log(`tessellation ${vertTotal.toLocaleString()} verts  ${triTotal.toLocaleString()} tris`);

// Custom binary: magic BRK1 | u32 count | per mesh { f32 r,g,b | u32 v | u32 i | pos | nrm | idx }
let byteLen = 8;
for (const c of chunks) {
  byteLen += 12 + 8 + c.pos.byteLength + c.nrm.byteLength + c.index.byteLength;
}
const out = new ArrayBuffer(byteLen);
const view = new DataView(out);
const u8 = new Uint8Array(out);
u8[0] = 0x42;
u8[1] = 0x52;
u8[2] = 0x4b;
u8[3] = 0x31;
view.setUint32(4, chunks.length, true);
let o = 8;
for (const c of chunks) {
  view.setFloat32(o, c.color[0], true);
  view.setFloat32(o + 4, c.color[1], true);
  view.setFloat32(o + 8, c.color[2], true);
  o += 12;
  view.setUint32(o, c.pos.length / 3, true);
  view.setUint32(o + 4, c.index.length, true);
  o += 8;
  u8.set(new Uint8Array(c.pos.buffer, c.pos.byteOffset, c.pos.byteLength), o);
  o += c.pos.byteLength;
  u8.set(new Uint8Array(c.nrm.buffer, c.nrm.byteOffset, c.nrm.byteLength), o);
  o += c.nrm.byteLength;
  u8.set(new Uint8Array(c.index.buffer, c.index.byteOffset, c.index.byteLength), o);
  o += c.index.byteLength;
}

const rawPath = `${outDir}/50-brk-480.bin`;
const gzPath = `${outDir}/50-brk-480.bin.gz`;
writeFileSync(rawPath, Buffer.from(out));
writeFileSync(gzPath, gzipSync(Buffer.from(out), { level: 9 }));
log(`raw ${(out.byteLength / 1e6).toFixed(2)} MB  gzip ${(Buffer.byteLength(gzipSync(Buffer.from(out), { level: 9 })) / 1e6).toFixed(2)} MB`);
log(`wrote ${rawPath}`);
