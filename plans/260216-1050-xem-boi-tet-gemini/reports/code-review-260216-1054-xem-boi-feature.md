# Code Review Report: Xem Bói Tết Feature

**Date:** 2026-02-16
**Reviewer:** code-reviewer (Agent ID: a470daf)
**Plan:** `/Users/cps/hpny/plans/260216-1050-xem-boi-tet-gemini`

---

## Scope

### Files Reviewed
- `app/api/xem-boi/route.ts` (61 LOC) - API route calling Gemini 2.0 Flash
- `app/lib/gemini-fortune-prompt.ts` (54 LOC) - Prompt builder + zodiac calculation
- `app/components/fortune-form.tsx` (117 LOC) - Client form component
- `app/components/fortune-result.tsx` (67 LOC) - Result display component
- `app/xem-boi/page.tsx` (43 LOC) - Page component
- `app/page.tsx` (modified) - Nav link addition

### Total LOC
342 lines of production code

### Focus Areas
Security (API key, input validation), code quality, error handling, accessibility, Vietnamese content, Tailwind usage, edge cases

### Scout Findings
Edge cases discovered during pre-review scouting:
- No timeout handling for Gemini API calls (long-running requests)
- No rate limiting protection (API abuse potential)
- JSON parsing without schema validation (malformed responses)
- Missing input sanitization (XSS via name field)
- No request cancellation on component unmount
- Hardcoded max date validation (will need updates)
- Vietnamese zodiac calculation lacks year boundary edge cases (negative years, year 0)
- No retry logic for transient API failures
- Missing loading state timeout (stuck loading)

---

## Overall Assessment

**Quality Rating:** 7/10

The implementation is **functional and well-structured** with clean component separation and reasonable error handling. Build passes successfully (Next.js 16.1.6, TypeScript, ESLint). Vietnamese content is accurate and culturally appropriate.

**Primary concerns:** Missing security hardening (rate limiting, input sanitization), no timeout/retry logic for API calls, and accessibility gaps in form components.

**Positive aspects:** Clean code structure, proper TypeScript typing, good user feedback (loading states, errors), visually appealing UI with Tết theming.

---

## Critical Issues

### 1. **API Key Exposure Risk (Security)**
**File:** `app/api/xem-boi/route.ts:24`

**Issue:**
While API key is server-side only, there's no verification it's actually set during build/deployment. Silent failure until first user hits endpoint.

**Current:**
```typescript
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("GEMINI_API_KEY is not configured");
  return NextResponse.json({ error: "Hệ thống đang bảo trì..." }, { status: 500 });
}
```

**Recommendation:**
Add startup validation in `instrumentation.ts` or create `.env.example`:
```typescript
// instrumentation.ts
export function register() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY must be configured');
  }
}
```

**Impact:** Production deployment without API key = broken feature.

---

### 2. **No Input Sanitization (XSS Vulnerability)**
**File:** `app/components/fortune-form.tsx:74-83`, `app/api/xem-boi/route.ts:11`

**Issue:**
Name field accepts raw user input without sanitization. While React escapes in JSX, the name is passed to Gemini prompt and returned in fortune response, creating potential injection vectors.

**Attack Vector:**
```javascript
name = "<script>alert('XSS')</script>"
// Gets passed to Gemini → Could appear in response description
```

**Current:**
```typescript
if (!name?.trim()) { /* validation */ }
// No sanitization of special chars, HTML tags, or prompt injection
```

**Recommendation:**
Add input sanitization:
```typescript
import { escapeHtml } from '@/lib/utils'; // or use DOMPurify

const sanitizedName = name.trim().replace(/[<>]/g, '').slice(0, 50);
if (sanitizedName.length < 2) {
  return NextResponse.json({ error: "Tên phải có ít nhất 2 ký tự." }, { status: 400 });
}
```

**Impact:** Potential XSS if Gemini echoes malicious input in response.

---

### 3. **JSON Parsing Without Validation (Runtime Failure)**
**File:** `app/api/xem-boi/route.ts:51`

**Issue:**
Gemini response is parsed as JSON without schema validation. Malformed responses or missing fields cause crashes.

**Current:**
```typescript
const text = result.response.text();
const fortune = JSON.parse(text); // No validation
return NextResponse.json(fortune);
```

**Edge Cases:**
- Gemini returns markdown-wrapped JSON: ` ```json {...} ``` `
- Missing required fields (`categories`, `rating`)
- Invalid rating values (6, -1, "high")
- Empty response or rate limit error

