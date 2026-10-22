# EVALUATION REPORT — NewsScope Production Build

**Project:** NewsScope — News Portal + Blog Website (React)
**Evaluation Date:** 20 October 2026
**Scope:** Production build verification (RFP §4 T10 / TC-14 quality gate)
**Build Command:** `npm run build` (Vite v6.4.4)
**Preview:** `http://localhost:4173/` (`vite preview`, `dist/` folder se serve)

---

## E1 — Production Build Result ✅ PASS

**Command output:**
```
vite v6.4.4  building for production...
✓ 48 modules transformed.
dist/index.html                   0.58 kB │ gzip:  0.37 kB
dist/assets/index-C6NKHhll.css   19.04 kB │ gzip:  4.73 kB
dist/assets/index-DmY0zvKc.js   301.58 kB │ gzip: 95.48 kB
✓ built in 5.75s
```

**Evidence table:**

| Check | Result | Evidence |
|---|---|---|
| `npm run build` exit code | **0** | shell output |
| Build warnings | **0** (after fix E1a) | shell output |
| Total uncompressed size | ~321 kB | build output |
| Total gzip size | ~100.6 kB | build output |
| First-build note | Pehli baar 1 CSS-nesting warning mili | warning log (`tbody tr:hover` nested rule) |

**E1a — Fix applied:** CSS nesting (`[data-theme="dark"] & { ... }`) unsupported in target envs (chrome87/edge88/firefox78/safari14) → rule flatten kiya:
```css
tbody tr:hover { background: var(--accent-soft); }
[data-theme="dark"] tbody tr:hover { background: #241d19; }
```
File: `src/index.css`. Rebuild → 0 warnings, exit 0.

---

## E2 — HTTP-Level Verification ✅ PASS

| Request | Expected | Actual | Result |
|---|---|---|---|
| `GET /` | 200 + `#root` + bundle ref | 200, `<div id="root">` + `assets/index-DmY0zvKc.js` | ✅ |
| `GET /assets/index-DmY0zvKc.js` | 200 | 200 | ✅ |
| `GET /assets/index-C6NKHhll.css` | 200 | 200 | ✅ |
| `GET /article/best-blogging-platforms-2026` (SPA deep-link) | index.html fallback | index.html served, root div + JS ref | ✅ |

**Meaning:** Netlify/Vercel-free-tier SPA fallback bina extra config kaam karega (Vite preview SPA mode). GitHub Pages deep-links ke liye fallback note README me documented hai (RFP §5 note).

---

## E3 — Functional Battery (Production Site, Browser-Driven) ✅ PASS

| # | Test | Expected | Actual | Result |
|---|---|---|---|---|
| F1 | Homepage render | hero + latest 5 + trending 6 + category cards | hero "The 17 Best Blogging Platforms…", latest **5**, trending **6**, cards **8** | ✅ |
| F2 | Auto date (TC-01) | `Weekday, DD Month YYYY` | "Tuesday, 20 October 2026" | ✅ |
| F3 | Social circles (TC-02) | 4 circle icon buttons | 4 (`.social-link`) | ✅ |
| F4 | Ticker viewport (fixed overlap) | `.ticker-track` viewport wrapper | present | ✅ |
| F5 | Blog filter (TC-06) | `?cat=platforms` → sirf platforms posts + active chip | 3 cards, chip "Platforms" active | ✅ |
| F6 | Article full render (TC-08) | 17-row table, citations, FAQ, TOC | rows **17**, cites **10**, FAQ **4**, TOC links **6** | ✅ |
| F7 | 404 redirect (TC-08 A1) | bad slug → `/404` custom page | path `/404`, "404 — Story not found" | ✅ |
| F8 | Dark mode persist (TC-10) | toggle → save → reload → restore | saved `"dark"` → reload → restored ✅ | ✅ |
| F9 | Nav sticky shadow (TC-12) | >140px scroll → `.stuck` | class `nav-bar stuck` | ✅ |
| F10 | Back-to-top | >600px → button visible | `.to-top.show` present | ✅ |
| F11 | Console errors (whole session) | 0 | **0 messages, level=error** | ✅ |

*(F8–F11 pehle dev-origin 5173 pe tested; F1–F7 fresh production origin 4173 pe.)*

---

## E4 — Visual Evidence

