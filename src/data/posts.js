/* ------------------------------------------------------------
   NewsScope sample data — edit this file to add/change stories.
   All text is original template placeholder content.
   ------------------------------------------------------------ */

export const SITE = {
  name: "NewsScope",
  tagline: "Insight · Analysis · Stories",
  sections: [
    { label: "Home", to: "/" },
    { label: "Blog", to: "/blog" },
    { label: "Platforms", to: "/article/best-blogging-platforms-2026" },
    { label: "Technology", to: "/blog?cat=tech" },
    { label: "Business", to: "/blog?cat=money" },
    { label: "AI & Creators", to: "/blog?cat=ai" },
  ],
};

/* ---------- Blog posts (cat keys drive the filter chips) ---------- */
export const POSTS = [
  {
    slug: "best-blogging-platforms-2026",
    title: "The 17 Best Blogging Platforms of 2026: Ranked, Scored and Compared",
    img: "/img/platforms-writing.jpg",
    desc: "Our flagship comparison: 11 criteria, real pricing, a verdict table and full source citations.",
    cat: "platforms",
    catLabel: "Platforms · Guide",
    author: "NewsScope Desk",
    date: "20 Oct 2026",
    readTime: "11 min",
    ph: "ph-2",
    featured: true,
    hasBody: true,
  },
  {
    slug: "wordpress-org-vs-wordpress-com",
    title: "WordPress.org vs WordPress.com: same name, different game",
    img: "/img/wordpress-code.jpg",
    desc: "The hosted and self-hosted versions share a brand and almost nothing else. Here's how to choose.",
    cat: "platforms",
    catLabel: "Platforms",
    author: "Rohit Aryan",
    date: "16 Oct 2026",
    readTime: "6 min",
    ph: "ph-6",
  },
  {
    slug: "paid-memberships-vs-ads",
    title: "Paid memberships vs ads vs affiliate links: the honest math for 2026",
    img: "/img/memberships-business.jpg",
    desc: "Three monetization paths, tracked over a year on a mid-size blog. The multiplier nobody expects.",
    cat: "money",
    catLabel: "Monetization",
    author: "Ardna Sood",
    date: "15 Oct 2026",
    readTime: "9 min",
    ph: "ph-3",
  },
  {
    slug: "ai-site-builders-test",
    title: "Five AI site builders prompted with the same blog brief — side by side",
    img: "/img/ai-abstract.jpg",
    desc: "We asked identical questions of five builders. Output structure, tone and layout compared.",
    cat: "ai",
    catLabel: "AI Tools",
    author: "Pooja Malhotra",
    date: "12 Oct 2026",
    readTime: "7 min",
    ph: "ph-4",
  },
  {
    slug: "seo-after-ai-answers",
    title: "SEO after AI answers: a publishing playbook for the zero-click era",
    img: "/img/seo-dashboard.jpg",
    desc: "Search behaves differently when an engine answers before a reader clicks. What still works.",
    cat: "seo",
    catLabel: "SEO & Marketing",
    author: "Kabir Menon",
    date: "10 Oct 2026",
    readTime: "10 min",
    ph: "ph-1",
  },
  {
    slug: "ship-blog-for-free",
    title: "Ship your blog for free: GitHub Pages, Netlify and Vercel compared",
    img: "/img/dev-laptop.jpg",
    desc: "Three free deployment paths for a static site — limits, domains and build times, tested.",
    cat: "tech",
    catLabel: "Dev & Tech",
    author: "Meera Kulkarni",
    date: "08 Oct 2026",
    readTime: "6 min",
    ph: "ph-8",
  },
  {
    slug: "ghost-vs-substack",
    title: "Ghost vs Substack for newsletters: where each one wins",
    img: "/img/ghost-newsletters.jpg",
    desc: "Two publishing philosophies, one job: get your words into inboxes and get paid for it.",
    cat: "platforms",
    catLabel: "Platforms",
    author: "Rohit Aryan",
    date: "05 Oct 2026",
    readTime: "8 min",
    ph: "ph-7",
  },
  {
    slug: "nine-niches-revenue",
    title: "Nine blog niches, one year of revenue: which niches actually pay",
    img: "/img/niches-analytics.jpg",
    desc: "Aggregated earnings data across finance, food, travel and more — with the monotonic winner.",
    cat: "money",
    catLabel: "Monetization",
    author: "Ardna Sood",
    date: "02 Oct 2026",
    readTime: "9 min",
    ph: "ph-9",
  },
  {
    slug: "headline-patterns",
    title: "Headlines that get clicked and shared: patterns from 200 top posts",
    img: "/img/headlines-paper.jpg",
    desc: "Number-led titles beat questions in search, but not in social. The split strategy explained.",
    cat: "seo",
    catLabel: "SEO & Marketing",
    author: "Ira Dutt",
    date: "28 Sep 2026",
    readTime: "5 min",
    ph: "ph-5",
  },
];

