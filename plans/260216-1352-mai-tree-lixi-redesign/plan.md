---
title: "Mai Tree & Li Xi Full Redesign"
description: "Complete visual overhaul of mai tree SVG and li xi envelope system with animations"
status: complete
priority: P2
effort: 3h
branch: main
tags: [ui, animation, svg, tet, redesign]
created: 2026-02-16
---

# Mai Tree & Li Xi Full Redesign

## Overview

Full visual redesign of the mai tree SVG (more branches, blossoms, animations) and li xi envelope system (multi-pick, enhanced design, confetti). Pure SVG + CSS, no external libs.

## Current State

- `mai-tree.tsx` (163 lines): 7 branches, 10 blossoms, 5 buds, no animations/filters
- `li-xi-envelope.tsx` (116 lines): Basic red envelope, simple flap open
- `mai-tree-li-xi-section.tsx` (96 lines): 6 envelopes, single-pick, 7 blessings
- `globals.css` (62 lines): Basic keyframe animations

## Phases

| # | Phase | Status | Effort | Files |
|---|-------|--------|--------|-------|
| 1 | [Mai Tree Redesign](./phase-01-mai-tree-redesign.md) | complete | 1.5h | mai-tree.tsx, mai-tree-filters.tsx, mai-tree-animations.css |
| 2 | [Li Xi Envelope Redesign](./phase-02-lixi-envelope-redesign.md) | complete | 1h | li-xi-envelope.tsx, li-xi-confetti.tsx |
| 3 | [Section Single-Pick & 10 Envelopes](./phase-03-section-multi-pick-logic.md) | complete | 15m | mai-tree-li-xi-section.tsx |

## Key Dependencies

- Phase 2 depends on Phase 1 (envelope positions must match new tree layout)
- Phase 3 depends on Phase 2 (section integrates redesigned envelopes)
- CSS animations in globals.css shared across phases

## Architecture

```
mai-tree.tsx              -> mai-tree.tsx (branches/trunk, <200 lines)
                          -> mai-tree-filters.tsx (SVG defs/filters, extracted)
li-xi-envelope.tsx        -> li-xi-envelope.tsx (enhanced SVG + opening animation)
                          -> li-xi-confetti.tsx (CSS confetti burst component)
mai-tree-li-xi-section.tsx -> updated with 10 envelopes + 20 blessings (single-pick kept)
globals.css               -> new keyframes: sway, shimmer, falling-petals, confetti, envelope-open
```

## Technical Constraints

- Pure SVG + CSS animations (no JS animation libs)
- `"use client"` components, Next.js App Router
- Mobile responsive, `prefers-reduced-motion` support
- GPU-friendly: animate only `transform`/`opacity`
- All files under 200 lines

## Validation Log

### Session 1 — 2026-02-16
**Trigger:** Initial plan creation validation
**Questions asked:** 4

#### Questions & Answers

1. **[Scope]** Bao nhiêu lần được bốc lì xì? Plan hiện tại cho phép 3 lần.
   - Options: 3 picks | 1 pick only | Unlimited picks
   - **Answer:** 1 pick only
   - **Rationale:** Keep original single-pick behavior. Simplifies Phase 3 — no multi-pick state needed, no progress indicator, no multi-blessing summary.

2. **[Scope]** Có muốn thêm hiệu ứng cánh hoa rơi (falling petals) trên cây mai không?
   - Options: Có, thêm cánh hoa rơi | Không cần
   - **Answer:** Có, thêm cánh hoa rơi
   - **Rationale:** Adds visual richness to tree. 3-5 petals with CSS animation, lightweight.

3. **[Design]** Ký tự trang trí trên bao lì xì nên là gì?
   - Options: 福 (Phúc) | Lộc | Không cần chữ
   - **Answer:** 福 (Phúc)
   - **Rationale:** Traditional Hán character, culturally appropriate for lì xì envelopes.

4. **[Scope]** Có muốn thêm confetti (băng giấy) khi mở bao lì xì?
   - Options: Có, thêm confetti | Không cần
   - **Answer:** Có, thêm confetti
   - **Rationale:** Enhances opening moment with festive feel. 8-12 CSS particles, no perf impact.

#### Confirmed Decisions
- **Pick count**: 1 pick only — keep original behavior, simplify Phase 3
- **Falling petals**: Yes — include in Phase 1
- **Envelope character**: 福 (Phúc) — traditional Hán character
- **Confetti**: Yes — include in Phase 2

#### Action Items
- [ ] Simplify Phase 3: revert to single-pick state, remove progress indicator and multi-blessing summary
- [ ] Phase 3 still needed for: expanding to 10 envelopes, 20 blessings pool, updated positioning

#### Impact on Phases
- Phase 1: No changes (falling petals already planned as "optional", now confirmed)
- Phase 2: No changes (confetti confirmed, 福 character confirmed)
- Phase 3: **Major simplification** — keep `pickedId: number | null` state, remove MAX_PICKS/Set logic, remove progress indicator, keep single blessing display. Still expand to 10 envelopes + 20 blessings.
