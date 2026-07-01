# CareerOS AI Suite — Design Handoff (`/design`)

Developer-ready export of the **CareerOS AI Suite** interface. Everything here
is derived **verbatim** from the working HTML prototype — no redesign. It is
structured for implementation with **React + TypeScript + Vite + Tailwind CSS +
shadcn/ui + Framer Motion**. Drop this folder at your repo root as `/design`.

> **Built for Claude Code.** Point Claude Code at this folder and ask it to
> implement screen-by-screen following `specs/screens.md` + `specs/component-mapping.md`.

---

## About the design files
The files in `references/` are **design references created in HTML** — a live,
interactive prototype showing the intended look, behavior, and interactions.
They are **not production code to copy line-for-line**. Your task is to
**recreate them** in the target stack (React + TS + Tailwind + shadcn/ui +
Framer Motion) using the tokens and specs in this bundle.

Open the prototype and navigate real states via URL params:
```
references/CareerOS.dc.html?route=dashboard&theme=dark&lang=es&edition=business
```
`route`: dashboard · pipeline · candidacies · candidacyForm · detail · offers · offerForm · offerView · cvs ·
comparator · analysis · agents · settings · login · &nbsp;`theme`: dark|light ·
`lang`: es|en · `edition`: public|private|business · `mode`: add|edit ·
`view=1` · `delete=1`.
(These files use a small runtime, `support.js`; just open the HTML in a browser.)

`references/CareerOS Canvas.dc.html` is the **canvas overview** — all 14 screens
side-by-side across Dark/Light and the three editions.

## Fidelity: **High-fidelity (hifi)**
Final colors, Geist typography, spacing, radii, shadows, and interactions are
all specified. Recreate the UI pixel-accurately using the tokens in `tokens/`.

---

## What's in this bundle
```
design/
├── README.md                       ← you are here (master index)
├── references/
│   ├── CareerOS.dc.html            ← the full interactive prototype (source of truth)
│   ├── CareerOS Canvas.dc.html     ← canvas overview: all screens side-by-side
│   └── support.js                  ← prototype runtime (open the HTML directly)
├── tokens/
│   ├── globals.css                 ← EXACT CSS variables (dark/light/accent) + keyframes
│   ├── tailwind.config.ts          ← Tailwind wired to the tokens
│   └── tokens.md                   ← human-readable token reference (colors, type, spacing, radius, shadow, motion)
└── specs/
    ├── screens.md                  ← every screen: purpose, layout, components, copy
    ├── component-mapping.md        ← each UI element → shadcn/ui + custom wrapper + interaction states
    ├── folder-structure.md         ← React app structure (components/pages/layouts/hooks/context/lib) + providers
    ├── motion-spec.md              ← Framer Motion variants for every animation
    ├── responsive-spec.md          ← desktop-first breakpoint behavior
    ├── feature-gating.md           ← Public/Private/Business matrix + <GatedFeature>
    └── data-placeholders.ts        ← dummy data (exact prototype values) for the Public MVP
```

## Suggested reading order for the implementer
1. **`tokens/tokens.md`** + **`tokens/globals.css`** — install the design language first.
2. **`specs/folder-structure.md`** — scaffold the app, providers, and libraries.
3. **`specs/screens.md`** — build screens; keep the prototype open beside you.
4. **`specs/component-mapping.md`** — pick the right shadcn base per element + states.
5. **`specs/motion-spec.md`** — add Framer Motion once static UI matches.
6. **`specs/feature-gating.md`** + **`specs/responsive-spec.md`** — wire editions and breakpoints.
7. **`specs/data-placeholders.ts`** — seed the Public/Demo edition.

---

## Product at a glance
- **Persistent shell:** 248px Sidebar + 60px translucent Topbar; demo banner when Public.
- **Screens (14):** Dashboard, Pipeline (Kanban + drag&drop), Candidacies (list), Add/Edit Candidacy, Candidate/Offer Detail, Offers (CRUD table), Add/Edit Offer (with application data, credentials, Q&A, notes), Offer/Application read-only View, CV Manager (≤4 PDFs), AI Comparator, AI Analysis, AI Agents (Business), Settings, Login/Register.
- **Themes:** Dark (default) & Light — impeccable in both, cross-fade on toggle.
- **Accent:** Violet default; Blue + Cyan alternates (Settings/Tweaks).
- **i18n:** Spanish default, English switchable (dictionaries in prototype `T{}`; port to `lib/i18n.ts`).
- **Editions:** Public (dummy data + demo banner), Private (real data, limited AI), Business (full AI: agents, AI CV tools, advanced insights). Gated features are shown-but-locked.
- **Typography:** Geist + Geist Mono only.

## Component inventory (reusable)
Sidebar · NavItem · Topbar · SearchBar (⌘K) · SegmentedControl (theme/lang/status/priority) ·
Button (primary/secondary/ghost/icon, +states) · StatCard · AiCard · CvCard ·
EditionCard · OffersTable · CandidaciesTable · CandidateCard (+ Board/Column, dnd) · QaFieldArray ·
Field/Input/Textarea/Select · PasswordInput · StatusBadge · SkillChip · ScoreRing ·
TrackBar · Toggle (switch) · ConfirmDelete (modal) · DemoBanner · GatedFeature ·
CompanyAvatar/UserAvatar · SocialButton.

---

## Notes & honest gaps
- **"Candidacies / Add Candidacy"** now ship **natively** as the Candidacies list
  (route `candidacies`) + Add/Edit Candidacy form (route `candidacyForm`), placed
  right after Pipeline in the sidebar. Candidacies (your applications) are modeled
  as a distinct entity from Offers (the job postings), reusing the same CRUD
  table/form patterns and tokens.
- **Sample data** uses recognizable tech companies (Stripe, Figma, Vercel, …) as
  illustrative placeholders for the Public/Demo edition — swap for real data in
  Private/Business.
- The prototype's inline styles are intentional (streaming preview). In React,
  move everything onto the Tailwind tokens — **do not hardcode hex values**.
- No third-party brand assets are required; icons are Lucide-equivalent line icons.