export const FILTERS = [
  { key: "all", label: "All Posts" },
  { key: "platforms", label: "Platforms" },
  { key: "seo", label: "SEO & Marketing" },
  { key: "ai", label: "AI Tools" },
  { key: "money", label: "Monetization" },
  { key: "tech", label: "Dev & Tech" },
];

/* ---------- Latest updates (homepage sidebar) ---------- */
export const LATEST = [
  { time: "09:41", title: "WordPress teases a native AI block editor for its next major release", meta: "Technology · 2 min" },
  { time: "08:56", title: "Ghost tops an 11-criteria comparison of publishing platforms for monetization", meta: "Platforms · 3 min" },
  { time: "08:12", title: "Newsletters over feeds: why independent writers are leaving social platforms behind", meta: "Analysis · 4 min" },
  { time: "07:30", title: "Squarespace launches blueprint AI that drafts a full blog site in one prompt", meta: "Tools · 2 min" },
  { time: "06:47", title: "Affiliate or ads? New study compares how nine blog niches actually earn", meta: "Business · 5 min" },
];

/* ---------- Factual platform data (with sources below) ---------- */
export const PLATFORMS = [
  { rank: 1, name: "WordPress.org", link: "https://wordpress.org", bestFor: "Full control, full-time bloggers", pricing: "Free software; hosting extra" },
  { rank: 2, name: "WordPress.com", link: "https://wordpress.com", bestFor: "Getting started quickly", pricing: "Free; paid from ~$4/mo" },
  { rank: 3, name: "Wix", link: "https://www.wix.com", bestFor: "Beginners & small businesses", pricing: "Free; paid from ~$17/mo" },
  { rank: 4, name: "Squarespace", link: "https://www.squarespace.com", bestFor: "Design-focused, monetized blogs", pricing: "From ~$16/mo" },
  { rank: 5, name: "Medium", link: "https://medium.com", bestFor: "Built-in audience, writers", pricing: "Free; Partner Program" },
  { rank: 6, name: "Ghost", link: "https://ghost.org", bestFor: "Memberships, newsletters, influencers", pricing: "Free self-hosted; Pro from ~$15/mo" },
  { rank: 7, name: "Substack", link: "https://substack.com", bestFor: "Newsletter-first publishing", pricing: "Free until paid (10% fee)" },
  { rank: 8, name: "Blogger", link: "https://www.blogger.com", bestFor: "Free custom domain (Google)", pricing: "Free" },
  { rank: 9, name: "Tumblr", link: "https://www.tumblr.com", bestFor: "Microblogging", pricing: "Free; paid from ~$5/mo" },
  { rank: 10, name: "LinkedIn", link: "https://www.linkedin.com", bestFor: "Professional / B2B articles", pricing: "Free" },
  { rank: 11, name: "Webflow", link: "https://webflow.com", bestFor: "Advanced design control", pricing: "From ~$14/mo" },
  { rank: 12, name: "Hostinger Builder", link: "https://www.hostinger.com", bestFor: "Budget AI-powered blogs", pricing: "From ~$12.99/mo" },
  { rank: 13, name: "Hashnode", link: "https://hashnode.com", bestFor: "Developer blogging", pricing: "Free custom domain" },
  { rank: 14, name: "HubSpot Content Hub", link: "https://www.hubspot.com", bestFor: "B2B content marketing", pricing: "Free tier; pro from $10/mo" },
  { rank: 15, name: "Drupal", link: "https://www.drupal.org", bestFor: "Enterprise, complex sites", pricing: "Free, open source" },
  { rank: 16, name: "Write.as", link: "https://write.as", bestFor: "Minimalist publishing", pricing: "Free; paid from $6/mo" },
  { rank: 17, name: "Jekyll", link: "https://jekyllrb.com", bestFor: "Static sites for developers", pricing: "Free, open source" },
];

export const QUICK_PICKS = [
  { label: "Best overall", text: "WordPress.org (full control)" },
  { label: "Best for design", text: "Squarespace" },
  { label: "Best free", text: "Blogger / Medium" },
  { label: "Best for developers", text: "Ghost / Hashnode" },
];

export const FAQS = [
  { q: "Which blogging platform is best for beginners in 2026?", a: "Wix and Squarespace are repeatedly cited as the easiest starting points thanks to drag-and-drop editors and templates, while WordPress.com and Blogger are the strongest genuinely free routes. If you expect to grow or sell products, starting on self-hosted WordPress.org avoids a future migration." },
  { q: "What is the cheapest way to start a blog?", a: "Blogger (free hosting plus a free custom domain connection) and Medium (free publishing) cost nothing at all. A free WordPress.com or Wix plan also works, though free tiers usually mean subdomains, limited storage and platform ads." },
  { q: "Which platform is best for monetization?", a: "Ghost topped a recent 17-platform, 11-criteria comparison largely on audience and monetization strength, thanks to native paid memberships and newsletters. Substack is the simplest newsletter-first path, and self-hosted WordPress has no ceiling on ad, affiliate or sponsorship options." },
  { q: "Can I move my blog to another platform later?", a: "Yes, but with cost. Portability is strongest on open-source engines (WordPress, Ghost, Drupal) because you own the database and files. On hosted platforms like Medium or Tumblr your visibility depends on the platform's algorithm and export options are narrower." },
];

