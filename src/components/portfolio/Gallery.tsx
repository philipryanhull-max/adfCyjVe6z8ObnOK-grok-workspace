import { Link } from "@tanstack/react-router";
import { PROJECTS, type Project } from "@/lib/portfolio/projects";
import { kickStepPreload } from "@/lib/portfolio/preload";

function warm(project: Project) {
  kickStepPreload(project);
}

export function Gallery() {
  return (
    <div className="desk">
      <div className="titleblock print:hidden">
        <div className="flex min-w-0 items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-navy">Philip Hull</span>
          <span className="hidden font-mono text-xs uppercase tracking-wider text-ink-muted sm:inline">
            Mechanical designer
          </span>
        </div>
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-subtle">
          Selected work  ·  2026
        </span>
      </div>

      <div className="gallery-wrap">
        <header className="gallery-intro">
          <p className="kicker">Portfolio</p>
          <h1 className="gallery-title">Selected work</h1>
          <p className="gallery-lead">
            11×17 cover sheets with a live STEP assembly. Open a project to orbit the model, hide
            subassemblies, edit the title block, and print.
          </p>
        </header>

        <ul className="gallery-grid">
          {PROJECTS.map((p) => (
            <li key={p.slug}>
              <Link
                to="/work/$slug"
                params={{ slug: p.slug }}
                className="work-card"
                onPointerEnter={() => warm(p)}
                onFocus={() => warm(p)}
              >
                <span className="work-card-frame">
                  <img src={p.poster} alt="" />
                </span>
                <span className="work-card-meta">
                  <span className="kicker">{p.kicker}</span>
                  <span className="work-card-name">{p.copy.projectName}</span>
                  <span className="work-card-sub">
                    {[p.copy.client === "Undisclosed" ? null : p.copy.client, p.year, `${p.drawings.length} ${p.artifactsLabel.toLowerCase()}`]
                      .filter(Boolean)
                      .join("  ·  ")}
                  </span>
                  <span className="work-card-go">Open 11×17 sheet</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
