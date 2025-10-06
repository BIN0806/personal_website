import { Github, Linkedin, Mail } from "lucide-react";
import { socialLinks } from "@/data/portfolio-data";

const iconMap: Record<string, any> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

export default function Footer() {
  // Filter to only show GitHub, LinkedIn, and Email
  const filteredLinks = socialLinks.filter(link => 
    ['github', 'linkedin', 'mail'].includes(link.icon.toLowerCase())
  );

  return (
    <footer className="bg-foreground text-background pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex items-center justify-center gap-8">
            {filteredLinks.map((link) => {
              const IconComponent = iconMap[link.icon] || Mail;
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 bg-background/10 hover:bg-background/20 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  data-testid={`social-link-${link.platform.toLowerCase()}`}
                >
                  <IconComponent className="w-8 h-8" />
                </a>
              );
            })}
          </div>
          
          <p className="text-sm text-background/70 text-center">
            © 2025 Billy Nguyen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
