#!/usr/bin/env bash
set -euo pipefail

echo "--- GIT IDENTITY ---"
git config --get user.name || echo "<not set>"
git config --get user.email || echo "<not set>"

echo
echo "--- REPO PRESENCE ---"
git rev-parse --is-inside-work-tree 2>/dev/null || echo "false"
if [ -f .gitignore ]; then echo ".gitignore OK"; else echo "Missing .gitignore"; fi
if [ -f LICENSE ]; then echo "LICENSE OK"; else echo "Missing LICENSE"; fi

echo
echo "--- REMOTE & BRANCH ---"
git remote -v || true
git branch --show-current 2>/dev/null || echo '<none>'

echo
echo "--- COMMITS & PUSH ---"
git log --oneline -n 3 || true

echo
echo "--- WORKTREE STATUS ---"
git status --porcelain || true

echo
echo "--- SUMMARY COMMANDS ---"
# Provide the exact verification commands as required
cat <<'CMD'
# Identity
git config --get user.name
git config --get user.email

# Repo presence
git rev-parse --is-inside-work-tree
test -f .gitignore && echo ".gitignore OK" || echo "Missing .gitignore"
test -f LICENSE && echo "LICENSE OK" || echo "Missing LICENSE"

# Remote & branch
git remote -v
git branch --show-current

# Commits & push
git log --oneline -n 3 || true
git push -u origin $(git branch --show-current)

# Clean tree
git status --porcelain

# Build check (fresh install)
rm -rf node_modules
npm ci
npm run build
CMD

echo
echo "--- END ---" 
