# Motion Graphics Reference — Remotion Ecosystem

> This reference documents the advanced motion graphics capabilities integrated into the video-ai skill.
> Read this after `engine-remotion.md` for the full picture.

## Ecosystem Libraries

| Package | Purpose | Install |
|---|---|---|
| `@remotion/transitions` | Scene-to-scene transitions (fade, slide, wipe) | `npx remotion add @remotion/transitions` |
| `@remotion/shapes` | Animated SVG shapes (Circle, Rect, Star, Triangle, Polygon) | `npx remotion add @remotion/shapes` |
| `@remotion/paths` | SVG path manipulation, morphing between shapes | `npx remotion add @remotion/paths` |
| `@remotion/lottie` | After Effects animations via Lottie JSON | `npx remotion add @remotion/lottie` |
| `@remotion/skia` | React Native Skia for 2D graphics | `npx remotion add @remotion/skia` |

## Community Resources

| Resource | Description |
|---|---|
| [reactvideoeditor/remotion-templates](https://github.com/reactvideoeditor/remotion-templates) | 81 native effects: charts, text, backgrounds, transitions. No external deps. |
| [av/remotion-bits](https://github.com/av/remotion-bits) | Composable bits: text effects, gradient transitions, particle systems. Includes MCP server. |
| [lifeprompt-team/remotion-scenes](https://github.com/lifeprompt-team/remotion-scenes) | 201+ After Effects-inspired scenes: Kinetic Typography, Shape Morphing, Data Animations. |
| [Remotion Templates](https://www.remotion.dev/templates) | Official starter kits including "Prompt to Motion Graphics SaaS Starter Kit". |

---

## 1. TransitionSeries (`@remotion/transitions`)

### Basic Pattern

```tsx
import { TransitionSeries, linearTiming, springTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';

export const MyVideo: React.FC = () => (
  <TransitionSeries>
    <TransitionSeries.Sequence durationInFrames={150}>
      <IntroScene />
    </TransitionSeries.Sequence>

    <TransitionSeries.Transition
      presentation={fade()}
      timing={linearTiming({ durationInFrames: 20 })}
    />

    <TransitionSeries.Sequence durationInFrames={300}>
      <ContentScene />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);
```

### Available Presentations

| Effect | Import | Options |
|---|---|---|
| Fade | `fade()` | — |
| Slide | `slide({ direction })` | `'from-left'`, `'from-right'`, `'from-top'`, `'from-bottom'` |
| Wipe | `wipe({ direction })` | `'from-left'`, `'from-right'`, `'from-top-left'`, etc. |

### Timing Functions

| Function | Use Case |
|---|---|
| `linearTiming({ durationInFrames: N })` | Constant-speed transitions |
| `springTiming({ config, durationInFrames })` | Physics-based, natural movement |

### Transition Hook

```tsx
import { useTransitionProgress } from '@remotion/transitions';

// Inside a TransitionSeries.Sequence:
const progress = useTransitionProgress();
// progress.entering: 0→1 when entering
// progress.exiting: 0→1 when exiting
```

### Pre-configured Presets (from our skill)

See `templates/remotion/TransitionEffects.ts` for ready-to-use presets:

```tsx
import { TRANSITIONS, SCENE_TRANSITIONS } from './TransitionEffects';

// Use directly:
<TransitionSeries.Transition
  presentation={SCENE_TRANSITIONS.introToContent.presentation}
  timing={SCENE_TRANSITIONS.introToContent.timing}
/>
```

Preset mapping for educational videos:

| Scene Flow | Preset | Effect |
|---|---|---|
| Intro → Content | `introToContent` | Crossfade (20 frames) |
| Content → Content | `contentToContent` | Slide left with spring |
| Content → Quiz | `contentToQuiz` | Slide up with spring |
| Content → Code | `contentToCode` | Quick cut (6 frames) |
| Section → Section | `sectionTransition` | Wipe right |
| Summary → Closing | `summaryToClosing` | Slow crossfade (40 frames) |

---

## 2. Animated Shapes (`@remotion/shapes`)

### Components

```tsx
import { Circle, Rect, Triangle, Star, Polygon, Ellipse, Arrow, Heart } from '@remotion/shapes';
import { interpolate, useCurrentFrame } from 'remotion';

const frame = useCurrentFrame();
const radius = interpolate(frame, [0, 30], [0, 100], { extrapolateRight: 'clamp' });

<Circle radius={radius} fill="#059669" />
<Star innerRadius={30} outerRadius={60} points={5} fill="#2563eb" />
<Triangle length={100} direction="up" fill="#7c3aed" />
```

### Draw-on Animation

```tsx
import { makeCircle } from '@remotion/shapes';

const { path, width, height } = makeCircle({ radius: 80 });
const pathLength = 2 * Math.PI * 80;
const drawProgress = interpolate(frame, [0, 60], [pathLength, 0], { extrapolateRight: 'clamp' });

<svg width={width} height={height}>
  <path
    d={path}
    fill="none"
    stroke="#059669"
    strokeWidth={4}
    strokeDasharray={pathLength}
    strokeDashoffset={drawProgress}
  />
</svg>
```

---

## 3. Motion Graphics Components (our skill)

The file `templates/remotion/MotionGraphics.tsx` provides 10 production-ready components:

### KineticText

Word-by-word or character-by-character text animation.

```tsx
import { KineticText } from './MotionGraphics';

<KineticText
  text="Welcome to Mathematics"
  mode="word"
  entrance="fadeUp"
  staggerFrames={4}
  fontSize={56}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `text` | string | — | Text to animate |
| `mode` | `'word'` \| `'character'` \| `'line'` | `'word'` | How to split text |
| `entrance` | `'fadeUp'` \| `'fadeIn'` \| `'scaleIn'` \| `'slideLeft'` \| `'slideRight'` \| `'bounceIn'` | `'fadeUp'` | Animation type |
| `staggerFrames` | number | 4 | Delay between units |
| `color` | string | `COLORS.fgTitleMain` | Text color |
| `fontSize` | number | 48 | Font size in px |

### AnimatedShape

Color-agnostic geometric primitives with draw-on, scale, and rotation.

```tsx
<AnimatedShape shape="star" size={120} color={COLORS.accentViolet} drawOn scaleEntrance />
<AnimatedShape shape="hexagon" size={80} color={COLORS.accentBlue} rotate rotateSpeed={1} />
```

### StatCounter

Animated number count-up with formatting.

```tsx
<StatCounter to={1250} suffix=" students" duration={60} />
```

### AnimatedBarChart

Data-driven animated bar chart with staggered reveals.

```tsx
<AnimatedBarChart
  data={[
    { label: 'Math', value: 85 },
    { label: 'Science', value: 92 },
    { label: 'History', value: 78 },
  ]}
  stagger={8}
/>
```

### ProgressBar

Animated horizontal progress bar.

```tsx
<ProgressBar progress={0.75} color={COLORS.accentGreen} showLabel />
```

### ParticleBurst

Celebratory particle explosion (e.g., correct quiz answer).

```tsx
<ParticleBurst particleCount={40} startFrame={90} originX={960} originY={540} />
```

### TextHighlight

Sequential word highlighting within a paragraph.

```tsx
<TextHighlight
  text="The mitochondria is the powerhouse of the cell"
  highlightWords={[1, 4, 5]}
  highlightColor={COLORS.accentGreenSoft}
/>
```

### BrandLogo

Animated Golgotha Academy logo with SVG support.

```tsx
<BrandLogo animated showText size={80} />
```

### CardFlip

3D card flip reveal (great for quiz answers).

```tsx
<CardFlip
  front={<div>Question?</div>}
  back={<div>Answer!</div>}
  flipFrame={60}
/>
```

### LineDraw

SVG path draw-on animation for custom illustrations.

```tsx
<LineDraw
  path="M 10 80 Q 95 10 180 80 T 350 80"
  color={COLORS.accentBlue}
  duration={45}
/>
```

---

## 4. Animation Patterns Reference

### Staggering (word-by-word text)

The core pattern from remotion-scenes and remotion-templates:

```tsx
const words = text.split(' ');
words.map((word, i) => {
  const delay = i * staggerFrames;
  const localFrame = frame - delay;
  const opacity = interpolate(localFrame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  const y = interpolate(localFrame, [0, 10], [20, 0], { extrapolateRight: 'clamp' });
  // render word with { opacity, transform: `translateY(${y}px)` }
});
```

### Spring Configurations

| Preset | Config | Use Case |
|---|---|---|
| Gentle | `{ damping: 15, mass: 1, stiffness: 80 }` | Slow, elegant entrances |
| Snappy | `{ damping: 20, mass: 0.8, stiffness: 200 }` | Quick, responsive UI |
| Bouncy | `{ damping: 8, mass: 1, stiffness: 150 }` | Playful, gamified (quizzes) |
| smoothOvershoot | `{ damping: 14, mass: 0.8, stiffness: 110 }` | Elegant, Vercel-like logo assemblies and staggered texts |

### Easing Functions

```tsx
import { Easing } from 'remotion';

// Smooth deceleration (best for entrances)
easing: Easing.out(Easing.cubic)

// Smooth acceleration (best for exits)
easing: Easing.in(Easing.cubic)

// Symmetric (best for continuous motion)
easing: Easing.inOut(Easing.cubic)

// Elastic (playful, quiz reveals)
easing: Easing.out(Easing.elastic(1))

// Back (slight overshoot)
easing: Easing.out(Easing.back(1.5))
```

### Interpolation Patterns

```tsx
// Clamp to prevent overshoot
interpolate(frame, [0, 30], [0, 1], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});

// Multi-step (appear, hold, disappear)
interpolate(frame, [0, 10, 80, 90], [0, 1, 1, 0]);

// Color interpolation (use interpolateColors from 'remotion')
import { interpolateColors } from 'remotion';
const color = interpolateColors(frame, [0, 30], [COLORS.fgBody, COLORS.accentGreen]);
```

---

## 5. Integration with remotion-bits MCP

The `av/remotion-bits` repository includes an MCP server for AI agents:

```bash
npx remotion-bits mcp
```

This allows the AI agent to:
- Search available animation "bits" by name or category
- Extract the source code of any bit on demand
- Compose bits into scenes programmatically

To use in the agent, configure the MCP connection and query for bits matching your scene needs.

---

## 6. Complete Educational Video Example

```tsx
import { Composition } from 'remotion';
import { TransitionSeries } from '@remotion/transitions';
import { SCENE_TRANSITIONS } from './TransitionEffects';
import { IntroScene } from './IntroScene';
import { ContentTutorScene } from './ContentTutorScene';
import { QuizScene } from './QuizScene';
import { SummaryScene } from './SummaryScene';
import { ClosingScene } from './ClosingScene';
import { KineticText, StatCounter, ParticleBurst } from './MotionGraphics';

export const MathLesson: React.FC = () => (
  <TransitionSeries>
    {/* 1. Intro with brand */}
    <TransitionSeries.Sequence durationInFrames={150}>
      <IntroScene title="Introduction to Fractions" subtitle="Module 3" />
    </TransitionSeries.Sequence>

    <TransitionSeries.Transition {...SCENE_TRANSITIONS.introToContent} />

    {/* 2. Content with kinetic title */}
    <TransitionSeries.Sequence durationInFrames={450}>
      <ContentTutorScene
        title="What are Fractions?"
        topicNumber="3.1"
        points={[
          'A fraction represents part of a whole',
          'The top number is the numerator',
          'The bottom number is the denominator',
        ]}
      />
    </TransitionSeries.Sequence>

    <TransitionSeries.Transition {...SCENE_TRANSITIONS.contentToQuiz} />

    {/* 3. Quiz with particle burst on correct answer */}
    <TransitionSeries.Sequence durationInFrames={360}>
      <QuizScene
        question="What is 1/2 + 1/4?"
        options={[
          { text: '2/6', isCorrect: false },
          { text: '3/4', isCorrect: true },
          { text: '1/3', isCorrect: false },
          { text: '2/4', isCorrect: false },
        ]}
      />
      <ParticleBurst startFrame={240} originX={960} originY={400} />
    </TransitionSeries.Sequence>

    <TransitionSeries.Transition {...SCENE_TRANSITIONS.contentToSummary} />

    {/* 4. Summary */}
    <TransitionSeries.Sequence durationInFrames={300}>
      <SummaryScene
        points={[
          'Fractions represent parts of a whole',
          'Always find a common denominator',
          'Simplify your final answer',
        ]}
      />
    </TransitionSeries.Sequence>

    <TransitionSeries.Transition {...SCENE_TRANSITIONS.summaryToClosing} />

    {/* 5. Closing with brand */}
    <TransitionSeries.Sequence durationInFrames={150}>
      <ClosingScene ctaText="Next: Decimals →" />
    </TransitionSeries.Sequence>
  </TransitionSeries>
);

// Register composition
export const Root: React.FC = () => (
  <Composition
    id="MathLesson"
    component={MathLesson}
    durationInFrames={1410}
    fps={30}
    width={1920}
    height={1080}
  />
);
```
