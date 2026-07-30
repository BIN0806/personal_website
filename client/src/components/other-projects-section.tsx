import { ChevronDown } from "lucide-react";
import CollapsibleSection from "@/components/collapsible-section";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { otherProjectCategories } from "@/data/other-projects-data";
import type { OtherProject } from "@shared/schema";

type OtherProjectsSectionProps = {
  isInView: boolean;
  delay?: number;
};

function ProjectEntry({ project }: { project: OtherProject }) {
  return (
    <div className="py-5 first:pt-0 last:pb-0 border-b border-border last:border-b-0">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
        <h4 className="text-lg font-bold text-foreground">{project.title}</h4>
        <p className="text-sm text-muted-foreground shrink-0 sm:text-right">{project.tags.join(", ")}</p>
      </div>
      <p className="text-muted-foreground leading-relaxed">{project.description}</p>
    </div>
  );
}

export default function OtherProjectsSection({ isInView, delay = 0.2 }: OtherProjectsSectionProps) {
  return (
    <CollapsibleSection
      id="other-projects"
      title="Other Projects"
      isInView={isInView}
      delay={delay}
      testId="other-projects-toggle"
    >
      <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl p-6 md:p-8">
        <div className="space-y-2">
          {otherProjectCategories.map((category) => (
            <Collapsible key={category.id} defaultOpen={false}>
              <CollapsibleTrigger
                className="group w-full flex items-center justify-between gap-4 px-4 py-3 rounded-xl hover:bg-muted/50 transition-colors text-left"
                data-testid={`other-projects-category-${category.id}`}
              >
                <span className="text-base md:text-lg font-semibold text-foreground">
                  {category.name}
                </span>
                <span className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-muted-foreground">
                    {category.projects.length} project{category.projects.length === 1 ? "" : "s"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </span>
              </CollapsibleTrigger>

              <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <div className="px-4 pb-4 pt-1">
                  {category.projects.map((project) => (
                    <ProjectEntry key={project.id} project={project} />
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </CollapsibleSection>
  );
}
