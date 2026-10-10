/**
 * ========================================================
 * HAPPY BIRTHDAY SUDHA KUMARI 🎂💛
 * A Personalized Friendship Birthday Surprise by Abhay
 * Vanilla JavaScript Engine
 * ========================================================
 */

// ========================================================
// 1. CENTRALIZED CONFIGURATION
// ========================================================
const CONFIG = {
  recipientName: "Sudha Kumari",
  recipientShortName: "Sudha",
  senderName: "Abhay",
  audioPath: "assets/audio/birthday-piano.mp3",
  totalScreens: 7,
  
  // Exactly 10 Photographs with friendly captions
  photos: [
    {
      id: 1,
      filename: "sudha-01.jpg",
      src: "assets/images/sudha-01.jpg",
      caption: "The Birthday Star ⭐"
    },
    {
      id: 2,
      filename: "sudha-02.jpg",
      src: "assets/images/sudha-02.jpg",
      caption: "Birthday Girl Celebrations 🎂"
    },
    {
      id: 3,
      filename: "sudha-03.jpg",
      src: "assets/images/sudha-03.jpg",
      caption: "Serene & Beautiful Moments ✨"
    },
    {
      id: 4,
      filename: "sudha-04.jpg",
      src: "assets/images/sudha-04.jpg",
      caption: "Sweet & Joyful Memories 🌸"
    },
    {
      id: 5,
      filename: "sudha-05.jpg",
      src: "assets/images/sudha-05.jpg",
      caption: "Grace & Festive Vibes 🌼"
    },
    {
      id: 6,
      filename: "sudha-06.jpg",
      src: "assets/images/sudha-06.jpg",
      caption: "Warm Smiles & Good Times 💖"
    },
    {
      id: 7,
      filename: "sudha-07.jpg",
      src: "assets/images/sudha-07.jpg",
      caption: "Simple Days & Happy Vibes ✨"
    },
    {
      id: 8,
      filename: "sudha-08.jpg",
      src: "assets/images/sudha-08.jpg",
      caption: "Divine Blessings & Peace 🙏"
    },
    {
      id: 9,
      filename: "sudha-09.jpg",
      src: "assets/images/sudha-09.jpg",
      caption: "Classic Grace & Smiles 🤍"
    },
    {
      id: 10,
      filename: "sudha-10.jpg",
      src: "assets/images/sudha-10.jpg",
      caption: "Countless Reasons to Smile 🌟"
    }
  ]
};

// ========================================================
// 2. APPLICATION STATE
// ========================================================
const state = {
  currentScreen: 1,
  isTransitioning: false,
  wishMade: false,
  cakeCut: false,
  letterOpened: false,
  giftOpened: false,
  activeLightboxIndex: 0,
  musicPlaying: false,
  synthAudioActive: false
};

// ========================================================
// 3. AMBIENT PARTICLES & CONFETTI ENGINE (CANVAS)
// ========================================================
const canvas = document.getElementById("ambient-canvas");
const ctx = canvas.getContext("2d");
let particles = [];
let animFrameId = null;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor(x, y, isBurst = false) {
    this.x = x ?? Math.random() * canvas.width;
    this.y = y ?? (isBurst ? y : Math.random() * canvas.height);
    this.isBurst = isBurst;
    
    // Confetti shapes & birthday pastel palette
    const colors = [
      "#f472b6", "#ec4899", "#fbcfe8", // Pinks
      "#facc15", "#eab308", "#fef08a", // Golds
      "#c084fc", "#a855f7", "#e9d5ff", // Lavenders
      "#38bdf8", "#6ee7b7"             // Soft sky & mint
    ];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.size = isBurst ? Math.random() * 8 + 4 : Math.random() * 4 + 2;
    
    if (isBurst) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 9 + 3;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed - 3;
      this.gravity = 0.22;
      this.drag = 0.96;
      this.life = 1;
      this.decay = Math.random() * 0.015 + 0.008;
    } else {
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = Math.random() * 0.6 + 0.3;
      this.gravity = 0;
      this.drag = 1;
      this.life = 1;
      this.decay = 0;
    }
    
    this.rotation = Math.random() * 360;
    this.vRotation = (Math.random() - 0.5) * 10;
  }
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.vRotation;
    
    if (this.isBurst) {
      this.vy += this.gravity;
      this.vx *= this.drag;
      this.vy *= this.drag;
      this.life -= this.decay;
    } else {
      // Ambient floating particles wrap around
      if (this.y > canvas.height + 10) {
        this.y = -10;
        this.x = Math.random() * canvas.width;
      }
      if (this.x < -10) this.x = canvas.width + 10;
      if (this.x > canvas.width + 10) this.x = -10;
    }
  }
  
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.globalAlpha = Math.max(0, this.life * 0.85);
    ctx.fillStyle = this.color;
    
    // Draw tiny rounded confetti or sparkle
    if (this.isBurst) {
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.6);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

