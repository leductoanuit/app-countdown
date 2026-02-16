# Phase 02: Tet Greeting Page Component

## Context Links
- Current celebration text: `app/components/countdown-timer.tsx` lines 53-72
- Color tokens: `app/globals.css`
- Animation keyframes: `app/globals.css` (glow, pulse, fadeIn)

## Overview
- **Priority:** High
- **Status:** Complete
- Create full Tet greeting component with wishes, decorative design, red/gold theme

## Key Insights
- Current celebration text in countdown-timer is minimal (3 lines of text)
- Need to expand into full-page greeting with visual richness
- Reuse existing CSS variables and animations
- Content in Vietnamese + English

## Requirements

### Functional
- Large "Chuc Mung Nam Moi" heading with glow animation
- "Tet Binh Ngo 2026" subheading
- Horse emoji/icon prominently displayed
- Tet wishes/blessings text (2-3 lines)
- Decorative elements: lanterns, peach blossoms (emoji-based, no images needed)
- Smooth fade-in entrance animation

### Non-Functional
- Responsive: looks good on 320px to 1440px+
- Accessible: proper heading hierarchy, aria labels
- No external images — emoji + CSS only (KISS)

## Architecture
- Single component: `tet-greeting-content.tsx`
- Client component (for animations)
- Renders: heading, subheading, wishes, decorative elements
- Uses existing Tailwind classes + CSS variables

## Related Code Files
- **Create:** `app/components/tet-greeting-content.tsx`
- **Reference:** `app/components/countdown-timer.tsx` (current celebration block)
- **Reference:** `app/globals.css` (animations, colors)

## Implementation Steps
1. Create `app/components/tet-greeting-content.tsx`
2. Main heading: "Chuc Mung Nam Moi" with glow animation, text-5xl to text-8xl responsive
3. Sub heading: "Tet Binh Ngo 2026 - Nam Con Ngua"
4. Horse decorative element: large emoji or stylized text
5. Wishes section: 2-3 traditional Tet blessings
   - "Phuc Loc Tho" / "An Khang Thinh Vuong"
   - "Chuc Mung Nam Moi, Van Su Nhu Y"
6. Decorative border/frame using CSS (red/gold gradient border)
7. FadeIn + staggered animation for each section
8. Ensure responsive layout with flex/grid

## Todo List
- [ ] Create tet-greeting-content.tsx
- [ ] Implement heading with glow effect
- [ ] Add Tet wishes/blessings text
- [ ] Add decorative elements (emoji lanterns, blossoms)
- [ ] Staggered entrance animations
- [ ] Test responsive on mobile/tablet/desktop
- [ ] File under 200 lines

## Success Criteria
- Visually festive, red/gold theme
- Readable on all screen sizes
- Smooth animations, no jank
- Proper Vietnamese diacritics in text

## Risk Assessment
- **Emoji rendering varies by OS:** Acceptable — emojis are decorative, not critical
- **Text overflow on small screens:** Use responsive text sizes

## Next Steps
- Phase 03 integrates this + fireworks into page.tsx
