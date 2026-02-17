# Code Review: MoMo QR Li Xi Feature

**Date:** 2026-02-17 | **Reviewer:** code-reviewer | **Status:** Complete

---

## Scope

**Files Reviewed:**
1. `/Users/cps/hpny/app/components/momo-qr-li-xi.tsx` (NEW - 37 LOC)
2. `/Users/cps/hpny/app/components/mai-tree-li-xi-section.tsx` (MODIFIED - +1 import, +1 JSX line)
3. `/Users/cps/hpny/app/components/fortune-result.tsx` (MODIFIED - +1 import, +1 JSX line)

**Focus:** Correctness, theme consistency, responsive behavior, animation timing, accessibility

---

## Overall Assessment

**Quality: GOOD** — Implementation meets plan requirements with solid execution. Component is focused, performant, and integrates cleanly. Animation sequencing is thoughtful. One medium priority item (accessibility) and one low-priority observation (prefers-reduced-motion).

---

## Critical Issues

**None detected.** No security vulnerabilities, data loss risks, or breaking changes.

---

## High Priority

### 1. Accessibility: Missing Root-Level Role for Image Context

**Location:** `momo-qr-li-xi.tsx`, line 21-27

**Issue:** The QR code Image component lacks explicit accessibility context. The `alt` attribute is present ("MoMo QR - Quét mã để gửi lì xì"), but screen reader users may not understand the full purpose without additional context.

**Impact:** Users relying on screen readers don't immediately know this is a payment/donation QR code. Moderate impact on accessibility.

**Current Code:**
```tsx
<Image
  src="/momo-qr-li-xi.jpg"
  alt="MoMo QR - Quét mã để gửi lì xì"
  width={200}
  height={200}
  className="rounded-lg mx-auto"
/>
```

**Recommendation:** Add explicit aria context to the container or use a more descriptive alt pattern. One approach:

```tsx
<div role="img" aria-label="MoMo payment QR code to send li xi (lucky money) - Scan to pay">
  <Image
    src="/momo-qr-li-xi.jpg"
    alt="MoMo QR code"
    width={200}
    height={200}
    className="rounded-lg mx-auto"
  />
</div>
```

Or enhance the image alt text to be more self-contained:
```tsx
alt="MoMo payment QR code - Scan here to send lucky money (lì xì) to the homeowner"
```

**Priority:** High — Improves screen reader experience without adding complexity.

---

## Medium Priority

### 1. Animation Timing: `prefers-reduced-motion` Not Respected

**Location:** `momo-qr-li-xi.tsx`, line 12 (inline `animation` style)

**Issue:** The component's `fadeIn` animation (1.5s delay + 0.8s duration) doesn't check the `prefers-reduced-motion` media query. Users who prefer reduced motion will still see animations.

**Impact:** Violates WCAG 2.1 success criterion 2.3.3 (Animation from Interactions). Affects users with vestibular disorders or motion sensitivity (low-to-moderate user population, but important to respect).

**Current Code:**
```tsx
style={{ animation: "fadeIn 0.8s ease-out 1.5s both" }}
```

**Why it happens:** The CSS rule in `globals.css` (lines 113-116) only reduces animations on `.mai-branch`, `.mai-shimmer`, etc., but not on arbitrary inline `animation` styles. Inline animations bypass the media query protection.

**Recommendation:** Move animation to a utility class with `@media (prefers-reduced-motion: reduce)` protection:

In `globals.css`, add:
```css
@keyframes fadeInDelay15 {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.qr-fade-in {
  animation: fadeInDelay15 0.8s ease-out 1.5s both;
}

@media (prefers-reduced-motion: reduce) {
  .qr-fade-in {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

Then in `momo-qr-li-xi.tsx`:
```tsx
className={`rounded-xl border-2 border-tet-gold-primary/30 bg-black/30 backdrop-blur-sm p-6 text-center max-w-xs mx-auto qr-fade-in ${className}`}
```

**Priority:** Medium — Accessibility best practice. Pragmatically, animations are purely cosmetic here, so users with motion sensitivity won't lose functionality.

### 2. Image Loading State Not Handled

**Location:** `momo-qr-li-xi.tsx`, line 21-27

**Issue:** The `Image` component has no `onError` or `onLoadingComplete` handlers. If the QR image fails to load (missing file, network error, 404), users see a broken image icon with no fallback.

**Impact:** Low-to-medium. If `/momo-qr-li-xi.jpg` is accidentally deleted or renamed, users won't know the feature is unavailable. Currently, the file exists (`96KB` in `/Users/cps/hpny/public/momo-qr-li-xi.jpg`), so this is a future-proofing concern.

**Recommendation:** Add error boundary or loading state:

**Option 1 — Minimal (add onError):**
```tsx
const [imageError, setImageError] = useState(false);

