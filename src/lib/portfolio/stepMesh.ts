export type MeshChunk = {
  group: number;
  color: [number, number, number];
  origin: [number, number, number];
  positions: Int16Array;
  normals: Int16Array;
  indices: Uint16Array;
};

export type LoadedMesh = {
  chunks: MeshChunk[];
  half: [number, number, number];
  radius: number;
};

function parseBrk4(buf: ArrayBuffer): LoadedMesh {
  const view = new DataView(buf);
  const magic = String.fromCharCode(
    view.getUint8(0),
    view.getUint8(1),
    view.getUint8(2),
    view.getUint8(3),
  );
  if (magic !== "BRK4") throw new Error("Bad model file");
  const count = view.getUint32(4, true);
  const hx = view.getFloat32(20, true);
  const hy = view.getFloat32(24, true);
  const hz = view.getFloat32(28, true);
  const chunks: MeshChunk[] = [];
  let o = 32;
  for (let i = 0; i < count; i++) {
    const group = view.getUint32(o, true);
    const r = view.getFloat32(o + 4, true);
    const g = view.getFloat32(o + 8, true);
    const b = view.getFloat32(o + 12, true);
    const ox = view.getFloat32(o + 16, true);
    const oy = view.getFloat32(o + 20, true);
    const oz = view.getFloat32(o + 24, true);
    o += 28;
    const verts = view.getUint32(o, true);
    const idxCount = view.getUint32(o + 4, true);
    o += 8;
    const posBytes = verts * 3 * 2;
    const nrmBytes = verts * 3 * 2;
    const idxBytes = idxCount * 2;
    const positions = new Int16Array(verts * 3);
    const normals = new Int16Array(verts * 3);
    const indices = new Uint16Array(idxCount);
    positions.set(new Int16Array(buf.slice(o, o + posBytes)));
    o += posBytes;
    normals.set(new Int16Array(buf.slice(o, o + nrmBytes)));
    o += nrmBytes;
    indices.set(new Uint16Array(buf.slice(o, o + idxBytes)));
    o += idxBytes;
    o = (o + 3) & ~3;
    chunks.push({
      group,
      color: [r, g, b],
      origin: [ox, oy, oz],
      positions,
      normals,
      indices,
    });
  }
  return {
    chunks,
    half: [hx, hy, hz],
    radius: Math.hypot(hx, hy, hz),
  };
}

async function inflateGzip(buf: ArrayBuffer): Promise<ArrayBuffer> {
  const bytes = new Uint8Array(buf);
  if (bytes[0] !== 0x1f || bytes[1] !== 0x8b) return buf;
  if (typeof DecompressionStream === "undefined") {
    throw new Error("No gzip support");
  }
  const stream = new Blob([buf]).stream().pipeThrough(new DecompressionStream("gzip"));
  return new Response(stream).arrayBuffer();
}

async function decodeMesh(buf: ArrayBuffer): Promise<LoadedMesh> {
  const bytes = new Uint8Array(buf);
  if (bytes[0] === 0x1f && bytes[1] === 0x8b) {
    buf = await inflateGzip(buf);
  }
  return parseBrk4(buf);
}

const cache = new Map<string, Promise<LoadedMesh>>();

async function fetchMesh(urls: string[]): Promise<LoadedMesh> {
  let last: unknown;
  for (const url of urls) {
    try {
      const res = await fetch(url, { cache: "force-cache" });
      if (!res.ok) {
        last = new Error(`Model ${res.status}`);
        continue;
      }
      return await decodeMesh(await res.arrayBuffer());
    } catch (e) {
      last = e;
    }
  }
  throw last instanceof Error ? last : new Error("Could not load STEP");
}

export function loadStepMesh(urls: string[]): Promise<LoadedMesh> {
  if (typeof window === "undefined") {
    return new Promise<LoadedMesh>(() => {});
  }
  const key = urls.join("|");
  let p = cache.get(key);
  if (!p) {
    p = fetchMesh(urls);
    cache.set(key, p);
  }
  return p;
}
