# 🕉️ वैश्विक गीता पाठ – Campaign Frame Generator

A fast, mobile-first web app that lets participants of the **Geeta Chanting Mahotsav (Chapter 15 · 8 May)** create a personalised campaign frame and share it on social media.

---

## ✨ Features

- 📸 **Upload your photo** – drag & drop or file picker (JPG / PNG / WEBP)
- 🖼️ **Choose your frame** – Hindi or English campaign overlay
- 🎨 **Live preview** – composited in-browser using HTML5 Canvas (no server)
- ⬇️ **Download** the final 1080×1080 PNG
- 📤 **Share** directly to WhatsApp, Facebook, or Instagram

---

## 🗂️ Project Structure

```
geeta-chanting/
├── app/
│   ├── components/
│   │   ├── Header.tsx          # Top event banner
│   │   ├── UploadBox.tsx       # Drag-and-drop photo uploader
│   │   ├── FrameSelector.tsx   # Hindi / English frame toggle
│   │   ├── PreviewCanvas.tsx   # Live composited preview
│   │   └── ActionButtons.tsx   # Download + share buttons
│   ├── globals.css             # Tailwind + custom animations
│   ├── layout.tsx              # Root layout + SEO metadata
│   └── page.tsx                # Main page (3-step wizard)
├── public/
│   └── frames/
│       ├── hindi.png           # Hindi campaign frame (transparent centre)
│       └── english.png         # English campaign frame (transparent centre)
├── utils/
│   └── imageProcessor.ts       # Canvas compositing + download helpers
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Local Setup

### Prerequisites
- Node.js 18+  
- npm / yarn / pnpm

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/suchitdubey7/Geeta-Chanting.git
cd Geeta-Chanting

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open in browser
open http://localhost:3000
```

---

## 🌐 Deploy on Vercel

### Option A – Vercel CLI (recommended)

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Option B – Vercel Dashboard (no CLI needed)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select **suchitdubey7/Geeta-Chanting**
4. Click **Deploy** – Vercel auto-detects Next.js

No environment variables are needed (fully client-side).

---

## 🖼️ Replacing Frame Images

Frames live at `public/frames/hindi.png` and `public/frames/english.png`.

Requirements for custom frames:
- **Size**: 1080 × 1080 px (square)
- **Format**: PNG with **alpha (transparency)** in the centre circle
- The centre ~72% of the image should be transparent (the user's face shows through)
- Save and push – changes go live on next Vercel deploy

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Image processing | HTML5 Canvas (100% client-side) |
| Deployment | Vercel |

---

## 📱 Mobile-First Design

- Full responsive layout (max-width 512 px on desktop, full-width on mobile)
- Large tap targets for easy use on phones
- Saffron / cream / gold spiritual colour palette

---

## 📄 License

MIT – free to use and modify for this campaign.

🙏 **जय श्री कृष्ण · Jai Shri Krishna**
