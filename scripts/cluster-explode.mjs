import { readFileSync, writeFileSync } from "node:fs";
import { gzipSync } from "node:zlib";

const THRESH_IN = 12;
const MIN_VERTS = 24;

const buf = readFileSync("/workspace/public/models/50-brk-480.bin");
const src = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
const view = new DataView(src);
if (String.fromCharCode(view.getUint8(0), view.getUint8(1), view.getUint8(2), view.getUint8(3)) !== "BRK2") {
  throw new Error("expected BRK2");
}
const hx = view.getFloat32(20, true);
const hy = view.getFloat32(24, true);
const hz = view.getFloat32(28, true);
const cx = view.getFloat32(8, true);
const cy = view.getFloat32(12, true);
const cz = view.getFloat32(16, true);
const colorCount = view.getUint32(4, true);

function findFactory(parent) {
  return function find(a) {
    while (parent[a] !== a) {
      parent[a] = parent[parent[a]];
      a = parent[a];
    }
    return a;
  };
}

let o = 32;
const outChunks = [];

for (let ci = 0; ci < colorCount; ci++) {
  const r = view.getFloat32(o, true);
  const g = view.getFloat32(o + 4, true);
  const blue = view.getFloat32(o + 8, true);
  o += 12;
  const verts = view.getUint32(o, true);
  const idxCount = view.getUint32(o + 4, true);
  o += 8;
  const pos = new Int16Array(src, o, verts * 3);
  o += verts * 3 * 2;
  const nrm = new Int16Array(src, o, verts * 3);
  o += verts * 3 * 2;
  const idx = new Uint16Array(src, o, idxCount);
  o += idxCount * 2;
  o = (o + 3) & ~3;

  const parent = new Int32Array(verts);
  for (let v = 0; v < verts; v++) parent[v] = v;
  const find = findFactory(parent);
  const uni = (a, b) => {
    a = find(a);
    b = find(b);
    if (a !== b) parent[a] = b;
  };
  for (let t = 0; t < idx.length; t += 3) {
    uni(idx[t], idx[t + 1]);
    uni(idx[t + 1], idx[t + 2]);
  }

  const faces = new Map();
  for (let v = 0; v < verts; v++) {
    const root = find(v);
    let f = faces.get(root);
    if (!f) {
      f = { ids: [], x: 0, y: 0, z: 0 };
      faces.set(root, f);
    }
    f.ids.push(v);
    f.x += pos[v * 3];
    f.y += pos[v * 3 + 1];
    f.z += pos[v * 3 + 2];
  }
  const faceList = [...faces.values()].map((f) => ({
    ids: f.ids,
    wx: (f.x / f.ids.length / 32767) * hx,
    wy: (f.y / f.ids.length / 32767) * hy,
    wz: (f.z / f.ids.length / 32767) * hz,
  }));

  const n = faceList.length;
  const cp = new Int32Array(n);
  for (let i = 0; i < n; i++) cp[i] = i;
  const cfind = findFactory(cp);
  const t2 = THRESH_IN * THRESH_IN;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const dx = faceList[i].wx - faceList[j].wx;
      const dy = faceList[i].wy - faceList[j].wy;
      const dz = faceList[i].wz - faceList[j].wz;
      if (dx * dx + dy * dy + dz * dz < t2) {
        const a = cfind(i);
        const b = cfind(j);
        if (a !== b) cp[a] = b;
      }
    }
  }

  const clusters = new Map();
  for (let i = 0; i < n; i++) {
    const root = cfind(i);
    let cl = clusters.get(root);
    if (!cl) {
      cl = { ids: [], wx: 0, wy: 0, wz: 0, w: 0 };
      clusters.set(root, cl);
    }
    const f = faceList[i];
    cl.ids.push(...f.ids);
    cl.wx += f.wx * f.ids.length;
    cl.wy += f.wy * f.ids.length;
    cl.wz += f.wz * f.ids.length;
    cl.w += f.ids.length;
  }

  const list = [...clusters.values()].sort((a, b) => b.w - a.w);
  const kept = list.filter((c) => c.w >= MIN_VERTS);
  const dust = list.filter((c) => c.w < MIN_VERTS);
  for (const d of dust) {
    if (!kept.length) {
      kept.push(d);
      continue;
    }
    const dx = d.wx / d.w;
    const dy = d.wy / d.w;
    const dz = d.wz / d.w;
    let best = 0;
    let bestD = Infinity;
    for (let i = 0; i < kept.length; i++) {
      const k = kept[i];
      const kdx = k.wx / k.w - dx;
      const kdy = k.wy / k.w - dy;
      const kdz = k.wz / k.w - dz;
      const dist = kdx * kdx + kdy * kdy + kdz * kdz;
      if (dist < bestD) {
        bestD = dist;
        best = i;
      }
    }
    kept[best].ids.push(...d.ids);
    kept[best].wx += d.wx;
    kept[best].wy += d.wy;
    kept[best].wz += d.wz;
    kept[best].w += d.w;
  }

  const triOf = new Int32Array(verts);
  triOf.fill(-1);
  for (let k = 0; k < kept.length; k++) {
    for (const v of kept[k].ids) triOf[v] = k;
  }

  const buckets = kept.map(() => ({
    map: new Map(),
    pos: [],
    nrm: [],
    idx: [],
    sx: 0,
    sy: 0,
    sz: 0,
    n: 0,
  }));

  const remap = (k, v) => {
    const b = buckets[k];
    let nv = b.map.get(v);
    if (nv === undefined) {
      nv = b.map.size;
      b.map.set(v, nv);
      b.pos.push(pos[v * 3], pos[v * 3 + 1], pos[v * 3 + 2]);
      b.nrm.push(nrm[v * 3], nrm[v * 3 + 1], nrm[v * 3 + 2]);
      b.sx += pos[v * 3];
      b.sy += pos[v * 3 + 1];
      b.sz += pos[v * 3 + 2];
      b.n++;
    }
    return nv;
  };

  for (let t = 0; t < idx.length; t += 3) {
    const a = idx[t];
    const k = triOf[a];
    if (k < 0) continue;
    buckets[k].idx.push(remap(k, a), remap(k, idx[t + 1]), remap(k, idx[t + 2]));
  }

  for (const bucket of buckets) {
    if (!bucket.n || !bucket.idx.length || bucket.n > 65535) continue;
    outChunks.push({
      r,
      g,
      blue,
      ox: bucket.sx / bucket.n / 32767,
      oy: bucket.sy / bucket.n / 32767,
      oz: bucket.sz / bucket.n / 32767,
      pos: Int16Array.from(bucket.pos),
      nrm: Int16Array.from(bucket.nrm),
      idx: Uint16Array.from(bucket.idx),
    });
  }
}

