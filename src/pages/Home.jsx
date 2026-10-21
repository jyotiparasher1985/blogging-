import { Link } from "react-router-dom";
import Placeholder from "../components/Placeholder.jsx";
import { POSTS, LATEST, NEWS, NEWS_SOURCE } from "../data/posts.js";

/* Meta row shared across cards */
function Meta({ post }) {
  return (
    <div className="meta-row">
      <span className="author">By {post.author}</span>
      <span className="dot-sep">{post.date}</span>
      <span className="dot-sep">{post.readTime}</span>
    </div>
  );
}

function Card({ post }) {
  return (
    <article className="card">
      <Link to={`/article/${post.slug}`} className="card-media">
        <Placeholder ph={post.ph} icon="doc" img={post.img} />
      </Link>
      <div className="card-body">
        <span className={`kicker ${post.featured ? "kicker-accent" : "kicker-primary"}`}>{post.catLabel}</span>
        <h3><Link to={`/article/${post.slug}`}>{post.title}</Link></h3>
        <p>{post.desc}</p>
        <Meta post={post} />
      </div>
    </article>
  );
}

export default function Home() {
  const featured = POSTS.find((p) => p.featured);
  const others = POSTS.filter((p) => p !== featured);

  const tech = others.slice(0, 3);
  const biz = others.slice(3, 6);
  const ai = others.slice(6, 9);

  return (
    <main className="container">

      {/* TOP NEWS TODAY — TC-15 (headlines via NDTV official RSS, title+link only) */}
      <section className="section news-section">
        <div className="section-head">
          <h2>Top News Today</h2>
          <a href={NEWS_SOURCE.siteUrl} target="_blank" rel="noreferrer">via {NEWS_SOURCE.name} ↗</a>
        </div>
        <a className="news-banner ph-1" href={NEWS[0].url} target="_blank" rel="noreferrer">
          <div className="news-banner-kicker">
            <span className="blink-dot" /> LIVE · {NEWS[0].tag} · {NEWS_SOURCE.fetchedAt.slice(-12)}
          </div>
          <h3>{NEWS[0].headline}</h3>
          <span className="news-via">Full story on {NEWS_SOURCE.name}.com ↗</span>
        </a>
        <div className="news-strip">
          {NEWS.slice(1).map((n) => (
            <a key={n.url} href={n.url} target="_blank" rel="noreferrer">
              <time>{n.time}</time>
              <span>{n.headline}</span>
              <em>{n.tag} ↗</em>
            </a>
          ))}
        </div>
        <p className="news-note">
          Headlines syndicated via {NEWS_SOURCE.name}'s official RSS feed ({NEWS_SOURCE.fetchedAt}).
          Headlines link to the original articles; all images here are our own placeholder art — no third-party photos are copied.
        </p>
      </section>

      {/* HERO */}
      <section className="hero">
        <div className="hero-grid">
          <article className="hero-main">
            <Link to={`/article/${featured.slug}`} style={{ display: "block", aspectRatio: "16/9", borderRadius: 14, overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
              <Placeholder ph={featured.ph} icon="doc" img={featured.img} />
            </Link>
            <div className="hero-body">
              <span className="kicker kicker-accent">★ Editor's Pick · Creator Economy</span>
              <h1><Link to={`/article/${featured.slug}`}>{featured.title}</Link></h1>
              <p>We scored seventeen publishing platforms on eleven criteria — ease of use, ownership, monetization, portability and cost — to find out which one actually deserves your writing in 2026. The winner isn't who most people expect.</p>
              <div className="meta-row">
                <span className="author">By {featured.author}</span>
                <span className="dot-sep">{featured.date}</span>
                <span className="dot-sep">{featured.readTime}</span>
                <span className="dot-sep"><Link to={`/article/${featured.slug}`}><u>Read the full comparison →</u></Link></span>
              </div>
            </div>
          </article>

          {/* Latest sidebar */}
          <aside className="latest">
            <div className="latest-head">
              <h3>Latest Updates</h3>
              <span className="blink-dot" />
            </div>
            {LATEST.map((l) => (
              <div className="latest-item" key={l.time}>
                <time>{l.time}</time>
                <div>
                  <Link to="/blog">{l.title}</Link>
                  <p>{l.meta}</p>
                </div>
              </div>
            ))}
          </aside>
        </div>
      </section>

      {/* TRENDING */}
      <section className="section">
        <div className="section-head">
          <h2>Trending Now</h2>
          <Link to="/blog">View all →</Link>
        </div>
        <div className="trend-grid">
          {others.slice(0, 6).map((post, i) => (
            <article className="trend-item" key={post.slug}>
              <span className="trend-num">{i + 1}</span>
              <div>
                <h4><Link to={`/article/${post.slug}`}>{post.title}</Link></h4>
                <div className="meta-row">
                  <span>{post.catLabel}</span>
                  <span className="dot-sep">{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CATEGORY SECTIONS */}
      {[
        { h: "Technology", to: "/blog?cat=tech", posts: tech },
        { h: "Business & Marketing", to: "/blog?cat=money", posts: biz },
        { h: "AI & Creators", to: "/blog?cat=ai", posts: ai },
      ].map((sec, i) => (
        <section className="section" key={sec.h}>
          <div className="section-head">
            <h2>{sec.h}</h2>
            <Link to={sec.to}>More in {sec.h.split(" ")[0]} →</Link>
          </div>
          <div className="grid-3">
            {sec.posts.map((post, j) => (
              <Card key={post.slug} post={{ ...post, ph: ["ph-1", "ph-6", "ph-8", "ph-3", "ph-7", "ph-5", "ph-4", "ph-9", "ph-10"][(i * 3 + j) % 9] }} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
