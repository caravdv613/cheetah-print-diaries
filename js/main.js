/* ============================================================
   SHARED SITE CHROME
   Renders the header/nav and footer into every page from
   SITE_CONFIG, so you only ever edit config.js to rebrand.
   ============================================================ */

function currentFile() {
  const path = window.location.pathname.split("/");
  return path[path.length - 1] || "index.html";
}

function renderHeader() {
  const el = document.getElementById("site-header");
  if (!el) return;
  const here = currentFile();

  const links = SITE_CONFIG.nav
    .map((item) => {
      const active = item.href === here ? " active" : "";
      return `<a class="nav-link${active}" href="${item.href}">${item.label}</a>`;
    })
    .join("");

  el.innerHTML = `
    <div class="header-inner">
      <a class="brand" href="index.html">
        <span class="brand-star" aria-hidden="true">${starSVG(28)}</span>
        <span class="brand-name">${SITE_CONFIG.name}</span>
      </a>
      <button class="nav-toggle" id="nav-toggle" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <nav class="site-nav" id="site-nav">${links}</nav>
    </div>
  `;

  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

function renderFooter() {
  const el = document.getElementById("site-footer");
  if (!el) return;
  el.innerHTML = `
    <div class="footer-inner">
      <div class="footer-brand">${SITE_CONFIG.name}</div>
      <p class="footer-tagline">${SITE_CONFIG.tagline}</p>
      <div class="footer-social">
        <a href="${SITE_CONFIG.social.instagram}" aria-label="Instagram">Instagram</a>
        <a href="${SITE_CONFIG.social.tiktok}" aria-label="TikTok">TikTok</a>
        <a href="${SITE_CONFIG.social.pinterest}" aria-label="Pinterest">Pinterest</a>
      </div>
      <a class="footer-admin" href="admin.html">Admin</a>
    </div>
  `;
}

/* ---------------- Small shared UI helpers ---------------- */

function starSVG(size) {
  size = size || 18;
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 1.5l3.09 6.26 6.91 1-5 4.87 1.18 6.87L12 17.27l-6.18 3.23L7 13.63l-5-4.87 6.91-1L12 1.5z"/>
  </svg>`;
}

function starRating(count, max) {
  max = max || 5;
  let out = '<span class="stars" aria-label="' + count + " out of " + max + ' stars">';
  for (let i = 1; i <= max; i++) {
    out += `<span class="star ${i <= count ? "filled" : ""}">${starSVG(18)}</span>`;
  }
  out += "</span>";
  return out;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str == null ? "" : str;
  return div.innerHTML;
}

/* ---------------- Category page rendering ---------------- */

function renderPostGrid(category, containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const posts = getPostsByCategory(category);

  if (posts.length === 0) {
    el.innerHTML = `<div class="empty-state">No posts here yet. Add one from the <a href="admin.html" style="color:var(--pink); font-weight:700;">admin view</a>.</div>`;
    return;
  }

  el.innerHTML = posts
    .map(
      (p) => `
    <article class="post-card">
      <div class="post-card-media">
        ${p.image ? `<img src="${p.image}" alt="${escapeHTML(p.title)}">` : starSVG(40)}
      </div>
      <div class="post-card-body">
        <div class="post-card-date">${formatDate(p.date)}</div>
        <h3>${escapeHTML(p.title)}</h3>
        <p>${escapeHTML(p.body)}</p>
      </div>
    </article>
  `
    )
    .join("");
}

/* ---------------- Movie roundup rendering ---------------- */

function renderMovieRoundups(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const posts = getMoviePosts();

  if (posts.length === 0) {
    el.innerHTML = `<div class="empty-state">No roundups posted yet. Add one from the <a href="admin.html" style="color:var(--pink); font-weight:700;">admin view</a>.</div>`;
    return;
  }

  el.innerHTML = posts
    .map(
      (post) => `
    <div class="movie-roundup">
      <div class="movie-roundup-date">${formatDate(post.date)}</div>
      <h3>${escapeHTML(post.title)}</h3>
      <p>${escapeHTML(post.body)}</p>
      ${(post.items || [])
        .map(
          (item) => `
        <div class="movie-item">
          <div>
            <div class="movie-item-name">${escapeHTML(item.name)}</div>
            <div class="movie-item-note">${escapeHTML(item.note)}</div>
          </div>
          ${starRating(item.stars)}
        </div>
      `
        )
        .join("")}
    </div>
  `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
});
