/**
 * animations.ts — Remotion animation utilities for GOLGOTHA ACADEMY templates
 *
 * Every visual motion in the template library is built from these
 * composable primitives.  They wrap `interpolate` and `spring` so
 * individual components stay declarative and concise.
 */

import { interpolate, spring, Easing } from 'remotion';

/* ------------------------------------------------------------------ */
/*  Spring presets                                                    */
/* ------------------------------------------------------------------ */

export const SPRING_CONFIG = {
  /** Smooth, organic — intros, large elements */
  gentle: { damping: 15, mass: 1, stiffness: 80 },

  /** Crisp, responsive — UI cards, buttons */
  snappy: { damping: 20, mass: 0.8, stiffness: 200 },

  /** Playful overshoot — icons, badges */
  bouncy: { damping: 10, mass: 1, stiffness: 150 },

  /** Elegant smooth overshoot — Vercel-like logo assembly and texts */
  smoothOvershoot: { damping: 14, mass: 0.8, stiffness: 110 },
} as const;

export type SpringPreset = keyof typeof SPRING_CONFIG;

/* ------------------------------------------------------------------ */
/*  Fade                                                              */
/* ------------------------------------------------------------------ */

/**
 * Returns an opacity value that fades from 0 → 1.
 *
 * @param frame       Current frame.
 * @param startFrame  Frame at which the fade begins.
 * @param duration    Duration of the fade in frames.
 */
export const fadeIn = (
  frame: number,
  startFrame: number,
  duration: number,
): number =>
  interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/**
 * Returns an opacity value that fades from 1 → 0.
 */
export const fadeOut = (
  frame: number,
  startFrame: number,
  duration: number,
): number =>
  interpolate(frame, [startFrame, startFrame + duration], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/**
 * Fade in then out — useful for transient overlays.
 */
export const fadeInOut = (
  frame: number,
  inStart: number,
  holdEnd: number,
  outEnd: number,
  fadeDuration: number,
): number => {
  if (frame < inStart) return 0;
  if (frame <= inStart + fadeDuration)
    return fadeIn(frame, inStart, fadeDuration);
  if (frame <= holdEnd) return 1;
  if (frame <= outEnd) return fadeOut(frame, holdEnd, outEnd - holdEnd);
  return 0;
};

/* ------------------------------------------------------------------ */
/*  Slides                                                            */
/* ------------------------------------------------------------------ */

/**
 * Translates X from –offset → 0 using a spring curve.
 */
export const slideInLeft = (
  frame: number,
  startFrame: number,
  fps: number,
  offset: number = 120,
  preset: SpringPreset = 'snappy',
): number => {
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: SPRING_CONFIG[preset],
  });
  return interpolate(progress, [0, 1], [-offset, 0]);
};

/**
 * Translates X from +offset → 0 using a spring curve.
 */
export const slideInRight = (
  frame: number,
  startFrame: number,
  fps: number,
  offset: number = 120,
  preset: SpringPreset = 'snappy',
): number => {
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: SPRING_CONFIG[preset],
  });
  return interpolate(progress, [0, 1], [offset, 0]);
};

/**
 * Translates Y from +offset → 0 using a spring curve.
 */
export const slideInUp = (
  frame: number,
  startFrame: number,
  fps: number,
  offset: number = 80,
  preset: SpringPreset = 'snappy',
): number => {
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: SPRING_CONFIG[preset],
  });
  return interpolate(progress, [0, 1], [offset, 0]);
};

/**
 * Translates Y from –offset → 0 (drops down).
 */
export const slideInDown = (
  frame: number,
  startFrame: number,
  fps: number,
  offset: number = 60,
  preset: SpringPreset = 'snappy',
): number => {
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: SPRING_CONFIG[preset],
  });
  return interpolate(progress, [0, 1], [-offset, 0]);
};

/* ------------------------------------------------------------------ */
/*  Scale                                                             */
/* ------------------------------------------------------------------ */

/**
 * Scales from 0 → 1 with a spring.
 */
export const scaleIn = (
  frame: number,
  startFrame: number,
  fps: number,
  preset: SpringPreset = 'bouncy',
): number => {
  if (frame < startFrame) return 0;
  return spring({
    frame: frame - startFrame,
    fps,
    config: SPRING_CONFIG[preset],
  });
};

/**
 * Scales from a custom start value → 1.
 */
export const scaleFrom = (
  frame: number,
  startFrame: number,
  fps: number,
  from: number = 0.6,
  preset: SpringPreset = 'gentle',
): number => {
  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: SPRING_CONFIG[preset],
  });
  return interpolate(progress, [0, 1], [from, 1]);
};

/* ------------------------------------------------------------------ */
/*  Stagger                                                           */
/* ------------------------------------------------------------------ */

/**
 * Returns the start-frame offset for the n-th item in a staggered list.
 *
 * @param index        Zero-based item index.
 * @param delayPerItem Frames between each item's entrance.
 */
export const staggerDelay = (
  index: number,
  delayPerItem: number = 10,
): number => index * delayPerItem;

/* ------------------------------------------------------------------ */
/*  Progress                                                          */
/* ------------------------------------------------------------------ */

/**
 * Returns a 0 → 1 linear progress value, clamped.
 */
export const progressBar = (
  frame: number,
  startFrame: number,
  endFrame: number,
): number =>
  interpolate(frame, [startFrame, endFrame], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

/* ------------------------------------------------------------------ */
/*  Line drawing                                                      */
/* ------------------------------------------------------------------ */

/**
 * Animates a CSS `width` (or any 0→max dimension) with easing.
 */
export const drawLine = (
  frame: number,
  startFrame: number,
  duration: number,
  maxLength: number,
): number =>
  interpolate(frame, [startFrame, startFrame + duration], [0, maxLength], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

/* ------------------------------------------------------------------ */
/*  Typewriter                                                        */
/* ------------------------------------------------------------------ */

/**
 * Returns how many characters of `text` should be visible at `frame`.
 */
export const typewriter = (
  text: string,
  frame: number,
  startFrame: number,
  charsPerFrame: number = 1.5,
): number => {
  if (frame < startFrame) return 0;
  const elapsed = frame - startFrame;
  return Math.min(Math.floor(elapsed * charsPerFrame), text.length);
};