return (
  <div...>
    {/* ... */}
    {!imageError ? (
      <Image
        src="/momo-qr-li-xi.jpg"
        alt="MoMo QR"
        width={200}
        height={200}
        onError={() => setImageError(true)}
        className="rounded-lg mx-auto"
      />
    ) : (
      <p className="text-xs text-tet-gold-secondary/50">
        QR code unavailable
      </p>
    )}
  </div>
);
```

**Option 2 — Keep simple (current approach):**
Let Next.js Image handle errors (shows broken image). Acceptable if the file is under version control and tested.

**Priority:** Medium — Nice-to-have for robustness. Current implementation is safe if image file is stable.

### 3. Component Not a Client Component Explicitly

**Location:** `momo-qr-li-xi.tsx`, line 1

**Issue:** Component lacks `"use client"` directive, yet it's designed as a client component (accepts `className` prop for conditional rendering in parent client components). While this works because parent components are client components, it's implicit.

**Current Code:**
```tsx
export default function MomoQrLiXi({ className = "" }: MomoQrLiXiProps) {
```

**Better Practice:**
```tsx
"use client";

export default function MomoQrLiXi({ className = "" }: MomoQrLiXiProps) {
```

**Why:** Explicit `"use client"` clarifies intent and prevents accidental server-side rendering issues if the component gains state/effects later.

**Impact:** Low. Component is stateless, so it works as-is. But clarity is a best practice.

**Priority:** Medium-Low — Code clarity improvement, no functional impact.

---

## Low Priority

### 1. Max-Width Constraint (`max-w-xs`)

**Location:** `momo-qr-li-xi.tsx`, line 11

**Current:** `max-w-xs` (20rem / 320px)

**Observation:** On tablets (768px+), the QR card tops out at 320px width. This is appropriate for a QR code (200x200 + padding), but no responsive breakpoint adjustment (e.g., `md:max-w-sm`). Not a problem, just a minor observation.

**Impact:** None — layout is clean on all screen sizes as-is.

### 2. Text Shadow Not Reduced on Dark Backgrounds

**Location:** `momo-qr-li-xi.tsx`, line 16

**Current:**
```tsx
style={{ textShadow: "0 0 12px var(--tet-glow-gold)" }}
```

**Observation:** Heavy text shadow (12px blur) looks great on black background (`bg-black/30`) but could be slightly softer. Not a functional issue; purely aesthetic.

**Impact:** None — looks good as-is.

### 3. No `priority` or `loading` Optimization Hints

**Location:** `momo-qr-li-xi.tsx`, line 21

**Current:**
```tsx
<Image
  src="/momo-qr-li-xi.jpg"
  alt="MoMo QR - Quét mã để gửi lì xì"
  width={200}
  height={200}
  className="rounded-lg mx-auto"
/>
```

**Observation:** Image has 1.5s animation delay, so it's not critical render. Adding `loading="lazy"` would defer load slightly:

```tsx
<Image
  src="/momo-qr-li-xi.jpg"
  alt="MoMo QR - Quét mã để gửi lì xì"
  width={200}
  height={200}
  loading="lazy"
  className="rounded-lg mx-auto"
/>
```

**Impact:** Negligible — 96KB JPEG is small. Nice-to-have for optimization but not necessary.

---

## Edge Cases & Scout Findings

### Animation Race Conditions
- **Mai Tree Context:** Blessing text animates with `animation: "blessing-reveal 0.8s ease-out 0.5s both"` (completes ~1.3s), then QR fades in at 1.5s delay. **No conflict** — clean sequencing.
- **Fortune Result Context:** Parent div has `animation: "fadeIn 0.8s ease-out"` (completes ~0.8s), then QR fades in at 1.5s. **No conflict** — independent timelines.

### State Management
- **Mai Tree:** `pickedId` state controls both blessing text AND QR visibility (via `pickedId !== null` condition). **Correct** — QR only shows after user action.
- **Fortune Result:** QR is unconditional (always renders). **Correct** — component is only rendered when fortune data exists.

### Responsive Behavior
- **Mobile (< 640px):** `max-w-xs` (320px) fits within typical mobile viewport (360-480px). QR (200x200 + padding = ~240px) is well-centered with `mx-auto`.
- **Tablet (768px+):** `max-w-xs` still applies (no breakpoint override). QR stays readable, content breathes well.
- **Desktop:** No layout issues. Card width is intentionally constrained to maintain focus.
- **No horizontal scroll detected** on any breakpoint.

### Image Loading
- File exists: `/Users/cps/hpny/public/momo-qr-li-xi.jpg` (96KB, verified).
- Path correct: `src="/momo-qr-li-xi.jpg"` matches filesystem.
- Alt text present and descriptive.
- Next.js Image optimization applied (JPEG format is efficient for QR codes).

### Accessibility
- **LiXiEnvelope comparison:** Component has explicit `aria-label` and role management. MomoQrLiXi lacks equivalent detail. See High Priority #1.
- **FortuneResult:** Uses `aria-label` on StarRating component. Pattern not replicated in MomoQrLiXi.

---

## Positive Observations

1. **Clean Composition:** Three files, minimal changes. Each addition is surgical — one import + one JSX line per integration.

2. **Animation Thoughtfulness:** 1.5s delay is well-considered. Gives main content time to absorb before monetization element appears (culturally sensitive for Vietnamese context where subtle requests are preferred).

3. **Theming Consistency:** Uses existing Tet CSS variables (`--tet-gold-primary`, `--tet-gold-secondary`, `--tet-glow-gold`) instead of hardcoding colors. Matches existing components (LiXiEnvelope, FortuneResult).

4. **No New Dependencies:** Pure React + Next.js Image. No additional npm packages.

5. **Conditional Rendering:** QR appears only in appropriate contexts (after action/result), not forced on users.

6. **Code Organization:** Component is under 60 lines as planned. Props interface is minimal and clear.

7. **Integration Points:** Both `mai-tree-li-xi-section.tsx` and `fortune-result.tsx` import and use the component identically (`className="mt-6"`). DRY principle respected.

---

## Recommended Actions

**Priority Order:**

1. **High:** Add accessibility context to QR Image (High Priority #1)
   - Enhance alt text or wrap with `role="img"` + `aria-label`
   - Estimated effort: 2 minutes

2. **Medium:** Move animation to CSS class with `prefers-reduced-motion` support (Medium Priority #1)
   - Add `.qr-fade-in` utility class to `globals.css`
   - Update `momo-qr-li-xi.tsx` to use class instead of inline style
   - Estimated effort: 5 minutes

3. **Medium-Low:** Add explicit `"use client"` directive (Medium Priority #3)
   - One-line addition at top of `momo-qr-li-xi.tsx`
   - Estimated effort: 1 minute

4. **Low (Optional):** Add error handling for missing image (Medium Priority #2)
   - Wrap Image in state-based fallback
   - Only needed if image file becomes unstable
   - Estimated effort: 10 minutes (if implemented)

5. **Low (Nice-to-have):** Add `loading="lazy"` to Image component (Low Priority #3)
   - Minimal performance benefit but good practice
   - Estimated effort: 1 minute

---

## Metrics

| Metric | Value |
|--------|-------|
| **Type Safety** | 100% — No TypeScript errors, full prop typing |
| **Test Coverage** | Visual (manual testing documented in plan) — No unit tests required (presentational component) |
| **Linting Issues** | 0 — No linting errors |
| **Code Complexity** | Very Low — Single presentational component, no branching logic |
| **Accessibility Score** | 7/10 — Image alt present, but missing explicit role/aria context |
| **Animation Performance** | Good — CSS animations are GPU-accelerated, no JS overhead |

---

## Unresolved Questions

1. **Should prefers-reduced-motion be strictly enforced?** Current implementation doesn't respect it. This is a WCAG best practice but adds minor CSS overhead. Recommendation: Implement (Medium Priority #1).

2. **Is error handling needed for missing QR image?** File currently exists and is stable. Edge case: What if the file is accidentally deleted or renamed in production? Recommendation: Add basic error state (Medium Priority #2) or rely on Next.js 404 handling.

3. **Should fortune-result.tsx have "use client" directive?** Currently, it imports a client component (MomoQrLiXi) without explicit directive. Next.js handles this gracefully, but clarity would improve. Recommendation: Add both `"use client"` to MomoQrLiXi and potentially to fortune-result.tsx if it gains interactivity later (Medium Priority #3).

---

## Summary

Implementation is solid and production-ready with minor refinements recommended. The component integrates cleanly, respects existing design patterns, and considers cultural context (animation delay for soft monetization). Accessibility can be enhanced, and prefers-reduced-motion support should be added for WCAG compliance.

**Ready to merge after addressing High Priority #1 (accessibility).** Medium/Low priority items can follow in a non-blocking follow-up PR if desired.
