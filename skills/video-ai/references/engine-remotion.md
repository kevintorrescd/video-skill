# Remotion Engine Guide

## Overview

**Remotion** creates videos programmatically using **React**. Each scene is a React component; the entire video is a component tree rendered frame-by-frame into an MP4. Because it's React, you get full TypeScript support, component reuse, props-driven content, and the entire npm ecosystem.

Key characteristics:

| Feature | Detail |
|---|---|
| Input format | React / TSX components |
| Output format | MP4 (H.264), WebM, GIF |
| Resolution | 1920 × 1080 (default) |
| Frame rate | 30 fps (configurable) |
| Animation | `interpolate()`, `spring()`, CSS |
| Rendering | Headless Chromium, frame-by-frame capture |
| Language | TypeScript (recommended) or JavaScript |
| License | Remotion License (free for individuals / companies <$1M revenue) |

> [!TIP]
> Remotion is the best engine when you need **dynamic, data-driven** videos — e.g., generating 50 personalized lesson videos from a JSON dataset.

---

## Project Setup

```bash
# Create a new Remotion project
npx create-video@latest my-video

# Navigate and start the dev server
cd my-video
npm start        # Opens the Remotion Studio (preview player)
```

The Remotion Studio provides a frame-by-frame preview player with a timeline scrubber — invaluable for debugging animations.

---

## Project Structure

```
my-video/
├── src/
│   ├── Root.tsx              # Composition definitions (entry point)
│   ├── Video.tsx             # Main video component (scene sequencing)
│   ├── scenes/               # One component per scene type
│   │   ├── IntroScene.tsx    # Branded intro with GOLGOTHA ACADEMY
│   │   ├── ContentBullets.tsx
│   │   ├── ContentDiagram.tsx
│   │   ├── ContentCode.tsx
│   │   ├── SummaryScene.tsx
│   │   ├── QuizScene.tsx
│   │   └── OutroScene.tsx    # Branded outro with GOLGOTHA ACADEMY
│   ├── components/           # Reusable visual overlays
│   │   ├── LowerThird.tsx    # Name / title bar overlay
│   │   ├── SubtitleOverlay.tsx
│   │   ├── ProgressBar.tsx
│   │   └── BrandWatermark.tsx
│   ├── tokens.ts             # Design tokens (colors, fonts, sizes)
│   └── animations.ts         # Reusable animation utility functions
├── public/                   # Static assets (images, fonts, audio)
│   ├── images/
│   ├── fonts/
│   └── audio/
├── remotion.config.ts        # Remotion configuration
├── package.json
└── tsconfig.json
```

---

## Key APIs

### Composition

The `<Composition>` component defines a renderable video. Place it in `Root.tsx`:

```tsx
// src/Root.tsx
import { Composition } from 'remotion';
import { EducationalVideo } from './Video';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="EducationalVideo"
      component={EducationalVideo}
      durationInFrames={30 * 60 * 5}  // 5 minutes at 30 fps = 9000 frames
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{
        courseTitle: 'Introducción a React',
        moduleNumber: 1,
      }}
    />
  </>
);
```

| Prop | Type | Description |
|---|---|---|
| `id` | string | Unique identifier (used in render command) |
| `component` | React.FC | The root video component |
| `durationInFrames` | number | Total video length in frames |
| `fps` | number | Frames per second |
| `width` / `height` | number | Output resolution |
| `defaultProps` | object | Default props passed to the component |

---

### Essential Hooks

#### `useCurrentFrame()`

Returns the current frame number (0-indexed). This is the foundation of all Remotion animations.

```tsx
import { useCurrentFrame } from 'remotion';

const frame = useCurrentFrame();
// frame = 0 on the first frame, 1 on the second, etc.
```

#### `useVideoConfig()`

Returns the video configuration object.

```tsx
import { useVideoConfig } from 'remotion';

const { fps, width, height, durationInFrames } = useVideoConfig();
```

---

### `interpolate()`

Maps a value from one range to another. This is how you create animations.

