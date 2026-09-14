import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, OrbitControls } from "@react-three/drei";
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  NoToneMapping,
  SRGBColorSpace,
  type Group,
} from "three";
import { Eye, EyeOff } from "lucide-react";
import { stepMeshPromise } from "@/lib/portfolio/preload";
import type { LoadedMesh, MeshChunk } from "@/lib/portfolio/stepMesh";
import { assignBlocks } from "@/lib/portfolio/blocks";
import { allBlocksOn, toggleBlocks, type Project } from "@/lib/portfolio/projects";
import { cn } from "@/lib/utils";

type View = "iso" | "front" | "left" | "top";

const PAPER = "#ffffff";
const PAPER_COLOR = new Color(PAPER);

function cameraFor(view: View, half: [number, number, number]): [number, number, number] {
  const r = Math.max(half[0], half[1], half[2]);
  const d = r * 4.35;
  if (view === "front") return [0, r * 0.04, d * 0.95];
  if (view === "left") return [-d * 0.95, r * 0.06, 0.01];
  if (view === "top") return [0, d * 0.92, 0.16];
  return [d * 0.52, d * 0.24, d * 0.96];
}

function ViewRig({ view, half }: { view: View; half: [number, number, number] }) {
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls);
  useLayoutEffect(() => {
    const [x, y, z] = cameraFor(view, half);
    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);
    const c = controls as { target?: { set: (x: number, y: number, z: number) => void }; update?: () => void } | null;
    c?.target?.set(0, 0, 0);
    c?.update?.();
  }, [view, half, camera, controls]);
  return null;
}

function shade(color: [number, number, number]) {
  const luma = color[0] * 0.2126 + color[1] * 0.7152 + color[2] * 0.0722;
  if (luma < 0.08) {
    return { color: [0.045, 0.045, 0.045] as [number, number, number], metalness: 0.04, roughness: 0.32 };
  }
  const k = luma > 0.5 ? 1.06 : 1.02;
  return {
    color: [
      Math.min(1, color[0] * k),
      Math.min(1, color[1] * k),
      Math.min(1, color[2] * k),
    ] as [number, number, number],
    metalness: luma > 0.55 ? 0.2 : 0.06,
    roughness: luma > 0.55 ? 0.4 : 0.55,
  };
}

function shadeProp(color: [number, number, number]) {
  const luma = color[0] * 0.2126 + color[1] * 0.7152 + color[2] * 0.0722;
  if (luma < 0.1) {
    return {
      color: [0.07, 0.07, 0.07] as [number, number, number],
      specular: "#d0d0d0",
      shininess: 90,
    };
  }
  return {
    color: [
      Math.min(1, color[0] * 1.22),
      Math.min(1, color[1] * 1.22),
      Math.min(1, color[2] * 1.22),
    ] as [number, number, number],
    specular: "#ffffff",
    shininess: luma > 0.4 ? 110 : 78,
  };
}

const BREAKER_GRAY: [number, number, number] = [0.58, 0.60, 0.59];

function shadeSteel(_color: [number, number, number]) {
  return {
    color: BREAKER_GRAY,
    specular: "#f2f2f2",
    shininess: 48,
  };
}

function chunkGeometry(chunk: MeshChunk): BufferGeometry {
  const g = new BufferGeometry();
  g.setAttribute("position", new BufferAttribute(chunk.positions, 3, true));
  g.setAttribute("normal", new BufferAttribute(chunk.normals, 3, true));
  g.setIndex(new BufferAttribute(chunk.indices, 1));
  return g;
}

function StepMeshes({
  chunks,
  half,
  autoRotate,
  view,
  blockOf,
  on,
  highlight,
  steelPaint,
}: {
  chunks: MeshChunk[];
  half: [number, number, number];
  autoRotate: boolean;
  view: View;
  blockOf: string[];
  on: Record<string, boolean>;
  highlight: boolean;
  steelPaint: boolean;
}) {
  const ref = useRef<Group>(null);
  const geos = useMemo(() => chunks.map(chunkGeometry), [chunks]);

  useLayoutEffect(() => {
    if (ref.current) ref.current.rotation.y = 0;
  }, [view]);

  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    if (autoRotate) g.rotation.y += Math.min(dt, 0.1) * 0.18;
  });

  useEffect(() => {
    return () => {
      for (const g of geos) g.dispose();
    };
  }, [geos]);

  return (
    <group ref={ref} scale={half}>
      {chunks.map((c, i) => (
        <mesh key={i} geometry={geos[i]} visible={on[blockOf[i]] !== false}>
          {highlight ? (
            <meshPhongMaterial
              {...(steelPaint ? shadeSteel(c.color) : shadeProp(c.color))}
              polygonOffset
              polygonOffsetFactor={1}
              polygonOffsetUnits={1}
            />
          ) : (
            <meshStandardMaterial
              {...shade(c.color)}
              envMapIntensity={0}
              polygonOffset
              polygonOffsetFactor={1}
              polygonOffsetUnits={1}
            />
          )}
          {highlight || c.indices.length <= 28000 ? (
            <Edges
              threshold={highlight && c.indices.length > 16000 ? 36 : 18}
              color="#0d0d0e"
            />
          ) : null}
        </mesh>
      ))}
    </group>
  );
}

function chipClass(active: boolean) {
  return cn(
    "h-8 rounded-sm px-2.5 font-mono text-[0.625rem] uppercase tracking-wider",
    active
      ? "bg-ink text-paper"
      : "bg-paper-2 text-ink-muted shadow-border hover:bg-paper-3 hover:text-ink",
  );
}

