# Visual Guidelines — Video Design System

> **Brand**: GOLGOTHA ACADEMY · **Domain**: Educational video (tutor-style classes)
> **Engines**: HyperFrames (HeyGen), Remotion, NotebookLM
> **Last updated**: 2026-06-12

---

## 1. Color Palette (Expanded)

Every color used across scenes, overlays, and UI elements is defined here.
**No other hues are permitted** unless explicitly added by the user.
No dark backgrounds. No neon. No decorative gradients.

### 1.1 Token Reference Table

| Token | Hex | RGB | Use |
|---|---|---|---|
| `bg-scene` | `#f8fafc` | 248, 250, 252 | Scene / slide background — always light |
| `fg-title-main` | `#000000` | 0, 0, 0 | Main cover / intro titles only |
| `fg-title` | `#111111` | 17, 17, 17 | Section headings, card titles |
| `fg-body` | `#4b5563` | 75, 85, 99 | Body text, descriptions, paragraphs |
| `accent-green` | `#059669` | 5, 150, 105 | Primary brand, progress bars, ✓ marks |
| `accent-green-soft` | `#CFF8E2` | 207, 248, 226 | Subtitle pill bg, soft highlight strips |
| `accent-blue` | `#2563eb` | 37, 99, 235 | Interactive elements, links, highlights |
| `accent-blue-soft` | `#dbeafe` | 219, 234, 254 | Blue info-block background |
| `accent-violet` | `#7c3aed` | 124, 58, 237 | Advanced topics, special sections |
| `accent-violet-soft` | `#ede9fe` | 237, 233, 254 | Violet info-block background |
| `accent-amber` | `#d97706` | 217, 119, 6 | Important notes, warnings, attention |
| `accent-amber-soft` | `#fef3c7` | 254, 243, 199 | Amber info-block background |
| `bg-positive` | `#ecfdf5` | 236, 253, 245 | Correct / positive result blocks |
| `bg-card` | `#ffffff` | 255, 255, 255 | Card / text-box fill |
| `border-card` | `#e5e7eb` | 229, 231, 235 | Card outline stroke (1-2 px) |
| `fg-error` | `#ff4444` | 255, 68, 68 | Error text, ✗ incorrect marks |
| `bg-error` | `#fef2f2` | 254, 242, 242 | Error block background |
| `bg-neutral` | `#f3f4f6` | 243, 244, 246 | Code blocks, table stripe rows |

### 1.2 CSS Custom Properties

```css
:root {
  /* ── Backgrounds ── */
  --bg-scene:            #f8fafc;
  --bg-card:             #ffffff;
  --bg-positive:         #ecfdf5;
  --bg-error:            #fef2f2;
  --bg-neutral:          #f3f4f6;

  /* ── Foreground / text ── */
  --fg-title-main:       #000000;
  --fg-title:            #111111;
  --fg-body:             #4b5563;
  --fg-error:            #ff4444;

  /* ── Accent: Green (primary brand) ── */
  --accent-green:        #059669;
  --accent-green-soft:   #CFF8E2;

  /* ── Accent: Blue (academic) ── */
  --accent-blue:         #2563eb;
  --accent-blue-soft:    #dbeafe;

  /* ── Accent: Violet ── */
  --accent-violet:       #7c3aed;
  --accent-violet-soft:  #ede9fe;

  /* ── Accent: Amber ── */
  --accent-amber:        #d97706;
  --accent-amber-soft:   #fef3c7;

  /* ── Borders ── */
  --border-card:         #e5e7eb;
}
```

### 1.3 TypeScript Constants

```typescript
export const COLORS = {
  // Backgrounds
  bgScene:          '#f8fafc',
  bgCard:           '#ffffff',
  bgPositive:       '#ecfdf5',
  bgError:          '#fef2f2',
  bgNeutral:        '#f3f4f6',

  // Foreground / text
  fgTitleMain:      '#000000',
  fgTitle:          '#111111',
  fgBody:           '#4b5563',
  fgError:          '#ff4444',

  // Accent: Green (primary brand)
  accentGreen:      '#059669',
  accentGreenSoft:  '#CFF8E2',

  // Accent: Blue (academic)
  accentBlue:       '#2563eb',
  accentBlueSoft:   '#dbeafe',

  // Accent: Violet
  accentViolet:     '#7c3aed',
  accentVioletSoft: '#ede9fe',

  // Accent: Amber
  accentAmber:      '#d97706',
  accentAmberSoft:  '#fef3c7',

  // Borders
  borderCard:       '#e5e7eb',
} as const;

export type ColorToken = keyof typeof COLORS;
```

### 1.4 Palette Rules

