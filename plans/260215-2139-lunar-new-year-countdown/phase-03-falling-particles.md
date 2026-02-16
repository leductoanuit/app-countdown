# Phase 3: Build Falling Particles Component

## Context Links
- Related: `app/components/falling-particles.tsx` (new file)
- Depends on: Phase 1 (CSS keyframes: fall, float)
- Plan: `plan.md`

## Overview
**Priority:** P2
**Status:** Pending
**Effort:** 1h
**Description:** Create animated falling mai flowers/cherry blossoms using CSS-only animations for festive Tết atmosphere

## Key Insights
- CSS transforms more performant than position animations (GPU-accelerated)
- Limit particle count to 15-20 for 60fps performance
- Random positioning via inline styles (left, animation-delay, animation-duration)
- Use Unicode flower symbols: 🌸 (cherry blossom), or CSS pseudo-elements
- Client component needed for random generation (or static with varied delays)
- Particles should not block interaction (pointer-events: none)

## Requirements

### Functional
- 15-20 particles falling from top to bottom
- Random horizontal positions (0-100vw)
- Staggered animation delays (0-5s)
- Varied animation durations (8-15s for natural feel)
- Infinite loop
- Mai flower/cherry blossom appearance (🌸 or styled divs)

### Non-Functional
- Performance: 60fps on mobile devices
- Non-interactive: pointer-events: none (don't block clicks)
- Accessibility: aria-hidden="true" (decorative only)
- Under 200 lines
- No layout shift (absolute positioning)

## Architecture

### Component Structure
```
FallingParticles (client component)
├── Generate array of particle configs (position, delay, duration)
├── Map to div elements with inline styles
└── Apply fall animation from globals.css
```

### Particle Configuration
```typescript
interface Particle {
  id: number;
  left: string;        // "10%", "45%", etc.
  animationDelay: string;  // "0s", "2s", "4s"
  animationDuration: string; // "10s", "12s", "14s"
  size: number;        // 1.5rem, 2rem (varied sizes)
}
```

### CSS Animation Strategy
- Use `fall` keyframe from globals.css
- Apply transform: translateY() + rotate() for natural motion
- Fade opacity near bottom (already in keyframe)
- Fixed position overlay (z-index above background, below content)

## Related Code Files

### To Create
- `/Users/cps/hpny/app/components/falling-particles.tsx` — particle animation component

### To Modify
None (globals.css already has fall keyframe from Phase 1)

### To Delete
None

## Implementation Steps

### Step 1: Create component file
```bash
# File: app/components/falling-particles.tsx
```

### Step 2: Define component skeleton
```typescript
"use client";

import { useMemo } from "react";

interface Particle {
  id: number;
  left: string;
  animationDelay: string;
  animationDuration: string;
  size: number;
}

export default function FallingParticles() {
  const particles = useMemo<Particle[]>(() => {
    // Generate 18 particles with random configs
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${8 + Math.random() * 7}s`, // 8-15s
      size: 1.5 + Math.random() * 1, // 1.5-2.5rem
    }));
  }, []); // Empty deps: generate once on mount

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-tet-red-secondary opacity-70"
          style={{
            left: particle.left,
            top: '-5%', // Start above viewport
            fontSize: `${particle.size}rem`,
            animation: `fall ${particle.animationDuration} linear ${particle.animationDelay} infinite`,
          }}
        >
          🌸
        </div>
      ))}
    </div>
  );
}
```

### Step 3: Optimize performance
1. Use `useMemo` to generate particles once (prevent re-renders)
2. Set `pointer-events: none` on container (allow clicks through)
3. Limit count to 18 particles (balance visual/performance)
4. Use `will-change: transform` if jank observed (test first)

### Step 4: Enhance visual variety
**Option A: Simple emoji approach** (recommended for KISS)
- Use 🌸 cherry blossom emoji
- Vary size via inline style fontSize

**Option B: Multiple flower types**
```typescript
const flowers = ['🌸', '🏵️', '🌺'];
const randomFlower = flowers[Math.floor(Math.random() * flowers.length)];
```

**Option C: Custom styled divs**
```css
/* In globals.css if using styled divs */
.particle-flower {
  width: 8px;
  height: 8px;
  background: radial-gradient(circle, var(--tet-red-primary), var(--tet-red-secondary));
  border-radius: 50%;
}
```

### Step 5: Z-index layering
Ensure correct stacking order:
- Particles: `z-0` (background layer)
- Countdown content: `z-10` (foreground layer)

### Step 6: Testing
1. Run `pnpm dev`
2. Verify 18 particles fall continuously
3. Check performance (Chrome DevTools → Performance tab)
4. Ensure no pointer blocking (can click through particles)
5. Test mobile responsiveness (particles scale with viewport)
6. Verify animations smooth (no stuttering)

## Todo List
- [ ] Create `app/components/falling-particles.tsx`
- [ ] Add `"use client"` directive
- [ ] Import `useMemo` from React
- [ ] Define Particle interface
- [ ] Create useMemo hook to generate 18 particles
- [ ] Randomize left position (0-100%)
- [ ] Randomize animation delay (0-5s)
- [ ] Randomize animation duration (8-15s)
- [ ] Randomize size (1.5-2.5rem)
- [ ] Create container div (fixed, inset-0, pointer-events-none)
- [ ] Map particles to div elements
- [ ] Apply inline styles (left, top, fontSize, animation)
- [ ] Use 🌸 emoji or custom flower element
- [ ] Set aria-hidden="true" for accessibility
- [ ] Set z-index to 0 (background layer)
- [ ] Test fall animation renders correctly
- [ ] Verify particles don't block clicks
- [ ] Check performance (60fps target)
- [ ] Test mobile responsiveness
- [ ] Verify TypeScript compiles without errors

## Success Criteria
- [ ] 18 particles visible on screen
- [ ] Continuous falling animation (infinite loop)
- [ ] Particles start above viewport, disappear below
- [ ] Random horizontal distribution across screen
- [ ] Staggered timing (natural appearance)
- [ ] Smooth 60fps animation on mobile
- [ ] Clicks pass through particles (pointer-events: none)
- [ ] No layout shift or scrollbar appearance
- [ ] Component under 200 lines
- [ ] TypeScript compiles successfully
- [ ] No console warnings

## Risk Assessment
**Low-Medium Risk**

**Performance risks:**
- Too many particles → reduce count to 15 if jank observed
- Heavy DOM manipulation → useMemo prevents re-generation
- Animation jank on low-end devices → test on throttled CPU (Chrome DevTools)

**Visual risks:**
- Particles too distracting → reduce opacity or count
- Emoji rendering differences across platforms → acceptable variance
- Z-index conflicts → ensure countdown content has higher z-index

**Mitigation:**
- Start with 18 particles, reduce if performance issues
- Use CSS transforms (GPU-accelerated)
- Test on real mobile devices (iPhone SE, Android mid-range)
- Add `will-change: transform` only if needed (can harm performance if overused)

## Security Considerations
None (static decorative component, no user input)

## Next Steps
After completion, proceed to **Phase 4: Compose Main Page**
- Import both CountdownTimer and FallingParticles
- Layer particles behind countdown (z-index)
- Add page layout structure
- Final integration testing
