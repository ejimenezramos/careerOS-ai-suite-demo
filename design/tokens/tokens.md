# Design Tokens — CareerOS AI Suite

All values are extracted **verbatim** from the working prototype
(`design/references/CareerOS.dc.html`). Do not introduce new colors, radii, or
shadows. The prototype uses a **single set of semantic CSS variables** that are
re-mapped per theme (`[data-theme="dark|light"]`) and per accent
(`[data-accent="violet|cyan"]`, blue is the base). Ship exactly this system.

> **Brand default:** the product ships in **Dark mode + Violet accent**. Blue
> (base) and Cyan are alternate accents selectable in Settings.

---

## 1. Color tokens

### Neutrals & surfaces

| Token | Dark | Light | Usage |
|---|---|---|---|
| `--bg` | `#0a0b0e` | `#f6f8fb` | App background (behind everything) |
| `--bg-elev` | `#101216` | `#ffffff` | Cards, panels, topbar, inputs' container |
| `--bg-elev-2` | `#171a20` | `#f2f4f8` | Hover fills, track backgrounds, inner chips |
| `--bg-inset` | `#0c0e12` | `#f8fafc` | Sidebar, kanban columns, input fields, insets |
| `--border` | `#20242c` | `#e7eaf0` | Default 1px borders / dividers |
| `--border-strong` | `#2b3039` | `#d4d9e2` | Hover borders, scrollbar thumb, dashed CTAs |

### Text

| Token | Dark | Light | Usage |
|---|---|---|---|
| `--text` | `#f3f5f8` | `#0b1220` | Primary text, headings |
| `--muted` | `#98a0ac` | `#5a6573` | Secondary text, labels, body copy |
| `--dim` | `#646c79` | `#8b94a2` | Tertiary text, placeholders, meta, icon idle |

### Accent (default = violet in product)

| Token | Violet (default) | Blue (base) | Cyan | Usage |
|---|---|---|---|---|
| `--accent` | `#9a6bff` | `#4f8cff` (dark) / `#2563eb` (light) | `#22b8cf` | Primary actions, active nav, links |
| `--accent-2` | `#b794ff` | `#7c8bff` (dark) / `#6d4aff` (light) | `#56c7d8` | Gradient partner, edit glow |
| `--accent-ink` | `#ffffff` | `#ffffff` | `#ffffff` | Text/icon on accent fills |
| `--accent-soft` | `rgba(154,107,255,.16)` | `rgba(79,140,255,.15)` / `rgba(37,99,235,.08)` | `rgba(34,184,207,.15)` | Active nav bg, soft chips, focus ring |
| `--accent-line` | `rgba(154,107,255,.34)` | `rgba(79,140,255,.32)` / `rgba(37,99,235,.22)` | `rgba(34,184,207,.32)` | Accent borders, glow shadow color |

> Gradient used on logo mark, primary CTAs, score rings and login panel:
> `linear-gradient(135deg, var(--accent), var(--accent-2))`
> (logo mark uses `140deg`; login hero panel uses `150deg`).

### Semantic status

| Token | Dark | Light | Meaning |
|---|---|---|---|
| `--good` / `--good-soft` | `#34d399` / `rgba(52,211,153,.14)` | `#059669` / `rgba(5,150,105,.1)` | Offer, strong match, active, success |
| `--warn` / `--warn-soft` | `#fbbf24` / `rgba(251,191,36,.14)` | `#d97706` / `rgba(217,119,6,.1)` | Interview, partial match, agent running, urgent |
| `--bad` / `--bad-soft` | `#f87171` / `rgba(248,113,113,.14)` | `#dc2626` / `rgba(220,38,38,.1)` | Rejected, delete, required errors, high priority |
| `--info` / `--info-soft` | `#60a5fa` / `rgba(96,165,250,.14)` | `#2563eb` / `rgba(37,99,235,.1)` | Applied stage, notes accent |

**Status → soft-badge pattern** (used everywhere): text color = solid token,
background = `color-mix(in srgb, <token> 14%, transparent)` (or the `-soft`
token). Company avatars use the same trick keyed off the brand color:
`background: rgba(r,g,b,0.15); color: <brandHex>`.

---

## 2. Typography — Geist

Load `Geist` (400/500/600/700) + `Geist Mono` (400/500) via Google Fonts or the
`geist` npm package. Never substitute Inter.

