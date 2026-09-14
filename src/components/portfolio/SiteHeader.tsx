import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Layers, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DrawingsDialog } from "./DrawingsDialog";
import { usePortfolio } from "@/lib/portfolio/store";
import type { Project } from "@/lib/portfolio/projects";

export function SiteHeader({ project }: { project: Project }) {
  const [drawingsOpen, setDrawingsOpen] = useState(false);
  const copy = usePortfolio((s) => s.copy);

  return (
    <>
      <div className="titleblock print:hidden">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-ink-muted hover:text-ink"
          >
            <LayoutGrid className="size-3.5" />
            Work
          </Link>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-navy">
            {copy.projectCode}
          </span>
          <span className="hidden truncate font-mono text-xs uppercase tracking-wider text-ink-muted sm:inline">
            {copy.designerName}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="sm" onClick={() => setDrawingsOpen(true)}>
            <Layers className="size-3.5" />
            <span className="hidden sm:inline">{project.artifactsLabel}</span>
          </Button>
        </div>
      </div>
      <DrawingsDialog project={project} open={drawingsOpen} onOpenChange={setDrawingsOpen} />
    </>
  );
}
