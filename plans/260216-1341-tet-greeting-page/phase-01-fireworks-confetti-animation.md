# Phase 01: Fireworks/Confetti Animation Component

## Context Links
- Current animations: `app/globals.css` (glow, pulse, fadeIn, fall keyframes)
- Existing particle component: `app/components/falling-particles.tsx`

## Overview
- **Priority:** High
- **Status:** Complete
- Create reusable canvas-based fireworks + CSS confetti animation for greeting page

## Key Insights
- `FallingParticles` already uses similar pattern — can reference for structure
- Canvas fireworks more performant than DOM-based for many particles
- CSS confetti for simple colored pieces falling — lightweight alternative
- Must be client component (`"use client"`)

## Requirements

### Functional
- Fireworks burst effect on page load, repeat periodically
- Confetti particles falling continuously
- Colors: red (#dc2626), gold (#fbbf24), orange, yellow — Tet palette
- Auto-cleanup on unmount (cancel animation frames)

### Non-Functional
- No new npm dependencies
- Performant on mobile (limit particle count, use requestAnimationFrame)
- Responsive canvas sizing

## Architecture
- Single `"use client"` component: `fireworks-confetti.tsx`
- Canvas element for fireworks, absolute positioned behind content
- Use `requestAnimationFrame` loop, cleanup on unmount
- Particle class with position, velocity, color, life properties

## Related Code Files
- **Create:** `app/components/fireworks-confetti.tsx`
- **Reference:** `app/components/falling-particles.tsx` (pattern)
- **Modify:** `app/globals.css` (add confetti keyframes if CSS approach)

## Implementation Steps
1. Create `app/components/fireworks-confetti.tsx`
2. Implement canvas setup with `useRef` + `useEffect`
3. Create `Particle` class: x, y, vx, vy, color, alpha, size
4. Create `Firework` class: launch from bottom, explode at peak into particles
5. Animation loop: spawn fireworks at random intervals (every 1-3s)
6. Draw confetti pieces (small rectangles/circles) falling from top
7. Handle canvas resize on window resize
8. Cleanup: cancel animationFrame on unmount
9. Keep particle count under 200 for mobile perf

## Todo List
- [ ] Create fireworks-confetti.tsx component
- [ ] Implement firework launch + explosion logic
- [ ] Implement confetti fall logic
- [ ] Add Tet color palette to particles
- [ ] Test on mobile viewport
- [ ] Verify cleanup on unmount

## Success Criteria
- Fireworks burst visually on load
- Confetti falls continuously
- No memory leaks (proper cleanup)
- Smooth 60fps on desktop, acceptable on mobile
- File under 200 lines

## Risk Assessment
- **Canvas perf on low-end mobile:** Mitigate by reducing particle count, skip frames
- **Hydration mismatch:** Use mounted state guard like countdown-timer does

## Next Steps
- Phase 02 uses this component inside greeting page
