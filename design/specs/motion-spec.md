# Motion Spec — Framer Motion

Every animation below is taken from the prototype's CSS keyframes/transitions
(see `tokens/globals.css`). Reproduce them with Framer Motion. Two canonical
easings:

```ts
// lib/motion.ts
export const EASE_SPRING = [0.16, 1, 0.3, 1] as const; // entrances
export const EASE_STD    = [0.4, 0, 0.2, 1] as const;  // theme/standard
export const EASE_KNOB   = [0.34, 1.56, 0.64, 1] as const; // overshoot
```

## View / route transition  (`viewIn`)
Each page mounts with fade + 10px rise.
```ts
export const viewIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_SPRING } },
};
```
Wrap page roots; use `<AnimatePresence mode="wait">` keyed on route for
cross-fade between screens.

## Card / list stagger  (`fadeUp`, `popIn`, `rowIn`)
- **KPI & card grids:** container `staggerChildren: 0.05`, child `fadeUp`
  (opacity 0→1, y 14→0, 0.5s, `backwards`).
- **Skill chips (match map):** `popIn` — scale `0.92 → 1.02 → 1`, 0.4s, stagger
  ~0.03. Only for **matched** chips; gap chips are static.
- **Q&A row insert / reminder rows:** `rowIn` — opacity 0→1, y 8→0, 0.3s.

```ts
export const stagger = { animate: { transition: { staggerChildren: 0.05 } } };
export const fadeUp = { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_SPRING } } };
export const popIn  = { initial: { opacity: 0, scale: 0.92 }, animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE_SPRING } } };
```

## Card hover
`whileHover={{ y: -2, boxShadow: "var(--shadow)" }}` (AI cards `y: -3`),
`transition={{ duration: 0.18, ease: EASE_SPRING }}`, plus border → `--border-strong`.
Skill chips hover `{{ y: -2, scale: 1.03 }}`.

## Buttons
`whileHover={{ y: -1, filter: "brightness(1.08)" }}` , `whileTap={{ y: 0 }}` on
primary/gradient CTAs. Secondary/icon buttons only change bg/border color.

## Theme cross-fade
Do **not** animate per-element in Framer — keep the global CSS `* { transition:
background-color .32s …, border-color .32s …, color .2s … }` rule so a
`data-theme` swap fades the entire UI at once. (Respect `prefers-reduced-motion`.)

## Kanban drag & drop  (`@dnd-kit`)
- Card `cursor: grab`; while dragging use `DragOverlay` with slight scale + `--shadow`.
- **Drop target:** column highlights to `background: var(--accent-soft)`,
  `border-color: var(--accent-line)` on `dragOver` (0.2s ease); reverts on leave/drop.
- On drop, the card's status updates and it re-flows into the new column;
  animate reflow with `layout` prop on cards (`transition: { duration: 0.18, ease: EASE_SPRING }`).

## Score ring fill  (`ScoreRing`)
Animate SVG `strokeDashoffset` from full circumference → target on mount:
`transition: { duration: 1.1, ease: EASE_SPRING }` (comparator uses ~1.0s).
Stroke is a gradient `accent → accent-2`.

## Toggle knob  (`Toggle`)
Knob `x` 3px↔21px, `transition: { duration: 0.25, ease: EASE_KNOB }` (overshoot).
Track color cross-fades `--border-strong` ↔ `--accent`.

## Modal (ConfirmDelete)
Overlay: `overlayIn` (opacity 0→1, 0.2s) + `backdrop-blur(4px)`.
Panel: `modalIn` — opacity 0→1, y 14→0, scale 0.96→1, 0.32s `EASE_SPRING`.
Use `<AnimatePresence>` for exit.

## Row delete (offers table)
Exiting row animates `opacity → 0, x → 24` over ~0.36s then unmounts.

## Loading spinners
`spin` — continuous `rotate 360°`, 0.7s linear infinite (Save, Analyze, Run agents).

## Live pulses  (`glowPulse`)
Status dots (AI credits, editing badge, demo banner, agent "Processing") pulse
opacity 0.5↔1, 1.2–2.4s ease-in-out infinite.

## Edit-mode ring  (`editGlow`)
Offer form card in edit mode: pulsing violet ring (2.4s ease-in-out infinite).
Framer: animate `boxShadow` between the two `editGlow` keyframe values.

## Agent orchestration sequence
On "Run full analysis": set agents idle→active→done in order, ~900ms apart,
each `active` lasting ~800ms. Drive with `setTimeout` chain or a Framer timeline;
the card border color follows status (warn while active, good when done).

> **Reduced motion:** gate entrance/stagger/hover-lift behind
> `useReducedMotion()`; keep opacity fades, drop transforms.
