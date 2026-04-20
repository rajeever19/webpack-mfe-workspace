#!/bin/bash

echo "🚀 Pushing project to GitHub..."

REPO_URL="https://github.com/rajeever19/webpack-mfe-workspace.git"

# Init if not already
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - React Monolith + MFE setup"

# Set branch
git branch -M main

# Add remote (ignore if exists)
git remote remove origin 2> /dev/null
git remote add origin $REPO_URL

# Push
git push -u origin main

echo "✅ Done! Code pushed to GitHub 🚀"