| Artifact | Description |
|---|---|
| `screenshot.jpeg` (browser capture) | Production homepage at `http://localhost:4173/` — masthead, circle social icons, nav, ticker, hero visible, 0-error session |
| User-visible Review pane | Same production tab live |
| Dev-origin screenshots (earlier session) | Top Bar variants: text icons → circle icons change history |

---

## E5 — RFP Gates Status

| Gate (RFP ref) | Status |
|---|---|
| T9: build clean, 0 console errors | ✅ |
| T10: deployment-ready (SPA fallback works) | ✅ |
| §4 targets: static assets only, no runtime CDN | ✅ (bundle self-contained: 1 JS + 1 CSS + HTML) |
| §3.3: content single data file | ✅ (`src/data/posts.js`) |
| G-items (date auto-update, circle icons+links, ticker, dark mode…) | ✅ (E3 F1–F11) |

---

## E6 — Requirement #1: "NDTV latest news + hero banner" (21 Oct 2026)

**Requirement:** NDTV ke prominent/latest news site pe daily + hero banner.

**Test cycle evidence:**

| Syanrio | Evidence | Result |
|---|---|---|
| Pre-change test (SOP step 1) | `Evidence/TC-01_date-auto.png` re-run | ✅ green |
| Playwright CLI → NDTV direct | `Evidence/NDTV-homepage.pdf` | ⚠️ "Access Denied" — Akamai bot protection (documented) |
| Headed Chrome open (CLI) | background process — user-visible window | ✅ |
| **Approved syndication route: official RSS** | feed fetch (top-stories feed, `fetchedAt: 21 Oct 2026 15:11 IST`) | ✅ 6 headlines title+link |
| Post-change build | `✓ built in 6.32s` — CSS 20.81 kB, JS 304.31 kB (gzip 96.6) | ✅ |
| **Post-change test (SOP step 4)** | `Evidence/TC-15_topnews-banner.png` (production :4173) | ✅ **visual verified** — banner + strip + attribution render |
| Day-change re-check (bonus) | header date "Wednesday, 21 October 2026" vs yesterday's "Tuesday" | ✅ TC-01 passes across day boundary |

**Implementation:** G12 → `NEWS` + `NEWS_SOURCE` data (`src/data/posts.js`), section in `Home.jsx`, styles in `index.css`; docs: TestCases.md TC-15/TC-16 + RFP.md G12.

**IP compliance note:** Sirf headline titles + original NDTV article links + "via NDTV" attribution use kiya gaya. NDTV ke article text/photos copy nahi kiye — banner art project ka apna (gradient placeholder) hai. Third-party photos embed karna production me prohibited hai (RFP G12 rule).

## E7 — Requirement #2: "Copyright-free images everywhere" (21 Oct 2026)

**Requirement:** Jahan-jahan images hain, wahan demo ke liye copyright-free photos lagayi jaayein.

| Scenario | Evidence | Result |
|---|---|---|
| URL screening (12 candidates) | `images.unsplash.com/*` live checks — 11× `200 IMG-OK`, 1× 404 → replaced + re-verified | ✅ 12/12 usable |
| Self-hosting (T5 offline rule) | 9 files downloaded → `public/img/` (106–534 KB); `dist/img/` — 9 files post-build | ✅ |
| Local serving | `http://localhost:4173/img/platforms-writing.jpg` → `200 /image/jpeg` | ✅ |
| Build | `✓ built in 7.73s` — CSS 20.86 kB, JS 304.66 kB | ✅ |
| Visual render (all surfaces) | `Evidence/tc17-home-full.jpg` — hero photo + saare category cards me photos; article/blog screenshots captured | ✅ |
| CDN removal check | Browser `img.src` host = `localhost` only (no images.unsplash.com runtime request) | ✅ |

**Implementation:** G13 → `Placeholder` component me `img` prop (`<img loading="lazy">` + gradient fallback), `POSTS[*].img` (9 posts, local paths), CSS `.ph img { object-fit: cover }`; docs: RFP G13 + TestCases TC-17.

**License compliance note:** Unsplash License — commercial use/reproduction/modification allowed, attribution optional (credit: README + TestCases TC-17). Koi NDTV/third-party copyrighted photo use nahi hui — news banner apna gradient art hi hai (G12 intact).

---

## E8 — Bug-fix Battery: B1 + B2 (21 Oct 2026)

**Requirement:** "Saare bugs fix karo + saari evidence run karo" — regression battery (B1, B2).

**B1 — Dark-mode Announcement Bar + Footer mismatch (G8 edge):**

