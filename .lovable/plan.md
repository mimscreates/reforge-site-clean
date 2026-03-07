

# Plan: Unified Booking Wizard for All Flows

## Problem
The Customize tab uses a simple `BookingModal` dialog for booking, while Creator/Business packs navigate to the full 6-step booking wizard (`/book`). The user wants **one consistent booking wizard** for everything.

## Fix

### 1. SessionConfigurator: Navigate to BookingWizard instead of opening BookingModal

- Replace `BookingModal` usage with `useNavigate` to route to `/book` with custom session details as query params
- When clicking "Reserve This Session" (desktop summary) or the mobile sticky bar CTA, navigate to `/book?pack=Custom+Session&type=Custom&config=...` where `config` is a URL-encoded JSON string of the configuration summary and price
- Remove `BookingModal` import and `modalOpen` state from `SessionConfigurator`

### 2. BookingWizard: Support "Custom" pack type

- Update `BookingWizard.tsx` to handle `type=Custom`:
  - When `type=Custom`, read `config` query param (JSON with summary string and total price)
  - Skip the Pack selection step (step 0) — start at step 1 (Date & Time), same as when a predefined pack is selected
  - Display the custom config summary in the confirmation step
  - Since decor and equipment are already configured in the Customize tab, auto-skip steps 2-3 (Decor/Equipment) for custom sessions — go straight from Date & Time to Your Details

### 3. MobileStickyBar: Update onReserve to navigate

- The `onReserve` callback in `MobileStickyBar` already calls the parent's handler — just need to update `SessionConfigurator` to pass navigation logic instead of modal open

**Files**: `src/components/SessionConfigurator.tsx`, `src/pages/BookingWizard.tsx`

