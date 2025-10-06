import type { Profile, Skill, ProcessStep, Project, SocialLink } from "@shared/schema";

export const profile: Profile = {
  name: "Billy Nguyen",
  title: "Software Engineer",
  bio: "Possibility is the uncertainity of what we seek to understand.",
  email: "bnvinh0808@gmail.com",
};

export const skills: Skill[] = [
  {
    id: "bibliography",
    category: "Bibliography",
    title: "Bibliography",
    subtitle: "My Journey",
    icon: "book",
    features: [
      "Computer Science Student",
      "Continuous Learner",
      "Tech Enthusiast",
      "Problem Solver",
      "Cinephile",
      "Baker",
      "Gamer",
      "Gym Rat",
      "Tennis Player"
    ]
  },
  {
    id: "technical",
    category: "Technical",
    title: "Technical Skills",
    subtitle: "What I Know",
    icon: "code",
    features: [
      "Python",
      "Java & C",
      "React",
      "TypeScript & JavaScript & Node.js",
      "SQL",
      "NumPy & Pandas",
      "Matplotlib &Seaborn",
      "HTMLS/CSS",
      "Version Control (Git)",
    ]
  },
  {
    id: "interests",
    category: "Interests",
    title: "Interests",
    subtitle: "What I Love",
    icon: "heart",
    features: [
        "Teaching & Mentoring",
        "Favorite Movie: Good Will Hunting",
        "Favorite Show: Arcane",
        "Favorite Game: Poker",
        "Favorite Food: Banh Bao",
        "Favorite Drink: Avocado Smoothie",
        "Favorite Sweet Treat: Frozen Yogurt"
    ]
  }
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Define",
    description: "Understanding the goal, target audience, and project requirements. Conduct lots of research, Create a rough outline and define success.",
    features: ["Project Planning", "User Research", "Project Scope"]
  },
  {
    number: "02",
    title: "Design",
    description: "For Projects that have interface, I design them to be intuitive and engaging. Create wireframes and finalize the design systems.",
    features: ["Wireframing", "System Design", "Prototyping"]
  },
  {
    number: "03",
    title: "Build",
    description: "Transforming designs into high-performance applications using modern technologies and best practices.",
    features: ["Frontend Development", "Backend Development", "Testing"]
  },
  {
    number: "04",
    title: "Launch",
    description: "Finally, deploy the application, monitor performance, and updated to ensure continued success.",
    features: ["Deployment", "Performance Monitoring", "Maintenance"]
  }
];

export const projects: Project[] = [
    {
        id: "project-1",
        name: "Ki Drone (Internship)",
        description: "Engineered a cross-platform desktop application for post-wildfire reforestation. I disected shapefiles and other Geographic Information System (GIS) layers, compute flight corridors, spacing, and seed-drop points with custom geospatial algorithms, and render everything on a map for field teams can run offline.",
            tags: [ "Python","Node.JS", "JavaScript", "HTML/CSS",  "Flask", "Electron", "ArcGIS", "GeoPandas", "Numpy", "PyProj", "Shapely"],
        featured: true
        },
      {
        id: "project-2",
        name: "Nanotechnology (Research)",
        description: "Help design aPython based simulation software that displays the modeling of nanoscale biosensors and visualizing electrochemical behavior. I streamlined parameter fitting, and plot generation so researchers can compare theoretical models with experimental results effectively.",
        tags: ["Python", "StreamLit", "HTML/CSS", "NumPy", "Pandas"],
        featured: true
      },
      {
        id: "project-3",
        name: "Google Meet Translate",
        description: "Developed a a lightweight browser extension that captures live captions from Google Meet and translates them in real time using a local server API from libretranslate. Smooth subtitle rendering, and a simple controls panel so users can switch languages.",
        tags: ["HTML/CSS", "JavaScript", "Docker", "LibreTranslateAPI"],
        featured: true
      },
];

export const socialLinks: SocialLink[] = [
  { platform: "GitHub", url: "https://github.com/BIN0806", icon: "github" },
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/billyvn/", icon: "linkedin" },
  { platform: "Email", url: "mailto:bnvinh0808@gmail.com", icon: "mail" }
];

