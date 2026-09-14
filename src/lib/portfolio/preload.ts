import { loadStepMesh } from "./stepMesh";
import type { Project } from "./projects";

function onClient() {
  return typeof window !== "undefined";
}

export function meshUrls(project: Project): string[] {
  const v = project.meshVersion;
  const gz = `${project.meshGz}?v=${v}`;
  const bin = `${project.meshBin}?v=${v}`;
  // Large .gz files are served with Content-Encoding: gzip; prefer the raw .bin.
  if (project.slug === "prop-simulator") return [bin, gz];
  return [gz, bin];
}

export function kickStepPreload(project: Project) {
  if (!onClient()) return;
  void loadStepMesh(meshUrls(project));
  void import("@/components/portfolio/StepViewer");
}

export function stepMeshPromise(project: Project) {
  return loadStepMesh(meshUrls(project));
}

export function stepViewerPromise() {
  return import("@/components/portfolio/StepViewer");
}
