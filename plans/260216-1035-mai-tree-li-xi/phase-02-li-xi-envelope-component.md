# Phase 2: Li Xi Envelope Component

## Context Links
- [plan.md](./plan.md)
- CSS vars in `app/globals.css`
- Existing animations: glow, pulse, fadeIn

## Overview
- **Priority:** High (blocks phase 3)
- **Status:** Pending
- **Description:** Create single red envelope SVG component with hover wobble + click open animation

## Key Insights
- Li xi envelope: red rectangle with gold border/pattern, flap on top
- Wobble on hover signals interactivity
- Open animation: envelope flap opens or envelope flips to reveal blessing
- Component is reusable — parent controls position + state
- Disabled state for envelopes after one is picked

## Requirements

### Functional
- SVG red envelope with gold accents (border, "Fu" character or dot pattern)
- Top flap that "opens" on click
- Show blessing text after open animation completes
- Props: `id`, `position` ({top, left}), `blessing`, `isOpened`, `isDisabled`, `onPick`
- Hover: wobble animation (only when not disabled/opened)
- Click: open animation + reveal blessing
- Disabled: reduced opacity, no hover/click effects

### Non-functional
- Pure SVG + CSS animations
- Under 200 lines
- Accessible: role="button", aria-label

## Architecture
```
LiXiEnvelope (client component)
Props: { id, position, blessing, isOpened, isDisabled, onPick }
├── Wrapper div (absolute positioned via position prop)
│   ├── SVG envelope body (red rect + gold accents)
│   ├── SVG envelope flap (triangle, animated on open)
│   └── Blessing text overlay (visible after opened)
```

### State Flow
- Default: envelope closed, wobble on hover
- Clicked: triggers onPick(id), parent sets isOpened=true
- Opened: flap rotates open via CSS, blessing fades in
- Disabled (another picked): dim, no interaction

## Related Code Files
- **Create:** `app/components/li-xi-envelope.tsx`
- **Modify:** `app/globals.css` (add wobble + envelope-open keyframes) — done in phase 4

## Implementation Steps
1. Create `app/components/li-xi-envelope.tsx` with "use client"
2. Define Props interface: id (number), position ({top: string, left: string}), blessing (string), isOpened (boolean), isDisabled (boolean), onPick (id: number) => void
3. SVG envelope body: red rounded rect ~60x80
4. Gold border/accent lines on envelope
5. Small gold decorative element center (circle or diamond)
6. Envelope flap: triangle/trapezoid at top, transform-origin bottom
7. Apply CSS classes for states:
   - `.wobble` on hover (when not disabled/opened)
   - `.envelope-opened` when isOpened (flap rotates)
   - `.envelope-disabled` when isDisabled (opacity 0.4, pointer-events none)
8. Blessing text: absolutely positioned over envelope, visible only when isOpened
9. onClick handler: call onPick(id) if not disabled and not opened
10. Add aria-label="Li xi envelope" role="button" tabIndex
11. Run `npm run build` to verify

## Todo List
- [ ] Create li-xi-envelope.tsx
- [ ] SVG envelope body (red + gold accents)
- [ ] Envelope flap with open animation class
- [ ] Hover wobble animation class
- [ ] Disabled state styling
- [ ] Blessing text reveal overlay
- [ ] Accessibility attrs
- [ ] Verify build passes

## Success Criteria
- Envelope renders as recognizable red li xi on dark bg
- Hover triggers wobble (when interactive)
- Click opens flap + reveals blessing text
- Disabled state visually distinct
- Under 200 lines, build passes

## Risk Assessment
- **Animation timing:** CSS transition for flap open needs tuning — use 0.6s ease
- **Text overflow:** Blessing text may be long — use small font, max-width
- **Touch devices:** Hover wobble won't show on mobile — acceptable, click still works

## Security Considerations
- None (presentational + simple click handler)

## Next Steps
- Phase 3: Section component combining tree + envelopes
