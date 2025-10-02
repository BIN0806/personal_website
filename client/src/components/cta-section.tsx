import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Calendar } from "lucide-react";

export default function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-primary via-primary to-accent relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pixel-icon" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 10px, white 10px, white 12px), 
                         repeating-linear-gradient(90deg, transparent, transparent 10px, white 10px, white 12px)`
      }}></div>
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
            Ready to Start Your Next Project?
          </h2>
          
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Let's collaborate to bring your vision to life. Whether you need a complete digital solution or expert consultation, I'm here to help.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              className="px-10 py-5 bg-white text-primary rounded-lg text-lg font-bold hover:bg-white/90 transition-all hover:scale-105 shadow-2xl w-full sm:w-auto flex items-center justify-center gap-2"
              data-testid="button-get-in-touch"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </button>
            <button 
              className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-lg text-lg font-bold hover:bg-white/10 transition-all w-full sm:w-auto flex items-center justify-center gap-2"
              data-testid="button-schedule-call"
            >
              <Calendar className="w-5 h-5" />
              Schedule a Call
            </button>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 text-white">✓</span>
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 text-white">✓</span>
              <span>Quick Response Time</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 text-white">✓</span>
              <span>Flexible Engagement</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
