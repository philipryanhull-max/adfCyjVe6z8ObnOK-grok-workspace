import { useEffect, useState, type ComponentType } from "react";
import { kickStepPreload, stepViewerPromise } from "@/lib/portfolio/preload";
import type { Project } from "@/lib/portfolio/projects";

export function StepViewerGate({ project }: { project: Project }) {
  const [Comp, setComp] = useState<ComponentType<{ project: Project }> | null>(null);
  useEffect(() => {
    kickStepPreload(project);
    let alive = true;
    void stepViewerPromise().then((m) => {
      if (alive) setComp(() => m.StepViewer);
    });
    return () => {
      alive = false;
    };
  }, [project]);
  return (
    <div className="relative h-full min-h-0 w-full bg-paper">
      {!Comp ? (
        <img
          src={project.poster}
          alt=""
          className="absolute inset-0 h-full w-full object-contain"
        />
      ) : (
        <div className="absolute inset-0">
          <Comp project={project} />
        </div>
      )}
    </div>
  );
}
