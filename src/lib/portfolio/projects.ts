import type { PortfolioCopy } from "./defaults";
import { DEFAULT_COPY } from "./defaults";
import { DRAWINGS, LEVER_DRAWINGS, CAMPER_PHOTOS, TABLE_PHOTOS, ICE_DRAWINGS, PROP_DRAWINGS, type DrawingSheet } from "./drawings";

export type BlockDef = {
  id: string;
  label: string;
  group: number;
  alwaysOn?: boolean;
};

export type Project = {
  slug: string;
  kicker: string;
  year: string;
  discipline: string;
  copy: PortfolioCopy;
  specs: { label: string; value: string }[];
  envelope: string;
  meshBin: string;
  meshGz: string;
  meshVersion: string;
  poster: string;
  stepFile: string;
  pdfFile?: string;
  artifactsLabel: "Drawings" | "Photos";
  drawings: DrawingSheet[];
  blocks: readonly BlockDef[];
};

export const PROJECTS: Project[] = [
  {
    slug: "50-brk-480",
    kicker: "Industrial enclosure",
    year: "2026",
    discipline: "Weldment  ·  sheet metal  ·  480 VAC",
    copy: DEFAULT_COPY,
    specs: [
      { label: "Envelope", value: "93-7/16 × 36 × 80-1/16 in" },
      { label: "Service", value: "480 VAC  ·  50 breaker" },
      { label: "Frame", value: "C3×5  ·  L 1½ × 1½ × ¼" },
      { label: "Doors", value: "12 ga  ·  Saginaw  ·  Southco" },
      { label: "Cladding", value: "14 ga exterior  ·  11 ga back" },
      { label: "Weld", value: "AWS D1.1" },
    ],
    envelope: "93-7/16 × 36 × 80-1/16 in",
    meshBin: "/models/50-brk-480.bin",
    meshGz: "/models/50-brk-480.bin.gz",
    meshVersion: "6",
    poster: "/models/print-iso.jpg?v=7",
    stepFile: "/models/50-BRK-480.step",
    pdfFile: "/drawings/50-BRK-480-drawing-set.pdf",
    artifactsLabel: "Drawings",
    drawings: DRAWINGS,
    blocks: [
      { id: "frame", label: "Steel Framing", group: 0, alwaysOn: true },
      { id: "cladding", label: "Steel Cladding", group: 1 },
      { id: "panels", label: "Breaker Panels", group: 2 },
    ],
  },
  {
    slug: "follow-up-lever",
    kicker: "Machined assembly",
    year: "2026",
    discipline: "Stainless  ·  aluminum  ·  Rev A",
    copy: {
      designerName: "Philip Hull",
      designerTitle: "Mechanical Designer",
      designerEmail: "hello@example.com",
      firmName: "HJM Machine",
      projectName: "Single Full Follow-up Lever",
      projectCode: "FOLLOW-UP LEVER",
      client: "Undisclosed",
      date: "6 April 2026",
      summary:
        "Single full follow-up lever. Steering assembly (316 SS linkage, 8384K55 shaft, high-temp handle, 304 SS rod and ball-nose plungers), housing in .375 alum top panel with laser-engraved scale, 1-7/8 alum sleeve and .125 alum stop plate, .125 alum base housing, 3/4 in stainless stop block, 32-pitch gearing and nylon friction washer. Envelope 5 × 5 in on the base. Rev A — 6/16/2026. 7-sheet fabrication package, STEP AP214.",
    },
    specs: [
      { label: "Envelope", value: "5 × 5 in base" },
      { label: "Rev", value: "A  ·  16 June 2026" },
      { label: "Housing", value: ".375 alum TP  ·  5052-H32" },
      { label: "Sleeve", value: "1-7/8 alum  ·  6061" },
      { label: "Steering", value: "316 / 304 SS  ·  1/4-20" },
      { label: "Bearing", value: "841 bronze  ·  5/16 shaft" },
    ],
    envelope: "5 × 5 in",
    meshBin: "/models/follow-up-lever.bin",
    meshGz: "/models/follow-up-lever.bin.gz",
    meshVersion: "3",
    poster: "/models/follow-up-lever-iso.jpg?v=3",
    stepFile: "/models/follow-up-lever.step",
    pdfFile: "/drawings/follow-up-lever/drawing-set.pdf",
    artifactsLabel: "Drawings",
    drawings: LEVER_DRAWINGS,
    blocks: [
      { id: "base", label: "Base", group: 0, alwaysOn: true },
      { id: "housing", label: "Housing", group: 1 },
      { id: "steering", label: "Steering", group: 2 },
    ],
  },
  {
    slug: "camper-topper",
    kicker: "Sheet-metal body",
    year: "2026",
    discipline: "Aluminum  ·  .125  ·  powder coat",
    copy: {
      designerName: "Philip Hull",
      designerTitle: "Mechanical Designer",
      designerEmail: "hello@example.com",
      firmName: "HJM Machine",
      projectName: "Camper Topper",
      projectCode: "CAMPER TOPPER",
      client: "Undisclosed",
      date: "13 September 2026",
      summary:
        "Aluminum camper topper in .125 sheet. Faceted top cap (Section A / Section B), tapered side walls, rear hatch with glass and LED marker, dual side hatch doors, and hatch-brace columns. Envelope ~101 × 66 × 31 in. As-built powder coat. STEP AP214 layout with shop photos of the finished shell.",
    },
    specs: [
      { label: "Envelope", value: "101 × 66 × 31 in" },
      { label: "Skin", value: ".125 alum" },
      { label: "Top cap", value: "Section A / B  ·  faceted" },
      { label: "Hatches", value: "Rear  ·  dual side" },
      { label: "Finish", value: "Powder coat  ·  satin black" },
      { label: "Model", value: "STEP AP214" },
    ],
    envelope: "101 × 66 × 31 in",
    meshBin: "/models/camper-topper.bin",
    meshGz: "/models/camper-topper.bin.gz",
    meshVersion: "1",
    poster: "/models/camper-topper-iso.jpg?v=1",
    stepFile: "/models/camper-layout.step",
    artifactsLabel: "Photos",
    drawings: CAMPER_PHOTOS,
    blocks: [
      { id: "base", label: "Base", group: 0, alwaysOn: true },
      { id: "cap", label: "Top Cap", group: 1 },
      { id: "hatches", label: "Hatches", group: 2 },
    ],
  },
  {
    slug: "vw-dining-table",
    kicker: "Furniture",
    year: "2024",
    discipline: "Walnut  ·  painted millwork  ·  mixed media",
    copy: {
      designerName: "Philip Hull",
      designerTitle: "Mechanical Designer",
      designerEmail: "hello@example.com",
      firmName: "HJM Machine",
      projectName: "VW Dining Room Table",
      projectCode: "VW DINING TABLE",
      client: "Undisclosed",
      date: "September 2024",
      summary:
        "Round dining table with a sculpted VW-bus base, painted trumpet pedestal, and walnut top on a walnut ring. Envelope ~60 in diameter × 32 in high. Hardware in tee-nut inserts and hex-head screws. Delivered September 2024. STEP AP214 layout with shop and install photos of the finished piece.",
    },
    specs: [
      { label: "Envelope", value: "Ø 60 × 32 in" },
      { label: "Top", value: "Walnut  ·  round" },
      { label: "Base", value: "VW bus  ·  painted" },
      { label: "Pedestal", value: "Trumpet  ·  green" },
      { label: "Ring", value: "Walnut" },
      { label: "Date", value: "September 2024" },
    ],
    envelope: "Ø 60 × 32 in",
    meshBin: "/models/vw-dining-table.bin",
    meshGz: "/models/vw-dining-table.bin.gz",
    meshVersion: "2",
    poster: "/models/vw-dining-table-iso.jpg?v=2",
    stepFile: "/models/vw-dining-table.step",
    artifactsLabel: "Photos",
    drawings: TABLE_PHOTOS,
    blocks: [
      { id: "base", label: "Base", group: 0, alwaysOn: true },
      { id: "top", label: "Table Top", group: 1 },
      { id: "bus", label: "Bus", group: 2 },
    ],
  },
  {
    slug: "ice-maker-transition",
    kicker: "Stainless duct",
    year: "2026",
    discipline: "Sheet metal  ·  AISI 304  ·  AWS D1.1",
    copy: {
      designerName: "Philip Hull",
      designerTitle: "Mechanical Designer",
      designerEmail: "hello@example.com",
      firmName: "HJM Machine",
      projectName: "Ice Maker Transition",
      projectCode: "ICE MAKER TRANSITION",
      client: "Undisclosed",
      date: "7 August 2026",
      summary:
        "Stainless duct package for ice-maker intake: Duct Unit1, Duct Unit2-A, Duct Unit2-B, and inlet adapter in 14 ga / 11 ga AISI 304 with aligning weld nuts. Continuous watertight welds per AWS D1.1. Roof steel and ice makers shown for layout. 13-sheet fabrication set, STEP AP214.",
    },
    specs: [
      { label: "Envelope", value: "21 × 20 × 9 ft layout" },
      { label: "Skin", value: "14 ga  ·  11 ga 304" },
      { label: "Units", value: "1  ·  2-A  ·  2-B  ·  inlet" },
      { label: "Weld", value: "AWS D1.1  ·  watertight" },
      { label: "Hardware", value: "90955A135 weld nuts" },
      { label: "Date", value: "7 August 2026" },
    ],
    envelope: "21 × 20 × 9 ft",
    meshBin: "/models/ice-maker-transition.bin",
    meshGz: "/models/ice-maker-transition.bin.gz",
    meshVersion: "1",
    poster: "/models/ice-maker-transition-iso.jpg?v=1",
    stepFile: "/models/ice-maker-transition.step",
    pdfFile: "/drawings/ice-maker-transition/drawing-set.pdf",
    artifactsLabel: "Drawings",
    drawings: ICE_DRAWINGS,
    blocks: [
      { id: "ducts", label: "Ducts", group: 0, alwaysOn: true },
      { id: "ice", label: "Ice Makers", group: 1 },
      { id: "steel", label: "Roof Steel", group: 2 },
    ],
  },
  {
    slug: "prop-simulator",
    kicker: "Tabletop fixture",
    year: "2026",
    discipline: "Aluminum  ·  drivetrain  ·  sheet metal",
    copy: {
      designerName: "Philip Hull",
      designerTitle: "Mechanical Designer",
      designerEmail: "hello@example.com",
      firmName: "HJM Machine",
      projectName: "Table Top Prop Simulator",
      projectCode: "PROP SIMULATOR",
      client: "Undisclosed",
      date: "20 April 2026",
      summary:
        "Benchtop propeller test fixture: 0.25 in aluminum base, 0.125 in formed guard and perforated wrap, Oriental Motor 5IK90 with 7 in mixer propeller on a ½ in shaft. Flexible coupling, extra-clearance bearings, acrylic cover. 5-sheet fabrication set, STEP AP214.",
    },
    specs: [
      { label: "Envelope", value: "22.9 × 9.2 × 10.3 in" },
      { label: "Base", value: "0.25 in aluminum" },
      { label: "Guard", value: "0.125 in alum  ·  perf wrap" },
      { label: "Drive", value: "5IK90  ·  7 in prop" },
      { label: "Shaft", value: "½ in × 12  ·  4453N11" },
      { label: "Date", value: "20 April 2026" },
    ],
    envelope: "22.9 × 9.2 × 10.3 in",
    meshBin: "/models/prop-simulator.bin",
    meshGz: "/models/prop-simulator.bin.gz",
    meshVersion: "5",
    poster: "/models/prop-simulator-iso.jpg?v=5",
    stepFile: "/models/prop-simulator.step",
    pdfFile: "/drawings/prop-simulator/drawing-set.pdf",
    artifactsLabel: "Drawings",
    drawings: PROP_DRAWINGS,
    blocks: [
      { id: "base", label: "Base", group: 0, alwaysOn: true },
      { id: "guard", label: "Guard", group: 1 },
      { id: "drive", label: "Drive", group: 2 },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function toggleBlocks(project: Project): BlockDef[] {
  return project.blocks.filter((b) => !b.alwaysOn);
}

export function allBlocksOn(project: Project): Record<string, boolean> {
  return Object.fromEntries(project.blocks.map((b) => [b.id, true]));
}

export function assignProjectBlocks(project: Project, groups: number[]): string[] {
  return groups.map((g) => project.blocks[g]?.id ?? project.blocks[0].id);
}
