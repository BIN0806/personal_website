import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Target, PenTool, Settings, Rocket } from "lucide-react";
import type { ProcessStep } from "@shared/schema";

const iconMap = [Target, PenTool, Settings, Rocket];
const colorMap = ["primary", "accent", "secondary", "primary"];

export default function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { data: processSteps, isLoading } = useQuery<ProcessStep[]>({
    queryKey: ["/api/process"],
  });

  if (isLoading) {
    return (
      <section className="py-24 lg:py-32 bg-muted/30" ref={ref}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-6"></div>
            <div className="h-4 bg-muted rounded w-1/2 mx-auto mb-20"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-96 bg-card rounded-2xl border"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 lg:py-32 bg-muted/30" ref={ref} id="process">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-sm font-medium text-accent mb-6">
            MY WORKFLOW
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How I Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A proven process that transforms ideas into successful digital products through strategic planning and execution.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mb-16"
        >
          <div className="rounded-2xl w-full h-64 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 flex items-center justify-center border border-border pixel-icon">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-foreground mb-2">Seamless Execution</h3>
              <p className="text-muted-foreground">From concept to launch in four strategic phases</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps?.map((step, index) => {
            const IconComponent = iconMap[index] || Target;
            const color = colorMap[index] || "primary";
            
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="process-step bg-card rounded-2xl p-8 border border-border hover-lift"
                data-testid={`process-step-${index + 1}`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`text-6xl font-bold text-${color}/20 font-mono`}>
                    {step.number}
                  </div>
                  <div className={`w-16 h-16 bg-${color}/10 rounded-xl flex items-center justify-center`}>
                    <IconComponent className={`text-${color} text-2xl`} />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-3" data-testid={`process-title-${index + 1}`}>
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground mb-6" data-testid={`process-description-${index + 1}`}>
                  {step.description}
                </p>
                
                <ul className="space-y-2 text-sm">
                  {step.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className={`w-1.5 h-1.5 bg-${color} rounded-full mt-1.5 mr-2 flex-shrink-0`}></div>
                      <span data-testid={`process-feature-${index + 1}-${featureIndex}`}>
                        {feature}
                      </span>
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
