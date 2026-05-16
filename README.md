<p align="center">
  <img src="Eco Twin/assets/ecotwin_logo.png" alt="Eco-Twin Logo" width="120" />
</p>

<h1 align="center">🌿 Eco-Twin</h1>

<p align="center">
  <strong>A sustainable fashion companion — UI/UX prototype.</strong><br/>
  Browse, tag, and get eco-verdicts for clothing items in a simulated wardrobe.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-6.0.0-22A671?style=for-the-badge&logo=leaflet&logoColor=white" alt="Version" />
  <img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML" />
  <img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</p>

---

## 📸 App Preview

<p align="center">
  <img src="Eco Twin/assets/screenshots/01_Splash_Screen.png" alt="Splash Screen" width="180" />
  &nbsp;&nbsp;
  <img src="Eco Twin/assets/screenshots/05_Closet_Populated.png" alt="My Closet" width="180" />
  &nbsp;&nbsp;
  <img src="Eco Twin/assets/screenshots/06_Scanner_View.png" alt="Scanner View" width="180" />
  &nbsp;&nbsp;
  <img src="Eco Twin/assets/screenshots/07_Tagging_Results.png" alt="Item Tagging" width="180" />
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

**Eco-Twin** is a mobile-first UI/UX prototype for a sustainable fashion app. It demonstrates a complete user flow for scanning clothing items, viewing their eco-sustainability data (material, brand, origin, carbon footprint), and receiving a **GO** or **STOP** eco-verdict.

The app ships with **6 pre-loaded sample clothing items** to showcase the full experience — from browsing your closet to viewing analytics and managing your profile.

---

## 🚀 Working Features

### 👕 Digital Closet
- Browse a wardrobe displayed as a card grid with eco-grade badges (A+, A, B+, B, C, D)
- **Filter by category**: All · 👕 Tops · 👖 Bottoms · 🧥 Outerwear · 👟 Shoes
- **Sort by**: Newest · Eco Score · A→Z · Most Worn
- **Search** across item names and brands in real-time
- **Delete items** from the closet via trash icon on each card

### 🏷️ Item Detail & Tagging
- Tap any closet item to view its detail screen
- Shows detected tags (e.g. `🌿 Organic`, `♻️ Recyclable`, `⚠️ Microplastics`)
- Displays material composition, brand, country of origin, and carbon footprint (kg CO₂)

### ✅ / 🚫 Eco Verdict System
- **GO — Sustainable!** for items scoring ≥ 50/100
- **STOP — Not Eco-Friendly!** for items scoring below 50
- Animated sustainability score progress bars
- Carbon footprint rating (Low / High) with CO₂ values
- Option to save non-eco items as "Alternatives" for finding replacements

### 📊 Analytics Dashboard
- **Quick Stats**: Total items, sustainable count, closet value ($), total wears
- **Average Eco Score**: Calculated in real-time across all closet items
- **Category Breakdown**: CSS conic-gradient pie chart with legend
- **Wear Insights**: Most and least worn items
- **Savings Tracker**: Displays money saved, CO₂ prevented, and duplicates stopped (sample data)
- **Achievement Badges**: 6 badges with unlock conditions (e.g. `Eco Starter`, `Green Pioneer`)

### 👤 User Profile
- Displays name, bio, avatar, and overall eco score
- **Edit Profile**: Modal to change name, bio, and upload a custom avatar photo
- Access to Saved Alternatives and Achievements

### ⚙️ Settings & Customization
- **Dark / Light Mode**: Manual toggle + respects system preference on first load
- **4 Accent Colors**: Green (default), Orange, Amber, Blue — applied globally
- **Export Data**: Downloads full app state as a JSON file
- **Reset All Data**: Clears localStorage and returns to defaults
- **Storage Usage**: Shows how much localStorage the app is using

### 💾 Data Persistence
- All closet items, profile changes, theme preferences, and settings are saved to `localStorage`
- Data survives page refreshes and browser restarts

