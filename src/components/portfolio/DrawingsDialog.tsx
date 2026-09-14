import { useState } from "react";
import { Download } from "lucide-react";
import type { DrawingSheet } from "@/lib/portfolio/drawings";
import type { Project } from "@/lib/portfolio/projects";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

export function DrawingsDialog({
  project,
  open,
  onOpenChange,
}: {
  project: Project;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [sheet, setSheet] = useState<DrawingSheet | null>(null);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[92vh] overflow-hidden p-0 sm:p-0">
          <div className="flex items-start justify-between gap-3 border-b border-rule px-5 py-4 pr-12">
            <div>
              <DialogTitle className="font-display text-xl">
                {project.artifactsLabel === "Photos" ? "Shop photos" : "Drawing set"}
              </DialogTitle>
              <DialogDescription>
                {project.artifactsLabel === "Photos"
                  ? `${project.drawings.length} photos of the as-built shell. Client undisclosed.`
                  : `${project.drawings.length} sheets. Print the 11×17 cover separately — this is the shop package.`}
              </DialogDescription>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button variant="secondary" size="sm" asChild>
                <a href={project.stepFile} download>
                  <Download className="size-3.5" />
                  STEP
                </a>
              </Button>
              {project.pdfFile ? (
                <Button variant="navy" size="sm" asChild>
                  <a href={project.pdfFile} download>
                    <Download className="size-3.5" />
                    PDF
                  </a>
                </Button>
              ) : null}
            </div>
          </div>
          <div className="max-h-[72vh] overflow-y-auto p-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {project.drawings.map((s) => (
                <button
                  key={s.n}
                  type="button"
                  onClick={() => setSheet(s)}
                  className={s.kind === "photo" ? "thumb thumb-photo" : "thumb"}
                >
                  <img src={s.thumb} alt={s.title} />
                  <span>
                    {String(s.n).padStart(2, "0")}  {s.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!sheet} onOpenChange={(v) => !v && setSheet(null)}>
        <DialogContent className="max-h-[94vh] overflow-hidden p-2 sm:p-3">
          {sheet ? (
            <>
              <DialogTitle className="px-2 font-display text-lg">
                {sheet.n}. {sheet.title}
              </DialogTitle>
              <DialogDescription className="px-2">{sheet.description}</DialogDescription>
              <img
                src={sheet.file}
                alt={sheet.title}
                className="max-h-[72vh] w-full object-contain outline outline-1 -outline-offset-1 outline-ink/10"
              />
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
