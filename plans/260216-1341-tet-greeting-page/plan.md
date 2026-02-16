---
title: "Tet Greeting Page When Countdown Reaches Zero"
description: "Replace simple celebration text with full Tet greeting page featuring fireworks/confetti, red/gold design"
status: complete
priority: P1
effort: 3h
branch: main
tags: [tet, greeting, animation, countdown]
created: 2026-02-16
---

# Tet Greeting Page Implementation Plan

## Summary

When `Date.now() >= 2026-02-17T00:00:00+07:00`, show a festive greeting page instead of countdown. Existing pages (mai tree, xem boi) unchanged.

## Current State

- `app/page.tsx` — main page, renders `CountdownTimer`, `FallingParticles`, `MaiTreeLiXiSection`, fortune CTA
- `app/components/countdown-timer.tsx` — already returns `null` from `calculateTimeLeft()` when countdown <= 0, renders basic celebration text
- Tet color tokens already defined in `globals.css` (red, gold, glow animations)

## Approach

Modify `countdown-timer.tsx` to render a `TetGreetingPage` component when `timeLeft === null`. Create greeting component with fireworks/confetti animation. Keep changes minimal — only touch countdown logic and add new component files.

## Phases

| # | Phase | Status | File |
|---|-------|--------|------|
| 1 | Create fireworks/confetti animation component | complete | [phase-01](./phase-01-fireworks-confetti-animation.md) |
| 2 | Create Tet greeting page component | complete | [phase-02](./phase-02-tet-greeting-component.md) |
| 3 | Integrate greeting into countdown logic + page layout | complete | [phase-03](./phase-03-integrate-greeting-page.md) |

## Key Decisions

- Pure CSS/canvas animations (no new deps) — YAGNI
- Greeting component separate from countdown — DRY/SRP
- Lift `timeLeft === null` check to `page.tsx` level so greeting replaces entire page layout (not just countdown section)