### 🎨 UI Polish
- Smooth screen-to-screen transitions with slide animations
- Animated entry effects on cards and sections
- Button ripple effects on click
- Toast notifications for user actions (save, delete, badge unlock, etc.)
- Mobile-first responsive design inside a phone frame

---

## ⚠️ Limitations & Non-Functional Features

These features exist in the UI but **do not actually work**:

| Feature | Status |
|---------|--------|
| **Camera Scan & AI Analysis** | UI exists, but the backend API is currently offline. Scanning will not produce results. |
| **Login / Sign Up** | Auth form is present and toggles between modes, but sign-in requires a backend that is not running. |
| **Push Notifications toggle** | UI toggle only — no actual push notifications are sent. |
| **My Eco Goals** | Tapping this shows a toast message; there is no goals screen. |
| **Language selector** | Displays "English" as a static label; not changeable. |
| **Gallery Upload** | File picker opens, but analysis requires the offline backend API. |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Structure** | HTML5 |
| **Styling** | Vanilla CSS with custom properties, glassmorphism, dark/light theming |
| **Logic** | Vanilla JavaScript (ES6+) |
| **Icons** | [Lucide Icons](https://lucide.dev/) (loaded via CDN) |
| **Storage** | Browser `localStorage` |
| **Design System** | 8pt grid spacing, CSS custom properties for theming |

> **No build tools, no frameworks, no `npm install` required.** The app is a single HTML file with CSS and JS.

---

## 📂 Project Structure

```
Eco Twin/
├── index.html                  # Main app — all 12 screens in a single file
├── styles.css                  # Complete design system (~48KB)
├── app.js                      # App logic, state management (~34KB)
├── DESIGN_HANDOFF_GUIDE.md     # Figma handoff instructions for the design
├── assets/
│   ├── ecotwin_logo.png        # App logo
│   ├── app_logo.png            # Logo variant
│   ├── icons/                  # 58 exported Lucide SVG icon files
│   └── screenshots/            # 13 pre-captured screen screenshots
└── wireframe/                  # Low-fidelity wireframe prototype
    ├── wireframe.html
    ├── wireframe.css
    └── wireframe.js
```

---

## 🖥️ Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)

### Run Locally

```bash
git clone https://github.com/pranaysoyam1265/eco-twin.git
cd eco-twin
```

Then open `Eco Twin/index.html` in your browser. That's it — no server or build step needed.

---

## 📱 Screens

| # | Screen | Description |
|---|--------|-------------|
| 1 | Splash | Logo, tagline, Get Started / Sign In buttons |
| 2 | Auth | Login / Sign Up form (UI only — backend offline) |
| 3 | My Closet | Filterable, searchable wardrobe grid with 6 sample items |
| 4 | Scan Item | Camera viewfinder + gallery upload button (backend offline) |
| 5 | AI Tagging | Tags, material, brand, origin, carbon data for selected item |
| 6 | Verdict GO | Green verdict for sustainable items with score bars |
| 7 | Verdict STOP | Red verdict for non-eco items with alternative suggestions |
| 8 | Dashboard | Stats grid, eco score, pie chart, wear insights, badges |
| 9 | Profile | Avatar, eco score, journey links, preferences |
| 10 | Settings | Theme toggle, accent colors, notifications, data management |
| 11 | Saved Alternatives | Bookmarked non-eco items |
| 12 | Edit Profile | Modal for name, bio, and avatar upload |

---

## 🎨 Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#22A671` | Buttons, badges, accent elements |
| Danger | `#E74545` | STOP verdicts, warnings, delete actions |

### Accent Themes (switchable in Settings)
🟢 Green · 🟠 Orange · 🟡 Amber · 🔵 Blue

### Spacing
8pt grid: 4px · 8px · 12px · 16px · 24px · 32px

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  <sub>Eco-Twin v6.0.0 — UI/UX Prototype for Sustainable Fashion</sub>
</p>
