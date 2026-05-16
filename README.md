<p align="center">
  <img src="Eco Twin/assets/ecotwin_logo.png" alt="Eco-Twin Logo" width="120" />
</p>

<h1 align="center">🌿 Eco-Twin</h1>

<p align="center">
  <strong>Your AI-powered sustainable fashion companion.</strong><br/>
  Scan, tag, and get eco-verdicts for every piece in your wardrobe.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-6.0.0-22A671?style=for-the-badge&logo=leaflet&logoColor=white" alt="Version" />
  <img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML" />
  <img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/AI_Powered-22A671?style=for-the-badge&logo=openai&logoColor=white" alt="AI Powered" />
</p>

---

## 📸 App Preview

<p align="center">
  <img src="Eco Twin/assets/screenshots/01_Splash_Screen.png" alt="Splash Screen" width="180" />
  &nbsp;&nbsp;
  <img src="Eco Twin/assets/screenshots/05_Closet_Populated.png" alt="My Closet" width="180" />
  &nbsp;&nbsp;
  <img src="Eco Twin/assets/screenshots/06_Scanner_View.png" alt="AI Scanner" width="180" />
  &nbsp;&nbsp;
  <img src="Eco Twin/assets/screenshots/07_Tagging_Results.png" alt="AI Tagging" width="180" />
</p>

<p align="center">
  <img src="Eco Twin/assets/screenshots/08_Verdict_Green.png" alt="Eco Verdict — GO" width="180" />
  &nbsp;&nbsp;
  <img src="Eco Twin/assets/screenshots/09_Verdict_Red.png" alt="Eco Verdict — STOP" width="180" />
  &nbsp;&nbsp;
  <img src="Eco Twin/assets/screenshots/10_Dashboard_Stats.png" alt="Analytics Dashboard" width="180" />
  &nbsp;&nbsp;
  <img src="Eco Twin/assets/screenshots/11_Profile_Hub.png" alt="Profile Hub" width="180" />
</p>

---

## ✨ What is Eco-Twin?

**Eco-Twin** is a mobile-first web application that helps users make sustainable fashion choices. Using AI-powered garment analysis, it scans clothing items (via camera or image upload), identifies material composition, brand origin, and carbon footprint — then delivers a clear **GO** or **STOP** eco-verdict so you know the real environmental impact of every piece you wear.

> _"Know the impact of every piece you wear."_

---

## 🚀 Key Features

### 🔍 AI-Powered Garment Scanner
- **Camera Scan** — Point your device camera at any clothing item or label
- **Gallery Upload** — Upload images directly from your photo library
- AI identifies material, brand, origin, and auto-generates sustainability tags

### 🏷️ Smart AI Tagging
- Detects tags like `🌿 Organic`, `♻️ Recyclable`, `⚠️ Microplastics`, and more
- Displays material composition, brand, country of origin, and carbon footprint (kg CO₂)

### ✅ / 🚫 Eco Verdict System
- **GO — Sustainable!** Items meeting eco-friendly standards (score ≥ 50)
- **STOP — Not Eco-Friendly!** Items with environmental concerns
- Sustainability score out of 100 with animated progress bars
- Carbon footprint rating (Low / High) with CO₂ estimates

### 👕 Digital Closet
- Browse your entire wardrobe in a beautiful card grid
- Filter by category: `All` · `👕 Tops` · `👖 Bottoms` · `🧥 Outerwear` · `👟 Shoes`
- Sort by: Newest · Eco Score · A→Z · Most Worn
- Full-text search across item names and brands
- Eco-grade badges (A+, A, B+, B, C, D) on every card

### 📊 Analytics Dashboard
- **Quick Stats** — Total items, sustainable count, closet value, total wears
- **Average Eco Score** — Real-time calculated across all items
- **Category Breakdown** — Interactive pie chart with legend
- **Wear Insights** — Most and least worn items
- **Savings Tracker** — Money saved, CO₂ prevented, duplicates stopped

### 🏆 Gamification & Achievements
- Unlockable badges: `Eco Starter`, `Scanner Pro`, `Minimalist`, `Green Pioneer`, `7-Day No-Buy`, `Wardrobe Master`
- Toast notifications for badge unlocks
- Profile eco-score tracking

### 👤 User Profile
- Customizable name, bio, and avatar (with photo upload)
- Eco score display with animated ring
- Quick access to Eco Goals, Saved Alternatives, and Achievements

