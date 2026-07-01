# Component Mapping — shadcn/ui + custom

The prototype is hand-built with inline styles. This maps each UI element to a
**shadcn/ui** primitive (install via `npx shadcn@latest add <name>`) plus the
custom wrapper you should create. Keep all styling on the tokens from
`tokens/tokens.md` — restyle shadcn components through their class slots, do not
accept their default theme.

> shadcn stores colors as HSL CSS vars in its own `globals.css`. **Replace**
> that block with our `tokens/globals.css` and point shadcn's semantic names at
> ours (e.g. `--background: var(--bg)`, `--card: var(--bg-elev)`,
> `--primary: var(--accent)`, `--border: var(--border)`, `--ring:
> var(--accent-line)`, `--muted-foreground: var(--muted)`). Then most shadcn
> defaults inherit the design automatically.

| UI element (prototype) | shadcn/ui base | Custom component | Notes |
|---|---|---|---|
| Sidebar | `sidebar` (or plain nav) | `layout/Sidebar` | 248px; active item = accent-soft + accent-line |
| Nav item | `button` (ghost) | `layout/NavItem` | icon + label + badge/lock |
| Topbar search | `input` + `command` | `layout/SearchBar` | `⌘K` opens `Command` dialog |
| Language / Theme / Status toggles | `toggle-group` | `ui/SegmentedControl` | active pill = elev bg + shadow-sm (settings) or accent fill (topbar lang) |
| Primary / secondary / icon buttons | `button` | `ui/Button` variants | see interaction states below |
| KPI / AI / CV / edition cards | `card` | `ui/StatCard`, `ai/AiCard`, `cv/CvCard`, `settings/EditionCard` | hover lift + shadow |
| Kanban board & cards | — (use `@dnd-kit`) | `pipeline/Board`, `pipeline/Column`, `pipeline/CandidateCard` | not a shadcn component |
| Offers table | `table` | `offers/OffersTable` | grid rows, hover fill, row-exit anim |
| Candidacies table | `table` | `candidacies/CandidaciesTable` | same grid pattern; Status + Match + Priority columns |
| Dropdowns / selects | `select` / `dropdown-menu` | `ui/Select` | CV picker, status filter, timezone |
| Form fields | `input`, `textarea`, `label`, `form` (+ `react-hook-form` + `zod`) | `ui/Field` | required → `--bad` border + message |
| Q&A repeatable rows | `form` `useFieldArray` | `offers/QaFieldArray` | add/remove, `rowIn` on insert |
| Password show/hide | `input` + `button` | `ui/PasswordInput` | toggles `type` |
| Status / priority / verdict / edition badges | `badge` | `ui/StatusBadge` | soft pattern (color-mix 14%) |
| Skill chips (match map) | `badge` | `ai/SkillChip` | matched = accent-soft+line+`popIn`; gap = dashed dim |
| Score gauges | — (SVG) | `ai/ScoreRing` | animated `stroke-dashoffset`, gradient stroke |
| Progress bars (KPI/credits/breakdown) | `progress` | `ui/TrackBar` | colored fill at % width |
| Toggles (settings) | `switch` | `ui/Toggle` | 42×24, knob overshoot easing |
| Delete confirm | `dialog` / `alert-dialog` | `modals/ConfirmDelete` | overlay blur + `modalIn` |
| Demo banner | `alert` | `DemoBanner` | gradient wash |
| Tooltips ("Business Edition") | `tooltip` | — | on gated controls |
| Toasts (save success) | `sonner` | — | or inline success flash (as prototype) |
| File chips / upload slot | — | `cv/CvCard`, `cv/UploadSlot` | dashed slot while < 4 |
| Login social buttons | `button` | `auth/SocialButton` | Google enabled, LinkedIn disabled + "Coming soon" |
| Avatars | `avatar` | `ui/CompanyAvatar`, `ui/UserAvatar` | brand-tinted (company) / gradient (user) |
| Icons | `lucide-react` | — | all icons are Lucide-equivalent line icons, 1.7–1.8 stroke |

## Interaction states (apply to `ui/Button` and interactive cards)
- **Primary:** `bg-accent text-accent-ink`, glow `shadow-[0_4px_12px_-2px_var(--accent-line)]`; **hover** `brightness(1.08) translateY(-1px)`; **active/pressed** `translateY(0)`; **disabled** greyed to `--bg-elev-2` + `--dim`, `cursor:not-allowed`, no glow.
- **Secondary:** `bg-elev border border-line text-text`; **hover** `border-line-strong bg-elev-2`.
- **Ghost/icon:** transparent + `--muted`; **hover** `bg-elev-2 text-text`. Destructive icon hover → `bg-bad-soft text-bad`.
- **Gated (Business):** rendered as disabled + **lock icon** + tooltip "Available in Business Edition". Never hide — always show as locked (upsell).
- **Focus (inputs):** `border-accent-line` + `box-shadow: 0 0 0 3px var(--accent-soft)`.
- **Card hover:** `border-line-strong`, `translateY(-2px|-3px)`, `shadow`.
