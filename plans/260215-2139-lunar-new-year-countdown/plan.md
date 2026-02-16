---
title: "Lunar New Year 2026 Countdown Web Page"
description: "Festive Vietnamese Tết countdown to Feb 17, 2026 with animations & Year of the Horse theme"
status: completed
priority: P2
effort: 4h
branch: main
tags: [nextjs, react, countdown, animation, festive, tet, lunar-new-year]
created: 2026-02-15
---

# Lunar New Year 2026 Countdown Implementation Plan

## Target
Countdown to **February 17, 2026 00:00:00** (Tết Bính Ngọ - Year of the Horse)

## Overview
Festive Vietnamese Tết-themed countdown page with real-time timer, falling flower particles, red/gold palette, responsive design.

## Phases

### Phase 1: Setup Globals & Layout
**Status:** ✅ Complete
- Updated `globals.css` with Tết color palette & keyframe animations
- Updated `layout.tsx` metadata (title, description, OG tags)

### Phase 2: Build Countdown Timer Component
**Status:** ✅ Complete
- Created `app/components/countdown-timer.tsx` (client component)
- useState + useEffect for real-time updates, celebration state

### Phase 3: Build Falling Particles Component
**Status:** ✅ Complete
- Created `app/components/falling-particles.tsx` (client component)
- 18 particles with randomized positioning/timing

### Phase 4: Compose Main Page
**Status:** ✅ Complete
- Updated `app/page.tsx` with z-index layered composition

## Success Criteria
- [x] Countdown accurate to target date (Feb 17, 2026 00:00:00)
- [x] Real-time updates every second
- [x] Smooth animations (60fps target)
- [x] Mobile responsive (320px - 1920px)
- [x] All components under 200 lines
- [x] No runtime errors, TypeScript passes
- [x] Code review score: 9/10

## Reports
- [Code Review](reports/code-reviewer-260215-2200-review.md)
