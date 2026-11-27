# ToolNest – Free Online Tools

ToolNest is a fast, SEO-optimized, statically prerendered online tools platform built with React, TypeScript, Vite, and Tailwind CSS. All 28 interactive utilities run locally in the user's browser with zero account sign-ups required.

---

## 1. Project Structure

```text
├── .github/workflows/deploy.yml # GitHub Pages static build & prerender workflow
├── public/
│   ├── 404.html                 # Fallback SPA redirect for unknown subpaths
│   ├── favicon.svg              # Editorial brand SVG icon
│   └── robots.txt               # Default crawl directives (updated at build time)
├── scripts/
│   └── prerender.mjs            # Emits 40 static HTML pages + sitemap.xml + robots.txt
├── src/
│   ├── config/
│   │   ├── adsense.ts           # Centralized Google AdSense publisher & slot IDs
│   │   └── site.ts              # Production domain & contact form endpoint config
│   ├── data/
│   │   ├── categories.ts        # 5 category definitions + SEO metadata
│   │   └── tools.ts             # All 28 tool definitions, SEO tags, FAQs & guides
│   ├── components/              # Header, Footer, SearchBar, SeoHead, AdSlot, ToolCard
│   ├── tools/
│   │   ├── ToolRegistry.tsx     # Lazy code-split loader for all 28 interactive tools
│   │   ├── text/                # 7 Text Tools
│   │   ├── student/             # 6 Student Tools
│   │   ├── youtube/             # 5 YouTube Tools
│   │   ├── calculator/          # 6 Calculator Tools
│   │   └── image/               # 4 Client-Side Canvas Image Tools
│   ├── pages/                   # Home, AllTools, Category, Tool, About, Contact, Legal
│   ├── utils/
│   │   ├── router.tsx           # SSR-safe History API router
│   │   ├── theme.tsx            # Light/Dark editorial theme context
│   │   └── toolCalculations.ts  # Pure, unit-tested business & math logic
│   ├── App.tsx                  # Code-split client router shell
│   └── entry-server.tsx         # Static prerendering entry point & 40-route manifest
├── tests/
│   └── toolCalculations.test.ts # Automated unit tests (bun test)
├── index.html
└── vite.config.ts
```

---

## 2. Environment Configuration

Copy `.env.example` to `.env` (never commit secrets) and configure your production variables:

```env
# Your live canonical origin (no trailing slash)
VITE_SITE_URL="https://yourdomain.com"

# Public HTTPS static form endpoint (e.g., Formspree https://formspree.io/f/xxxxxxxx)
VITE_CONTACT_FORM_ENDPOINT="https://formspree.io/f/your-form-id"

# Optional support email displayed on Contact and Privacy Policy pages
VITE_CONTACT_EMAIL="support@yourdomain.com"
```

### Contact Form Setup (Free Tier)
1. Create a free account at [Formspree](https://formspree.io/) or [Web3Forms](https://web3forms.com/) and create a new form.
2. Copy the HTTPS form endpoint URL (e.g., `https://formspree.io/f/abcdefgh`).
3. Set `VITE_CONTACT_FORM_ENDPOINT` in your `.env` (locally) or in GitHub **Settings → Secrets and variables → Actions → Variables**.
4. Keep your Formspree/Web3Forms dashboard settings restricted to your production domain (`yourdomain.com`) to prevent third-party form abuse.

---

## 3. Run Locally & Test

Prerequisites: **Node.js 20+** and **npm** (plus **Bun** for running unit tests).

```bash
# 1. Install dependencies cleanly from package-lock.json
npm ci

# 2. Run unit tests
bun test

# 3. Start local dev server (port 3000)
npm run dev

# 4. Type-check and build all 40 statically prerendered pages
npm run lint
npm run build
```

Production static HTML files (`dist/index.html`, `dist/word-counter.html`, `dist/cgpa-calculator.html`, etc.), assets, and `robots.txt` are generated inside `dist/`. When `VITE_SITE_URL` is set to your production domain, `npm run build` also enables indexing (`index, follow`), emits canonical URLs, and generates `dist/sitemap.xml`.

---

## 4. Deploy to GitHub Pages

ToolNest includes `package-lock.json` and `.github/workflows/deploy.yml` configured for GitHub Actions + automatic base-path detection + static prerendering.

1. Push your repository to GitHub (`main` branch).
2. Open **Repository → Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
3. Open **Repository → Settings → Secrets and variables → Actions → Variables** and add:
   - `VITE_SITE_URL`: your live URL (e.g., `https://yourdomain.com` or `https://<username>.github.io/<repo-name>`)
   - `VITE_CONTACT_FORM_ENDPOINT`: your Formspree HTTPS endpoint URL
   - `VITE_CONTACT_EMAIL`: your public support email
4. Push to `main` (or trigger **Actions → Deploy ToolNest to GitHub Pages → Run workflow**).

> **Note on Subpaths vs Custom Domain**: The workflow uses `actions/configure-pages@v5` to automatically detect `VITE_BASE_PATH` so CSS, JS, favicon, and links work both on `https://<username>.github.io/<repo-name>/` and on a root custom domain (`https://yourdomain.com`).

---

## 5. Connect a Custom Domain & Google Search Console

1. Purchase your domain from a registrar (Cloudflare, Namecheap, Porkbun, etc.).
2. Create `public/CNAME` containing only your domain name (e.g., `yourdomain.com`).
3. Configure DNS records at your registrar:
   - Apex `A` records pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - `www` `CNAME` record pointing to `<your-github-username>.github.io`.
4. In GitHub **Settings → Pages → Custom domain**, enter your domain, save, and enable **Enforce HTTPS**.
5. Set `VITE_SITE_URL="https://yourdomain.com"` in GitHub Actions Variables and re-run the deploy workflow so canonical tags, `robots.txt`, and `sitemap.xml` match your live domain.
6. In **Google Search Console**, add your domain property via DNS TXT verification, inspect the homepage and key tool URLs, and submit `https://yourdomain.com/sitemap.xml`.

---

## 6. Integrate Google AdSense After Approval

ToolNest ships with CLS-safe ad placeholders in `src/components/AdSlot.tsx` and centralized settings in `src/config/adsense.ts` (`enabled: false` by default).

1. **Before Applying**: Ensure your custom domain is live over HTTPS, `VITE_CONTACT_EMAIL` and `VITE_CONTACT_FORM_ENDPOINT` are active, and all pages return HTTP `200 OK`.
2. **Add `ads.txt`**: Create `public/ads.txt` with the exact line provided in your AdSense account:
   ```text
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```
3. **Add AdSense Script to `index.html`**: Insert your publisher `<script async>` tag inside `<head>` of `index.html`.
4. **Enable Live Units in `src/config/adsense.ts`**:
   - Set `enabled: true`
   - Replace `publisherId` with your `ca-pub-XXXXXXXXXXXXXXXX`
   - Replace each slot ID (`homeTopBanner`, `homeMidBanner`, `toolSidebarRect`, `toolBottomBanner`) with real Ad Unit IDs from your AdSense dashboard.
5. **Rebuild & Deploy**: Push your changes so GitHub Actions regenerates all prerendered pages with the live ad slots.
