# TASK CASE DOCUMENT

**Project:** NewsScope — News Portal + Blog Website
**Document:** Use-Case / Task Specifications
**RFP Reference:** NS/RFP/2026/001 (`RFP_NewsScope_Website.md`)
**Date:** 20 October 2026
**Status:** v1.0

**Actors / Roles used throughout:**
- **Visitor** — anonymous reader (primary actor)
- **Editor** — site ka content owner (non-technical; sirf data file edit kar sakta hai)
- **System** — React SPA runtime (client-side)
- **External Site** — Facebook / X / Instagram / YouTube (secondary actor)

---

## TC-01 — Current Date Display (Date Bar)

| Field | Detail |
|---|---|
| **Actor** | Visitor, System |
| **Precondition** | Koi bhi page khula ho |
| **Main Flow** | 1. System page render karta hai → 2. Top Bar left me system date se `Weekday, DD Month YYYY` (en-IN) format banata hai → 3. Visitor ko dikh jaata hai |
| **Alternate** | A3: Locale unsupported — fallback `Default (browser) locale` |
| **Postcondition** | Date har din apne aap change hoti hai (koi manual edit nahi) |
| **Data** | `new Date().toLocaleDateString("en-IN", { weekday:"long", year:"numeric", month:"long", day:"numeric" })` |
| **Files** | `Top Bar/TopBar.jsx`, `#topbar-date` |

## TC-02 — Social Circle Icons + External Links

| Field | Detail |
|---|---|
| **Actor** | Visitor, External Site |
| **Precondition** | Top Bar visible |
| **Main Flow** | 1. Visitor Top Bar right me 4 circle icons dekhta hai (f, X, Instagram, YouTube) → 2. Hover: circle par accent border + lift + tooltip (platform naav) → 3. Click: platform ka real URL **naye tab** me khulta hai |
| **Alternate** | A1: Pop-up blocker — new tab blocked, browser handle karta hai (target=_blank standard) |
| **Rules** | Har icon button `aria-label` + `title` rakhta hai (screen-reader & tooltip access) |
| **Data** | `https://www.facebook.com/`, `https://x.com/`, `https://www.instagram.com/`, `https://www.youtube.com/` |
| **Files** | `Top Bar/TopBar.jsx`, `.social-link` CSS |

## TC-03 — Announcement Bar Link

| Field | Detail |
|---|---|
| **Actor** | Visitor, System |
| **Main Flow** | 1. Har page top me announcement strip dikhti hai → 2. Click link → flagship article route khulta hai |
| **Notes** | CMS-edit karne ke liye Editor text badal sakta hai (Layout constant) |

## TC-04 — Site Navigation (Category Nav)

| Field | Detail |
|---|---|
| **Actor** | Visitor |
| **Precondition** | Sticky nav on-screen |
| **Main Flow** | 1. Visitor category click karta hai (Home/Blog/Platforms/Technology/Business/AI & Creators) → 2. SPA route change hota hai (page reload **nahi**) → 3. Scroll position top restore → 4. Active link highlight (accent color + border) |
| **Alternate** | A1: Query-param route (`/blog?cat=tech`) — sirf matching link highlight ho, baaki nahi (fixed behavior) |
| **Files** | `src/components/Layout.jsx`, `NavBar` |

## TC-05 — Read Homepage News Feed

| Field | Detail |
|---|---|
| **Actor** | Visitor |
| **Main Flow** | 1. Visitor `/` kholta hai → 2. Hero flagship article (title, summary, meta) dikhta hai → 3. Latest Updates sidebar (5 items, timestamps) → 4. Trending Top 6 (numbered) → 5. 3 category blocks (3 cards each) → 6. Kisi bhi card click → Article route |
| **Alternate** | A1: Flagship data missing → section khali na ho, graceful placeholder dikhe |
| **Data Source** | `src/data/posts.js` → `POSTS`, `LATEST` |

