# Portfolio Deployment Guide


### Simplified:
- All data is now in `client/src/data/portfolio-data.ts`
- Static build output

## 🚀 Local Development

```bash
npm install
npm run dev
```

Your site will be available at `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

This creates a `dist/` folder with your static site ready to deploy!

## 🌐 Deploy Options

### Option 1: Netlify (Recommended - Easiest)
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repo
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Deploy!

### Option 2: Vercel
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel auto-detects Vite settings
5. Deploy!

### Option 3: GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts:
   ```json
   "deploy": "npm run build && gh-pages -d dist"
   ```
3. Run: `npm run deploy`
4. Enable GitHub Pages in repo settings

## 📝 Editing Your Portfolio

All your content is in: `client/src/data/portfolio-data.ts`

Edit:
- **Profile**: Your name, title, bio, email
- **Skills**: Your service offerings
- **Process Steps**: Your workflow
- **Projects**: Your portfolio projects
- **Social Links**: GitHub, LinkedIn, Email links

## 🎨 Adding Project GIFs

In `client/src/components/portfolio-section.tsx`, replace the placeholder (around line 130-138) with:

```tsx
<img 
  src="/path-to-your-gif.gif" 
  alt="Project demo" 
  className="w-full h-full object-cover rounded-2xl" 
/>
```

Put your GIF files in `client/public/` folder and reference them as `/your-gif.gif`

## 🔧 Custom Domain

After deploying, you can add a custom domain in your hosting provider's settings.

---

**Need help?** The site is now much simpler - just edit the data file and redeploy!

