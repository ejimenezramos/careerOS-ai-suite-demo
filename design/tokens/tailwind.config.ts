import type { Config } from "tailwindcss";

/**
 * CareerOS AI Suite — Tailwind config
 * ------------------------------------------------------------------
 * Colors are wired to the CSS variables defined in tokens/globals.css so
 * that Dark/Light + accent swaps happen purely via `data-theme` /
 * `data-accent` on <html>. Tailwind classes like `bg-elev`, `text-muted`,
 * `border-line` map straight onto the prototype's tokens — DO NOT hardcode
 * hex values in components; always go through these.
 *
 * Because the tokens are already-resolved colors (not HSL channels), we
 * reference them directly with var(). Opacity modifiers (bg-accent/50)
 * will not work on these; use the *-soft / *-line tokens instead, which
 * are the exact translucent values from the design.
 */
export default {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        elev: "var(--bg-elev)",
        "elev-2": "var(--bg-elev-2)",
        inset: "var(--bg-inset)",
        line: "var(--border)",
        "line-strong": "var(--border-strong)",
        text: "var(--text)",
        muted: "var(--muted)",
        dim: "var(--dim)",
        accent: {
          DEFAULT: "var(--accent)",
          2: "var(--accent-2)",
          ink: "var(--accent-ink)",
          soft: "var(--accent-soft)",
          line: "var(--accent-line)",
        },
        good: { DEFAULT: "var(--good)", soft: "var(--good-soft)" },
        warn: { DEFAULT: "var(--warn)", soft: "var(--warn-soft)" },
        bad: { DEFAULT: "var(--bad)", soft: "var(--bad-soft)" },
        info: { DEFAULT: "var(--info)", soft: "var(--info-soft)" },
      },
      fontFamily: {
        sans: ["Geist", "Geist Fallback", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "ui-monospace", "monospace"],
      },
      // Exact border-radius values used across the prototype.
      borderRadius: {
        sm: "7px",   // segmented-control pills, small buttons
        md: "9px",   // icon buttons, badges base
        lg: "10px",  // inputs, primary buttons, nav items
        xl: "11px",  // search field, form inputs
        "2xl": "13px", // small cards / kanban cards
        "3xl": "15px", // KPI + AI + CV cards
        "4xl": "16px", // panels / section cards
        "5xl": "18px", // modals
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        DEFAULT: "var(--shadow)",
        card: "var(--shadow)",
      },
      transitionTimingFunction: {
        // The two easings used everywhere in the design.
        theme: "cubic-bezier(0.4, 0, 0.2, 1)",
        spring: "cubic-bezier(0.16, 1, 0.3, 1)", // view/card entrances
        knob: "cubic-bezier(0.34, 1.56, 0.64, 1)", // toggle knob overshoot
      },
      keyframes: {
        viewIn: { from: { opacity: "0", transform: "translateY(10px)" }, to: { opacity: "1", transform: "none" } },
        fadeUp: { from: { opacity: "0", transform: "translateY(14px)" }, to: { opacity: "1", transform: "none" } },
        popIn: { "0%": { opacity: "0", transform: "scale(0.92)" }, "60%": { transform: "scale(1.02)" }, "100%": { opacity: "1", transform: "scale(1)" } },
        glowPulse: { "0%,100%": { opacity: "0.5" }, "50%": { opacity: "1" } },
        rowIn: { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "none" } },
        spin: { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        viewIn: "viewIn 0.45s cubic-bezier(0.16,1,0.3,1)",
        fadeUp: "fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) backwards",
        popIn: "popIn 0.4s cubic-bezier(0.16,1,0.3,1) backwards",
        glowPulse: "glowPulse 2.4s ease-in-out infinite",
        rowIn: "rowIn 0.3s cubic-bezier(0.16,1,0.3,1)",
        spin: "spin 0.7s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
