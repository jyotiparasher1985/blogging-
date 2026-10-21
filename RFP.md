# REQUEST FOR PROPOSAL (RFP)

**Project:** Development of "NewsScope" — News Portal + Blog Website
**RFP No.:** NS/RFP/2026/001
**Date of Issue:** 20 October 2026
**Issued By:** Client (Individual / Small Business)
**Submission Deadline:** 10 November 2026 (11:59 PM IST)

---

## 1. Introduction & Background

The Client wishes to develop a modern, responsive **news portal + blogging website** named **NewsScope**. The site combines:

- **A news-magazine homepage layout** (hero story, latest updates sidebar, trending section, category blocks), and
- **A long-form blog article layout** (table of contents, comparison tables, FAQ, citations, reading progress bar).

The current prototype is built with **React 19 + Vite 6 + React Router 7** as an SPA. Vendors may either **improve/extend the existing prototype** or propose an equivalent implementation from scratch — both approaches will be evaluated equally.

> **Important:** The Client requires an **original design and original content**. Pixel-identical cloning of any third-party website (e.g., Business Insider, Marketing Scoop), their logos, brand names, or article text is **prohibited** (copyright/IP constraints). Design "inspired by" general news-portal layout patterns is acceptable.

---

## 2. Project Objective

Deliver a production-ready website with:

1. Clean, modern catalog-quality UI (spacing, typography, spacing rhythm).
2. Fast load (static assets, no heavy frameworks beyond listed ones).
3. Full mobile/tablet/desktop responsiveness.
4. Easy content management for a non-technical Editor (data-file driven).
5. Deployment-ready configuration (free-tier hosting compatible).

---

## 3. Scope of Work (Functional Requirements)

### 3.1 Global Layout (all pages)

| # | Section | Requirement |
|---|---------|-------------|
| G1 | **Announcement Bar** | Thin top strip with one promotional link; CMS-editable text |
| G2 | **Top Bar — Date strip (Left)** | Current date auto-updates daily from system date; format: `Weekday, DD Month YYYY` (en-IN locale) |
| G3 | **Top Bar — Social strip (Right)** | 4 circular icon buttons — Facebook, X, Instagram, YouTube; brand-accurate SVG icons; **real URLs** (open in new tab); hover: accent color + lift; invisible tooltips + ARIA labels |
| G4 | **LIVE indicator** | Red pulsing dot + "BREAKING" label; blinking animation; link configurable |
| G5 | **Masthead** | Logo (mark + wordmark + tagline), search toggle with popover, theme toggle, primary CTA button |
| G6 | **Nav Bar** | Sticky category navigation; active-route highlighting incl. query-param routes; smooth horizontal scroll on mobile |
| G7 | **Breaking Ticker** | Right-to-left marquee with pause-on-hover; must not overlap its label (fixed viewport pattern) |
| G8 | **Dark / Light Mode** | Toggle in nav; preference persisted in `localStorage`; CSS variables (no, `!important` hacks) |
| G9 | **Newsletter Band** | Email capture form with success feedback (with validation; storage integration optional — see 3.4) |
| G10 | **Footer** | 4-column links, brand block, legal strip; copyright year auto-updates |
| G11 | **Back-to-top** | Floating button appears after 600px scroll |
| G12 | **Top News Today banner** | Homepage hero-buyer banner with latest news headlines syndicated from an official source RSS feed (e.g., NDTV): headlines shown as **title + link to original article** with "via" attribution + fetch timestamp. Daily refresh policy documented (manual or scheduled workflow). **IP rule: third-party article text/photos must NOT be copied at any time — banner art is the project's own placeholder/original work** |
| G13 | **License-free imagery** | Har demo image slot me real photo dikhni chahiye. Source: **Unsplash (Unsplash License — commercial + adaptation allowed, no permission needed)**, files **self-hosted** under `public/img/` (build copies to `dist/img/`) — **zero runtime external CDN requests** (T5 offline rule compliant). Koi bhi third-party copyrighted photo hotlink/render nahi hogi. Photo missing ho to component gradient fallback pe gracefully degrade kare |

### 3.2 Page-level Requirements

| # | Page | Requirements |
|---|------|--------------|
| P1 | **Homepage** (`/`) | Hero article + "Latest Updates" sidebar (5 items, timestamps) · Trending Top 6 (numbered) · 3 category blocks (3 cards each) · all cards link to article routes |
| P2 | **Blog listing** (`/blog`) | Post grid with **category filter chips** (All / Platforms / SEO / AI / Monetization / Tech) · **client-side search** via `?q=` param (from masthead search) · empty-state message · static pagination |
| P3 | **Article** (`/article/:slug`) | Breadcrumb · kicker · title · author/date/read-time meta · hero placeholder art · **flagship article**: Key-Takeaways box, 17-row comparison table (horizontal-scroll safe on mobile), FAQ accordion, "Quick picks", sources/citations list (external links) · sticky sidebar TOC + related links · reading progress bar · prev/next navigation · author box · fallback body template for non-flagship posts |
| P4 | **404 Page** | Custom friendly not-found page |

### 3.3 Content Model (Editor-friendly)

- **All content driven by a single data file** (`src/data/posts.js`): posts, latest updates, platform table data, FAQs, citations, site nav.
- Adding a new blog post must require **no component changes** — only one data entry.
- 10 numbered gradient placeholder templates (`ph-1` … `ph-10`) used for artwork — **no external image/CDN dependencies**.

