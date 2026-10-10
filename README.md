# 🎂 Happy Birthday Sudha Kumari 💛
### A Personalized Birthday Surprise Website by Abhay

A mobile-first, interactive, seven-screen friendship birthday surprise website built with pure **HTML5**, **CSS3**, and **Vanilla JavaScript**.

---

## ✨ Features

- **7 Sequential Screens**:
  1. **The Main Birthday Cover**: Featuring Sudha's real celebration photo (`sudha-01.jpg`), animated balloons, sparkles, and birthday badge.
  2. **Birthday Celebration**: Party poppers, glowing candles, warm wishes, and interactive "Make a Birthday Wish" reveal.
  3. **Interactive Cake Cutting**: Animated knife slicing the multi-layer birthday cake, slice separation animation, candle flames extinguishing, confetti bursts, and celebratory message.
  4. **The Scrapbook Memory Gallery**: Responsive polaroid scrapbook grid of all 10 photos, washi-tape styling, full-screen lightbox with previous/next controls, keyboard navigation, and mobile touch swipe.
  5. **A Special Birthday Letter**: Realistic 3D folding envelope with wax seal, letter card sliding out with heartfelt personal message from Abhay, and replay animation.
  6. **A Surprise Gift**: 3D interactive gift box with pink ribbon and bow; opens with confetti to reveal a friendship wish capsule.
  7. **The Grand Finale**: Royal portrait of Sudha in golden halo lights, crown badge, heartfelt closing blessings, signature, plus functional **Replay** and **Gallery Shortcut** controls.
- **Strict Manual Progression**: No automatic timers or autoplay transitions. Each screen opens strictly when the user taps the forward button.
- **Back Navigation**: Easy step-back buttons on Screens 2–7.
- **Audio Experience**: Plays `assets/audio/birthday-piano.mp3` with play/pause/soundwave indicator. If no audio file is provided, a built-in melodic Web Audio music-box synthesizer seamlessly plays the "Happy Birthday" tune.
- **Zero Build Step**: Pure HTML/CSS/JS that works immediately in any browser.

---

## 📂 Project Structure

```text
birthday-sudha/
│
├── index.html              # Core HTML structure for all 7 screens & modals
├── style.css               # Mobile-first stylesheet (responsive 360px+)
├── script.js               # Central configuration, particle engine & logic
├── README.md               # Documentation & setup guide
│
└── assets/
    ├── images/
    │   ├── sudha-01.jpg    # Main front-page photo (Sudha Kumari's real photo)
    │   ├── sudha-02.jpg    # Photo memory 2
    │   ├── sudha-03.jpg    # Photo memory 3
    │   ├── sudha-04.jpg    # Photo memory 4
    │   ├── sudha-05.jpg    # Photo memory 5
    │   ├── sudha-06.jpg    # Photo memory 6
    │   ├── sudha-07.jpg    # Photo memory 7
    │   ├── sudha-08.jpg    # Photo memory 8
    │   ├── sudha-09.jpg    # Photo memory 9
    │   └── sudha-10.jpg    # Photo memory 10
    └── audio/
        └── birthday-piano.mp3  # Optional piano/instrumental track
```

---

## 📸 1. Placing the 10 Photographs

1. The front cover photograph is already in place:
   `assets/images/sudha-01.jpg`
2. Place the remaining 9 photographs inside `assets/images/` using these exact names:
   - `sudha-02.jpg`
   - `sudha-03.jpg`
   - `sudha-04.jpg`
   - `sudha-05.jpg`
   - `sudha-06.jpg`
   - `sudha-07.jpg`
   - `sudha-08.jpg`
   - `sudha-09.jpg`
   - `sudha-10.jpg`
3. If an image is ever missing or failing to load, the website automatically displays an elegant, graceful pastel card with decorative polaroid styling so there are **never** any broken image icons.

---

## ✏️ 2. Customizing Messages, Letter & Captions

Open `script.js` and edit the top `CONFIG` object:

```javascript
const CONFIG = {
  recipientName: "Sudha Kumari",
  recipientShortName: "Sudha",
  senderName: "Abhay",
  photos: [
    { id: 1, filename: "sudha-01.jpg", caption: "The Birthday Star ⭐" },
    { id: 2, filename: "sudha-02.jpg", caption: "Happy Smiles & Golden Days ✨" },
    // Customize any caption here...
  ]
};
```

To edit the letter content, simply modify the text inside `<div class="letter-body">` in `index.html`.

---

## 🎵 3. Adding Background Music

1. Place your preferred soft piano or instrumental MP3 file into `assets/audio/` and name it:
   `birthday-piano.mp3`
2. The website will automatically detect and play it when the user taps "Music: Off" or interacts with the surprise button.
3. If no MP3 is placed, the built-in browser Web Audio synthesizer automatically plays a gentle, peaceful acoustic music-box tune of "Happy Birthday".

---

## 💻 4. Running the Website Locally

You can run the website locally in any of the following easy ways:

### Option A: Double-Click
Simply double-click `index.html` to open it directly in Google Chrome, Microsoft Edge, Safari, or Firefox.

### Option B: Python Local Server (Recommended for audio & media)
Open a terminal in the `birthday-sudha` folder and run:
```bash
python -m http.server 8000
```
Then open your browser at:
`http://localhost:8000`

---

## 🌐 5. Publishing a Shareable Public URL

To send this surprise link directly to Sudha on WhatsApp, Telegram, or Instagram:

### Method 1: GitHub Pages (Free & Permanent)
1. Create a free repository on [GitHub](https://github.com).
2. Upload the files (`index.html`, `style.css`, `script.js`, `assets/`).
3. Go to **Settings** → **Pages** → Source: **Deploy from a branch** (select `main` / `/root`).
4. You will get a live link such as:
   `https://<your-username>.github.io/<repo-name>/`

### Method 2: Netlify Drop (Instant, No Account Required)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `birthday-sudha` folder directly into the browser.
3. Netlify will generate a live instant public HTTPS URL in seconds!

### Method 3: Vercel
1. Install Vercel CLI (`npm i -g vercel`) or import your GitHub repository on [vercel.com](https://vercel.com).
2. Click Deploy to get a fast global HTTPS link.