```tsx
import { interpolate, useCurrentFrame } from 'remotion';

const frame = useCurrentFrame();

// Fade in over the first 20 frames
const opacity = interpolate(frame, [0, 20], [0, 1], {
  extrapolateRight: 'clamp',
});

// Slide up 30px over the first 20 frames
const translateY = interpolate(frame, [0, 20], [30, 0], {
  extrapolateRight: 'clamp',
});
```

**Important options:**

| Option | Values | Description |
|---|---|---|
| `extrapolateLeft` | `'clamp'`, `'extend'`, `'identity'` | Behavior before input range start |
| `extrapolateRight` | `'clamp'`, `'extend'`, `'identity'` | Behavior after input range end |
| `easing` | Easing function | Apply easing curve |

> [!IMPORTANT]
> Always set `extrapolateRight: 'clamp'` to prevent values from overshooting after the animation completes.

---

### `spring()`

Physics-based animation that creates natural-feeling motion.

```tsx
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const scale = spring({
  frame,
  fps,
  config: {
    damping: 12,
    stiffness: 200,
    mass: 0.5,
  },
});
// scale goes from 0 → 1 with a spring curve
```

**Spring config presets:**

| Preset | damping | stiffness | mass | Feel |
|---|---|---|---|---|
| Smooth (default) | 10 | 100 | 1 | Gentle, professional |
| Snappy | 15 | 200 | 0.5 | Quick and responsive |
| Bouncy | 8 | 180 | 0.8 | Playful bounce |
| Heavy | 20 | 80 | 2 | Slow, weighty |

> [!TIP]
> For educational videos, use **Smooth** or **Snappy**. Reserve **Bouncy** for rare emphasis moments.

---

### Scene Sequencing with `<Sequence>`

`<Sequence>` places a component at a specific time in the video.

```tsx
// src/Video.tsx
import { Sequence, AbsoluteFill } from 'remotion';
import { IntroScene } from './scenes/IntroScene';
import { ContentBullets } from './scenes/ContentBullets';
import { SummaryScene } from './scenes/SummaryScene';
import { OutroScene } from './scenes/OutroScene';

const FPS = 30;

export const EducationalVideo: React.FC = () => (
  <AbsoluteFill>
    {/* Scene 1: Intro — 0s to 5s */}
    <Sequence from={0} durationInFrames={FPS * 5}>
      <IntroScene
        title="Introducción a React"
        subtitle="Módulo 1: Componentes"
      />
    </Sequence>

    {/* Scene 2: Content — 5s to 15s */}
    <Sequence from={FPS * 5} durationInFrames={FPS * 10}>
      <ContentBullets
        heading="¿Qué es un componente?"
        bullets={[
          'Bloque reutilizable de UI',
          'Acepta props como entrada',
          'Retorna JSX como salida',
        ]}
      />
    </Sequence>

    {/* Scene 3: Summary — 15s to 20s */}
    <Sequence from={FPS * 15} durationInFrames={FPS * 5}>
      <SummaryScene
        points={[
          'Los componentes son funciones',
          'Props permiten personalización',
          'JSX combina HTML + JS',
        ]}
      />
    </Sequence>

    {/* Scene 4: Outro — 20s to 24s */}
    <Sequence from={FPS * 20} durationInFrames={FPS * 4}>
      <OutroScene />
    </Sequence>
  </AbsoluteFill>
);
```

> [!NOTE]
> Inside a `<Sequence>`, `useCurrentFrame()` resets to `0` at the start of that sequence. This makes scene components self-contained and reusable.

---

## Animation Patterns

### 1. Fade-In with `interpolate`

```tsx
import React from 'react';
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';
import { COLORS, FONTS } from '../tokens';

export const FadeInText: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.bgScene,
    }}>
      <h1 style={{
        fontFamily: FONTS.title,
        fontWeight: 800,
        fontSize: 64,
        color: COLORS.fgTitleMain,
        opacity,
      }}>
        {text}
      </h1>
    </AbsoluteFill>
  );
};
```

### 2. Slide-In with `spring`

```tsx
import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, AbsoluteFill } from 'remotion';
import { COLORS, FONTS } from '../tokens';

export const SlideInTitle: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame, fps, config: { damping: 15, stiffness: 200 } });

  const translateY = interpolate(progress, [0, 1], [60, 0]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.bgScene,
    }}>
      <h1 style={{
        fontFamily: FONTS.title,
        fontWeight: 800,
        fontSize: 64,
        color: COLORS.fgTitleMain,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}>
        {text}
      </h1>
    </AbsoluteFill>
  );
};
```

