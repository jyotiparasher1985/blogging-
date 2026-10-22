# `breaking ticker/` — Practice Folder

> Mirrors the `Top Bar/TopBar.jsx` practice pattern: a small, self-contained component extracted from `src/components/Layout.jsx` so it can be edited, tested and styled independently.

## Files
- `BreakingTicker.jsx` — the component (default export)
- `README.md` — this file

## Component props
| Prop | Default | Notes |
|---|---|---|
| `items` | 4 default strings | Array of headlines that scroll right-to-left |
| `label` | `"Breaking"` | Red label tab on the left |
| `speed` | `40` | Seconds per full loop (overrides CSS `ticker 40s`) |
| `pauseOnHover` | `true` | Recorded via `data-pause` (CSS pauses via `:hover`) |

## CSS (in `src/index.css`)
- `.ticker` — flex bar, orange label tab
- `.ticker-label` — fixed "Breaking" tab (must not overlap viewport)
- `.ticker-viewport` — `overflow: hidden; flex: 1`
- `.ticker-track` — `inline-block`, `padding-left: 100%`, `animation: ticker 40s linear infinite`
- `.ticker:hover .ticker-track` — `animation-play-state: paused`
- `.ticker-track span::after` — bullet separator

## Used in
- `src/components/Layout.jsx` → `<BreakingTicker />` (inside `Layout`)

## Test cases covered
- **G7** — Breaking Ticker (no-overlap fix: fixed viewport pattern)
- **TC-12** — scroll utilities (pause-on-hover included in visual check)