## TC-06 — Filter Blog by Category

| Field | Detail |
|---|---|
| **Actor** | Visitor |
| **Main Flow** | 1. Visitor `/blog` kholta hai → 2. 6 filter chips dikhte hain (All/Platforms/SEO/AI/Monetization/Tech) → 3. Chip click → grid sirf usi `cat` ke posts filter karta hai → 4. URL `?cat=...` update → 5. Chip active state |
| **Alternate** | A1: 0 results → empty-state message + "Show all" link |
| **Business Rule** | Filter client-side hai (data-file se filter hota hai; koi backend nahi) |
| **Files** | `src/pages/Blog.jsx`, `src/data/posts.js` |

## TC-07 — Search Posts

| Field | Detail |
|---|---|
| **Actor** | Visitor |
| **Main Flow** | 1. Masthead search icon click → popover khulta hai → 2. Query type + Enter → `/blog?q=...` khulta hai → 3. title/desc/author me substring match → grid filter |
| **Alternate** | A1: khaali result → empty state (TC-06 A1 jaise) |
| **Files** | `Layout.jsx` (search popover), `Blog.jsx` (read `q` param) |

## TC-08 — Read Article (Full Task Flow)

| Field | Detail |
|---|---|
| **Actor** | Visitor |
| **Main Flow** | 1. Card/article link click → `/article/:slug` → 2. Breadcrumb + kicker + title + author/meta + hero → 3. **Flagship guide**: Key-Takeaways box → prose sections → 17-row comparison table (mobile pe horizontal-scroll safe) → FAQ accordion (expand/collapse) → Quick picks → Sources & citations (external, new tab) → 4. Sidebar: TOC anchor links + related posts (sticky) → 5. Bottom: prev/next cards + Author box |
| **Alternate** | A1: `slug` DB me nahi mila (route galat) → redirect `/404` (custom not-found page) → 2<br>A2: Non-flagship slug (placeholder-body wala post) → generic body render ("add your body in posts.js" note include) |
| **Reading UX** | Top progress bar scroll ke saath badhta hai (0–100%) |
| **Data Source** | `PLATFORMS`, `FAQS`, `CITATIONS`, `QUICK_PICKS`, `POSTS[].slug` |

## TC-09 — FAQ Accordion

| Field | Detail |
|---|---|
| **Actor** | Visitor |
| **Main Flow** | 1. Article FAQ section tak scroll → 2. Paired `+`/`−` toggle se answers open/close → 3. Sirf pehla item default open |
| **Files** | `FlagshipBody` inside `Article.jsx` |

## TC-10 — Dark / Light Mode Toggle

| Field | Detail |
|---|---|
| **Actor** | Visitor, System |
| **Main Flow** | 1. Nav me moon-icon button click → 2. `<html data-theme>` toggles (`light`↔`dark`) → 3. Preference `localStorage("newscope-theme")` me persist → 4. Next visit pe restore |
| **Alternate** | A1: localStorage blocked (e.g. private mode) → session-only apply (no error) |
| **Files** | `Layout.jsx` (`setDark`), CSS variables in `index.css` |
| **Bug fix (21 Oct 2026)** | Dark mode me `.announce` + `footer` light lavender ho jate the (root cause: `--primary-dark` variable dark theme me text-color ke liye `#c7d3f5` redefine hota hai, in dono ne usi ko background maan liya). **Fix:** dedicated `--navy` variable (`#1d2949` light / `#0d1322` dark) — dono themes me solid navy + white text |
| **Evidence** | `Evidence/tc10-darkmode-fixed-full.jpg` (dark full-page via `--load-storage`), `Evidence/tc03-announce-light-regression.jpg` (light regression) — DOM-verified: dark `rgb(13,19,34)`, light `rgb(29,41,73)`, text white ✅ |

## TC-11 — Newsletter Subscribe

