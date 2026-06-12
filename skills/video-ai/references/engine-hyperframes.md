# HyperFrames Engine Guide

## Overview

**HyperFrames** by HeyGen is an agent-native, open-source video rendering framework. It turns standard **HTML / CSS / JS** into deterministic **MP4** output — write web code, get a video. Because scenes are just HTML documents, any web technology (Canvas, SVG, Web Animations API, GSAP) works out of the box.

Key characteristics:

| Feature | Detail |
|---|---|
| Input format | HTML + CSS + JS |
| Output format | MP4 (H.264) |
| Resolution | 1920 × 1080 (default) |
| Frame rate | 30 fps (configurable) |
| Animation | GSAP (recommended) or CSS @keyframes |
| Rendering | Headless Chromium screenshot pipeline |
| Open-source | Yes — MIT license |

> [!TIP]
> HyperFrames is the **easiest** engine for quick one-off videos. If you already know HTML/CSS, you can produce a polished video in minutes.

---

## Project Structure

```
my-video/
├── index.html              # Main entry point — contains all scenes
├── styles.css              # Project styles (imports the skill's base styles.css)
├── script.js               # GSAP timelines & animation logic
├── assets/                 # Images, fonts, audio clips
│   ├── images/
│   ├── fonts/
│   └── audio/
└── hyperframes.config.json # Render configuration
```

### `hyperframes.config.json`

This file controls the render output:

```json
{
  "width": 1920,
  "height": 1080,
  "fps": 30,
  "duration": "auto"
}
```

| Key | Type | Description |
|---|---|---|
| `width` | number | Output width in pixels. Use `1920` for 16:9 HD. |
| `height` | number | Output height in pixels. Use `1080` for 16:9 HD. |
| `fps` | number | Frames per second. `30` is the default. |
| `duration` | `"auto"` or number | `"auto"` calculates total from scene `data-duration` attributes. A number sets a fixed total in seconds. |

---

## HTML Structure for Scenes

Every video is a sequence of `<section>` elements inside `index.html`. Each section represents one **scene**.

### Scene Pattern

```html
<section class="scene scene-<name>" data-duration="<seconds>s">
  <!-- Scene content here -->
</section>
```

Rules:

1. **Every scene** must have class `scene` and a unique modifier class (`scene-intro`, `scene-content-1`, etc.).
2. **`data-duration`** sets how long the scene is displayed (e.g., `"5s"`, `"8s"`).
3. Scenes are **sequential** — they play in DOM order.
4. Use the design-token CSS variables (defined in the skill's `styles.css`) for all colors, fonts, and spacing.
5. Include `animations.js` (or inline GSAP code) to drive motion.

### Complete Intro Scene Example

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=1920, height=1080" />
  <link rel="stylesheet" href="styles.css" />
  <!-- GSAP CDN -->
  <script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
</head>
<body>

  <!-- ===== SCENE 1: INTRO ===== -->
  <section class="scene scene-intro" data-duration="5s">
    <div class="brand-logo">GOLGOTHA ACADEMY</div>
    <h1 class="title-main">Course Title Here</h1>
    <p class="subtitle">Module description</p>
  </section>

  <!-- ===== SCENE 2: CONTENT ===== -->
  <section class="scene scene-content" data-duration="8s">
    <h2 class="title-section">Key Concept</h2>
    <ul class="bullet-list">
      <li class="bullet-item">First point</li>
      <li class="bullet-item">Second point</li>
      <li class="bullet-item">Third point</li>
    </ul>
  </section>

  <!-- ===== SCENE 3: OUTRO ===== -->
  <section class="scene scene-outro" data-duration="4s">
    <div class="brand-logo">GOLGOTHA ACADEMY</div>
    <p class="subtitle">¡Gracias por aprender con nosotros!</p>
  </section>

  <script src="script.js"></script>
</body>
</html>
```

### Supporting `styles.css`

Import the skill's base design tokens, then add scene-specific styles:

```css
/* ===== Design Tokens (from the skill) ===== */
:root {
  --bg-main:       #f8fafc;
  --fg-title-main: #000000;
  --fg-title:      #111111;
  --fg-body:       #4b5563;
  --color-primary: #059669;
  --color-soft:    #CFF8E2;
  --color-positive-bg: #ecfdf5;
  --card-bg:       #ffffff;
  --card-border:   #e5e7eb;
  --color-error:   #ff4444;
  --color-error-bg:#fef2f2;
  --color-neutral: #f3f4f6;
  --color-blue:    #2563eb;
  --color-violet:  #7c3aed;
  --color-amber:   #d97706;

  --font-title: 'Montserrat', 'Aptos', 'Segoe UI', Arial, sans-serif;
  --font-body:  'Inter', 'Aptos', 'Segoe UI', Arial, sans-serif;
}

/* ===== Base Scene Layout ===== */
.scene {
  width: 1920px;
  height: 1080px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-main);
  position: relative;
  overflow: hidden;
}

