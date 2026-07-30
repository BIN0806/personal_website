import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Twitter, ChevronDown } from "lucide-react";
import { profile, socialLinks } from "@/data/portfolio-data";
import ActivitySection from "@/components/activity-section";
import HeroProfileTabs from "@/components/hero-profile-tabs";

const iconMap: Record<string, typeof Github> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
};

export default function HeroSection() {
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => setShowScrollHint(false), 5000);

    const onScroll = () => {
      if (window.scrollY >= 120) setShowScrollHint(false);
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.clearTimeout(fadeTimer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16 pb-16" id="about">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-lg pixel-icon"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-32 h-32 bg-accent/10 rounded-lg pixel-icon"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-24 h-24 bg-secondary/10 rounded-lg pixel-icon"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 relative z-10 w-full">
        <div className="max-w-3xl mx-auto w-full flex flex-col items-center text-center space-y-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full text-center text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight vintage-hover-accent cursor-pointer"
          >
            {profile.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full"
          >
            <HeroProfileTabs />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full flex flex-col items-center justify-center pt-2 gap-7"
          >
            <div className="flex items-center justify-center gap-7">
              {socialLinks.map((link) => {
                const IconComponent = iconMap[link.icon.toLowerCase()] || Mail;
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-muted hover:bg-muted/80 rounded-xl flex items-center justify-center transition-all hover:scale-110 text-muted-foreground hover:text-foreground"
                    data-testid={`social-link-${link.platform.toLowerCase()}`}
                  >
                    <IconComponent className="w-7 h-7" />
                  </a>
                );
              })}
            </div>

            <ActivitySection embedded />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showScrollHint && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed bottom-8 left-0 right-0 z-40 pointer-events-none"
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full flex justify-center">
              <div className="w-full max-w-3xl flex justify-center">
                <button
                  onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
                  className="scroll-indicator flex flex-col items-center text-center text-muted-foreground hover:text-primary transition-colors pointer-events-auto"
                  data-testid="button-scroll-down"
                >
                  <span className="text-base mb-2">Scroll to explore</span>
                  <ChevronDown className="w-7 h-7" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
