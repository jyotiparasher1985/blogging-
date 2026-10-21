/* TopBar — Date bar (auto-update) + Social icons strip */

const icons = {
  facebook: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.4h2.5l.4-2.9h-2.9V8.8c0-.84.23-1.4 1.44-1.4h1.54V4.8c-.27-.04-1.18-.11-2.24-.11-2.22 0-3.74 1.35-3.74 3.83v2.17H8v2.9h2.5V21z" />
    </svg>
  ),
  x: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.9 3H21l-6.8 7.8L22.2 21h-6.3l-4.9-6.4L5.4 21H2.2l7.3-8.3L2 3h6.4l4.4 5.9zm-1.1 16.1h1.7L7.6 4.8H5.8z" />
    </svg>
  ),
  instagram: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  youtube: (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.5 12c0-2.3-.2-3.7-.45-4.47a2.53 2.53 0 0 0-1.76-1.76C19.3 5.4 16.5 5.3 12 5.3s-7.3.1-8.29.47a2.53 2.53 0 0 0-1.76 1.76C1.7 8.3 1.5 9.7 1.5 12s.2 3.7.45 4.47a2.53 2.53 0 0 0 1.76 1.76c.99.37 3.79.47 8.29.47s7.3-.1 8.29-.47a2.53 2.53 0 0 0 1.76-1.76c.25-.77.45-2.17.45-4.47zm-12.7 3V9l5.2 3z" />
    </svg>
  ),
};

const SOCIALS = [
  { name: "Facebook", href: "https://www.facebook.com/", icon: icons.facebook },
  { name: "X (Twitter)", href: "https://x.com/", icon: icons.x },
  { name: "Instagram", href: "https://www.instagram.com/", icon: icons.instagram },
  { name: "YouTube", href: "https://www.youtube.com/", icon: icons.youtube },
];

const LIVE_BADGE = { href: "https://www.youtube.com/results?search_query=live+news", label: "LIVE" };

export default function TopBar() {
  /* Date auto-update: page load pe system date leta hai */
  const dateStr = new Date().toLocaleDateString("en-IN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <div className="topbar-left">
          <span id="topbar-date">{dateStr}</span>
        </div>
        <div className="topbar-right">
          {SOCIALS.map((s) => (
            <a key={s.name} className="social-link" href={s.href} target="_blank" rel="noopener noreferrer"
              title={s.name} aria-label={s.name}>
              {s.icon}
            </a>
          ))}
          <a className="live-badge" href={LIVE_BADGE.href} target="_blank" rel="noopener noreferrer" title="Watch live">
            <span className="blink-dot" /> {LIVE_BADGE.label}
          </a>
        </div>
      </div>
    </div>
  );
}