/* ===== Typography ===== */
.brand-logo {
  font-family: var(--font-title);
  font-weight: 800;
  font-size: 28px;
  color: var(--color-primary);
  letter-spacing: 4px;
  text-transform: uppercase;
}

.title-main {
  font-family: var(--font-title);
  font-weight: 800;
  font-size: 64px;
  color: var(--fg-title-main);
  text-align: center;
  margin: 24px 0 16px;
}

.title-section {
  font-family: var(--font-title);
  font-weight: 800;
  font-size: 48px;
  color: var(--fg-title);
}

.subtitle {
  font-family: var(--font-body);
  font-size: 28px;
  color: var(--fg-body);
}

.bullet-list {
  list-style: none;
  padding: 0;
}

.bullet-item {
  font-family: var(--font-body);
  font-size: 32px;
  color: var(--fg-body);
  padding: 12px 0;
  padding-left: 32px;
  position: relative;
}

.bullet-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--color-primary);
}
```

---

## Animation with GSAP

GSAP (GreenSock Animation Platform) is the **recommended** animation engine. Include it via CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
```

### Timeline-Based Animations

Each scene should have its own GSAP timeline. Timelines keep animations sequential and easy to reason about.

```javascript
// script.js — Animation controller for HyperFrames scenes

// ===== SCENE 1: Intro =====
function animateIntro() {
  const tl = gsap.timeline();

  tl.from('.scene-intro .brand-logo', {
    opacity: 0,
    scale: 0.8,
    duration: 0.8,
    ease: 'power2.out'
  })
  .from('.scene-intro .title-main', {
    opacity: 0,
    y: 30,
    duration: 0.6,
    ease: 'power2.out'
  }, '-=0.3')
  .from('.scene-intro .subtitle', {
    opacity: 0,
    y: 20,
    duration: 0.5,
    ease: 'power2.out'
  }, '-=0.2');

  return tl;
}

// ===== SCENE 2: Content =====
function animateContent() {
  const tl = gsap.timeline();

  tl.from('.scene-content .title-section', {
    opacity: 0,
    x: -40,
    duration: 0.6,
    ease: 'power2.out'
  })
  .from('.scene-content .bullet-item', {
    opacity: 0,
    x: -30,
    duration: 0.4,
    stagger: 0.25,
    ease: 'power2.out'
  }, '-=0.2');

  return tl;
}

// ===== SCENE 3: Outro =====
function animateOutro() {
  const tl = gsap.timeline();

  tl.from('.scene-outro .brand-logo', {
    opacity: 0,
    scale: 0.9,
    duration: 0.8,
    ease: 'power2.out'
  })
  .from('.scene-outro .subtitle', {
    opacity: 0,
    y: 20,
    duration: 0.5,
    ease: 'power2.out'
  }, '-=0.3');

  return tl;
}

// ===== Master Timeline =====
const master = gsap.timeline();
master
  .add(animateIntro())
  .add(animateContent(), '+=5')   // starts after intro scene
  .add(animateOutro(),   '+=8');  // starts after content scene
```

### Animation Cookbook

#### Fade-In

```javascript
gsap.from(element, {
  opacity: 0,
  duration: 0.6,
  ease: 'power2.out'
});
```

#### Slide-In (from left)

```javascript
gsap.from(element, {
  opacity: 0,
  x: -50,
  duration: 0.6,
  ease: 'power2.out'
});
```

#### Slide-In (from bottom)

```javascript
gsap.from(element, {
  opacity: 0,
  y: 40,
  duration: 0.6,
  ease: 'power2.out'
});
```

#### Stagger (list items)

```javascript
gsap.from('.bullet-item', {
  opacity: 0,
  x: -30,
  duration: 0.4,
  stagger: 0.25,
  ease: 'power2.out'
});
```

#### Scale Entrance

```javascript
gsap.from(element, {
  opacity: 0,
  scale: 0.8,
  duration: 0.8,
  ease: 'power2.out'
});
```

#### Counter / Number Roll-Up

```javascript
const obj = { val: 0 };
gsap.to(obj, {
  val: 100,
  duration: 2,
  ease: 'power1.out',
  onUpdate: () => {
    element.textContent = Math.round(obj.val) + '%';
  }
});
```

### Easing Reference

Use **`power2.out`** as the default easing for virtually all educational animations. It gives a professional, smooth deceleration.

| Easing | Use Case |
|---|---|
| `power2.out` | **Default** — titles, text, cards entering |
| `power2.inOut` | Elements moving across the scene |
| `power3.out` | Heavier/dramatic entrances |
| `elastic.out(1, 0.5)` | Playful bounces (use sparingly) |
| `none` (linear) | Progress bars, counters |

> [!IMPORTANT]
> Avoid `ease: 'bounce'` or heavy elastic easing in educational content. It looks unprofessional and distracts from learning.

---

## CSS Animations (Alternative)