| Role | Size | Weight | Letter-spacing | Notes |
|---|---|---|---|---|
| Page H1 | 25px | 600 | -0.5px | Screen titles ("Dashboard", "Ofertas") |
| Screen title (view detail) | 22–24px | 600 | -0.4px | Offer role, form titles |
| Login H2 (hero) | 30px | 600 | -0.8px | Left brand panel |
| Section H2 | 15px | 600 | normal | Card/section headers |
| Sub-section H2 | 14.5px | 600 | normal | Form section headers |
| KPI value | 28px | 600 | -1px | Dashboard metric numbers |
| Score (gauge) | 44px | 600 | -2px | AI analysis big score |
| Body | 13–13.5px | 400–500 | normal | Default UI text, line-height ~1.5 |
| Label | 12.5px | 500 | normal | Form labels (color `--muted`) |
| Meta / caption | 11–12px | 500 | normal | Dates, counts (color `--dim`) |
| Overline | 10.5–11px | 600 | 0.5–0.8px, UPPERCASE | Column headers, "AI SUITE", section eyebrows |
| Mono | 11–13px | 400–500 | normal | Dates in tables, counts, passwords, ⌘K |

---

## 3. Spacing scale

The prototype uses a loose 4px-ish scale. Common values (px): **2, 4, 5, 6, 7,
8, 9, 10, 11, 12, 13, 14, 16, 18, 20, 22, 24, 26, 30, 34**.

Anchors to standardize on in Tailwind (`gap-*`, `p-*`):
- **Card padding:** 17–24px (KPI 18px, panels 20px, big form cards 24px)
- **Page padding:** `30px 34px` top/sides, `60px` bottom (detail views `24px` top)
- **Grid/flex gaps:** 16px (card grids), 18px (panel grids), 10–12px (inline groups)
- **Sidebar:** 248px wide, `18px 14px` padding, 6px item gap
- **Topbar:** 60px tall, `0 24px` padding, 14px gap

---

## 4. Border radius

| Value | Applied to |
|---|---|
| 7px | Segmented-control pills, small mono tags |
| 8–9px | Icon buttons, badges, avatar (square variant), status day-chip |
| 10px | Inputs, primary/secondary buttons, nav items, theme toggle |
| 11px | Search field, form inputs, reminder rows, segmented containers |
| 12–13px | Kanban cards, small cards, evidence rows |
| 14–15px | KPI cards, AI cards, CV cards, edition cards |
| 16px | Panels, section cards |
| 18px | Modals |
| 20px | Pills / chips (fully rounded via `border-radius:20px`) |
| 50% | Circular avatars (Tweak: `avatarShape=Redondo`), status dots, toggle knob |

Avatar shape is a product Tweak: **Square** = 10px (lg 16px), **Round** = 50%.

---

## 5. Shadows

| Token | Dark | Light |
|---|---|---|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,.4)` | `0 1px 2px rgba(16,24,40,.05)` |
| `--shadow` | `0 1px 2px rgba(0,0,0,.5), 0 16px 40px -12px rgba(0,0,0,.55)` | `0 1px 2px rgba(16,24,40,.06), 0 18px 40px -16px rgba(16,24,40,.16)` |

Card hover raises with `--shadow` + `translateY(-2px|-3px)`. Primary buttons
carry a colored glow: `0 4px 12px -2px var(--accent-line)` (bigger CTAs
`0 5px 16px -3px` / `0 6px 18px -4px`).

---

## 6. Transitions & easing

| Purpose | Value |
|---|---|
| Theme cross-fade (global `*`) | `background-color .32s cubic-bezier(.4,0,.2,1), border-color .32s …, color .2s ease, box-shadow .3s ease, fill .3s ease` |
| View entrance | `viewIn .45s cubic-bezier(.16,1,.3,1)` |
| Card/list stagger | `fadeUp .5s` / `rowIn .3s` / `popIn .4s` `cubic-bezier(.16,1,.3,1)` |
| Card hover | `all .18s cubic-bezier(.16,1,.3,1)` (kanban) / `all .15s ease` (nav) |
| Toggle knob | `left .25s cubic-bezier(.34,1.56,.64,1)` (overshoot) |
| Score ring fill | `stroke-dashoffset 1.1s cubic-bezier(.16,1,.3,1)` |
| Spinner | `spin .7s linear infinite` |
| Edit glow (pulsing ring) | `editGlow 2.4s ease-in-out infinite` |
| Status dot / live pulse | `glowPulse` 1.2–2.4s ease-in-out infinite |

The two canonical easings: **`cubic-bezier(.4,0,.2,1)`** (theme/standard) and
**`cubic-bezier(.16,1,.3,1)`** (entrances/spring). Knob overshoot uses
`cubic-bezier(.34,1.56,.64,1)`.
