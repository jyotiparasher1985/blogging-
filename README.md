# NewsScope — React Blogging Website

Ek original **news portal + blog** React template (Vite + React 19 + React Router 7).
Layout style: news-homepage (hero grid, latest sidebar, trending) + long-form blog article page (TOC, comparison table, FAQ, citations).

> Ye template 100% original hai — kisi third-party website (jaise Business Insider ya Marketing Scoop) ka clone nahi hai.
> Unke logos, brand names aur article text copyright-protected hote hain; is mein sirf wahi layout patterns use hue hain jaise har news website use karti hai.

## 🚀 Run karo

```bash
npm install      # pehli baar
npm run dev      # development → http://localhost:5173
npm run build    # production build → dist/
npm run preview  # build ko locally test karo
```

## 📁 Structure

```
src/
├── main.jsx            # entry point (BrowserRouter)
├── App.jsx             # routes: / , /blog , /article/:slug
├── index.css           # poori styling (dark mode variables yahin hain)
├── data/posts.js       # ★ SARA CONTENT YAHAAN EDIT KARO ★
│   ├── SITE            # naav labels + links
│   ├── POSTS           # blog cards (slug, title, desc, cat, author…)
│   ├── LATEST          # homepage sidebar updates
│   ├── PLATFORMS       # 17-platform comparison table data
│   ├── FAQS            # FAQ section
│   └── CITATIONS       # sources list
├── components/
│   ├── Layout.jsx      # topbar, masthead, nav, ticker, newsletter, footer
│   └── Placeholder.jsx # license-free photo ya gradient art (self-hosted public/img/ — no CDN)
└── pages/
    ├── Home.jsx        # hero + trending + category sections
    ├── Blog.jsx        # listing + filter chips + search (?q=)
    └── Article.jsx     # article page (flagship guide + generic fallback)
```

## ✏️ Naya article kaise add karein

1. `src/data/posts.js` me `POSTS` array mein naya object add karo:
   ```js
   { slug: "mera-naya-post", title: "…", desc: "…", cat: "tech",
     catLabel: "Dev & Tech", author: "Aapka Naam", date: "21 Oct 2026",
     readTime: "5 min", ph: "ph-8" }
   ```
2. Category chips: `cat` values — `platforms | seo | ai | money | tech`
3. Colors: `ph-1` … `ph-10` (gradient placeholders)
4. Full article daalne ke liye `Article.jsx` mein body add karo (flagship rahega `best-blogging-platforms-2026`)

## 🌙 Features

- Dark mode (localStorage me save hota hai)
- Responsive (desktop / tablet / mobile)
- Reading progress bar (article page)
- Category filters + search
- Breaking news ticker
- Back-to-top button
- Complex routes / deploy:
  - **Firebase Hosting (chosen — project `blogging-5760b`):** `firebase.json` me SPA rewrite (`**` → `index.html`) — deep links (`/article/...`) direct kaam karte hain ✅ · `npm run build` → `npx firebase deploy --only hosting`
  - **Netlify / Vercel:** auto SPA fallback ✅ (alternative)
  - **GitHub Pages:** deep-links (`/article/...`) ke liye SPA fallback zaroori hai — homepage se hi browse karoge to chalega

## 📜 Legal note

Platform names, links aur pricing facts public information hain (sources article page me cited hain).
Apni live site pe kisi bhi publisher ka exact design/branding/content copy karne se bachein — original template use karein.
