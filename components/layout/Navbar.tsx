"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { portfolioData, type SectionId } from "@/lib/data";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("about");
  const prefersReducedMotion = useReducedMotion();
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    let frameId = 0;

    const updateNavigationState = () => {
      frameId = 0;
      const scrollTop = window.scrollY;
      const navOffset = 180;

      setHasScrolled(scrollTop > 80);

      const sectionIds = portfolioData.navItems.map((item) => item.id);
      let nextActiveSection: SectionId = sectionIds[0] ?? "about";

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);

        if (!section) {
          continue;
        }

        if (scrollTop + navOffset >= section.offsetTop) {
          nextActiveSection = sectionId;
        }
      }

      setActiveSection(nextActiveSection);
    };

    const requestUpdate = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(updateNavigationState);
    };

    updateNavigationState();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-accent-cyan"
        style={{ scaleX: scrollProgress }}
      />
      <header className="fixed inset-x-0 top-0 z-40">
        <nav
          className={`mx-auto mt-4 flex w-[calc(100%-1.5rem)] max-w-7xl items-center justify-between border px-4 py-3 transition-all duration-300 sm:w-[calc(100%-2rem)] sm:px-6 ${
            hasScrolled
              ? "border-bg-border/90 bg-bg-surface/92 backdrop-blur-xl"
              : "border-bg-border/60 bg-bg-void/50 backdrop-blur-md"
          }`}
        >
          <a
            href="/"
            className="group inline-flex items-center gap-3 px-1 py-1 focus-visible:outline-none"
            data-cursor="hover"
            aria-label={`${portfolioData.name} home`}
          >
            <span className="inline-flex h-11 w-11 items-center justify-center border border-accent-cyan/30 bg-accent-cyan/10 font-display text-sm font-semibold tracking-[0.28em] text-accent-cyan">
              {portfolioData.monogram}
            </span>
            <span className="hidden text-left sm:block">
              <span className="block font-display text-sm font-semibold text-text-primary">
                {portfolioData.name}
              </span>
              <span className="block font-body text-[11px] uppercase tracking-[0.2em] text-text-muted">
                Systems Journal
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {portfolioData.navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`relative px-4 py-2 text-sm ${
                    isActive
                      ? "text-accent-cyan"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                  data-cursor="hover"
                >
                  {item.label}
                  {isActive ? (
                    <motion.span
                      layoutId="active-nav-link"
                      className="absolute inset-x-3 bottom-1 h-px bg-accent-cyan"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 350, damping: 28 }
                      }
                    />
                  ) : null}
                </a>
              );
            })}
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-bg-border/80 bg-bg-surface/80 text-text-primary lg:hidden"
            onClick={() => setIsMenuOpen((previous) => !previous)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            data-cursor="hover"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.aside
            className="fixed inset-0 z-30 bg-bg-void/95 backdrop-blur-2xl lg:hidden"
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0 }}
          >
            <div className="flex min-h-screen flex-col justify-center px-8">
              <div className="mb-10">
                <p className="section-kicker">Navigation</p>
                <h2 className="mt-3 font-display text-3xl font-semibold text-text-primary">
                  Explore the dossier.
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                {portfolioData.navItems.map((item, index) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className="border border-bg-border/80 bg-bg-surface/80 px-5 py-4 font-display text-2xl text-text-primary"
                    onClick={() => setIsMenuOpen(false)}
                    data-cursor="hover"
                    initial={
                      prefersReducedMotion ? false : { opacity: 0, y: 18 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: -12 }
                    }
                    transition={{
                      duration: prefersReducedMotion ? 0 : 0.35,
                      delay: prefersReducedMotion ? 0 : index * 0.08
                    }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