1. **Scene backgrounds** — always `bg-scene` (`#f8fafc`). Never dark.
2. **Cards** — always `bg-card` (`#ffffff`) with `border-card` stroke.
3. **Accent soft variants** — only for block backgrounds behind text; never as text color.
4. **Data visualization series order** — green → blue → violet → amber.
5. **No additional hues** unless the user explicitly defines them in the prompt.
6. **No gradients** — flat color only. Exception: subtle opacity fade on overlays.

---

## 2. Typography

### 2.1 Font Stacks

| Role | Font Family | Fallback Stack |
|---|---|---|
| Titles (intro) | Montserrat ExtraBold | Aptos, Segoe UI, Arial, sans-serif |
| Headings & body | Inter | Aptos, Segoe UI, Arial, sans-serif |
| Code | JetBrains Mono | Consolas, 'Courier New', monospace |

### 2.2 Type Scale

| Role | Font | Weight | Size (px) | Line Height | Color Token |
|---|---|---|---|---|---|
| Video title (intro) | Montserrat | ExtraBold 800 | 56 – 72 | 1.1× | `fg-title-main` |
| Section title | Inter | Bold 700 | 36 – 48 | 1.2× | `fg-title` |
| Card / topic title | Inter | SemiBold 600 | 24 – 32 | 1.3× | `fg-title` |
| Body text | Inter | Regular 400 | 18 – 24 | 1.5× | `fg-body` |
| Caption / subtitle | Inter | Regular 400 | 16 – 20 | 1.4× | `#ffffff` on dark bg |
| Code | JetBrains Mono | Regular 400 | 16 – 20 | 1.6× | syntax colors |
| Lower-third name | Inter | Bold 700 | 20 – 24 | 1.3× | `fg-title` |
| Lower-third role | Inter | Regular 400 | 14 – 16 | 1.4× | `fg-body` |

### 2.3 Typography Rules

1. **Titles** — always `#000000` or `#111111`. Never gray.
2. **Body** — always `#4b5563`. Never pure black.
3. **Subtitles** — always rendered over a semi-transparent dark background strip for readability.
4. **Line height** — minimum `1.4×` for all text. Titles may use `1.1×` – `1.2×`.
5. **Alignment** — always left-align body text. Centered alignment is permitted only for titles in intro/outro/transition scenes.
6. **No justified text** — never use `text-align: justify`.
7. **ALL CAPS** — permitted only for labels of ≤ 3 words (e.g., "KEY POINT", "STEP 1"). Never for sentences or paragraphs.
8. **Letter spacing** — `0.02em` for ALL CAPS labels, `0` for everything else.
9. **Max line width** — body text should not exceed ~60 characters per line for readability.

---

## 3. Scene Anatomy (Educational Video)

Each scene type below has a fixed purpose, layout, duration, and animation style.
Agents must select the appropriate scene type for each content block.

---

### 3.1 Intro / Brand Open

> Purpose: Establish the brand and introduce the lesson topic.

| Property | Value |
|---|---|
| Duration | 3 – 5 seconds |
| Background | `bg-scene` (`#f8fafc`) |
| Decorative elements | Subtle geometric shapes (circles, rounded rectangles) in `accent-green-soft` (`#CFF8E2`), positioned at edges with low opacity (20-40%) |

**Layout:**

```
┌──────────────────────────────────────────────┐
│                                              │
│          ○  ○  (decorative shapes)           │
│                                              │
│             G O L G O T H A                  │
│          Montserrat ExtraBold 64px           │
│             #059669 (green)                  │
│                                              │
│         "Curso de Biología — Módulo 3"       │
│           Inter Regular 24px #4b5563         │
│                                              │
│          ○           ○  (shapes)             │
└──────────────────────────────────────────────┘
```

**Animation sequence:**

1. Background fades in (200 ms).
2. Decorative shapes fade in and drift slightly inward (400 ms, ease-out).
3. GOLGOTHA ACADEMY wordmark scales from `0.8` → `1.0` with `ease-out` (500 ms).
4. Course/module title fades in + slides up 20 px (400 ms, 200 ms delay after logo).
5. Hold for 2 – 3 s.

**Sound:** Optional subtle intro chime (≤ 1 s). No loud jingles.

---

### 3.2 Topic Presentation

> Purpose: Announce a new topic or concept before diving into details.

| Property | Value |
|---|---|
| Duration | 5 – 8 seconds |
| Background | `bg-scene` |
| Layout | Single-column, left-aligned, generous whitespace |

**Layout:**

```
┌──────────────────────────────────────────────┐
│                                              │
│  ┌──────────┐                                │
│  │  Tema 3  │  ← green pill (#059669 bg,     │
│  └──────────┘    white text, Inter Bold 16px) │
│                                              │
│  La Célula Eucariota                         │
│  Inter Bold 700, 40px, #111111               │
│                                              │
│  Estructura, funciones y organelos           │
│  Inter Regular 400, 22px, #4b5563            │
│                                              │
│                                              │
└──────────────────────────────────────────────┘
```

