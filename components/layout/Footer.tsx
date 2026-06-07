import { Github, Linkedin } from "lucide-react";

import { portfolioData } from "@/lib/data";

function getSocialIcon(icon: "github" | "linkedin") {
  switch (icon) {
    case "github":
      return Github;
    case "linkedin":
      return Linkedin;
    default:
      return Github;
  }
}

export function Footer() {
  return (
    <footer className="border-t border-bg-border/70">
      <div className="section-shell py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto_auto] lg:items-center">
          <div>
            <p className="font-display text-lg font-semibold text-text-primary">
              {portfolioData.name}
            </p>
            <p className="mt-2 max-w-xl text-sm leading-7 text-text-muted">
              {portfolioData.footerTagline}
            </p>
          </div>

          <p className="text-sm text-text-muted">Built with Next.js & Tailwind.</p>

          <div className="flex items-center gap-3">
            {portfolioData.socials.map((social) => {
              const Icon = getSocialIcon(social.icon);

              if (!social.available || !social.href) {
                return (
                  <span
                    key={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center border border-bg-border/80 bg-bg-surface/80 text-text-muted/60"
                    title={social.tooltip}
                    aria-label={social.tooltip}
                  >
                    <Icon size={16} />
                  </span>
                );
              }

              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center border border-bg-border/80 bg-bg-surface/80 text-text-muted hover:border-accent-cyan/50 hover:text-accent-cyan"
                  title={social.tooltip}
                  aria-label={social.tooltip}
                  data-cursor="hover"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </div>
        <div className="mt-8 border-t border-bg-border/70 pt-5 text-sm text-text-muted">
          © {new Date().getFullYear()} {portfolioData.name}. Designed to be read
          quickly by recruiters, collaborators, and technical teams.
        </div>
      </div>
    </footer>
  );
}
