# 🚀 GitHub Pages Deployment Guide

## Quick Deployment (Hindi Instructions)

### Step 1: GitHub Repository Banao

1. **Browser mein jao**: https://github.com/new
2. **Repository name**: `realtime-MF` (ya koi bhi naam)
3. **Public** select karo
4. **Create repository** click karo

### Step 2: Code Upload Karo

Terminal mein yeh commands run karo:

```bash
# Git initialize karo (agar pehle se nahi kiya)
git init

# Saari files add karo
git add .

# Commit karo
git commit -m "Initial commit - MF Leaderboard with live updates"

# Apna GitHub username dalke yeh command run karo
git remote add origin https://github.com/YOUR_USERNAME/realtime-MF.git

# Main branch banao aur push karo
git branch -M main
git push -u origin main
```

**Note**: `YOUR_USERNAME` ko apne actual GitHub username se replace karo!

### Step 3: GitHub Pages Enable Karo

1. **GitHub repository pe jao**: https://github.com/YOUR_USERNAME/realtime-MF
2. **Settings** tab pe click karo
3. Left sidebar mein **Pages** pe click karo
4. **Source** section mein:
   - Source: **GitHub Actions** select karo
5. Done! 🎉

### Step 4: Automatic Deployment

Ab jab bhi tum code push karoge, automatically deploy ho jayega!

```bash
# Future updates ke liye:
git add .
git commit -m "Updated features"
git push
```

### Step 5: Website Check Karo

1. **Actions** tab pe jao: https://github.com/YOUR_USERNAME/realtime-MF/actions
2. Workflow complete hone ka wait karo (2-3 minutes)
3. Green checkmark dikhe to deployment successful!
4. **Website URL**: https://YOUR_USERNAME.github.io/realtime-MF/

---

## Alternative Method: Manual Deployment

Agar GitHub Actions use nahi karna chahte:

### Method 2A: gh-pages Package Use Karo

```bash
# gh-pages package install karo
npm install --save-dev gh-pages

# package.json mein script add karo
```

Add this to `package.json`:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

```bash
# Deploy karo
npm run deploy
```

### Method 2B: Manual Upload

```bash
# Build karo
npm run build

# dist folder mein jaao
cd dist

# Naya branch banao
git init
git add .
git commit -m "Deploy"
git branch -M gh-pages
git remote add origin https://github.com/YOUR_USERNAME/realtime-MF.git
git push -f origin gh-pages
```

Phir GitHub Settings → Pages mein:
- Source: **Deploy from a branch**
- Branch: **gh-pages** / **root**
- Save karo

---

## Troubleshooting (Agar Problem Aaye)

### Problem 1: Page 404 Error
**Solution**: 
- GitHub Settings → Pages check karo
- Source **GitHub Actions** selected hai?
- Actions tab mein deployment successful hai?

### Problem 2: CSS/JS Load Nahi Ho Raha
**Solution**:
- `vite.config.ts` mein `base: '/realtime-MF/'` hai?
- Repository name aur base path match kar rahe hain?

### Problem 3: Deployment Failed
**Solution**:
- Actions tab mein error log dekho
- `npm ci` locally run karke dekho
- `npm run build` successful hai?

### Problem 4: Permission Error
**Solution**:
1. Repository Settings → Actions → General
2. Workflow permissions:
   - **Read and write permissions** select karo
   - Save karo
3. Re-run deployment

---

## Custom Domain (Optional)

Agar apna domain use karna hai:

1. **Repository Settings → Pages**
2. **Custom domain** mein apna domain dalo (e.g., `mfleaderboard.com`)
3. **DNS Settings** (domain provider mein):
   ```
   Type: CNAME
   Name: www
   Value: YOUR_USERNAME.github.io
   ```
4. **Enforce HTTPS** enable karo

---

## Deployment Checklist ✅

- [ ] GitHub repository banayi
- [ ] Code push kiya
- [ ] GitHub Actions workflow file hai (`.github/workflows/deploy.yml`)
- [ ] Settings → Pages mein source "GitHub Actions" selected hai
- [ ] `vite.config.ts` mein correct base path hai
- [ ] Actions tab mein deployment successful hai
- [ ] Website live hai aur kaam kar rahi hai

---

## Final URLs

After deployment:

🌐 **Your Website**: https://YOUR_USERNAME.github.io/realtime-MF/  
📊 **Repository**: https://github.com/YOUR_USERNAME/realtime-MF  
⚙️ **Actions**: https://github.com/YOUR_USERNAME/realtime-MF/actions  
🔧 **Settings**: https://github.com/YOUR_USERNAME/realtime-MF/settings/pages  

---

## Important Notes

1. ⏱️ **Deployment time**: 2-5 minutes after push
2. 🔄 **Auto-deploy**: Har push pe automatically deploy hoga
3. 📱 **Live updates**: Website pe data har 30 seconds mein update hoga
4. 🆓 **Free**: GitHub Pages completely free hai
5. 🔒 **HTTPS**: Automatic SSL certificate milega

---

## Next Steps

1. Repository banao ✅
2. Code push karo ✅
3. GitHub Pages enable karo ✅
4. Wait for deployment (2-3 min) ⏳
5. Website visit karo 🎉
6. Share karo! 🚀

**Happy Deploying! 🎊**
