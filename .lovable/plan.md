

## Plan: Connect Packs Page to the Booking Wizard

**What's happening now:** On the Packs page (`/packs`), clicking "Book this pack" opens a simple `BookingModal` dialog — a basic form without the cinematic multi-step wizard experience.

**What you want:** The same onboarding flow used in `/book` (Pack → Date & Time → Your Details → Confirmation) should be triggered from the Packs page too.

**The fix is straightforward:** The BookingWizard at `/book` already accepts URL parameters (`?pack=Cosmic&type=Creator`). Instead of opening the modal, the "Book this pack" buttons on the Packs page should navigate to `/book?pack={name}&type={type}`.

### Changes

**`src/pages/PacksPage.tsx`**
1. Replace the `BookingModal` usage with `useNavigate` from react-router.
2. Update `openBooking` to navigate to `/book?pack={name}&type={Creator|Business}` instead of opening a modal.
3. For VIP packs, navigate to `/vip` instead (since VIP has its own request flow).
4. Remove the `BookingModal` import and related state (`modalOpen`, `selectedPack`).

This is a minimal, clean change — no new components needed. The entire cinematic wizard experience is already built.

