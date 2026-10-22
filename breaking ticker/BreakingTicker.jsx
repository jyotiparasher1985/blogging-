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

// Normalize an item into { key, text, url, time, tag }.
// Supports plain strings (legacy/static) AND NDTV news objects { headline, url, time, tag }.
function normalize(item, i) {
  if (typeof item === "string") {
    return { key: `s-${i}`, text: item, url: null, time: null, tag: null };
  }
  const headline = item.headline || item.title || item.text || "";
  return {
    key: item.url || `o-${i}`,
    text: headline,
    url: item.url || null,
    time: item.time || null,
    tag: item.tag || null,
  };
}

export default function BreakingTicker({
  items = DEFAULT_ITEMS,
  label = "Breaking",
  speed = 40,        // seconds for one full loop (matches CSS default)
  pauseOnHover = true,
}) {
  // de-duplicate empty entries so the track never looks broken
  const safeItems = useMemo(
    () => items.map(normalize).filter((t) => String(t.text).trim().length > 0),
    [items]
  );

  return (
    <div className="ticker" role="region" aria-label={`${label} news ticker`}>
      <span className="ticker-label">{label}</span>
      <div className="ticker-viewport">
        <div
          className="ticker-track"
          style={{ animationDuration: `${speed}s` }}
          data-pause={pauseOnHover ? "hover" : "none"}
        >
          {safeItems.map((t) => (
            t.url ? (
              <a
                key={t.key}
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ticker-item"
                title={t.tag ? `${t.tag} — ${t.text}` : t.text}
              >
                {t.time && <time>{t.time}</time>}
                <span>{t.text}</span>
              </a>
            ) : (
              <span key={t.key}>{t.text}</span>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