**Animation sequence:**

1. Green pill slides in from left (300 ms, ease-out).
2. Title fades in + slides up 16 px (400 ms, 150 ms stagger).
3. Subtitle fades in (300 ms, 150 ms stagger after title).
4. Hold for 4 – 6 s.

**Rules:**
- No cards or boxes. Clean open space.
- Topic number pill is optional. If used, always `accent-green` background with white text.
- Title must be ≤ 8 words.

---

### 3.3 Tutor Content / Explanation

> Purpose: Core teaching scene. Explains a concept with text + visuals.

| Property | Value |
|---|---|
| Duration | 10 – 20 seconds per concept |
| Background | `bg-scene` |
| Layout | Split — 55% content (left), 45% visual (right) |

**Layout:**

```
┌───────────────────────┬──────────────────────┐
│                       │                      │
│  Section Title        │                      │
│  Inter Bold 28px      │   ┌──────────────┐   │
│  #111111              │   │              │   │
│                       │   │  Illustration │   │
│  ┌─────────────────┐  │   │  or Diagram   │   │
│  │ • Bullet point 1│  │   │              │   │
│  │ • Bullet point 2│  │   │  (image/svg)  │   │
│  │ • Bullet point 3│  │   │              │   │
│  └─────────────────┘  │   └──────────────┘   │
│   bg-card, border-card│                      │
│   radius: 16px        │                      │
│                       │                      │
└───────────────────────┴──────────────────────┘
```

**Animation sequence:**

1. Section title fades in (300 ms).
2. Visual (right side) fades in + scales from 0.95 → 1.0 (400 ms, ease-out).
3. Card appears (300 ms, slight slide up).
4. Bullet points reveal one by one (300 ms each, 150 ms stagger).

**Card specs:**
- Background: `bg-card` (`#ffffff`)
- Border: `border-card` (`#e5e7eb`), 1 px solid
- Border radius: 16 px
- Padding: 24 px
- Shadow: none (flat design)

**Rules:**
- Maximum 4 – 5 bullet points per card.
- Each bullet ≤ 15 words.
- Visual area can be: illustration, diagram, photo, icon composition, or annotated screenshot.
- If no visual is available, use full-width single-column layout instead.

---

### 3.4 Step-by-Step Walkthrough

> Purpose: Guide the learner through a sequential process.

| Property | Value |
|---|---|
| Duration | 15 – 30 seconds total |
| Background | `bg-scene` |
| Layout | Vertical list with numbered steps |

**Layout:**

```
┌──────────────────────────────────────────────┐
│  ═══════════════════════ (progress bar)      │
│  accent-green, 4px height                    │
│                                              │
│  ● 1  Abrir el editor de código              │
│       Inter Regular 20px, #4b5563            │
│                                              │
│  ● 2  Crear un nuevo archivo .py    ← active │
│       Inter SemiBold 22px, #111111           │
│       ┌──────────────────────────┐           │
│       │  Detail card for step 2  │           │
│       └──────────────────────────┘           │
│                                              │
│  ○ 3  Escribir la función main     ← future  │
│       Inter Regular 20px, #9ca3af (dimmed)   │
│                                              │
│  ○ 4  Ejecutar el script            ← future │
│       Inter Regular 20px, #9ca3af            │
└──────────────────────────────────────────────┘
```

**Step indicator:**
- Completed: filled green circle `●` with white checkmark
- Active: filled green circle `●`, bold text
- Future: outlined gray circle `○`, dimmed text `#9ca3af`

**Animation sequence:**

1. All steps visible but dimmed at start.
2. Progress bar grows from left as steps are revealed.
3. Active step highlights (text becomes bold + dark, circle fills green) — 300 ms.
4. Optional detail card slides in below active step — 400 ms.
5. When advancing, previous step gets checkmark, next step activates — 300 ms transition.

**Rules:**
- Maximum 6 steps per walkthrough.
- Each step text ≤ 10 words.
- Progress bar at top fills proportionally: step 1/4 = 25%, step 2/4 = 50%, etc.

---

### 3.5 Code Example

> Purpose: Display and explain code with syntax highlighting.

| Property | Value |
|---|---|
| Duration | 10 – 20 seconds |
| Background | `bg-scene` |
| Code block bg | `bg-neutral` (`#f3f4f6`) |

**Layout:**

