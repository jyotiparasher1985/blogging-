// breaking ticker/BreakingTicker.jsx
// Practice folder component — mirrors the "Top Bar/TopBar.jsx" pattern.
// Extracted from src/components/Layout.jsx (Ticker) so it can be edited/tested
// independently. Styling lives in src/index.css under `.ticker`, `.ticker-label`,
// `.ticker-viewport`, `.ticker-track` (CSS keyframes `ticker`).

import { useMemo } from "react";

const DEFAULT_ITEMS = [
  "React + Vite rebuild of the NewsScope template — single-page, client-side routed",
  "Dark mode, category filters and reading progress built in — no plugins required",
  "Deploy free on GitHub Pages, Netlify or Vercel in minutes",
  "All sample content is original — swap in your own stories anytime",
];

export default function BreakingTicker({
  items = DEFAULT_ITEMS,
  label = "Breaking",
  speed = 40,        // seconds for one full loop (matches CSS default)
  pauseOnHover = true,
}) {
  // de-duplicate empty entries so the track never looks broken
  const safeItems = useMemo(() => items.filter((t) => String(t).trim().length > 0), [items]);

  return (
    <div className="ticker" aria-hidden="true">
      <span className="ticker-label">{label}</span>
      <div className="ticker-viewport">
        <div
          className="ticker-track"
          style={{ animationDuration: `${speed}s` }}
          data-pause={pauseOnHover ? "hover" : "none"}
        >
          {safeItems.map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
