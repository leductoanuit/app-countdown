---
title: "Boc Li Xi Tren Cay Mai"
description: "Interactive mai tree with clickable lucky red envelopes showing Vietnamese New Year blessings"
status: completed
priority: P2
effort: 2h
branch: main
tags: [feature, tet, interactive, animation]
created: 2026-02-16
---

# Boc Li Xi Tren Cay Mai

Interactive mai (apricot blossom) tree with 5-7 red envelopes. User clicks one envelope per visit to reveal a random Vietnamese blessing.

## Tech Stack
- Next.js 16 + React 19 + Tailwind 4
- SVG/CSS only (no external assets)
- Client components with useState (no localStorage)

## Phases

| # | Phase | File | Status |
|---|-------|------|--------|
| 1 | [Mai Tree SVG Component](./phase-01-mai-tree-svg-component.md) | `app/components/mai-tree.tsx` | completed |
| 2 | [Li Xi Envelope Component](./phase-02-li-xi-envelope-component.md) | `app/components/li-xi-envelope.tsx` | completed |
| 3 | [Mai Tree Li Xi Section](./phase-03-mai-tree-li-xi-section.md) | `app/components/mai-tree-li-xi-section.tsx` | completed |
| 4 | [Integration & Styling](./phase-04-integration-and-styling.md) | `page.tsx` + `globals.css` | completed |

## Dependencies
- Existing CSS vars: --tet-red-primary, --tet-gold-primary, etc.
- Existing animations: glow, fadeIn (reusable)
- Phase 3 depends on 1+2; Phase 4 depends on 3

## Key Constraints
- Each file under 200 lines
- Kebab-case naming
- SVG/CSS only, no image assets
- One pick per page load (useState)
- Dark bg (#0a0a0a)
