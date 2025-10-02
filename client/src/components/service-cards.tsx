import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Palette, Zap, CheckCircle } from "lucide-react";

const services = [
  {
    id: "strategy",
    title: "Strategy",
    subtitle: "Campaign Strategy",
    icon: Lightbulb,
    color: "primary",
    features: [
      "Audience Segmentation",
      "Competitor Analysis", 
      "Budget Planning",
      "Goal Setting & KPIs",
      "Timeline Mapping",
      "Channel Selection"
    ]
  },
  {
    id: "design",
    title: "Design", 
    subtitle: "Content Creation",
    icon: Palette,
    color: "accent",
    features: [
      "Email Templates",
      "Social Media Assets",
      "Landing Pages", 
      "Ad Copy & Creatives",
      "Brand Guidelines",
      "A/B Testing Variants"
    ]
  },
  {
    id: "execute",
    title: "Execute",
    subtitle: "Campaign Execution", 
    icon: Zap,
    color: "secondary",
    features: [
      "Multi-channel Deployment",
      "Automated Scheduling",
      "Real-time Monitoring",
      "Performance Tracking",
      "Team Collaboration", 
      "Automated Reporting"
    ]
  }
];

export default function ServiceCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Complete Campaign Lifecycle
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From strategy to execution, manage every aspect of your marketing campaigns in one unified platform.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="service-card bg-card border border-border rounded-2xl p-8 hover-lift"
                data-testid={`card-${service.id}`}
              >
                <div className="mb-6">
                  <div className={`w-16 h-16 bg-${service.color}/10 rounded-xl flex items-center justify-center pixel-icon mb-4 transition-transform group-hover:scale-110`}>
                    <IconComponent className={`w-8 h-8 text-${service.color}`} />
                  </div>
                  <span className="text-xs font-mono text-muted-foreground tracking-wider uppercase">
                    {service.title}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {service.subtitle}
                </h3>
                
                <ul className="space-y-3 text-muted-foreground">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span data-testid={`feature-${service.id}-${featureIndex}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`mt-8 w-full py-3 bg-${service.color} text-${service.color}-foreground rounded-lg font-medium hover:opacity-90 transition-opacity`}
                  data-testid={`button-explore-${service.id}`}
                >
                  Explore {service.title} Tools
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