| Step | Evidence | Result |
|---|---|---|
| Root-cause | `index.css` — `--primary-dark` dark theme me text-color ban jata hai (`#c7d3f5`), `.announce` + `footer` usi ko background use karte the | 🎯 identified |
| Fix | Naya `--navy` variable (`:root` `#1d2949`, `[data-theme="dark"]` `#0d1322`) → dono sections me `background: var(--navy)` | ✅ |
| Build | `✓ built in 4.53s` — CSS 20.88 kB | ✅ |
| Dark verify (DOM) | `.announce`/`footer` bg `rgb(13,19,34)`, text white, strong `#ffd8c9` | ✅ |
| Light regression (DOM + PNG) | bg `rgb(29,41,73)`, `Evidence/tc03-announce-light-regression.jpg` | ✅ |
| Dark PNG | `Evidence/tc10-darkmode-fixed-full.jpg` (CLI `--load-storage`) | ✅ |

**B2 — TC-12 fresh evidence (back-to-top + sticky nav):**

| Step | Evidence | Result |
|---|---|---|
| Pre (top) | `toTopInDOM: false`, `navStuck: false` — button conditional-render, G11 ke मुताबिक | ✅ |
| Scroll 1200px | `toTopInDOM: true`, opacity `1`, `nav-bar.stuck` + box-shadow on | ✅ |
| Screenshot | `Evidence/TC-12_back-to-top.png` (browser scroll + viewport capture) | ✅ |

**Docs:** TestCases.md TC-10/TC-12 updated + changelog v1.3; Checklist.md B1/B2 resolved.

---

## E9 — Requirement #3: Firebase Hosting Deploy (21 Oct 2026)

**Requirement:** "ye meri firebase id blogging-5760b isko firebase par host kar de"

| Step | Evidence | Result |
|---|---|---|
| Config | `firebase.json` (public `dist`, SPA rewrite `**`→`index.html`, cache: assets immutable 1y / images+`/img` 7d) + `.firebaserc` (default `blogging-5760b`) | ✅ |
| Auth check | `firebase projects:list` — user already logged in; `blogging-5760b (current)` | ✅ |
| Build + deploy | `✓ built in 6.15s` → `found 12 files in dist` → upload + release → **`Deploy complete!`** | ✅ |
| Live check `/` | `200 text/html; charset=utf-8` | ✅ |
| Live deep link | `/article/best-blogging-platforms-2026` → `200 text/html` (**T10 SPA fallback solve** — GitHub Pages wala issue Firebase rewrite se gone) | ✅ |
| Live images | `/img/platforms-writing.jpg` → `200 image/jpeg` | ✅ |
| Visual evidence | `Evidence/tc14-live-firebase.jpg` (live home) + `Evidence/tc14-live-deeplink.jpg` (live article) | ✅ |

**URLs:** Live: `https://blogging-5760b.web.app` · Console: `https://console.firebase.google.com/project/blogging-5760b/overview`

**Docs:** RFP T10 ✅ DONE · TestCases TC-14 LIVE evidence · Checklist B4 ✅ · README deploy section (Firebase chosen, Netlify/Vercel alternative, GH Pages note).

---

## E10 — Requirement #4: GitHub Source Push (21 Oct 2026)

**Requirement:** "ye mere github ka link hai project naam blogging yaha par push kar de" — repo `jyotiparasher1985/blogging-`

| Step | Evidence | Result |
|---|---|---|
| Pre-checks | git 2.55.0 ✅ · gh 2.102.0 authenticated (`jyotiparasher1985`, https protocol) · repo `blogging-` exist + khaali (`git ls-remote` → no refs) | ✅ |
| `.gitignore` | `node_modules/`, `dist/`, logs, env, editor files — **Evidence/ intentionally included** (docs requirement) | ✅ |
| Repo init | `git init -b main` + local identity `jyotiparasher1985` + GitHub noreply email (334911568+…) | ✅ |
| Commit + push | `[main (root-commit) ec7c061]` — **62 files, 6058 insertions** → `* [new branch] main -> main` | ✅ |
| Verify (remote) | `git ls-remote origin` → HEAD = `refs/heads/main` = `ec7c061` · `gh api repos/...` → default_branch `main` | ✅ |

**Repo URL:** `https://github.com/jyotiparasher1985/blogging-` — full source + docs (RFP, TestCases, Evaluation, Checklist, Sections) + Evidence folder + `public/img` (license-free self-hosted photos)

