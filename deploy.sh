#!/bin/bash
# Deploy Task 2 (dist/) to GitHub Pages
set -e

REPO_NAME="internship-task-document"
GITHUB_USER="elephantulip2527"

export PATH="/opt/homebrew/bin:$PATH"

echo "→ Building project..."
npm run build

echo "→ Checking GitHub auth..."
gh auth status || { echo "Run: gh auth login -h github.com -s repo"; exit 1; }

echo "→ Creating GitHub repo (if needed)..."
if ! gh repo view "$GITHUB_USER/$REPO_NAME" &>/dev/null; then
  gh repo create "$REPO_NAME" --public --source=. --remote=origin --description "Task 2 - Nunjucks + Vite Internship Document"
else
  git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git" 2>/dev/null || true
fi

echo "→ Pushing source code..."
git push -u origin main

echo "→ Deploying dist/ to gh-pages branch..."
cd dist
git init
git checkout -b gh-pages
git add .
git commit -m "Deploy Task 2 compiled output"
git remote add origin "https://github.com/$GITHUB_USER/$REPO_NAME.git"
git push -f origin gh-pages

LIVE_URL="https://$GITHUB_USER.github.io/$REPO_NAME/"
echo ""
echo "✅ Deployed!"
echo "   Repo:  https://github.com/$GITHUB_USER/$REPO_NAME"
echo "   Live:  $LIVE_URL"