### 3. Stagger Effect with Delay

```tsx
import React from 'react';
import { useCurrentFrame, useVideoConfig, spring, AbsoluteFill } from 'remotion';
import { COLORS, FONTS } from '../tokens';

export const StaggeredList: React.FC<{ items: string[] }> = ({ items }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{
      justifyContent: 'center',
      paddingLeft: 200,
      backgroundColor: COLORS.bgScene,
    }}>
      {items.map((item, i) => {
        const delay = i * 8; // 8 frames (~0.27s) between each item

        const progress = spring({
          frame: frame - delay,
          fps,
          config: { damping: 12, stiffness: 200 },
        });

        const opacity = interpolate(progress, [0, 1], [0, 1]);
        const translateX = interpolate(progress, [0, 1], [-40, 0]);

        return (
          <div
            key={i}
            style={{
              fontFamily: FONTS.body,
              fontSize: 32,
              color: COLORS.fgBody,
              opacity,
              transform: `translateX(${translateX}px)`,
              marginBottom: 24,
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <span style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: COLORS.primary,
              flexShrink: 0,
            }} />
            {item}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
```

### 4. Scale Entrance

```tsx
const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const scale = spring({
  frame,
  fps,
  config: { damping: 10, stiffness: 150, mass: 0.8 },
});

const opacity = interpolate(scale, [0, 0.5], [0, 1], {
  extrapolateRight: 'clamp',
});

// Apply:
// style={{ transform: `scale(${scale})`, opacity }}
```

### 5. Progress Bar Animation

```tsx
import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, AbsoluteFill } from 'remotion';
import { COLORS } from '../tokens';

export const ProgressBar: React.FC<{ targetPercent: number }> = ({ targetPercent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const width = interpolate(frame, [0, fps * 2], [0, targetPercent], {
    extrapolateRight: 'clamp',
  });

  return (
    <div style={{
      width: '80%',
      height: 24,
      backgroundColor: COLORS.neutral,
      borderRadius: 12,
      overflow: 'hidden',
    }}>
      <div style={{
        width: `${width}%`,
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        transition: 'none',
      }} />
    </div>
  );
};
```

---

## Using Design Tokens

Centralize all brand values in `tokens.ts`:

```tsx
// src/tokens.ts

export const COLORS = {
  // Backgrounds
  bgScene:      '#f8fafc',
  bgCard:       '#ffffff',
  bgPositive:   '#ecfdf5',
  bgError:      '#fef2f2',
  bgNeutral:    '#f3f4f6',

  // Foreground
  fgTitleMain:  '#000000',
  fgTitle:      '#111111',
  fgBody:       '#4b5563',

  // Brand
  primary:      '#059669',
  soft:         '#CFF8E2',

  // Borders
  cardBorder:   '#e5e7eb',

  // Accents
  blue:         '#2563eb',
  violet:       '#7c3aed',
  amber:        '#d97706',

  // Status
  error:        '#ff4444',
} as const;

export const FONTS = {
  title: "'Montserrat', 'Aptos', 'Segoe UI', Arial, sans-serif",
  body:  "'Inter', 'Aptos', 'Segoe UI', Arial, sans-serif",
} as const;

export const SIZES = {
  titleMain:  64,
  titleSection: 48,
  subtitle:   28,
  body:       24,
  small:      18,
  brandLogo:  28,
} as const;

export const SPACING = {
  scenePadding:   80,
  cardPadding:    40,
  elementGap:     24,
  bulletIndent:   32,
} as const;
```

Usage in a component:

```tsx
import { COLORS, FONTS, SIZES, SPACING } from '../tokens';

const style: React.CSSProperties = {
  backgroundColor: COLORS.bgScene,
  fontFamily: FONTS.body,
  color: COLORS.fgBody,
  fontSize: SIZES.body,
  padding: SPACING.scenePadding,
};
```

---

## Reusable Animation Utilities

Create an `animations.ts` helper:

