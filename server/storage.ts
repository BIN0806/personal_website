import { type Profile, type Skill, type ProcessStep, type Project, type SocialLink } from "@shared/schema";

export interface IStorage {
  getProfile(): Promise<Profile>;
  getSkills(): Promise<Skill[]>;
  getProcessSteps(): Promise<ProcessStep[]>;
  getProjects(): Promise<Project[]>;
  getSocialLinks(): Promise<SocialLink[]>;
}

export class MemStorage implements IStorage {
  private profile: Profile;
  private skills: Skill[];
  private processSteps: ProcessStep[];
  private projects: Project[];
  private socialLinks: SocialLink[];

  constructor() {
    this.profile = {
      name: "Billy Nguyen",
      title: "Software Engineer",
      bio: "Possibility is the uncertainity we hope to understand.",
      email: "bnvinh0808[at]gmail.com",
    };

    this.skills = [
      {
        id: "strategy",
        category: "Strategy",
        title: "Strategic Planning",
        subtitle: "Foundation & Vision",
        icon: "lightbulb",
        features: [
          "User Research & Analysis",
          "Competitive Benchmarking",
          "Information Architecture",
          "Goal Setting & KPIs",
          "Project Roadmapping",
          "Stakeholder Alignment"
        ]
      },
      {
        id: "design",
        category: "Design",
        title: "Creative Design",
        subtitle: "Visual Excellence",
        icon: "palette",
        features: [
          "UI/UX Design",
          "Design Systems",
          "Responsive Layouts",
          "Brand Identity",
          "Prototyping & Wireframes",
          "Accessibility Standards"
        ]
      },
      {
        id: "build",
        category: "Build",
        title: "Development",
        subtitle: "Technical Execution",
        icon: "code",
        features: [
          "React & TypeScript",
          "Modern CSS & Tailwind",
          "API Integration",
          "Performance Optimization",
          "Testing & Quality",
          "Deployment & DevOps"
        ]
      }
    ];

    this.processSteps = [
      {
        number: "01",
        title: "Define",
        description: "Understand your goals, target audience, and project requirements. Conduct research and create a strategic foundation for success.",
        features: ["Discovery Sessions", "User Research", "Project Scope"]
      },
      {
        number: "02",
        title: "Design",
        description: "Create intuitive interfaces and engaging visual designs. Develop wireframes, prototypes, and finalized design systems.",
        features: ["Wireframing", "Visual Design", "Prototyping"]
      },
      {
        number: "03",
        title: "Build",
        description: "Transform designs into functional, high-performance applications using modern technologies and best practices.",
        features: ["Frontend Development", "API Integration", "Testing"]
      },
      {
        number: "04",
        title: "Launch",
        description: "Deploy your application, monitor performance, and provide ongoing support to ensure continued success.",
        features: ["Deployment", "Performance Monitoring", "Maintenance"]
      }
    ];

    this.projects = [
      {
        id: "project-1",
        name: "E-Commerce Platform",
        description: "Modern shopping experience with seamless checkout and inventory management",
        tags: ["React", "TypeScript", "Stripe", "Tailwind"],
        featured: true
      },
      {
        id: "project-2",
        name: "SaaS Dashboard",
        description: "Analytics dashboard for data visualization and business insights",
        tags: ["Next.js", "D3.js", "PostgreSQL", "Vercel"],
        featured: true
      },
      {
        id: "project-3",
        name: "Portfolio Builder",
        description: "No-code tool for creatives to build stunning portfolio websites",
        tags: ["Vue", "Firebase", "Tailwind", "Figma"],
        featured: true
      },
      {
        id: "project-4",
        name: "Mobile Fitness App",
        description: "Cross-platform fitness tracker with workout plans and progress tracking",
        tags: ["React Native", "Node.js", "MongoDB", "AWS"],
        featured: false
      }
    ];

    this.socialLinks = [
      { platform: "GitHub", url: "https://github.com", icon: "github" },
      { platform: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
      { platform: "Twitter", url: "https://twitter.com", icon: "twitter" },
      { platform: "Email", url: "mailto:hello@example.com", icon: "mail" }
    ];
  }

  async getProfile(): Promise<Profile> {
    return this.profile;
  }

  async getSkills(): Promise<Skill[]> {
    return this.skills;
  }

  async getProcessSteps(): Promise<ProcessStep[]> {
    return this.processSteps;
  }

  async getProjects(): Promise<Project[]> {
    return this.projects;
  }

  async getSocialLinks(): Promise<SocialLink[]> {
    return this.socialLinks;
  }
}

export const storage = new MemStorage();
