export type DrawingSheet = {
  n: number;
  file: string;
  thumb: string;
  title: string;
  kind: "assembly" | "frame" | "detail" | "panel" | "pattern" | "photo";
  description: string;
};

export const KIND_LABEL: Record<DrawingSheet["kind"], string> = {
  assembly: "Assembly",
  frame: "Frame",
  detail: "Detail",
  panel: "Panel",
  pattern: "Pattern",
  photo: "Photo",
};

export const DRAWINGS: DrawingSheet[] = [
  {
    n: 1,
    file: "/drawings/sheet-01.jpg",
    thumb: "/drawings/sheet-01-thumb.jpg",
    title: "Cover, ISO & cut list",
    kind: "assembly",
    description:
      "Cover sheet with isometric, front and side envelopes, and the full shop cut list by member family.",
  },
  {
    n: 2,
    file: "/drawings/sheet-02.jpg",
    thumb: "/drawings/sheet-02-thumb.jpg",
    title: "Steel framing assembly",
    kind: "frame",
    description:
      "Color-coded framing ISO with ballooned item numbers and the indented parts list for the weldment.",
  },
  {
    n: 3,
    file: "/drawings/sheet-03.jpg",
    thumb: "/drawings/sheet-03-thumb.jpg",
    title: "Framing sections & details",
    kind: "detail",
    description:
      "Sections A–J, T-bar slot layout, 1 in angle at strut, and custom T (not symmetric, adjacent side mirrored).",
  },
  {
    n: 4,
    file: "/drawings/sheet-04.jpg",
    thumb: "/drawings/sheet-04-thumb.jpg",
    title: "Front elevation — breaker doors",
    kind: "panel",
    description:
      "LSBP, TLD, TMD, TRD, RSBP, MTBP and MBBP in place, with interior bottom-panel setback (Detail M).",
  },
  {
    n: 5,
    file: "/drawings/sheet-05.jpg",
    thumb: "/drawings/sheet-05-thumb.jpg",
    title: "Distribution racks",
    kind: "detail",
    description:
      "Horizontal racks A/B and vertical racks A/B/B1 — lengths, typical slot, and quantity callouts.",
  },
  {
    n: 6,
    file: "/drawings/sheet-06.jpg",
    thumb: "/drawings/sheet-06-thumb.jpg",
    title: "Rigging angle 2 × 2 × ¼",
    kind: "detail",
    description:
      "Qty 2 lift angles, 36 in, with Ø.563 thru and Ø.75 thru hole patterns and 45° end cuts.",
  },
  {
    n: 7,
    file: "/drawings/sheet-07.jpg",
    thumb: "/drawings/sheet-07-thumb.jpg",
    title: "Side & back elevations",
    kind: "assembly",
    description:
      "Fastener locations, Southco latch centers, and typical hinge / hole details O–R.",
  },
  {
    n: 8,
    file: "/drawings/sheet-08.jpg",
    thumb: "/drawings/sheet-08-thumb.jpg",
    title: "Back panel — 11 ga flat pattern",
    kind: "pattern",
    description: "BP (x1) 11 ga, 59.013 × 25.049 in blank with 90° down flanges, R.11.",
  },
  {
    n: 9,
    file: "/drawings/sheet-09.jpg",
    thumb: "/drawings/sheet-09-thumb.jpg",
    title: "LSBP & RSBP flat patterns",
    kind: "pattern",
    description:
      "12 ga left and right side breaker panels, ~80.3 in developed length, punched knockouts and 90° hems.",
  },
  {
    n: 10,
    file: "/drawings/sheet-10.jpg",
    thumb: "/drawings/sheet-10-thumb.jpg",
    title: "MBBP & MTBP flat patterns",
    kind: "pattern",
    description:
      "Mid-bottom and mid-top breaker panels, 62.791 in wide, three-row and three-square knockout families.",
  },
  {
    n: 11,
    file: "/drawings/sheet-11.jpg",
    thumb: "/drawings/sheet-11-thumb.jpg",
    title: "TLD, TMD & TRD door blanks",
    kind: "pattern",
    description:
      "Top left, middle and right doors — meter, selector and display cutouts on 12 ga with R.14 hems.",
  },
  {
    n: 12,
    file: "/drawings/sheet-12.jpg",
    thumb: "/drawings/sheet-12-thumb.jpg",
    title: "Top cover — 14 ga flat pattern",
    kind: "pattern",
    description: "TC (x1) 95.183 × 30.041 in, mixed up/down 90° flanges, R.08.",
  },
  {
    n: 13,
    file: "/drawings/sheet-13.jpg",
    thumb: "/drawings/sheet-13-thumb.jpg",
    title: "Interior side panels",
    kind: "pattern",
    description: "ILSP / IRSP 14 ga, 27.915 × 23 in, 90° up flanges and locator notches.",
  },
];

