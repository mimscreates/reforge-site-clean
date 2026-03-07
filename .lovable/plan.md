

# Plan: Website Structure Improvements

## Overview
8 tasks covering page merging, navigation fixes, logo theming, duplicate cleanup, portfolio consistency, and booking wizard enhancements.

---

## 1. Merge Packs + Customize into One Page

**Current state**: Two separate pages — `PacksPage.tsx` (`/packs`) and `BuildSession.tsx` (`/build-session`) — with overlapping content.

**Action**: Rewrite `PacksPage.tsx` to include 4 tabs: **Customize | Creators | Business | VIP**. Import `SessionConfigurator` (from BuildSession) into this unified page. Remove the `BuildSession` page and its `/build-session` route.

- Default tab when navigating to `/packs`: **Creators**
- When arriving via "Book a Session" button: **Customize** (use `?tab=custom` query param)
- Keep `/build-session` route but redirect to `/packs?tab=custom`
- Tab bar uses the existing pill toggle style from PacksPage

**Files**: `src/pages/PacksPage.tsx` (rewrite), `src/App.tsx` (update routes), `src/pages/BuildSession.tsx` (can be removed or turned into redirect)

---

## 2. Fix Mobile Padding on Customize Tab

**Action**: In `SessionConfigurator.tsx`, reduce mobile horizontal padding. Ensure all card content uses `overflow-hidden` and text uses `break-words` / `truncate` where needed. Reduce `px-3` to `px-2` on mobile wrapper, and add `overflow-hidden` to config section cards.

**Files**: `src/components/SessionConfigurator.tsx`

---

## 3. Theme-Aware Logo

**Current state**: Single `kaun-logo.png` used everywhere — doesn't adapt to light/dark mode.

**Action**: Copy the uploaded black logo (`logo_kaun_noir.png`) to `src/assets/kaun-logo-dark.png`. In `Navbar.tsx`, use `useTheme()` to conditionally render the white logo in dark mode and the black logo in light mode. Apply the same logic to the mobile menu and footer.

**Files**: `src/components/Navbar.tsx`, `src/components/Footer.tsx`, copy uploaded image to `src/assets/kaun-logo-dark.png`

---

## 4. Remove Duplicate Client Logos

**Current state**: `ClientLogos.tsx` has 8 entries but `logo1` appears twice (index 0 and 7).

**Action**: Remove the duplicate entry `{ src: logo1, alt: "Client 8" }` from the `logos` array, leaving 7 unique logos.

**Files**: `src/components/ClientLogos.tsx`

---

## 5. Portfolio Reels — Uniform Card Format

**Current state**: Reels use `aspect-[9/16]` (tall vertical) while podcasts use `aspect-video` (16:9), breaking visual consistency.

**Action**: Change Reel cards to use the same `aspect-video` layout and card structure as YouTube cards. The thumbnail will be cropped via `object-cover`. Remove the `max-h-[480px]` constraint. Keep the external link behavior (open Instagram in new tab) but use the same card wrapper/footer style.

**Files**: `src/pages/Portfolio.tsx`

---

## 6. Fix "Who We Work With" Navigation

**Current state**: Cards link to `/creator-packs`, `/corporate-packs`, and `/corporate-packs#partnership`.

**Action**: Update the segments array:
- **Creators** → `/packs` (opens on Creators tab, which is the default)
- **Companies** → `/packs?tab=business` (opens on Business tab)  
- **Agencies** → `https://cal.com/kaun-studios-csvvzi/40min` (external booking calendar link)

**Files**: `src/components/WhoWeWorkWith.tsx`

---

## 7. "Book a Session" Buttons → Packs Customize Tab

**Action**: Update all "Book a Session" links across the site to point to `/packs?tab=custom` instead of `/build-session` or `/creator-packs`. Affected files:
- `Navbar.tsx` (desktop + mobile)
- `MobileFloatingCTA.tsx`
- `StudioCarousel.tsx`
- `FinalCTA.tsx`
- `CreateMore.tsx`
- `Footer.tsx`
- `Portfolio.tsx`

**Files**: ~7 component files, simple path replacement

---

## 8. Booking Wizard — Add Decor + Equipment Steps

**Current state**: 4 steps: Pack → Date & Time → Your Details → Confirmation.

**Action**: Expand to 6 steps: **Pack → Date & Time → Choose Decor → Add Equipment → Your Details → Confirmation**.

- **Choose Decor** (new step 3): Grid of 3-4 decor style options (e.g., "Minimalist", "Industrial", "Warm & Cozy", "Custom"). Each is a selectable card. Include a "Skip" button.
- **Add Equipment** (new step 4): Stepper rows for Camera, Microphone, Technician, and a toggle for Basic Editing — reusing the same price variables from `RentalConfigurator.tsx` (`PRICES` object). Include a "Skip" button.
- Update `stepLabels` to 6 items.
- Include selected decor and equipment in the submission payload and summary.

**Files**: `src/pages/BookingWizard.tsx`

---

## Technical Notes

- Navigation uses `HashRouter` with query params (`useSearchParams`) for tab selection
- The `SessionConfigurator` component already accepts `onSwitchTab` prop — will be reused in the merged page
- The uploaded black logo will be copied to `src/assets/` and imported alongside the existing white logo
- Price variables from `RentalConfigurator` (`PRICES` object) will be extracted to a shared constants file or duplicated in BookingWizard for the equipment step

