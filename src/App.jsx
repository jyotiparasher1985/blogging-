import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Blog from "./pages/Blog.jsx";
import Article from "./pages/Article.jsx";

export default function App() {
  const { pathname } = useLocation();

  /* Dark mode state — TC-10: persists in localStorage("newscope-theme") */
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("newscope-theme") || "light"; }
    catch (e) { return "light"; }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark);
    try { localStorage.setItem("newscope-theme", dark); } catch (e) {}
  }, [dark]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Layout dark={dark} setDark={setDark}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/article/:slug" element={<Article />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

function NotFound() {
  return (
    <main className="container">
      <div className="page-head" style={{ paddingBottom: 60 }}>
        <h1>404 — Story not found</h1>
        <p>The page you're looking for moved or never existed.</p>
        <p style={{ marginTop: 20 }}>
          <a className="btn btn-primary" href="/">← Back to homepage</a>
        </p>
      </div>
    </main>
  );
}