### ❤️ Saved Alternatives
- Bookmark non-eco-friendly items for finding sustainable replacements
- Direct link to eco-friendly brand directories ([Good On You](https://goodonyou.eco/brands/))

### ⚙️ Settings & Customization
- **Dark / Light Mode** — Manual toggle + auto system preference detection
- **Accent Colors** — Choose from Green, Orange, Amber, or Blue
- **Push Notification** toggle
- **Data Management** — Export data as JSON, view storage usage, or reset all data

### 🔐 Authentication
- Email/password login & registration
- Backend API integration with JWT token-based auth
- Secure closet sync across sessions

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Structure** | HTML5 with semantic elements |
| **Styling** | Vanilla CSS with custom properties, glassmorphism, and CSS animations |
| **Logic** | Vanilla JavaScript (ES6+) |
| **Icons** | [Lucide Icons](https://lucide.dev/) (58 SVGs) |
| **Backend API** | REST API hosted on [Hugging Face Spaces](https://huggingface.co/spaces/pranaysoyam126/eco-twin-api) |
| **AI Engine** | AI-powered garment analysis via backend |
| **Storage** | `localStorage` for offline data persistence |
| **Design System** | 8pt grid, CSS custom properties, dark/light theming |

---

## 📂 Project Structure

```
Eco Twin/
├── index.html                  # Main app (634 lines, 13 screens)
├── styles.css                  # Full design system (~48KB)
├── app.js                      # App logic, state management, API calls (~34KB)
├── DESIGN_HANDOFF_GUIDE.md     # Figma handoff instructions
├── assets/
│   ├── ecotwin_logo.png        # App logo
│   ├── app_logo.png            # Alternative logo variant
│   ├── icons/                  # 58 Lucide SVG icons
│   │   ├── activity.svg
│   │   ├── leaf.svg
│   │   ├── scan-line.svg
│   │   └── ... (58 total)
│   └── screenshots/            # 13 app screen captures
│       ├── 01_Splash_Screen.png
│       ├── 05_Closet_Populated.png
│       ├── 10_Dashboard_Stats.png
│       └── ... (13 total)
└── wireframe/                  # Low-fidelity wireframe prototype
    ├── wireframe.html
    ├── wireframe.css
    └── wireframe.js
```

---

## 🖥️ Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools, frameworks, or `npm install` needed!

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/pranaysoyam1265/eco-twin.git
   cd eco-twin
   ```

2. **Open the app**
   ```bash
   # Simply open the HTML file in your browser
   open "Eco Twin/index.html"
   
   # Or on Windows
   start "Eco Twin/index.html"
   ```

3. **That's it!** The app runs entirely in the browser — no server required for the UI.

> **Note:** Camera scan and AI analysis features require an active internet connection to communicate with the backend API.

---

## 🎨 Design System

### Color Palette

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--primary` | `#22A671` | `#22A671` | Primary actions, eco badges |
| `--danger` | `#E74545` | `#E74545` | STOP verdicts, warnings |
| `--surface` | `#FFFFFF` | `#1A1F2B` | Card backgrounds |
| `--bg` | `#F0F2F5` | `#0F1117` | Page backgrounds |

### Accent Themes
Switch between 4 accent color presets via Settings:
- 🟢 **Green** (default) — `#22A671`
- 🟠 **Orange** — `#E67E22`  
- 🟡 **Amber** — `#F0A500`
- 🔵 **Blue** — `#3498DB`

### Spacing
Follows an **8pt grid system** for consistent vertical rhythm:
- `--sp-1`: 4px · `--sp-2`: 8px · `--sp-3`: 12px · `--sp-4`: 16px · `--sp-6`: 24px · `--sp-8`: 32px

---

## 📱 Screens Overview

| # | Screen | Description |
|---|--------|-------------|
| 1 | **Splash** | Animated logo + Get Started / Sign In |
| 2 | **Auth** | Login / Registration with email & password |
| 3 | **My Closet** | Filterable, searchable wardrobe grid |
| 4 | **Scan Item** | Camera viewfinder + gallery upload |
| 5 | **AI Tagging** | Detected tags, material, brand, carbon data |
| 6 | **Verdict (GO)** | Sustainable — eco score + carbon footprint |
| 7 | **Verdict (STOP)** | Not eco-friendly — find alternatives |
| 8 | **Dashboard** | Analytics, pie charts, wear insights, badges |
| 9 | **Profile** | Avatar, eco score, journey, preferences |
| 10 | **Settings** | Theme, accent, notifications, data management |
| 11 | **Saved Alternatives** | Bookmarked items for eco-swap |
| 12 | **Edit Profile** | Modal for name, bio, avatar upload |

---

## 🌐 API Integration

The app connects to a REST API for authentication and AI-powered garment analysis:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/login` | `POST` | User login with email/password |
| `/items` | `GET` | Fetch user's closet items |
| `/analyze` | `POST` | AI garment analysis from base64 image |

> API hosted at: `https://pranaysoyam126-eco-twin-api.hf.space`

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  <strong>Built with 💚 for a sustainable future</strong><br/>
  <sub>Eco-Twin v6.0.0 — Making fashion choices that matter</sub>
</p>
