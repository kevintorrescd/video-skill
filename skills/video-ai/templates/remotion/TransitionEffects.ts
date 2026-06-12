/**
 * TransitionEffects — Remotion @remotion/transitions integration
 *
 * Pre-configured transition presets for educational videos.
 * Uses @remotion/transitions (TransitionSeries, fade, slide, wipe).
 *
 * Usage:
 *   import { TransitionSeries } from '@remotion/transitions';
 *   import { TRANSITIONS } from './TransitionEffects';
 *
 *   <TransitionSeries>
 *     <TransitionSeries.Sequence durationInFrames={150}>
 *       <IntroScene />
 *     </TransitionSeries.Sequence>
 *     <TransitionSeries.Transition
 *       presentation={TRANSITIONS.crossfade.presentation}
 *       timing={TRANSITIONS.crossfade.timing}
 *     />
 *     <TransitionSeries.Sequence durationInFrames={300}>
 *       <ContentScene />
 *     </TransitionSeries.Sequence>
 *   </TransitionSeries>
 */

// NOTE: These imports require @remotion/transitions to be installed:
//   npx remotion add @remotion/transitions
//
// If not installed, this file serves as documentation for the patterns.

import { linearTiming, springTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';

// ────────────────────────────────────────────────────────────────
// PRE-CONFIGURED TRANSITION PRESETS
// ────────────────────────────────────────────────────────────────

export const TRANSITIONS = {
  /**
   * Crossfade — smooth opacity blend.
   * Best for: scene-to-scene, intro to content.
   * Duration: ~20 frames (0.67s at 30fps)
   */
  crossfade: {
    presentation: fade(),
    timing: linearTiming({ durationInFrames: 20 }),
  },

  /**
   * Crossfade Slow — extended opacity blend.
   * Best for: emotional transitions, closing scenes.
   * Duration: ~40 frames (1.33s at 30fps)
   */
  crossfadeSlow: {
    presentation: fade(),
    timing: linearTiming({ durationInFrames: 40 }),
  },

  /**
   * Slide Left — new scene slides in from right.
   * Best for: sequential content, step-by-step.
   */
  slideLeft: {
    presentation: slide({ direction: 'from-right' }),
    timing: springTiming({
      config: { damping: 15, mass: 1, stiffness: 80 },
      durationInFrames: 25,
    }),
  },

  /**
   * Slide Right — new scene slides in from left.
   * Best for: going back, review sections.
   */
  slideRight: {
    presentation: slide({ direction: 'from-left' }),
    timing: springTiming({
      config: { damping: 15, mass: 1, stiffness: 80 },
      durationInFrames: 25,
    }),
  },

  /**
   * Slide Up — new scene slides in from bottom.
   * Best for: reveals, quiz answers.
   */
  slideUp: {
    presentation: slide({ direction: 'from-bottom' }),
    timing: springTiming({
      config: { damping: 18, mass: 1, stiffness: 100 },
      durationInFrames: 22,
    }),
  },

  /**
   * Slide Down — new scene slides in from top.
   * Best for: topic drops, announcements.
   */
  slideDown: {
    presentation: slide({ direction: 'from-top' }),
    timing: springTiming({
      config: { damping: 18, mass: 1, stiffness: 100 },
      durationInFrames: 22,
    }),
  },

  /**
   * Wipe Right — horizontal wipe.
   * Best for: section transitions, comparison reveals.
   */
  wipeRight: {
    presentation: wipe({ direction: 'from-left' }),
    timing: linearTiming({ durationInFrames: 20 }),
  },

  /**
   * Wipe Down — vertical wipe.
   * Best for: section breaks, dramatic reveals.
   */
  wipeDown: {
    presentation: wipe({ direction: 'from-top-left' }),
    timing: linearTiming({ durationInFrames: 25 }),
  },

  /**
   * Quick Cut — very fast fade (almost a hard cut).
   * Best for: fast-paced sections, code examples.
   */
  quickCut: {
    presentation: fade(),
    timing: linearTiming({ durationInFrames: 6 }),
  },
} as const;

// ────────────────────────────────────────────────────────────────
// EDUCATIONAL VIDEO TRANSITION PRESETS
// ────────────────────────────────────────────────────────────────

/**
 * Recommended transitions for each educational scene type.
 * Use these as a quick reference when composing videos.
 */
export const SCENE_TRANSITIONS = {
  /** Intro → Content: smooth crossfade */
  introToContent: TRANSITIONS.crossfade,

  /** Content → Content: slide left (forward progression) */
  contentToContent: TRANSITIONS.slideLeft,

  /** Content → Quiz: slide up (reveal) */
  contentToQuiz: TRANSITIONS.slideUp,

  /** Quiz → Content: crossfade */
  quizToContent: TRANSITIONS.crossfade,

  /** Content → Code: quick cut */
  contentToCode: TRANSITIONS.quickCut,

  /** Code → Content: crossfade */
  codeToContent: TRANSITIONS.crossfade,

  /** Section → Section: wipe right */
  sectionTransition: TRANSITIONS.wipeRight,

  /** Content → Summary: slide up */
  contentToSummary: TRANSITIONS.slideUp,

  /** Summary → Closing: crossfade slow */
  summaryToClosing: TRANSITIONS.crossfadeSlow,

  /** Any → Diagram: crossfade */
  toDiagram: TRANSITIONS.crossfade,
} as const;

// ────────────────────────────────────────────────────────────────
// EXAMPLE: Full Educational Video Composition
// ────────────────────────────────────────────────────────────────

/**
 * Example usage with TransitionSeries:
 *
 * ```tsx
 * import { TransitionSeries } from '@remotion/transitions';
 * import { TRANSITIONS, SCENE_TRANSITIONS } from './TransitionEffects';
 * import { IntroScene } from './IntroScene';
 * import { ContentTutorScene } from './ContentTutorScene';
 * import { QuizScene } from './QuizScene';
 * import { ClosingScene } from './ClosingScene';
 *
 * export const EducationalVideo: React.FC = () => (
 *   <TransitionSeries>
 *     <TransitionSeries.Sequence durationInFrames={150}>
 *       <IntroScene title="Math Basics" />
 *     </TransitionSeries.Sequence>
 *
 *     <TransitionSeries.Transition
 *       presentation={SCENE_TRANSITIONS.introToContent.presentation}
 *       timing={SCENE_TRANSITIONS.introToContent.timing}
 *     />
 *
 *     <TransitionSeries.Sequence durationInFrames={450}>
 *       <ContentTutorScene title="Fractions" points={['...', '...']} />
 *     </TransitionSeries.Sequence>
 *
 *     <TransitionSeries.Transition
 *       presentation={SCENE_TRANSITIONS.contentToQuiz.presentation}
 *       timing={SCENE_TRANSITIONS.contentToQuiz.timing}
 *     />
 *
 *     <TransitionSeries.Sequence durationInFrames={360}>
 *       <QuizScene question="What is 1/2 + 1/4?" options={[...]} />
 *     </TransitionSeries.Sequence>
 *
 *     <TransitionSeries.Transition
 *       presentation={SCENE_TRANSITIONS.summaryToClosing.presentation}
 *       timing={SCENE_TRANSITIONS.summaryToClosing.timing}
 *     />
 *
 *     <TransitionSeries.Sequence durationInFrames={150}>
 *       <ClosingScene />
 *     </TransitionSeries.Sequence>
 *   </TransitionSeries>
 * );
 * ```
 */
