import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Placeholder from "../components/Placeholder.jsx";
import { POSTS, FILTERS } from "../data/posts.js";

export default function Blog() {
  const [params, setParams] = useSearchParams();
  const q = (params.get("q") || "").toLowerCase();
  const active = params.get("cat") || "all";

  const setFilter = (key) => {
    if (key === "all") setParams({});
    else setParams({ cat: key });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const posts = POSTS.filter((p) => {
    const catOk = active === "all" || p.cat === active;
    const qOk = !q || (p.title + p.desc + p.author).toLowerCase().includes(q);
    return catOk && qOk;
  });

  useEffect(() => {
    document.title = "Blog — NewsScope";
  }, []);

  return (
    <main className="container">
      <div className="page-head">
        <span className="kicker kicker-accent">The NewsScope Desk</span>
        <h1>{q ? `Search results for “${q}”` : "Every guide, in one place."}</h1>
        <p>Comparisons, tool reviews and analysis for writers and publishers. Filter by topic below.</p>
      </div>

      <div className="chips" role="tablist" aria-label="Filter posts by topic">
        {FILTERS.map((f) => (
          <button key={f.key} className={`chip${active === f.key ? " active" : ""}`} onClick={() => setFilter(f.key)}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="blog-grid">
        {posts.map((post) => (
          <article className="card blog-card" data-cat={post.cat} key={post.slug}>
            <Link to={`/article/${post.slug}`} className="card-media">
              <Placeholder ph={post.ph} icon="doc" img={post.img} />
            </Link>
            <div className="card-body">
              <span className="kicker kicker-accent">{post.catLabel}</span>
              <h3><Link to={`/article/${post.slug}`}>{post.title}</Link></h3>
              <p>{post.desc}</p>
              <div className="meta-row">
                <span>By {post.author}</span>
                <span className="dot-sep">{post.date}</span>
                <span className="dot-sep">{post.readTime}</span>
              </div>
            </div>
          </article>
        ))}
        {posts.length === 0 && (
          <p style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px 0" }}>
            No stories match this filter yet. <u onClick={() => setFilter("all")} style={{ cursor: "pointer" }}>Show all</u>
          </p>
        )}
      </div>

      <nav className="pager" aria-label="Pagination">
        <a href="#" aria-label="Previous page">‹</a>
        <a href="#" className="current">1</a>
        <a href="#">2</a>
        <a href="#">3</a>
        <a href="#" aria-label="Next page">›</a>
      </nav>
    </main>
  );
}
