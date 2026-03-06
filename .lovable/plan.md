

## Diagnostic

The base UI components (`button.tsx`, `card.tsx`, `input.tsx`, etc.) were correctly updated, but **dozens of component-level overrides** use `rounded-full` or `rounded-xl` directly in className props, which override the design system values. This is why nothing visually changed.

### Files with overrides to fix

| File | Issue |
|------|-------|
| `CreatorPacks.tsx` | Buttons: `rounded-full`, Cards: `rounded-xl` |
| `CorporatePacks.tsx` | Buttons: `rounded-full`, Cards: `rounded-xl` |
| `Newsletter.tsx` | Input & Button: `rounded-full` |
| `StudioCarousel.tsx` | Button: `rounded-full` |
| `SessionConfigurator.tsx` | Button: `rounded-full` |
| `RentalConfigurator.tsx` | Button: `rounded-full` |
| `PodcastOffers.tsx` | Button: `rounded-full` |
| `AudienceSelector.tsx` | Cards: `rounded-xl` → should be `rounded-2xl` |
| `Portfolio.tsx` | Cards & badges to verify |
| `Options.tsx` | Items use `rounded-lg` (correct) |
| `Navbar.tsx` | Any button overrides |
| `Hero.tsx` | CTA buttons |
| `BookingModal.tsx` / `BookingWidget.tsx` | Form elements & buttons |
| `FAQ.tsx` | Accordion items |

### Plan

1. **Remove all `rounded-full` from buttons** across every component — let them inherit `rounded-lg` (8px) from `button.tsx`
2. **Update card containers** using `rounded-xl` to `rounded-2xl` (24px) where appropriate
3. **Remove `rounded-full` from form inputs** (Newsletter) — let them inherit `rounded-lg` from `input.tsx`
4. **Keep `rounded-full` only** where semantically correct: avatars, circular icon buttons, pill badges, progress bars

This is a ~12 file sweep replacing className overrides so the design tokens actually take effect.

