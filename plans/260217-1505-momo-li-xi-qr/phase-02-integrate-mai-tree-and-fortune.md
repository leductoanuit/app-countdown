# Phase 02: Integrate into Mai Tree & Fortune Result

## Context Links
- [plan.md](./plan.md)
- [Phase 01](./phase-01-momo-qr-component.md)
- `app/components/mai-tree-li-xi-section.tsx` (lines 117-131)
- `app/components/fortune-result.tsx` (lines 56-65)

## Overview
- **Priority:** P2
- **Status:** complete
- **Description:** Add `MomoQrLiXi` component at two integration points

## Key Insights
- Mai tree section: QR appears only after user picks a blessing (`pickedId !== null`) — place below blessing text
- Fortune result: QR always visible since component only renders after fortune is calculated — place below reset button
- Both need `mt-6` or `mt-8` spacing to separate from preceding content

## Requirements

### Functional
- Mai tree: QR visible only after li xi is picked
- Fortune: QR visible whenever fortune results are shown
- Both: consistent appearance, same component

### Non-functional
- Minimal code changes (1 import + 1 JSX line per file)
- No prop changes to existing component interfaces

## Architecture

### Mai Tree Integration (lines 117-130)
```tsx
{pickedId !== null && (
  <div className="mt-8" style={{ animation: "blessing-reveal 0.8s ease-out 0.5s both" }}>
    <p ...>✨ {shuffledBlessings[pickedId]} ✨</p>
    <MomoQrLiXi className="mt-6" />   {/* <-- ADD HERE */}
  </div>
)}
```

### Fortune Result Integration (lines 56-64)
```tsx
{/* Reset button */}
<div className="text-center">
  <button ...>Xem lai cho nguoi khac</button>
</div>
<MomoQrLiXi className="mt-6" />   {/* <-- ADD HERE */}
```

## Related Code Files

### Modify
- `app/components/mai-tree-li-xi-section.tsx` — add import + JSX
- `app/components/fortune-result.tsx` — add import + JSX

## Implementation Steps

1. **Update `mai-tree-li-xi-section.tsx`**
   - Add import: `import MomoQrLiXi from "./momo-qr-li-xi";`
   - Inside the `pickedId !== null` block, after the `<p>` blessing text, add:
     ```tsx
     <MomoQrLiXi className="mt-6" />
     ```

2. **Update `fortune-result.tsx`**
   - Add import: `import MomoQrLiXi from "./momo-qr-li-xi";`
   - After the reset button `<div>`, before closing `</div>` of root, add:
     ```tsx
     <MomoQrLiXi className="mt-6" />
     ```

3. **Verify compilation**
   ```bash
   npx next build --no-lint 2>&1 | tail -5
   ```

4. **Manual test both flows**
   - Pick a li xi on mai tree -> blessing + QR appear
   - Complete fortune reading -> results + QR appear
   - Verify QR has delayed fade-in after main content

## Todo List
- [ ] Add MomoQrLiXi to mai-tree-li-xi-section.tsx
- [ ] Add MomoQrLiXi to fortune-result.tsx
- [ ] Verify compilation
- [ ] Manual test mai tree flow
- [ ] Manual test fortune flow
- [ ] Verify mobile responsiveness

## Success Criteria
- QR appears at both integration points with correct timing
- No layout shifts or overflow issues
- Mobile: QR fits within viewport, no horizontal scroll
- Delayed fade-in works in both contexts (QR appears ~1.5s after parent content)
- No TypeScript/build errors

## Risk Assessment
- **Low:** Fortune result component is not a client component (no `"use client"`) — `MomoQrLiXi` is a client component, so it can be imported into a server component as a leaf. If issues arise, add `"use client"` to fortune-result.tsx
- **Low:** Animation stacking — the 1.5s delay on QR is independent of parent animations

## Next Steps
- Code review
- Test on mobile devices
- Done — feature complete
