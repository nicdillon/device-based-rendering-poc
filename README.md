# Device-Based Rendering with ISR

## The Challenge

Reading `user-agent` headers or cookies to detect device type opts Next.js pages into **dynamic rendering**, breaking static generation (ISR/SSG). The question: how do we conditionally render mobile vs desktop components while preserving ISR?

## Our Solution: CSS-First Device Rendering

Render **both** mobile and desktop variants into a single ISR-cached HTML response. Use render-blocking CSS media queries to hide the wrong variant before first paint (zero flicker). After React hydration, detect the viewport via `matchMedia` and unmount the hidden variant to free resources.

```
Server (ISR) ─► HTML contains both variants
                    │
Browser (pre-paint) ─► CSS media queries hide the wrong one (render-blocking, no flicker)
                    │
Browser (post-hydration) ─► matchMedia detects viewport, unmounts hidden variant
                    │
Result ─► Only the correct component is mounted, with full client API access
```

**Core component**: `DeviceRenderer` accepts `mobile` and `desktop` as `ReactNode` props. Uses `useState(null)` to render both on first pass (matching server HTML), then switches to single-variant after `useEffect`.

## Comparison: CSS-First vs Precomputed Flags (Vercel Flags SDK)

| | CSS-First (this POC) | Precomputed Flags |
|---|---|---|
| **ISR preserved** | Yes | Yes |
| **Static permutations** | None added | Doubled (mobile + desktop per page) |
| **n product sizes example** | n pages | 2n pages |
| **Flicker** | None (CSS is render-blocking) | None (correct variant served) |
| **HTML payload** | Both variants in one response (~2-5 KB extra) | Single variant per response |
| **Post-hydration cleanup** | Hidden variant unmounted | N/A |
| **Server device detection** | Not needed | Required (UA header) |
| **Implementation complexity** | One component (`DeviceRenderer`) | Flags SDK setup + middleware + rewrite rules |
| **Scales with variants** | Linearly (one page, CSS toggles) | Multiplicatively (pages x variants) |

## When to Use Which

**CSS-First** (this approach): Best when mobile and desktop share the same data and differ primarily in layout/interaction. No permutation cost, minimal payload overhead.

**Precomputed Flags**: Better when variants need fundamentally different data fetching or when the mobile/desktop component trees are very large and shipping both is a measurable performance concern.

## Existing Precedent

The nectarsleep codebase already uses this pattern via its `ResponsiveRenderer` component, which renders both variants with MUI `display` props. Our `DeviceRenderer` improves on this by unmounting the hidden variant after hydration, freeing memory and stopping effects/event listeners.
