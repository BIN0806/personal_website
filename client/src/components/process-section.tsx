import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, PenTool, Settings, BarChart3 } from "lucide-react";

const processSteps = [
  {
    number: "01",
    title: "Define",
    description: "Set your campaign objectives, target audience, and key performance indicators. Our AI-powered insights help you make data-driven decisions.",
    icon: Target,
    color: "primary",
    features: ["Goal Setting", "Audience Research", "Budget Allocation"]
  },
  {
    number: "02", 
    title: "Design",
    description: "Create compelling content and visuals using our integrated design tools and templates. Maintain brand consistency across all channels.",
    icon: PenTool,
    color: "accent",
    features: ["Content Creation", "Asset Management", "Brand Guidelines"]
  },
  {
    number: "03",
    title: "Build", 
    description: "Configure campaign parameters, set up automation workflows, and schedule deployment across multiple channels simultaneously.",
    icon: Settings,
    color: "secondary",
    features: ["Multi-channel Setup", "Automation Rules", "A/B Testing"]
  },
  {
    number: "04",
    title: "Run",
    description: "Launch your campaign and monitor performance in real-time. Our analytics dashboard provides actionable insights for optimization.",
    icon: BarChart3,
    color: "primary",
    features: ["Real-time Analytics", "Performance Tracking", "Continuous Optimization"]
  }
];

export default function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 bg-muted/30" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-sm font-medium text-accent mb-6">
            WORKFLOW METHODOLOGY
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Our Proven
            <span className="gradient-text"> Campaign Process</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four strategic phases that transform your marketing vision into measurable results.
          </p>
        </motion.div>

        {/* Process Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mb-16"
        >
          <div className="rounded-2xl w-full h-64 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 flex items-center justify-center border border-border">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-foreground mb-2">Streamlined Campaign Execution</h3>
              <p className="text-muted-foreground">From concept to conversion in four strategic steps</p>
            </div>
          </div>
        </motion.div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => {
            const IconComponent = step.icon;
            
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
                  <div className={`text-6xl font-bold text-${step.color}/20 font-mono`}>
                    {step.number}
                  </div>
                  <div className={`w-16 h-16 bg-${step.color}/10 rounded-xl flex items-center justify-center`}>
                    <IconComponent className={`text-${step.color} text-2xl`} />
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
                      <div className={`w-1.5 h-1.5 bg-${step.color} rounded-full mt-1.5 mr-2 flex-shrink-0`}></div>
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-12"
        >
          <button 
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity"
            data-testid="button-view-process-guide"
          >
            View Complete Process Guide →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
