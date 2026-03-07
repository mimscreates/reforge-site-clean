

## Problem

The desktop navbar text wraps at intermediate viewport widths (around 1024-1280px). "Rent Our Studios" breaks into two lines because the pill container doesn't enforce `whitespace-nowrap`, and the breakpoint jumps straight from mobile (`lg:hidden`) to desktop (`lg:block`) with no size adaptation.

## Fix

**File: `src/components/Navbar.tsx`**

1. Add `whitespace-nowrap` to the nav pill's inner flex container (line 89) so link text never wraps.
2. Reduce the nav link gap and font size at the `lg` breakpoint, then restore larger values at `xl`:
   - Links gap: `gap-2 xl:gap-4`
   - Font size on `NavItem`: `text-[13px] xl:text-[15px]`
3. Optionally reduce "Book a Session" button padding at `lg` and restore at `xl`.

This ensures at every viewport above mobile the navbar remains a single horizontal line — it just gets slightly more compact between 1024px and 1280px.