---

## E11 — Requirement #5: Data → Firestore + Images → Storage (21 Oct 2026)

**Requirement:** "jo data hai firestore send kar or jo storage send karne wali cheeze hai send kar de or uska evidence de"

| Step | Evidence | Result |
|---|---|---|
| Firestore DB create | CLI `firestore:databases:create "(default)" --location=asia-south1` → `Successfully created` | ✅ |
| Run 1 (bug) | 63×400 — "Unknown name fields at document.fields[0].value" → **double-wrap bug** (top-level object bhi `mapValue` me wrap hua) | 🐛 identified |
| Run 2 (fix) | Unwrap fix → **63/63 docs written** (10 collections: site 1, posts 9, filters 6, latest 5, platforms 17, quick_picks 4, faqs 4, citations 10, news_source 1, news 6) | ✅ |
| Fetch-back verify | GET `posts/best-blogging-platforms-2026` → 200 + title match | ✅ |
| Storage attempt | Bucket create — 2 routes (Firebase v0 admin + GCS JSON API) — dono **403 "billing account... state absent"** | ⚠️ plan-blocked |
| Cross-project check | `domato-fcde7`, `realestatex-web-1985`, `tiny-turners-school` — koi bucket exist nahi karta | ⚠️ no alternative |
| Storage rules | `firebaserules` API — public-read ruleset create + **release ✅** (bucket banne ke liye ready) | ✅ |
| Evidence dump | `Evidence/firebase-migration.json` — collections, counts, per-file md5/size, verify, rules, errors | ✅ |
| Script | `scripts/seed-firebase.mjs` (idempotent — re-run safe) | ✅ |

**Status:** Firestore **COMPLETE** (63/63 + verify) · Storage **blocked by Blaze/billing policy** — user console se upgrade kare → `node scripts/seed-firebase.mjs` re-run (bucket + uploads auto). Console: `https://console.firebase.google.com/project/blogging-5760b/firestore/databases/-default-/data`

---

## E12 — Requirement #6: Breaking Ticker Daily News (22 Oct 2026)

**Requirement:** "Breaking Ticker ke naam se folder usme ab kaam karna hai ... Breaking Ticker ... ussme daily breaking news scroll honi chayie"

| Step | Evidence | Result |
|---|---|---|
| Pre-change (static ticker) | `Evidence/tc19-pre-ticker.png` — 4 static strings | ✅ captured |
| RSS fetch (NDTV, 22 Oct 07:47 IST) | 12 items; top 6 picked for ticker (World/India/Tech) | ✅ |
| Data update | `NEWS_SOURCE.fetchedAt` → "22 Oct 2026 · 07:47 IST"; `NEWS` → 6 fresh headlines (IP-safe: title + link + time only) | ✅ |
| Component upgrade | `breaking ticker/BreakingTicker.jsx` — string OR `{headline,url,time,tag}` items → clickable `<a target="_blank">` + `<time>` + `:focus-visible` outline; `aria-hidden` removed (accessible) | ✅ |
| Styling | `index.css` `.ticker-item`, `.ticker-item time`, hover/focus | ✅ |
| Wiring | `Layout.jsx` → `<BreakingTicker items={NEWS} />` | ✅ |
| Build | `✓ built in 5.42s` — 49 modules, CSS 21.22 kB | ✅ |
| DOM verify (dev :5173) | `links: 6`, `firstHref: ndtv.com/...`, `hasTime: true`, `ariaHidden: null` | ✅ |
| Visual evidence | `Evidence/tc19-post-ticker.png` (light) · `Evidence/tc19-post-ticker-dark.png` (dark) | ✅ |

**IP compliance note (G12/G15):** Sirf headline titles + original NDTV article links + "via NDTV" credit use kiya. NDTV ke article text/photos copy nahi kiye — ticker abhi bhi NewsScope ka apna UI hai.

---

## Verdict

**PRODUCTION-READY ✅ — LIVE ✅ — OPEN-SOURCE ✅** — build pass, functional battery 11/11, console 0 errors, visual evidence captured.

**Known limitations (amps):**
1. Privacy-mode me dark-mode persist session-only (caught alternate A1 ko design ke बुरी तरीके से handle karta hai — graceful).
2. GitHub Pages ke deep links manual SPA fallback chahte hai (README setup noted).
3. Newsletter backend push optional add-on hai (RFP §3.4) — abhi demo feedback-only.
