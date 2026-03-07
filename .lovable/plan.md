

## Problem

Two mobile issues on the Packs page:

1. **Tab bar overflows** — The 4 tabs with icons + text exceed the mobile viewport width, causing horizontal scroll or cutoff.
2. **Too much spacing on Customize cards** — The config section cards (`ConfigSection`, `OptionCard`) have excessive padding and gaps on mobile.

## Fix

### 1. Tab bar — fit on mobile (PacksPage.tsx, lines 277-300)

- Make the tab container scrollable or, better, shrink tabs to fit:
  - Reduce mobile padding from `px-4` to `px-2.5`
  - Reduce gap from `gap-2` to `gap-1` on mobile between icon and text
  - Hide icons on mobile (only show text) — the labels are short enough: "Customize", "Creators", "Business", "VIP"
  - Use `text-xs` on mobile, `text-sm` on `sm:` and up
  - Make the outer container `w-full max-w-full overflow-x-auto` on mobile as a safety net
  - Change `inline-flex` wrapper to also accept `max-w-full`

### 2. Reduce spacing on Customize cards (SessionConfigurator.tsx)

- **Section wrapper** (line 106): reduce `px-3` to `px-1` on mobile
- **ConfigSection** (line 279): reduce `p-4` to `p-3` on mobile
- **OptionCard** (line 297): reduce `px-3 py-2.5` to `px-2.5 py-2` on mobile
- **Grid gaps** in session types, editing, reel styles, extras: reduce `gap-2` to `gap-1.5` on mobile
- **Space between sections** (line 110): reduce `space-y-4` to `space-y-3` on mobile
- Add `overflow-hidden` to ConfigSection wrapper to prevent any bleed

**Files**: `src/pages/PacksPage.tsx`, `src/components/SessionConfigurator.tsx`

