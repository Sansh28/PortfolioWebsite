import type { ReactNode } from "react";

type GlitchTextProps = {
  text: string;
  className?: string;
  children?: ReactNode;
};

export function GlitchText({
  text,
  className = "",
  children
}: GlitchTextProps) {
  return (
    <span className={`glitch-text ${className}`.trim()} data-text={text}>
      {children ?? text}
    </span>
  );
}
