# Phase 2: Build Countdown Timer Component

## Context Links
- Related: `app/components/countdown-timer.tsx` (new file)
- Depends on: Phase 1 (CSS animations, color palette)
- Plan: `plan.md`

## Overview
**Priority:** P2
**Status:** Pending
**Effort:** 1h 30min
**Description:** Create client-side countdown timer with real-time updates, Vietnamese greetings, celebration message on completion

## Key Insights
- React 19 useEffect cleanup prevents memory leaks
- Target: Feb 17, 2026 00:00:00 (timezone critical - assume Vietnam UTC+7)
- Client component required (`"use client"` directive)
- Calculate time delta: target timestamp - current timestamp
- Update interval: 1000ms (1 second) for smooth countdown
- Edge case: handle negative time (past deadline)

## Requirements

### Functional
- Display days, hours, minutes, seconds remaining
- Real-time updates every second
- Vietnamese greeting text: "Chúc Mừng Năm Mới", "Tết Bính Ngọ 2026"
- Horse emoji 🐴 for Year of the Horse
- Celebration message when countdown reaches zero
- Responsive typography (mobile: sm text, desktop: xl/2xl)

### Non-Functional
- Performance: cleanup interval on unmount
- Accessibility: semantic HTML, ARIA labels
- Type safety: TypeScript interfaces for time units
- Under 200 lines (KISS principle)

## Architecture

### Component Structure
```
CountdownTimer (client component)
├── useState: timeLeft { days, hours, minutes, seconds }
├── useEffect: setInterval(calculateTimeLeft, 1000)
├── Conditional render: countdown vs celebration
└── UI: greeting text + time units grid
```

### Time Calculation Logic
```typescript
const calculateTimeLeft = () => {
  const target = new Date('2026-02-17T00:00:00+07:00'); // Vietnam timezone
  const now = new Date();
  const difference = target.getTime() - now.getTime();

  if (difference <= 0) return null; // Celebration state

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};
```

## Related Code Files

### To Create
- `/Users/cps/hpny/app/components/countdown-timer.tsx` — countdown logic + UI

### To Modify
None

### To Delete
None

## Implementation Steps

### Step 1: Create component file
1. Create directory: `mkdir -p /Users/cps/hpny/app/components`
2. Create file: `app/components/countdown-timer.tsx`

### Step 2: Write component skeleton
```typescript
"use client";

import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isCelebration, setIsCelebration] = useState(false);

  // Implementation continues...
}
```

### Step 3: Implement calculateTimeLeft function
1. Define target date: `new Date('2026-02-17T00:00:00+07:00')`
2. Calculate difference in milliseconds
3. Convert to days/hours/minutes/seconds
4. Return null if difference <= 0 (trigger celebration)

### Step 4: Implement useEffect hook
```typescript
useEffect(() => {
  const calculateTimeLeft = () => {
    const target = new Date('2026-02-17T00:00:00+07:00');
    const now = new Date();
    const difference = target.getTime() - now.getTime();

    if (difference <= 0) {
      setIsCelebration(true);
      return null;
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  // Initial calculation
  setTimeLeft(calculateTimeLeft());

  // Update every second
  const timer = setInterval(() => {
    const newTimeLeft = calculateTimeLeft();
    setTimeLeft(newTimeLeft);
  }, 1000);

  // Cleanup on unmount
  return () => clearInterval(timer);
}, []);
```