**Recommendation:**
Add schema validation with Zod:
```typescript
import { z } from 'zod';

const FortuneSchema = z.object({
  categories: z.array(z.object({
    name: z.string(),
    icon: z.string(),
    rating: z.number().min(1).max(5),
    description: z.string(),
  })).length(4),
  summary: z.string().optional(),
});

const text = result.response.text();
let parsed;
try {
  // Strip markdown code blocks if present
  const cleaned = text.replace(/^```json\n?/, '').replace(/\n?```$/, '');
  parsed = JSON.parse(cleaned);
} catch {
  throw new Error('Invalid JSON response');
}

const fortune = FortuneSchema.parse(parsed); // Throws if invalid
return NextResponse.json(fortune);
```

**Impact:** App crashes on malformed Gemini responses.

---

## High Priority

### 4. **No Request Timeout (Hanging Requests)**
**File:** `app/api/xem-boi/route.ts:49`

**Issue:**
Gemini API call has no timeout. Users could wait indefinitely on slow/stuck requests.

**Recommendation:**
Add timeout with AbortController:
```typescript
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s

try {
  const result = await model.generateContent(userPrompt, {
    signal: controller.signal,
  });
  clearTimeout(timeoutId);
  // ...
} catch (error) {
  clearTimeout(timeoutId);
  if (error.name === 'AbortError') {
    return NextResponse.json(
      { error: "Yêu cầu quá lâu. Vui lòng thử lại." },
      { status: 504 }
    );
  }
  throw error;
}
```

**Impact:** Poor UX with indefinite loading states.

---

### 5. **No Rate Limiting (API Abuse)**
**File:** `app/api/xem-boi/route.ts`

**Issue:**
Public API endpoint with no rate limiting allows abuse (spam, DoS, quota exhaustion).

**Recommendation:**
Add middleware-based rate limiting:
```typescript
// middleware.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 m'), // 5 requests per minute
});

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/api/xem-boi') {
    const ip = request.ip ?? '127.0.0.1';
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return new NextResponse('Too Many Requests', { status: 429 });
    }
  }
}
```

**Alternative:** Use Vercel's built-in rate limiting or Cloudflare.

**Impact:** Potential Gemini API quota exhaustion and cost overruns.

---

### 6. **Vietnamese Zodiac Edge Cases**
**File:** `app/lib/gemini-fortune-prompt.ts:18-20`

**Issue:**
Zodiac calculation fails for edge cases:
- Negative years (historical dates)
- Year 0 (doesn't exist in Gregorian calendar)
- Invalid dates (Feb 30, etc.)

**Current:**
```typescript
export function getConGiap(birthYear: number): string {
  return CON_GIAP[birthYear % 12] ?? "Không xác định";
}
```

**Edge Cases:**
```javascript
getConGiap(-5);  // Returns CON_GIAP[-5 % 12] = undefined (but fallback works)
getConGiap(0);   // Returns CON_GIAP[0] = "Thân (Khỉ)" (incorrect?)
```

**Recommendation:**
Add validation:
```typescript
export function getConGiap(birthYear: number): string {
  if (birthYear < 1900 || birthYear > 2100) {
    return "Không xác định";
  }
  return CON_GIAP[birthYear % 12] ?? "Không xác định";
}
```

**Impact:** Incorrect zodiac for historical/future dates.

---

### 7. **Hardcoded Max Date Validation**
**File:** `app/components/fortune-form.tsx:97`

**Issue:**
Max date is hardcoded to `"2026-02-16"`. Will need manual updates in future.

**Current:**
```tsx
<input type="date" max="2026-02-16" />
```

**Recommendation:**
Use dynamic date:
```typescript
const today = new Date().toISOString().split('T')[0];
<input type="date" max={today} />
```

**Impact:** Allows future birthdates after Feb 16, 2026.

---

### 8. **No Request Cancellation on Unmount**
**File:** `app/components/fortune-form.tsx:24`

**Issue:**
If user navigates away during loading, fetch continues and may update unmounted component.

**Recommendation:**
Add cleanup with AbortController:
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  const controller = new AbortController();
  // Store controller for cleanup

  try {
    const res = await fetch("/api/xem-boi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name.trim(), birthDate }),
      signal: controller.signal,
    });
    // ...
  } catch (error) {
    if (error.name === 'AbortError') return; // Silent abort
    setError("Không thể kết nối. Vui lòng thử lại sau.");
  } finally {
    setLoading(false);
  }
};

// Add useEffect cleanup
useEffect(() => {
  return () => controller?.abort();
}, []);
```

**Impact:** Memory leaks and console warnings.

---

## Medium Priority

### 9. **Missing Accessibility Labels**
**Files:** `fortune-form.tsx`, `fortune-result.tsx`

**Issues:**
- Star rating uses Unicode but aria-label is basic
- Form lacks fieldset/legend for grouping
- Error messages not announced to screen readers

**Current:**
```tsx
<span aria-label={`${rating} trên 5 sao`}>★★★★☆</span>
```

**Recommendations:**
```tsx
// Better star rating
<div role="img" aria-label={`Đánh giá: ${rating} trên 5 sao`}>
  <span aria-hidden="true">{"★".repeat(rating)}{"☆".repeat(5-rating)}</span>
