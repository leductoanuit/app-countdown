# Phase 03: Integrate Greeting into Countdown Logic + Page Layout

## Context Links
- Main page: `app/page.tsx`
- Countdown: `app/components/countdown-timer.tsx`
- Plan phases: [Phase 01](./phase-01-fireworks-confetti-animation.md), [Phase 02](./phase-02-tet-greeting-component.md)

## Overview
- **Priority:** High
- **Status:** Complete
- Wire greeting page into main page, replacing countdown when time is up

## Key Insights
- Currently `countdown-timer.tsx` handles both states (countdown + celebration) internally
- Better approach: extract time check to a shared hook or lift state to page level
- `page.tsx` conditionally renders either countdown layout OR greeting layout
- Mai tree + xem boi CTA should still show below greeting (or hide — TBD by design preference)

## Requirements

### Functional
- When `Date.now() >= 2026-02-17T00:00:00+07:00`: show greeting page
- When countdown active: show current countdown layout (unchanged)
- Greeting layout: `FireworksConfetti` (bg) + `TetGreetingContent` (fg) + `MaiTreeLiXiSection` + xem boi CTA
- Falling particles replaced by fireworks when greeting active

### Non-Functional
- No hydration mismatch (client-side time check only)
- Smooth transition if user happens to be on page at midnight

## Architecture

### Option chosen: Custom hook + conditional render in page.tsx

```
app/
  hooks/
    use-tet-countdown.ts    # shared hook: returns { timeLeft, isTet }
  components/
    countdown-timer.tsx      # modified: receives timeLeft as prop (countdown only)
    tet-greeting-content.tsx # new: greeting UI
    fireworks-confetti.tsx   # new: animation
  page.tsx                   # modified: uses hook, conditionally renders layout
```

### Data Flow
1. `useTetCountdown()` hook runs interval, returns `{ timeLeft: TimeLeft | null, isTet: boolean, mounted: boolean }`
2. `page.tsx` calls hook, if `!mounted` render nothing, if `isTet` render greeting layout, else render countdown layout
3. `CountdownTimer` becomes a presentational component receiving `timeLeft` prop

## Related Code Files
- **Create:** `app/hooks/use-tet-countdown.ts`
- **Modify:** `app/page.tsx` — conditional layout
- **Modify:** `app/components/countdown-timer.tsx` — remove internal state, accept props
- **Reference:** `app/components/tet-greeting-content.tsx` (Phase 02)
- **Reference:** `app/components/fireworks-confetti.tsx` (Phase 01)

## Implementation Steps

### Step 1: Create `use-tet-countdown` hook
1. Create `app/hooks/use-tet-countdown.ts`
2. Move `TARGET_DATE`, `calculateTimeLeft`, `TimeLeft` interface from countdown-timer
3. Export hook returning `{ timeLeft, isTet, mounted }`
4. `isTet = timeLeft === null`

### Step 2: Refactor `countdown-timer.tsx`
1. Remove internal useState/useEffect for time calculation
2. Accept `timeLeft: TimeLeft` as prop (non-null, only rendered when countdown active)
3. Remove celebration state rendering (moved to greeting component)
4. Keep TIME_UNITS, countdown grid UI

### Step 3: Update `page.tsx`
1. Convert to `"use client"` (needs hook)
2. Import `useTetCountdown`, `TetGreetingContent`, `FireworksConfetti`
3. Conditional render:
   - If `!mounted`: return null (avoid hydration mismatch)
   - If `isTet`: render greeting layout with fireworks bg + greeting content + mai tree + xem boi
   - Else: render current countdown layout (FallingParticles + CountdownTimer + MaiTreeLiXi + xem boi)
4. Pass `timeLeft` to `CountdownTimer`

### Step 4: Add greeting-specific CSS
1. Add firework/confetti keyframes to `globals.css` if needed
2. Test full flow

### Step 5: Test
1. Temporarily change TARGET_DATE to past date, verify greeting shows
2. Change to future date, verify countdown shows
3. Test on mobile viewport
4. Run `pnpm build` to verify no errors

## Todo List
- [ ] Create use-tet-countdown hook
- [ ] Refactor countdown-timer to presentational component
- [ ] Update page.tsx with conditional rendering
- [ ] Add any needed CSS keyframes
- [ ] Manual test: greeting mode (past date)
- [ ] Manual test: countdown mode (future date)
- [ ] Run pnpm lint && pnpm build
- [ ] Restore correct TARGET_DATE before commit

## Success Criteria
- Greeting page shows when current time >= Tet midnight
- Countdown shows when current time < Tet midnight
- No hydration errors
- Build passes
- Mai tree + xem boi sections still accessible in both modes
- Mobile responsive

## Risk Assessment
- **Hydration mismatch:** Mitigated by mounted guard + client-only time check
- **page.tsx becomes "use client":** Acceptable — page is small, no server-side data needs
- **SEO impact of "use client" page:** Minimal — metadata stays in layout.tsx (server component)

## Security Considerations
- No user input, no API calls — pure client-side time check
- No sensitive data involved

## Next Steps
- After implementation: run `pnpm build`, verify deployment
- Update project changelog if maintaining one
