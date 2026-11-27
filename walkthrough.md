# Security Summary

## Reviewed Files & Scope
- `src/config/site.ts` — URL and contact endpoint validation (`isValidHttpsEndpoint`, `getCanonicalOrigin`)
- `src/config/adsense.ts` & `src/components/AdSlot.tsx` — AdSense slot activation safeguards
- `src/pages/ContactPage.tsx` — Static HTTPS contact form validation, spam honeypot, and error handling
- `src/utils/toolCalculations.ts` — Numeric, date-span, and text-processing boundary checks
- `src/tools/calculator/*.tsx`, `src/tools/student/*.tsx`, `src/tools/youtube/*.tsx`, `src/tools/text/*.tsx` — Interactive tool components
- `src/tools/image/{imageUtils,ImageCompressor,ImageResizer,JpgToPngConverter,PngToJpgConverter}.tsx` — Client-side File/Canvas processing and Blob URL lifecycle
- `scripts/prerender.mjs` — Build-time HTML/XML attribute escaping and `<script type="application/ld+json">` serialization
- `package.json` & `bun.lock` — Dependency audit (`bun audit`: 0 vulnerabilities across 261 packages)

## Safeguards Verified
- **Client-Side Secret Hygiene**: No API keys, OAuth client secrets, or credentials exist in frontend code or `.env.example`; contact delivery uses a public HTTPS form submission endpoint configured via `VITE_CONTACT_FORM_ENDPOINT` with `isValidHttpsEndpoint()` restricting submissions strictly to `https://`.
- **Safe HTML & Serialization**: `scripts/prerender.mjs` escapes HTML attributes (`escapeAttr`) and XML nodes (`escapeXml`), and escapes `<` as `\u003c` inside JSON-LD `<script>` tags to prevent script-tag breakout. No `dangerouslySetInnerHTML`, `eval`, or raw HTML insertion is used.
- **Resource & Algorithmic DoS Prevention**:
  - `calculateDateDifference` replaced an $O(n)$ day-by-day iteration loop with $O(1)$ modulo week/day arithmetic (`src/utils/toolCalculations.ts:857–869`), eliminating browser hangs on wide multi-century date spans.
  - `calculateLoan` caps loan tenure at 600 months (50 years) and validates rate/principal bounds (`src/utils/toolCalculations.ts:744–767`).
  - `validateResizeDimensions` enforces 1–8,000 px integer bounds before allocating HTML5 `<canvas>` buffers (`src/utils/toolCalculations.ts:1150–1160`), and `loadImageFromFile` enforces `image/*` MIME prefixes and a 50 MB file size cap (`src/tools/image/imageUtils.ts:18–25`).
- **Blob URL Memory Safety**: Fixed premature `URL.revokeObjectURL` cleanup in `JpgToPngConverter.tsx` and `PngToJpgConverter.tsx` using ref-tracked URL sets so active previews/downloads remain valid while still releasing memory on item deletion or unmount.
- **AdSense Placeholder Guard**: `AdSlot.tsx` refuses to render live `<ins class="adsbygoogle">` markup unless `ADSENSE_CONFIG.enabled` is true and both `publisherId` and `slotId` differ from template defaults.

## PoC Verification

### 1. Date Span Performance & DoS Boundary
- **Vulnerability**: Wide date intervals (e.g., `1926-01-01` to `2026-01-01`) previously executed a 36,525+ iteration loop inside React `useMemo`.
- **Verification**: Executed `bun test` (`tests/toolCalculations.test.ts`): `"Date Difference Calculator handles inclusive dates and O(1) weekday counts"` passed in `0.32ms`, verifying century-scale spans compute `years: 100` in constant time without UI blocking.

### 2. Endpoint Scheme Validation & Attribute Escaping
- **Verification**: Static inspection confirms `isValidHttpsEndpoint` rejects `http://`, `javascript:`, or malformed URLs in `src/config/site.ts:22–30`, and `scripts/prerender.mjs` escapes `<` inside inline JSON-LD and escapes quotes/brackets in meta tags across all 40 prerendered routes.