```
┌──────────────────────────────────────────────┐
│                                              │
│  Ejemplo: Función factorial                  │
│  Inter SemiBold 26px, #111111                │
│                                              │
│  ┌──────────────────────────────────────┐    │
│  │  def factorial(n):          ← line 1 │    │
│  │      if n <= 1:             ← line 2 │    │
│  │          return 1           ← line 3 │    │
│  │      return n * factorial(  ← line 4 │    │
│  │          n - 1              ← line 5 │    │
│  │      )                     ← line 6 │    │
│  └──────────────────────────────────────┘    │
│   bg: #f3f4f6, radius: 12px, padding: 20px   │
│   font: JetBrains Mono 18px                  │
│                                              │
│   ┌─ annotation bubble ──────────────┐       │
│   │ "Caso base: detiene la recursión"│       │
│   └──────────────────────────────────┘       │
│    accent-blue bg, white text, 14px          │
└──────────────────────────────────────────────┘
```

**Syntax color mapping:**

| Element | Color |
|---|---|
| Keywords (`def`, `return`, `if`) | `accent-blue` (`#2563eb`) |
| Strings | `accent-green` (`#059669`) |
| Numbers | `accent-violet` (`#7c3aed`) |
| Comments | `#9ca3af` (gray) |
| Function names | `accent-amber` (`#d97706`) |
| Default text | `fg-title` (`#111111`) |

**Animation options:**

- **Line-by-line reveal:** lines appear sequentially (200 ms each, 100 ms stagger).
- **Highlight animation:** all code visible, active line(s) get a semi-transparent accent-blue-soft background band that slides vertically.
- **Annotation bubbles:** small rounded rectangles with arrows pointing to specific lines. Appear with fade + slide (300 ms).

**Rules:**
- Maximum 15 lines of code per block.
- Always include a title above the code block.
- Use real, working code — never pseudo-code without labeling it as such.
- File name/language label in top-right corner of code block: `main.py`, `index.ts`, etc.

---

### 3.6 Quiz / Exercise

> Purpose: Test comprehension with an interactive multiple-choice question.

| Property | Value |
|---|---|
| Duration | 8 – 15 seconds |
| Background | `bg-scene` |
| Layout | Question top, options grid below |

**Layout:**

```
┌──────────────────────────────────────────────┐
│                                              │
│  ¿Cuál es la función de la mitocondria?      │
│  Inter SemiBold 28px, #111111                │
│                                              │
│  ┌──────────────┐  ┌──────────────┐          │
│  │ A) Fotosínt. │  │ B) Respirac. │          │
│  │   #ffffff bg  │  │   #ffffff bg │          │
│  └──────────────┘  └──────────────┘          │
│                                              │
│  ┌──────────────┐  ┌──────────────┐          │
│  │ C) Producc.  │  │ D) Almacen.  │          │
│  │   de energía │  │   de ADN     │          │
│  │ ✓ CORRECT    │  │              │          │
│  │ green border │  │              │          │
│  └──────────────┘  └──────────────┘          │
│                                              │
│  ┌──────────────────────────────────────┐    │
│  │ Explanation: La mitocondria es el... │    │
│  │ bg-positive, Inter Regular 18px      │    │
│  └──────────────────────────────────────┘    │
└──────────────────────────────────────────────┘
```

**Option card specs:**
- Default: `bg-card`, `border-card`, 12 px radius
- Correct (after reveal): `border: 2px solid #059669`, bg shifts to `bg-positive`, ✓ icon in `accent-green`
- Incorrect (after reveal): `border: 2px solid #ff4444`, bg shifts to `bg-error`, ✗ icon in `fg-error`

**Animation sequence:**

1. Question fades in (300 ms).
2. Options appear with stagger (200 ms each, slide up).
3. Pause 3 – 5 s (thinking time).
4. Correct option highlights green (400 ms). Incorrect options dim or get red border.
5. Explanation card slides up from bottom (400 ms, ease-out).
6. Hold explanation for 3 – 5 s.

**Rules:**
- Always 3 or 4 options.
- One correct answer only.
- Explanation is mandatory — always explain why the answer is correct.

---

### 3.7 Diagram / Data Visualization

> Purpose: Present data, relationships, or processes visually.

| Property | Value |
|---|---|
| Duration | 8 – 15 seconds |
| Background | `bg-scene` |
| Chart container | `bg-card` with `border-card`, 16 px radius |

**Data series color order:**

| Series | Color Token | Hex |
|---|---|---|
| Series 1 | `accent-green` | `#059669` |
| Series 2 | `accent-blue` | `#2563eb` |
| Series 3 | `accent-violet` | `#7c3aed` |
| Series 4 | `accent-amber` | `#d97706` |

**Supported chart types:**

