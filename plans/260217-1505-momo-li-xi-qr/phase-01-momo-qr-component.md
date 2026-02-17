# Phase 01: Create MoMo QR Component

## Context Links
- [plan.md](./plan.md)
- Target integration files: `app/components/mai-tree-li-xi-section.tsx`, `app/components/fortune-result.tsx`
- QR source: `public/z7541927456720_3482c38d597a5f91305936027d4d00f4.jpg`
- Theme: `app/globals.css`

## Overview
- **Priority:** P2
- **Status:** complete
- **Description:** Create reusable `MomoQrLiXi` component + rename QR image asset

## Key Insights
- Component appears after user completes a positive action (picking li xi, viewing fortune) - timing matters for UX
- Must feel optional/fun, not transactional - Vietnamese culture values subtlety in money requests
- Delay animation so main content is absorbed first (1.5-2s delay)
- Both integration points share identical QR display, only context differs

## Requirements

### Functional
- Display MoMo QR image with friendly Vietnamese invitation text
- Fade-in animation with delay (1.5s+)
- Responsive: stack vertically on mobile, reasonable max-width
- Optional `className` prop for integration-specific spacing

### Non-functional
- Use Next.js `Image` for optimization
- Match Tet theme (red/gold palette, glow effects)
- Component under 60 lines
- No new dependencies

## Architecture

```tsx
// app/components/momo-qr-li-xi.tsx
interface MomoQrLiXiProps {
  className?: string;
}
```

Single presentational component. No state, no side effects. Pure render with:
- Tet-themed container with gold border + subtle glow
- QR image via `next/image`
- Friendly heading + subtext
- CSS animation: fadeIn with 1.5s delay using `animation-delay` + `both` fill mode

### Visual Structure
```
┌─────────────────────────────────┐
│  🧧 Li xi cho chu nha nhe!     │  <- heading, gold text
│                                 │
│        ┌─────────────┐          │
│        │  QR IMAGE   │          │  <- momo-qr-li-xi.jpg
│        │  (200x200)  │          │
│        └─────────────┘          │
│                                 │
│  Quet ma de gui li xi ~         │  <- subtext, muted gold
│  LE DUC TOAN - MoMo/VietQR     │  <- account name, small
└─────────────────────────────────┘
    border: tet-gold-primary/30
    bg: black/30 backdrop-blur
```

## Related Code Files

### Create
- `app/components/momo-qr-li-xi.tsx` — new reusable component

### Modify
- None in this phase

### Rename
- `public/z7541927456720_3482c38d597a5f91305936027d4d00f4.jpg` -> `public/momo-qr-li-xi.jpg`

## Implementation Steps

1. **Rename QR image**
   ```bash
   mv public/z7541927456720_3482c38d597a5f91305936027d4d00f4.jpg public/momo-qr-li-xi.jpg
   ```

2. **Create `app/components/momo-qr-li-xi.tsx`**
   - `"use client"` directive (uses className prop, may be conditionally rendered)
   - Import `Image` from `next/image`
   - Props: `{ className?: string }`
   - Container: `rounded-xl border-2 border-tet-gold-primary/30 bg-black/30 backdrop-blur-sm p-6 text-center max-w-xs mx-auto`
   - Animation: inline style `{ animation: "fadeIn 0.8s ease-out 1.5s both" }`
   - Heading: `text-lg font-bold text-tet-gold-primary` with text "Li xi cho chu nha nhe! 🧧"
   - QR Image: `<Image src="/momo-qr-li-xi.jpg" alt="MoMo QR" width={200} height={200} className="rounded-lg mx-auto my-3" />`
   - Subtext line 1: `text-sm text-tet-gold-secondary/70` "Quet ma de gui li xi ~"
   - Subtext line 2: `text-xs text-tet-gold-secondary/50 mt-1` "LE DUC TOAN - MoMo / VietQR"

3. **Verify compilation**
   ```bash
   npx next build --no-lint 2>&1 | tail -5
   # or: npx tsc --noEmit
   ```

## Todo List
- [ ] Rename QR image to `momo-qr-li-xi.jpg`
- [ ] Create `momo-qr-li-xi.tsx` component
- [ ] Verify no compile errors
- [ ] Visual check in dev server

## Success Criteria
- Component renders QR with Tet styling
- Fade-in animation with 1.5s delay works
- Image loads correctly from `/momo-qr-li-xi.jpg`
- No TypeScript errors
- Under 60 lines of code

## Risk Assessment
- **Low:** QR image quality/size — mitigated by Next.js Image optimization
- **Low:** Animation conflict with parent animations — using separate delay avoids overlap

## Next Steps
- Phase 02: Integrate into both target components
