/**
 * tokens.ts — GOLGOTHA ACADEMY Design System Tokens for Remotion
 *
 * Single source of truth for every visual constant used across
 * all Remotion video templates. Keep in sync with the brand
 * style guide (HyperFrames tokens mirror these values).
 */

/* ------------------------------------------------------------------ */
/*  Colors                                                            */
/* ------------------------------------------------------------------ */

export const COLORS = {
  /** Main scene / slide background */
  bgScene: '#f8fafc',

  /** Primary title color (intro, outro) */
  fgTitleMain: '#000000',

  /** Secondary title / heading color */
  fgTitle: '#111111',

  /** Body / paragraph text */
  fgBody: '#4b5563',

  /** Brand accent – primary green */
  accentGreen: '#059669',
  accentGreenSoft: '#CFF8E2',

  /** Academic accent – blue */
  accentBlue: '#2563eb',
  accentBlueSoft: '#dbeafe',

  /** Highlight accent – violet */
  accentViolet: '#7c3aed',
  accentVioletSoft: '#ede9fe',

  /** Warning / attention accent – amber */
  accentAmber: '#d97706',
  accentAmberSoft: '#fef3c7',

  /** Positive / success background */
  bgPositive: '#ecfdf5',

  /** Card surfaces */
  bgCard: '#ffffff',
  borderCard: '#e5e7eb',

  /** Error states */
  fgError: '#ff4444',
  bgError: '#fef2f2',

  /** Neutral / muted background */
  bgNeutral: '#f3f4f6',

  /** Transparent overlays */
  overlayDark: 'rgba(0, 0, 0, 0.60)',
  overlayLight: 'rgba(255, 255, 255, 0.85)',
} as const;

/* ------------------------------------------------------------------ */
/*  Fonts                                                             */
/* ------------------------------------------------------------------ */

export const FONTS = {
  /** Titles & headings — Montserrat ExtraBold */
  title: "'Montserrat', 'Aptos', 'Segoe UI', Arial, sans-serif",

  /** Body text — Inter */
  body: "'Inter', 'Aptos', 'Segoe UI', Arial, sans-serif",

  /** Code / monospace snippets */
  mono: "'JetBrains Mono', 'Cascadia Code', 'Consolas', monospace",
} as const;

export const FONT_WEIGHTS = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

/* ------------------------------------------------------------------ */
/*  Sizes (px)                                                        */
/* ------------------------------------------------------------------ */

export const SIZES = {
  /** Full-HD canvas */
  width: 1920,
  height: 1080,

  /** Scene padding */
  paddingScene: 80,
  paddingCard: 40,

  /** Border radii */
  radiusSmall: 8,
  radiusMedium: 12,
  radiusLarge: 20,
  radiusPill: 999,

  /** Typography scale */
  fontHero: 72,
  fontH1: 56,
  fontH2: 44,
  fontH3: 36,
  fontBody: 28,
  fontCaption: 22,
  fontSmall: 18,

  /** Line heights (multipliers) */
  lineHeightTight: 1.15,
  lineHeightNormal: 1.5,
  lineHeightRelaxed: 1.7,

  /** Common element sizes */
  bulletSize: 36,
  iconSize: 32,
  progressBarHeight: 6,
  lowerThirdHeight: 80,
  subtitleStripHeight: 64,
} as const;

/* ------------------------------------------------------------------ */
/*  Timing (frames @ 30 fps)                                          */
/* ------------------------------------------------------------------ */

export const TIMING = {
  /** Default FPS for all compositions */
  fps: 30,

  /** Standard durations */
  intro: 150,           // 5 s
  outro: 150,           // 5 s
  transition: 90,       // 3 s
  contentShort: 300,    // 10 s
  contentMedium: 450,   // 15 s
  contentLong: 600,     // 20 s
  quiz: 360,            // 12 s
  summary: 300,         // 10 s
  lowerThird: 180,      // 6 s
  subtitle: 90,         // 3 s  (default per segment)

  /** Animation micro-timings */
  fadeDefault: 20,      // ~0.67 s
  staggerDelay: 10,     // ~0.33 s per item
  holdBeforeExit: 30,   // 1 s
} as const;

/* ------------------------------------------------------------------ */
/*  Derived helpers                                                   */
/* ------------------------------------------------------------------ */

export type ColorKey = keyof typeof COLORS;
export type FontKey = keyof typeof FONTS;