| Field | Detail |
|---|---|
| **Actor** | Visitor / Editor |
| **Main Flow** | 1. Footer se pehle newsletter band dikhta hai → 2. Visitor email type + Subscribe → 3. Browser HTML5 validation → 4. Success message (✓ confirm dialog code) → 5. Input clear |
| **Alternate** | A1: Regex invalid → native validation bubble, submit block |
| **Out of Scope** | Actual Mailchimp/Brevo push (RFP 3.4 optional add-on) |

## TC-12 — Scroll Utilities (Back-to-top + Sticky Nav)

| Field | Detail |
|---|---|
| **Main Flow** | 1. Visitor 600px+ scroll → back-to-top button fade-in → 2. Click → smooth top → 3. Nav 140px+ scroll par sticky shadow on |
| **Files** | `Layout.jsx`, CSS `.to-top`, `.nav-bar.stuck` |
| **Evidence (21 Oct 2026)** | `Evidence/TC-12_back-to-top.png` — DOM-verified flow: top pe button DOM me hi nahi (`toTopInDOM: false`, `navStuck: false`) → 1200px scroll → button render + opacity 1, `nav-bar.stuck` + shadow on ✅ |

## TC-13 — Editor Adds a New Post

| Field | Detail |
|---|---|
| **Actor** | Editor (primary), System |
| **Precondition** | Repo cloned, `npm run dev` chal raha |
| **Main Flow** | 1. Editor `src/data/posts.js` kholta hai → 2. `POSTS` array me new object add: `{ slug, title, desc, cat, catLabel, author, date, readTime, ph }` → 3. Save → Vite HMR turant refresh → 4. Naya card blog grid me dikhta hai (koi component change nahi) |
| **Alternate** | A1: `cat` unknown — filter chips me na dikha (allowed categories: platforms, seo, ai, money, tech) <br>A2: Full body daalna ho → `Article.jsx` me body extend (flagship pattern) |
| **Business Rule** | **Content management koi backend nahi — data-file driven (Editor-friendly constraint RFP §3.3)** |

## TC-14 — Production Build & Deploy

| Field | Detail |
|---|---|
| **Actor** | Editor |
| **Main Flow** | 1. `npm run build` → clean `dist/` → 2. `npm run preview` local check → 3. Netlify/Vercel pe drag-drop / repo connect → live URL |
| **Alternate** | A1: GitHub Pages pe deep-link 404 → SPA fallback config ya homepage se navigate (README documented) |
| **Quality Gate (RFP §4)** | Zero console errors/warnings · Lighthouse ≥ 90 · offline render OK (no runtime CDN dependency) |
| **Evidence (21 Oct 2026 — LIVE)** | Firebase Hosting deploy (project `blogging-5760b`): `✓ Deploy complete!` → live checks: `/` → `200 text/html` · deep link `/article/best-blogging-platforms-2026` → `200` (SPA rewrite ✅) · `/img/platforms-writing.jpg` → `200 image/jpeg` ✅ · screenshots: `Evidence/tc14-live-firebase.jpg` + `Evidence/tc14-live-deeplink.jpg` |

---

## TC-15 — "Top News Today" Hero Banner (requirements ka implementation)

| Field | Detail |
|---|---|
| **Actor** | Visitor, External Site (NDTV) |
| **Precondition** | `src/data/posts.js` me `NEWS` + `NEWS_SOURCE` entries populated |
| **Main Flow** | 1. Visitor homepage kholta hai → 2. "Top News Today" section: **hero banner** (largest/latest headline, LIVE kicker, time) → 3. Click → **original article NDTV pe naye tab me** → 4. Neeche **strip** me remaining 5 headlines (time · headline · tag ↗) → 5. Attribution note visible ("via NDTV's official RSS feed") |
| **Alternate** | A1: RSS unreachable → stale headlines dikhengi + fetchedAt timestamp reader ko batata hai kitne fresh hai |
| **Data Source** | `NEWS_SOURCE` (site/feed URLs) + `NEWS[]` (headline/title, original url, time, tag) |
| **IP Rule (RFP G12)** | ❌ NDTV ke article text/photos copy NAHI · ✅ sirf headline titles + links + "via" credit · banner art apna (gradient placeholders) |

