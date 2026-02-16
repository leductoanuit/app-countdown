# Phase 4: Compose Main Page

## Context Links
- Related: `app/page.tsx` (modify existing)
- Depends on: Phase 2 (CountdownTimer), Phase 3 (FallingParticles)
- Plan: `plan.md`

## Overview
**Priority:** P2
**Status:** Pending
**Effort:** 45min
**Description:** Integrate all components into main page with proper layout, z-index layering, and final polish

## Key Insights
- Replace default create-next-app content entirely
- Server component wrapper (no "use client" needed at page level)
- Z-index stacking: particles (z-0) → countdown (z-10)
- Flexbox centering for countdown content
- Dark background from globals.css already applied
- Minimal code (server component = simple composition)

## Requirements

### Functional
- Import CountdownTimer and FallingParticles components
- Center countdown vertically and horizontally
- Layer particles behind countdown
- Full viewport height layout
- Responsive padding/margins

### Non-Functional
- Clean code (remove all default CNA boilerplate)
- Semantic HTML structure
- Accessibility: proper heading hierarchy
- Under 50 lines (simple composition)
- No unnecessary complexity (YAGNI principle)

## Architecture

### Page Structure
```
page.tsx (server component)
├── FallingParticles (fixed overlay, z-0)
└── main container (flex center)
    └── CountdownTimer (z-10)
```

### Layout Strategy
- Full viewport height: min-h-screen
- Flexbox centering: flex items-center justify-center
- Relative positioning for z-index context
- Padding for mobile safe areas

## Related Code Files

### To Modify
- `/Users/cps/hpny/app/page.tsx` — replace entire content with countdown composition

### To Create
None

### To Delete
None (file modified, not deleted)

## Implementation Steps

### Step 1: Remove default content
1. Open `app/page.tsx`
2. Delete all existing JSX (lines 3-65)
3. Keep only function declaration and export

### Step 2: Import components
```typescript
import CountdownTimer from "./components/countdown-timer";
import FallingParticles from "./components/falling-particles";
```

### Step 3: Write new page component
```typescript
export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background particles layer */}
      <FallingParticles />

      {/* Main content layer */}
      <main className="relative z-10 w-full max-w-6xl">
        <CountdownTimer />
      </main>
    </div>
  );
}
```

### Step 4: Verify structure
- `<div>`: Container with flexbox centering, relative positioning
- `<FallingParticles />`: Renders first (bottom z-index layer)
- `<main>`: Semantic wrapper with z-10 (foreground layer)
- `<CountdownTimer />`: Centered content
- `px-4`: Mobile padding, `max-w-6xl`: Desktop max width

### Step 5: Final polish
1. Remove unused imports (Image from next/image)
2. Ensure no TypeScript errors
3. Verify component paths correct (./components/...)
4. Check semantic HTML (main tag for primary content)

### Step 6: Testing
1. Run `pnpm dev`
2. Open http://localhost:3000
3. Verify countdown centered on screen
4. Verify particles fall behind countdown
5. Test mobile responsive (320px viewport)
6. Test desktop layout (1920px viewport)
7. Check z-index layering (particles don't cover text)
8. Verify no horizontal scroll
9. Test click interaction (can interact with countdown, not blocked by particles)

### Step 7: Cross-browser testing
- Chrome: Verify animations smooth
- Safari: Check emoji rendering, CSS animations
- Firefox: Verify layout and animations
- Mobile Safari (iOS): Test touch interactions
- Chrome Mobile (Android): Test responsiveness

## Todo List
- [ ] Open `app/page.tsx` in editor
- [ ] Remove all default create-next-app content
- [ ] Import CountdownTimer component
- [ ] Import FallingParticles component
- [ ] Create container div (relative, min-h-screen, flex center)
- [ ] Add FallingParticles component (renders first)
- [ ] Add main tag wrapper (z-10)
- [ ] Add CountdownTimer inside main
- [ ] Apply Tailwind classes (px-4, max-w-6xl, overflow-hidden)
- [ ] Remove unused imports (Image, etc.)
- [ ] Verify TypeScript compiles
- [ ] Test dev server runs without errors
- [ ] Verify countdown centered on page
- [ ] Verify particles layer behind countdown
- [ ] Test mobile layout (320px)
- [ ] Test desktop layout (1920px)
- [ ] Check z-index stacking order
- [ ] Verify no horizontal scroll
- [ ] Test in Chrome, Safari, Firefox
- [ ] Test on mobile devices (iOS/Android)

## Success Criteria
- [ ] Page displays countdown centered
- [ ] Particles animate behind countdown (visible but not obstructive)
- [ ] Responsive on mobile (320px) and desktop (1920px)
- [ ] No layout shift or flash of unstyled content
- [ ] Countdown text readable (good contrast with particles)
- [ ] Z-index layering correct (particles behind, countdown in front)
- [ ] No horizontal scrollbar
- [ ] No console errors or warnings
- [ ] TypeScript compiles successfully
- [ ] File under 50 lines (simple composition)
- [ ] Semantic HTML structure (main tag)
- [ ] Clean code (no commented-out boilerplate)

## Risk Assessment
**Low Risk Phase**

**Integration risks:**
- Import path errors → verify "./components/" path correct
- Z-index conflicts → test visually, particles should be background
- Layout overflow → overflow-hidden on container prevents scroll

**Visual risks:**
- Countdown not centered → test flexbox, verify min-h-screen applied
- Particles too visible → adjust opacity in FallingParticles component (not page.tsx)
- Mobile padding issues → px-4 should provide adequate spacing

**Mitigation:**
- Test immediately after changes (hot reload)
- Use browser DevTools to inspect z-index layers
- Test multiple viewport sizes (DevTools responsive mode)
- Verify component imports resolve (TypeScript will catch errors)

## Security Considerations
None (static page composition, no user input or data handling)

## Next Steps
**After completion: Full integration testing**
1. End-to-end testing on real devices
2. Performance profiling (Lighthouse)
3. Accessibility audit (WAVE, axe DevTools)
4. Visual QA across browsers
5. Verify countdown accuracy (compare to system clock)
6. Test celebration state (wait until Feb 17 or temporarily adjust target date)
7. Code review (ensure YAGNI/KISS/DRY principles followed)
8. Prepare for deployment (build test: `pnpm build`)

**Optional enhancements (if time permits):**
- Add favicon with Tết theme
- Add sound effects (optional, requires user interaction)
- Add share buttons (optional)
- Add meta tags for better SEO
- Consider adding background music toggle (optional)

**Final deliverables:**
- Working countdown page
- All components under 200 lines
- TypeScript compiles with no errors
- Responsive design (mobile-first)
- Smooth animations (60fps)
- Accessible markup
- Clean, maintainable code
