import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Lightbulb, Palette, Code, CheckCircle } from "lucide-react";
import type { Skill } from "@shared/schema";

const iconMap: Record<string, any> = {
  lightbulb: Lightbulb,
  palette: Palette,
  code: Code,
};

const colorMap: Record<string, string> = {
  "Strategy": "primary",
  "Design": "accent",
  "Build": "secondary",
};

export default function ServiceCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { data: skills, isLoading } = useQuery<Skill[]>({
    queryKey: ["/api/skills"],
  });

  if (isLoading) {
    return (
      <section className="py-24 lg:py-32 bg-background" ref={ref}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-6"></div>
            <div className="h-4 bg-muted rounded w-1/2 mx-auto mb-20"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-96 bg-card rounded-2xl border"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 lg:py-32 bg-background" ref={ref} id="services">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            What I Do Best
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From strategic planning to technical execution, I deliver end-to-end solutions that drive results.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills?.map((skill, index) => {
            const IconComponent = iconMap[skill.icon] || Lightbulb;
            const color = colorMap[skill.category] || "primary";
            
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="service-card bg-card border border-border rounded-2xl p-8 hover-lift group"
                data-testid={`card-${skill.id}`}
              >
                <div className="mb-6">
                  <div className={`w-16 h-16 bg-${color}/10 rounded-xl flex items-center justify-center pixel-icon mb-4 transition-transform group-hover:scale-110`}>
                    <IconComponent className={`w-8 h-8 text-${color}`} />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground tracking-wider uppercase">
                    {skill.category}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {skill.title}
                </h3>
                
                <ul className="space-y-3 text-muted-foreground mb-8">
                  {skill.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span data-testid={`feature-${skill.id}-${featureIndex}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`mt-auto w-full py-3 bg-${color} text-${color}-foreground rounded-lg font-medium hover:opacity-90 transition-opacity`}
                  data-testid={`button-explore-${skill.id}`}
                >
                  Learn More
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