// Populate ambient particles
for (let i = 0; i < 28; i++) {
  particles.push(new Particle());
}

function fireConfetti(originX, originY, count = 75) {
  const x = originX ?? canvas.width / 2;
  const y = originY ?? canvas.height / 2;
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y, true));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw();
    if (p.isBurst && p.life <= 0) {
      particles.splice(i, 1);
    }
  }
  
  animFrameId = requestAnimationFrame(animateParticles);
}
animateParticles();

// ========================================================
// 4. MUSIC CONTROLLER (MP3 + SYNTHESIZED WEB AUDIO FALLBACK)
// ========================================================
const bgAudio = document.getElementById("bg-audio");
const cakeCutAudio = document.getElementById("cake-cut-audio");
const musicBtn = document.getElementById("music-toggle-btn");
const musicIcon = document.getElementById("music-icon");
const musicLabel = document.getElementById("music-label");

let audioCtx = null;
let synthTimer = null;

// Gentle Music-Box / Piano Synth for "Happy Birthday" (Offline fallback)
const TUNE_NOTES = [
  { note: "G4", dur: 0.35, pause: 0.1 },
  { note: "G4", dur: 0.25, pause: 0.05 },
  { note: "A4", dur: 0.6, pause: 0.1 },
  { note: "G4", dur: 0.6, pause: 0.1 },
  { note: "C5", dur: 0.6, pause: 0.1 },
  { note: "B4", dur: 1.1, pause: 0.3 },
  
  { note: "G4", dur: 0.35, pause: 0.1 },
  { note: "G4", dur: 0.25, pause: 0.05 },
  { note: "A4", dur: 0.6, pause: 0.1 },
  { note: "G4", dur: 0.6, pause: 0.1 },
  { note: "D5", dur: 0.6, pause: 0.1 },
  { note: "C5", dur: 1.1, pause: 0.3 },
  
  { note: "G4", dur: 0.35, pause: 0.1 },
  { note: "G4", dur: 0.25, pause: 0.05 },
  { note: "G5", dur: 0.6, pause: 0.1 },
  { note: "E5", dur: 0.6, pause: 0.1 },
  { note: "C5", dur: 0.6, pause: 0.1 },
  { note: "B4", dur: 0.6, pause: 0.1 },
  { note: "A4", dur: 0.9, pause: 0.3 },
  
  { note: "F5", dur: 0.35, pause: 0.1 },
  { note: "F5", dur: 0.25, pause: 0.05 },
  { note: "E5", dur: 0.6, pause: 0.1 },
  { note: "C5", dur: 0.6, pause: 0.1 },
  { note: "D5", dur: 0.6, pause: 0.1 },
  { note: "C5", dur: 1.3, pause: 1.0 }
];

const NOTE_FREQS = {
  G4: 392.00, A4: 440.00, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25,
  F5: 698.46, G5: 783.99
};