- **Bar chart** — bars grow upward from baseline (500 ms, ease-out, 100 ms stagger per bar).
- **Line chart** — line draws from left to right (800 ms, ease-in-out). Dots appear at data points after line completes.
- **Pie / donut chart** — segments fill clockwise (600 ms total, ease-out).
- **Flow diagram** — nodes appear, then connections draw between them (arrows animate 300 ms each).
- **Timeline** — horizontal line draws, then events pop up sequentially.

**Rules:**
- Chart title above in Inter Bold, 24 – 28 px, `fg-title`.
- Axis labels in Inter Regular 14 – 16 px, `fg-body`.
- Data labels in Inter SemiBold 14 – 16 px, matching series color.
- Always include a legend if ≥ 2 series.
- Maximum 6 data points for bar charts, 8 for line charts.

---

### 3.8 Summary / Key Points

> Purpose: Reinforce learning by listing takeaways.

| Property | Value |
|---|---|
| Duration | 8 – 12 seconds |
| Background | `bg-scene` |
| Layout | Single column, numbered list with checkmark icons |

**Layout:**

```
┌──────────────────────────────────────────────┐
│                                              │
│  ┌─────────────────────┐                     │
│  │ 📌 Puntos Clave     │  ← green pill       │
│  └─────────────────────┘    accent-green bg   │
│                              white text       │
│  ✅ 1. La célula es la unidad básica de vida │
│                                              │
│  ✅ 2. Existen células procariotas y         │
│        eucariotas                             │
│                                              │
│  ✅ 3. Los organelos tienen funciones        │
│        especializadas                         │
│                                              │
│  ✅ 4. La membrana celular regula el paso    │
│        de sustancias                          │
│                                              │
└──────────────────────────────────────────────┘
```

**Checkmark icon:** green circle with white ✓, 24 × 24 px.

**Animation sequence:**

1. Header pill slides in from left (300 ms).
2. Each point fades in + slides up 12 px (300 ms per item, 200 ms stagger).
3. Checkmark icon pops in with slight scale (1.2 → 1.0, 200 ms).
4. Hold complete list for 3 – 5 s.

**Rules:**
- 3 – 6 key points maximum.
- Each point ≤ 12 words.
- Header text options: "Puntos Clave", "Recuerda", "Resumen", "Key Takeaways".

---

### 3.9 Section Transition

> Purpose: Clean visual break between major sections.

| Property | Value |
|---|---|
| Duration | 2 – 3 seconds |
| Background | `bg-scene` |
| Layout | Centered, minimal |

**Animation sequence:**

1. Previous scene fades out (300 ms).
2. Thin horizontal line (2 px, `accent-green`) animates from left edge to right edge (500 ms, ease-in-out).
3. Next section title fades in centered (400 ms, ease-out).
4. Hold 1 – 1.5 s.
5. Transition to next scene.

**Rules:**
- No decorative elements. Pure, clean break.
- Section title in Inter Bold 36 px, `fg-title`.
- Optional section number in `accent-green`.

---

### 3.10 Closing / Brand Outro

> Purpose: End the video with brand reinforcement and optional CTA.

| Property | Value |
|---|---|
| Duration | 3 – 5 seconds |
| Background | `bg-scene` |
| Layout | Centered, mirrors intro |

**Layout:**

```
┌──────────────────────────────────────────────┐
│                                              │
│          ○  ○  (decorative shapes)           │
│                                              │
│             G O L G O T H A                  │
│             #059669, 56px                    │
│                                              │
│        "¡Gracias por tu atención!"           │
│         Inter Regular 22px, #4b5563          │
│                                              │
│     [🌐 web]  [📱 social]  [📧 email]       │
│      Inter Regular 14px, accent-blue         │
│                                              │
└──────────────────────────────────────────────┘
```

**Animation sequence (reverse of intro):**

1. Social links row fades in (300 ms).
2. CTA text fades in (300 ms, 100 ms delay).
3. GOLGOTHA ACADEMY wordmark fades in + scales from 0.8 → 1.0 (500 ms, ease-out).
4. Decorative shapes drift in (400 ms).
5. Hold 2 – 3 s.
6. Entire scene fades to `bg-scene` (500 ms).

**CTA text options:**
- "¡Gracias por tu atención!"
- "Thanks for watching!"
- "¿Preguntas? Déjalas en los comentarios"
- Custom text provided by user

---

### 3.11 Lower Third (Overlay)

> Purpose: Identify the speaker or tutor without interrupting content.

| Property | Value |
|---|---|
| Type | **Overlay** — not a full scene |
| Duration | Holds 4 – 6 seconds |
| Position | Bottom-left, 48 px from left edge, 64 px from bottom |

**Layout:**

