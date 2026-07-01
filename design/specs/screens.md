# Screen Specifications — CareerOS AI Suite

Every screen is one route inside a persistent **AppShell** (Sidebar + Topbar).
Views cross-fade with the `viewIn` animation. Reference the live prototype at
`design/references/CareerOS.dc.html` — open it and use the URL params below to
jump to any state.

## URL params (prototype only — for reviewing states)
`CareerOS.dc.html?route=<route>&theme=dark|light&lang=es|en&edition=public|private|business`
Extra: `&mode=add|edit` (offer form), `&view=1` (offer detail), `&delete=1` (delete modal).

Routes: `dashboard · pipeline · candidacies · candidacyForm · detail · offers · offerForm · offerView · cvs · comparator · analysis · agents · settings · login`.

---

## Global chrome

### Sidebar  (`components/layout/Sidebar.tsx`)
- **Width 248px**, `background: var(--bg-inset)`, `border-right: 1px solid var(--border)`, padding `18px 14px`, vertical, item gap 6px.
- **Logo block:** 32px rounded-9px gradient tile (`linear-gradient(140deg, accent, accent-2)`) with a 3-layer stack glyph; wordmark "CareerOS" 14.5px/600 + overline "AI SUITE" 10px/600 uppercase in accent.
- **"Workspace" overline** (10.5px/600 uppercase, `--dim`).
- **Nav items** (icon 17px + label 13.5px + optional badge/lock), order:
  `Dashboard · Pipeline · Candidacies · Offers · CVs · Comparator · AI Analysis · AI Agents · Settings`.
  (Ships with **Candidacies** inserted after Pipeline — see the full nav in specs/screens.md.)
  - Active: `background: var(--accent-soft)`, `border: 1px solid var(--accent-line)`, text `--text`, weight 600.
  - Idle: transparent, text `--muted`; hover `background: var(--bg-elev-2)`, text `--text`.
  - Badges (pill, accent-soft): Pipeline = active candidate count, Offers = active offers, CVs = CV count.
  - **AI Agents** shows a **lock icon** when edition ≠ business.
- **AI Credits card** (bottom): pulsing accent dot + "AI Credits", 6px progress track (68% fill gradient), "340 of 500 analyses left".
- **User row:** 30px gradient avatar "AV" + name/plan; trailing **logout icon button** → opens Login.

### Topbar  (`components/layout/Topbar.tsx`)
- **Height 60px**, `border-bottom: 1px solid var(--border)`, translucent `background: color-mix(in srgb, var(--bg) 78%, transparent)` + `backdrop-filter: blur(12px)`, padding `0 24px`.
- **Search** (max 420px): 38px, rounded-10, `--bg-elev`, search icon + input + `⌘K` mono kbd hint.
- **Language segmented control** ES/EN — 2 pills in a 1px bordered container; active pill = accent fill + accent-ink.
- **Theme toggle** — 38px icon button, sun/moon path swaps by theme.
- **Notifications** — 38px icon button with accent dot.
- **Primary CTA** "New application" — accent fill, plus icon, glow shadow, hover `translateY(-1px)`.

### Demo banner  (`components/DemoBanner.tsx`) — only when `edition === "public"`
Full-width strip under topbar: gradient wash `linear-gradient(90deg, accent-soft, accent-2-soft)`, accent-line bottom border. Pulsing dot + "Demo Mode ON" pill, descriptive text, and a **"Switch to Private Mode"** accent button.

---

## 1. Dashboard  (`pages/Dashboard.tsx`, route `dashboard`)
**Purpose:** at-a-glance pipeline health + latest AI.
**Layout:** page padding `30px 34px 60px`. Header row (H1 "Good afternoon, Alex" + subtitle; right: "Filters" secondary button). Then:
- **KPI grid** — 4 columns, gap 16. Each card (rounded-15, `--bg-elev`, 1px border, padding 18): top row = 34px rounded-9 soft-tinted icon tile + delta pill (`+3` good-soft / `±0` neutral); then 28px/600 value; then 12.5px muted label. Hover: border-strong + `translateY(-2px)` + shadow. KPIs: Active applications, In interview, Offers, Response rate.
- **Two-column row** (1.55fr / 1fr, gap 18):
  - **Pipeline overview** panel (rounded-16): 4 status bars (dot + label + mono count, 8px track with colored fill at % width); footer insight line with trend icon. "View all" → pipeline.
  - **Upcoming reminders** panel: warn count pill; rows of 36px company avatar + title + "company · when" + urgency tag (Today = warn-soft, else mono neutral pill). Row hover fill.