export const LEVER_DRAWINGS: DrawingSheet[] = [
  {
    n: 1,
    file: "/drawings/follow-up-lever/sheet-01.jpg",
    thumb: "/drawings/follow-up-lever/sheet-01-thumb.jpg",
    title: "Cover — exploded ISO & parts list",
    kind: "assembly",
    description:
      "Exploded isometric of the Single Full Follow-up Lever, ballooned parts list, 5 in square envelope, and Rev A title block.",
  },
  {
    n: 2,
    file: "/drawings/follow-up-lever/sheet-02.jpg",
    thumb: "/drawings/follow-up-lever/sheet-02-thumb.jpg",
    title: "Steering assembly",
    kind: "detail",
    description:
      "Handle, 8384K55 shaft, 316 SS linkage, top cap, 8934K271 rod, and ball-nose plungers with process note for the Ø.172 hole.",
  },
  {
    n: 3,
    file: "/drawings/follow-up-lever/sheet-03.jpg",
    thumb: "/drawings/follow-up-lever/sheet-03-thumb.jpg",
    title: "Housing — top panel, sleeve, stop plate",
    kind: "detail",
    description:
      "TP (x1) .375 alum Rev A laser-engraved scale, 1-7/8 alum sleeve, .125 alum stop plate, PEM studs and flanged bronze bearing.",
  },
  {
    n: 4,
    file: "/drawings/follow-up-lever/sheet-04.jpg",
    thumb: "/drawings/follow-up-lever/sheet-04-thumb.jpg",
    title: "Housing assembly views",
    kind: "assembly",
    description: "Top, right and back of the housing. Weld in red areas only on the stop-plate joint.",
  },
  {
    n: 5,
    file: "/drawings/follow-up-lever/sheet-05.jpg",
    thumb: "/drawings/follow-up-lever/sheet-05-thumb.jpg",
    title: "Stop block assembly",
    kind: "detail",
    description: "3/4 in stainless stop block with Ø.313 thru and M4 countersunk fastener.",
  },
  {
    n: 6,
    file: "/drawings/follow-up-lever/sheet-06.jpg",
    thumb: "/drawings/follow-up-lever/sheet-06-thumb.jpg",
    title: "Base plate assembly",
    kind: "assembly",
    description: "BH (x1) .125 alum Rev A steering base housing, mounting access, and related hardware.",
  },
  {
    n: 7,
    file: "/drawings/follow-up-lever/sheet-07.jpg",
    thumb: "/drawings/follow-up-lever/sheet-07-thumb.jpg",
    title: "Nylon friction washer",
    kind: "detail",
    description: "8541K23 5/16 ID × 1 in OD nylon washer, Rev A material callout.",
  },
];

export const CAMPER_PHOTOS: DrawingSheet[] = [
  {
    n: 1,
    file: "/photos/camper-topper/rear-three-quarter.jpg",
    thumb: "/photos/camper-topper/rear-three-quarter-thumb.jpg",
    title: "Rear three-quarter",
    kind: "photo",
    description: "As-built camper topper — rear hatch, LED marker, and passenger-side skin.",
  },
  {
    n: 2,
    file: "/photos/camper-topper/cab-three-quarter.jpg",
    thumb: "/photos/camper-topper/cab-three-quarter-thumb.jpg",
    title: "Cab three-quarter",
    kind: "photo",
    description: "Cab-side three-quarter of the powder-coated shell on casters.",
  },
  {
    n: 3,
    file: "/photos/camper-topper/front-elevation.jpg",
    thumb: "/photos/camper-topper/front-elevation-thumb.jpg",
    title: "Front elevation",
    kind: "photo",
    description: "Head-on view of the faceted top cap and tapered side walls.",
  },
  {
    n: 4,
    file: "/photos/camper-topper/cab-hatch.jpg",
    thumb: "/photos/camper-topper/cab-hatch-thumb.jpg",
    title: "Cab corner",
    kind: "photo",
    description: "Cab-side corner with the top-cap facet and side hatch in view.",
  },
  {
    n: 5,
    file: "/photos/camper-topper/rear-hatch.jpg",
    thumb: "/photos/camper-topper/rear-hatch-thumb.jpg",
    title: "Rear hatch",
    kind: "photo",
    description: "Rear hatch glass, piano hinges, latches, grab, and LED marker bar.",
  },
];