function playSynthTone(freq, duration) {
  if (!audioCtx) return;
  const now = audioCtx.currentTime;
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  // Sine + triangle harmonic blend for sweet music-box tone
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, now);
  
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(0.18, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  
  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start(now);
  osc.stop(now + duration);
}

function startSynthMelodyLoop() {
  if (state.synthAudioActive) return;
  state.synthAudioActive = true;
  
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  
  let noteIndex = 0;
  function scheduleNextNote() {
    if (!state.musicPlaying || !state.synthAudioActive) return;
    
    const step = TUNE_NOTES[noteIndex];
    const freq = NOTE_FREQS[step.note] || 440;
    playSynthTone(freq, step.dur);
    
    noteIndex = (noteIndex + 1) % TUNE_NOTES.length;
    synthTimer = setTimeout(scheduleNextNote, (step.dur + step.pause) * 1000);
  }
  
  scheduleNextNote();
}

function stopSynthMelody() {
  state.synthAudioActive = false;
  if (synthTimer) {
    clearTimeout(synthTimer);
    synthTimer = null;
  }
}

function toggleMusic(forcePlay = null) {
  const shouldPlay = forcePlay !== null ? forcePlay : !state.musicPlaying;
  
  if (shouldPlay) {
    state.musicPlaying = true;
    updateMusicUI(true);

    // If currently on Step 3, play user's YouTube short song
    if (state.currentScreen === 3) {
      if (bgAudio) bgAudio.pause();
      stopSynthMelody();
      if (cakeCutAudio) {
        cakeCutAudio.volume = 0.95;
        cakeCutAudio.loop = true;
        cakeCutAudio.play().catch(e => console.log("Cake audio toggle error:", e));
      }
    } else {
      // On all other steps, play soothing background piano music
      if (cakeCutAudio) {
        cakeCutAudio.pause();
        cakeCutAudio.currentTime = 0;
      }
      if (bgAudio) {
        bgAudio.volume = 0.35;
        const playPromise = bgAudio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            startSynthMelodyLoop();
          });
        }
      }
    }
  } else {
    if (bgAudio) bgAudio.pause();
    if (cakeCutAudio) cakeCutAudio.pause();
    stopSynthMelody();
    state.musicPlaying = false;
    updateMusicUI(false);
  }
}

function updateMusicUI(isPlaying) {
  if (isPlaying) {
    musicBtn.classList.add("playing");
    musicIcon.textContent = "🎶";
    musicLabel.textContent = "Music: On";
  } else {
    musicBtn.classList.remove("playing");
    musicIcon.textContent = "🎵";
    musicLabel.textContent = "Music: Off";
  }
}

musicBtn.addEventListener("click", () => {
  toggleMusic();
});

// Auto-start music on first user gesture anywhere if not already active
function initAudioOnFirstTouch() {
  if (!state.musicPlaying) {
    toggleMusic(true);
  }
  document.removeEventListener("click", initAudioOnFirstTouch);
  document.removeEventListener("touchstart", initAudioOnFirstTouch);
}
document.addEventListener("click", initAudioOnFirstTouch, { once: true });
document.addEventListener("touchstart", initAudioOnFirstTouch, { once: true });

// ========================================================
// 5. NAVIGATION CONTROLLER (7 SEQUENTIAL SCREENS)
// ========================================================
const screens = document.querySelectorAll(".screen-view");
const progressFill = document.getElementById("progress-fill");
const stepBadges = document.querySelectorAll(".step-badge");

