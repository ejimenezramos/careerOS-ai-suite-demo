# Responsive Spec — desktop-first

The product is **desktop-first**, designed at ~1440px and validated down to
tablet. Below tablet is out of scope for MVP but the rules below keep it from
breaking.

## Breakpoints (Tailwind defaults)
| Name | Min width | Target |
|---|---|---|
| base | 0 | phone (graceful, not primary) |
| `md` | 768px | tablet portrait |
| `lg` | 1024px | tablet landscape / small laptop |
| `xl` | 1280px | laptop |
| `2xl` | 1536px | desktop (design origin) |

## Shell
- **Sidebar (248px):** fixed on `lg`+. On `md` collapse to a 64px icon-rail
  (labels hidden, badges as dots) OR a `Sheet` drawer toggled from the topbar.
  On base, drawer only.
- **Topbar:** search collapses to an icon button < `md`; language + theme +
  notifications stay; primary CTA becomes icon-only < `md`.
- **Demo banner:** text truncates; keep the pill + action.

## Grids
| Screen | 2xl / xl | lg | md | base |
|---|---|---|---|---|
| Dashboard KPIs | 4 col | 4 col | 2 col | 1 col |
| Dashboard main row (1.55/1) | 2 col | 2 col | 1 col (stack) | 1 col |
| Latest AI cards | 4 col | 3 col | 2 col | 1 col |
| Pipeline board | 4 col | 4 col (h-scroll) | horizontal scroll, 280px cols | horizontal scroll |
| Detail panels (2 col) | 2 col | 2 col | 1 col | 1 col |
| Offers table | full grid | full grid | hide "Location"+"Published", keep actions | card list (stack fields) |
| Offer form | max 820px, 2-col field rows | 2-col | 1 col | 1 col |
| CV cards | 2 col | 2 col | 1 col | 1 col |
| Comparator | 2 col | 1 col (stack input over result) | 1 col | 1 col |
| Analysis | 300 / 1fr | stack score over right column | 1 col | 1 col |
| Agents | 3 col | 3 col | 1 col | 1 col |
| Settings | max 760px | full | full | full |
| Login | hero + 480px form | hero + form | **hide hero**, center form | form only |

## Rules
- Page padding scales: `30px 34px` desktop → `20px` md → `16px` base.
- Cards keep radius/shadow; only columns collapse.
- Kanban: never wrap columns — horizontally scroll the board on narrow widths
  (`overflow-x:auto`, snap optional). Cards stay full-width within a fixed column.
- Tables → on `md`, drop low-priority columns; on base, render each row as a
  stacked card (company header + labeled fields + action row).
- Modals: `max-width: 430px`, side padding 24px; full-width sheet on base.
- Minimum hit target 36–44px everywhere (already met by button sizes).
- Respect `min-w-0` + truncation on all company/role/name text to avoid overflow.
