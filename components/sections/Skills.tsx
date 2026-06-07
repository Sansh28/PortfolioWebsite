"use client";

import { motion, useReducedMotion } from "framer-motion";

import { portfolioData } from "@/lib/data";

import { SkillBadge } from "../ui/SkillBadge";

export function Skills() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="skills" data-section className="relative">
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
          <p className="section-kicker">04 / Capability Matrix</p>
          <h2 className="section-title mt-4">
            A toolkit shaped by production work, not just checklists.
          </h2>
          <p className="section-copy mt-6">{portfolioData.skillsIntro}</p>
        </motion.div>

        <div className="mt-16 space-y-10">
          {portfolioData.skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.label}
              className="editorial-panel p-6 sm:p-7"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.45,
                delay: prefersReducedMotion ? 0 : categoryIndex * 0.05
              }}
            >
              <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:items-start">
                <div>
                  <p className="meta-label">Category</p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-text-primary">
                    {category.label}
                  </h3>
                </div>

                <div>
                  <div className="mb-2 hidden md:grid md:grid-cols-[minmax(0,1fr)_140px_1fr] md:gap-4">
                    <p className="meta-label">Capability</p>
                    <p className="meta-label">Depth</p>
                    <p className="meta-label">Confidence</p>
                  </div>

                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.32,
                        delay:
                          prefersReducedMotion
                            ? 0
                            : categoryIndex * 0.05 + skillIndex * 0.03
                      }}
                    >
                      <SkillBadge skill={skill} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
