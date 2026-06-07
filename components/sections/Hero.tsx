"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  ChevronDown,
  Download,
  Github,
  Linkedin,
  MapPin
} from "lucide-react";

import { useTypewriter } from "@/hooks/useTypewriter";
import { portfolioData, type SocialIcon } from "@/lib/data";

import { GlitchText } from "../ui/GlitchText";
import { ParticleCanvas } from "../ui/ParticleCanvas";

function getSocialIcon(icon: SocialIcon) {
  switch (icon) {
    case "github":
      return Github;
    case "linkedin":
      return Linkedin;
    default:
      return Github;
  }
}

export function Hero() {
  const typedRole = useTypewriter(portfolioData.hero.roles);
  const prefersReducedMotion = useReducedMotion();
  const heroMetrics = [
    "200+ students mentored",
    "5,000+ healthcare records automated",
    "MLH MongoDB Track Winner"
  ];
  const dossierItems = [
    ["Current focus", typedRole || portfolioData.hero.roles[0]],
    ["Location", portfolioData.location],
    ["Education", "B.S. Computer Science · University of Colorado Boulder"],
    ["Stack", "TypeScript / Python / Go / Next.js / AWS"],
    ["Open to", portfolioData.contact.availability]
  ];

  const revealTransition = {
    duration: prefersReducedMotion ? 0 : 0.55,
    ease: [0.22, 1, 0.36, 1] as const
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <ParticleCanvas />
      <div className="section-shell flex min-h-screen items-center pt-28">
        <div className="relative w-full">
          <div className="grid gap-12 xl:grid-cols-12 xl:items-end">
            <div className="xl:col-span-7">
              <motion.p
                className="section-kicker"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={revealTransition}
              >
                Software Engineer / AI Systems / Cloud Platforms
              </motion.p>

              <motion.h1
                className="mt-6 max-w-5xl font-display text-[clamp(3.4rem,8vw,7rem)] font-semibold leading-[0.88] tracking-[-0.05em] text-text-primary"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ...revealTransition,
                  delay: prefersReducedMotion ? 0 : 0.08
                }}
              >
                <GlitchText text={portfolioData.name}>{portfolioData.name}</GlitchText>
              </motion.h1>

              <motion.p
                className="mt-8 max-w-4xl font-display text-xl leading-9 text-text-primary/94 sm:text-2xl sm:leading-10"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ...revealTransition,
                  delay: prefersReducedMotion ? 0 : 0.14
                }}
              >
                {portfolioData.headline}
              </motion.p>

              <motion.p
                className="mt-6 max-w-2xl text-sm leading-8 text-text-muted sm:text-base"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ...revealTransition,
                  delay: prefersReducedMotion ? 0 : 0.2
                }}
              >
                {portfolioData.hero.bio}
              </motion.p>

              <motion.div
                className="mt-10 flex flex-col gap-4 sm:flex-row"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ...revealTransition,
                  delay: prefersReducedMotion ? 0 : 0.26
                }}
              >
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 border border-accent-cyan/35 bg-accent-cyan px-6 py-3 text-sm font-medium text-bg-void hover:-translate-y-0.5"
                  data-cursor="hover"
                >
                  View Projects
                  <ArrowRight size={16} />
                </a>
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 border border-bg-border/90 bg-bg-surface/50 px-6 py-3 text-sm font-medium text-text-primary hover:border-accent-cyan/35 hover:text-accent-cyan"
                  data-cursor="hover"
                >
                  Download Resume
                  <Download size={16} />
                </a>
              </motion.div>

              <motion.div
                className="mt-10 flex flex-wrap items-center gap-4"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ...revealTransition,
                  delay: prefersReducedMotion ? 0 : 0.32
                }}
              >
                {portfolioData.socials.map((social) => {
                  const Icon = getSocialIcon(social.icon);

                  if (!social.available || !social.href) {
                    return (
                      <span
                        key={social.label}
                        className="inline-flex h-12 w-12 items-center justify-center border border-bg-border/80 bg-bg-surface/60 text-text-muted/60"
                        aria-label={social.tooltip}
                      >
                        <Icon size={18} />
                      </span>
                    );
                  }

                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-12 w-12 items-center justify-center border border-bg-border/80 bg-bg-surface/60 text-text-muted hover:border-accent-cyan/35 hover:text-accent-cyan"
                      aria-label={social.tooltip}
                      title={social.tooltip}
                      data-cursor="hover"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </motion.div>
            </div>

            <motion.aside
              className="editorial-panel relative xl:col-span-5"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ...revealTransition,
                delay: prefersReducedMotion ? 0 : 0.18
              }}
            >
              <div className="border-b border-bg-border/80 px-6 py-4 flex items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-accent-cyan/40 shadow-neon">
                  <Image
                    src="/profile.png"
                    alt="Sansh Goel"
                    fill
                    className="object-cover"
                    sizes="56px"
                    priority
                  />
                </div>
                <div>
                  <p className="font-display text-sm font-semibold text-text-primary">{portfolioData.name}</p>
                  <p className="meta-label">Live Dossier</p>
                </div>
              </div>
              <div className="space-y-5 px-6 py-6">
                {dossierItems.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid gap-2 border-b border-bg-border/60 pb-4 last:border-b-0 last:pb-0 sm:grid-cols-[130px_1fr]"
                  >
                    <p className="meta-label">{label}</p>
                    <p className="text-sm leading-7 text-text-primary">{value}</p>
                  </div>
                ))}
                <div className="flex items-center gap-2 pt-2 text-sm text-text-muted">
                  <MapPin size={15} className="text-accent-blue" />
                  Based in Boulder, CO and building with product + systems focus.
                </div>
              </div>
            </motion.aside>
          </div>

          <motion.div
            className="mt-14 border-y border-bg-border/80"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              ...revealTransition,
              delay: prefersReducedMotion ? 0 : 0.36
            }}
          >
            <div className="grid gap-0 sm:grid-cols-3">
              {heroMetrics.map((metric) => (
                <div
                  key={metric}
                  className="border-b border-bg-border/80 px-5 py-4 text-sm text-text-muted last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
                >
                  <span className="meta-label block mb-2">Signal</span>
                  <span className="font-display text-lg text-text-primary">
                    {metric}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 border border-bg-border/80 bg-bg-surface/75 px-4 py-2 text-xs uppercase tracking-[0.24em] text-text-muted backdrop-blur"
        initial={prefersReducedMotion ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          ...revealTransition,
          delay: prefersReducedMotion ? 0 : 0.4
        }}
        data-cursor="hover"
      >
        Scroll
        <ChevronDown size={14} className="animate-soft-bounce text-accent-cyan" />
      </motion.a>
    </section>
  );
}