### Step 5: Create countdown UI
```typescript
if (isCelebration) {
  return (
    <div className="text-center space-y-6 animate-[fadeIn_1s_ease-in]">
      <h1 className="text-4xl md:text-6xl font-bold text-tet-gold-primary animate-[glow_2s_ease-in-out_infinite]">
        🐴 Chúc Mừng Năm Mới! 🐴
      </h1>
      <p className="text-2xl md:text-4xl text-tet-red-primary">
        Tết Bính Ngọ 2026
      </p>
      <p className="text-lg md:text-xl text-tet-gold-secondary">
        Happy Lunar New Year - Year of the Horse!
      </p>
    </div>
  );
}

if (!timeLeft) return null; // Loading state

return (
  <div className="text-center space-y-8">
    {/* Greeting */}
    <div className="space-y-4">
      <h1 className="text-3xl md:text-5xl font-bold text-tet-red-primary animate-[glow_3s_ease-in-out_infinite]">
        Chúc Mừng Năm Mới
      </h1>
      <p className="text-xl md:text-3xl text-tet-gold-primary">
        Tết Bính Ngọ 2026 🐴
      </p>
    </div>

    {/* Countdown Grid */}
    <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
      {[
        { label: 'Ngày', value: timeLeft.days },
        { label: 'Giờ', value: timeLeft.hours },
        { label: 'Phút', value: timeLeft.minutes },
        { label: 'Giây', value: timeLeft.seconds },
      ].map((unit) => (
        <div
          key={unit.label}
          className="bg-tet-dark-bg/50 border-2 border-tet-gold-primary rounded-lg p-4 md:p-8 animate-[pulse_2s_ease-in-out_infinite]"
        >
          <div className="text-4xl md:text-6xl font-bold text-tet-gold-primary">
            {String(unit.value).padStart(2, '0')}
          </div>
          <div className="text-sm md:text-lg text-tet-gold-secondary mt-2">
            {unit.label}
          </div>
        </div>
      ))}
    </div>

    {/* Subheading */}
    <p className="text-lg md:text-xl text-tet-red-secondary">
      Year of the Horse
    </p>
  </div>
);
```

### Step 6: TypeScript validation
1. Ensure all types defined (TimeLeft interface)
2. Handle null states properly
3. Verify no `any` types

### Step 7: Testing
1. Run `pnpm dev`
2. Verify countdown updates every second
3. Test celebration state (temporarily change target date to past)
4. Check mobile responsiveness (320px viewport)
5. Verify animations applied (glow, pulse)

## Todo List
- [ ] Create `app/components/` directory
- [ ] Create `countdown-timer.tsx` file
- [ ] Add `"use client"` directive
- [ ] Import React hooks (useState, useEffect)
- [ ] Define TimeLeft interface
- [ ] Implement calculateTimeLeft function
- [ ] Set target date (Feb 17, 2026 00:00:00 UTC+7)
- [ ] Setup useEffect with setInterval
- [ ] Add interval cleanup in useEffect return
- [ ] Create celebration UI (isCelebration === true)
- [ ] Create countdown UI with 4-column grid
- [ ] Add Vietnamese labels (Ngày, Giờ, Phút, Giây)
- [ ] Apply Tailwind classes (colors, animations)
- [ ] Add responsive breakpoints (md: prefix)
- [ ] Pad numbers with leading zeros
- [ ] Test countdown updates in browser
- [ ] Test celebration state triggers
- [ ] Verify TypeScript compiles without errors
- [ ] Check mobile layout (Chrome DevTools)

## Success Criteria
- [ ] Countdown updates every second without lag
- [ ] Displays accurate time remaining (verify against system clock)
- [ ] Celebration message appears when countdown reaches zero
- [ ] Vietnamese text renders correctly (UTF-8 encoding)
- [ ] Horse emoji 🐴 displays on all platforms
- [ ] Glow animation applied to heading
- [ ] Pulse animation applied to time boxes
- [ ] Responsive on mobile (320px) and desktop (1920px)
- [ ] No console errors or warnings
- [ ] TypeScript compiles successfully
- [ ] Component under 200 lines

## Risk Assessment
**Medium Risk**
- **Timezone issues:** Target date hardcoded to UTC+7 (Vietnam); test with different system timezones
- **Performance:** setInterval cleanup critical to prevent memory leaks; verify in React DevTools
- **Browser compatibility:** Date parsing may differ; use ISO 8601 format
- **Edge case:** User visits after deadline; celebration state must persist

**Mitigation:**
- Use ISO date string with timezone offset
- Test cleanup by unmounting component (React StrictMode)
- Verify in Chrome, Safari, Firefox
- Add conditional rendering for null/celebration states

## Security Considerations
None (client-side countdown only, no user input or data storage)

## Next Steps
After completion, proceed to **Phase 3: Build Falling Particles Component**
- Particles will overlay countdown (z-index layering)
- CSS animations from Phase 1 (fall, float keyframes)
