---
name: video-ai
description: Create educational video content using the GOLGOTHA ACADEMY visual brand. Use when the user asks for tutorial videos, explainer animations, class recordings, educational video modules, or any video content that should follow the established style. Supports multiple rendering engines: HyperFrames (HTML→MP4), Remotion (React→MP4), and NotebookLM (AI-generated). Brand appears at intro and outro.
---

# Video AI — Educational Video Creation Skill

## Purpose

This skill generates **educational video content** in the style of a professional tutor giving a class. Every video produced must follow the **GOLGOTHA ACADEMY** visual brand system: clean, light backgrounds, academic typography, and a consistent color palette that communicates trust and clarity.

The skill covers the entire pipeline from scene scripting through final render, regardless of the chosen rendering engine. Videos are structured as lessons — they open with brand identification, teach through well-paced visual sequences, and close with a summary and brand sign-off.

> **Before generating any video content**, read the detailed design system in [`references/visual-guidelines.md`](references/visual-guidelines.md). That document contains spacing rules, layout grids, animation timing curves, and accessibility requirements that complement the rules below.

---

## Supported Engines

| Engine | Paradigm | Input | Output | Reference |
|---|---|---|---|---|
| **HyperFrames** (HeyGen) | Declarative HTML/CSS/JS scenes rendered to video | `.html` files with inline styles and JS animations | MP4 (1920×1080 or 1080×1920) | [`references/engine-hyperframes.md`](references/engine-hyperframes.md) |
| **Remotion** | React/TypeScript compositions rendered frame-by-frame | `.tsx` components + composition config | MP4 (1920×1080 or 1080×1920) | [`references/engine-remotion.md`](references/engine-remotion.md) |
| **NotebookLM** | AI-generated video from uploaded source documents | Text/PDF sources + custom instructions | MP4 (AI-determined length, 1–3 min) | [`references-notebooklm/engine-notebooklm.md`](references-notebooklm/engine-notebooklm.md) |

---

## Engine Selection

Use the following decision tree when the user does not explicitly specify an engine:

```
Is the goal a quick cinematic summary of an existing document?
  └─ YES → NotebookLM
  └─ NO ↓

Does the video require frame-level determinism and brand-exact output?
  └─ YES ↓
  └─ NO  → NotebookLM (with brand guidance as best-effort)

Does the video need complex data-driven animations, charts, or programmatic loops?
  └─ YES → Remotion
  └─ NO  ↓

Is the content primarily static slides, text reveals, and simple animations?
  └─ YES → HyperFrames
  └─ NO  → Remotion
```

**Rule of thumb:**
- **HyperFrames** — Best for straightforward tutorials, slide-based lessons, and simple motion graphics. Fastest to author.
- **Remotion** — Best for data visualizations, complex choreography, reusable component libraries, and videos that need programmatic control.
- **NotebookLM** — Best for rapid prototyping and cinematic overviews where exact visual control is not required. This module is **isolated** and can be removed without affecting the other engines.

---

## Hard Color Rules (Expanded Palette)

Every visual element in every scene **must** use tokens from this table. Do NOT introduce dark backgrounds, neon colors, or decorative gradients.

| Token | Hex | Usage |
|---|---|---|
| `bg-slide` | `#f8fafc` | Default slide / scene background. Light, NOT dark. |
| `fg-title-main` | `#000000` | Primary title text (course name, main headings). |
| `fg-title` | `#111111` | Section and card titles. |
| `fg-body` | `#4b5563` | Body paragraphs, descriptions, explanatory text. |
| `accent-green` | `#059669` | Primary brand accent. Buttons, highlights, checkmarks, progress bars. |
| `accent-green-soft` | `#CFF8E2` | Soft green fills. Tag backgrounds, success pill badges. |
| `accent-blue` | `#2563eb` | **NEW** — Highlights, interactive elements, clickable links, secondary CTAs. |
| `accent-blue-soft` | `#dbeafe` | **NEW** — Light blue background blocks, info callouts, tip boxes. |
| `accent-violet` | `#7c3aed` | **NEW** — Advanced topics, bonus content markers, special sections. |
| `accent-violet-soft` | `#ede9fe` | **NEW** — Light violet background blocks, advanced-topic callouts. |
| `accent-amber` | `#d97706` | **NEW** — Important notes, warnings, "pay attention" markers. |
| `accent-amber-soft` | `#fef3c7` | **NEW** — Light amber background blocks, warning callouts. |
| `bg-positive` | `#ecfdf5` | Positive-result backgrounds, correct-answer highlights. |
| `bg-card` | `#ffffff` | Card and content-panel backgrounds. |
| `border-card` | `#e5e7eb` | Card borders, divider lines, subtle separators. |
| `fg-error` | `#ff4444` | Error text, incorrect-answer indicators, destructive actions. |
| `bg-error` | `#fef2f2` | Error background panels, wrong-answer highlight. |
| `bg-neutral` | `#f3f4f6` | Neutral fills, disabled states, secondary backgrounds. |

