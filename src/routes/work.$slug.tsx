import { useEffect } from "react";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/portfolio/SiteHeader";
import { Sheet } from "@/components/portfolio/Sheet";
import { getProject } from "@/lib/portfolio/projects";
import { usePortfolio } from "@/lib/portfolio/store";

export const Route = createFileRoute("/work/$slug")({
  component: ProjectPage,
});

function ProjectPage() {
  const { slug } = Route.useParams();
  const project = getProject(slug);
  const openProject = usePortfolio((s) => s.openProject);

  useEffect(() => {
    if (project) openProject(project.slug, project.copy);
  }, [project, openProject]);

  if (!project) throw notFound();

  return (
    <div className="desk">
      <SiteHeader project={project} />
      <div className="sheet-wrap">
        <Sheet project={project} />
      </div>
    </div>
  );
}
