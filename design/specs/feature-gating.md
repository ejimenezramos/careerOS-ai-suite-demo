# Feature Gating Spec — Public / Private / Business

Edition is global app state (`EditionProvider`, default **private**). It controls
which AI features are usable and whether dummy vs. real data is shown. **Gated
features are never hidden** — always render them as locked (lock icon + tooltip
"Available in Business Edition" + upsell), so lower tiers see what they'd get.

## Editions
| Edition | Data | AI depth | Demo banner | Intended user |
|---|---|---|---|---|
| **Public** | Dummy sample data (Stripe, Figma, Vercel…) | Limited | **Yes** ("Demo Mode ON" + "Switch to Private") | Recruiters / first-run demo |
| **Private** | The user's real data | Limited (basic comparator + analysis view) | No | Default individual user |
| **Business** | Real data | **Full** — agents, AI CV tools, advanced insights | No | Paid / internal SaaS tier |

## Feature matrix
```ts
// lib/gating.ts
export type Edition = "public" | "private" | "business";
export type Feature =
  | "aiComparatorBasic"     // paste + score + skill map
  | "aiAdvancedInsights"    // comparator "Advanced insights" card
  | "aiAgents"              // AI Agents screen + Run full analysis
  | "cvImproveAI"           // CV Manager "Improve with AI"
  | "cvTranslateAI"         // CV Manager "Translate CV"
  | "analysisView"          // AI Analysis report
  | "editData";             // create/edit offers, CVs, settings

export const EDITION_MATRIX: Record<Feature, Edition[]> = {
  aiComparatorBasic:  ["public", "private", "business"],
  analysisView:       ["public", "private", "business"],
  editData:           ["private", "business"], // public = read-only dummy
  aiAdvancedInsights: ["business"],
  aiAgents:           ["business"],
  cvImproveAI:        ["business"],
  cvTranslateAI:      ["business"],
};

export const can = (edition: Edition, f: Feature) =>
  EDITION_MATRIX[f].includes(edition);
```

## Where gating shows in the UI
| Location | Gated feature | Locked treatment |
|---|---|---|
| Sidebar → **AI Agents** | `aiAgents` | Lock icon on nav item (edition ≠ business) |
| AI Agents screen | `aiAgents` | "Business Edition" badge in header; **Run full analysis** disabled; agent cards dimmed to `opacity:.55`; upsell strip |
| CV Manager → **Improve with AI / Translate CV** | `cvImproveAI` / `cvTranslateAI` | Buttons disabled + lock icon + `cursor:not-allowed` + dim styling; Business upsell strip below grid |
| Comparator → **Advanced insights** | `aiAdvancedInsights` | Card shows "Business Edition" badge + blurred faux-copy + skeleton bars |
| Demo banner | (public only) | Shown under topbar with "Switch to Private Mode" |
| Offers/CVs/Settings editing | `editData` | In public/demo, treat as read-only sample (optional for MVP) |

## `<GatedFeature>` wrapper
```tsx
// components/GatedFeature.tsx
function GatedFeature({ feature, children }: { feature: Feature; children: ReactNode }) {
  const { edition } = useEdition();
  const allowed = can(edition, feature);
  if (allowed) return <>{children}</>;
  return (
    <Tooltip content="Available in Business Edition">
      <div aria-disabled className="pointer-events-none opacity-55 relative">
        {children}
        <LockIcon className="absolute right-2 top-2 text-dim" />
      </div>
    </Tooltip>
  );
}
```

Switching edition is instant (Settings → Edition cards, or the demo banner's
"Switch to Private"). No reload; the whole UI reacts to `useEdition()`.
