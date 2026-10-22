# RFP — Breaking Ticker (Daily Breaking News)
**Project:** NewsScope — News Portal + Blog Website
**Module:** `breaking ticker/` (practice folder, extracted from `src/components/Layout.jsx`)
**RFP Reference:** NS/RFP/2026/001 (main RFP.md at project root → G15)
**Date:** 22 Oct 2026
**Status:** v1.0 (implemented + live)

---

## Requirement (G15)

**Breaking Ticker — daily breaking news** (NDTV RSS se)

Top bar ke neeche ka ticker ab **daily breaking news** (NDTV RSS se) scroll kare:
- 6 latest headlines right-to-left marquee
- Har item clickable → original NDTV article (naye tab)
- `time` prefix (HH:MM) har headline ke saath
- "via NDTV" credit (implicit via link domain)
- IP rule G12 jaisa — sirf title + link, no article text/photos
- Daily refresh TC-16 ke mutabik (NEWS data update in `src/data/posts.js`)
- Pause-on-hover + keyboard focus styles (`:focus-visible`)

---

## Acceptance Criteria

| # | Criteria | Status |
|---|---|---|
| 1 | Ticker me 6 fresh NDTV headlines scroll honi chahiye | ✅ |
| 2 | Har headline clickable → original article naye tab me | ✅ |
| 3 | `time` prefix (HH:MM) dikhna chahiye | ✅ |
| 4 | Pause-on-hover work kare | ✅ |
| 5 | Keyboard focus outline (`:focus-visible`) work kare | ✅ |
| 6 | IP rule: sirf title + link, no article text/photos | ✅ |
| 7 | `aria-hidden` removed — accessible (links reachable) | ✅ |
| 8 | Dark + light mode me ticker visible | ✅ |
| 9 | Build pass + live deploy (Firebase) | ✅ |

---

## Component Details

- **File:** `breaking ticker/BreakingTicker.jsx`
- **Props:** `items` (string[] or {headline,url,time,tag}[]), `label`, `speed`, `pauseOnHover`
- **CSS:** `src/index.css` → `.ticker`, `.ticker-label`, `.ticker-viewport`, `.ticker-track`, `.ticker-item`, `.ticker-item time`
- **Used in:** `src/components/Layout.jsx` → `<BreakingTicker items={NEWS} />`
- **Data source:** `src/data/posts.js` → `NEWS` (6 items, 22 Oct 2026) + `NEWS_SOURCE` (NDTV RSS)

---

## Files in this folder

```
breaking ticker/
├── RFP.md                ← this file
├── TestCases.md          ← TC-19 (test case for this module)
├── BreakingTicker.jsx    ← component code
└── README.md             ← props + CSS + usage doc
```

> Note: Project-level `RFP.md` (root) contains G15 in full context. Ye file sirf breaking ticker module ka focused RFP hai.
