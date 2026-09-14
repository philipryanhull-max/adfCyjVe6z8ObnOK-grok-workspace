import { readFileSync, writeFileSync } from "node:fs";
import { gzipSync } from "node:zlib";

const src = "/workspace/public/models/50-brk-480.bin";
const buf = readFileSync(src);
const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
const magic = String.fromCharCode(buf[0], buf[1], buf[2], buf[3]);
if (magic !== "BRK1") throw new Error(`bad magic ${magic}`);

const count = view.getUint32(4, true);
let o = 8;
const chunks = [];
let minX = Infinity, minY = Infinity, minZ = Infinity;
let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

for (let i = 0; i < count; i++) {
  const r = view.getFloat32(o, true);
  const g = view.getFloat32(o + 4, true);
  const b = view.getFloat32(o + 8, true);
  o += 12;
  const verts = view.getUint32(o, true);
  const idxCount = view.getUint32(o + 4, true);
  o += 8;
  const pos = new Float32Array(buf.buffer, buf.byteOffset + o, verts * 3);
  o += verts * 3 * 4;
  const nrm = new Float32Array(buf.buffer, buf.byteOffset + o, verts * 3);
  o += verts * 3 * 4;
  const idx = new Uint32Array(buf.buffer, buf.byteOffset + o, idxCount);
  o += idxCount * 4;
  for (let v = 0; v < pos.length; v += 3) {
    minX = Math.min(minX, pos[v]);
    minY = Math.min(minY, pos[v + 1]);
    minZ = Math.min(minZ, pos[v + 2]);
    maxX = Math.max(maxX, pos[v]);
    maxY = Math.max(maxY, pos[v + 1]);
    maxZ = Math.max(maxZ, pos[v + 2]);
  }
  chunks.push({ r, g, b, verts, idxCount, pos: Float32Array.from(pos), nrm: Float32Array.from(nrm), idx });
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

let byteLen = 4 + 4 + 24;
for (const c of chunks) {
  if (c.verts > 65535) throw new Error("chunk too large for u16 indices");
  byteLen += 12 + 8 + c.verts * 3 * 2 + c.verts * 3 * 2 + c.idxCount * 2;
  byteLen = (byteLen + 3) & ~3;
}

const out = new ArrayBuffer(byteLen);
const dv = new DataView(out);
const u8 = new Uint8Array(out);
u8[0] = 0x42;
u8[1] = 0x52;
u8[2] = 0x4b;
u8[3] = 0x32;
dv.setUint32(4, chunks.length, true);
dv.setFloat32(8, cx, true);
dv.setFloat32(12, cy, true);
dv.setFloat32(16, cz, true);
dv.setFloat32(20, hx, true);
dv.setFloat32(24, hy, true);
dv.setFloat32(28, hz, true);
o = 32;
for (const c of chunks) {
  dv.setFloat32(o, c.r, true);
  dv.setFloat32(o + 4, c.g, true);
  dv.setFloat32(o + 8, c.b, true);
  o += 12;
  dv.setUint32(o, c.verts, true);
  dv.setUint32(o + 4, c.idxCount, true);
  o += 8;
  const pq = new Int16Array(out, o, c.verts * 3);
  for (let i = 0; i < c.verts; i++) {
    pq[i * 3] = qpos(c.pos[i * 3], cx, hx);
    pq[i * 3 + 1] = qpos(c.pos[i * 3 + 1], cy, hy);
    pq[i * 3 + 2] = qpos(c.pos[i * 3 + 2], cz, hz);
  }
  o += c.verts * 3 * 2;
  const nq = new Int16Array(out, o, c.verts * 3);
  for (let i = 0; i < c.nrm.length; i++) nq[i] = qn(c.nrm[i]);
  o += c.verts * 3 * 2;
  const iq = new Uint16Array(out, o, c.idxCount);
  for (let i = 0; i < c.idxCount; i++) iq[i] = c.idx[i];
  o += c.idxCount * 2;
  o = (o + 3) & ~3;
}

const gz = gzipSync(Buffer.from(out), { level: 9 });
writeFileSync("/workspace/public/models/50-brk-480.bin", Buffer.from(out));
writeFileSync("/workspace/public/models/50-brk-480.bin.gz", gz);
console.log(
  JSON.stringify({
    chunks: chunks.length,
    rawKB: +(out.byteLength / 1024).toFixed(1),
    gzipKB: +(gz.length / 1024).toFixed(1),
    center: [cx, cy, cz].map((n) => +n.toFixed(3)),
    half: [hx, hy, hz].map((n) => +n.toFixed(3)),
  }),
);
