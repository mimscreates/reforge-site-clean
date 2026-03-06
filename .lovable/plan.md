

## Plan: Clean Up Hero Section

Three changes to `src/components/Hero.tsx`:

1. **Remove shooting stars** — Delete the `ShootingStar` component, `SHOOTING_STAR_COUNT` constant, `showStars` state, the `useEffect` timer, and the shooting stars JSX block (lines 5-57, 94, 98-101, 136-143).

2. **Remove the divider line** — Delete the `motion.div` divider between the heading and the subtitle (lines 235-244).

3. **Fix punctuation** — Change `"Your Vision."` to `"Your Vision"` (no dot) and keep `"Our Studio."` with the dot. Specifically, update the words array on line 186 from `["Your", "Vision."]` to `["Your", "Vision"]`.

