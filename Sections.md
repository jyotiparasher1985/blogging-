# NewsScope — Page Anatomy (Section-wise)

> Screenshot: dark-mode homepage (21 Oct 2026). Har section ↔ component file ↔ CSS class ↔ RFP/TestCase mapping.

## Screenshot me dikhne wale sections (top → bottom)

| # | Section | Component / File | CSS (index.css) | RFP | Test |
|---|---------|------------------|-----------------|-----|------|
| 1 | **Announcement Bar** — 📣 "New: Our 2026 blogging platform deep-dive is live → read the full comparison" | `Layout.jsx` (Announce bar) | `.announce`, `.announce-link` | G1 | TC-03 |
| 2 | **Top Bar** (date + social strip) — left: "Wednesday, 21 October 2026" · right: 4 circle social icons (Facebook, X, Instagram, YouTube) + ● LIVE badge | `Top Bar/TopBar.jsx` (user folder) | `.topbar`, `.social-link` | G2, G3, G4 | TC-01, TC-02 |
| 3 | **Masthead / Header** — N logo tile (gradient) + wordmark **NewsScope** (navy→orange) + tagline "INSIGHT · ANALYSIS · STORIES" · right: search button + orange **Daily Briefing 📧** CTA | `Layout.jsx` (Masthead) | `.masthead`, `.logo`, `.cta-nav` | G5 | TC-07 |
| 4 | **NavBar** — dark strip: 🌙 theme toggle (left) · HOME / BLOG / PLATFORMS / TECHNOLOGY / BUSINESS / AI & CREATORS (HOME active — orange underline) · right: ● **BREAKING** | `Layout.jsx` (NavBar) | `.navbar`, `.nav-link`, `.theme-btn` | G6, G8 | TC-04, TC-10, TC-12 |
| 5 | **Breaking Ticker** — orange "BREAKING" tab + scrolling items: "…code, category filters and reading progress built in — no plugins required • Deploy free on GitHub Pages, Netlify or Vercel in minutes • All sample content is original — swap in your own st…" | `Layout.jsx` (Ticker) | `.ticker`, `.ticker-track` (CSS scroll animation) | G7 | TC-12 |
| 6 | **Top News Today banner** — section title ▶ + "via NDTV ↗" attribution (right) · gradient hero card: `LIVE · WORLD SUMMIT ·· 15:11 IST` chip, headline "Microsoft India Head To Talk About 'Building New Economy' At NDTV World Summit", "Full story on NDTV.com ↗" link · uske neeche timestamped headline strip (14:55, 14:54 …) | `Home.jsx` (news section) · data: `NEWS`, `NEWS_SOURCE` (posts.js) | `.news-banner`, `.news-hero`, `.news-strip` | G12 | TC-15, TC-16 |

## Is screenshot ke neeche aage wale sections (aage scroll pe)

| # | Section | Component / File | CSS | RFP | Test |
|---|---------|------------------|-----|-----|------|
| 7 | **Hero article + Latest Updates sidebar** | `Home.jsx` | `.hero-grid`, `.hero-main`, `.sidebar` | P1 | TC-05 |
| 8 | **Trending Now** (numbered list) | `Home.jsx` | `.trending` | P1 | TC-05 |
| 9 | **Category blocks** (Technology / Business & Marketing / AI & Creators — photo cards) | `Home.jsx`(Card) | `.sec`, `.card`, `.card-media` | P1, G13 | TC-05, TC-17 |
| 10 | **Newsletter band** — "The Daily Briefing, in your inbox by 8 AM" + email input + Subscribe | `Layout.jsx` (Newsletter) | `.newsletter` | G9 | TC-11 |
| 11 | **Footer** — brand block + SECTIONS / COMPANY / LEGAL columns + legal strip | `Layout.jsx` (Footer) | `.footer` | G10 | — |
| 12 | **Floating: Back-to-top button** (600px scroll ke baad) | `Layout.jsx` | `.to-top` | G11 | TC-12 |
| 13 | **Article page extras** (`/article/:slug`) — Breadcrumb · kicker · title · meta · hero photo (G13) · Key-takeaways · 17-row table · FAQ accordion · TOC sidebar · progress bar · author box | `Article.jsx` | `.article-*`, `.ph img` | P3, G13 | TC-08, TC-09, TC-17 |

## Dark-mode note (screenshot se)

- Sections 4–6 (nav, ticker, news banner) dark-mode me deep navy background pe render ho rahe ✅
- Section 1 (Announcement Bar) dark mode me bhi light/lavender dikhta hai — ye **intentional** nahi lagta, potential **dark-mode color mismatch** (`.announce` ka dark variant check ho — G8/TC-10 edge). Next requirement me fix flag kiya jaa sakta hai.
