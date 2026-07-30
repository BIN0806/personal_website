import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Github, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { projects, selfLearning } from "@/data/portfolio-data";
import OtherProjectsSection from "@/components/other-projects-section";
import CollapsibleSection from "@/components/collapsible-section";
import ResumeSection from "@/components/resume-section";
import ExtraSection from "@/components/extra-section";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import kiVideo from "@/demo/ki.mp4";
import nanoVideo from "@/demo/nano.mp4";
import translateVideo from "@/demo/translate.mp4";
import comfortVideo from "@/demo/comfort.mp4";
import planAVideo from "@/demo/PlanADemo.mp4";

export default function PortfolioSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const featuredProjects = projects.filter(p => p.featured);
  const currentProject = featuredProjects[currentIndex];

  // Map project IDs to their video files
  const projectVideos: Record<string, string> = {
    'project-1': planAVideo, // Plan A
    'project-2': kiVideo, // Ki Drone
    'project-3': nanoVideo, // Nanotechnology
    'project-4': translateVideo, // Google Meet Translate
    'project-5': comfortVideo, // Comfort Zone
  };

  const currentProjectHasVideo = Boolean(currentProject && projectVideos[currentProject.id]);

  // Map project IDs to their native aspect ratios (width/height)
  // Embedding explicit Tailwind classes to ensure they are included at build time
  const projectAspectClass: Record<string, string> = {
    'project-1': 'aspect-[16/9]',           // Plan A (default 16:9)
    'project-2': 'aspect-[2026/1338]',      // Ki Drone (~1.51)
    'project-3': 'aspect-[1260/720]',       // Nanotechnology (16:9 ~1.75)
    'project-4': 'aspect-[3416/1794]',      // Google Meet Translate (~1.90)
    'project-5': 'aspect-[3152/1982]',      // Comfort (~1.59)
  };

  // Map project IDs to their GitHub repository URLs
  const projectGitHubLinks: Record<string, string> = {
    'project-1': 'https://github.com/BIN0806/Type-A-Itinerary',
    'project-4': 'https://github.com/BIN0806/LiveVideoTranslation',
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

  useEffect(() => {
    if (!videoRef.current) return;

    if (isDemoOpen) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isDemoOpen, currentIndex]);

  return (
    <section className="pt-24 lg:pt-32 pb-24 lg:pb-32 bg-background" ref={ref} id="portfolio">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <CollapsibleSection
          id="featured-projects"
          title="Featured Personal and Internship Projects"
          isInView={isInView}
          testId="featured-projects-toggle"
          className="mt-0"
          triggerClassName="mb-12"
          contentClassName="pt-2"
        >
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
                  {/* Project Info Card with navigation arrows */}
                  <div className="relative flex items-center gap-3 lg:gap-6 group py-1">
                    <button
                      type="button"
                      onClick={prevSlide}
                      className="flex-shrink-0 cursor-pointer flex items-center justify-center text-muted-foreground/40 hover:text-muted-foreground transition-colors"
                      aria-label="Previous project"
                      data-testid={`button-prev-project-${currentIndex}`}
                    >
                      <ChevronLeft className="w-10 h-10 lg:w-12 lg:h-12" />
                    </button>

                    <div className="flex-1 min-w-0 bg-card border border-border rounded-2xl p-8 md:p-10 vintage-card-hover">
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
                      
                      {projectGitHubLinks[featuredProjects[currentIndex].id] ? (
                        <div className="flex items-center gap-4">
                          <a 
                            href={projectGitHubLinks[featuredProjects[currentIndex].id]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                            data-testid={`button-github-${currentIndex}`}
                          >
                            <Github className="w-5 h-5" />
                            Code
                          </a>
                        </div>
                      ) : (
                        <div className="text-muted-foreground italic">
                          <p className="text-base font-medium">Proprietary Code</p>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={nextSlide}
                      className="flex-shrink-0 cursor-pointer flex items-center justify-center text-muted-foreground/40 hover:text-muted-foreground transition-colors"
                      aria-label="Next project"
                      data-testid={`button-next-project-${currentIndex}`}
                    >
                      <ChevronRight className="w-10 h-10 lg:w-12 lg:h-12" />
                    </button>
                  </div>

                  {currentProjectHasVideo && (
                    <Collapsible
                      open={isDemoOpen}
                      onOpenChange={setIsDemoOpen}
                    >
                      <CollapsibleTrigger
                        className="w-full flex items-center justify-between px-4 py-3 bg-muted/50 hover:bg-muted border border-border rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                        data-testid={`button-toggle-demo-${currentIndex}`}
                      >
                        <span>Video Demo</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isDemoOpen ? "rotate-180" : ""
                          }`}
                        />
                      </CollapsibleTrigger>

                      <CollapsibleContent className="pt-4 overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                        <div className={`relative rounded-2xl overflow-hidden border border-border vintage-card-hover bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 w-full ${projectAspectClass[currentProject.id] || 'aspect-[16/9]'}`}>
                          <video
                            key={currentProject.id}
                            ref={videoRef}
                            className="w-full h-full object-contain"
                            autoPlay={isDemoOpen}
                            loop
                            muted
                            playsInline
                          >
                            <source src={projectVideos[currentProject.id]} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  )}

                  {currentProject && !projectVideos[currentProject.id] && (
                    <div className="relative rounded-2xl overflow-hidden border border-border vintage-card-hover bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 w-full aspect-[16/9]">
                      <div className="flex items-center justify-center h-full pixel-icon">
                        <div className="relative z-10 flex flex-col items-center gap-4">
                          <div className="text-8xl font-bold text-foreground/10">
                            {currentProject.name.substring(0, 2).toUpperCase()}
                          </div>
                          <p className="text-muted-foreground/50 text-sm font-medium">Project Preview</p>
                        </div>
                      </div>
                    </div>
                  )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
        </CollapsibleSection>

        <OtherProjectsSection isInView={isInView} delay={0.2} />

        <ResumeSection
          title="Self-Learning"
          sectionId="self-learning"
          entries={selfLearning}
          isInView={isInView}
          delay={0.3}
          testIdPrefix="self-learning"
        />

        <ExtraSection />
      </div>
    </section>
  );
}
