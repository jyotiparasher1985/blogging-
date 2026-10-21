/* NewsScope — theme JS (menu, dark mode, search, filters, progress, misc) */
(function () {
  "use strict";

  /* ---------- Current date in topbar ---------- */
  var dateEl = document.getElementById("topbar-date");
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString("en-IN", {
      weekday: "long", year: "numeric", month: "long", day: "numeric"
    });
  }

  /* ---------- Dark / light theme ---------- */
  var root = document.documentElement;
  var themeBtn = document.getElementById("theme-toggle");
  function applyTheme(t) { root.setAttribute("data-theme", t); }
  try {
    var saved = localStorage.getItem("newscope-theme");
    if (saved) applyTheme(saved);
  } catch (e) {}

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("newscope-theme", next); } catch (e) {}
    });
  }

  /* ---------- Search popover ---------- */
  var searchBtn = document.getElementById("search-toggle");
  var searchPop = document.getElementById("search-pop");
  if (searchBtn && searchPop) {
    searchBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      searchPop.classList.toggle("open");
      if (searchPop.classList.contains("open")) searchPop.querySelector("input").focus();
    });
    document.addEventListener("click", function (e) {
      if (!searchPop.contains(e.target) && e.target !== searchBtn) searchPop.classList.remove("open");
    });
  }

  /* ---------- Sticky nav shadow + nav toggle (mobile) ---------- */
  var navBar = document.getElementById("nav-bar");
  var navToggle = document.getElementById("nav-toggle");
  if (navBar) {
    window.addEventListener("scroll", function () {
      navBar.classList.toggle("stuck", window.scrollY > 140);
    });
    if (navToggle) {
      navToggle.addEventListener("click", function () {
        var inner = navBar.querySelector(".nav-inner");
        var closed = getComputedStyle(inner).maxHeight === "0px";
        inner.style.maxHeight = closed ? inner.scrollHeight + "px" : "0px";
      });
    }
  }

  /* ---------- Newsletter demo ---------- */
  var nlForm = document.getElementById("nl-form");
  if (nlForm) {
    nlForm.addEventListener("submit", function (e) {
      e.preventDefault();
      nlForm.nextElementSibling.classList.add("show");
      nlForm.reset();
    });
  }

  /* ---------- Back to top ---------- */
  var toTop = document.getElementById("to-top");
  if (toTop) {
    window.addEventListener("scroll", function () {
      toTop.classList.toggle("show", window.scrollY > 600);
    });
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Blog category filter ---------- */
  var chips = document.querySelectorAll(".chip[data-filter]");
  if (chips.length) {
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        var f = chip.getAttribute("data-filter");
        document.querySelectorAll(".blog-card").forEach(function (card) {
          card.classList.toggle("hide", f !== "all" && card.getAttribute("data-cat") !== f);
        });
      });
    });
  }

  /* ---------- Article: reading progress bar ---------- */
  var progress = document.getElementById("progress-bar");
  if (progress) {
    window.addEventListener("scroll", function () {
      var doc = document.documentElement;
      var total = doc.scrollHeight - doc.clientHeight;
      progress.style.width = (doc.scrollTop / total * 100) + "%";
    });
  }

  /* ---------- Article: active TOC link on scroll ---------- */
  var tocLinks = document.querySelectorAll("#toc a");
  if (tocLinks.length) {
    var headings = [];
    tocLinks.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      var h = document.getElementById(id);
      if (h) headings.push([h, a]);
    });
    var highlight = function () {
      var current = headings[0];
      headings.forEach(function (pair) {
        if (pair[0].getBoundingClientRect().top < 140) current = pair;
      });
      tocLinks.forEach(function (a) { a.classList.remove("active"); });
      if (current) current[1].classList.add("active");
    };
    window.addEventListener("scroll", highlight);
    highlight();
  }
})();
