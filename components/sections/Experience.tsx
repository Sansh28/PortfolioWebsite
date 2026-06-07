"use client";

import { motion, useReducedMotion } from "framer-motion";

import { portfolioData } from "@/lib/data";

export function Experience() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="experience" data-section className="relative">
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
          <p className="section-kicker">02 / Experience</p>
          <h2 className="section-title mt-4">
            Building across product, platform, and data.
          </h2>
          <p className="section-copy mt-6">{portfolioData.experienceIntro}</p>
        </motion.div>

        <div className="mt-16 space-y-8">
          {portfolioData.experience.map((item, index) => (
            <motion.article
              key={`${item.company}-${item.role}`}
              className="editorial-panel grid gap-8 p-6 lg:grid-cols-[220px_1fr]"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                delay: prefersReducedMotion ? 0 : index * 0.06
              }}
            >
              <div className="border-b border-bg-border/70 pb-5 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
                <p className="meta-label">Role</p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-text-primary">
                  {item.role}
                </h3>
                <p className="mt-3 text-sm text-text-primary/90">{item.company}</p>
                <p className="mt-2 text-sm text-text-muted">{item.location}</p>
                <p className="mt-2 font-body text-xs uppercase tracking-[0.22em] text-accent-cyan/80">
                  {item.dates}
                </p>
              </div>

              <div>
                <p className="font-display text-xl leading-9 text-text-primary">
                  {item.bullets[0]}
                </p>

                <div className="mt-6 grid gap-3">
                  {item.bullets.slice(1).map((bullet) => (
                    <p
                      key={bullet}
                      className="border-l border-bg-border/80 pl-4 text-sm leading-7 text-text-muted"
                    >
                      {bullet}
                    </p>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {item.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="border border-bg-border/80 px-3 py-1 text-xs text-text-muted"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
