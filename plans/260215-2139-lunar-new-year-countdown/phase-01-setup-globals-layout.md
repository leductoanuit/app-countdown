# Phase 1: Setup Globals & Layout

## Context Links
- Related: `app/globals.css`, `app/layout.tsx`
- Plan: `plan.md`

## Overview
**Priority:** P2
**Status:** Pending
**Effort:** 45min
**Description:** Configure global styles with Tết color palette, keyframe animations, and update metadata for SEO/sharing

## Key Insights
- Tailwind CSS 4 uses `@theme inline` syntax for custom properties
- Dark background (#0a0a0a) with red (#dc2626, #ef4444) and gold (#fbbf24, #f59e0b) accents
- CSS keyframes needed: glow pulse, fade-in, particle fall
- Metadata impacts social sharing (OG tags crucial)

## Requirements

### Functional
- Red/gold color variables in CSS custom properties
- Keyframe animations: `glow`, `pulse`, `fadeIn`, `fall`, `float`
- Updated metadata: title, description, keywords, OG tags
- Vietnamese locale support (lang="vi" consideration)

### Non-Functional
- Smooth 60fps animations
- Accessible color contrast ratios (WCAG AA minimum)
- Fast page load (minimal CSS bloat)

## Architecture

### globals.css Structure
```
@import tailwindcss
CSS variables (Tết palette)
@theme inline (Tailwind integration)
@keyframes (animations)
body base styles
```

### layout.tsx Updates
- Metadata object with Tết-specific content
- OpenGraph tags for social sharing
- Keep existing Geist fonts
- Consider adding lang="vi" to html tag

## Related Code Files

### To Modify
- `/Users/cps/hpny/app/globals.css` — add color palette + keyframes
- `/Users/cps/hpny/app/layout.tsx` — update metadata object

### To Create
None

### To Delete
None

## Implementation Steps

### Step 1: Update globals.css
1. Add CSS custom properties after existing vars:
   - `--tet-red-primary: #dc2626`
   - `--tet-red-secondary: #ef4444`
   - `--tet-gold-primary: #fbbf24`
   - `--tet-gold-secondary: #f59e0b`
   - `--tet-dark-bg: #0a0a0a`
   - `--tet-glow-red: rgba(220, 38, 38, 0.6)`
   - `--tet-glow-gold: rgba(251, 191, 36, 0.6)`

2. Add to `@theme inline` block:
   - `--color-tet-red-primary: var(--tet-red-primary)`
   - `--color-tet-red-secondary: var(--tet-red-secondary)`
   - `--color-tet-gold-primary: var(--tet-gold-primary)`
   - `--color-tet-gold-secondary: var(--tet-gold-secondary)`

3. Create keyframe animations after body styles:
   ```css
   @keyframes glow {
     0%, 100% { text-shadow: 0 0 10px var(--tet-glow-red), 0 0 20px var(--tet-glow-red); }
     50% { text-shadow: 0 0 20px var(--tet-glow-gold), 0 0 40px var(--tet-glow-gold); }
   }

   @keyframes pulse {
     0%, 100% { transform: scale(1); opacity: 1; }
     50% { transform: scale(1.05); opacity: 0.9; }
   }

   @keyframes fadeIn {
     from { opacity: 0; }
     to { opacity: 1; }
   }

   @keyframes fall {
     from { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
     to { transform: translateY(100vh) rotate(360deg); opacity: 0; }
   }

   @keyframes float {
     0%, 100% { transform: translateY(0px); }
     50% { transform: translateY(-20px); }
   }
   ```

### Step 2: Update layout.tsx metadata
1. Replace metadata object:
   ```typescript
   export const metadata: Metadata = {
     title: "Tết Bính Ngọ 2026 | Lunar New Year Countdown",
     description: "Countdown to Vietnamese Lunar New Year 2026 - Year of the Horse. Chúc Mừng Năm Mới!",
     keywords: ["Tết", "Lunar New Year", "2026", "Year of the Horse", "Vietnamese New Year", "Countdown"],
     openGraph: {
       title: "Tết Bính Ngọ 2026 | Lunar New Year Countdown",
       description: "Countdown to Vietnamese Lunar New Year 2026 - Year of the Horse 🐴",
       type: "website",
     },
   };
   ```

2. Optional: Update html lang attribute:
   ```typescript
   <html lang="vi">
   ```
   (Consider if Vietnamese is primary audience)

### Step 3: Verification
1. Run dev server: `pnpm dev`
2. Check browser DevTools for CSS custom properties
3. Verify animations render smoothly (no jank)
4. Test metadata in social media preview tools (Twitter Card Validator, Facebook Debugger)

## Todo List
- [ ] Add Tết color palette to globals.css
- [ ] Create 5 keyframe animations (glow, pulse, fadeIn, fall, float)
- [ ] Update @theme inline block with Tailwind integration
- [ ] Replace metadata in layout.tsx
- [ ] Add OpenGraph tags
- [ ] Test dev server renders without errors
- [ ] Verify CSS variables accessible in browser DevTools
- [ ] Check animation smoothness (60fps)
- [ ] Optional: Update html lang to "vi"

## Success Criteria
- [ ] All CSS custom properties defined and accessible
- [ ] Keyframe animations created (no syntax errors)
- [ ] Metadata appears correctly in page source
- [ ] OG tags present in HTML head
- [ ] Dev server runs without TypeScript/build errors
- [ ] Visual inspection: background color applied correctly

## Risk Assessment
**Low Risk Phase**
- CSS syntax errors → validate with linter, test in browser
- Metadata typos → preview before commit
- Animation performance → test on mobile devices, reduce complexity if needed

## Security Considerations
None (static CSS/metadata only)

## Next Steps
After completion, proceed to **Phase 2: Build Countdown Timer Component**
- Depends on CSS custom properties (glow, pulse animations)
- Uses Tailwind color classes from @theme inline
