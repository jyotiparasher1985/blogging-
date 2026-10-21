import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SITE } from "../data/posts.js";
import TopBar from "../../Top Bar/TopBar.jsx";

const icons = {
  search: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>),
  moon: (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>),
  pin: (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>),
  pinFill: (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" /></svg>),
};

export function Masthead() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");

  return (
    <header className="masthead container" style={{ position: "relative" }}>
      <div className="masthead-inner">
        <Link className="logo" to="/">
          <span className="logo-mark">N</span>
          <span>
            <span className="logo-name">News<em>Scope</em></span>
            <span className="logo-tag">{SITE.tagline}</span>
          </span>
        </Link>
        <div className="masthead-actions">
          <button className="icon-btn" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
            {icons.search}
          </button>
          <a className="btn btn-primary" href="#newsletter"><span>Daily Briefing</span> ✉</a>
        </div>
      </div>
      {searchOpen && (
        <div className="search-pop open">
          <input
            type="search"
            placeholder="Search stories, articles, reports…"
            aria-label="Search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setSearchOpen(false);
                window.location.href = `/blog?q=${encodeURIComponent(q)}`;
              }
            }}
          />
        </div>
      )}
    </header>
  );
}

export function NavBar({ dark, setDark }) {
  const { pathname, search } = useLocation();

  /* TC-12: sticky shadow after 140px scroll */
  useEffect(() => {
    const onScroll = () => {
      document.getElementById("nav-bar")?.classList.toggle("stuck", window.scrollY > 140);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="nav-bar" id="nav-bar" aria-label="Main">
      <div className="container">
        <div className="nav-inner">
          <button className="icon-btn" id="theme-toggle inline" aria-label="Toggle dark mode"
            onClick={() => setDark(dark === "dark" ? "light" : "dark")}
            style={{ marginLeft: 8, marginRight: 8 }}>
            {icons.moon}
          </button>
          {SITE.sections.map((s) => {
            const active = pathname + search === s.to || (s.to === "/" && pathname === "/") || (s.to.split(/[?#]/)[0] === "/article/best-blogging-platforms-2026" && pathname === s.to.split(/[?#]/)[0]);
            return (
              <Link key={s.label} to={s.to} className="nav-link" style={active ? { color: "var(--accent)", borderBottomColor: "var(--accent)" } : null}>
                {s.label}
              </Link>
            );
          })}
          <span className="nav-live"><span className="blink-dot" /> Breaking</span>
        </div>
      </div>
    </nav>
  );
}

export function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <span className="ticker-label">Breaking</span>
      <div className="ticker-viewport">
        <div className="ticker-track">
          <span>React + Vite rebuild of the NewsScope template — single-page, client-side routed</span>
          <span>Dark mode, category filters and reading progress built in — no plugins required</span>
          <span>Deploy free on GitHub Pages, Netlify or Vercel in minutes</span>
          <span>All sample content is original — swap in your own stories anytime</span>
        </div>
      </div>
    </div>
  );
}

export function Newsletter() {
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <section className="newsletter" id="newsletter">
      <div>
        <h2>The Daily Briefing, in your inbox by 8 AM.</h2>
        <p>One email. The five stories that matter for writers, creators and publishers — no noise, no filler, unsubscribe anytime.</p>
      </div>
      <div>
        <form onSubmit={(e) => { e.preventDefault(); setDone(true); setEmail(""); }}>
          <input type="email" placeholder="you@example.com" required aria-label="Email address"
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="btn" type="submit">Subscribe</button>
        </form>
        {done && <p className="nl-success show">✓ Thanks! Check your inbox to confirm your subscription.</p>}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link className="logo" to="/">
              <span className="logo-mark">N</span>
              <span className="logo-name">News<em>Scope</em></span>
            </Link>
            <p>An independent portal for technology, business and the creator economy. An original React template — clean, fast and ad-free.</p>
          </div>
          <div>
            <h4>Sections</h4>
            <ul>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/article/best-blogging-platforms-2026">Platforms Guide</Link></li>
              <li><Link to="/blog?cat=tech">Technology</Link></li>
              <li><Link to="/blog?cat=money">Business</Link></li>
              <li><Link to="/blog?cat=ai">AI &amp; Creators</Link></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Editorial Standards</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Advertise</a></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">Cookie Policy</a></li>
              <li><a href="#">Accessibility</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 NewsScope. An original template by NewsScope Labs — not affiliated with any third-party publisher. All sample content is fictional.</span>
          <span>Made with React + Vite</span>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children, dark, setDark }) {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="announce">📣 <strong>New:</strong> Our 2026 blogging platform deep-dive is live — <Link to="/article/best-blogging-platforms-2026"><u>read the full comparison →</u></Link></div>
      <TopBar />
      <Masthead />
      <NavBar dark={dark} setDark={setDark} />
      <Ticker />
      {children}
      <Newsletter />
      <Footer />
      {showTop && (
        <button className="to-top show" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="m5 12 7-7 7 7M12 5v16" /></svg>
        </button>
      )}
    </>
  );
}
