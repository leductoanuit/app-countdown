---
title: "MoMo QR Li Xi Feature"
description: "Add reusable MoMo QR code component for 'xin li xi' at two integration points"
status: complete
priority: P2
effort: 1.5h
branch: main
tags: [feature, momo, qr, li-xi, tet]
created: 2026-02-17
---

# MoMo QR "Xin Li Xi" Feature

## Summary

Add a reusable `MomoQrLiXi` component displaying a MoMo/VietQR QR code for "LE DUC TOAN", integrated at two points where users have completed an interaction and are in a positive emotional state.

## Phases

| # | Phase | Status | Effort |
|---|-------|--------|--------|
| 1 | [Create MoMo QR Component](./phase-01-momo-qr-component.md) | complete | 45min |
| 2 | [Integrate into Mai Tree & Fortune](./phase-02-integrate-mai-tree-and-fortune.md) | complete | 30min |

## Key Dependencies

- QR image: `public/z7541927456720_3482c38d597a5f91305936027d4d00f4.jpg` -> rename to `public/momo-qr-li-xi.jpg`
- Integration targets: `app/components/mai-tree-li-xi-section.tsx`, `app/components/fortune-result.tsx`
- Theme: existing Tet CSS variables in `app/globals.css`

## Architecture

```
MomoQrLiXi (new, reusable)
  ├── Used by MaiTreeLiXiSection (after blessing reveal)
  └── Used by FortuneResult (after reset button)
```

Single client component, no new dependencies. Uses Next.js `Image` for optimized QR display.
