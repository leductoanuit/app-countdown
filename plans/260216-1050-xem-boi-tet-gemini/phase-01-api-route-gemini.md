# Phase 01: API Route + Gemini Integration

## Context
- Parent plan: [plan.md](./plan.md)
- Gemini docs: `@google/generative-ai` npm package
- Existing patterns: Next.js App Router, no existing API routes

## Overview
- **Priority:** High (blocks Phase 2)
- **Status:** ✅ Complete
- **Description:** Create API route that receives name + birthdate, calls Gemini 2.0 Flash with Vietnamese fortune-telling prompt, returns structured JSON.

## Key Insights
- Gemini 2.0 Flash supports JSON mode via `responseMimeType: "application/json"`
- Con giáp (zodiac animal) calculated from birth year using 12-year cycle
- Prompt must instruct Gemini to respond in Vietnamese with Tết context

## Requirements
### Functional
- POST `/api/xem-boi` accepts `{ name: string, birthDate: string }` (ISO date)
- Returns JSON: `{ categories: [{ name, icon, rating, description }] }` for 4 categories
- Rating: 1-5 stars per category
- Vietnamese response, Tết-themed language

### Non-functional
- Server-side only (API key never exposed)
- Input validation (name required, valid date)
- Error handling with user-friendly Vietnamese messages
- Response time < 5s typical

## Architecture
```
POST /api/xem-boi
  → Validate input
  → Calculate con giáp from birth year
  → Build prompt with name, birthdate, con giáp, year context
  → Call Gemini 2.0 Flash (JSON mode)
  → Parse + return structured response
```

## Related Code Files
- **Create:** `app/api/xem-boi/route.ts`
- **Create:** `app/lib/gemini-fortune-prompt.ts` (prompt template)
- **Modify:** `package.json` (add `@google/generative-ai`)
- **Create/Modify:** `.env.local` (add `GEMINI_API_KEY`)

## Implementation Steps

1. Install `@google/generative-ai` via pnpm
2. Add `GEMINI_API_KEY` to `.env.local`
3. Create `app/lib/gemini-fortune-prompt.ts`:
   - Export function `buildFortunePrompt(name, birthDate)` that:
     - Calculates con giáp from birth year (12-year cycle starting Tý=rat from 2020)
     - Calculates tuổi âm lịch
     - Returns system prompt + user prompt in Vietnamese
   - Prompt instructs: respond as Vietnamese fortune teller, Tết Bính Ngọ 2026 context
   - Request JSON schema: 4 categories (Tài Lộc, Tình Duyên, Sức Khỏe, Sự Nghiệp)
   - Each category: `{ name, icon, rating (1-5), description (2-3 sentences) }`
4. Create `app/api/xem-boi/route.ts`:
   - Import `GoogleGenerativeAI` from `@google/generative-ai`
   - POST handler: parse body, validate inputs
   - Initialize Gemini with `gemini-2.0-flash` model
   - Set `generationConfig: { responseMimeType: "application/json" }`
   - Call `model.generateContent()` with built prompt
   - Parse JSON response, return NextResponse.json()
   - Error handling: 400 for bad input, 500 for API errors
5. Test API route manually with curl

## Todo
- [ ] Install @google/generative-ai
- [ ] Create .env.local with GEMINI_API_KEY
- [ ] Create gemini-fortune-prompt.ts
- [ ] Create API route handler
- [ ] Test with curl

## Success Criteria
- POST /api/xem-boi returns valid JSON with 4 fortune categories
- Each category has name, icon, rating (1-5), description in Vietnamese
- Invalid input returns 400 with Vietnamese error message
- API key not exposed in client bundle

## Risk Assessment
- Gemini may not always return valid JSON → use JSON mode + fallback parsing
- Rate limiting on free tier → add error message for rate limit

## Security
- GEMINI_API_KEY server-side only via process.env
- Input sanitization (trim, length limits)
- No user data stored/logged

## Next Steps
→ Phase 02: Build UI form + result display