function goToScreen(targetStep) {
  if (state.isTransitioning) return;
  if (targetStep < 1 || targetStep > CONFIG.totalScreens) return;
  if (targetStep === state.currentScreen) return;
  
  state.isTransitioning = true;
  
  // Hide all screens
  screens.forEach((scr) => {
    scr.classList.remove("active");
  });
  
  // Activate target screen
  const targetElement = document.getElementById(`screen-${targetStep}`);
  if (targetElement) {
    targetElement.classList.add("active");
  }
  
  state.currentScreen = targetStep;
  window.scrollTo({ top: 0, behavior: "smooth" });
  
  // Update progress bar & indicators
  const percent = ((targetStep) / CONFIG.totalScreens) * 100;
  progressFill.style.width = `${percent}%`;
  
  stepBadges.forEach((badge) => {
    const bStep = parseInt(badge.getAttribute("data-step"), 10);
    badge.classList.remove("active");
    if (bStep === targetStep) {
      badge.classList.add("active");
      badge.classList.remove("completed");
    } else if (bStep < targetStep) {
      badge.classList.add("completed");
    } else {
      badge.classList.remove("completed");
    }
  });
  
  // Trigger special screen enter celebration
  if (targetStep === 1 || targetStep === 7) {
    fireConfetti(canvas.width / 2, canvas.height * 0.35, 45);
  }
  
  // Screen 3 Audio & Balloon logic
  if (targetStep === 3) {
    // Balloons fly ONLY on Screen 3 (Cake cutting screen)
    for (let i = 0; i < 6; i++) {
      setTimeout(spawnFlyingBalloon, i * 300);
    }
    // Step 3: Stop background piano, start user's custom song immediately!
    if (bgAudio) {
      bgAudio.pause();
    }
    stopSynthMelody();
    if (cakeCutAudio) {
      cakeCutAudio.loop = true;
      cakeCutAudio.volume = 0.95;
      cakeCutAudio.currentTime = 0;
      cakeCutAudio.play().then(() => {
        state.musicPlaying = true;
        updateMusicUI(true);
      }).catch(e => {
        console.log("Cake audio autoplay notice:", e);
      });
    }
  } else {
    // Clear balloons on all other screens
    if (balloonsSky) {
      balloonsSky.innerHTML = "";
    }
    // If cake audio was playing, pause it and resume background piano music
    if (cakeCutAudio) {
      cakeCutAudio.pause();
      cakeCutAudio.currentTime = 0;
    }
    if (state.musicPlaying && bgAudio) {
      bgAudio.volume = 0.35;
      bgAudio.play().catch(e => console.log(e));
    }
  }

  // Ensure music is active if not already started
  if (!state.musicPlaying) {
    toggleMusic(true);
  }
  
  setTimeout(() => {
    state.isTransitioning = false;
  }, 450);
}

// Back button handler (present on screens 2 through 7)
document.querySelectorAll(".btn-back").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const prevStep = parseInt(btn.getAttribute("data-goto"), 10);
    if (!isNaN(prevStep)) {
      goToScreen(prevStep);
    }
  });
});

// Toast notification helper
function showToast(msg) {
  const toast = document.getElementById("toast-message");
  toast.textContent = msg;
  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3200);
}

// ========================================================
// 6. SCREEN 1: COVER
// ========================================================
const btnOpenSurprise = document.getElementById("btn-open-surprise");
btnOpenSurprise.addEventListener("click", () => {
  // Screen 1 -> Screen 2 ONLY on button click
  goToScreen(2);
});

// ========================================================
// 7. SCREEN 2: CELEBRATION & WISH
// ========================================================
const btnMakeWish = document.getElementById("btn-make-wish");
const wishReveal = document.getElementById("wish-reveal");
const btnGotoCake = document.getElementById("btn-goto-cake");

btnMakeWish.addEventListener("click", () => {
  if (!state.wishMade) {
    state.wishMade = true;
    wishReveal.classList.remove("hidden");
    btnMakeWish.textContent = "Wish Made! ✨";
    btnMakeWish.disabled = true;
    btnMakeWish.style.opacity = "0.75";
    
    // Sparkle burst around the wish button
    const rect = btnMakeWish.getBoundingClientRect();
    fireConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 50);
  }
});

btnGotoCake.addEventListener("click", () => {
  // Screen 2 -> Screen 3 ONLY on button click
  goToScreen(3);
});

