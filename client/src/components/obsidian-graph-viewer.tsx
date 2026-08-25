import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ForceGraph2D, { type ForceGraphMethods, type NodeObject, type LinkObject } from "react-force-graph-2d";
import { X, Search, ZoomIn, ZoomOut, Maximize2 } from "lucide-react";

type GraphNode = {
  id: string;
  title: string;
  group: string;
  tags: string[];
  exists: boolean;
  x?: number;
  y?: number;
};

type GraphLink = {
  source: string | GraphNode;
  target: string | GraphNode;
};

type GraphData = {
  generatedAt?: string;
  nodeCount: number;
  linkCount: number;
  nodes: GraphNode[];
  links: GraphLink[];
};

const GROUP_COLORS: Record<string, string> = {
  CodingVerse: "#8a1f2d",
  SchoolVerse: "#3b5b84",
  BillyVerse: "#6b4c2a",
  Industry: "#2f6b4f",
  Excalidraw: "#7a5a2b",
  "IW-Queues": "#5c4d7a",
  "LLM-D": "#8a4a3a",
  TemplateVerse: "#4a5560",
  Root: "#5a5348",
  Unresolved: "#9a9086",
};

function colorForGroup(group: string) {
  return GROUP_COLORS[group] ?? "#5a5348";
}

type ObsidianGraphViewerProps = {
  open: boolean;
  onClose: () => void;
};

export default function ObsidianGraphViewer({ open, onClose }: ObsidianGraphViewerProps) {
  const graphRef = useRef<ForceGraphMethods<NodeObject<GraphNode>, LinkObject<GraphNode, GraphLink>> | undefined>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [hovered, setHovered] = useState<GraphNode | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!open) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch("/obsidian-graph.json")
      .then(async (response) => {
        if (!response.ok) throw new Error(`Failed to load graph (${response.status})`);
        return response.json() as Promise<GraphData>;
      })
      .then((data) => {
        if (!cancelled) setGraphData(data);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const updateSize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const filtered = useMemo(() => {
    if (!graphData) return { nodes: [] as GraphNode[], links: [] as GraphLink[] };
    const q = query.trim().toLowerCase();
    if (!q) return { nodes: graphData.nodes, links: graphData.links };

    const matched = new Set(
      graphData.nodes
        .filter(
          (node) =>
            node.title.toLowerCase().includes(q) ||
            node.id.toLowerCase().includes(q) ||
            node.group.toLowerCase().includes(q) ||
            node.tags.some((tag) => tag.toLowerCase().includes(q)),
        )
        .map((node) => node.id),
    );

    const nodes = graphData.nodes.filter((node) => matched.has(node.id));
    const links = graphData.links.filter((link) => {
      const source = typeof link.source === "string" ? link.source : link.source.id;
      const target = typeof link.target === "string" ? link.target : link.target.id;
      return matched.has(source) && matched.has(target);
    });

    return { nodes, links };
  }, [graphData, query]);

  const paintNode = useCallback(
    (node: NodeObject<GraphNode>, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const label = node.title;
      const fontSize = Math.max(10 / globalScale, 2.5);
      const radius = Math.max(3.5 / globalScale, 1.4);
      const isHover = hovered?.id === node.id;
      const isMatch = query.trim() && label.toLowerCase().includes(query.trim().toLowerCase());

      ctx.beginPath();
      ctx.arc(node.x ?? 0, node.y ?? 0, radius * (isHover || isMatch ? 1.45 : 1), 0, 2 * Math.PI);
      ctx.fillStyle = colorForGroup(node.group);
      ctx.globalAlpha = node.exists === false ? 0.45 : 1;
      ctx.fill();
      ctx.globalAlpha = 1;

      if (isHover || globalScale > 1.15 || isMatch) {
        ctx.font = `${fontSize}px Inter, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillStyle = "#161513";
        ctx.fillText(label, node.x ?? 0, (node.y ?? 0) + radius + 1);
      }
    },
    [hovered, query],
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] bg-[color-mix(in_srgb,var(--vintage-bg)_92%,white)]"
      role="dialog"
      aria-modal="true"
      aria-label="Obsidian learning graph"
      data-testid="obsidian-graph-viewer"
    >
      <div className="absolute inset-x-0 top-0 z-10 border-b border-border/70 bg-[color-mix(in_srgb,var(--vintage-bg)_88%,white)] backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground">Self-Learning</p>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground truncate">Obsidian Graph</h2>
            {graphData && (
              <p className="text-xs text-muted-foreground mt-0.5">
                {graphData.nodeCount} notes · {graphData.linkCount} links
                {graphData.generatedAt ? ` · Updated ${new Date(graphData.generatedAt).toLocaleString()}` : ""}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <label className="relative flex-1 sm:flex-none min-w-[12rem]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search notes, folders, tags…"
                className="w-full sm:w-64 pl-9 pr-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--vintage-accent)_35%,transparent)]"
                data-testid="obsidian-graph-search"
              />
            </label>

            <button
              type="button"
              onClick={() => graphRef.current?.zoom(1.25, 300)}
              className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-[var(--vintage-accent)] transition-colors"
              aria-label="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => graphRef.current?.zoom(0.8, 300)}
              className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-[var(--vintage-accent)] transition-colors"
              aria-label="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => graphRef.current?.zoomToFit(400, 48)}
              className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-[var(--vintage-accent)] transition-colors"
              aria-label="Fit graph"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-[var(--vintage-accent)] hover:border-[var(--vintage-accent)] transition-colors"
              data-testid="obsidian-graph-close"
            >
              <X className="w-4 h-4" />
              Close
            </button>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="absolute inset-0 pt-[7.5rem] sm:pt-[5.75rem]">
        {loading && (
          <div className="h-full flex items-center justify-center text-muted-foreground">Loading graph…</div>
        )}
        {error && (
          <div className="h-full flex items-center justify-center text-destructive px-6 text-center">{error}</div>
        )}
        {!loading && !error && graphData && size.width > 0 && size.height > 0 && (
          <ForceGraph2D
            ref={graphRef}
            width={size.width}
            height={size.height}
            graphData={filtered}
            nodeId="id"
            backgroundColor="rgba(0,0,0,0)"
            linkColor={() => "rgba(74, 70, 63, 0.28)"}
            linkWidth={1}
            cooldownTicks={120}
            onEngineStop={() => graphRef.current?.zoomToFit(400, 56)}
            nodeCanvasObject={paintNode}
            onNodeHover={(node) => setHovered((node as GraphNode | null) ?? null)}
            onNodeClick={(node) => {
              const n = node as GraphNode;
              if (n.x != null && n.y != null) {
                graphRef.current?.centerAt(n.x, n.y, 600);
                graphRef.current?.zoom(3.2, 600);
              }
            }}
          />
        )}
      </div>

      {hovered && (
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 max-w-lg w-[min(92vw,28rem)] rounded-xl border border-border bg-card/95 px-4 py-3 shadow-lg backdrop-blur-sm">
          <p className="font-semibold text-foreground">{hovered.title}</p>
          <p className="text-xs text-muted-foreground mt-1 truncate">{hovered.id}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {hovered.group}
            {hovered.tags.length ? ` · #${hovered.tags.slice(0, 4).join(" #")}` : ""}
          </p>
        </div>
      )}
    </div>
  );
}
