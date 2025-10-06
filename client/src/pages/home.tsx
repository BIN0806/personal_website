import HeroSection from "@/components/hero-section";
import ServiceCards from "@/components/service-cards";
import ProcessSection from "@/components/process-section";
import PortfolioSection from "@/components/portfolio-section";
import Footer from "@/components/footer";
import { ChevronDown, Code2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? "glass-effect shadow-lg" : "bg-background/80 backdrop-blur-sm"
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center pixel-icon">
                <Code2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Billy Nguyen's Catalog</span>
            </button>
            
            <div className="flex items-center gap-8">
              <button 
                onClick={() => scrollToSection("about")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid="nav-about"
              >
                About Me
              </button>
              <button 
                onClick={() => scrollToSection("process")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid="nav-process"
              >
                Workflow
              </button>
              <button 
                onClick={() => scrollToSection("portfolio")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid="nav-portfolio"
              >
                Projects
              </button>
            </div>
          </div>
        </div>
      </nav>

      <HeroSection />

      <div className="flex justify-center pb-8">
        <button
          onClick={() => scrollToSection("about")}
          className="scroll-indicator flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
          data-testid="button-scroll-down"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>

      <ServiceCards />
      <ProcessSection />
      <PortfolioSection />
      <Footer />
    </div>
  );
}