## TC-16 — Daily News Refresh

| Field | Detail |
|---|---|
| **Actor** | Editor (manual) ya GitHub Action (scheduled) |
| **Main Flow** | 1. `NEWS_SOURCE.feedUrl` pe request → official NDTV RSS XML → 2. Latest `<item>`s se **title + link + pubDate** nikalo → 3. `NEWS` array update (fetchedAt bhi) → 4. Site rebuild/deploy |
| **Alternate** | A1: Feed fetch blocked (bot protection — dekha gaya `Evidence/NDTV-homepage.pdf` Access-Denied) → official RSS endpoint use karo (jo syndication ke liye intended hai) |
| **Policy** | Har entry original article ka link rakhti hai; aggregated content ka credit mandatory |

## TC-17 — License-free Images (self-hosted)

| Field | Detail |
|---|---|
| **Requirement** | RFP G13 — har image slot me copyright-free photo |
| **Preconditions** | `public/img/` me 9 Unsplash-licensed JPEGs (downloaded 21 Oct 2026, w=1200 q=70) |
| **Steps** | 1. `src/data/posts.js` me har post ka `img: "/img/<name>.jpg"` → 2. `Placeholder` component img prop dekh kar `<img loading="lazy">` render kare, warna gradient fallback → 3. Home hero + section cards, Blog grid, Article hero — sab surfaces photos dikhayein → 4. `npm run build` → `dist/img/` me 9 files → 5. Network requests sirf localhost origin se |
| **Expected** | 9/9 images render (`naturalWidth > 0`), host `localhost` (no images.unsplash.com runtime request), build pass, missing-file case me gradient fallback |
| **Evidence** | `Evidence/tc17-home-full.jpg` (full-page, 8+ photos visually verified), `Evidence/tc17-home-images.jpg`, `Evidence/tc17-article-images.jpg`, `Evidence/tc17-blog-images.jpg` |
| **Result** | ✅ PASS (21 Oct 2026, production :4173) |
| **License note** | Unsplash License: reproduction, modification aur commercial use allowed without permission; attribution appreciated but not required — credit README + yahan recorded |

## TC-18 — Firebase Migration: Firestore Data + Storage Images

| Field | Detail |
|---|---|
| **Requirement** | RFP G14 — data Firestore me, images Storage me |
| **Setup** | Firestore DB create (CLI, `(default)` @ `asia-south1`) · `scripts/seed-firebase.mjs` (firebase-tools OAuth, cloud-platform scope) |
| **Steps** | 1. `posts.js` data import (ESM) → 2. 63 docs PATCH (REST v1, chunks of 8) → 3. Storage bucket detect/create (2 routes) → 4. 9 images upload → 5. public-read rules release → 6. fetch-back verify |
| **Firestore Result** | ✅ **PASS (21 Oct 2026)** — 63/63 docs written; verify GET `posts/best-blogging-platforms-2026` → 200 + title match |
| **Storage Result** | ⚠️ **BLOCKED (plan policy)** — bucket create 403 "billing account... state absent" (no-cost Spark plan me naye buckets allowed nahi — Google policy). Rules public-read **released** ✅ — bucket banne par turant kaam karega |
| **Fix path** | Console → Billing → Blaze upgrade → `node scripts/seed-firebase.mjs` re-run (bucket + upload auto) |
| **Evidence** | `Evidence/firebase-migration.json` (full dump: collections, counts, verify, upload attempts, rules) |
| **Bug found+fixed** | Run-1 me 63×400 (double-wrapped fields) → fix: top-level object unwrap → run-2 me 63/63 ✅ |

## TC-19 — Breaking Ticker Daily News (G15)

