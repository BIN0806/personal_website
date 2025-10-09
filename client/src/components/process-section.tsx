import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, PenTool, Settings, Rocket } from "lucide-react";
import { processSteps } from "@/data/portfolio-data";

const iconMap = [Target, PenTool, Settings, Rocket];
const colorMap = ["primary", "accent", "secondary", "primary"];

export default function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 bg-muted/30" ref={ref} id="process">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            How I Create
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            My process of transforming ideas into products through phases of strategic planning and execution.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mb-16"
        >
      
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => {
            const IconComponent = iconMap[index] || Target;
            const color = colorMap[index] || "primary";
            
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="process-step bg-card rounded-2xl p-8 border border-border vintage-card-hover"
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