</div>

// Form improvements
<fieldset>
  <legend className="sr-only">Thông tin xem bói</legend>
  {/* inputs */}
</fieldset>

// Live error announcements
<div role="alert" aria-live="polite">
  {error && <p>{error}</p>}
</div>
```

**Impact:** Poor screen reader experience.

---

### 10. **No Retry Logic for Transient Failures**
**File:** `app/api/xem-boi/route.ts`

**Issue:**
Network blips or temporary Gemini outages fail immediately without retry.

**Recommendation:**
Add exponential backoff retry:
```typescript
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    await new Promise(r => setTimeout(r, delay));
    return retryWithBackoff(fn, retries - 1, delay * 2);
  }
}

const result = await retryWithBackoff(() =>
  model.generateContent(userPrompt)
);
```

**Impact:** Failures on transient errors.

---

### 11. **Loading State Lacks Timeout**
**File:** `app/components/fortune-form.tsx:56-64`

**Issue:**
If API hangs, loading state shows indefinitely with no escape.

**Recommendation:**
Add client-side timeout:
```typescript
const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  setLoading(true);

  const timeoutId = setTimeout(() => {
    setError("Yêu cầu quá lâu. Vui lòng thử lại.");
    setLoading(false);
  }, 30000); // 30s client timeout

  try {
    // ... fetch
    clearTimeout(timeoutId);
  } catch {
    clearTimeout(timeoutId);
    // ... error handling
  }
};
```

**Impact:** Users stuck on loading screen.

---

### 12. **Inline Styles Instead of Tailwind**
**Files:** Multiple components

**Issue:**
Mixing inline `style={}` with Tailwind CSS reduces consistency.

**Examples:**
```tsx
// fortune-form.tsx:58
<div style={{ animation: "pulse 1.5s ease-in-out infinite" }}>

// fortune-result.tsx:50
<p style={{ textShadow: "0 0 15px var(--tet-glow-gold)" }}>
```

**Recommendation:**
Move to Tailwind config or CSS modules:
```css
/* app/xem-boi/styles.module.css */
@keyframes fortunePulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.fortuneLoading {
  animation: fortunePulse 1.5s ease-in-out infinite;
}
```

**Impact:** Harder to maintain consistent theming.

---

### 13. **No User Feedback on Reset**
**File:** `fortune-result.tsx:59`

**Issue:**
Reset button clears state instantly without confirmation. Users may accidentally lose result.

**Recommendation:**
Add confirmation or toast:
```typescript
const handleReset = () => {
  if (confirm("Bạn có chắc muốn xem bói cho người khác?")) {
    onReset();
  }
};
```

**Impact:** Accidental data loss.

---

## Low Priority

### 14. **Magic Numbers in Code**
**Files:** Multiple

**Issues:**
- `maxLength={50}` without explanation
- `temperature: 0.9` not documented
- `max="2026-02-16"` (already flagged as high priority)

**Recommendation:**
Extract to constants:
```typescript
const MAX_NAME_LENGTH = 50;
const GEMINI_TEMPERATURE = 0.9; // Higher for creative fortune telling
const MIN_NAME_LENGTH = 2;
```

---

### 15. **TypeScript Types Could Be Stricter**
**File:** `fortune-form.tsx:6-9`

**Current:**
```typescript
interface FortuneData {
  categories: { name: string; icon: string; rating: number; description: string }[];
  summary?: string;
}
```

**Recommendation:**
Share types across files:
```typescript
// types/fortune.ts
export interface FortuneCategory {
  name: string;
  icon: string;
  rating: 1 | 2 | 3 | 4 | 5; // Literal union for rating
  description: string;
}