- **Latest AI analyses** — sparkle icon + H2 + "View all"; 4-column grid of AI cards (see components).

## 2. Pipeline  (`pages/Pipeline.tsx`, route `pipeline`)
**Purpose:** Kanban of candidacies; drag to change stage.
**Layout:** header (H1 "Pipeline" + subtitle + "Drag & drop" hint). 4-column grid (gap 16), full height. Columns: **Applied (info) · Interview (warn) · Offer (good) · Rejected (bad)**.
- **Column:** `--bg-inset`, rounded-16, padding `14px 10px 6px`. Header = status dot + label + mono count pill + add button. Scrollable card stack + dashed "Add" button footer.
- **Candidate card** (`draggable`, rounded-13, `--bg-elev`, padding 13, `cursor: grab`): 34px company avatar + company (13.5/600) + role (muted) + **priority dot** (top-right, colored with soft ring); footer = date (clock icon) + match score (sparkle icon in score color). Hover: border-strong + shadow + `translateY(-2px)`. Click → Offer/Candidate detail.
- **Drag & drop:** on dragover the target column switches to `--accent-soft` bg + `--accent-line` border; drop sets the card's status. (HTML5 DnD in prototype; use `@dnd-kit` in React — see motion-spec.)

## 2b. Candidacies (list)  (`pages/Candidacies.tsx`, route `candidacies`)
**Purpose:** all candidacies in a **table/list** view (the tabular counterpart to the Pipeline kanban). A candidacy = *your application* (company, role, pipeline stage, priority, AI match, CV used).
**Layout:** header (H1 "Candidacies" + subtitle + gradient **"New candidacy"**). Success flash (good) after save. Search field + right-aligned "Showing N". **Table** (rounded-16, `--bg-elev`, `grid-template-columns: 1.4fr 1.5fr .8fr .8fr 1.1fr 96px`): Company (avatar + name) · Role · **Status** badge (Applied info / Interview warn / Offer good / Rejected bad, with dot) · **Match** (sparkle icon + score in score-color) · **Priority** (colored dot + label) · Actions (Edit, Delete). Row hover `--bg-elev-2`; clicking a row opens the Candidate Detail (#3); delete animates the row out and opens the confirm modal.

## 2c. Add / Edit Candidacy  (`pages/CandidacyForm.tsx`, route `candidacyForm`, `mode=add|edit`)
**Purpose:** create or edit a candidacy. Distinct from the **Offer** form: this captures *your application state* rather than the job posting.
**Layout (max 820px):** back link → Candidacies; title ("Add candidacy" / "Edit candidacy") + **"Editing" pulsing badge** in edit mode; the card gets the **pulsing violet `editGlow` ring** when editing. Two sections in one card (rounded-16, padding 24):
1. **Candidacy details** — Company* + Job title* (required, red-border validation), Location, Salary, CV used (select of uploaded CVs), AI match (0–100 number input).
2. **Pipeline & priority** — **Pipeline stage** segmented (Applied / Interview / Offer / Rejected, each with its status dot) + **Priority** segmented (High / Medium / Low, colored dot); Notes textarea.
Footer: "Cancel" (secondary) + gradient **"Save candidacy"** (spinner + "Saving…" ~650ms → returns to list with success flash).
**Validation:** company + role required.

## 3. Candidate / Offer Detail  (`pages/CandidateDetail.tsx`, route `detail`)
**Purpose:** full record of one candidacy.
**Layout:** back link; header = 60px avatar + role H1 + status badge + meta row (company, location pin, applied date) + actions ("Edit" secondary, "Run AI analysis" gradient). Then 2-col grid (gap 18) of panels:
- **Offer details** — key/value rows (Salary, Location, Contract, Team, Source) divided by borders.
- **Linked résumé** — "Optimized" good badge; file chip (PDF thumb + name + meta + download icon); wrap of skill tag chips.
- **Notes** — avatar + note text + timestamp list; composer input with accent send button (focus-within accent border).
- **Reminders** — "Add" link; rows with a 38px date tile (day + month, warn-soft if urgent else accent-soft) + title/time + tag.

## 4. Offers  (`pages/Offers.tsx`, route `offers`)
**Purpose:** manage job offers (CRUD table).
**Layout:** header (H1 "Offers" + subtitle + gradient **"New offer"**). Success flash (good) after save. Filter bar: search field + "All statuses" dropdown + right-aligned "Showing N". **Table** (rounded-16, `--bg-elev`): header row (`grid-template-columns: 1.4fr 1.5fr 1fr .9fr .8fr 110px`, inset bg, uppercase overline labels) then data rows:
- Company (avatar + name) · Role · Location · Published (mono date) · Status badge (Active good / Closed dim, with dot) · Actions (View eye, Edit, Delete — icon buttons, hover tinted; delete → bad-soft).
- Row hover `--bg-elev-2`; delete animates row out (`opacity:0; translateX(24px)`).

## 5. Add / Edit Offer  (`pages/OfferForm.tsx`, route `offerForm`, `mode=add|edit`)
**Purpose:** create or edit an offer + capture the full application record.
**Layout (max 820px):** back link; title ("Add offer" / "Edit offer") + when editing an **"Editing" pulsing badge**. The main card, **in edit mode, gets a pulsing violet ring** (`editGlow` animation). Sections, each its own card (rounded-16, padding 24):
1. **Basic information** — Job title* (full width), Company*, Location* (2-col). Circle-plus eyebrow icon.
2. **Details** — Description (textarea), Requirements (textarea), Publish date* + Status segmented (Active/Closed).
3. **Application data** — Offer link (globe-input), Applied on (date), CV used (select of uploaded CVs).
4. **Login credentials** *(Optional badge)* — Username, Password with **Show/Hide** toggle button.
5. **Application form answers (Q&A)** — repeatable rows `question | answer | remove`, "Add question" dashed button. This is the LinkedIn easy-apply / company-portal capture (salary expectations, years with X, availability…). Rows animate in with `rowIn`.
6. **Internal notes** — textarea (recruiter contact, process stages).
Footer: right-aligned "Cancel" (secondary) + "Save offer/changes" (gradient, shows spinner + "Saving…" for ~650ms then returns to list with success flash).
**Validation:** role, company, location, date are required → red border + `--bad-soft` fill + "This field is required" with alert icon.

## 6. Offer / Application Detail (read-only)  (`pages/OfferView.tsx`, route `offerView`, `view=1`)
**Purpose:** glanceable record for when a company calls — "what did I answer?".
**Layout (max 980px):** back link; header = avatar + role + status badge + "company · location · applied on"; actions "Open offer" (external-link, secondary) + "Edit". 2-col grid (1.4fr / 1fr):
- **Key answers** (left, big): the Q&A list as label/value rows (question `--muted` left, answer 600 right). Empty state string if none.
- **Right column:** "Applied with" CV chip; **Credentials** card (username mono + **masked password** = bullets); **Internal notes** card.

## 7. CV Manager  (`pages/CvManager.tsx`, route `cvs`)
**Purpose:** manage up to **4** résumé PDFs.
**Layout (max 920px):** header (H1 "My CVs" + subtitle; right: "CVs used N/4" + gradient **"Upload CV (PDF)"**, disabled/greyed when at limit). 2-col grid of CV cards (rounded-15): PDF thumb + name + meta (`uploaded date · size · N uses`) + **Default** good badge; trailing delete icon. Action row: "Set as default" secondary + **"Improve with AI"** + **"Translate CV"** — the two AI buttons are **gated** (lock icon, `cursor:not-allowed`, dim styling) unless edition = business. An empty **upload slot** (dashed) shows while < 4. Below: **Business upsell strip** when not business.

## 8. AI Comparator  (`pages/Comparator.tsx`, route `comparator`)
**Purpose:** paste a job (text or URL) + pick a CV → instant match (RAG concept).
**Layout:** header (crossing-arrows icon + H1 + subtitle). 2-col grid (gap 18):
- **Input card:** source segmented (Paste URL / Paste text); URL field (globe) or textarea; CV select; **"Analyze match"** gradient button → shows spinner + "Analyzing…" ~1.4s then result.
- **Result column:** score card (108px SVG ring gradient + score + "Strong match" good pill + skill chips); **"Advanced insights"** card that is **gated** (Business badge, blurred faux-copy + skeleton bars) describing CV tips / interview sim / salary benchmarking.

## 9. AI Analysis  (`pages/Analysis.tsx`, route `analysis`)
**Purpose:** deep match report for a candidacy.
**Layout:** header (sparkle + H1 "AI Analysis" + "role · company · analyzed 2h ago"; "Re-analyze" secondary). Grid `300px / 1fr`:
- **Score panel** (left): 170px SVG **gauge** (gradient stroke, animated `stroke-dashoffset`), 44px score, verdict pill, then 4 breakdown bars (Experience/Skills/Seniority/Culture with % + colored track).
- **Right stack:** two explanation cards side-by-side — **"Why it fits"** (good top-border, bullet list) and **"Worth noting"** (warn top-border); **Skill map** card (chips: matched = accent-soft + accent-line + `popIn`; gap = dashed dim border) with a matched/gap legend; **Evidence** card (rows of `CV quote → link node → offer quote` with Strong/Partial strength badge).

## 10. AI Agents  (`pages/Agents.tsx`, route `agents`) — Business only
**Purpose:** multi-agent orchestration for deep analysis.
**Layout:** header (H1 + **"Business Edition" lock badge** when not business + subtitle; **"Run full analysis"** gradient button, gated). "Orchestration flow" overline; 3-col grid of **agent cards**: Job Analyzer (Gemini 1.5 Pro), CV Matcher (Hugging Face · BGE-M3), Insight Orchestrator (Ollama · Llama 3.1). Each: colored bot-icon tile + name + "Model: …" + task line + **status badge** (Idle dim / Processing warn+pulse / Done good). Running staggers idle→active→done per agent (~900ms apart). Non-business = cards dimmed to 0.55 + upsell strip.

## 11. Settings  (`pages/Settings.tsx`, route `settings`)
**Purpose:** account, edition, appearance, notifications.
**Layout (max 760px):** H1 "Settings" + subtitle. Cards:
- **Profile** — 56px gradient avatar + name/email + "Change photo"; Full name + Role inputs.
- **Edition** — 3 selectable **edition cards** (Public demo / Private / Business) with icon, label, sub, and a check when selected (accent-soft bg + accent border). This is the master control for feature gating.
- **Appearance** — Theme segmented (Dark/Light with icons), Language segmented (🇪🇸 Español / 🇬🇧 English), Timezone selector row (GMT+1 · Madrid).
- **Notifications** — toggle rows (Weekly digest, Reminder alerts, AI analysis ready). Toggle = 42×24 track, 18px knob, accent when on, knob overshoot easing.

## 12. Login / Register  (`pages/Login.tsx`, route `login`) — full-screen overlay
**Purpose:** auth entry.
**Layout:** two panels. **Left hero** (flex:1): gradient `150deg accent→accent-2` with translucent circles, logo lockup, 30px/600 headline, supporting copy, two mini-stats. **Right form** (480px): "Welcome back" + subtitle; social buttons (**Continue with Google**, **Continue with LinkedIn** disabled + "Coming soon" pill); "or continue with" divider; Email + Password (with forgot link); gradient **"Sign in"** → enters app (dashboard); footer "No account yet? Create account". Register is the same shell with the toggled copy.

---

## Screens the brief lists that map to the above
- **"Candidacies / Add Candidacy"** — now shipped natively as **#2b Candidacies (list)** and **#2c Add/Edit Candidacy** (routes `candidacies` / `candidacyForm`), plus the **Candidate Detail (#3)** and the Pipeline kanban (#2) as the visual board. Candidacies (your applications) are a distinct entity from Offers (the job postings); they share the same CRUD table + form patterns and tokens.
- **Demo Mode banner** — see Global chrome.
- **Edition gating (Public/Private/Business)** — see `feature-gating.md`.
