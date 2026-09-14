import { Editable } from "./Editable";
import { StepViewerGate } from "./StepViewerGate";
import type { Project } from "@/lib/portfolio/projects";

export function Sheet({ project }: { project: Project }) {
  return (
    <article className="sheet">
      <header className="sheet-head">
        <span className="kicker">Mechanical design</span>
        <Editable field="projectCode" as="h1" className="sheet-title" />
        <span className="kicker kicker-right">11 × 17 · Sheet 1 of 1</span>
      </header>

      <div className="sheet-body">
        <div className="model-pane">
          <StepViewerGate project={project} />
        </div>

        <aside className="sheet-rail">
          <div>
            <Editable field="designerName" as="h2" className="rail-name" />
            <Editable field="designerTitle" as="p" className="rail-role" />
            <Editable field="projectName" as="p" className="rail-project" />
          </div>

          <div className="notes-block">
            <div className="rail-label">Project</div>
            <Editable field="summary" multiline rows={7} className="notes-copy" />
          </div>

          <dl className="spec-grid">
            {project.specs.map((s) => (
              <div key={s.label} className="spec-cell">
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <footer className="sheet-foot">
        <Foot label="Designer" field="designerName" />
        <Foot label="Client" field="client" />
        <Foot label="Date" field="date" />
        <Foot label="Firm" field="firmName" />
        <div>
          <div className="foot-lab">Envelope</div>
          <div className="foot-val">{project.envelope}</div>
        </div>
        <div>
          <div className="foot-lab">Model</div>
          <div className="foot-val">STEP AP214</div>
        </div>
      </footer>
    </article>
  );
}

function Foot({
  label,
  field,
}: {
  label: string;
  field: "designerName" | "client" | "date" | "firmName";
}) {
  return (
    <div>
      <div className="foot-lab">{label}</div>
      <Editable field={field} as="div" className="foot-val" />
    </div>
  );
}
