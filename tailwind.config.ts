import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "bg-void": "#111317",
        "bg-surface": "#1a1f26",
        "bg-border": "#2d3542",
        "accent-cyan": "#ff8a5b",
        "accent-blue": "#ffd166",
        "accent-purple": "#ffe6d6",
        "text-primary": "#f7f1e8",
        "text-muted": "#a2adbb"
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-jetbrains-mono)", "monospace"]
      },
      boxShadow: {
        neon: "0 0 24px rgba(255, 138, 91, 0.16)",
        "neon-strong": "0 0 32px rgba(255, 138, 91, 0.24)"
      },
      keyframes: {
        blink: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" }
        },
        "border-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" }
        },
        "soft-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" }
        },
        shimmer: {
          "0%": { opacity: "0.35", transform: "translateX(-100%)" },
          "100%": { opacity: "0.65", transform: "translateX(100%)" }
        },
        "glitch-before": {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 1px)" },
          "40%": { transform: "translate(2px, -1px)" },
          "60%": { transform: "translate(-1px, -1px)" },
          "80%": { transform: "translate(1px, 2px)" }
        },
        "glitch-after": {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(2px, -1px)" },
          "40%": { transform: "translate(-2px, 1px)" },
          "60%": { transform: "translate(1px, 1px)" },
          "80%": { transform: "translate(-1px, -2px)" }
        }
      },
      animation: {
        blink: "blink 1s steps(1, end) infinite",
        "border-spin": "border-spin 8s linear infinite",
        float: "float 7s ease-in-out infinite",
        "soft-bounce": "soft-bounce 1.8s ease-in-out infinite",
        shimmer: "shimmer 2.5s ease-in-out infinite",
        "glitch-before": "glitch-before 300ms steps(2, end) infinite",
        "glitch-after": "glitch-after 350ms steps(2, end) infinite"
      }
    }
  },
  plugins: []
};

export default config;
