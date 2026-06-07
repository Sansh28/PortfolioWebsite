"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, GitFork, Github, Star } from "lucide-react";

export type ProjectCardData = {
  title: string;
  description: string;
  details: string;
  language: string | null;
  stars: number;
  forks: number;
  topics: string[];
  tech: string[];
  repoUrl: string | null;
  liveUrl: string | null;
  screenshot: string | null;
  note: string;
  featured: boolean;
};

type ProjectCardProps = {
  project: ProjectCardData;
};

function getLanguageColor(language: string | null) {
  switch (language?.toLowerCase()) {
    case "typescript":
      return "bg-[#3178c6]";
    case "javascript":
      return "bg-[#f7df1e]";
    case "python":
      return "bg-[#3776ab]";
    case "go":
      return "bg-[#00add8]";
    case "rust":
      return "bg-[#dea584]";
    case "c++":
      return "bg-[#00599c]";
    default:
      return "bg-accent-purple";
  }
}

function getUniqueTags(project: ProjectCardData) {
  return Array.from(new Set([...project.topics, ...project.tech])).slice(0, 5);
}

export function ProjectCard({ project }: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const interactiveUrl = project.repoUrl || project.liveUrl;
  const tags = getUniqueTags(project);

  const content = (
    <motion.article
      className="editorial-panel h-full p-5"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.45,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={prefersReducedMotion ? undefined : { y: -2 }}
    >
      <div className="flex h-full flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="meta-label">
              {project.featured ? "Featured Build" : "Repository Feed"}
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold text-text-primary">
              {project.title}
            </h3>
          </div>
          {interactiveUrl ? (
            <ArrowUpRight size={16} className="text-accent-cyan" />
          ) : null}
        </div>

        <p className="text-sm leading-7 text-text-muted">{project.description}</p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
          <span className="inline-flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${getLanguageColor(
                project.language
              )}`}
            />
            {project.language || "Mixed Stack"}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Star size={14} className="text-accent-cyan" />
            {project.stars}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <GitFork size={14} className="text-accent-blue" />
            {project.forks}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="border border-bg-border/80 px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mt-auto text-sm leading-7 text-text-muted">{project.note}</p>

        <div className="flex items-center gap-2 text-sm text-text-primary">
          <Github size={14} className="text-accent-cyan" />
          <span>{project.repoUrl ? "Open repository" : "Repository unavailable"}</span>
        </div>
      </div>
    </motion.article>
  );

  if (interactiveUrl) {
    return (
      <a
        href={interactiveUrl}
        target="_blank"
        rel="noreferrer"
        className="block h-full focus-visible:outline-none"
        data-cursor="hover"
      >
        {content}
      </a>
    );
  }

  return content;
}
