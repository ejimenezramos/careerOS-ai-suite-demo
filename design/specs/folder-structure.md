# Folder Structure — React + TS + Vite + Tailwind + shadcn/ui + Framer Motion

Drop this under your app `src/`. The `/design` folder (this bundle) lives at the
repo root as reference and is not shipped.

```
src/
├── main.tsx                     # Vite entry; mounts <App/> inside providers
├── App.tsx                      # Router; wraps routes in <AppShell/>
├── index.css                    # imports tokens/globals.css + Tailwind layers
│
├── app/
│   ├── routes.tsx               # route table (see specs/screens.md route list)
│   └── AppShell.tsx             # Sidebar + Topbar + DemoBanner + <Outlet/>
│
├── layouts/
│   ├── Sidebar.tsx
│   ├── NavItem.tsx
│   └── Topbar.tsx
│
├── pages/
│   ├── Dashboard.tsx
│   ├── Pipeline.tsx
│   ├── Candidacies.tsx          # candidacies list (table)
│   ├── CandidacyForm.tsx        # add + edit candidacy (mode prop)
│   ├── CandidateDetail.tsx
│   ├── Offers.tsx
│   ├── OfferForm.tsx            # add + edit (mode prop)
│   ├── OfferView.tsx            # read-only application detail
│   ├── CvManager.tsx
│   ├── Comparator.tsx
│   ├── Analysis.tsx
│   ├── Agents.tsx
│   ├── Settings.tsx
│   └── Login.tsx                # login + register (toggle)
│
├── components/
│   ├── ui/                      # shadcn primitives (generated) + our wrappers
│   │   ├── button.tsx, card.tsx, input.tsx, textarea.tsx, select.tsx,
│   │   ├── badge.tsx, dialog.tsx, switch.tsx, table.tsx, progress.tsx,
│   │   ├── SegmentedControl.tsx, PasswordInput.tsx, Field.tsx,
│   │   ├── StatusBadge.tsx, TrackBar.tsx, Toggle.tsx,
│   │   ├── CompanyAvatar.tsx, UserAvatar.tsx
│   ├── pipeline/                # Board, Column, CandidateCard (dnd-kit)
│   ├── candidacies/             # CandidaciesTable
│   ├── offers/                  # OffersTable, QaFieldArray
│   ├── cv/                      # CvCard, UploadSlot
│   ├── ai/                      # AiCard, ScoreRing, SkillChip, AgentCard, EvidenceRow
│   ├── settings/                # EditionCard
│   ├── modals/                  # ConfirmDelete
│   ├── DemoBanner.tsx
│   └── GatedFeature.tsx         # wraps children; shows lock + tooltip if gated
│
├── layouts/                     # (see above)
│
├── hooks/
│   ├── useTheme.ts              # 'dark'|'light' → data-theme on <html>, persisted
│   ├── useAccent.ts             # 'violet'|'blue'|'cyan' → data-accent, persisted
│   ├── useLang.ts               # 'es'|'en' i18n
│   ├── useEdition.ts            # 'public'|'private'|'business'
│   └── useGate.ts               # (feature) => boolean, from edition matrix
│
├── context/
│   ├── ThemeProvider.tsx        # theme + accent + lang (writes data-* on <html>)
│   ├── EditionProvider.tsx      # current edition + gate() helper
│   └── I18nProvider.tsx         # dictionary (es/en) — see lib/i18n
│
└── lib/
    ├── i18n.ts                  # ES/EN dictionaries (extracted from prototype T{})
    ├── data.ts                  # dummy data (see specs/data-placeholders.md)
    ├── gating.ts                # EDITION_MATRIX (see specs/feature-gating.md)
    ├── motion.ts                # Framer variants (see specs/motion-spec.md)
    └── utils.ts                 # cn(), color-mix helpers, brand-tint avatar
```

## Providers wiring (main.tsx)
```
<ThemeProvider>         // sets data-theme + data-accent on <html>, persists
  <I18nProvider>        // es default, en switchable
    <EditionProvider>   // private default; public = demo banner + dummy data
      <RouterProvider router={router} />
    </EditionProvider>
  </I18nProvider>
</ThemeProvider>
```

## Recommended libraries
- **Routing:** `react-router-dom` (or TanStack Router).
- **Drag & drop:** `@dnd-kit/core` + `@dnd-kit/sortable` (pipeline).
- **Forms:** `react-hook-form` + `zod` (offer form, Q&A field array).
- **Animation:** `framer-motion`.
- **Icons:** `lucide-react`.
- **Font:** `geist` package (`Geist`, `Geist_Mono`) or Google Fonts link.
- **Toasts:** `sonner` (optional; prototype uses an inline success flash).

## index.css
```css
@import "./design-tokens/globals.css"; /* the file from tokens/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```
Put `data-theme` / `data-accent` on `<html>` (via ThemeProvider) so the tokens
resolve globally and the theme cross-fade transition applies everywhere.
