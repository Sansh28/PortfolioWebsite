"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, GitFork, Github, Star } from "lucide-react";
import { useEffect, useState } from "react";

import { portfolioData, type GitHubRepo } from "@/lib/data";

import { ProjectCard, type ProjectCardData } from "../ui/ProjectCard";

function normalizeProjectName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getOutcome(project: ProjectCardData) {
  if (project.title.includes("Savant")) {
    return "Won the MLH MongoDB Track by turning research PDFs into citation-grounded answers and follow-up exploration flows.";
  }

  if (project.title === "Polymorphia Strategy Engine") {
    return "Built an extensible strategy engine with object-oriented game mechanics, behavioral patterns, and testable design boundaries.";
  }

  if (project.title === "Email Classification System") {
    return "Built an end-to-end machine learning workflow to surface patterns in unstructured communication data.";
  }

  return "Built a technical project that blends product thinking, systems discipline, and visible user value.";
}

export function Projects() {
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let isMounted = true;

    const loadRepositories = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("/api/github");
        const data = (await response.json()) as GitHubRepo[] | { error: string };

        if (!response.ok || !Array.isArray(data)) {
          const error =
            !Array.isArray(data) && "error" in data
              ? data.error
              : "GitHub repositories are unavailable right now.";
          throw new Error(error);
        }

        if (!isMounted) {
          return;
        }

        setRepositories(data);
        setErrorMessage(null);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setRepositories([]);
        setErrorMessage(
          error instanceof Error
            ? error.message
            : "GitHub repositories are unavailable right now."
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadRepositories();

    return () => {
      isMounted = false;
    };
  }, []);

  const featuredKeys = portfolioData.projects.featured.map((project) =>
    normalizeProjectName(project.repositoryName ?? project.title)
  );

  const featuredCards: ProjectCardData[] = portfolioData.projects.featured.map(
    (project) => {
      const matchedRepository = repositories.find(
        (repository) =>
          normalizeProjectName(repository.name) ===
          normalizeProjectName(project.repositoryName ?? project.title)
      );

      return {
        title: project.title,
        description: project.description,
        details: project.longDescription,
        language: matchedRepository?.language ?? project.language,
        stars: matchedRepository?.stargazers_count ?? 0,
        forks: matchedRepository?.forks_count ?? 0,
        topics: [...project.topics, ...(matchedRepository?.topics ?? [])],
        tech: project.tech,
        repoUrl: project.githubUrl ?? matchedRepository?.html_url ?? null,
        liveUrl: project.liveUrl,
        screenshot: project.screenshot,
        note: project.note,
        featured: true
      };
    }
  );

  const dynamicCards: ProjectCardData[] = repositories
    .filter(
      (repository) =>
        !featuredKeys.includes(normalizeProjectName(repository.name))
    )
    .slice(0, 6)
    .map((repository) => ({
      title: repository.name,
      description:
        repository.description ||
        `Open-source project from ${portfolioData.name}'s GitHub profile.`,
      details:
        "Synced from the GitHub API route included in this portfolio. This card is intentionally driven by live repository metadata so the site can stay current without component edits.",
      language: repository.language,
      stars: repository.stargazers_count,
      forks: repository.forks_count,
      topics: repository.topics,
      tech: repository.language ? [repository.language] : [],
      repoUrl: repository.html_url,
      liveUrl: null,
      screenshot: null,
      note: `Last updated ${new Date(repository.updated_at).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric"
        }
      )}.`,
      featured: false
    }));

  return (
    <section id="projects" data-section className="relative">
      <div className="section-shell">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.55,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <p className="section-kicker">03 / Projects</p>
          <h2 className="section-title mt-4">
            Selected builds plus a live repository feed.
          </h2>
          <p className="section-copy mt-6">{portfolioData.projectsIntro}</p>
        </motion.div>

        <div className="mt-16 space-y-8">
          {featuredCards.map((project, index) => (
            <motion.article
              key={project.title}
              className="editorial-panel overflow-hidden"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : index * 0.06
              }}
            >
              <div className="grid gap-0 lg:grid-cols-[220px_1.2fr_0.8fr]">
                <div className="border-b border-bg-border/80 px-6 py-6 lg:border-b-0 lg:border-r">
                  <p className="meta-label">Case Study</p>
                  <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-text-primary">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-text-muted">
                    {project.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="border border-bg-border/80 px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-b border-bg-border/80 px-6 py-6 lg:border-b-0 lg:border-r">
                  <div className="grid gap-5">
                    <div>
                      <p className="meta-label">Build</p>
                      <p className="mt-2 text-sm leading-8 text-text-primary/92">
                        {project.details}
                      </p>
                    </div>
                    <div>
                      <p className="meta-label">Outcome</p>
                      <p className="mt-2 text-sm leading-8 text-text-primary/92">
                        {getOutcome(project)}
                      </p>
                    </div>
                    <div>
                      <p className="meta-label">Note</p>
                      <p className="mt-2 text-sm leading-7 text-text-muted">
                        {project.note}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-6">
                  <div className="grid gap-4">
                    <div className="border-b border-bg-border/70 pb-4">
                      <p className="meta-label">Metadata</p>
                      <div className="mt-3 space-y-2 text-sm text-text-muted">
                        {project.stars > 0 ? (
                          <p className="inline-flex items-center gap-2">
                            <span className="inline-flex items-center gap-2">
                              <Star size={14} className="text-accent-cyan" />
                              {project.stars}
                            </span>
                          </p>
                        ) : null}
                        {project.forks > 0 ? (
                          <p className="inline-flex items-center gap-2">
                            <GitFork size={14} className="text-accent-blue" />
                            {project.forks}
                          </p>
                        ) : null}
                        <p>{project.language || "Mixed stack"}</p>
                      </div>
                    </div>

                    <div>
                      <p className="meta-label">Links</p>
                      <div className="mt-3 flex flex-col gap-3">
                        {project.repoUrl ? (
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-text-primary hover:text-accent-cyan"
                            data-cursor="hover"
                          >
                            <Github size={14} className="text-accent-cyan" />
                            Source
                            <ArrowUpRight size={14} />
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-2 text-sm text-text-muted">
                            <Github size={14} />
                            In development
                          </span>
                        )}
                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-text-primary hover:text-accent-blue"
                            data-cursor="hover"
                          >
                            <ExternalLink size={14} className="text-accent-blue" />
                            Live demo
                            <ArrowUpRight size={14} />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-6">
            <div>
              <p className="section-kicker">Repository Feed</p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-text-primary">
                Additional public work from GitHub
              </h3>
            </div>
            <p className="max-w-md text-sm leading-7 text-text-muted">
              This section stays synced through the GitHub proxy route so the
              site can keep reflecting recent public work without manual edits.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={`project-skeleton-${index}`}
                    className="editorial-panel relative overflow-hidden p-5"
                  >
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent motion-safe:animate-shimmer" />
                    <div className="relative space-y-4">
                      <div className="h-3 w-24 bg-bg-border/80" />
                      <div className="h-7 w-2/3 bg-bg-border/80" />
                      <div className="h-3 w-full bg-bg-border/80" />
                      <div className="h-3 w-4/5 bg-bg-border/80" />
                    </div>
                  </div>
                ))
              : dynamicCards.map((project) => (
                  <ProjectCard key={project.title} project={project} />
                ))}
          </div>
        </div>

        {!isLoading && dynamicCards.length === 0 ? (
          <div className="mt-6 border border-bg-border/80 bg-bg-surface/60 px-5 py-4 text-sm text-text-muted">
            No additional public repositories were returned after filtering the
            featured projects.
          </div>
        ) : null}

        {errorMessage ? (
          <div className="mt-6 border border-bg-border/80 bg-bg-surface/60 px-5 py-4 text-sm text-text-muted">
            {errorMessage}
          </div>
        ) : null}
      </div>
    </section>
  );
}
