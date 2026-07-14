#!/bin/bash

echo "🚀 MF Leaderboard - GitHub Pages Deployment Script"
echo "=================================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📝 Initializing git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git already initialized"
fi

# Get GitHub username
echo ""
read -p "Enter your GitHub username: " username

if [ -z "$username" ]; then
    echo "❌ Error: Username cannot be empty"
    exit 1
fi

# Check if remote exists
if git remote | grep -q "origin"; then
    echo "⚠️  Remote 'origin' already exists. Removing..."
    git remote remove origin
fi

# Add remote
echo "📡 Adding GitHub remote..."
git remote add origin "https://github.com/$username/realtime-MF.git"
echo "✅ Remote added"

# Add all files
echo ""
echo "📦 Adding files..."
git add .
echo "✅ Files added"

# Commit
echo ""
read -p "Enter commit message (or press Enter for default): " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="MF Leaderboard - Real-time updates"
fi

echo "💾 Committing changes..."
git commit -m "$commit_msg"
echo "✅ Changes committed"

# Push to GitHub
echo ""
echo "🚀 Pushing to GitHub..."
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ =================================================="
    echo "✅ Successfully pushed to GitHub!"
    echo "✅ =================================================="
    echo ""
    echo "📋 Next Steps:"
    echo "1. Go to: https://github.com/$username/realtime-MF/settings/pages"
    echo "2. Under 'Source', select 'GitHub Actions'"
    echo "3. Wait 2-3 minutes for deployment"
    echo "4. Visit: https://$username.github.io/realtime-MF/"
    echo ""
    echo "🎉 Your website will be live soon!"
else
    echo ""
    echo "❌ Error: Failed to push to GitHub"
    echo "Please check:"
    echo "1. Repository exists: https://github.com/$username/realtime-MF"
    echo "2. You have access to the repository"
    echo "3. Your GitHub credentials are correct"
fi
