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
  projectName: "Custom Switchgear Enclosure",
  projectCode: "50 BRK 480",
  client: "Undisclosed",
  date: "16 July 2026",
  summary:
    "Representative of a recurring but never-repeating design challenge: custom electrical switchgear enclosures built around an engineer’s breaker and low-voltage panel layout.\n\nCollaboration. Worked in calibration with the electrical engineer, designing the structural framing and sheet metal cladding for each unit around their breaker and panel layout.\n\nFrame. Steel angle (1-1/2\" × 1/4\") and C3 × 5 channel, joined with a custom-fabricated 1/4\" T-slot system.\n\nCladding. 14-gauge steel skins; 12-gauge steel doors and breaker panels.\n\nConstraints. Every enclosure serves a distinct use case, so no two designs are alike — weight and space limits drive most decisions, requiring constant tradeoffs between structural rigidity, material gauge, and footprint.\n\nDelivery. Produced at volume with fast turnaround, requiring efficient design decisions and close coordination with electrical engineering to keep projects moving.",
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
