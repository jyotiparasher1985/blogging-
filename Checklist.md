# NewsScope — Master Status Checklist

> Updated: 21 Oct 2026 (after bug-fix battery B1 + B2)

## A. RFP Requirements (G-series)
| # | Requirement | Status | Test Case |
|---|---|---|---|
| G1 | Announcement Bar | ✅ Done | TC-03 |
| G2 | Top Bar date strip (auto-update) | ✅ Done | TC-01 |
| G3 | Social circle icons + real URLs | ✅ Done | TC-02 |
| G4 | LIVE / BREAKING indicator | ✅ Done | TC-02, 12 |
| G5 | Masthead (logo, search, theme, CTA) | ✅ Done | TC-07 |
| G6 | Sticky Nav + active highlighting | ✅ Done | TC-04, 12 |
| G7 | Breaking Ticker (no overlap) | ✅ Done | Layout `Ticker` |
| G8 | Dark/Light mode + persist | ✅ Done — B1 announce/footer edge **FIXED** | TC-10 |
| G9 | Newsletter band | ✅ Done | TC-11 |
| G10 | Footer (4-col + legal) | ✅ Done — B1 dark fix | Layout `Footer` |
| G11 | Back-to-top (600px) | ✅ Done | TC-12 |
| G12 | Top News Today banner (NDTV RSS, IP-safe) | ✅ Done | TC-15, 16 |
| G13 | License-free self-hosted images | ✅ Done | TC-17 |
| G14 | Firebase content backend (mirror) | ✅ Done (Firestore 63/63) | TC-18 |
| G15 | Breaking Ticker — daily breaking news (NDTV RSS) | ✅ Done | TC-19 |

## B. Page-level Requirements
| # | Requirement | Status | Test |
|---|---|---|---|
| P1 | Homepage (hero, Latest, Trending, category blocks) | ✅ Done | TC-05 |
| P2 | Blog listing (filters + search + empty state) | ✅ Done | TC-06, 07 |
| P3 | Article page (flagship blocks, TOC, progress) | ✅ Done | TC-08, 09 |
| P4 | Custom 404 | ✅ Done | TC-08 A1 |

## C. Technical Constraints
| # | Requirement | Status |
|---|---|---|
| T1–T3 | React 19 + Vite 6 + Router; SPA; plain CSS | ✅ |
| T4–T5 | Inline SVG icons; offline (no runtime CDN) | ✅ |
| T6 | Accessibility (ARIA, focus, semantic) | ✅ |
| T7 | Lighthouse ≥ 90 | ⬜ Pending (B3) |
| T8–T9 | Latest browsers; clean build, 0 console errors | ✅ (build 4.53s) |
| T10 | Deploy — **Firebase Hosting LIVE** (`blogging-5760b.web.app`) | ✅ **DONE 21 Oct** |

## D. Task Cases + Evidence (17/17 covered)
| TC | Evidence | Status |
|---|---|---|
| TC-01 | `TC-01_date-auto.png` | ✅ (day-change 20→21 tested) |
| TC-02 | `TC-02_social-circles.png` | ✅ |
| TC-03 | `TC-03_announce-bar.png` + `tc03-announce-light-regression.jpg` | ✅ |
| TC-04 | `TC-04_nav-active.png` | ✅ |
| TC-05 | `TC-05_homepage-full.png` | ✅ |
| TC-06 | `TC-06_filter-platforms.png` | ✅ |
| TC-07 | `TC-07_search-ghost.png` | ✅ |
| TC-08 | `TC-08_article-full.png` + `TC-08a_custom-404.png` | ✅ |
| TC-09 | `TC-09_faq-accordion.png` | ✅ |
| TC-10 | `TC-10_dark-mode.png` + `tc10-darkmode-fixed-full.jpg` (B1 fix) | ✅ |
| TC-11 | `TC-11_newsletter-footer.png` | ✅ |
| TC-12 | `TC-12_back-to-top.png` (B2 fresh) | ✅ |
| TC-13 | `TC-13_all-posts.png` | ✅ |
| TC-14 | build output `✓ 4.53s` | ✅ |
| TC-15 | `TC-15_topnews-banner.png` | ✅ |
| TC-16 | RSS fetch + `NDTV-homepage.pdf` (bot-block docs) | ✅ |
| TC-17 | `tc17-home-full.jpg` + 3 more | ✅ |
| TC-18 | `firebase-migration.json` (Firestore 63/63 + verify) | ✅ |
| TC-19 | `tc19-pre-ticker.png` + `tc19-post-ticker.png` + `tc19-post-ticker-dark.png` | ✅ |

## E. Bug / Pending Log
| # | Item | Status |
|---|---|---|
| B1 | Dark-mode announce/footer light (G8 edge) | ✅ **FIXED 21 Oct** — `--navy` var; DOM + PNG verified |
| B2 | TC-12 fresh evidence | ✅ **DONE 21 Oct** — pre/post DOM + PNG |
| B3 | Lighthouse score measure (T7) | ⬜ Pending |
| B4 | Deploy to Netlify/Vercel (T10) | ✅ **DONE 21 Oct** — **Firebase Hosting** live: `https://blogging-5760b.web.app` (SPA rewrite + cache headers; home/deep-link/images `200`) |
| B5 | Source code GitHub pe push | ✅ **DONE 21 Oct** — repo `jyotiparasher1985/blogging-` (main, commit `ec7c061`, 62 files; docs + Evidence included) |
| B6 | Data → Firestore (63 docs, 10 collections) | ✅ **DONE 21 Oct** — `blogging-5760b` DB `(default)` @ asia-south1; verify GET 200 + title match |
| B7 | Images → Firebase Storage | ✅ **DONE 22 Oct** — bucket `blogging-5760b.firebasestorage.app` (Blaze) · 9/9 uploaded · public-read rules released · verify HTTP 200 + md5 match |

**Bottom line:** G 13/13 ✅ · P 4/4 ✅ · T 9/10 ✅ · TC 17/17 ✅ evidence complete · Bugs 2/2 fixed · **LIVE on Firebase** + **GitHub repo pushed** · Pending: sirf B3 (Lighthouse).
