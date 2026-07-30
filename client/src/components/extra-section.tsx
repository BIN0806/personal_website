import { useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Heart } from "lucide-react";
import CollapsibleSection from "@/components/collapsible-section";
import { skills } from "@/data/portfolio-data";

const iconMap: Record<string, typeof BookOpen> = {
  book: BookOpen,
  heart: Heart,
};

export default function ExtraSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref}>
      <CollapsibleSection id="extra" title="Extra" isInView={isInView} testId="extra-toggle">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {skills.map((skill) => {
            const IconComponent = iconMap[skill.icon as keyof typeof iconMap] || BookOpen;

            return (
              <div
                key={skill.id}
                className="service-card bg-card border border-border rounded-2xl p-8 vintage-card-hover group"
                data-testid={`card-${skill.id}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <IconComponent className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">{skill.title}</h3>
                </div>

                <ul className="space-y-3 text-muted-foreground list-disc list-inside">
                  {skill.features.map((feature, featureIndex) => (
                    <li key={featureIndex} data-testid={`feature-${skill.id}-${featureIndex}`}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </CollapsibleSection>
    </div>
  );
}