### Accent Color Pairing Rules

Each accent color has a "soft" companion for backgrounds. Use the pairing consistently:

- **Green** (`accent-green` on `accent-green-soft` or `bg-positive`) — Default brand accent, success states, checkmarks.
- **Blue** (`accent-blue` on `accent-blue-soft`) — Information callouts, tips, interactive highlights.
- **Violet** (`accent-violet` on `accent-violet-soft`) — Advanced topics, bonus content, "deep dive" sections.
- **Amber** (`accent-amber` on `accent-amber-soft`) — Warnings, important notes, "caution" callouts.

---

## Typography

All sizes are in **px** (not pt). Font stacks include web-safe fallbacks.

| Role | Font | Weight | Size Range | Fallbacks |
|---|---|---|---|---|
| Main titles | Montserrat | ExtraBold (800) | 48–72 px | Aptos, Segoe UI, Arial, sans-serif |
| Section titles | Inter | Bold (700) | 36–48 px | Aptos, Segoe UI, Arial, sans-serif |
| Card / topic titles | Inter | SemiBold (600) | 24–32 px | Aptos, Segoe UI, Arial, sans-serif |
| Body text | Inter | Regular (400) | 18–24 px | Aptos, Segoe UI, Arial, sans-serif |
| Captions / subtitles | Inter | Regular (400) | 16–20 px | Aptos, Segoe UI, Arial, sans-serif |
| Code | JetBrains Mono | Regular (400) | 16–20 px | Consolas, Courier New, monospace |

### Typography Rules

1. **Line height** — Titles: 1.2. Body: 1.6. Code: 1.5.
2. **Letter spacing** — Titles: `-0.02em`. Body: `0`. Code: `0`.
3. **Max line width** — Body text must not exceed `720px` to maintain readability.
4. **Contrast** — All text must meet WCAG AA contrast ratios against its background.

---

## Core Scene Patterns (Educational Video)

Every educational video is composed from these reusable scene patterns. Each pattern has a recommended duration, layout description, and animation style.

### 1. Intro / Brand Open (3–5 s)

GOLGOTHA ACADEMY logo animation with the course or class title beneath it. Background: `bg-slide`. Logo uses `accent-green` as its primary color. Title in Montserrat ExtraBold, `fg-title-main`. A subtle fade-in or scale-up animation (300–500 ms ease-out). May include a thin `accent-green` line or bar that draws across the screen.

### 2. Topic Presentation (5–8 s)

A full-screen title card introducing the topic. Large title (`fg-title-main`, 56–72 px) centered or left-aligned. Below it, a context subtitle in `fg-body` (20–24 px) explaining what the learner will achieve. Optional: a small icon or illustration on the right side. Background: `bg-slide`.

### 3. Tutor Content (10–20 s)

The primary teaching scene. Two-column layout preferred:
- **Left column (55–60%):** Heading in `fg-title` + body text in `fg-body`. Bullet points or numbered lists with `accent-green` markers.
- **Right column (40–45%):** Supporting illustration, diagram, screenshot, or code snippet inside a `bg-card` panel with `border-card`.
Content enters with a gentle slide-in from the left (400 ms ease-out). Right-side visual follows with a slight delay (200 ms offset).

### 4. Step-by-Step (15–30 s)

Sequential steps displayed one at a time with progressive reveal. Each step is a horizontal card (`bg-card`, `border-card` border, rounded 12 px) containing a step number in `accent-green`, a title in `fg-title`, and a description in `fg-body`. Steps appear sequentially with a stagger of 600–800 ms. Active step may have a left border highlight in `accent-green`.

### 5. Code Example (10–20 s)

Code block on a `bg-neutral` or `bg-card` background with syntax highlighting. Font: JetBrains Mono, 18 px. Line numbers in `fg-body` at reduced opacity. Keywords highlighted with `accent-blue`, strings in `accent-green`, comments in `fg-body` at 60% opacity. Lines reveal sequentially (typewriter or fade-in, 100–200 ms per line). An optional annotation callout can point to specific lines using `accent-amber`.

### 6. Quiz / Exercise (8–15 s)