// ========================================================
// 8. SCREEN 3: CAKE-CUTTING CELEBRATION
// ========================================================
const btnCutCake = document.getElementById("btn-cut-cake");
const knifeSliceEffect = document.getElementById("knife-slice-effect");
const poppedCakeSlice = document.getElementById("popped-cake-slice");
const cakeResultBox = document.getElementById("cake-celebration-result");
const btnGotoMemories = document.getElementById("btn-goto-memories");

btnCutCake.addEventListener("click", () => {
  // Prevent double cutting
  if (state.cakeCut) return;
  state.cakeCut = true;
  btnCutCake.disabled = true;
  btnCutCake.style.display = "none";
  
  // Cake cutting celebration: full volume on user's custom song
  if (cakeCutAudio) {
    try {
      if (bgAudio) bgAudio.pause();
      stopSynthMelody();
      cakeCutAudio.loop = true;
      cakeCutAudio.volume = 1.0;
      if (cakeCutAudio.paused) {
        cakeCutAudio.play().catch(e => console.log("Audio play error:", e));
      }
    } catch(err) {
      console.log("Audio play exception:", err);
    }
  }

  // Extra floating balloons burst on cake cut!
  for (let i = 0; i < 6; i++) {
    setTimeout(spawnFlyingBalloon, i * 200);
  }
  
  // Step 1: Animate Laser Slice on Sudha's Cake
  if (knifeSliceEffect) {
    knifeSliceEffect.classList.add("cutting");
  }
  
  setTimeout(() => {
    // Step 2: Blow out candle flames on the real cake
    document.querySelectorAll(".photo-candle-flame").forEach((f) => {
      f.classList.add("blown-out");
    });
    
    // Step 3: Pop delicious celebration cake slice
    if (poppedCakeSlice) {
      poppedCakeSlice.classList.add("separated");
    }
    
    // Step 4: Big Confetti burst over Sudha's cake celebration photo!
    const rect = document.getElementById("cake-stage").getBoundingClientRect();
    fireConfetti(rect.left + rect.width / 2, rect.top + rect.height * 0.55, 120);
    
    // Step 5: Reveal result announcement & memory button
    cakeResultBox.classList.remove("hidden");
    showToast("🎂 Sudha cut the cake! Happy Birthday! 🎉💛");
  }, 750);
});

btnGotoMemories.addEventListener("click", () => {
  // Screen 3 -> Screen 4 ONLY on button click
  // goToScreen(4) will smoothly stop cake audio, clear balloons, and resume background piano music
  goToScreen(4);
});

// ========================================================
// 9. SCREEN 4: SCRAPBOOK MEMORY GALLERY & LIGHTBOX
// ========================================================
const scrapbookGrid = document.getElementById("scrapbook-grid");
const btnGotoLetter = document.getElementById("btn-goto-letter");

// SVG placeholder fallback in case any image file is missing
function getSvgFallbackDataUrl(title) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#fdf2f8"/>
        <stop offset="50%" stop-color="#fce7f3"/>
        <stop offset="100%" stop-color="#fef9c3"/>
      </linearGradient>
    </defs>
    <rect width="600" height="750" fill="url(#g)"/>
    <rect x="25" y="25" width="550" height="700" fill="none" stroke="#f472b6" stroke-width="3" stroke-dasharray="10 8" rx="20"/>
    <circle cx="300" cy="300" r="80" fill="#ffffff" stroke="#ec4899" stroke-width="4"/>
    <text x="300" y="325" font-size="70" text-anchor="middle">📸</text>
    <text x="300" y="440" font-family="sans-serif" font-weight="bold" font-size="28" fill="#9d174d" text-anchor="middle">${title}</text>
    <text x="300" y="485" font-family="sans-serif" font-size="19" fill="#db2777" text-anchor="middle">Sudha Kumari 💛</text>
    <text x="300" y="530" font-family="sans-serif" font-size="16" fill="#831843" text-anchor="middle">Place photo in assets/images/</text>
  </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