### 3.4 Optional Add-ons (quote separately)

- Newsletter integration (Mailchimp / Brevo / ConvertKit).
- Real CMS or Markdown-based content pipeline.
- Contact form with backend endpoint.
- SEO module: meta tags per route, Open Graph, sitemap.xml, robots.txt.
- Analytics (GA4 / Plausible).

---

## 4. Technical Requirements

| # | Area | Requirement |
|---|------|-------------|
| T1 | Framework | React 19+, Vite 6+, React Router 7+, JavaScript or TypeScript |
| T2 | Architecture | SPA with client-side routing; scrolling restored to top on route change |
| T3 | Styling | Plain CSS (one `index.css`) or CSS Modules — no large UI kits (MUI/AntD) without justification |
| T4 | Icons | Inline SVG components — **no icon-font or CDN** |
| T5 | Offline capability | Site must render fully LAN/offline (no runtime external requests except outbound article links) |
| T6 | Accessibility | Semantic HTML, keyboard-operable controls, focus-visible styles, ARIA on icon-only controls |
| T7 | Performance targets | Lighthouse ≥ 90 Performance / Best Practices / SEO on production build |
| T8 | Browser support | Latest 2 versions: Chrome, Edge, Firefox, Safari |
| T9 | Build | `npm run build` must produce a clean `dist/`; zero console errors/warning on load |
| T10 | Deployment | ✅ **DONE (21 Oct 2026)** — Firebase Hosting pe live (`https://blogging-5760b.web.app`), project `blogging-5760b`; `firebase.json` SPA rewrite se deep links direct kaam karte hain; cache headers (assets immutable 1y, images 7d). Alternative: Netlify/Vercel/GitHub Pages + SPA fallback note |

---

## 5. Deliverables

1. Source code (public or private repository access, commit history included).
2. `README.md`: install/run/build instructions, folder map, add-post guide (provided baseline must be preserved + improved).
3. Production build.
4. Deployed staging URL.

---

## 6. Out of Scope

- Backend user accounts / login.
- Third-party copyrighted content. All sample content must be original or licensed, or plausible, and details must permit full commercial use and modification by the Client.
- Comments moderation UI, ad-server integration.

---

## 7. Quality Bar — Do / Don't

**Do:** steady cross-page visual consistency · accessible alt/ARIA · responsive breakpoints at ~1000px and ~640px · graceful overflow handling (tables) · duration ≤ 2s perceived load.

**Don't:** bundle unpurged multi-KB icon fonts · deprecated package APIs · console errors on load · blocking external CDNs · copying third-party design element-for-element.

---

## 8. Vendor Proposal Format

Proposals must include:

1. **Cover letter** (≤ 1 page).
2. **Technical approach** (component architecture, state, styling decisions).
3. **Portfolio**: 2–3 relevant links (news/blogging layouts preferred).
4. **Timeline**: weekly milestones from kickoff to handover.
5. **Effort & cost**: (a) & (b) separately — quote "Extend prototype" and "Fresh build" — plus per-optional-add-on rates and hourly rate for minor change requests.
6. **Team profile**: count of full-time persons on this job, availability (IST hours for status calls).

---

## 9. Evaluation Criteria (100 points)

| Criterion | Weight |
|-----------|--------|
| Visual/UX quality of provided sample or live portfolio | 25 |
| Technical approach (React/SPA architecture, maintainability) | 25 |
| Cost reasonableness | 20 |
| Timeline reliability (weekly demo cadence) | 15 |
| Prior similar work / references | 10 |
| Communication clarity of the proposal itself | 5 |

---

## 10. Timeline & Payment Terms (Suggested Baseline)

| Milestone | Target | Deliverable | Payment |
|-----------|--------|-------------|---------|
| M1 | Week 1 | Art direction / component redesign demo(s) | 20% |
| M2 | Week 2–3 | Pages: Home + Blog + Article (all G/P items) | 30% |
| M3 | Week 4 | Content wiring, dark mode, accessibility, QA | 30% |
| M4 | Week 5 | Deployment + handover + docs | 20% |

Payment weeks run from kickoff. Client holds the right to trim optional add-ons without penalty. Payment via UPI/bank transfer.

---

## 11. Legal & IP Terms (Mandatory)

1. **IP assignment:** Upon final payment, all custom design, code, and content become Client property (source files included).
2. **Originality:** Vendor certifies no third-party copyrighted material (logos, brand assets, article text, cloned visuals) is present. General layout conventions of news sites are fine.
3. **Confidentiality:** Proposal details held private during evaluation.
4. **License audit trail:** Icon/asset sources documented (per-file) — public-domain or equivalent commercial licenses only.

---

## 12. Clarifications & Submission

- **Queries (email only):** rfp@yourproject-domain.example
- **Submission:** PDF + link to portfolio/code samples via email, subject line: `NS/RFP/2026/001 — Proposal — [Vendor Name]`
- **Response window:** 3 business days for written clarifications.
- The Client reserves the right to reject any/all proposals, split scope between vendors, or extend the deadline without providing reasons.

---

*Annexure A: Current prototype walkthrough (Home / Blog / Article screenshots) — available at https://localhost:5173 during the development/test phase; hosted demo link on request.*
