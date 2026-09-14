import type { MeshChunk } from "./stepMesh";
import type { BlockDef } from "./projects";

export function assignBlocks(chunks: MeshChunk[], blocks: readonly BlockDef[]): string[] {
  return chunks.map((c) => blocks[c.group]?.id ?? blocks[0]?.id ?? "frame");
}
