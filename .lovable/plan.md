

## Plan: Pill-Style Floating Navbar (Desktop Only)

Redesign the desktop navbar into a floating pill shape inspired by the reference image, while keeping mobile nav unchanged.

### Design

```text
   ┌──────────────────────────────────────────────────────────┐
   │  (●)  Home  Packs  Portfolio  Session  Rent  │ ☀ 📞 [Book] │
   └──────────────────────────────────────────────────────────┘
         ↑ pill with full rounded corners, floating with margin
```

- **Pill container**: `rounded-full`, centered with `max-w-fit mx-auto`, offset from top (`top-4`), glassmorphism background + border
- **Logo in circle**: Wrap logo `img` in a circular container (`w-8 h-8 rounded-full bg-foreground/10 p-1.5`)
- **Nav links**: Keep existing links but add hover text animation using framer-motion — subtle slide-up with color shift on hover (each link wrapped in `motion.div` with `whileHover` scale + y shift)
- **Right cluster**: ThemeToggle icon, Phone icon (no text label to save space), "Book a Session" pill button
- **Mobile**: Completely unchanged — the pill styling only applies inside `hidden lg:flex` wrappers

### Changes — Single File

**`src/components/Navbar.tsx`**
1. Change outer `<nav>` from full-width sticky bar to a floating centered pill: `fixed top-4 left-1/2 -translate-x-1/2 z-50 rounded-full px-2` with glassmorphism inline styles
2. Remove `borderBottom`, use `border` (all sides) instead for the pill shape
3. Wrap logo in a circular div with subtle background
4. Add `motion` wrapper to each nav link with `whileHover={{ y: -2, scale: 1.05 }}` and a subtle underline dot animation
5. Compact the right-side items — keep ThemeToggle, Phone icon-only, and Book button with `rounded-full`
6. Mobile section (`lg:hidden`) stays exactly as-is, but moves outside the pill container to avoid inheriting pill styles

