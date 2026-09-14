export type BomRow = {
  qty: number;
  pn: string;
  material: string;
  description: string;
  length: string;
  location: string;
  family: string;
};

export const BOM: BomRow[] = [
  { qty: 1, pn: "SM0006", material: "C 3.0 × 5", description: "Cope on both ends", length: "59 7/16", location: "Steel framing", family: "C-channel" },
  { qty: 1, pn: "SM0004 (1)", material: "C 3.0 × 5", description: "Cope on both ends", length: "59 7/16", location: "Steel framing", family: "C-channel" },
  { qty: 1, pn: "SM0004", material: "C 3.0 × 5", description: "—", length: "56 15/16", location: "Steel framing", family: "C-channel" },
  { qty: 4, pn: "SM0009", material: "C 3.0 × 5", description: "Base feet", length: "36", location: "Base feet", family: "C-channel" },
  { qty: 4, pn: "SM0005", material: "C 3.0 × 5", description: "Cope on one end", length: "34 1/4", location: "Steel framing", family: "C-channel" },
  { qty: 1, pn: "SM0011", material: "C 3.0 × 5", description: "Cope on both ends", length: "23 1/2", location: "Steel framing", family: "C-channel" },
  { qty: 1, pn: "SM0007", material: "C 3.0 × 5", description: "Cope on one end", length: "17 1/4", location: "Steel framing", family: "C-channel" },
  { qty: 1, pn: "SM0008", material: "C 3.0 × 5", description: "Cope on one end", length: "15 5/8", location: "Steel framing", family: "C-channel" },
  { qty: 4, pn: "SM0001", material: "L 1½ × 1½ × ¼", description: "—", length: "93 5/16", location: "Steel framing", family: "Angle" },
  { qty: 7, pn: "SM0003 / SM0015", material: "L 1½ × 1½ × ¼", description: "Cope on both ends (one not coped)", length: "78", location: "Steel framing", family: "Angle" },
  { qty: 2, pn: "Vert. Dist. Rack A", material: "L 1½ × 1½ × ¼", description: "—", length: "74 1/16", location: "Vert. distribution rack A", family: "Racks" },
  { qty: 8, pn: "Horz. Dist. Rack B", material: "L 1½ × 1½ × ¼", description: "—", length: "57 5/16", location: "Horz. distribution rack B", family: "Racks" },
  { qty: 2, pn: "Vert. Dist. Rack B", material: "L 1½ × 1½ × ¼", description: "—", length: "56 7/8", location: "Vert. distribution rack B", family: "Racks" },
  { qty: 3, pn: "SM0010", material: "L 1½ × 1½ × ¼", description: "Cope on one end", length: "47 3/8", location: "Steel framing", family: "Angle" },
  { qty: 4, pn: "SM0002", material: "L 1½ × 1½ × ¼", description: "—", length: "33", location: "Steel framing", family: "Angle" },
  { qty: 3, pn: "SM0017 / Mirror", material: "L 1½ × 1½ × ¼", description: "Cope on one end (qty 2 mirrors)", length: "27 5/8", location: "Steel framing", family: "Angle" },
  { qty: 2, pn: "Vert. Dist. Rack B1", material: "L 1½ × 1½ × ¼", description: "—", length: "14 3/4", location: "Vert. distribution rack B1", family: "Racks" },
  { qty: 2, pn: "Vert. Dist. Rack B1", material: "L 1½ × 1½ × ¼", description: "Cope on both ends", length: "13", location: "Vert. distribution rack B1", family: "Racks" },
  { qty: 2, pn: "Horz. Dist. Rack B", material: "L 1½ × 1½ × ¼", description: "Cope on both ends", length: "13", location: "Horz. distribution rack B", family: "Racks" },
  { qty: 8, pn: "Rack B / Horz. A", material: "L 1½ × 1½ × ¼", description: "Cope on both ends", length: "9 1/8", location: "Horz. A / Vert. B", family: "Racks" },
  { qty: 2, pn: "Vert. Dist. Rack B", material: "L 1½ × 1½ × ¼", description: "Cope on both ends", length: "9", location: "Vert. distribution rack B", family: "Racks" },
  { qty: 4, pn: "SM0012", material: "L 2 × 1 × ¼ ripped", description: "—", length: "2", location: "Interior framing", family: "Angle" },
  { qty: 2, pn: "SM0018", material: "L 2 × 2 × ¼", description: "Rigging angle", length: "36", location: "Rigging", family: "Angle" },
  { qty: 1, pn: "SM0013", material: "L 1 × 1 × ¼", description: "Cope on one end", length: "17", location: "Steel framing", family: "Angle" },
  { qty: 2, pn: "SM0014", material: "L 1 × 1 × ¼", description: "—", length: "15 5/8", location: "Steel framing", family: "Angle" },
  { qty: 26, pn: "Strut channel", material: "Low-profile strut", description: "—", length: "13 1/2", location: "Steel framing", family: "Strut" },
  { qty: 2, pn: "Strut channel", material: "Low-profile strut", description: "Vert. dist. rack B1", length: "11 1/2", location: "Vert. distribution rack B1", family: "Strut" },
  { qty: 4, pn: "CTBB (×2)", material: "¼ in steel", description: "Cust. T-bar B back", length: "33", location: "Steel framing", family: "T-bar" },
  { qty: 4, pn: "CTBF (×2)", material: "¼ in steel", description: "Cust. T-bar B face", length: "33", location: "Steel framing", family: "T-bar" },
  { qty: 2, pn: "CTCB (×2)", material: "¼ in steel", description: "Cust. T-bar C back", length: "27 5/8", location: "Steel framing", family: "T-bar" },
  { qty: 2, pn: "CTCF (×2)", material: "¼ in steel", description: "Cust. T-bar C face", length: "26 3/8", location: "Steel framing", family: "T-bar" },
  { qty: 2, pn: "CTAF (×2)", material: "¼ in steel", description: "Cust. T-bar A face", length: "75 1/2", location: "Steel framing", family: "T-bar" },
  { qty: 2, pn: "CTAB (×2)", material: "¼ in steel", description: "Cust. T-bar A back", length: "78", location: "Steel framing", family: "T-bar" },
  { qty: 1, pn: "BLS", material: "14 ga", description: "Back left side panel", length: "See drawing", location: "Exterior cladding", family: "Cladding 14 ga" },
  { qty: 1, pn: "BML", material: "14 ga", description: "Back bottom mid-left panel", length: "See drawing", location: "Exterior cladding", family: "Cladding 14 ga" },
  { qty: 2, pn: "BSP", material: "14 ga", description: "Bottom side panel", length: "See drawing", location: "Exterior cladding", family: "Cladding 14 ga" },
  { qty: 2, pn: "TSP", material: "14 ga", description: "Top side panel", length: "See drawing", location: "Exterior cladding", family: "Cladding 14 ga" },
  { qty: 1, pn: "BTP", material: "14 ga", description: "Back top panel", length: "See drawing", location: "Exterior cladding", family: "Cladding 14 ga" },
  { qty: 1, pn: "BRS", material: "14 ga", description: "Back right panel", length: "See drawing", location: "Exterior cladding", family: "Cladding 14 ga" },
  { qty: 1, pn: "TC", material: "14 ga", description: "Top panel", length: "See drawing", location: "Exterior cladding", family: "Cladding 14 ga" },
  { qty: 1, pn: "BMR", material: "14 ga", description: "Back mid-right panel", length: "See drawing", location: "Exterior cladding", family: "Cladding 14 ga" },
  { qty: 1, pn: "ILSP", material: "14 ga", description: "Interior L side panel", length: "See drawing", location: "Interior cladding", family: "Cladding 14 ga" },
  { qty: 1, pn: "IBP", material: "14 ga", description: "Interior bottom panel", length: "See drawing", location: "Interior cladding", family: "Cladding 14 ga" },
  { qty: 1, pn: "IRSP", material: "14 ga", description: "Interior R side panel", length: "See drawing", location: "Interior cladding", family: "Cladding 14 ga" },
  { qty: 1, pn: "CP", material: "14 ga", description: "Corner / close-out panel", length: "See drawing", location: "Exterior cladding", family: "Cladding 14 ga" },
  { qty: 1, pn: "LSBP", material: "12 ga", description: "Left side breaker panel", length: "See drawing", location: "Breaker panel", family: "Breaker 12 ga" },
  { qty: 1, pn: "RSBP", material: "12 ga", description: "Right side breaker panel", length: "See drawing", location: "Breaker panel", family: "Breaker 12 ga" },
  { qty: 1, pn: "TLD", material: "12 ga", description: "Top left door", length: "See drawing", location: "Breaker panel", family: "Breaker 12 ga" },
  { qty: 1, pn: "TMD", material: "12 ga", description: "Top middle door", length: "See drawing", location: "Breaker panel", family: "Breaker 12 ga" },
  { qty: 1, pn: "TRD", material: "12 ga", description: "Top right door", length: "See drawing", location: "Breaker panel", family: "Breaker 12 ga" },
  { qty: 1, pn: "MTBP", material: "12 ga", description: "Mid top breaker panel", length: "See drawing", location: "Breaker panel", family: "Breaker 12 ga" },
  { qty: 1, pn: "MBBP", material: "12 ga", description: "Mid bottom breaker panel", length: "See drawing", location: "Breaker panel", family: "Breaker 12 ga" },
  { qty: 1, pn: "BP", material: "11 ga", description: "Interior back panel", length: "See drawing", location: "Interior back panel", family: "Back 11 ga" },
  { qty: 6, pn: "Southco E3-16-21", material: "Hardware", description: "Southco compression lock", length: "—", location: "Breaker panel", family: "Hardware" },
  { qty: 3, pn: "SCE-3916", material: "Hardware", description: "Saginaw hinge w/ pin, replacement (2 pcs)", length: "—", location: "Breaker panel", family: "Hardware" },
  { qty: 3, pn: "SCE-DHA12", material: "Hardware", description: "Saginaw 12 ga door hinge assembly (2 pcs)", length: "—", location: "Breaker panel", family: "Hardware" },
];

export function familyRollup() {
  const map = new Map<string, { pieces: number; lines: number }>();
  for (const r of BOM) {
    const cur = map.get(r.family) ?? { pieces: 0, lines: 0 };
    cur.pieces += r.qty;
    cur.lines += 1;
    map.set(r.family, cur);
  }
  return [...map.entries()].map(([family, v]) => ({ family, ...v }));
}

export function bomStats(rows: BomRow[] = BOM) {
  const pieces = rows.reduce((n, r) => n + r.qty, 0);
  return { pieces, unique: rows.length };
}
