export const ENVELOPE = {
  width: 93 + 7 / 16,
  depth: 36,
  height: 80 + 1 / 16,
} as const;

export const SPEC_STRIP = [
  { label: "Envelope", value: "93-7/16 × 36 × 80-1/16 in" },
  { label: "Service", value: "480 VAC  ·  50 breaker" },
  { label: "Frame", value: "C3×5  ·  L 1½ × 1½ × ¼" },
  { label: "Doors", value: "12 ga  ·  Saginaw  ·  Southco" },
  { label: "Cladding", value: "14 ga exterior  ·  11 ga back" },
] as const;

export const KEY_DIMS = [
  { label: "Overall width", value: "93 7/16 in", note: "Cover ISO" },
  { label: "Overall height", value: "80 1/16 in", note: "Cover ISO" },
  { label: "Overall depth", value: "36 in", note: "Side elevation" },
  { label: "Framing width", value: "93 5/16 in", note: "Section A-A" },
  { label: "Framing height", value: "78 1/2 in", note: "Front framing" },
  { label: "Lower bay height", value: "50 5/8 in", note: "Front framing" },
  { label: "Door stack width", value: "62.79 in", note: "MTBP / MBBP blank" },
  { label: "Top left door", value: "18.17 × 29.44 in", note: "TLD flat pattern" },
  { label: "Top middle door", value: "26.56 × 29.44 in", note: "TMD flat pattern" },
  { label: "Top right door", value: "18.16 × 29.44 in", note: "TRD flat pattern" },
] as const;

export const TOLERANCES = [
  { group: "Linear", items: ["1-place (X.X) ± 0.1 in", "2-place (X.XX) ± 0.01 in", "3-place (X.XXX) ± 0.005 in", "Angles ± 0.5°"] },
  { group: "Weldment", items: ["AWS D1.1 unless noted", "Fillet size ± 1/16 in", "Weld length ± 1/8 in", "Distortion: overall ± 1/16 in"] },
  { group: "Machining", items: ["Unless noted ± 0.005 in", "Concentricity ± 0.003 in", "Flatness / parallelism ± 0.003 in per 12 in", "Surface 125 µin RMS"] },
  { group: "Shop practice", items: ["Break sharp edges 0.010–0.030 in", "Remove burrs and slag", "Deliver as-fabricated unless noted", "All dimensions inches"] },
] as const;

export const BAYS = [
  { id: "LSBP", name: "Left side breaker panel", material: "12 ga", note: "Full-height punched knockouts" },
  { id: "TLD", name: "Top left door", material: "12 ga", note: "Hinged  ·  metering cutouts" },
  { id: "TMD", name: "Top middle door", material: "12 ga", note: "Hinged  ·  widest upper door" },
  { id: "TRD", name: "Top right door", material: "12 ga", note: "Hinged  ·  metering cutouts" },
  { id: "MTBP", name: "Mid-top breaker panel", material: "12 ga", note: "Three large square openings" },
  { id: "MBBP", name: "Mid-bottom breaker panel", material: "12 ga", note: "Primary 50-position field" },
  { id: "RSBP", name: "Right side breaker panel", material: "12 ga", note: "Full-height punched knockouts" },
] as const;
