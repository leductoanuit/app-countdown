# Phase 3: Mai Tree Li Xi Section

## Context Links
- [plan.md](./plan.md)
- [Phase 1: Mai Tree](./phase-01-mai-tree-svg-component.md)
- [Phase 2: Li Xi Envelope](./phase-02-li-xi-envelope-component.md)

## Overview
- **Priority:** High (blocks phase 4)
- **Status:** Pending
- **Description:** Main section component combining mai tree + positioned envelopes + blessing reveal + pick logic

## Key Insights
- Envelopes positioned on tree branches using absolute positioning (% based)
- One pick per visit — useState tracks pickedId (number | null)
- Blessings array shuffled/assigned at mount time so each envelope has unique blessing
- After picking: show blessing with glow animation, other envelopes dim
- Section title "Boc Li Xi" above tree

## Requirements

### Functional
- Render MaiTree as background layer
- Position 6 LiXiEnvelope components on tree branches
- Randomize blessing assignment on mount (no duplicates)
- Track pick state: null = none picked, number = picked envelope id
- After pick: opened envelope shows blessing, others disabled
- Section heading: "Boc Li Xi Tren Cay Mai"

### Non-functional
- Responsive layout
- Under 200 lines
- No localStorage, useState only

## Architecture
```
MaiTreeLiXiSection ("use client")
├── State: pickedId (number | null), blessings (string[])
├── Section heading
├── Relative container (aspect ratio wrapper)
│   ├── MaiTree (SVG backdrop, w-full h-full)
│   └── LiXiEnvelope x6 (absolute positioned)
│       ├── Each gets: position, blessing from shuffled array
│       ├── isOpened = pickedId === envelope.id
│       └── isDisabled = pickedId !== null && pickedId !== envelope.id
```

### Data
```typescript
const BLESSINGS = [
  "Phat tai phat loc",
  "An khang thinh vuong",
  "Van su nhu y",
  "Suc khoe doi dao",
  "Nam moi phat tai",
  "Tan tai tan loc",
  "Cung chuc tan xuan",
];

const ENVELOPE_POSITIONS = [
  { top: "15%", left: "25%" },
  { top: "20%", left: "65%" },
  { top: "35%", left: "15%" },
  { top: "40%", left: "75%" },
  { top: "55%", left: "35%" },
  { top: "50%", left: "60%" },
];
```
Note: Use proper Vietnamese diacritics in actual implementation.

## Related Code Files
- **Create:** `app/components/mai-tree-li-xi-section.tsx`
- **Import:** `app/components/mai-tree.tsx`, `app/components/li-xi-envelope.tsx`

## Implementation Steps
1. Create `app/components/mai-tree-li-xi-section.tsx` with "use client"
2. Define BLESSINGS array (7 Vietnamese blessings with diacritics)
3. Define ENVELOPE_POSITIONS array (6 positions on branches)
4. useState for pickedId (number | null), init null
5. useMemo to shuffle blessings array (Fisher-Yates) and take first 6
6. handlePick function: set pickedId if null
7. Render section with heading styled with tet-gold-primary
8. Relative container with max-w-lg mx-auto, aspect-[4/5]
9. MaiTree as w-full h-full inside container
10. Map ENVELOPE_POSITIONS to LiXiEnvelope components
11. Pass props: id, position, blessing from shuffled array, isOpened, isDisabled, onPick
12. Run `npm run build` to verify

## Todo List
- [ ] Create mai-tree-li-xi-section.tsx
- [ ] BLESSINGS + ENVELOPE_POSITIONS constants
- [ ] Shuffle logic for random blessing assignment
- [ ] Pick state management (useState)
- [ ] Layout: heading + relative container + tree + envelopes
- [ ] Wire up all props between components
- [ ] Verify build passes

## Success Criteria
- Tree with 6 envelopes renders correctly
- Click one envelope -> opens with blessing, others dim
- Second click on any envelope -> no effect
- Different blessing each page load (shuffled)
- Responsive on mobile/desktop
- Under 200 lines

## Risk Assessment
- **Envelope positioning:** % positions may not align perfectly with branches — needs visual tuning
- **Hydration mismatch:** Shuffle uses Math.random — must be in useEffect or useMemo with client-only guard
  - Mitigation: Use useMemo (runs on client after hydration for "use client" components) or useEffect to set blessings

## Security Considerations
- None (client-side presentational logic only)

## Next Steps
- Phase 4: Integration into page.tsx + CSS animations in globals.css
