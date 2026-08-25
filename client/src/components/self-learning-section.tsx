import { useState } from "react";
import { Network } from "lucide-react";
import CollapsibleSection from "@/components/collapsible-section";
import ObsidianGraphViewer from "@/components/obsidian-graph-viewer";
import type { ResumeEntry } from "@shared/schema";

type SelfLearningSectionProps = {
  entries: ResumeEntry[];
  isInView: boolean;
  delay?: number;
};

export default function SelfLearningSection({
  entries,
  isInView,
  delay = 0.3,
}: SelfLearningSectionProps) {
  const [graphOpen, setGraphOpen] = useState(false);

  return (
    <>
      <CollapsibleSection
        id="self-learning"
        title="Self-Learning"
        isInView={isInView}
        delay={delay}
        testId="self-learning-toggle"
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-left">
                <h3 className="text-xl font-bold text-foreground">Obsidian Knowledge Graph</h3>
                <p className="text-muted-foreground mt-1 leading-relaxed">
                  An interactive map of notes and links from my learning vault. Opens fullscreen —
                  explore folders, search topics, and follow connections.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setGraphOpen(true)}
                className="inline-flex items-center justify-center gap-2 shrink-0 px-4 py-2.5 rounded-xl border border-border bg-muted/40 text-sm font-semibold text-foreground hover:text-[var(--vintage-accent)] hover:border-[var(--vintage-accent)] transition-colors"
                data-testid="button-open-obsidian-graph"
              >
                <Network className="w-4 h-4" />
                Open Graph
              </button>
            </div>
          </div>

          {entries.length > 0 && (
            <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
              <div className="space-y-8">
                {entries.map((entry, index) => (
                  <div
                    key={entry.id}
                    className={index < entries.length - 1 ? "border-b border-border pb-8" : ""}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{entry.title}</h3>
                        {entry.subtitle && (
                          <p className="text-muted-foreground">{entry.subtitle}</p>
                        )}
                      </div>
                      {entry.date && (
                        <p className="text-sm text-muted-foreground shrink-0 sm:text-right">
                          {entry.date}
                        </p>
                      )}
                    </div>
                    {entry.description && (
                      <p className="text-muted-foreground leading-relaxed">{entry.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CollapsibleSection>

      <ObsidianGraphViewer open={graphOpen} onClose={() => setGraphOpen(false)} />
    </>
  );
}
