"use client";

import { motion, useReducedMotion } from "framer-motion";

import { portfolioData } from "@/lib/data";

export function About() {
  const prefersReducedMotion = useReducedMotion();

  const reveal = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }
      };

  return (
    <section id="about" data-section className="relative">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <motion.div {...reveal} className="lg:col-span-7">
            <p className="section-kicker">01 / About</p>
            <h2 className="section-title mt-4 max-w-4xl">
              I like building systems where product quality and engineering rigor
              both matter.
            </h2>
            <div className="editorial-rule mt-8 w-24" />
            <p className="section-copy mt-8">{portfolioData.about.summary}</p>
            <p className="mt-8 max-w-2xl text-sm leading-8 text-text-primary/88">
              {portfolioData.subheadline}
            </p>
          </motion.div>

          <motion.div {...reveal} className="lg:col-span-5">
            <div className="editorial-panel">
              <div className="border-b border-bg-border/80 px-6 py-4">
                <p className="meta-label">Working Principles</p>
              </div>
              <div className="space-y-4 px-6 py-6">
                {[
                  "Think in systems, not isolated features.",
                  "Design for production, not just demos.",
                  "Use clarity and evidence as part of the engineering."
                ].map((principle) => (
                  <div
                    key={principle}
                    className="border-l border-accent-cyan/35 pl-4 text-sm leading-7 text-text-primary"
                  >
                    {principle}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          <motion.div {...reveal} className="lg:col-span-5">
            <div className="editorial-panel overflow-hidden">
              <div className="flex items-center gap-2 border-b border-bg-border/80 px-5 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-accent-cyan/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent-blue/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent-purple/70" />
                <span className="ml-3 meta-label">whoami</span>
              </div>
              <div className="space-y-3 px-5 py-5 text-sm text-text-primary">
                <p className="text-accent-cyan">
                  $ {portfolioData.about.terminalPrompt}
                </p>
                {portfolioData.about.terminalLines.map((line, index) => (
                  <motion.p
                    key={line}
                    className="break-words pl-4 text-text-muted"
                    initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.35,
                      delay: prefersReducedMotion ? 0 : index * 0.08
                    }}
                  >
                    <span className="mr-3 text-accent-blue">▸</span>
                    {line}
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {portfolioData.about.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="editorial-panel p-6"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.45,
                  delay: prefersReducedMotion ? 0 : index * 0.08
                }}
              >
                <p className="meta-label">{stat.label}</p>
                <p className="mt-4 font-display text-4xl font-semibold tracking-[-0.04em] text-text-primary">
                  {stat.value}
                </p>
                <p className="mt-4 text-sm leading-7 text-text-muted">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
