import { motion } from "framer-motion";
import { Rocket, Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-lg"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-32 h-32 bg-accent/10 rounded-lg"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-secondary/10 rounded-lg"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm font-medium text-muted-foreground mb-4"
          >
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            Automated Marketing Campaign Management
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight"
          >
            Create & Track<br/>
            <span className="gradient-text">Marketing Campaigns</span><br/>
            Like a Pro
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            The ultimate business tool for executives. Plan, execute, and analyze your marketing campaigns with automated backup and real-time insights.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-4 pt-8"
          >
            <button 
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg text-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg flex items-center gap-2"
              data-testid="button-start-trial-hero"
            >
              <Rocket className="w-5 h-5" />
              Start Free Trial
            </button>
            <button 
              className="px-8 py-4 bg-card text-card-foreground border-2 border-border rounded-lg text-lg font-semibold hover:border-primary transition-all flex items-center gap-2"
              data-testid="button-watch-demo"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-8 pt-12 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 text-accent">✓</span>
              <span>Automated Backups</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 text-accent">✓</span>
              <span>Real-time Analytics</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 text-accent">✓</span>
              <span>Team Collaboration</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
