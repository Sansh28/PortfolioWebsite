const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";

export type SectionId =
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "contact";

export type SocialIcon = "github" | "linkedin";

export type SocialLink = {
  label: string;
  href: string | null;
  icon: SocialIcon;
  tooltip: string;
  handle: string;
  available: boolean;
};

export type Stat = {
  label: string;
  value: string;
  description: string;
};

export type ExperienceItem = {
  company: string;
  role: string;
  dates: string;
  location: string;
  bullets: string[];
  technologies: string[];
  logoFallback: string;
};

export type FeaturedProject = {
  title: string;
  repositoryName: string | null;
  description: string;
  longDescription: string;
  tech: string[];
  topics: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  screenshot: string | null;
  language: string | null;
  note: string;
};

export type SkillIconKey =
  | "code"
  | "server"
  | "cloud"
  | "brain"
  | "wrench"
  | "database";

export type Skill = {
  name: string;
  icon: SkillIconKey;
  proficiency: number;
};

export type SkillCategory = {
  label: string;
  skills: Skill[];
};

export type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
};

type PortfolioData = {
  name: string;
  monogram: string;
  location: string;
  email: string;
  phone: string;
  headline: string;
  subheadline: string;
  hero: {
    overline: string;
    roles: string[];
    bio: string;
  };
  about: {
    summary: string;
    terminalPrompt: string;
    terminalLines: string[];
    stats: Stat[];
  };
  experienceIntro: string;
  experience: ExperienceItem[];
  projectsIntro: string;
  projects: {
    featured: FeaturedProject[];
  };
  skillsIntro: string;
  skillCategories: SkillCategory[];
  contact: {
    title: string;
    intro: string;
    locationLabel: string;
    availability: string;
  };
  footerTagline: string;
  navItems: {
    id: SectionId;
    label: string;
  }[];
  socials: SocialLink[];
  github: {
    username: string;
    featuredRepoNames: string[];
  };
  site: {
    url: string;
    canonicalUrl: string;
    title: string;
    description: string;
    ogImage: string;
    keywords: string[];
  };
};

