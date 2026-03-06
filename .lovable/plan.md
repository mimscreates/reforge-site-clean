

## Problem

The preview is showing a blank white page because the Vite development server has a corrupted HMR cache from the repeated `RefreshRuntime.getRefreshReg` error in `toast.tsx`. Even though the file content is now correct, the cached module is still broken.

## Fix

Force a full cache bust by making a trivial but meaningful change to the module graph entry point. Two changes:

1. **`src/main.tsx`** — Add a harmless comment or whitespace change to force Vite to do a full page reload and rebuild the entire module graph from scratch.

2. **`src/components/ui/toast.tsx`** — Rewrite the file with a slightly different structure (e.g., inline the `cn` import differently or add a `// @refresh reset` pragma comment at the top) to force Vite to treat it as a completely new module and discard the corrupted cache entry.

The `// @refresh reset` directive is a Vite/React Fast Refresh feature that tells the HMR system to do a full remount rather than trying to hot-patch — this clears the stuck `RefreshRuntime` reference.

Both changes are trivial single-line additions with no functional impact.