export const TABLE_PHOTOS: DrawingSheet[] = [
  {
    n: 1,
    file: "/photos/vw-dining-table/primer-rear.jpg",
    thumb: "/photos/vw-dining-table/primer-rear-thumb.jpg",
    title: "Primer — rear",
    kind: "photo",
    description: "Bus shell in primer on the bench, rear elevation.",
  },
  {
    n: 2,
    file: "/photos/vw-dining-table/primer-front.jpg",
    thumb: "/photos/vw-dining-table/primer-front-thumb.jpg",
    title: "Primer — front",
    kind: "photo",
    description: "Cab three-quarter of the bus shell in primer.",
  },
  {
    n: 3,
    file: "/photos/vw-dining-table/workshop-rear-three-quarter.jpg",
    thumb: "/photos/vw-dining-table/workshop-rear-three-quarter-thumb.jpg",
    title: "Workshop — rear three-quarter",
    kind: "photo",
    description: "Painted VW-bus base on the walnut ring and green platform, shop floor.",
  },
  {
    n: 4,
    file: "/photos/vw-dining-table/workshop-rear.jpg",
    thumb: "/photos/vw-dining-table/workshop-rear-thumb.jpg",
    title: "Workshop — rear",
    kind: "photo",
    description: "Rear elevation of the sculpted bus before install.",
  },
  {
    n: 5,
    file: "/photos/vw-dining-table/workshop-front-three-quarter.jpg",
    thumb: "/photos/vw-dining-table/workshop-front-three-quarter-thumb.jpg",
    title: "Workshop — front three-quarter",
    kind: "photo",
    description: "Cab face, headlights, and painted bumper on the turntable.",
  },
  {
    n: 6,
    file: "/photos/vw-dining-table/workshop-cab-three-quarter.jpg",
    thumb: "/photos/vw-dining-table/workshop-cab-three-quarter-thumb.jpg",
    title: "Workshop — cab",
    kind: "photo",
    description: "Passenger-side cab three-quarter of the bus base.",
  },
  {
    n: 7,
    file: "/photos/vw-dining-table/workshop-side.jpg",
    thumb: "/photos/vw-dining-table/workshop-side-thumb.jpg",
    title: "Workshop — side",
    kind: "photo",
    description: "Driver-side elevation with the trumpet pedestal above the roof.",
  },
  {
    n: 8,
    file: "/photos/vw-dining-table/installed-dining.jpg",
    thumb: "/photos/vw-dining-table/installed-dining-thumb.jpg",
    title: "Installed — dining room",
    kind: "photo",
    description: "Round walnut top in place, six chairs, as-built interior.",
  },
  {
    n: 9,
    file: "/photos/vw-dining-table/installed-lounge.jpg",
    thumb: "/photos/vw-dining-table/installed-lounge-thumb.jpg",
    title: "Installed — lounge",
    kind: "photo",
    description: "Dining table in the lounge with the bus base visible under the top.",
  },
];