let byteLen = 32;
for (const c of outChunks) {
  byteLen += 24 + 8 + c.pos.byteLength + c.nrm.byteLength + c.idx.byteLength;
  byteLen = (byteLen + 3) & ~3;
}

const out = new ArrayBuffer(byteLen);
const dv = new DataView(out);
const u8 = new Uint8Array(out);
u8[0] = 0x42;
u8[1] = 0x52;
u8[2] = 0x4b;
u8[3] = 0x33; // BRK3
dv.setUint32(4, outChunks.length, true);
dv.setFloat32(8, cx, true);
dv.setFloat32(12, cy, true);
dv.setFloat32(16, cz, true);
dv.setFloat32(20, hx, true);
dv.setFloat32(24, hy, true);
dv.setFloat32(28, hz, true);
o = 32;
for (const c of outChunks) {
  dv.setFloat32(o, c.r, true);
  dv.setFloat32(o + 4, c.g, true);
  dv.setFloat32(o + 8, c.blue, true);
  dv.setFloat32(o + 12, c.ox, true);
  dv.setFloat32(o + 16, c.oy, true);
  dv.setFloat32(o + 20, c.oz, true);
  o += 24;
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
writeFileSync("/workspace/public/models/50-brk-480.bin", Buffer.from(out));
writeFileSync("/workspace/public/models/50-brk-480.bin.gz", gz);
console.log(
  JSON.stringify(
    {
      parts: outChunks.length,
      rawKB: +(out.byteLength / 1024).toFixed(1),
      gzipKB: +(gz.length / 1024).toFixed(1),
      sample: outChunks.slice(0, 6).map((c) => ({
        rgb: [c.r, c.g, c.blue].map((n) => +n.toFixed(2)),
        origin: [c.ox, c.oy, c.oz].map((n) => +n.toFixed(2)),
        verts: c.pos.length / 3,
      })),
    },
    null,
    2,
  ),
);
