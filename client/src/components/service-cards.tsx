import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Code, Heart } from "lucide-react";
import { skills } from "@/data/portfolio-data";

const iconMap: Record<string, any> = {
  book: BookOpen,
  code: Code,
  heart: Heart,
};


export default function ServiceCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 bg-background" ref={ref} id="about">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get to know me better - my background, technical expertise, and what drives my passion for technology.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon] || BookOpen;
            
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="service-card bg-card border border-border rounded-2xl p-8 vintage-card-hover group"
                data-testid={`card-${skill.id}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <IconComponent className="w-8 h-8 text-primary" />
                  <h3 className="text-2xl font-bold text-foreground">
                    {skill.title}
                  </h3>
                </div>
                
                <ul className="space-y-3 text-muted-foreground list-disc list-inside">
                  {skill.features.map((feature, featureIndex) => (
                    <li key={featureIndex} data-testid={`feature-${skill.id}-${featureIndex}`}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
