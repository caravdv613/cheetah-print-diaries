/* ============================================================
   SITE CONFIG
   Change things here and it updates across the whole site.
   ============================================================ */

const SITE_CONFIG = {
  // TODO: swap in your final site name once you've decided
  name: "Shameless",
  tagline: "food, money, travel, and things we can't stand.",

  // Shared password for the admin/approval view (index.html -> admin.html)
  // NOTE: this is a simple client-side password, fine for a private demo
  // between two friends, but it lives in this file in plain text, so
  // anyone who views the page source can see it. It is NOT secure enough
  // for anything sensitive. If this site ever needs real security
  // (so a stranger genuinely cannot get into the admin view), it needs
  // a real backend with server-side login — happy to help set that up
  // later.
  adminPassword: "CheetahgirlsOnelove",

  nav: [
    { label: "Home", href: "index.html" },
    { label: "OnlyPans", href: "onlypans.html" },
    { label: "OnlyScams", href: "onlyscams.html" },
    { label: "OnlyPlans", href: "onlyplans.html" },
    { label: "OnlyBans", href: "onlybans.html" },
    { label: "Movies...cause nothing works with Only", href: "movies.html" },
    { label: "Your Stories", href: "stories.html" },
  ],

  social: {
    instagram: "#",
    tiktok: "#",
    pinterest: "#",
  },

  // Category definitions used by the Stories page + admin panel.
  // key = internal id, label = shown to users, page = which content
  // page this category's approved posts can also feed into (optional)
  categories: [
    { key: "pans", label: "OnlyPans (food)", page: "onlypans.html" },
    { key: "scams", label: "OnlyScams (money)", page: "onlyscams.html" },
    { key: "plans", label: "OnlyPlans (travel)", page: "onlyplans.html" },
    { key: "bans", label: "OnlyBans (things we hate)", page: "onlybans.html" },
    { key: "movies", label: "Movies & pop culture", page: "movies.html" },
    { key: "other", label: "Something else" },
  ],
};
