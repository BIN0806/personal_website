import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/data/portfolio-data";

export default function PortfolioSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredProjects = projects.filter(p => p.featured);

  const nextSlide = () => {
    if (featuredProjects) {
      setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
    }
  };

  const prevSlide = () => {
    if (featuredProjects) {
      setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-24 lg:py-32 bg-background" ref={ref} id="portfolio">
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
                  className="grid md:grid-cols-2 gap-8 items-center"
                  data-testid={`project-card-${currentIndex}`}
                >
                  {/* Left Side - Vertical Card */}
                  <div className="bg-card border border-border rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[600px] group vintage-card-hover">
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
                    {(featuredProjects[currentIndex].id === 'project-1' || featuredProjects[currentIndex].id === 'project-2') ? (
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
                  
                  {/* Right Side - GIF Placeholder */}
                  <div className="relative bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 rounded-2xl flex items-center justify-center pixel-icon min-h-[600px] overflow-hidden group border border-border vintage-card-hover">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10 flex flex-col items-center gap-4">
                      <div className="text-8xl font-bold text-foreground/10">
                        {featuredProjects[currentIndex].name.substring(0, 2).toUpperCase()}
                      </div>
                      <p className="text-muted-foreground/50 text-sm font-medium">Project Preview</p>
                    </div>
                    {/* Replace this div with: <img src="your-gif.gif" alt="..." className="w-full h-full object-cover" /> */}
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