export const portfolioData: PortfolioData = {
  name: "Sansh Goel",
  monogram: "SG",
  location: "Boulder, Colorado",
  email: "goelsansh28@gmail.com",
  phone: "303-332-6826",
  headline:
    "Software Engineer | AI Systems Builder | CS Graduate from CU Boulder",
  subheadline:
    "I build with TypeScript, Python, Go, React, Next.js, and cloud-native infrastructure to turn ambitious ideas into reliable, real-world software.",
  hero: {
    overline: "// hello world",
    roles: [
      "Software Engineer",
      "AI / ML Builder",
      "Cloud Architect",
      "Open Source Contributor"
    ],
    bio: "I’m a software engineer who builds intelligent, scalable systems where product quality and engineering rigor both matter. I recently graduated from CU Boulder and specialize in full-stack AI applications, data pipelines, and cloud infrastructure."
  },
  about: {
    summary:
      "I recently graduated from the University of Colorado Boulder with a Bachelor's degree in Computer Science, and I’ve spent the last few years building across frontend engineering, machine learning, cloud systems, and data platforms. I’ve shipped healthcare analytics pipelines on AWS and Snowflake, improved React performance and release automation in production teams, delivered Go and FastAPI backends, and mentored 200+ students in machine learning and artificial intelligence.",
    terminalPrompt: "whoami",
    terminalLines: [
      'name = "Sansh Goel"',
      'focus = ["AI systems", "cloud-native apps", "full-stack product engineering"]',
      'recent_win = "MLH MongoDB Track Winner for Savant"',
      'impact = ["5,000+ healthcare records automated", "200+ students mentored"]',
      'preferred_stack = ["TypeScript", "Python", "Go", "React", "Next.js", "AWS"]'
    ],
    stats: [
      {
        label: "Years Building",
        value: "2+",
        description:
          "Production-focused engineering experience across internships, hackathons, and shipped systems."
      },
      {
        label: "Students Mentored",
        value: "200+",
        description:
          "Supported upper-division AI and ML courses as an undergraduate course assistant."
      },
      {
        label: "Tech in Rotation",
        value: "20+",
        description:
          "Daily tooling spans frontend, backend, AI/ML, data infrastructure, and cloud delivery."
      },
      {
        label: "Countries Worked / Studied",
        value: "2",
        description:
          "Hands-on experience across teams and projects in the United States and India."
      }
    ]
  },
  experienceIntro:
    "I like roles where product intuition, systems thinking, and implementation depth all matter. The work below reflects that mix: teaching, frontend performance, data engineering, and platform delivery.",
  experience: [
    {
      company: "University of Colorado, Boulder",
      role: "Undergraduate Course Assistant — Machine Learning & AI",
      dates: "August 2025 – December 2025",
      location: "Boulder, CO",
      logoFallback: "CU",
      bullets: [
        "Mentored 200+ students across Machine Learning and Artificial Intelligence, owning office hours, assignment support, and course logistics across two concurrent upper-division courses.",
        "Debugged student Python implementations of ML pipelines, AI algorithms, and data structures while teaching repeatable diagnosis of training errors, overfitting, and evaluation failures.",
        "Explained gradient descent, model evaluation, unsupervised learning, and search algorithms in a way that bridged theory and working code for students with different backgrounds.",
        "Collaborated with instructors and a cross-functional TA team to align grading standards, course improvements, and support strategies across multiple semesters."
      ],
      technologies: [
        "Python",
        "Machine Learning",
        "Artificial Intelligence",
        "Data Structures",
        "Student Mentorship"
      ]
    },
    {
      company: "HealthTech Solutions",
      role: "Software Engineer Intern — Data Engineering & Analytics",
      dates: "May 2025 – August 2025",
      location: "Denver, CO",
      logoFallback: "HS",
      bullets: [
        "Architected an AWS S3 to Snowflake ingestion pipeline processing 5,000+ healthcare records, creating a reliable single source of truth for business-critical reporting.",
        "Optimized 20+ Snowflake SQL queries and reduced latency enough to support real-time KPI tracking instead of delayed batch reporting.",
        "Delivered 5+ Power BI dashboards with automated refresh workflows used directly by C-suite executives for live operational visibility.",
        "Turned manual reporting flows into a repeatable analytics platform with stronger reliability, faster feedback, and better decision support."
      ],
      technologies: [
        "AWS S3",
        "Snowflake",
        "SQL",
        "Power BI",
        "Data Pipelines",
        "Analytics Engineering"
      ]
    },
    {
      company: "Salezshark",
      role: "Software Developer Intern — Frontend Engineering",
      dates: "May 2024 – August 2024",
      location: "New Delhi, India",
      logoFallback: "SZ",
      bullets: [
        "Refactored the company’s React marketing platform with code splitting and lazy loading, reducing page load time by 30% and improving user experience and search performance.",
        "Designed and implemented a CI/CD pipeline in Azure DevOps to automate build, test, and deployment workflows, cutting release cycles by 20%.",
        "Eliminated 15+ hours of manual deployment work per sprint by tightening release automation across the dev team.",
        "Owned frontend feature delivery across 8 Agile sprints while guiding Git branching strategies and peer reviews inside a lean 3-person team."
      ],
      technologies: [
        "React",
        "JavaScript",
        "Azure DevOps",
        "CI/CD",
        "Performance Optimization",
        "Agile Delivery"
      ]
    }
  ],
  projectsIntro:
    "A selection of what I've built — from AI reasoning platforms to strategy engines. Additional open-source work syncs live from GitHub below.",
  projects: {
    featured: [
      {
        title: "Savant AI",
        repositoryName: "HackCU_12-",
        description:
          "HackCU-winning AI platform that helps users generate insights from dense information with LLM-powered workflows.",
        longDescription:
          "Built during HackCU and recognized as the MLH MongoDB Track Winner, Savant AI combines a Next.js frontend, FastAPI backend, MongoDB Atlas Vector Search, and Chrome extension workflows to turn dense papers into searchable, citation-grounded conversations.",
        tech: [
          "Next.js",
          "FastAPI",
          "MongoDB Atlas Vector Search",
          "Gemini API",
          "Python",
          "TypeScript",
          "Chrome Extension",
          "ElevenLabs",
          "Vultr"
        ],
        topics: ["RAG", "PDF Parsing", "Vector Search", "Voice UX"],
        githubUrl: "https://github.com/Sansh28/HackCU_12-",
        liveUrl: null,
        screenshot: null,
        language: "TypeScript",
        note: "Winner of the MLH MongoDB Track at HackCU."
      },
      {
        title: "Polymorphia Strategy Engine",
        repositoryName: null,
        description:
          "Java strategy engine with extensible object-oriented game mechanics, automated testing, and design-pattern-driven architecture.",
        longDescription:
          "Built custom gameplay strategies and reusable object-oriented mechanics in Java using design patterns, Gradle, SPI configuration, and automated testing to create an extensible engine for strategy simulation.",
        tech: [
          "Java",
          "OOP",
          "Design Patterns",
          "Gradle",
          "SPI",
          "Automated Testing"
        ],
        topics: ["Game Architecture", "Strategy Engine", "Design Patterns", "Testing"],
        githubUrl: null,
        liveUrl: null,
        screenshot: null,
        language: "Java",
        note: "Built as a comprehensive demonstration of object-oriented game mechanics and architectural design patterns."
      },
      {
        title: "Email Classification System",
        repositoryName: null,
        description:
          "Machine learning pipeline for grouping and classifying emails using unsupervised clustering and NLP.",
        longDescription:
          "Built on a Kaggle email dataset, this system combines TF-IDF vectorization, K-Means clustering, and sentiment analysis to surface communication patterns and label-like structure without supervised training data.",
        tech: [
          "Python",
          "Scikit-learn",
          "TF-IDF",
          "K-Means",
          "NLP",
          "Pandas",
          "NumPy"
        ],
        topics: ["NLP", "Clustering", "Email Analytics", "Sentiment Analysis"],
        githubUrl: null,
        liveUrl: null,
        screenshot: null,
        language: "Python",
        note: "An unsupervised approach to surfacing latent communication patterns without labeled training data."
      }
    ]
  },
  skillsIntro:
    "I’m strongest where product engineering, data systems, and AI workflows overlap. These categories reflect the tools I reach for most often in production and project work.",
  skillCategories: [
    {
      label: "Languages",
      skills: [
        { name: "TypeScript", icon: "code", proficiency: 5 },
        { name: "JavaScript", icon: "code", proficiency: 5 },
        { name: "Python", icon: "code", proficiency: 5 },
        { name: "Go", icon: "server", proficiency: 4 },
        { name: "Rust", icon: "server", proficiency: 3 },
        { name: "C++", icon: "server", proficiency: 3 },
        { name: "SQL", icon: "database", proficiency: 4 }
      ]
    },
    {
      label: "Frameworks",
      skills: [
        { name: "React", icon: "code", proficiency: 5 },
        { name: "Next.js", icon: "code", proficiency: 5 },
        { name: "FastAPI", icon: "server", proficiency: 4 },
        { name: "Gin", icon: "server", proficiency: 4 },
        { name: "GORM", icon: "database", proficiency: 4 }
      ]
    },
    {
      label: "Cloud & DevOps",
      skills: [
        { name: "AWS", icon: "cloud", proficiency: 4 },
        { name: "GCP", icon: "cloud", proficiency: 3 },
        { name: "Azure", icon: "cloud", proficiency: 4 },
        { name: "Docker", icon: "wrench", proficiency: 4 },
        { name: "Azure DevOps", icon: "wrench", proficiency: 4 },
        { name: "CI/CD", icon: "wrench", proficiency: 4 }
      ]
    },
    {
      label: "AI / ML",
      skills: [
        { name: "RAG Systems", icon: "brain", proficiency: 5 },
        { name: "PyTorch", icon: "brain", proficiency: 4 },
        { name: "Scikit-learn", icon: "brain", proficiency: 4 },
        { name: "HuggingFace", icon: "brain", proficiency: 4 },
        { name: "LangChain", icon: "brain", proficiency: 4 },
        { name: "Vector Search", icon: "brain", proficiency: 5 }
      ]
    },
    {
      label: "Tools",
      skills: [
        { name: "Snowflake", icon: "database", proficiency: 4 },
        { name: "MongoDB", icon: "database", proficiency: 4 },
        { name: "PostgreSQL", icon: "database", proficiency: 4 },
        { name: "Git", icon: "wrench", proficiency: 5 },
        { name: "Power BI", icon: "wrench", proficiency: 4 },
        { name: "Redis", icon: "database", proficiency: 3 }
      ]
    }
  ],
  contact: {
    title: "Let’s build something ambitious.",
    intro:
      "I’m especially interested in early-career software engineering roles where AI, product design, backend systems, and cloud infrastructure all meet. If you’re building something sharp, reliable, and a little bit bold, I’d love to hear about it.",
    locationLabel: "Based in Boulder, CO",
    availability:
      "Open to Software Engineer, Full-Stack, AI/ML, Data Engineer, and Cloud Engineer opportunities."
  },
  footerTagline: "Building intelligent, scalable, and impactful software with taste, systems thinking, and execution depth.",
  navItems: [
    { id: "about" as SectionId, label: "About" },
    { id: "experience" as SectionId, label: "Experience" },
    { id: "projects" as SectionId, label: "Projects" },
    { id: "skills" as SectionId, label: "Skills" },
    { id: "contact" as SectionId, label: "Contact" }
  ],
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/Sansh28",
      icon: "github" as SocialIcon,
      tooltip: "GitHub / Sansh28",
      handle: "@Sansh28",
      available: true
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/sansh-goel/",
      icon: "linkedin" as SocialIcon,
      tooltip: "LinkedIn / sansh-goel",
      handle: "/in/sansh-goel",
      available: true
    },
  ],
  github: {
    username: "Sansh28",
    featuredRepoNames: ["HackCU_12-"]
  },
  site: {
    url: siteUrl,
    canonicalUrl: siteUrl,
    title: "Sansh Goel | Software Engineer | AI Systems Builder",
    description:
      "Portfolio website for Sansh Goel, a software engineer and Computer Science graduate building AI products, full-stack applications, and cloud-scale systems.",
    ogImage: `${siteUrl}/og-image.png`,
    keywords: [
      "Sansh Goel",
      "Software Engineer",
      "AI Enthusiast",
      "Computer Science Graduate",
      "AI Engineer",
      "Machine Learning",
      "Next.js",
      "React",
      "Cloud Architecture",
      "Distributed Systems"
    ]
  }
};
