# TestCases — Breaking Ticker (Daily Breaking News)
**Project:** NewsScope — News Portal + Blog Website
**Module:** `breaking ticker/` (practice folder)
**RFP Reference:** NS/RFP/2026/001 → G15 (main RFP.md at project root)
**Date:** 22 Oct 2026
**Status:** v1.0 (implemented + live)

---

## TC-19 — Breaking Ticker Daily News (G15)

| Field | Detail |
|---|---|
| **Requirement** | RFP G15 — daily breaking news scroll in ticker |
| **Preconditions** | `NEWS` array me 6 fresh headlines (22 Oct 2026, 07:47 IST fetch) + `NEWS_SOURCE.fetchedAt` updated |
| **Steps** | 1. `breaking ticker/BreakingTicker.jsx` me `items` ko NEWS objects support karna (string OR {headline,url,time,tag}) → 2. each item `<a target="_blank">` with `time` prefix + `:focus-visible` outline → 3. `Layout.jsx` me `<BreakingTicker items={NEWS} />` → 4. `index.css` me `.ticker-item` styles → 5. build + dev HMR verify |
| **Expected** | 6 clickable links (`.ticker-item`) render, first href → NDTV article, `aria-hidden` removed (accessible), pause-on-hover + focus outline work |
| **Evidence** | `Evidence/tc19-pre-ticker.png` (static 4-item ticker, before) · `Evidence/tc19-post-ticker.png` (live 6 breaking headlines, light) · `Evidence/tc19-post-ticker-dark.png` (dark mode) · `Evidence/tc19-live-ticker.png` (production `blogging-5760b.web.app` — 6 NDTV links verified) · `Evidence/tc19-fullpage-light.png` · `Evidence/tc19-fullpage-dark.png` |
| **Result** | ✅ PASS (22 Oct 2026, dev `:5173` + production) — DOM-verified: `links: 6`, `firstHref: ndtv.com/...`, `hasTime: true`, `ariaHidden: null` |
| **IP Rule (G12/G15)** | ❌ NDTV article text/photos copy NAHI · ✅ sirf headline titles + original article links + "via NDTV" credit |

---

## Test Steps (Manual Verification)

1. Open `http://localhost:5173/` (dev) or `https://blogging-5760b.web.app/` (live)
2. Observe ticker below nav bar — 6 breaking headlines scroll right-to-left
3. Hover → animation pauses
4. Tab to a headline → focus outline visible
5. Click a headline → opens NDTV article in new tab
6. Toggle dark mode → ticker still visible with proper contrast

## Files in this folder

```
breaking ticker/
├── RFP.md                ← this file (requirement G15)
├── TestCases.md          ← this file (TC-19)
├── BreakingTicker.jsx    ← component code
└── README.md             ← props + CSS + usage doc
```

> Note: Project-level `TestCases.md` (root) contains TC-19 in full context along with TC-01…TC-18. Ye file sirf breaking ticker module ka focused test case hai.
