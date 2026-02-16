# Phase 1: Mai Tree SVG Component

## Context Links
- [plan.md](./plan.md)
- Existing components: `app/components/countdown-timer.tsx`, `app/components/falling-particles.tsx`
- CSS vars defined in `app/globals.css`

## Overview
- **Priority:** High (blocks phase 3)
- **Status:** Pending
- **Description:** Create inline SVG mai tree with trunk, branches, golden/yellow blossoms

## Key Insights
- SVG must be responsive — use viewBox with percentage-based container
- Mai blossoms are 5-petal, golden-yellow (#fbbf24, #f59e0b)
- Tree trunk/branches brown (#8B4513 / #654321)
- Tree serves as backdrop; envelopes positioned over it in phase 3
- Keep SVG paths simple — stylized, not photorealistic

## Requirements

### Functional
- Render stylized mai tree with trunk + 3-5 main branches
- 8-12 golden blossoms scattered on branches
- Some small buds for visual variety
- Tree should feel festive, not botanical

### Non-functional
- Pure SVG, no external assets
- Responsive: scales with container
- Under 200 lines
- Performant (no JS animations in this component)

## Architecture
```
MaiTree (pure SVG component, no state)
├── <svg viewBox="0 0 400 500">
│   ├── Trunk (brown path)
│   ├── Branches (brown paths, 3-5 main)
│   ├── Blossoms (golden circles/paths, 8-12)
│   └── Buds (small golden dots, 4-6)
```

## Related Code Files
- **Create:** `app/components/mai-tree.tsx`
- **Reference:** `app/globals.css` (CSS vars)

## Implementation Steps
1. Create `app/components/mai-tree.tsx` with "use client" directive
2. Define SVG viewBox (0 0 400 500) for portrait tree shape
3. Draw trunk as curved brown path from bottom center upward
4. Draw 3-5 branching paths extending from trunk
5. Place 8-12 five-petal blossom groups on branch endpoints/midpoints
6. Add 4-6 small buds (circles) on thinner branches
7. Use CSS vars for gold colors, hardcode browns
8. Accept optional className prop for external sizing
9. Run `npm run build` to verify no compile errors

## Todo List
- [ ] Create mai-tree.tsx with SVG structure
- [ ] Trunk + branches paths
- [ ] Blossom shapes at branch points
- [ ] Small buds for visual variety
- [ ] Responsive container with className prop
- [ ] Verify build passes

## Success Criteria
- Tree renders correctly on dark background
- Responsive — looks good 300px to 800px wide
- No external assets, pure SVG
- Under 200 lines
- Build passes

## Risk Assessment
- **SVG complexity:** Keep paths simple; stylized > realistic
- **Performance:** Static SVG, no risk

## Security Considerations
- None (pure presentational component)

## Next Steps
- Phase 2: Li xi envelope component
- Phase 3: Combine tree + envelopes with positioning