For simple animations, pure CSS `@keyframes` work without any JS dependency.

### Fade-In

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}
```

### Slide-In from Bottom

```css
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-up {
  animation: slideUp 0.6s ease-out forwards;
}
```

### Stagger via Animation Delay

```css
.bullet-item:nth-child(1) { animation-delay: 0.0s; }
.bullet-item:nth-child(2) { animation-delay: 0.25s; }
.bullet-item:nth-child(3) { animation-delay: 0.50s; }
.bullet-item:nth-child(4) { animation-delay: 0.75s; }
```

### Scale Entrance

```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.scale-in {
  animation: scaleIn 0.8s ease-out forwards;
}
```

> [!NOTE]
> CSS animations are simpler but lack GSAP's timeline sequencing. Use them for isolated elements; use GSAP when you need coordinated multi-element choreography.

---

## CLI Commands

```bash
hyperframes init my-video         # Scaffold a new project with boilerplate files
hyperframes preview               # Open live preview in the browser (hot-reload)
hyperframes lint                  # Check for rendering issues before export
hyperframes render                # Render to MP4 (output in ./output/)
hyperframes render -o output.mp4  # Render with a custom output file path
```

### Common Flags

| Flag | Description |
|---|---|
| `-o`, `--output` | Custom output path for the rendered MP4 |
| `--width` | Override width (default: from config) |
| `--height` | Override height (default: from config) |
| `--fps` | Override frame rate |
| `--quality` | Encoding quality: `low`, `medium`, `high` (default: `high`) |

### Typical Workflow

```bash
# 1. Create project
hyperframes init mi-leccion

# 2. Edit index.html, styles.css, script.js

# 3. Preview in browser
cd mi-leccion
hyperframes preview

# 4. Check for issues
hyperframes lint

# 5. Render final video
hyperframes render -o mi-leccion-final.mp4
```

---

## Best Practices for Educational Videos

### Structure

- **Semantic HTML** — Use `<section>`, `<h1>`–`<h3>`, `<p>`, `<ul>` for scene structure. Avoid generic `<div>` soup.
- **One concept per scene** — Each scene should teach exactly one idea. If a scene needs more than 10 seconds, split it.
- **Intro + Content + Outro** — Always include a branded intro (with `GOLGOTHA ACADEMY`) and outro.

### Animation

- **Purposeful motion** — Every animation should serve comprehension (reveal order, draw attention). Never animate just for decoration.
- **Consistent direction** — Pick a direction (left-to-right, top-to-bottom) and stick with it within a section.
- **Stagger for lists** — Always stagger bullet points or list items; never reveal them all at once.
- **Timing** — Keep entrance animations between 0.4 s and 0.8 s. Longer feels sluggish; shorter feels jarring.

### Performance

- **Optimize images** — Use WebP or compressed PNG. Max 500 KB per image.
- **Limit DOM elements** — Each scene should have fewer than 50 elements.
- **Preview first** — Always run `hyperframes preview` before rendering.

### Accessibility & Readability

- **Minimum font size** — Never go below 24 px for any on-screen text.
- **Contrast** — Dark text on light background (`#f8fafc`). The brand palette is already accessible.
- **Language** — Use Spanish for user-facing content (titles, explanations). Code and technical labels may be in English.

---

## Integration with Skill Templates

The `templates/hyperframes/` directory contains production-ready scene templates for educational videos. Use them as starting points — copy into your project and customize.

### Template Files

| File | Purpose |
|---|---|
| `scene-intro.html` | Branded intro with GOLGOTHA ACADEMY logo, course title, and module subtitle. Includes GSAP entrance animation. |
| `scene-content-bullets.html` | Bullet-point explanation scene. Title + staggered bullet list. |
| `scene-content-diagram.html` | Diagram or image-based scene with caption and annotation overlays. |
| `scene-content-code.html` | Code walkthrough scene with syntax-highlighted code block and step-by-step highlights. |
| `scene-content-comparison.html` | Two-column comparison layout (e.g., "Before vs. After", "Pros vs. Cons"). |
| `scene-quiz.html` | Interactive quiz/question scene with options and reveal animation. |
| `scene-summary.html` | Key takeaways scene with numbered summary points. |
| `scene-outro.html` | Branded outro with GOLGOTHA ACADEMY logo and call-to-action text. |
| `styles.css` | Base stylesheet with all design tokens and utility classes. Import this in every project. |
| `animations.js` | Reusable GSAP animation functions (fadeIn, slideIn, staggerList, scaleIn, typewriter). |

### Using a Template

```bash
# 1. Copy the template files you need
cp templates/hyperframes/scene-intro.html my-video/
cp templates/hyperframes/styles.css my-video/
cp templates/hyperframes/animations.js my-video/

# 2. Edit the copied files for your lesson content
# 3. Preview and render
```

> [!TIP]
> You don't need every template. Pick only the scene types your lesson requires, then assemble them in a single `index.html`.