```tsx
// src/animations.ts
import { interpolate, spring } from 'remotion';
import type { SpringConfig } from 'remotion';

/** Standard spring configs for educational videos */
export const SPRING_CONFIGS = {
  smooth: { damping: 10, stiffness: 100, mass: 1 } as SpringConfig,
  snappy: { damping: 15, stiffness: 200, mass: 0.5 } as SpringConfig,
  bouncy: { damping: 8, stiffness: 180, mass: 0.8 } as SpringConfig,
  heavy:  { damping: 20, stiffness: 80, mass: 2 } as SpringConfig,
};

/** Fade-in over a frame range */
export function fadeIn(frame: number, startFrame = 0, durationFrames = 20): number {
  return interpolate(frame, [startFrame, startFrame + durationFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
}

/** Slide from an offset to 0 using a spring */
export function slideIn(
  frame: number,
  fps: number,
  axis: 'x' | 'y' = 'y',
  offset = 40,
  config: SpringConfig = SPRING_CONFIGS.snappy
): { transform: string; opacity: number } {
  const progress = spring({ frame, fps, config });
  const translate = interpolate(progress, [0, 1], [offset, 0]);
  const opacity = interpolate(progress, [0, 0.5], [0, 1], { extrapolateRight: 'clamp' });

  return {
    transform: axis === 'y' ? `translateY(${translate}px)` : `translateX(${translate}px)`,
    opacity,
  };
}

/** Staggered entrance — call for each item with its index */
export function staggerEntrance(
  frame: number,
  fps: number,
  index: number,
  delayPerItem = 8,
  config: SpringConfig = SPRING_CONFIGS.snappy
): { opacity: number; transform: string } {
  const delay = index * delayPerItem;
  const progress = spring({ frame: Math.max(0, frame - delay), fps, config });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateX = interpolate(progress, [0, 1], [-30, 0]);

  return {
    opacity,
    transform: `translateX(${translateX}px)`,
  };
}

/** Scale entrance (e.g., for logos, icons) */
export function scaleEntrance(
  frame: number,
  fps: number,
  config: SpringConfig = SPRING_CONFIGS.smooth
): { transform: string; opacity: number } {
  const scale = spring({ frame, fps, config });
  const opacity = interpolate(scale, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' });

  return {
    transform: `scale(${scale})`,
    opacity,
  };
}
```

Usage:

```tsx
import { fadeIn, slideIn, staggerEntrance } from '../animations';

// In a component:
const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const titleStyle = slideIn(frame, fps, 'y', 40);
const bulletStyle = (i: number) => staggerEntrance(frame - 15, fps, i);
```

---

## Rendering

### CLI Render

```bash
# Basic render
npx remotion render src/index.ts EducationalVideo out/video.mp4

# With options
npx remotion render src/index.ts EducationalVideo out/video.mp4 \
  --codec h264 \
  --quality 100 \
  --concurrency 4
```

### Common Render Flags

| Flag | Default | Description |
|---|---|---|
| `--codec` | `h264` | Output codec: `h264`, `h265`, `vp8`, `vp9`, `gif` |
| `--quality` | `80` | JPEG quality for frames (0–100). Use `100` for production. |
| `--concurrency` | `50%` | Number of parallel browser tabs for rendering |
| `--image-format` | `jpeg` | Frame format: `jpeg` or `png` (png for transparency) |
| `--frames` | all | Render specific frames: `0-150` (useful for testing) |

### Programmatic Render

```tsx
import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';

const bundleLocation = await bundle('./src/index.ts');

const composition = await selectComposition({
  serveUrl: bundleLocation,
  id: 'EducationalVideo',
});

await renderMedia({
  composition,
  serveUrl: bundleLocation,
  codec: 'h264',
  outputLocation: 'out/video.mp4',
  onProgress: ({ progress }) => {
    console.log(`Rendering: ${Math.round(progress * 100)}%`);
  },
});
```

### Still Images

```bash
# Render a single frame as an image (useful for thumbnails)
npx remotion still src/index.ts EducationalVideo out/thumbnail.png --frame=45
```

---

## Best Practices for Educational Videos

### Component Design