export const ICE_DRAWINGS: DrawingSheet[] = [
  {
    n: 1,
    file: "/drawings/ice-maker-transition/sheet-01.jpg",
    thumb: "/drawings/ice-maker-transition/sheet-01-thumb.jpg",
    title: "Cover — plan, ISO, elevations",
    kind: "assembly",
    description: "Site layout of the ice makers, roof steel, and stainless duct run.",
  },
  {
    n: 2,
    file: "/drawings/ice-maker-transition/sheet-02.jpg",
    thumb: "/drawings/ice-maker-transition/sheet-02-thumb.jpg",
    title: "Exploded duct assembly",
    kind: "assembly",
    description: "Duct Unit1, Unit2-A, Unit2-B and inlet adapter with assembly notes.",
  },
  {
    n: 3,
    file: "/drawings/ice-maker-transition/sheet-03.jpg",
    thumb: "/drawings/ice-maker-transition/sheet-03-thumb.jpg",
    title: "Unit elevations",
    kind: "detail",
    description: "Duct Unit1, Unit2-A and Unit2-B in plan and elevation.",
  },
  {
    n: 4,
    file: "/drawings/ice-maker-transition/sheet-04.jpg",
    thumb: "/drawings/ice-maker-transition/sheet-04-thumb.jpg",
    title: "Inlet adapter views",
    kind: "detail",
    description: "Inlet adapter top, front, right and bottom views.",
  },
  {
    n: 5,
    file: "/drawings/ice-maker-transition/sheet-05.jpg",
    thumb: "/drawings/ice-maker-transition/sheet-05-thumb.jpg",
    title: "Duct Unit1 — assembly",
    kind: "assembly",
    description: "14 ga / 11 ga stainless Unit1 with ISO, top and front, weld nuts.",
  },
  {
    n: 6,
    file: "/drawings/ice-maker-transition/sheet-06.jpg",
    thumb: "/drawings/ice-maker-transition/sheet-06-thumb.jpg",
    title: "Duct Unit1 — flat patterns",
    kind: "pattern",
    description: "U1TP and U1BP 14 ga stainless blanks.",
  },
  {
    n: 7,
    file: "/drawings/ice-maker-transition/sheet-07.jpg",
    thumb: "/drawings/ice-maker-transition/sheet-07-thumb.jpg",
    title: "Duct Unit2-A — assembly",
    kind: "assembly",
    description: "Long 14 ga stainless run with 11 ga flange, watertight weld note.",
  },
  {
    n: 8,
    file: "/drawings/ice-maker-transition/sheet-08.jpg",
    thumb: "/drawings/ice-maker-transition/sheet-08-thumb.jpg",
    title: "Duct Unit2-A — flat patterns",
    kind: "pattern",
    description: "U2AT and U2AB 14 ga stainless blanks.",
  },
  {
    n: 9,
    file: "/drawings/ice-maker-transition/sheet-09.jpg",
    thumb: "/drawings/ice-maker-transition/sheet-09-thumb.jpg",
    title: "Duct Unit2-B — assembly",
    kind: "assembly",
    description: "Short 14 / 11 ga stainless transition with end flanges.",
  },
  {
    n: 10,
    file: "/drawings/ice-maker-transition/sheet-10.jpg",
    thumb: "/drawings/ice-maker-transition/sheet-10-thumb.jpg",
    title: "Duct Unit2-B — flat patterns",
    kind: "pattern",
    description: "U2TP and U2BP 14 ga stainless blanks.",
  },
  {
    n: 11,
    file: "/drawings/ice-maker-transition/sheet-11.jpg",
    thumb: "/drawings/ice-maker-transition/sheet-11-thumb.jpg",
    title: "Inlet adapter — assembly",
    kind: "assembly",
    description: "14 ga stainless inlet adapter, 84 in long.",
  },
  {
    n: 12,
    file: "/drawings/ice-maker-transition/sheet-12.jpg",
    thumb: "/drawings/ice-maker-transition/sheet-12-thumb.jpg",
    title: "Inlet adapter — patterns A/B/C",
    kind: "pattern",
    description: "IAC, IAA and IAB 14 ga stainless developed blanks.",
  },
  {
    n: 13,
    file: "/drawings/ice-maker-transition/sheet-13.jpg",
    thumb: "/drawings/ice-maker-transition/sheet-13-thumb.jpg",
    title: "Inlet adapter — ITC pattern",
    kind: "pattern",
    description: "ITC 14 ga stainless cover blank.",
  },
];

export const PROP_DRAWINGS: DrawingSheet[] = [
  {
    n: 1,
    file: "/drawings/prop-simulator/sheet-01.jpg",
    thumb: "/drawings/prop-simulator/sheet-01-thumb.jpg",
    title: "Cover — exploded ISO, elevations",
    kind: "assembly",
    description: "Exploded tabletop prop simulator: guard, perforated wrap, motor, shaft, propeller.",
  },
  {
    n: 2,
    file: "/drawings/prop-simulator/sheet-02.jpg",
    thumb: "/drawings/prop-simulator/sheet-02-thumb.jpg",
    title: "Base, FREN, BEN",
    kind: "detail",
    description: "0.25 in aluminum base blank and 0.125 in front/back enclosure panels.",
  },
  {
    n: 3,
    file: "/drawings/prop-simulator/sheet-03.jpg",
    thumb: "/drawings/prop-simulator/sheet-03-thumb.jpg",
    title: "Guard and back panel",
    kind: "detail",
    description: "0.125 in aluminum guard flat pattern, formed views, and back panel.",
  },
  {
    n: 4,
    file: "/drawings/prop-simulator/sheet-04.jpg",
    thumb: "/drawings/prop-simulator/sheet-04-thumb.jpg",
    title: "Perf wrap and scrap",
    kind: "pattern",
    description: "Perforated wrap blank and formed scrap, pattern not shown on flat.",
  },
  {
    n: 5,
    file: "/drawings/prop-simulator/sheet-05.jpg",
    thumb: "/drawings/prop-simulator/sheet-05-thumb.jpg",
    title: "Shims and acrylic",
    kind: "detail",
    description: "Aluminum shims and 0.125 in acrylic cover guard.",
  },
];