export interface FortuneData {
  categories: [FortuneCategory, FortuneCategory, FortuneCategory, FortuneCategory]; // Exactly 4
  summary?: string;
}
```

---

### 16. **Inline Animation Keyframes**
**Multiple files**

**Issue:**
CSS animations referenced but not defined (assuming global CSS).

**Current:**
```tsx
<div style={{ animation: "fadeIn 0.6s ease-out" }}>
```

**Recommendation:**
Verify `fadeIn`, `glow`, `pulse` are defined in global CSS or Tailwind config.

---

## Edge Cases Found by Scout

### API & Security
1. **No rate limiting** → API abuse, quota exhaustion (HIGH PRIORITY)
2. **No input sanitization** → XSS via name field (CRITICAL)
3. **API key not validated at startup** → Silent deployment failures (CRITICAL)

### Data Validation
4. **JSON parsing without schema** → Crashes on malformed responses (CRITICAL)
5. **Vietnamese zodiac edge cases** → Incorrect results for year < 1900 or > 2100 (HIGH)
6. **Hardcoded max date** → Accepts future dates after 2026-02-16 (HIGH)

### Async Handling
7. **No timeout on API calls** → Hanging requests (HIGH PRIORITY)
8. **No retry logic** → Failures on transient errors (MEDIUM)
9. **No request cancellation** → Memory leaks on unmount (HIGH)

### State Management
10. **Loading state timeout missing** → Stuck loading screen (MEDIUM)
11. **No confirmation on reset** → Accidental data loss (MEDIUM)

### User Experience
12. **No client-side loading timeout** → Poor UX on slow networks (MEDIUM)
13. **Inline styles vs Tailwind** → Maintenance issues (LOW)

---

## Positive Observations

### Code Quality
- ✅ Clean component separation (form, result, page)
- ✅ Proper TypeScript typing throughout
- ✅ Error boundaries with user-friendly Vietnamese messages
- ✅ Loading states with visual feedback
- ✅ Responsive design with Tailwind mobile-first approach

### Security Baseline
- ✅ API key kept server-side only (not exposed to client)
- ✅ Input trimming and basic validation
- ✅ Error messages don't leak internal details

### Vietnamese Content
- ✅ Culturally accurate zodiac animals (con giáp)
- ✅ Appropriate Tết terminology
- ✅ Natural, friendly tone in prompts
- ✅ All user-facing text in Vietnamese

### User Experience
- ✅ Clear visual hierarchy
- ✅ Smooth transitions and animations
- ✅ Intuitive form with proper labels
- ✅ Decorative elements (emojis, stars) enhance theme

### Build & Deployment
- ✅ TypeScript compiles without errors
- ✅ Next.js build succeeds (production-ready)
- ✅ No ESLint errors reported
- ✅ API route properly configured as dynamic

---

## Recommended Actions

### Immediate (Before Production)
1. **Add input sanitization** to prevent XSS (route.ts:11)
2. **Implement JSON schema validation** with Zod (route.ts:51)
3. **Add API timeout handling** (15-30s) (route.ts:49)
4. **Set up rate limiting** via middleware or Vercel config
5. **Validate GEMINI_API_KEY at startup** (instrumentation.ts)

### Short-term (Next Sprint)
6. **Fix dynamic max date** in form (fortune-form.tsx:97)
7. **Add request cancellation** on unmount (fortune-form.tsx)
8. **Improve accessibility** (ARIA labels, screen reader support)
9. **Add retry logic** for API failures (route.ts)
10. **Extract magic numbers** to constants

### Long-term (Future Enhancements)
11. **Migrate inline styles** to Tailwind config
12. **Share TypeScript types** across components
13. **Add telemetry/monitoring** for API failures
14. **Implement user analytics** (fortune request tracking)
15. **Add unit tests** for zodiac calculation and prompt builder

---

## Metrics

### Type Coverage
- **100%** - All files use TypeScript with proper typing
- No `any` types used
- Interfaces defined for all component props

### Linting
- **0 errors** - ESLint passes
- **0 warnings** - Clean build output

### Build Status
- ✅ TypeScript compilation successful
- ✅ Next.js production build successful
- ✅ All routes properly configured

### Code Complexity
- Average file size: 57 LOC (well under 200 LOC limit)
- Clear single-responsibility components
- Minimal nesting depth

---

## Unresolved Questions

1. **Environment Setup:** Is `.env.example` or deployment docs updated with `GEMINI_API_KEY` requirement?
2. **Rate Limiting Strategy:** Should this use Vercel's built-in limits or a custom Redis-based solution?
3. **Analytics:** Should we track fortune requests for usage insights?
4. **Gemini Quota:** What's the expected traffic and Gemini API quota? Need cost projections?
5. **Error Logging:** Should API errors be sent to Sentry or similar monitoring service?
6. **Caching:** Should fortune results be cached (by name+birthdate) to reduce API calls for duplicate requests?
7. **Testing:** Are there integration tests for the API route? Unit tests for zodiac calculation?
8. **Vietnamese Lunar Calendar:** Should birthdates support lunar calendar input for authentic Tết bói?

---

## Summary

The Xem Bói Tết feature is **well-implemented with clean architecture** but requires **security hardening** before production deployment. The code is readable, properly typed, and builds successfully.

**Critical blockers:** Input sanitization, JSON validation, and API timeout handling must be addressed immediately. Rate limiting is strongly recommended to prevent abuse.

**Overall verdict:** 7/10 - Good foundation with clear improvement path. Ready for production after addressing critical security issues.