// Render the 10 Scrapbook items
function renderGallery() {
  scrapbookGrid.innerHTML = "";
  
  CONFIG.photos.forEach((photo, index) => {
    const item = document.createElement("div");
    item.className = "scrapbook-item";
    item.setAttribute("role", "button");
    item.setAttribute("tabindex", "0");
    item.setAttribute("aria-label", `View photo: ${photo.caption}`);
    
    item.innerHTML = `
      <div class="scrapbook-tape"></div>
      <div class="scrapbook-photo-wrap">
        <img 
          src="${photo.src}" 
          alt="${photo.caption}" 
          class="scrapbook-img"
          loading="lazy"
          onerror="this.onerror=null; this.src='${getSvgFallbackDataUrl(photo.caption)}';"
        >
      </div>
      <div class="scrapbook-caption">${photo.caption}</div>
    `;
    
    // Lightbox open on click or Enter key
    item.addEventListener("click", () => openLightbox(index));
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(index);
      }
    });
    
    scrapbookGrid.appendChild(item);
  });
}
renderGallery();

btnGotoLetter.addEventListener("click", () => {
  // Screen 4 -> Screen 5 ONLY on button click
  goToScreen(5);
});

// Lightbox modal controls
const lightboxModal = document.getElementById("photo-lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCounter = document.getElementById("lightbox-counter");
const lightboxCaptionText = document.getElementById("lightbox-caption-text");
const lightboxCloseBtn = document.getElementById("lightbox-close-btn");
const lightboxPrevBtn = document.getElementById("lightbox-prev-btn");
const lightboxNextBtn = document.getElementById("lightbox-next-btn");
const lightboxBackdrop = document.getElementById("lightbox-backdrop");

function openLightbox(index) {
  state.activeLightboxIndex = index;
  updateLightboxContent();
  lightboxModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightboxModal.classList.add("hidden");
  document.body.style.overflow = "";
}

function updateLightboxContent() {
  const photo = CONFIG.photos[state.activeLightboxIndex];
  lightboxImg.src = photo.src;
  lightboxImg.alt = photo.caption;
  lightboxImg.onerror = () => {
    lightboxImg.src = getSvgFallbackDataUrl(photo.caption);
  };
  lightboxCounter.textContent = `Photo ${state.activeLightboxIndex + 1} of ${CONFIG.photos.length}`;
  lightboxCaptionText.textContent = photo.caption;
}

function nextLightboxPhoto() {
  state.activeLightboxIndex = (state.activeLightboxIndex + 1) % CONFIG.photos.length;
  updateLightboxContent();
}

function prevLightboxPhoto() {
  state.activeLightboxIndex = (state.activeLightboxIndex - 1 + CONFIG.photos.length) % CONFIG.photos.length;
  updateLightboxContent();
}

lightboxCloseBtn.addEventListener("click", closeLightbox);
lightboxBackdrop.addEventListener("click", closeLightbox);
lightboxNextBtn.addEventListener("click", nextLightboxPhoto);
lightboxPrevBtn.addEventListener("click", prevLightboxPhoto);

// Keyboard controls for lightbox
window.addEventListener("keydown", (e) => {
  if (lightboxModal.classList.contains("hidden")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") nextLightboxPhoto();
  if (e.key === "ArrowLeft") prevLightboxPhoto();
});

// Touch swipe gestures for mobile lightbox
let touchStartX = 0;
let touchEndX = 0;
lightboxModal.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });
lightboxModal.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchStartX - touchEndX > 50) {
    nextLightboxPhoto();
  } else if (touchEndX - touchStartX > 50) {
    prevLightboxPhoto();
  }
}, { passive: true });

// ========================================================
// 10. SCREEN 5: A SPECIAL BIRTHDAY LETTER
// ========================================================
const btnOpenLetter = document.getElementById("btn-open-letter");
const envelopeElement = document.getElementById("envelope-element");
const openedLetterCard = document.getElementById("opened-letter-card");
const btnReplayLetter = document.getElementById("btn-replay-letter");
const btnGotoGift = document.getElementById("btn-goto-gift");

