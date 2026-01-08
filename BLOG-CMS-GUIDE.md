# NetlifyCMS Blog Management Setup

## ✅ What's Been Set Up

Your website now has a **Blog Content Management System** (CMS) that allows non-technical staff at Marlco Capital to easily add and edit blog posts without touching any code.

## 📂 Files Added

```
marlco-capital-website/
├── admin/
│   ├── index.html        # Admin panel interface
│   └── config.yml        # CMS configuration
└── blog-posts/           # Blog posts will be stored here as Markdown files
```

## 🚀 How to Access the Admin Panel

### Option A: After Deploying to Netlify (Recommended)

1. Deploy your website to **Netlify** (free hosting)
2. Access the admin panel at: `https://yoursite.netlify.app/admin`
3. Login with your email (Netlify Identity)
4. Start adding blog posts!

### Option B: Local Testing (For Developers)

```bash
npx netlify-cms-proxy-server
```

Then visit: `http://localhost:8080/admin`

## 📝 How Staff Can Add Blog Posts

Once deployed:

1. **Go to**: `https://marlocapital.co.ke/admin`
2. **Login** with authorized email
3. **Click**: "New Insurance Insights"
4. **Fill in the form**:
   - Title: "Your Blog Post Title"
   - Category: Select from dropdown (Motor, Medical, Life, etc.)
   - Icon Emoji: Pick an emoji (🚗, 🏥, 💰)
   - Date: Auto-filled (can change)
   - Reading Time: "5 min read"
   - Excerpt: 1-2 sentence summary
   - Body: Full blog post content (supports rich text)
5. **Click**: "Publish"
6. Done! ✅

## 🔧 Deployment Options

### Option 1: Netlify (Easiest - FREE)

**Steps:**
1. Create account at [netlify.com](https://netlify.com)
2. Connect your GitHub repository (or drag & drop the folder)
3. Enable **Netlify Identity** in Settings
4. Enable **Git Gateway** in Settings
5. Invite users (Marlco staff) to access the admin

**Benefits:**
- ✅ Free hosting
- ✅ Free SSL certificate
- ✅ Automatic deployments
- ✅ Built-in CMS authentication

### Option 2: GitHub Pages + GitHub Backend

**Requirements:**
- GitHub repository for the website
- Users need GitHub accounts

**Config change** in `admin/config.yml`:
```yaml
backend:
  name: github
  repo: marlco-capital/website
  branch: main
```

### Option 3: Any Static Host + Git Backend

Works with:
- Vercel
- GitHub Pages
- CloudFlare Pages
- Any static hosting

## 👥 Adding Blog Editors

### On Netlify:
1. Go to **Identity** tab
2. Click **Invite users**
3. Enter staff email addresses
4. They receive invitation email
5. They set password and can login to `/admin`

### Access Levels:
- Editors can: Create, edit, delete blog posts
- No code access needed
- No technical knowledge required

## 🎨 How It Updates the Website

**Current Setup (Manual):**
When a blog post is added:
1. CMS creates a Markdown file in `blog-posts/`
2. You need to manually convert it to HTML in `blog.html`

**Recommended: Automatic (Using Build Process):**
1. Install a static site generator (e.g., Eleventy, Hugo)
2. Blog posts auto-convert to HTML on deployment
3. No manual work needed

### Simple Auto-Update Script

I can create a JavaScript script that:
- Reads all Markdown files from `blog-posts/`
- Automatically generates the blog cards HTML
- Updates `blog.html` on page load

Would you like me to add this? (Takes 10 minutes)

## 📖 User Guide for Marlco Staff

Create a simple guide for your client:

**"How to Add a Blog Post"**

1. Go to **marlocapital.co.ke/admin**
2. Login with your email and password
3. Click **"New Insurance Insights"**
4. Fill in the simple form (like filling out a Google Form)
5. Click **Publish**
6. Your blog post appears on the website immediately! ✨

**That's it!** No coding, no complicated software.

## 🔒 Security

- Only invited users can access `/admin`
- All changes tracked in Git
- Can rollback any changes
- Secure authentication via Netlify Identity or GitHub

## 💡 Tips

**Emoji Icons:**
Use relevant emojis for each category:
- Motor: 🚗
- Medical: 🏥  
- Life: 🛡️
- Property: 🏠
- Travel: ✈️
- Business: 💼
- Pension: 💰
- Tips: 💡
- News: 📰

## ❓ Common Questions

**Q: Do blog editors need technical skills?**
A: No! It's as easy as filling out a form.

**Q: Can we preview before publishing?**
A: Yes! NetlifyCMS has a preview pane.

**Q: Can we edit old blog posts?**
A: Yes! Click on any post to edit it.

**Q: What if we make a mistake?**
A: All changes are versioned in Git - easy to undo.

## 🆘 Next Steps

**For you (developer):**
1. Deploy website to Netlify
2. Enable Netlify Identity
3. Invite Marlco Capital staff
4. (Optional) Set up auto-build script

**For Marlco Capital:**
1. Receive invitation email
2. Set password
3. Start writing blog posts!

---

**Need help?** Check [NetlifyCMS documentation](https://www.netlifycms.org/docs/) or contact your developer.
