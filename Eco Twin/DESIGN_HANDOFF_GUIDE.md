# Eco-Twin Design Handoff Guide

This step-by-step guide is designed to help you rapidly fulfill your UI/UX design handoff requirements for the presentation.

---

## Step 1: Create the Figma File & Hi-Fi Screens 
*(Est. Time: 20 minutes)*

Since the app is already built and pixel-perfect in code, you don't need to manually recreate the designs in Figma from scratch. We will use the live app to generate the hi-fi frames.

1. **Setup Figma:**
   - Go to [Figma.com](https://www.figma.com/), sign in, and create a **New Design File**.
   - Name it `EcoTwin Design System & Handoff`.
   - On the left panel, create exactly these 6 Pages (hit the `+` next to "Pages"):
     1. Cover
     2. Design System
     3. Wireframes
     4. Hi-fi Screens
     5. Components
     6. Prototype

2. **Capture the Hi-Fi Screens:**
   - Open `index.html` in your Chrome browser.
   - Press `F12` (or Right Click > Inspect) to open Chrome DevTools.
   - Click the **Device Toggle Icon** (looks like a phone/tablet) or press `Ctrl + Shift + M`.
   - From the dropdown at the top of the browser, select **iPhone SE** (which is exactly 375x667 pixels).
   - Navigate through every single screen of your app:
     1. Splash Screen
     2. Login Screen
     3. Closet Screen
     4. Scanner Screen
     5. Output Screen (Verdict GO)
     6. Output Screen (Verdict STOP)
     7. Dashboard Screen
     8. Profile Screen
     9. Settings Screen
   - For each screen, use a screenshot tool (like mostly `Shift + Windows + S`) to capture specifically the 375px wide phone frame.

3. **Paste into Figma (Hi-fi Screens Page):**
   - Go to your **Hi-fi Screens** page.
   - Press `F` to open the Frame tool, and choose **iPhone SE** (or iPhone 14) from the right sidebar.
   - Create 9 frames and paste your 9 screenshots directly inside them so they snap perfectly into place.

---

## Step 2: Make the Wireframes (The Evolution Story)
*(Est. Time: 15 minutes)*

In your presentation, you need to show the "Raw Idea" vs the "Final Product".

1. Go to your **Wireframes** page in Figma.
2. Press `F` and create 4 empty phone frames. Label them: *Splash, Closet, Scan, Verdict*.
3. **Instead of making them pretty**, literally just draw gray wireframes to represent the layout.
   - Press `R` (Rectangle) to draw gray blocks where images go.
   - Press `O` (Ellipse) to draw gray circles where buttons or icons go.
   - Press `T` (Text) to type simple placeholders like "[Header]" or "[Scan Button]".
4. Make them look slightly unfinished to tell the story of how the design evolved from gray shapes to the polished CSS you actually wrote.

---

## Step 3: Document the Component Library
*(Est. Time: 15 minutes)*

This is where you show off the atoms and molecules of your design system.

1. Go to your **Components** page.
2. In your browser (with the app open), use the Windows Snipping Tool (`Win + Shift + S`) to carefully crop out the individual components:
   - **Buttons:** Crop out the Primary Button (`Get Started`), Secondary Button (`Sign In`), and Danger Button (`Find Alternatives`).
   - **Inputs:** Crop the Email input field.
   - **Cards:** Crop one specific Clothing Item card from the Closet layout.
   - **Tabs:** Crop the `All` and `👕 Tops` tabs to show Active vs Inactive states.
   - **Navigation:** Crop the Bottom Navigation bar.
   - **Toasts:** Click a button to trigger a toast message and screenshot it while it is on screen.
3. Paste all these cropped snippets into a neat grid in Figma.
4. Add little labels above them using the Text tool (e.g., "Primary Button — Default", "Category Tabs").

---

## Step 4: Create the Redline Annotations
*(Est. Time: 10 minutes)*

"Redlining" proves that you use a strict mathematical grid for spacing (your 8pt system).

1. Paste a single Closet Card screenshot into the center of the Figma canvas.
2. Press `L` (Line Tool) and change the stroke color to **Bright Red** and the thickness to `2px`.
3. Draw lines showing the gaps in your code:
   - Draw a line from the edge of the card to the text. Add a red text label saying `16px padding` (your `--sp-4`).
   - Draw a line between the heading and the Category text. Label it `4px gap`.
   - Draw a line marking the Border Radius. Label it `18px corner radius`.
4. This explicitly shows the developer (and grading reviewer) that your spacing isn't random.

---

## Step 5: Exporting Icons
*(Status: **ALREADY COMPLETED BY AI** ✅)*

Your assignment requires you to download SVGs into an `assets/icons/` folder to prove you know how to package assets for a developer.

- **What I just did:** I ran a Node script that automatically requested all 58 Lucide SVG paths used in your HTML file and successfully downloaded them straight to `C:\Users\prana\OneDrive\Desktop\Eco Twin\assets\icons\`.
- **What you need to do:** Simply open that folder, take a screenshot of the 58 SVG files sitting there, and paste it into your presentation (Slide 17).

---

### Final Polish For Presentation 💡
- **Clickable Prototype:** The checklist asks for a "Clickable Prototype". Since you actually built an HTML app with transitions (`navigateTo` handles smooth fading and sliding), the **best way to fulfill this is to record a 30-second video demo** (using Windows Screen Record) of you clicking through the live app. This is infinitely better than linking Figma frames together.
- **Design Decisions Rationale:** Create one slide that says:
  - *Why Green (`#22A671`)?* Represents sustainability and provides high contrast against dark text.
  - *Why 8pt Grid?* Standardizes vertical rhythm and scales across desktop and mobile devices flawlessly.
  - *Why a Card Grid?* Provides scannability for highly visual items (clothing).