function triggerOpenLetter() {
  state.letterOpened = true;
  envelopeElement.classList.add("opened");
  btnOpenLetter.style.display = "none";
  
  setTimeout(() => {
    openedLetterCard.classList.remove("hidden");
    const rect = openedLetterCard.getBoundingClientRect();
    fireConfetti(rect.left + rect.width / 2, rect.top + 60, 40);
  }, 600);
}

btnOpenLetter.addEventListener("click", triggerOpenLetter);

btnReplayLetter.addEventListener("click", () => {
  openedLetterCard.classList.add("hidden");
  envelopeElement.classList.remove("opened");
  btnOpenLetter.style.display = "inline-flex";
  setTimeout(() => {
    triggerOpenLetter();
  }, 250);
});

btnGotoGift.addEventListener("click", () => {
  // Screen 5 -> Screen 6 ONLY on button click
  goToScreen(6);
});

// ========================================================
// 11. SCREEN 6: A SURPRISE GIFT
// ========================================================
const btnOpenGift = document.getElementById("btn-open-gift");
const giftBoxElement = document.getElementById("gift-box-element");
const giftRevealResult = document.getElementById("gift-reveal-result");
const btnGotoFinal = document.getElementById("btn-goto-final");

btnOpenGift.addEventListener("click", () => {
  if (state.giftOpened) return;
  state.giftOpened = true;
  
  // Animate gift lid
  giftBoxElement.classList.add("opened");
  btnOpenGift.style.display = "none";
  
  // Confetti explosion
  const rect = giftBoxElement.getBoundingClientRect();
  fireConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 70);
  
  setTimeout(() => {
    giftRevealResult.classList.remove("hidden");
  }, 450);
});

btnGotoFinal.addEventListener("click", () => {
  // Screen 6 -> Screen 7 ONLY on button click
  goToScreen(7);
});

// ========================================================
// 12. SCREEN 7: THE FINAL BIRTHDAY WISH & ACTIONS
// ========================================================
const btnReplayAll = document.getElementById("btn-replay-all");
const btnViewGalleryDirect = document.getElementById("btn-view-gallery-direct");

// Reset and Replay from Screen 1
btnReplayAll.addEventListener("click", () => {
  // Reset all state interactions cleanly
  state.wishMade = false;
  state.cakeCut = false;
  state.letterOpened = false;
  state.giftOpened = false;
  
  // Reset Screen 2: Wish
  wishReveal.classList.add("hidden");
  btnMakeWish.textContent = "Make a Birthday Wish ✨";
  btnMakeWish.disabled = false;
  btnMakeWish.style.opacity = "1";
  
  // Reset Screen 3: Cake & Knife
  if (knifeSliceEffect) knifeSliceEffect.classList.remove("cutting");
  if (poppedCakeSlice) poppedCakeSlice.classList.remove("separated");
  document.querySelectorAll(".photo-candle-flame").forEach((f) => {
    f.classList.remove("blown-out");
  });
  cakeResultBox.classList.add("hidden");
  btnCutCake.disabled = false;
  btnCutCake.style.display = "inline-flex";
  
  // Reset Screen 5: Letter
  envelopeElement.classList.remove("opened");
  openedLetterCard.classList.add("hidden");
  btnOpenLetter.style.display = "inline-flex";
  
  // Reset Screen 6: Gift
  giftBoxElement.classList.remove("opened");
  giftRevealResult.classList.add("hidden");
  btnOpenGift.style.display = "inline-flex";
  
  // Navigate back to Screen 1
  goToScreen(1);
  showToast("Welcome back to the start! 🎂✨");
});

// Shortcut to View Photo Memories directly
btnViewGalleryDirect.addEventListener("click", () => {
  goToScreen(4);
});

// Graceful fallback for featured cover & finale images
const coverPhoto = document.getElementById("cover-photo");
const finalePhoto = document.getElementById("finale-photo");

