---
title: "Xem Bói Tết bằng Gemini LLM"
description: "Tính năng xem bói tổng quan năm mới trên trang riêng /xem-boi, dùng Gemini 2.0 Flash"
status: completed
priority: P2
effort: 3h
branch: main
tags: [gemini, ai, fortune-telling, tet, feature]
created: 2026-02-16
---

# Xem Bói Tết bằng Gemini LLM

## Overview
Thêm trang `/xem-boi` cho phép user nhập tên + ngày sinh, gọi Gemini 2.0 Flash API để nhận bói tổng quan năm mới (Tài Lộc, Tình Duyên, Sức Khỏe, Sự Nghiệp). UI phong cách Tết đỏ-vàng, match theme hiện tại.

## Architecture
```
User → /xem-boi page (form) → POST /api/xem-boi → Gemini 2.0 Flash → JSON response → display results
```

## Tech Stack
- `@google/generative-ai` npm package
- Next.js Route Handler (server-side, GEMINI_API_KEY protected)
- React client component with form + result display

## Phases

| # | Phase | File | Status |
|---|-------|------|--------|
| 1 | API Route + Gemini integration | [phase-01](./phase-01-api-route-gemini.md) | ✅ Complete |
| 2 | UI - Form + Result page | [phase-02](./phase-02-ui-xem-boi-page.md) | ✅ Complete |
| 3 | Navigation + Polish | [phase-03](./phase-03-navigation-polish.md) | ✅ Complete |

## Key Files
- `app/api/xem-boi/route.ts` — API route (new)
- `app/xem-boi/page.tsx` — Page component (new)
- `app/components/fortune-form.tsx` — Form component (new)
- `app/components/fortune-result.tsx` — Result display (new)
- `app/page.tsx` — Add nav link (modify)
- `.env.local` — Add GEMINI_API_KEY (create/modify)

## Dependencies
- `@google/generative-ai` package
- `GEMINI_API_KEY` env variable

## Constraints
- API key server-side only, never exposed to client
- Vietnamese language throughout
- Match Tết theme (red, gold, dark bg)
- Mobile responsive