```
┌───────────────────────────────────────────────────┐
│                                                   │
│                                                   │
│                                                   │
│  ┌─────────────────────────────┐                  │
│  │▌ Prof. María García         │  ← name          │
│  │▌ Biología Molecular         │  ← role          │
│  └─────────────────────────────┘                  │
│   ▌= 3px left border in accent-green              │
│   bg: rgba(255,255,255,0.92), radius: 12px        │
│   padding: 12px 20px                              │
└───────────────────────────────────────────────────┘
```

**Specs:**
- Background: `rgba(255, 255, 255, 0.92)` (semi-transparent white)
- Left border: 3 px solid `accent-green`
- Border radius: 12 px
- Name: Inter Bold 22 px, `fg-title`
- Role: Inter Regular 15 px, `fg-body`

**Animation:**
- Slides in from left (-100 px → 0) over 400 ms, ease-out.
- Holds 4 – 6 s.
- Slides out to left (0 → -100 px) over 300 ms, ease-in.

---

### 3.12 Subtitle Overlay

> Purpose: Display spoken text for accessibility and comprehension.

| Property | Value |
|---|---|
| Type | **Overlay** — not a full scene |
| Position | Bottom-center, 48 px from bottom edge |

**Specs:**
- Background strip: `rgba(17, 17, 17, 0.80)` — `#111111` at 80% opacity
- Text: `#ffffff`, Inter Regular 20 px
- Padding: 8 px 24 px
- Border radius: 8 px
- Max width: 80% of frame width
- Max lines: 2
- Max characters per line: 42

**Rules:**
- Always centered horizontally.
- Text centered within the strip.
- New subtitle block replaces previous (cross-fade 150 ms).
- Never overlap with lower-third — if both are active, subtitle moves up above lower-third.
- Ensure minimum contrast: white on dark bg exceeds 7:1 ratio.

---

## 4. Timing & Rhythm

### 4.1 Duration Reference Table

| Scene Type | Min Duration | Max Duration | Typical |
|---|---|---|---|
| Intro / Brand Open | 3 s | 5 s | 4 s |
| Topic Presentation | 5 s | 8 s | 6 s |
| Tutor Content / Explanation | 10 s | 20 s | 15 s |
| Step-by-Step Walkthrough | 15 s | 30 s | 20 s |
| Code Example | 10 s | 20 s | 15 s |
| Quiz / Exercise | 8 s | 15 s | 12 s |
| Diagram / Data Visualization | 8 s | 15 s | 10 s |
| Summary / Key Points | 8 s | 12 s | 10 s |
| Section Transition | 2 s | 3 s | 2.5 s |
| Closing / Brand Outro | 3 s | 5 s | 4 s |
| Lower Third (overlay) | 4 s | 6 s | 5 s |

### 4.2 General Timing Rules

1. **Total video length:**
   - Full lesson: 3 – 10 minutes.
   - Single concept explainer: 30 – 90 seconds.
   - Micro-lesson / short: 15 – 60 seconds.

2. **Breathing room:** 0.5 s pause (empty or held frame) between scene transitions. Never cut directly from content to content.

3. **Text on screen:**
   - Short text (≤ 10 words): minimum 3 seconds.
   - Medium text (paragraph): 5 – 8 seconds.
   - Dense text (code, lists): 8 – 15 seconds.

4. **Reading speed:** narrated content targets ~150 words per minute (WPM). Slower (120 WPM) for complex or technical material.

5. **Quiz thinking time:** 3 – 5 seconds of pause before revealing the answer.

---

## 5. Motion Design

### 5.1 Easing Functions

| Action | Easing | CSS | GSAP |
|---|---|---|---|
| Element enters | ease-out | `cubic-bezier(0, 0, 0.2, 1)` | `power2.out` |
| Element exits | ease-in | `cubic-bezier(0.4, 0, 1, 1)` | `power2.in` |
| Element moves | ease-in-out | `cubic-bezier(0.4, 0, 0.2, 1)` | `power2.inOut` |

### 5.2 Duration Ranges

| Element Size | Duration |
|---|---|
| Small (icon, label, bullet) | 200 – 400 ms |
| Medium (card, text block) | 300 – 500 ms |
| Large (full scene transition) | 500 – 800 ms |
| Overlay (lower third, subtitle) | 300 – 400 ms |

### 5.3 Stagger

When multiple items appear sequentially (bullets, list items, quiz options):
- Stagger delay: **100 – 200 ms** between items.
- All items should use the same duration and easing.

### 5.4 Animation Dos & Don'ts

| ✅ Use | ❌ Avoid |
|---|---|
| Fade in + slight translate (10-20 px) | 3D rotations or flips |
| Scale from 0.9-0.95 → 1.0 | Scale from 0 (too dramatic) |
| Opacity transitions | Flash / blink effects |
| Smooth line draws for charts | Particle effects or confetti (unless celebration quiz) |
| Consistent stagger patterns | Random timing |
| Subtle parallax (< 20 px offset) | Heavy parallax movement |
| Ease-out for entrances | Linear easing (feels mechanical) |
| Bounce only for gamified quiz feedback | Bounce on regular UI elements |

