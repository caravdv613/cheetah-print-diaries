/* ============================================================
   STORAGE LAYER
   Everything is saved in this browser's localStorage. That means:
   - It works immediately, no setup, no server.
   - It only lives on the device/browser that made the change —
     if you post from your laptop, it won't show up on your
     friend's laptop until you export/import or move to a real
     backend. Fine for building + testing; for a live multi-person
     site, this is the part to eventually upgrade.
   ============================================================ */

const DB_KEYS = {
  posts: "op_posts",       // regular blog posts (all categories except movies)
  movies: "op_movies",     // movie/TV roundup posts
  stories: "op_stories",   // user-submitted stories (pending/approved/rejected)
  adminSession: "op_admin_session",
};

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function readDB(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    console.error("Storage read failed for", key, e);
    return fallback;
  }
}

function writeDB(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error("Storage write failed for", key, e);
    return false;
  }
}

/* ---------------- Placeholder / seed content ---------------- */

const PLACEHOLDER_POSTS = [
  {
    id: "seed-pans-1",
    category: "pans",
    title: "We tried the $4 gas station sushi so you don't have to",
    body: "Spoiler: it was exactly as unhinged as you're imagining. Full breakdown of what we ate, what we're never touching again, and the one surprise winner.",
    image: "",
    date: "2026-08-01",
  },
  {
    id: "seed-scams-1",
    category: "scams",
    title: "The $60 jade roller: worth it or waste it?",
    body: "We spent actual money on a skincare tool TikTok promised would change our lives. Here's the honest verdict, receipts included.",
    image: "",
    date: "2026-08-05",
  },
  {
    id: "seed-plans-1",
    category: "plans",
    title: "48 hours, no plan, one carry-on",
    body: "How a spontaneous weekend trip somehow went smoother than the vacation we spent three months planning.",
    image: "",
    date: "2026-08-10",
  },
  {
    id: "seed-bans-1",
    category: "bans",
    title: "Things we will not be doing anymore, a list",
    body: "Starting with reply-all emails and ending with people who say 'per my last email.' You know who you are.",
    image: "",
    date: "2026-08-12",
  },
];

const PLACEHOLDER_MOVIES = [
  {
    id: "seed-movie-1",
    title: "This week's roundup",
    body: "Three rewatches and one questionable new release stood between us and our couch this week.",
    items: [
      { name: "The Grand Budapest Hotel", stars: 5, note: "Rewatch. Still perfect. Still quoting it for a week." },
      { name: "Some new streaming thriller", stars: 2, note: "Twist was visible from space." },
      { name: "Cooking competition show, season 4", stars: 4, note: "Comfort viewing, no notes." },
      { name: "Rosebush pruning", stars: 3, note: "Weird." },
    ],
    date: "2026-08-15",
  },
];

/* ---------------- Posts (non-movie categories) ---------------- */

function getAllPosts() {
  return readDB(DB_KEYS.posts, PLACEHOLDER_POSTS);
}

function getPostsByCategory(category) {
  return getAllPosts()
    .filter((p) => p.category === category)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function addPost(post) {
  const posts = getAllPosts();
  posts.push({ id: uid(), date: new Date().toISOString().slice(0, 10), ...post });
  writeDB(DB_KEYS.posts, posts);
}

function deletePost(id) {
  const posts = getAllPosts().filter((p) => p.id !== id);
  writeDB(DB_KEYS.posts, posts);
}

/* ---------------- Movie posts ---------------- */

function getMoviePosts() {
  return readDB(DB_KEYS.movies, PLACEHOLDER_MOVIES).sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
}

function addMoviePost(entry) {
  const posts = readDB(DB_KEYS.movies, PLACEHOLDER_MOVIES);
  posts.push({ id: uid(), date: new Date().toISOString().slice(0, 10), ...entry });
  writeDB(DB_KEYS.movies, posts);
}

function deleteMoviePost(id) {
  const posts = readDB(DB_KEYS.movies, PLACEHOLDER_MOVIES).filter((p) => p.id !== id);
  writeDB(DB_KEYS.movies, posts);
}

/* ---------------- User story submissions ---------------- */

function getAllStories() {
  return readDB(DB_KEYS.stories, []);
}

function getApprovedStories(category) {
  return getAllStories()
    .filter((s) => s.status === "approved" && (!category || category === "all" || s.category === category))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

function getPendingStories() {
  return getAllStories()
    .filter((s) => s.status === "pending")
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

function submitStory({ name, category, text }) {
  const stories = getAllStories();
  stories.push({
    id: uid(),
    name: name && name.trim() ? name.trim() : "Anonymous",
    category,
    text: text.trim(),
    status: "pending",
    date: new Date().toISOString(),
  });
  writeDB(DB_KEYS.stories, stories);
}

function setStoryStatus(id, status) {
  const stories = getAllStories().map((s) => (s.id === id ? { ...s, status } : s));
  writeDB(DB_KEYS.stories, stories);
}

/* ---------------- Admin session ---------------- */

function isAdminLoggedIn() {
  return sessionStorage.getItem(DB_KEYS.adminSession) === "true";
}

function loginAdmin(password) {
  if (password === SITE_CONFIG.adminPassword) {
    sessionStorage.setItem(DB_KEYS.adminSession, "true");
    return true;
  }
  return false;
}

function logoutAdmin() {
  sessionStorage.removeItem(DB_KEYS.adminSession);
}

/* ---------------- Image handling (base64, no backend) ---------------- */

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
