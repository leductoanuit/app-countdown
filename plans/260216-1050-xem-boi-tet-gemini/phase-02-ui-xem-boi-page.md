# Phase 02: UI - Xem Bói Page

## Context
- Parent plan: [plan.md](./plan.md)
- Depends on: [Phase 01](./phase-01-api-route-gemini.md)
- Existing UI patterns: `app/components/countdown-timer.tsx`, `mai-tree-li-xi-section.tsx`
- Theme: dark bg (#0a0a0a), red primary (#dc2626), gold primary (#fbbf24), Tailwind CSS 4

## Overview
- **Priority:** High
- **Status:** ✅ Complete
- **Description:** Create `/xem-boi` page with fortune form + result display, Tết-themed styling.

## Key Insights
- Existing components use `"use client"` with useState/useEffect
- Tailwind theme vars: `text-tet-red-primary`, `text-tet-gold-primary`, `border-tet-gold-primary/40`
- Animations defined in globals.css: glow, pulse, fadeIn, blessing-reveal
- Pattern: dark cards with border-gold, backdrop-blur

## Requirements
### Functional
- Form: name input + date input (day/month/year)
- Submit button with loading state
- Result: 4 category cards with star ratings + descriptions
- Back to home link
- Works on mobile (responsive)

### Non-functional
- Match existing Tết theme exactly
- Loading animation while waiting for API
- Error display for failed requests
- Smooth transitions between form → loading → result states

## Architecture
```
/xem-boi/page.tsx (server component, metadata)
  └── FortuneForm (client component)
        ├── Form state (name, birthDate)
        ├── Loading state → spinning animation
        └── Result state → FortuneResult
              └── 4 category cards with ratings
```

## Related Code Files
- **Create:** `app/xem-boi/page.tsx` — page with metadata
- **Create:** `app/components/fortune-form.tsx` — form + state management + fetch
- **Create:** `app/components/fortune-result.tsx` — result cards display

## Implementation Steps

1. Create `app/components/fortune-result.tsx`:
   - Props: `{ categories: { name, icon, rating, description }[] }`
   - Grid layout: 2 cols on desktop, 1 col on mobile
   - Each card: dark bg, gold border, icon + name header, star rating (★☆), description
   - fadeIn animation on mount
   - "Xem lại" button to reset

2. Create `app/components/fortune-form.tsx` ("use client"):
   - States: `name`, `birthDate`, `loading`, `result`, `error`
   - Form with:
     - Text input for name (placeholder: "Nhập tên của bạn")
     - Date input (type="date") for birthdate
     - Submit button: "Xem Bói" → "Đang xem..." when loading
   - On submit: POST to `/api/xem-boi`, handle response
   - Three views: form (default) → loading → result
   - Loading: spinning/pulsing animation with fortune-themed text
   - Error: red text with retry option
   - Styling: match Tết theme (gold borders, red accents, dark cards)

3. Create `app/xem-boi/page.tsx`:
   - Export metadata: title "Xem Bói Tết 2026", description
   - Import FallingParticles for background
   - Import FortuneForm
   - Layout: centered, max-w-2xl, with heading + form
   - Heading: "Xem Bói Năm Mới" with glow animation
   - Subheading: "Nhập tên và ngày sinh để xem vận mệnh năm Bính Ngọ 2026"
   - Link back to home "← Về trang chủ"

## Todo
- [ ] Create fortune-result.tsx component
- [ ] Create fortune-form.tsx component
- [ ] Create /xem-boi/page.tsx
- [ ] Test full flow: form → loading → result
- [ ] Test mobile responsive
- [ ] Test error states

## Success Criteria
- Full flow works: enter name + date → submit → see results
- 4 category cards display with star ratings
- Loading state shows while waiting
- Error handling works gracefully
- Mobile responsive
- Matches Tết theme

## Risk Assessment
- Date input UX varies by browser → use type="date" with fallback formatting
- Long API response time → show engaging loading animation

## Next Steps
→ Phase 03: Navigation + Polish