---

## 6. Format & Resolution

### 6.1 Output Formats

| Format | Resolution | Aspect Ratio | Use Case |
|---|---|---|---|
| Standard (landscape) | 1920 × 1080 | 16:9 | Full lessons, tutorials, YouTube, LMS |
| Vertical | 1080 × 1920 | 9:16 | Shorts, TikTok, Instagram Reels |
| Square | 1080 × 1080 | 1:1 | Social media posts, LinkedIn, Instagram feed |

### 6.2 Technical Specs

| Property | Default | Notes |
|---|---|---|
| Frame rate | 30 FPS | Use 60 FPS for smooth animation-heavy content |
| Codec | H.264 | MP4 container, maximum compatibility |
| Bitrate | 8 – 12 Mbps | Higher for 60 FPS or heavy motion |
| Audio codec | AAC | 128 – 192 kbps, stereo |
| Color space | sRGB | Standard for web delivery |

### 6.3 Safe Margins

- **Title safe area:** 10% inset from all edges (192 × 108 px on 1080p).
- **Action safe area:** 5% inset from all edges (96 × 54 px on 1080p).
- All text and critical content must be within the title safe area.
- Decorative elements may extend to the action safe area.

---

## 7. Audio Guidelines

### 7.1 Narration

- Clear, professional, consistent volume.
- Target loudness: **-16 LUFS** (integrated) for YouTube.
- Peaks should not exceed **-1 dBTP**.
- Consistent tone — conversational but authoritative for educational content.
- Pacing: ~150 WPM, slower for complex topics.

### 7.2 Background Music

- Style: subtle lo-fi, ambient, or light acoustic.
- Volume: **10 – 15%** relative to narration (approximately -20 dB below voice).
- Fade in at video start (1 – 2 s), fade out before outro (1 – 2 s).
- Music should never compete with narration.
- Avoid music with lyrics.

### 7.3 Sound Effects

- **Minimal** — only for:
  - Scene transitions: optional soft whoosh or click (≤ 0.5 s).
  - Quiz correct answer: brief positive chime.
  - Quiz incorrect answer: brief soft error tone.
  - Intro/outro: optional brand chime (≤ 1 s).
- Volume: 20 – 30% relative to narration.

### 7.4 Silence

- Acceptable and encouraged for text-heavy scenes.
- Brief silence (0.5 – 1 s) between paragraphs aids comprehension.

---

## 8. GOLGOTHA ACADEMY Brand Rules

### 8.1 Wordmark

- Text: `GOLGOTHA ACADEMY` (all uppercase, with letter-spacing `0.12em`)
- Font: Montserrat ExtraBold 800
- Primary color: `accent-green` (`#059669`)
- Alternate: `fg-title-main` (`#000000`) — only when green doesn't contrast enough with background

### 8.2 Placement

| Context | Position | Size |
|---|---|---|
| Intro scene | Center of frame | 56 – 72 px |
| Outro scene | Center of frame | 56 – 72 px |
| Watermark (optional) | Bottom-right, within safe margins | 18 – 24 px, 30% opacity |

### 8.3 Clear Space

- Minimum 24 px of clear space around the wordmark on all sides.
- No other text, icons, or graphics may intrude into the clear space.

### 8.4 Prohibited Modifications

- ❌ Never distort, stretch, or compress the wordmark.
- ❌ Never rotate the wordmark.
- ❌ Never change the brand colors to non-palette values.
- ❌ Never add drop shadows, outlines, or effects to the wordmark.
- ❌ Never place the wordmark on a dark or busy background without sufficient contrast.

---

## 9. Accessibility

### 9.1 Contrast Requirements

| Text Type | Minimum Contrast Ratio (WCAG 2.1) |
|---|---|
| Body text (< 24 px) | 4.5 : 1 |
| Large text (≥ 24 px or ≥ 18.66 px bold) | 3 : 1 |
| UI components and icons | 3 : 1 |

