import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/data/portfolio-data";
import kiVideo from "@/demo/ki.mp4";
import nanoVideo from "@/demo/nano.mp4";
import translateVideo from "@/demo/translate.mp4";
import comfortVideo from "@/demo/comfort.mp4";

export default function PortfolioSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, +1 for right

  const featuredProjects = projects.filter(p => p.featured);

  // Map project IDs to their video files
  const projectVideos: Record<string, string> = {
    'project-1': kiVideo, // Ki Drone
    'project-2': nanoVideo, // Nanotechnology
    'project-3': translateVideo, // Google Meet Translate
    'project-4': comfortVideo, // Comfort Zone
  };

  // Map project IDs to their native aspect ratios (width/height)
  // Embedding explicit Tailwind classes to ensure they are included at build time
  const projectAspectClass: Record<string, string> = {
    'project-1': 'aspect-[2026/1338]',      // Ki Drone (~1.51)
    'project-2': 'aspect-[1260/720]',       // Nanotechnology (16:9 ~1.75)
    'project-3': 'aspect-[3416/1794]',      // Google Meet Translate (~1.90)
    'project-4': 'aspect-[3152/1982]',      // Comfort (~1.59)
  };

  const nextSlide = () => {
    if (featuredProjects) {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
    }
  };

  const prevSlide = () => {
    if (featuredProjects) {
      setDirection(-1);
      setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
    }
  };

  const goToSlide = (index: number) => {
    const newDirection = index > currentIndex ? 1 : -1;
    setDirection(newDirection);
    setCurrentIndex(index);
  };

  return (
    <section className="pt-24 lg:pt-32 pb-0 bg-background" ref={ref} id="portfolio">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Featured Personal and Internship Projects
          </h2>

        </motion.div>

        <div className="relative max-w-7xl mx-auto">
          {/* Carousel Container */}
          <div className="relative">
            <AnimatePresence mode="wait" initial={false}>
              {featuredProjects && featuredProjects[currentIndex] && (
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ 
                    duration: 0.5,
                    ease: [0.32, 0.72, 0, 1]
                  }}
                  className="flex flex-col"
                  data-testid={`project-card-${currentIndex}`}
                >
                  <div className="w-full mx-auto space-y-6">
                  {/* Top - Project Info Card */}
                  <div className="bg-card border border-border rounded-2xl p-8 md:p-10 group vintage-card-hover">
                    <div>
                      <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid={`project-name-${currentIndex}`}>
                        {featuredProjects[currentIndex].name}
                      </h3>
                      
                      <p className="text-muted-foreground mb-8 text-lg leading-relaxed" data-testid={`project-description-${currentIndex}`}>
                        {featuredProjects[currentIndex].description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-8">
                        {featuredProjects[currentIndex].tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex} 
                            className="px-3 py-1.5 bg-muted rounded-lg text-sm font-medium text-muted-foreground"
                            data-testid={`project-tag-${currentIndex}-${tagIndex}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Conditional rendering: Proprietary Code or Buttons */}
                    {(['project-1', 'project-2', 'project-4'].includes(featuredProjects[currentIndex].id)) ? (
                      <div className="text-muted-foreground italic">
                        <p className="text-base font-medium">Proprietary Code</p>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        {/* View Project Button - Commented out for now
                        <button 
                          className="flex items-center gap-2 text-base font-medium text-primary hover:text-primary/80 transition-colors"
                          data-testid={`button-view-project-${currentIndex}`}
                        >
                          <ExternalLink className="w-5 h-5" />
                          View Project
                        </button>
                        */}
                        
                        {/* GitHub Link - Add your repo URL here */}
                        <a 
                          href="https://github.com/BIN0806/LiveVideoTranslation"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                          data-testid={`button-github-${currentIndex}`}
                        >
                          <Github className="w-5 h-5" />
                          Code
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Bottom - Video Demo */}
                  <div className={`relative rounded-2xl overflow-hidden border border-border vintage-card-hover bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 w-full ${projectAspectClass[featuredProjects[currentIndex].id] || 'aspect-[16/9]'}`}>
                    {projectVideos[featuredProjects[currentIndex].id] ? (
                      <video 
                        className="w-full h-full object-contain"
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                      >
                        <source src={projectVideos[featuredProjects[currentIndex].id]} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <div className="flex items-center justify-center h-full pixel-icon">
                        <div className="relative z-10 flex flex-col items-center gap-4">
                          <div className="text-8xl font-bold text-foreground/10">
                            {featuredProjects[currentIndex].name.substring(0, 2).toUpperCase()}
                          </div>
                          <p className="text-muted-foreground/50 text-sm font-medium">Project Preview</p>
                        </div>
                      </div>
                    )}
                  </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 w-12 h-12 bg-card border-2 border-border rounded-full flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all shadow-lg"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 w-12 h-12 bg-card border-2 border-border rounded-full flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition-all shadow-lg"
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {featuredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'w-8 bg-primary' 
                    : 'w-2 bg-muted hover:bg-muted-foreground/50'
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
