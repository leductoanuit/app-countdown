# Phase 03: Navigation + Polish

## Context
- Parent plan: [plan.md](./plan.md)
- Depends on: [Phase 01](./phase-01-api-route-gemini.md), [Phase 02](./phase-02-ui-xem-boi-page.md)

## Overview
- **Priority:** Medium
- **Status:** ✅ Complete
- **Description:** Add navigation link from home page to /xem-boi, final polish and testing.

## Implementation Steps

1. Modify `app/page.tsx`:
   - Add navigation link/button to `/xem-boi` below the lì xì section
   - Style as Tết-themed CTA: gold text, red accent, glow effect
   - Text: "🔮 Xem Bói Năm Mới" or similar

2. Add CSS animations if needed in `globals.css`:
   - Loading spinner animation for fortune form
   - Any additional transitions for result cards

3. Run `pnpm build` to verify no build errors

4. Final testing:
   - Home → click xem bói link → /xem-boi page
   - Fill form → submit → see results
   - Back to home navigation
   - Mobile responsive check
   - Error handling (empty fields, API failure)

## Todo
- [ ] Add nav link on home page
- [ ] Add any needed CSS animations
- [ ] Build check
- [ ] Full flow testing

## Success Criteria
- Seamless navigation between home and /xem-boi
- No build errors
- All flows work end-to-end

## Next Steps
→ Code review + deploy