- **One component per scene type** — `IntroScene.tsx`, `ContentBullets.tsx`, `QuizScene.tsx`, etc. Never mix scene types in one component.
- **Props for content, not hardcoded strings** — Every scene component should accept its content via props so it's reusable across lessons.
- **Use `AbsoluteFill`** for all full-scene layouts. It provides `position: absolute; top: 0; right: 0; bottom: 0; left: 0;` and is the standard Remotion pattern.

### Animation

- **Use `spring()` for natural motion** — Prefer `spring()` over linear `interpolate()` for UI element entrances.
- **Keep animations 0.4 s – 0.8 s** — Between 12 and 24 frames at 30 fps.
- **Stagger list items** — Use an 8-frame (≈0.27 s) delay between each item.
- **Always clamp** — Set `extrapolateRight: 'clamp'` on every `interpolate()` call.
- **Use the `animations.ts` helpers** — Don't re-derive spring configs in every component.

### Scene Planning

- **One concept per scene** — If a scene teaches more than one idea, split it into two `<Sequence>` blocks.
- **Intro and Outro** — Always include branded `GOLGOTHA ACADEMY` scenes at the start and end.
- **Scene duration** — 5 s minimum, 15 s maximum per scene. Aim for 8–10 s for content scenes.
- **Total video length** — Keep educational videos between 3 and 8 minutes.

### Code Quality

- **TypeScript everywhere** — Use strict TypeScript. Define prop interfaces for every component.
- **Import tokens, not literals** — Never hardcode `#059669`; use `COLORS.primary`.
- **Test with the Remotion Studio** — Scrub through the timeline to verify timing and transitions before rendering.

### Performance

- **Optimize assets** — Compress images to WebP. Keep total `public/` folder under 10 MB.
- **Avoid heavy DOM** — Keep each scene under 50 DOM elements.
- **Use `--concurrency`** — Set render concurrency to your CPU core count for faster exports.

> [!WARNING]
> Remotion renders every frame independently. Avoid `useState`, `useEffect`, or any side effects — components must be pure functions of `frame`.

---

## Integration with Skill Templates

The `templates/remotion/` directory contains production-ready scene components, design tokens, and animation utilities for educational videos. Use them as starting points.

### Template Files

| File | Purpose |
|---|---|
| `IntroScene.tsx` | Branded intro with GOLGOTHA ACADEMY logo, spring-animated course title and module subtitle. |
| `ContentBullets.tsx` | Bullet-point explanation scene. Heading + staggered list with primary-colored bullet markers. |
| `ContentDiagram.tsx` | Image/diagram scene with fade-in visual and animated caption. |
| `ContentCode.tsx` | Code walkthrough with syntax-highlighted block and line-by-line reveal animation. |
| `ContentComparison.tsx` | Two-column comparison layout with synchronized entrance animations. |
| `QuizScene.tsx` | Question + multiple options with sequential reveal and answer highlight. |
| `SummaryScene.tsx` | Key takeaways with numbered points and staggered entrance. |
| `OutroScene.tsx` | Branded outro with GOLGOTHA ACADEMY logo, thank-you message, and fade-out. |
| `LowerThird.tsx` | Reusable name/title bar overlay component with slide-in animation. |
| `SubtitleOverlay.tsx` | Subtitle overlay component for accessibility and multilingual support. |
| `ProgressBar.tsx` | Animated progress bar component (lesson progress, concept completion). |
| `BrandWatermark.tsx` | Subtle GOLGOTHA ACADEMY watermark for consistent branding across scenes. |
| `tokens.ts` | Complete design token file with COLORS, FONTS, SIZES, and SPACING constants. |
| `animations.ts` | Reusable animation utilities: fadeIn, slideIn, staggerEntrance, scaleEntrance, spring configs. |

### Using Templates

```bash
# 1. Copy template files into your project
cp templates/remotion/tokens.ts    my-video/src/
cp templates/remotion/animations.ts my-video/src/
cp templates/remotion/IntroScene.tsx my-video/src/scenes/
cp templates/remotion/OutroScene.tsx my-video/src/scenes/

# 2. Import and use in your Video.tsx
# 3. Customize props for your lesson content
# 4. Preview in Remotion Studio, then render
```

> [!TIP]
> Start by copying `tokens.ts` and `animations.ts` first — they are dependencies for every scene component.