export function StepViewer({ project }: { project: Project }) {
  const [mesh, setMesh] = useState<LoadedMesh | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(false);
  const [view, setView] = useState<View>("iso");
  const [drawn, setDrawn] = useState(false);
  const [on, setOn] = useState<Record<string, boolean>>(() => allBlocksOn(project));
  const toggles = toggleBlocks(project);

  const blockOf = useMemo(
    () => (mesh ? assignBlocks(mesh.chunks, project.blocks) : []),
    [mesh, project.blocks],
  );

  useEffect(() => {
    setOn(allBlocksOn(project));
    setMesh(null);
    setDrawn(false);
    setError(null);
    setView("iso");
    let alive = true;
    stepMeshPromise(project)
      .then((m) => {
        if (alive) setMesh(m);
      })
      .catch((e: unknown) => {
        if (alive) setError(e instanceof Error ? e.message : "Could not load STEP");
      });
    return () => {
      alive = false;
    };
  }, [project]);

  const radius = mesh?.radius ?? 1;
  const half = mesh?.half ?? ([1, 1, 1] as [number, number, number]);
  const cam = cameraFor(view, half);
  const highlight =
    project.slug === "prop-simulator" ||
    project.slug === "vw-dining-table" ||
    project.slug === "camper-topper";
  const steelPaint = project.slug === "vw-dining-table" || project.slug === "camper-topper";

  return (
    <div className="relative h-full min-h-0 overflow-hidden" style={{ background: PAPER }}>
      <img src={project.poster} alt={project.copy.projectName} className="model-print" />
      <div className="model-live">
        <div className="relative min-h-0 flex-1" style={{ background: PAPER }}>
          {mesh ? (
            <Canvas
              className="!absolute inset-0 h-full w-full"
              dpr={[1, 2]}
              camera={{ position: cam, fov: 30, near: Math.max(0.05, radius / 80), far: Math.max(4000, radius * 20) }}
              resize={{ debounce: 0 }}
              gl={{
                antialias: true,
                alpha: false,
                preserveDrawingBuffer: false,
                toneMapping: NoToneMapping,
                outputColorSpace: SRGBColorSpace,
                powerPreference: "high-performance",
                failIfMajorPerformanceCaveat: false,
              }}
              onCreated={({ gl, scene }) => {
                gl.setClearColor(PAPER_COLOR, 1);
                scene.background = PAPER_COLOR;
                scene.environment = null;
                setDrawn(true);
              }}
            >
              <Suspense fallback={null}>
                <color attach="background" args={[PAPER]} />
                <ambientLight intensity={0.78} color="#ffffff" />
                <hemisphereLight args={["#ffffff", "#ececec", 0.5]} />
                <directionalLight
                  position={[radius * 0.85, radius * 1.6, radius * 1.25]}
                  intensity={1.15}
                  color="#ffffff"
                />
                <directionalLight
                  position={[-radius * 1.2, radius * 0.7, radius * 0.35]}
                  intensity={0.38}
                  color="#ffffff"
                />
                <directionalLight
                  position={[radius * 0.1, radius * 0.45, -radius * 1.4]}
                  intensity={0.28}
                  color="#ffffff"
                />
                {highlight ? (
                  <directionalLight
                    position={[radius * 1.15, radius * 1.85, radius * 0.55]}
                    intensity={2.05}
                    color="#ffffff"
                  />
                ) : null}
                <StepMeshes
                  chunks={mesh.chunks}
                  half={mesh.half}
                  autoRotate={autoRotate && view === "iso"}
                  view={view}
                  blockOf={blockOf}
                  on={on}
                  highlight={highlight}
                  steelPaint={steelPaint}
                />
                <OrbitControls
                  makeDefault
                  target={[0, 0, 0]}
                  minDistance={Math.max(0.6, radius * 0.4)}
                  maxDistance={Math.max(80, radius * 12)}
                  maxPolarAngle={Math.PI / 2.02}
                  enablePan={false}
                />
                <ViewRig view={view} half={half} />
              </Suspense>
            </Canvas>
          ) : error ? (
            <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-[0.18em] text-ink-subtle">
              {error}
            </div>
          ) : null}
          {!drawn && !error ? (
            <img src={project.poster} alt="" className="absolute inset-0 h-full w-full object-contain" />
          ) : null}
          <div className="pointer-events-none absolute left-2.5 top-2.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-subtle">
            STEP AP214
          </div>
        </div>
        <div className="viewer-bar print:hidden">
            <div className="flex flex-wrap items-center gap-1">
              {(
                [
                  ["iso", "ISO"],
                  ["front", "Front"],
                  ["left", "Left"],
                  ["top", "Top"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => {
                    setView(id);
                    setAutoRotate(id === "iso" ? autoRotate : false);
                  }}
                  className={chipClass(view === id)}
                >
                  {label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setAutoRotate((v) => !v)}
                className={cn("ml-auto", chipClass(autoRotate))}
              >
                Turn
              </button>
            </div>
            {toggles.length ? (
              <div className="flex flex-wrap items-center gap-1">
                {toggles.map((b) => {
                  const visible = on[b.id];
                  const Icon = visible ? Eye : EyeOff;
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setOn((prev) => ({ ...prev, [b.id]: !prev[b.id] }))}
                      className={cn(chipClass(visible), "inline-flex items-center gap-1.5")}
                      aria-pressed={visible}
                      title={visible ? `Hide ${b.label}` : `Show ${b.label}`}
                    >
                      <Icon className="size-3.5" strokeWidth={1.75} />
                      {b.label}
                    </button>
                  );
                })}
              </div>
            ) : null}
        </div>
      </div>
    </div>
  );
}
