export type PortfolioCopy = {
  designerName: string;
  designerTitle: string;
  designerEmail: string;
  firmName: string;
  projectName: string;
  projectCode: string;
  client: string;
  date: string;
  summary: string;
};

export const DEFAULT_COPY: PortfolioCopy = {
  designerName: "Philip Hull",
  designerTitle: "Mechanical Designer",
  designerEmail: "hello@example.com",
  firmName: "HJM Machine",
  projectName: "50-Position 480V Breaker Enclosure",
  projectCode: "50 BRK 480",
  client: "Undisclosed",
  date: "16 July 2026",
  summary:
    "50-position 480 VAC industrial breaker enclosure. Steel framing in C3×5 and 1½ × 1½ × ¼ angle, custom T-bar door stiles, 12 ga hinged breaker doors, 14 ga cladding, 11 ga interior back, and interior distribution racks on low-profile strut. Envelope 93-7/16 × 36 × 80-1/16 in. AWS D1.1. Delivered as a fully constrained STEP AP214 assembly with a 13-sheet fabrication package.",
};

export const COPY_FIELDS: {
  key: keyof PortfolioCopy;
  label: string;
  hint: string;
  multiline?: boolean;
  rows?: number;
}[] = [
  { key: "designerName", label: "Name", hint: "How you want to be credited" },
  { key: "designerTitle", label: "Title", hint: "e.g. Mechanical Designer" },
  { key: "firmName", label: "Firm / studio", hint: "Title block" },
  { key: "designerEmail", label: "Email", hint: "Optional — not printed" },
  { key: "projectName", label: "Project name", hint: "Long title" },
  { key: "projectCode", label: "Project code", hint: "e.g. 50 BRK 480" },
  { key: "client", label: "Client", hint: "Who the work was for" },
  { key: "date", label: "Date", hint: "As you want it printed" },
  {
    key: "summary",
    label: "Project notes",
    hint: "This is the write-in on the 11×17 sheet. Keep it to a short paragraph so it prints on one page.",
    multiline: true,
    rows: 8,
  },
];