export const CITATIONS = [
  { outlet: "HubSpot Blog", title: "The 11 best blogging platforms (& how to pick one), Sep 2026", url: "https://blog.hubspot.com/marketing/best-blogging-platform" },
  { outlet: "Forbes Advisor", title: "10 Best Blogging Platforms, Oct 2026", url: "https://www.forbes.com/advisor/business/software/best-blogging-platforms/" },
  { outlet: "Zapier", title: "The 5 best blog sites in 2026", url: "https://zapier.com/blog/best-blog-sites/" },
  { outlet: "Wix Blog", title: "The 9 Best Blogging Platforms In 2026, Sep 2026", url: "https://www.wix.com/blog/best-blogging-platforms" },
  { outlet: "Squarespace Blog", title: "7 Best Blogging Platforms in 2026", url: "https://www.squarespace.com/blog/best-blog-website-builder" },
  { outlet: "Position Is Everything", title: "Best Blogging Platforms in 2026 — 124 platforms reviewed, Oct 2026", url: "https://www.positioniseverything.net/best/blogging-platforms/" },
  { outlet: "Feather.so", title: "The 12 Best Sites To Host A Blog: Your 2026 Guide", url: "https://feather.so/blog/best-site-to-host-a-blog" },
  { outlet: "Printful", title: "Best Blogging Platforms in 2026: Top 15 Sites Compared", url: "https://www.printful.com/blog/best-blogging-platform" },
  { outlet: "FAUN Toolbox", title: "Best Blogging Platforms ranked and compared — 17 platforms, 11 criteria", url: "https://faun.dev/toolbox/compare-blogging-platforms/" },
  { outlet: "Marketing Scoop", title: "How to Choose the Best Blogging Platform (Compared)", url: "https://www.marketingscoop.com/website/wordpress/how-to-choose-the-best-blogging-platform/" },
];

/* ---------- Top News Today (TC-15 / TC-16) ----------
   Source: NDTV official RSS feed (syndication-intended).
   Policy: sirf headline TITLE + original link, "via NDTV" attribution.
   Article text / photos NAHI copy karte (IP compliance, RFP G12).
   Daily refresh: fetchedAt + feedUrl ke zariye (manual ya GitHub Action). */
export const NEWS_SOURCE = {
  name: "NDTV",
  siteUrl: "https://www.ndtv.com/",
  feedUrl: "https://feeds.feedburner.com/ndtvnews-top-stories",
  fetchedAt: "22 Oct 2026 · 07:47 IST",
};

export const NEWS = [
  {
    headline: "\"Politics Is Tough Business\": JD Vance On Row Over Vivek Ramaswamy's Controversial Ad On Rival",
    url: "https://www.ndtv.com/world-news/jd-vance-disgusted-by-republicans-over-vivek-ramaswamys-controversial-ad-12217357",
    time: "07:25", tag: "World", ph: "ph-1",
  },
  {
    headline: "Trump Envoy Calls Putin \"Humanitarian\", Sparks Backlash",
    url: "https://www.ndtv.com/world-news/trump-envoy-steve-witkoff-calls-putin-humanitarian-sparks-backlash-12217861",
    time: "07:23", tag: "World", ph: "ph-2",
  },
  {
    headline: "'Kept Children Addictive On Social Media': Meta Sued In Australia",
    url: "https://www.ndtv.com/world-news/meta-facebook-instagram-sued-in-australia-kept-children-addictive-on-social-media-12217854",
    time: "07:21", tag: "Tech", ph: "ph-3",
  },
  {
    headline: "Ladakh Panchayat Polls To Be Held On November 21",
    url: "https://www.ndtv.com/india-news/ladakh-panchayat-polls-to-be-held-on-november-21-12217846",
    time: "07:15", tag: "India", ph: "ph-4",
  },
  {
    headline: "Donald Trump Says \"Much Different Kind\" Of India-US Trade Deal Is \"Pretty Close\"",
    url: "https://www.ndtv.com/world-news/donald-trump-says-much-different-kind-of-india-us-trade-deal-is-pretty-close-12217827",
    time: "07:10", tag: "World", ph: "ph-5",
  },
  {
    headline: "X Community Notes Failed To Flag 93% Of US Midterm False Claims: Report",
    url: "https://www.ndtv.com/world-news/x-community-notes-failed-to-flag-93-of-us-midterm-false-claims-report-12217807",
    time: "06:57", tag: "Tech", ph: "ph-6",
  },
];
