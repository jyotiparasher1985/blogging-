import { useState, useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Placeholder from "../components/Placeholder.jsx";
import { POSTS, PLATFORMS, FAQS, CITATIONS, QUICK_PICKS } from "../data/posts.js";

/* ----------------- flagship article content (original prose) ----------------- */
const FLAGSHIP_SLUG = "best-blogging-platforms-2026";

function FlagshipBody() {
  return (
    <>
      <p><strong>Every year the same question comes back:</strong> where should a writer actually publish in 2026? The answer changed less than the marketing suggests — but the spread between platforms did get sharper. Below is our re-rank of all 17 major platforms, using 11 criteria — ease of use, maturity, monetization, ownership, portability, pricing and more.</p>

      <ul>
        <li>Hosting and editing are converging — nearly every tool now bundles AI helpers, SEO and analytics.</li>
        <li>Self-hosted WordPress.org remains the only unlimited customization option; it costs setup time.</li>
        <li>Squarespace and Wix own the "polished looks with zero work" middle ground.</li>
        <li>Medium and Blogger are the strongest fully free starts, with clear trade-offs in ownership.</li>
        <li>Ghost's paid-membership stack makes it the monetization favorite of the year's comparisons.</li>
        <li>Developer can stay on static or headless options — Jekyll, Hashnode, Webflow.</li>
      </ul>

      <h2>How each platform lands in 2026</h2>

      <ul>
        <li><strong>WordPress.org</strong> — free, fully self-owned software with an unmatched theme and plugin ecosystem; hosting, updates and backups are on you.</li>
        <li><strong>WordPress.com</strong> — the hosted route: start free in minutes, plugin access and design control unlock only on higher plans.</li>
        <li><strong>Wix</strong> — drag-and-drop with generative AI setup; best for beginners and small businesses, weaker for writers who want fine typography control.</li>
        <li><strong>Squarespace</strong> — the design-led pick: excellent templates, built-in SEO, paywalls and email; a comfortably contained experience.</li>
        <li><strong>Medium</strong> — publish in one click and inherit a large reading community; you give up design and algorithmic control.</li>
        <li><strong>Ghost</strong> — open-source publishing with native memberships and newsletters; the monetization benchmark in recent cross-platform scoring.</li>
        <li><strong>Substack</strong> — newsletter-first; free start with a 10% cut on paid subscriptions, minimal design and analytics.</li>
        <li><strong>Blogger</strong> — free hosting and a free custom-domain connection; dated but reliable with easy AdSense ties.</li>
        <li><strong>Tumblr / LinkedIn</strong> — free audience surfaces (microblogging and B2B respectively); look for distribution, not long-term ownership.</li>
        <li><strong>Webflow · Hashnode · Jekyll · Write.as</strong> — specialist tracks: pixel-level design, developer communities, static performance, pure minimalism.</li>
      </ul>

      <h2 className="top-pick"><span className="rank-badge">1</span>The winner by the numbers: Ghost</h2>
      <p>When 17 platforms were scored across 11 criteria this year, Ghost finished first overall — and first on pricing transparency plus audience &amp; monetization combined. Paid memberships, email newsletters and a clean editing surface ship natively, with no plugins to babysit. Its only real tax is a slightly steeper start than Wix or Squarespace (self-hosting is possible; managed plans begin near ~$15/mo).</p>
      <p><strong>The two runners-up tell the whole story:</strong> Wix spans commerce; WordPress remains the ceiling for scale and ownership. If you expect deep customization and maximum reach, go WordPress; if you want paid subscribers out of the box, go Ghost.</p>

      <h2><span className="rank-badge">2</span>Side-by-side comparison table</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th><th>Platform</th><th>Best for</th><th>Pricing</th>
            </tr>
          </thead>
          <tbody>
            {PLATFORMS.map((p) => (
              <tr key={p.rank}>
                <td>{p.rank}</td>
                <td><a href={p.link} target="_blank" rel="noreferrer" style={{ fontWeight: 700 }}>{p.name}</a></td>
                <td>{p.bestFor}</td>
                <td>{p.pricing}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2><span className="rank-badge">3</span>How we'd choose in one sentence</h2>
      <ul>
        <li><strong>Want ownership and unlimited scale?</strong> WordPress.org.</li>
        <li><strong>Want money from subscribers now?</strong> Ghost or Substack.</li>
        <li><strong>Want beautiful design without learning anything?</strong> Squarespace or Wix.</li>
        <li><strong>Want an audience today, at zero cost?</strong> Medium or Blogger.</li>
        <li><strong>Writing code anyway?</strong> Jekyll or a headless WordPress setup.</li>
      </ul>
    </>
  );
}

/* fallback body used for other sample posts */
function GenericBody({ post }) {
  return (
    <>
      <p>{post.desc}</p>
      <p>This is a template placeholder. Because NewsScope is a static React template, secondary stories render from their data entry automatically. Open <code>src/data/posts.js</code> and add a full body to any post to override this text.</p>
      <div className="takeaway">
        <h3>Key Takeaways</h3>
        <ul>
          <li>Add a <code>body</code> JSX node in the data file to give this story real content.</li>
          <li>ToC links, tables, FAQ and citations are all reusable components.</li>
          <li>Read time, author and category come straight from the data entry.</li>
        </ul>
      </div>
    </>
  );
}

export default function Article() {
  const { slug } = useParams();
  const post = POSTS.find((p) => p.slug === slug);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.title = `${post ? post.title : "404"} — NewsScope`;
  }, [post]);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      setProgress((doc.scrollTop / total) * 100);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!post) return <Navigate to="/404" replace />;
  const isFlagship = slug === FLAGSHIP_SLUG;

  return (
    <>
      <div className="progress-bar" style={{ width: `${progress}%` }} />
      <main className="container">
        <div className="article-layout">
          {/* main column */}
          <article className="article">
            <div className="breadcrumb">
              <Link to="/">Home</Link> › <Link to="/blog">Blog</Link> › <span style={{ color: "var(--ink)" }}>{post.catLabel}</span>
            </div>
            <span className={`kicker ${isFlagship ? "kicker-accent" : "kicker-primary"}`}>{post.catLabel}</span>
            <h1>{post.title}</h1>
            <div className="meta-row">
              <span className="author">By {post.author}</span>
              <span className="dot-sep">{post.date}</span>
              <span className="dot-sep">{post.readTime} read</span>
            </div>

            <div className="article-hero">
              <Placeholder ph={post.ph} icon="doc" img={post.img} />
            </div>

            {isFlagship && (
              <>
                <p className="standfirst">
                  Seventeen platforms, eleven criteria, one table — the complete 2026 ranking of where writers should actually publish, with every claim sourced below.
                </p>
                <div className="byline">
                  <div className="avatar">ND</div>
                  <div>
                    <div className="author-name"><a href="#">NewsScope Desk</a></div>
                    <div className="meta-row" style={{ fontSize: ".76rem" }}>Updated {post.date} · Platforms Guide</div>
                  </div>
                  <div className="social-share">
                    <a href="#" aria-label="Share on X">𝕏</a>
                    <a href="#" aria-label="Share on LinkedIn">in</a>
                    <a href="#" aria-label="Copy link">🔗</a>
                  </div>
                </div>

                <div className="takeaway">
                  <h3>★ Key Takeaways</h3>
                  <ul>
                    <li><strong>Ghost is the strongest allrounder</strong> for monetization (memberships + newsletters built in).</li>
                    <li><strong>WordPress.org stays king of ownership</strong> — free software, custom code, no platform ceiling.</li>
                    <li><strong>Squarespace &amp; Wix win on looks</strong> — polished templates with almost zero setup time.</li>
                    <li><strong>Medium &amp; Blogger cost nothing</strong> — great to start; you trade away design and control.</li>
                    <li>Every figure below is backed by a cited source list at the end of this guide.</li>
                  </ul>
                </div>
              </>
            )}

            {isFlagship ? <FlagshipBody /> : <GenericBody post={post} />}

            {isFlagship && (
              <>
                <h2 id="faq">FAQ</h2>
                <div className="faq">
                  {FAQS.map((f, i) => (
                    <details key={f.q} open={i === 0}>
                      <summary>{f.q}</summary>
                      <p>{f.a}</p>
                    </details>
                  ))}
                </div>

                <div className="citations">
                  <h3>📚 Sources &amp; Citations</h3>
                  <ol>
                    {CITATIONS.map((c) => (
                      <li key={c.url}>
                        <strong>{c.outlet}</strong> — {c.title}.<br />
                        <a href={c.url} target="_blank" rel="noreferrer">{c.url}</a>
                      </li>
                    ))}
                  </ol>
                  <p style={{ fontSize: ".82rem", marginTop: 12, color: "var(--ink-faint)" }}>
                    Platform names and links belong to their owners; pricing reflects time-of-publication research and may change on the vendors' pages.
                  </p>
                </div>

                <h2 id="verdict">Quick picks</h2>
                <ul>
                  {QUICK_PICKS.map((p) => (
                    <li key={p.label}><strong>{p.label}:</strong> {p.text}</li>
                  ))}
                </ul>
              </>
            )}

            {/* prev / next */}
            <div className="prev-next">
              <Link to="/article/seo-after-ai-answers">
                <div className="label">← Previous story</div>
                <div className="title">SEO after AI answers: a publishing playbook</div>
              </Link>
              <Link to="/article/ghost-vs-substack" className="next">
                <div className="label">Next story →</div>
                <div className="title">Ghost vs Substack for newsletters</div>
              </Link>
            </div>

            <div className="author-box">
              <div className="avatar">ND</div>
              <div>
                <h3 style={{ fontFamily: "var(--serif)" }}>{post.author}</h3>
                <p style={{ fontSize: ".9rem" }}>The NewsScope desk covers tools, platforms and monetization for independent writers. Reach us via the contact page — corrections welcome.</p>
              </div>
            </div>
          </article>

          {/* sidebar */}
          <aside className="related">
            <h3>In this story</h3>
            <div id="toc">
              {(isFlagship
                ? ["#faq", "#verdict"]
                : []
              ).map((href) => (
                <a key={href} href={href}>{href === "#faq" ? "FAQ" : "Quick picks"}</a>
              ))}
              {POSTS.filter((p) => p.slug !== slug).slice(0, 4).map((p) => (
                <Link key={p.slug} to={`/article/${p.slug}`}>{p.title}</Link>
              ))}
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