**Verified palette contrasts on `bg-scene` (#f8fafc):**

| Token | Hex | Contrast vs #f8fafc | Pass? |
|---|---|---|---|
| `fg-title-main` | `#000000` | 19.4 : 1 | ✅ AAA |
| `fg-title` | `#111111` | 17.0 : 1 | ✅ AAA |
| `fg-body` | `#4b5563` | 6.5 : 1 | ✅ AA (body) |
| `accent-green` | `#059669` | 4.0 : 1 | ✅ AA (large) |
| `accent-blue` | `#2563eb` | 4.5 : 1 | ✅ AA |
| `accent-violet` | `#7c3aed` | 5.1 : 1 | ✅ AA |
| `accent-amber` | `#d97706` | 3.4 : 1 | ✅ AA (large) |
| `fg-error` | `#ff4444` | 3.8 : 1 | ✅ AA (large) |

### 9.2 General Accessibility Rules

1. **Always provide subtitle overlays** — assume not all viewers can hear audio.
2. **Never convey meaning through color alone** — pair color with icons, text labels, or patterns.
   - Correct answer: green border **+** ✓ icon **+** "Correcto" label.
   - Incorrect answer: red border **+** ✗ icon **+** "Incorrecto" label.
3. **Minimum text size:** 16 px at 1080p resolution (equivalent to ~12 pt on screen).
4. **Avoid flashing content** — no elements that flash more than 3 times per second.
5. **Sufficient duration** — all text stays on screen long enough to be read (see Section 4).
6. **Descriptive labels** — charts and diagrams should have text labels, not just colors.

---

## 10. Do / Don't Quick Reference

| ✅ Do | ❌ Don't |
|---|---|
| Use the fixed expanded palette (Section 1) | Add neon colors, dark backgrounds, or decorative gradients |
| Keep titles `#000000` or `#111111` | Use gray (`#4b5563` or lighter) for headings |
| Left-align body text | Justify paragraphs |
| Use generous whitespace and padding | Cram content or use tiny fonts |
| Animate with purpose and consistency | Add gratuitous, unrelated animations |
| Include GOLGOTHA ACADEMY branding at intro + outro | Skip or minimize branding |
| Use consistent timing per scene type | Rush scene transitions (< 0.5 s gap) |
| Provide subtitle overlays for all narration | Assume all viewers can hear audio |
| Present one concept per scene | Overload scenes with multiple topics |
| Follow the 12 documented scene patterns | Invent new scene types without documenting them first |
| Use Inter/Montserrat/JetBrains Mono fonts | Mix in random fonts |
| Test contrast ratios against WCAG 2.1 | Use light accent colors as text on light backgrounds |
| Keep bullet points ≤ 15 words | Write full paragraphs inside bullet lists |
| Use progressive reveal animations | Show all content at once (wall of text) |
| Maintain safe margins for text | Place text near frame edges |
| Use 30 FPS default (60 for smooth anims) | Use non-standard frame rates |
| Export as H.264 MP4 | Use uncommon codecs without checking compatibility |

---

## Appendix A: Scene Type Quick Selector

Use this table to decide which scene type to use for each content block:

| Content Need | Scene Type | Section |
|---|---|---|
| Start of video | 3.1 Intro / Brand Open | §3.1 |
| Introduce a new topic | 3.2 Topic Presentation | §3.2 |
| Explain a concept | 3.3 Tutor Content | §3.3 |
| Show a process | 3.4 Step-by-Step | §3.4 |
| Show code | 3.5 Code Example | §3.5 |
| Test knowledge | 3.6 Quiz / Exercise | §3.6 |
| Show data or relationships | 3.7 Diagram / Visualization | §3.7 |
| Review what was learned | 3.8 Summary / Key Points | §3.8 |
| Break between sections | 3.9 Section Transition | §3.9 |
| End of video | 3.10 Closing / Brand Outro | §3.10 |
| Identify the speaker | 3.11 Lower Third | §3.11 |
| Show spoken text | 3.12 Subtitle Overlay | §3.12 |

---

## Appendix B: Remotion / HyperFrames Mapping

When generating code for the supported engines, map scene types to components:

| Scene Type | Remotion Component | HyperFrames Template |
|---|---|---|
| Intro | `<IntroScene />` | `intro.html` |
| Topic | `<TopicScene />` | `topic.html` |
| Explanation | `<ExplanationScene />` | `explanation.html` |
| Steps | `<StepsScene />` | `steps.html` |
| Code | `<CodeScene />` | `code.html` |
| Quiz | `<QuizScene />` | `quiz.html` |
| Diagram | `<DiagramScene />` | `diagram.html` |
| Summary | `<SummaryScene />` | `summary.html` |
| Transition | `<TransitionScene />` | `transition.html` |
| Outro | `<OutroScene />` | `outro.html` |
| Lower Third | `<LowerThird />` (overlay) | CSS overlay |
| Subtitle | `<SubtitleOverlay />` (overlay) | CSS overlay |

Each component/template must import colors and typography from the shared design tokens (Section 1.2 / 1.3).

---

*This document is the single source of truth for all visual decisions in GOLGOTHA ACADEMY educational videos. Any deviation must be documented and approved by the content creator.*
