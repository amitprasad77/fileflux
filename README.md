# FileFlux — Free Online PDF & Image Tools

A complete iLovePDF-style website with 15+ working tools, AdSense ad slots, and Lemon Squeezy premium (ad removal).

## 🚀 Quick Start (5 minutes)

### 1. Update your domain
Search and replace `YOUR-DOMAIN.com` with your real domain in:
- `sitemap.xml`
- `robots.txt`
- All `<link rel="canonical">` tags in tool pages

### 2. Update Premium checkout URLs
Open `premium.js` and replace:
```
CHECKOUT_MONTHLY = 'https://yourstore.lemonsqueezy.com/buy/YOUR-MONTHLY-ID'
CHECKOUT_YEARLY  = 'https://yourstore.lemonsqueezy.com/buy/YOUR-YEARLY-ID'
```

### 3. Set Environment Variable (Netlify)
In Netlify dashboard → Site Settings → Environment Variables:
```
LEMONSQUEEZY_API_KEY = your_key_from_lemonsqueezy
```

### 4. Replace Ad Placeholders with AdSense
Search for `[ Ad — 728×90 — Replace with AdSense ]` in all HTML files.
Replace each `<div class="ad-banner">` with your AdSense `<ins>` tag.

### 5. Push to GitHub → Deploy on Netlify
```bash
git init
git add .
git commit -m "Initial FileFlux deploy"
git remote add origin https://github.com/YOUR_USERNAME/fileflux.git
git push -u origin main
```
Then connect repo to Netlify at netlify.com → New site from Git.

## 📁 Project Structure
```
fileflux/
├── index.html              # Homepage
├── premium.html            # Pricing page
├── premium.js              # Ad removal system (add to every page)
├── privacy.html            # Required for AdSense
├── terms.html
├── sitemap.xml
├── robots.txt
├── netlify.toml            # Netlify config + API routing
├── .env.example            # Environment variable template
├── netlify/
│   └── functions/
│       └── validate-license.js   # License validation serverless function
└── tools/
    ├── merge-pdf.html
    ├── split-pdf.html
    ├── compress-pdf.html
    ├── compress-image.html
    ├── resize-image.html
    ├── convert-image.html
    ├── crop-image.html
    ├── watermark-image.html
    ├── jpg-to-pdf.html
    ├── pdf-to-jpg.html
    ├── rotate-pdf.html
    ├── protect-pdf.html
    ├── esign-pdf.html
    ├── word-to-pdf.html
    └── html-to-pdf.html
```

## 💰 Monetization
- **AdSense**: Replace `.ad-banner` divs with your AdSense code
- **Premium**: Lemon Squeezy handles payments → users get license key → enter on site → ads removed
- See `PREMIUM-SETUP.html` for full premium setup guide

## 📖 Guides
- `LAUNCH-GUIDE.html` — SEO, deployment, income timeline
- `PREMIUM-SETUP.html` — Premium system setup (keep private, don't deploy)
