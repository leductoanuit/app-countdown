# Phase 4: Integration and Styling

## Context Links
- [plan.md](./plan.md)
- [Phase 3: Section Component](./phase-03-mai-tree-li-xi-section.md)
- `app/page.tsx` — main page
- `app/globals.css` — global styles + keyframes

## Overview
- **Priority:** Medium (final phase)
- **Status:** Pending
- **Description:** Add MaiTreeLiXiSection to page.tsx below CountdownTimer; add CSS keyframes for wobble + envelope-open animations

## Key Insights
- page.tsx currently has single `<main>` with CountdownTimer only
- Need to restructure layout: countdown section + li xi section, vertically stacked
- Add wobble and envelope-open keyframes to globals.css alongside existing ones
- May need to change min-h-screen to min-h-fit or auto-height for scrollable content

## Requirements

### Functional
- MaiTreeLiXiSection appears below CountdownTimer
- Smooth scroll between sections
- CSS animations: wobble, envelope-open, blessing-reveal

### Non-functional
- No layout breakage on existing CountdownTimer
- Mobile responsive
- Scroll works naturally

## Architecture
```
page.tsx
├── FallingParticles (background, unchanged)
├── main (z-10)
│   ├── CountdownTimer (existing)
│   ├── spacer/divider
│   └── MaiTreeLiXiSection (new)
```

### New CSS Keyframes
```css
@keyframes wobble {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  75% { transform: rotate(5deg); }
}

@keyframes envelope-open {
  0% { transform: rotateX(0deg); }
  100% { transform: rotateX(180deg); }
}

@keyframes blessing-reveal {
  0% { opacity: 0; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1); text-shadow: 0 0 20px var(--tet-glow-gold); }
}
```

## Related Code Files
- **Modify:** `app/page.tsx` — import + add MaiTreeLiXiSection
- **Modify:** `app/globals.css` — add keyframes
- **Reference:** `app/components/mai-tree-li-xi-section.tsx`

## Implementation Steps

### globals.css changes
1. Add `@keyframes wobble` (gentle rotation -5deg to 5deg)
2. Add `@keyframes envelope-open` (flap rotateX 0 to 180deg)
3. Add `@keyframes blessing-reveal` (fade in + scale + glow)

### page.tsx changes
1. Import MaiTreeLiXiSection
2. Change layout from `flex items-center justify-center min-h-screen` to allow vertical scroll
3. Keep min-h-screen on outer div but allow content to grow
4. Add spacing between CountdownTimer and MaiTreeLiXiSection (py-12 or similar)
5. Add MaiTreeLiXiSection after CountdownTimer inside `<main>`

### Final polish
6. Test on mobile viewport (375px)
7. Test on desktop (1440px)
8. Verify envelope positions align reasonably with tree branches
9. Run `npm run build` — no errors
10. Run `npm run lint` — no errors

## Todo List
- [ ] Add wobble keyframe to globals.css
- [ ] Add envelope-open keyframe to globals.css
- [ ] Add blessing-reveal keyframe to globals.css
- [ ] Import MaiTreeLiXiSection in page.tsx
- [ ] Adjust page layout for scrollable two-section design
- [ ] Add section with spacing below CountdownTimer
- [ ] Visual testing mobile + desktop
- [ ] Build + lint pass

## Success Criteria
- Page shows countdown then mai tree li xi section on scroll
- Wobble animation plays on envelope hover
- Envelope open animation smooth
- Blessing text appears with golden glow
- No layout regression on CountdownTimer
- Build + lint pass
- Responsive on 375px - 1440px

## Risk Assessment
- **Layout shift:** Changing from centered single-section to scrollable may affect CountdownTimer centering
  - Mitigation: Use flex-col with items-center; first section gets min-h-screen, second section below
- **Animation jank:** 3D transforms (rotateX) need `perspective` on parent
  - Mitigation: Add `perspective: 800px` on envelope container

## Security Considerations
- None

## Next Steps
- Manual QA testing
- Optional: add subtle sparkle/confetti effect after blessing reveal (future enhancement)
