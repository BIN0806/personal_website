import { ExternalLink } from "lucide-react";
import CollapsibleSection from "@/components/collapsible-section";
import type { ResumeEntry } from "@shared/schema";

type ResumeSectionProps = {
  title: string;
  sectionId: string;
  entries: ResumeEntry[];
  isInView: boolean;
  delay?: number;
  testIdPrefix: string;
};

export default function ResumeSection({
  title,
  sectionId,
  entries,
  isInView,
  delay = 0.2,
  testIdPrefix,
}: ResumeSectionProps) {
  return (
    <CollapsibleSection
      id={sectionId}
      title={title}
      isInView={isInView}
      delay={delay}
      testId={`${testIdPrefix}-toggle`}
    >
      {entries.length > 0 ? (
        <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl p-8 md:p-10">
          <div className="space-y-8">
            {entries.map((entry, index) => (
              <div
                key={entry.id}
                className={`${
                  index < entries.length - 1 ? "border-b border-border pb-8" : ""
                }`}
                data-testid={`${testIdPrefix}-entry-${index}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <div>
                    <h3
                      className="text-xl font-bold text-foreground"
                      data-testid={`${testIdPrefix}-title-${index}`}
                    >
                      {entry.title}
                    </h3>
                    {entry.subtitle && (
                      <p
                        className="text-muted-foreground"
                        data-testid={`${testIdPrefix}-subtitle-${index}`}
                      >
                        {entry.subtitle}
                      </p>
                    )}
                  </div>
                  {entry.date && (
                    <p
                      className="text-sm text-muted-foreground shrink-0 sm:text-right"
                      data-testid={`${testIdPrefix}-date-${index}`}
                    >
                      {entry.date}
                    </p>
                  )}
                </div>

                {entry.description && (
                  <p
                    className="text-muted-foreground leading-relaxed mb-3"
                    data-testid={`${testIdPrefix}-description-${index}`}
                  >
                    {entry.description}
                  </p>
                )}

                {entry.highlights && entry.highlights.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-3">
                    {entry.highlights.map((highlight, highlightIndex) => (
                      <li
                        key={highlightIndex}
                        data-testid={`${testIdPrefix}-highlight-${index}-${highlightIndex}`}
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}

                {entry.tags && entry.tags.length > 0 && (
                  <p
                    className="text-sm text-muted-foreground"
                    data-testid={`${testIdPrefix}-tags-${index}`}
                  >
                    <span className="font-medium text-foreground">Technologies: </span>
                    {entry.tags.join(", ")}
                  </p>
                )}

                {entry.link && (
                  <a
                    href={entry.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    data-testid={`${testIdPrefix}-link-${index}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    View
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-muted-foreground italic">Nothing here yet.</p>
      )}
    </CollapsibleSection>
  );
}