| Field | Detail |
|---|---|
| **Requirement** | RFP G15 — daily breaking news scroll in ticker |
| **Preconditions** | `NEWS` array me 6 fresh headlines (22 Oct 2026, 07:47 IST fetch) + `NEWS_SOURCE.fetchedAt` updated |
| **Steps** | 1. `breaking ticker/BreakingTicker.jsx` me `items` ko NEWS objects support karna (string OR {headline,url,time,tag}) → 2. each item `<a target="_blank">` with `time` prefix + `:focus-visible` outline → 3. `Layout.jsx` me `<BreakingTicker items={NEWS} />` → 4. `index.css` me `.ticker-item` styles → 5. build + dev HMR verify |
| **Expected** | 6 clickable links (`.ticker-item`) render, first href → NDTV article, `aria-hidden` removed (accessible), pause-on-hover + focus outline work |
| **Evidence** | `Evidence/tc19-pre-ticker.png` (static 4-item ticker, before) · `Evidence/tc19-post-ticker.png` (live 6 breaking headlines, light) · `Evidence/tc19-post-ticker-dark.png` (dark mode) · `Evidence/tc19-live-ticker.png` (production `blogging-5760b.web.app` — 6 NDTV links verified) · `Evidence/tc19-fullpage-light.png` · `Evidence/tc19-fullpage-dark.png` |
| **Result** | ✅ PASS (22 Oct 2026, dev `:5173`) — DOM-verified: `links: 6`, `firstHref: ndtv.com/...`, `hasTime: true`, `ariaHidden: null` |
| **IP Rule (G12/G15)** | ❌ NDTV article text/photos copy NAHI · ✅ sirf headline titles + original article links + "via NDTV" credit |

## Traceability Matrix (Requirement → Task Case)

| RFP Requirement | RFP Section | Task Case |
|---|---|---|
| Date auto-update | G2 | TC-01 |
| Circle social icons + real URLs | G3 | TC-02 |
| LIVE / Breaking badge | G4 | TC-02, TC-12 |
| Announcement bar | G1 | TC-03 |
| Masthead search | G5 | TC-07 |
| Nav active + sticky | G6 | TC-04, TC-12 |
| Breaking ticker (no overlap) | G7 | Layout `Ticker` |
| Dark mode persist | G8 | TC-10 |
| Newsletter | G9 | TC-11 |
| Footer | G10 | Layout `Footer` |
| Back-to-top | G11 | TC-12 |
| Home feed | P1 | TC-05 |
| Blog filters + search | P2 | TC-06, TC-07 |
| Article (all blocks) | P3 | TC-08, TC-09 |
| 404 | P4 | TC-08 A1 |
| Data-file content | §3.3 | TC-13 |
| Build & deploy | T10, §5 | TC-14 |
| Top News hero banner (headline links) | G12 | TC-15 |
| Daily headlines refresh + IP/attribution rule | G12 | TC-16 |
| License-free self-hosted images (all slots) | G13 | TC-17 |
| Firebase content mirror (Firestore + Storage) | G14 | TC-18 |
| Breaking Ticker daily breaking news (NDTV RSS) | G15 | TC-19 |

---

**Change Log:** v1.0 — initial 14 task cases + traceability vs RFP. v1.1 — TC-15 (Top News hero banner), TC-16 (daily refresh policy) added; traceability updated. v1.2 — TC-17 (license-free self-hosted imagery, G13) added; traceability updated. v1.3 — bug-fix battery: TC-10 me dark-mode announce/footer fix (`--navy` variable) + TC-12 fresh evidence added. v1.4 — TC-14 LIVE deploy evidence (Firebase Hosting `blogging-5760b`). v1.5 — TC-18 (Firebase migration: Firestore 63/63 ✅, Storage plan-blocked ⚠) added. v1.6 — TC-19 (Breaking Ticker daily news from NDTV RSS, clickable + IP-safe) added.
