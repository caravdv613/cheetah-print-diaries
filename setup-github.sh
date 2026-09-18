#!/usr/bin/env bash
# ============================================================
# setup-github.sh
# Run this once, from inside the site folder, to get this
# project onto GitHub with Pages hosting turned on.
#
# Usage:
#   chmod +x setup-github.sh
#   ./setup-github.sh
# ============================================================

set -e

REPO_NAME="cheetah-print-diaries"   # change this if you picked a different name

echo "== Initializing git repo =="
if [ -d .git ]; then
  echo "Git repo already exists, skipping init."
else
  git init
  git branch -M main
fi

git add .
git commit -m "Initial site: pages, admin panel, story submissions" || echo "Nothing new to commit."

echo ""
echo "== Connecting to GitHub =="

if command -v gh &> /dev/null; then
  echo "GitHub CLI found — creating the repo and pushing automatically."
  gh repo create "$REPO_NAME" --public --source=. --remote=origin --push
  echo ""
  echo "Done! Now turn on Pages:"
  echo "  1. Go to your new repo on github.com"
  echo "  2. Settings -> Pages"
  echo "  3. Under 'Build and deployment', set Source to 'GitHub Actions'"
  echo "     (the included workflow will then deploy automatically)"
else
  echo "GitHub CLI ('gh') not found, so this part is manual — it only takes a minute:"
  echo ""
  echo "  1. Go to https://github.com/new and create a new repo named '$REPO_NAME'"
  echo "     (don't add a README/license/gitignore — this folder already has one)"
  echo "  2. Copy the commands GitHub shows you under"
  echo "     '...or push an existing repository from the command line', which will look like:"
  echo ""
  echo "       git remote add origin https://github.com/YOUR-USERNAME/$REPO_NAME.git"
  echo "       git push -u origin main"
  echo ""
  echo "  3. Once pushed, go to the repo's Settings -> Pages"
  echo "  4. Under 'Build and deployment', set Source to 'GitHub Actions'"
  echo "     (the included workflow at .github/workflows/deploy.yml will deploy it)"
fi

echo ""
echo "Your site will then be live at:"
echo "  https://YOUR-USERNAME.github.io/$REPO_NAME/"
