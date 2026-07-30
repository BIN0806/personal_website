import type { OtherProjectCategory } from "@shared/schema";

export const otherProjectCategories: OtherProjectCategory[] = [
  {
    id: "python",
    name: "Python (Foundational Programming)",
    projects: [
      {
        id: "cats",
        title: "Cats (Autocorrected Typing Software)",
        tags: ["Python"],
        description:
          "A typing test interface that autocorrects typing errors by calculating the minimum string edit distance using recursion.",
      },
      {
        id: "ants-vs-somebees",
        title: "Ants vs. SomeBees",
        tags: ["Python"],
        description:
          "A tower defense game applying object-oriented programming concepts like classes, inheritance, and state management.",
      },
      {
        id: "scheme-interpreter",
        title: "Scheme Interpreter",
        tags: ["Python", "Scheme"],
        description:
          "A complete Scheme language interpreter built in Python to evaluate expressions using functional programming paradigms.",
      },
    ],
  },
  {
    id: "java",
    name: "Java (Data Structures & Object-Oriented Design)",
    projects: [
      {
        id: "deque-data-structures",
        title: "Deque Data Structures",
        tags: ["Java"],
        description:
          "Building robust double-ended queues (Deques) using both linked lists and resizing arrays.",
      },
      {
        id: "gitlet",
        title: "Gitlet (Version Control System)",
        tags: ["Java"],
        description:
          "Developing a lightweight version control system from scratch or a word network analyzer using trees, graphs, and hashmaps.",
      },
      {
        id: "byow",
        title: "BYOW (Build Your Own World)",
        tags: ["Java"],
        description:
          "A 2D tile-based exploration game featuring procedurally generated pseudorandom environments and user interactivity.",
      },
    ],
  },
  {
    id: "systems",
    name: "Low-Level & Systems Design",
    projects: [
      {
        id: "c-memory-management",
        title: "C Memory Management and String Manipulation",
        tags: ["C"],
        description:
          "A foundational C programming project focused on memory management, pointers, strings, and data manipulation.",
      },
      {
        id: "buffer-overflows",
        title: "Memory Safety and Buffer Overflows",
        tags: ["C", "GDB", "x86 Assembly"],
        description:
          "Exploiting buffer overflow vulnerabilities by crafting custom payloads and shellcode to hijack program execution flow.",
      },
      {
        id: "riscv-assembler",
        title: "RISC-V Assembler and Neural Network",
        tags: ["C", "RISC-V Assembly"],
        description:
          "Translating RISC-V assembly into machine code, or building a neural network forward pass entirely in assembly.",
      },
      {
        id: "riscv-cpu",
        title: "Pipelined RISC-V CPU Datapath",
        tags: ["Logisim / Digital"],
        description:
          "Designing a fully functional, pipelined RISC-V processor using logic gates and hardware simulation tools.",
      },
      {
        id: "numc",
        title: "Numc High-Performance Matrix Operations",
        tags: ["C", "OpenMP", "SIMD"],
        description:
          "Optimizing large-scale matrix operations to achieve massive speedups using hardware caching, SIMD vector instructions, and multithreading.",
      },
      {
        id: "pintos-threads",
        title: "Pintos OS: Kernel Threads",
        tags: ["C", "Pintos OS"],
        description:
          "Adding kernel threads, strict priority scheduling, and robust synchronization primitives to the Pintos operating system.",
      },
      {
        id: "pintos-user-programs",
        title: "Pintos OS: User Programs",
        tags: ["C", "Pintos OS"],
        description:
          "Enabling the operating system to safely load, execute, and isolate user processes by implementing system calls and argument passing.",
      },
      {
        id: "pintos-file-system",
        title: "Pintos OS: File System",
        tags: ["C", "Pintos OS"],
        description:
          "Developing a hierarchical, extensible file system complete with indexed files, directories, and an efficient buffer cache.",
      },
    ],
  },
  {
    id: "internet-security",
    name: "Internet & Security",
    projects: [
      {
        id: "custom-traceroute",
        title: "Custom Traceroute",
        tags: ["Python"],
        description:
          "Building a custom traceroute tool and implementing networking logic to handle layer 3 IP routing and error handling.",
      },
      {
        id: "distance-vector-routing",
        title: "Distance Vector Routing Protocol",
        tags: ["Python"],
        description:
          "Implementing distributed network routing protocols, like Distance Vector, to simulate and evaluate network state convergence.",
      },
      {
        id: "transport-layer-simulator",
        title: "Transport-Layer Protocol Simulator",
        tags: ["Python"],
        description:
          "Creating transport-layer protocol functions and mechanisms to manage packet flow, TCP windowing, and network reliability.",
      },
      {
        id: "secure-file-sharing",
        title: "Secure File Sharing System",
        tags: ["Go"],
        description:
          "Designing a secure, cryptographic file-sharing application with encryption, authentication, and access control against malicious adversaries.",
      },
      {
        id: "web-security",
        title: "Web Security Exploits and Defenses",
        tags: ["HTML", "JavaScript", "SQL"],
        description:
          "Attacking and defending a vulnerable web application using techniques like Cross-Site Scripting (XSS), CSRF, and SQL Injection.",
      },
    ],
  },
  {
    id: "full-stack",
    name: "Full-Stack Web Development",
    projects: [
      {
        id: "finance-dashboard",
        title: "Finance Dashboard",
        tags: ["React", "Node.js", "TypeScript", "Redis", "SQL/MongoDB"],
        description:
          "A full-stack financial visualization and internal reporting dashboard designed to aggregate database records, track business spending, and deliver real-time metrics using optimized caching.",
      },
    ],
  },
  {
    id: "math-probability",
    name: "Math & Probability",
    projects: [
      {
        id: "pocket-planet",
        title: "Pocket Planet Planetary Simulation",
        tags: ["Python", "Jupyter Notebook"],
        description:
          "Applying foundational probability concepts and random variables to simulate and analyze a model planetary system.",
      },
      {
        id: "fountain-codes",
        title: "Fountain Codes Data Transmission",
        tags: ["Python", "NumPy"],
        description:
          "Simulating reliable data transmission over lossy channels using Luby Transform (LT) codes and bipartite graphs.",
      },
      {
        id: "wordle-solver",
        title: "Wordle Information Theory Solver",
        tags: ["Python"],
        description:
          "Utilizing information theory concepts like entropy and expected information gain to build an optimal solver for the game Wordle.",
      },
      {
        id: "mcmc",
        title: "MCMC Probability Distributions",
        tags: ["Python", "Jupyter Notebook"],
        description:
          "Implementing Markov Chain Monte Carlo (MCMC) algorithms to effectively sample from and visualize complex probability distributions.",
      },
      {
        id: "ctmc-music",
        title: "CTMC Temporal Music Modeling",
        tags: ["Python", "NumPy"],
        description:
          "Using Continuous-Time Markov Chains (CTMC) to model temporal state transitions for analyzing and generating musical sequences.",
      },
      {
        id: "mle-map-painter",
        title: "MLE & MAP Painter Classification",
        tags: ["Python", "NumPy"],
        description:
          "Applying Maximum Likelihood Estimation (MLE) and Maximum A Posteriori (MAP) techniques to build statistical models for classifying painters based on their artistic styles.",
      },
    ],
  },
  {
    id: "data-ml",
    name: "Data Analysis & Machine Learning",
    projects: [
      {
        id: "eda-housing-food",
        title: "Exploratory Data Analysis (Housing & Food Safety)",
        tags: ["Python", "Pandas", "Matplotlib", "Seaborn"],
        description:
          "Cleaning, joining, and visualizing messy, real-world datasets to perform exploratory data analysis, uncover statistical trends, and handle missing variables.",
      },
      {
        id: "spam-classification",
        title: "Spam Classification and Model Optimization",
        tags: ["Python", "Scikit-learn", "Pandas", "Regex"],
        description:
          "Building a complete machine learning pipeline utilizing text processing, feature engineering, and logistic regression to accurately filter out spam emails, and iterating on model tuning to optimize classification accuracy for a blind test set leaderboard.",
      },
    ],
  },
];
