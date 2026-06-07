"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";

import type { ExperienceItem } from "@/lib/data";

type TimelineItemProps = {
  item: ExperienceItem;
  align: "left" | "right";
};

export function TimelineItem({ item, align }: TimelineItemProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <li className="relative grid gap-6 md:grid-cols-[minmax(0,1fr)_64px_minmax(0,1fr)]">
      <div
        className={`pl-10 md:pl-0 ${
          align === "left"
            ? "md:col-start-1 md:pr-10"
            : "md:col-start-3 md:pl-10"
        }`}
      >
        <motion.article
          className="glass-panel neon-outline relative overflow-hidden p-6 sm:p-7"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.55,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <div className="mb-5 flex items-start gap-4">
            <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-accent-cyan/30 bg-accent-cyan/10 font-display text-sm font-semibold uppercase tracking-[0.22em] text-accent-cyan shadow-neon">
              {item.logoFallback}
            </span>
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-accent-cyan/75">
                {item.dates}
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-text-primary">
                {item.role}
              </h3>
              <p className="mt-1 text-base text-text-primary/90">{item.company}</p>
              <p className="mt-2 inline-flex items-center gap-2 text-sm text-text-muted">
                <MapPin size={14} className="text-accent-blue" />
                {item.location}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {item.bullets.map((bullet) => (
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
                className="rounded-full border border-bg-border/80 bg-bg-void/60 px-3 py-1 text-xs text-text-muted"
              >
                {technology}
              </span>
            ))}
          </div>
        </motion.article>
      </div>

      <div className="absolute left-4 top-8 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-bg-void bg-accent-cyan shadow-neon md:left-1/2 md:translate-x-0" />
    </li>
  );
}