A question card centered on screen. Question text in `fg-title` (28–36 px). Below it, 2–4 multiple-choice options as horizontal or vertical cards. Each option: `bg-card` with `border-card`, text in `fg-body`. On reveal: correct answer highlights with `bg-positive` border + `accent-green` checkmark. Wrong answers get `bg-error` border + `fg-error` ✕. Reveal animation: 400 ms with a slight bounce.

### 7. Diagram / Data (8–15 s)

Animated chart or diagram that builds up progressively. Charts use the accent palette: primary series in `accent-green`, secondary in `accent-blue`, tertiary in `accent-violet`, alert series in `accent-amber`. Background: `bg-slide`. Axes and labels in `fg-body`. Title in `fg-title`. Elements animate in with draws, fades, or grows (600–1000 ms stagger).

### 8. Summary / Key Points (8–12 s)

Numbered or bulleted list of key takeaways. Each point has a `accent-green` checkmark (✓) followed by the text in `fg-body` (20–24 px). Points appear sequentially (400 ms stagger). A heading reads "Resumen" or "Puntos Clave" in `fg-title`. Background: `bg-slide` or a subtle `bg-positive` panel.

### 9. Section Transition (2–3 s)

A brief animated divider between major sections. Options:
- A horizontal `accent-green` line that draws across the screen.
- A centered section number + title that fades in and out.
- A geometric shape morph using `accent-green`.
Background: `bg-slide`. Keep it fast and clean — no decorative excess.

### 10. Closing / Brand Outro (3–5 s)

GOLGOTHA ACADEMY branding returns. Logo centered, Montserrat ExtraBold. Below: a call-to-action ("Suscríbete", "Sigue aprendiendo") in `fg-body`. Optional social links or QR code. Background: `bg-slide`. A `accent-green` bar or accent line frames the composition. Mirrors the Intro for visual bookending.

### 11. Lower Third (overlay)

Name/title overlay for speaker identification. Appears at the bottom-left of the screen. Semi-transparent `bg-card` panel (90% opacity) with `border-card` top edge and a left accent bar in `accent-green`. Name in `fg-title` (Inter SemiBold, 22 px). Role/title in `fg-body` (Inter Regular, 16 px). Slides in from the left (300 ms), holds for 4–6 s, slides out.

### 12. Subtitle Overlay (overlay)

Synchronized subtitle text at the bottom-center of the screen. Text in Inter Regular, 20 px, `#ffffff` with a subtle dark shadow or semi-transparent dark pill background (`rgba(0,0,0,0.6)`, rounded 8 px, padding 8 px 16 px). Max 2 lines, max 42 characters per line. Timing synced to audio/narration.

---

## Engine-Specific Instructions

### HyperFrames (HeyGen)

1. Read the full engine guide: [`references/engine-hyperframes.md`](references/engine-hyperframes.md)
2. Use scene templates from: `templates/hyperframes/`
3. Each scene is a standalone `.html` file with inline CSS and vanilla JS animations.
4. Use CSS `@keyframes` for motion; avoid heavy JS animation libraries.
5. Ensure all fonts are loaded via Google Fonts `<link>` tags or embedded `@font-face`.
6. Test at 1920×1080 viewport before submitting to HeyGen.

### Remotion

1. Read the full engine guide: [`references/engine-remotion.md`](references/engine-remotion.md)
2. Use composition templates from: `templates/remotion/`
3. Build reusable React components for each scene pattern.
4. Use Remotion's `useCurrentFrame()` and `interpolate()` for all animations.
5. Define compositions in `Root.tsx` with explicit `durationInFrames` and `fps: 30`.
6. All color tokens should be imported from a shared `theme.ts` constants file.

### NotebookLM

1. Read the full engine guide: [`references-notebooklm/engine-notebooklm.md`](references-notebooklm/engine-notebooklm.md)
2. This module is **self-contained and isolated**. It can be removed by deleting the `references-notebooklm/` directory without affecting any other part of the skill.
3. NotebookLM does not guarantee frame-level fidelity to the brand palette.
4. Use the custom instructions template in the engine guide to steer visual output toward the GOLGOTHA ACADEMY style as closely as possible.

---

## GOLGOTHA ACADEMY Branding Rules