coverPhoto.addEventListener("error", () => {
  coverPhoto.src = getSvgFallbackDataUrl("Sudha's Birthday Cover");
});
finalePhoto.addEventListener("error", () => {
  finalePhoto.src = getSvgFallbackDataUrl("Sudha's Grand Finale");
});

// ========================================================
// 13. FLYING BALLOONS CONTROLLER (CONTINUOUS RISING BALLOONS)
// ========================================================
const balloonsSky = document.getElementById("balloons-sky");
const BALLOON_PALETTES = [
  { bg: "linear-gradient(135deg, #f472b6 0%, #ec4899 100%)", knot: "#db2777" },
  { bg: "linear-gradient(135deg, #facc15 0%, #eab308 100%)", knot: "#ca8a04" },
  { bg: "linear-gradient(135deg, #c084fc 0%, #a855f7 100%)", knot: "#9333ea" },
  { bg: "linear-gradient(135deg, #fb7185 0%, #f43f5e 100%)", knot: "#e11d48" },
  { bg: "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)", knot: "#0284c7" },
  { bg: "linear-gradient(135deg, #fbcfe8 0%, #f472b6 100%)", knot: "#db2777" },
  { bg: "linear-gradient(135deg, #fed7aa 0%, #fb923c 100%)", knot: "#ea580c" }
];

function spawnFlyingBalloon() {
  if (!balloonsSky) return;
  // Balloons fly ONLY on Screen 3 (Cake cutting screen)!
  if (state.currentScreen !== 3) return;
  // Limit concurrent floating balloons on screen 3
  if (balloonsSky.childElementCount >= 14) return;

  const balloon = document.createElement("div");
  balloon.className = "flying-balloon";
  
  const palette = BALLOON_PALETTES[Math.floor(Math.random() * BALLOON_PALETTES.length)];
  balloon.style.background = palette.bg;
  balloon.style.color = palette.knot;
  
  const leftPos = Math.random() * 88 + 6; // 6% to 94%
  const duration = Math.random() * 5 + 7; // 7s to 12s
  const size = Math.random() * 16 + 42; // 42px to 58px
  const swayDist = (Math.random() - 0.5) * 80;
  
  balloon.style.left = `${leftPos}%`;
  balloon.style.width = `${size}px`;
  balloon.style.height = `${size * 1.25}px`;
  
  balloon.innerHTML = `
    <div class="balloon-knot"></div>
    <div class="balloon-string"></div>
  `;
  
  const anim = balloon.animate([
    { transform: `translateY(0px) translateX(0px) rotate(0deg)`, opacity: 0.95 },
    { transform: `translateY(-${window.innerHeight * 0.4}px) translateX(${swayDist}px) rotate(${swayDist * 0.12}deg)`, opacity: 0.95 },
    { transform: `translateY(-${window.innerHeight * 0.75}px) translateX(${-swayDist * 0.8}px) rotate(${-swayDist * 0.1}deg)`, opacity: 0.95 },
    { transform: `translateY(-${window.innerHeight + 160}px) translateX(${swayDist * 0.4}px) rotate(0deg)`, opacity: 0.2 }
  ], {
    duration: duration * 1000,
    easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)"
  });
  
  anim.onfinish = () => {
    balloon.remove();
  };
  
  // Interactive: Click/Tap balloon to pop it with sparkles!
  balloon.addEventListener("click", (e) => {
    e.stopPropagation();
    const rect = balloon.getBoundingClientRect();
    fireConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 28);
    balloon.classList.add("popping");
    if (audioCtx && state.musicPlaying) {
      playSynthTone(784, 0.12);
    }
    setTimeout(() => balloon.remove(), 240);
  });
  
  balloonsSky.appendChild(balloon);
}

// Automatic balloon release timer (fires only when on Screen 3)
setInterval(() => {
  if (state.currentScreen === 3) {
    spawnFlyingBalloon();
  }
}, 1200);
