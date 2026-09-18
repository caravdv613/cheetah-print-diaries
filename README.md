# Cheetah Print Diaries (placeholder name — see below)

A pink/red/cheetah-print blog with five themed sections, a weekly movie
roundup with star ratings, and a reader-story submission system that you
approve before anything goes live.

## How to run it

No install, no build step — it's plain HTML/CSS/JS.

1. Unzip the folder.
2. Double-click `index.html` to open it in your browser, **or** for the
   most reliable experience (especially the image uploads), run a tiny
   local server from inside the folder:
   - Python: `python3 -m http.server 8000` then visit `http://localhost:8000`
   - Node: `npx serve`
3. That's it — click around the nav to see every page.

## How to put it online (GitHub Pages)

This folder is ready to push straight to GitHub, with a GitHub Actions
workflow already included (`.github/workflows/deploy.yml`) that
auto-deploys the site to GitHub Pages every time you push to `main`.

**Easiest way — run the included script:**

```bash
chmod +x setup-github.sh
./setup-github.sh
```

This initializes git, makes the first commit, and either:
- creates the GitHub repo and pushes automatically (if you have the
  [GitHub CLI](https://cli.github.com/) installed and logged in), or
- prints the exact manual steps/commands if you don't.

Either way, the last step is the same in your repo on github.com:
**Settings → Pages → set Source to "GitHub Actions."** After that,
every future push to `main` redeploys the live site automatically.

**Prefer to do it by hand instead?**

```bash
git init
git branch -M main
git add .
git commit -m "Initial site"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

Then turn on Pages the same way: Settings → Pages → Source → GitHub
Actions.

**Other free hosting options**, if you'd rather skip GitHub:
- **Netlify** or **Vercel** — drag the folder onto their dashboard

Any of these will get you a real, public URL in a few minutes.

## How to customize it

- **Site name, tagline, nav labels, admin password, categories, social
  links** — all in one place: `js/config.js`. Change it there and it
  updates everywhere.
- **Colors, fonts** — top of `css/style.css` under `:root`. Swap the hex
  values or the Google Fonts import to change the whole look.
- **Placeholder posts** — in `js/storage.js` under `PLACEHOLDER_POSTS`
  and `PLACEHOLDER_MOVIES`. These only show up until you add real posts
  from the admin view, at which point your real posts take over.
- **About Us section** — directly in `index.html`, near the bottom.
- **Site name in the browser tab** — the `<title>` tag at the top of
  each HTML file.

## The admin view

Go to `admin.html` (also linked in the footer of every page) and log in
with the shared password from `js/config.js` (`adminPassword`). From
there you can:
- **Approve stories** — see everything submitted on the Stories page
  and approve or reject it. Only approved stories show up publicly.
- **Manage posts** — add new posts (with an optional image) to
  OnlyPans / OnlyScams / OnlyPlans / OnlyBans, or delete old ones.
- **Manage movie roundups** — add a new weekly roundup with as many
  titles and star ratings as you want, or delete an old one.

## Important limitations to know about (read this!)

This site stores everything in your **browser's local storage** — there
is no real server or database behind it. That's what let me build you
something that works immediately with zero setup, but it comes with
real trade-offs:

1. **Data is per-browser, not shared.** If you add a post or approve a
   story on your laptop, your friend won't see it on hers until the
   data is moved over — it's not synced between you two automatically.
2. **Visitors to your live site won't see each other's story
   submissions in real time**, and submissions made by visitors don't
   automatically reach *your* admin view unless they're using the same
   browser/device you check from. For a real public site where anyone
   can submit a story and you can approve it from anywhere, you'll
   eventually want a proper backend (a small database + server) — I can
   help you build that when you're ready, it's a natural next step from
   here.
3. **The admin password is not real security.** It's a simple check in
   the page's own code, which means anyone who looks at the page source
   could find it. It's enough to keep the button hidden from casual
   visitors, but not enough to stop someone determined. Fine for a
   private project between two friends; not fine if this ever needs to
   keep out a motivated stranger.
4. **Images are stored as embedded data**, which is simple but not
   efficient — keep uploaded images reasonably small, since browsers
   cap local storage at a few MB total.

None of this stops you from using and testing the site right now — it
just means "real backend" is the natural next step once you're ready to
launch this for real, with strangers submitting stories from their own
devices.

## What's still a placeholder

- The site name ("Cheetah Print Diaries") — you're still deciding on
  this, swap it in `js/config.js` once you land on one.
- All blog posts, movie roundups, and social links — replace with your
  real content via the admin view or by editing `js/storage.js` /
  `js/config.js` directly.
- Fonts and colors were chosen to match your Y2K/cheetah-print mood
  board — happy to adjust once you see it live.