| Rule | Detail |
|---|---|
| **Placement** | GOLGOTHA ACADEMY branding **MUST** appear in the **Intro / Brand Open** scene (Scene 1) and the **Closing / Brand Outro** scene (Scene 10). |
| **Logo SVG** | The official logo is at `assets/logo-golgotha-academy.svg`. It is a single-color SVG designed for dynamic coloring: use `fill="#059669"` on light backgrounds, `fill="#ffffff"` on dark overlays. Animate via CSS/JS `transform` (scale, opacity). |
| **Logo / Wordmark** | Centered or left-aligned. Always prefer the SVG logo from `assets/`. Accompany it with the wordmark "GOLGOTHA ACADEMY" in Montserrat ExtraBold. |
| **Brand Color** | The primary brand color is `accent-green` (`#059669`). Use it for the logo fill, intro/outro bars, and brand-associated UI elements. |
| **Brand Typography** | The brand name is always rendered in **Montserrat ExtraBold**. Never use a different font for the brand name. |
| **Minimum Clear Space** | The logo/wordmark must have at least 48 px of padding on all sides. Do not crowd it with other elements. |
| **Do NOT** | Use the brand name in decorative gradients, apply drop shadows to the wordmark, or distort the logo in any way. |

---

## Video Format Defaults

| Property | Standard (16:9) | Shorts / Vertical (9:16) |
|---|---|---|
| Resolution | 1920 × 1080 px | 1080 × 1920 px |
| FPS | 30 | 30 |
| Codec | H.264 (MP4) | H.264 (MP4) |
| Audio | AAC, 44.1 kHz, stereo | AAC, 44.1 kHz, mono |
| Bitrate | 8–12 Mbps (video) | 6–8 Mbps (video) |
| Duration | Variable per scene type (see patterns above) | Max 60 s total |

---

## Motion Graphics (Remotion)

When using Remotion, the skill includes an advanced motion graphics layer. Read [`references/motion-graphics.md`](references/motion-graphics.md) for full documentation.

### Ecosystem Packages

| Package | Purpose |
|---|---|
| `@remotion/transitions` | Scene transitions: `TransitionSeries`, `fade()`, `slide()`, `wipe()` |
| `@remotion/shapes` | Animated SVG shapes: `Circle`, `Rect`, `Star`, `Triangle`, `Polygon`, `Arrow`, `Heart` |
| `@remotion/paths` | SVG path manipulation and shape morphing |
| `@remotion/lottie` | After Effects animations via Lottie JSON files |

### Custom Motion Graphics Components

The file `templates/remotion/MotionGraphics.tsx` provides **10 production-ready components**:

| Component | Description |
|---|---|
| `KineticText` | Word/character/line staggered text animation (6 entrance modes) |
| `AnimatedShape` | Color-agnostic geometric shapes with draw-on, scale, rotation |
| `StatCounter` | Animated number count-up with formatting |
| `ProgressBar` | Horizontal animated progress bar |
| `AnimatedBarChart` | Data-driven bar chart with staggered reveals |
| `ParticleBurst` | Celebratory particle explosion |
| `LineDraw` | SVG path draw-on animation |
| `TextHighlight` | Sequential word highlighting |
| `BrandLogo` | Animated Golgotha Academy logo (SVG + wordmark) |
| `CardFlip` | 3D card flip reveal |

### Pre-configured Transitions

The file `templates/remotion/TransitionEffects.ts` provides scene-to-scene transition presets:

```tsx
import { SCENE_TRANSITIONS } from './TransitionEffects';
// SCENE_TRANSITIONS.introToContent → crossfade
// SCENE_TRANSITIONS.contentToQuiz  → slide up
// SCENE_TRANSITIONS.sectionTransition → wipe right
```

### Community Resources

| Resource | What It Provides |
|---|---|
| [reactvideoeditor/remotion-templates](https://github.com/reactvideoeditor/remotion-templates) | 81 native effects (charts, text, backgrounds, transitions) |
| [av/remotion-bits](https://github.com/av/remotion-bits) | Composable animation bits + MCP server for AI agents |
| [lifeprompt-team/remotion-scenes](https://github.com/lifeprompt-team/remotion-scenes) | 201+ AE-inspired scenes (kinetic typography, shape morphing) |

---

## Quick-Start Checklist

Before generating any video content, verify:

- [ ] Read `references/visual-guidelines.md` for spacing, grids, and accessibility rules.
- [ ] Read the appropriate engine reference document.
- [ ] Read `references/motion-graphics.md` if using Remotion for motion graphics.
- [ ] Confirm the target format (16:9 or 9:16).
- [ ] Include Golgotha Academy branding (SVG logo + wordmark) in Intro and Closing scenes.
- [ ] Use ONLY colors from the Hard Color Rules table.
- [ ] Use ONLY fonts from the Typography table.
- [ ] Consider motion graphics components for data visualizations and kinetic typography.
- [ ] Use `TransitionSeries` with preset transitions between scenes.
- [ ] Structure content as an educational lesson (intro → teach → practice → summarize → close).
