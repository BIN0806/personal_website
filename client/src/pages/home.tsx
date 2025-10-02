import HeroSection from "@/components/hero-section";
import ServiceCards from "@/components/service-cards";
import ProcessSection from "@/components/process-section";
import CampaignDashboard from "@/components/campaign-dashboard";
import BackupSection from "@/components/backup-section";
import AnalyticsSection from "@/components/analytics-section";
import { ChevronDown, BarChart3 } from "lucide-react";
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
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? "glass-effect shadow-lg" : "bg-background/80 backdrop-blur-sm"
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center pixel-icon">
                <BarChart3 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">CampaignFlow</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => scrollToSection("campaigns")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid="nav-campaigns"
              >
                Campaigns
              </button>
              <button 
                onClick={() => scrollToSection("analytics")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid="nav-analytics"
              >
                Analytics
              </button>
              <button 
                onClick={() => scrollToSection("process")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid="nav-process"
              >
                Process
              </button>
              <button 
                onClick={() => scrollToSection("backup")}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid="nav-backup"
              >
                Backup
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                data-testid="button-signin"
              >
                Sign In
              </button>
              <button 
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                data-testid="button-get-started"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Scroll Indicator */}
      <div className="flex justify-center pb-8">
        <button
          onClick={() => scrollToSection("services")}
          className="scroll-indicator flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
          data-testid="button-scroll-down"
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </button>
      </div>

      {/* Service Cards */}
      <section id="services">
        <ServiceCards />
      </section>

      {/* Campaign Dashboard */}
      <section id="campaigns">
        <CampaignDashboard />
      </section>

      {/* Process Section */}
      <section id="process">
        <ProcessSection />
      </section>

      {/* Analytics Section */}
      <section id="analytics">
        <AnalyticsSection />
      </section>

      {/* Backup Section */}
      <section id="backup">
        <BackupSection />
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-primary via-primary to-accent relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pixel-icon" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 10px, white 10px, white 12px), 
                           repeating-linear-gradient(90deg, transparent, transparent 10px, white 10px, white 12px)`
        }}></div>
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance">
            Ready to Transform Your Marketing Campaigns?
          </h2>
          
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Join thousands of executives who trust CampaignFlow to manage their marketing initiatives. Start your free trial today.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              className="px-10 py-5 bg-white text-primary rounded-lg text-lg font-bold hover:bg-white/90 transition-all hover:scale-105 shadow-2xl w-full sm:w-auto"
              data-testid="button-start-trial"
            >
              Start Free 14-Day Trial
            </button>
            <button 
              className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-lg text-lg font-bold hover:bg-white/10 transition-all w-full sm:w-auto"
              data-testid="button-schedule-demo"
            >
              Schedule a Demo
            </button>
          </div>
          
          <div className="flex items-center justify-center gap-8 mt-12 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 text-white">✓</span>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 text-white">✓</span>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg pixel-icon"></div>
                <span className="text-xl font-bold">CampaignFlow</span>
              </div>
              <p className="text-background/70 text-sm">
                The ultimate marketing campaign management tool for business executives.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#" className="hover:text-background transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Roadmap</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#" className="hover:text-background transition-colors">About</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li><a href="#" className="hover:text-background transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-background transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-background/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-background/70">
              © 2024 CampaignFlow. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                Twitter
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                GitHub
              </a>
              <a href="#" className="text-background/70 hover:text-background transition-colors">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
