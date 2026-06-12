/**
 * IntroScene.tsx — GOLGOTHA ACADEMY branded intro sequence
 *
 * ~150 frames (5 s @ 30 fps)
 *
 * Timeline:
 *   0-40   GOLGOTHA ACADEMY wordmark scales in (spring)
 *  45-75   Title fades + slides up
 *  80-110  Subtitle fades in
 *  90-130  Green accent bar draws across
 */

import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from 'remotion';
import { COLORS, FONTS, FONT_WEIGHTS, SIZES } from './tokens';
import { fadeIn, scaleIn, slideInUp, drawLine } from './animations';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export interface IntroSceneProps {
  /** Main title of the video / module */
  title: string;
  /** Optional subtitle or tagline */
  subtitle?: string;
  /** Optional module number badge, e.g. "Módulo 3" */
  moduleNumber?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export const IntroScene: React.FC<IntroSceneProps> = ({
  title,
  subtitle,
  moduleNumber,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Animations ──────────────────────────────────────────────────
  const wordmarkScale = scaleIn(frame, 0, fps, 'gentle');
  const wordmarkOpacity = fadeIn(frame, 0, 30);

  const titleOpacity = fadeIn(frame, 45, 25);
  const titleY = slideInUp(frame, 45, fps, 40, 'snappy');

  const subtitleOpacity = fadeIn(frame, 80, 25);

  const accentWidth = drawLine(frame, 90, 40, 320);

  const moduleOpacity = fadeIn(frame, 35, 20);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgScene,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: FONTS.title,
      }}
    >
      {/* ── Background accent dots ─────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          right: 80,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: COLORS.accentGreenSoft,
          opacity: fadeIn(frame, 10, 40) * 0.5,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          left: 120,
          width: 140,
          height: 140,
          borderRadius: '50%',
          background: COLORS.accentGreenSoft,
          opacity: fadeIn(frame, 20, 40) * 0.35,
        }}
      />

      {/* ── Module number badge ────────────────────────────────── */}
      {moduleNumber && (
        <div
          style={{
            position: 'absolute',
            top: 80,
            left: SIZES.paddingScene,
            opacity: moduleOpacity,
            backgroundColor: COLORS.accentGreenSoft,
            color: COLORS.accentGreen,
            fontFamily: FONTS.body,
            fontWeight: FONT_WEIGHTS.semibold,
            fontSize: SIZES.fontCaption,
            padding: '8px 24px',
            borderRadius: SIZES.radiusPill,
          }}
        >
          {moduleNumber}
        </div>
      )}

      {/* ── Centered content stack ─────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        }}
      >
        {/* Wordmark */}
        <div
          style={{
            opacity: wordmarkOpacity,
            transform: `scale(${wordmarkScale})`,
            fontSize: SIZES.fontHero,
            fontWeight: FONT_WEIGHTS.extrabold,
            color: COLORS.fgTitleMain,
            letterSpacing: 12,
            textTransform: 'uppercase',
          }}
        >
          GOLGOTHA ACADEMY
        </div>

        {/* Green accent bar */}
        <div
          style={{
            width: accentWidth,
            height: 4,
            backgroundColor: COLORS.accentGreen,
            borderRadius: 2,
          }}
        />

        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: SIZES.fontH1,
            fontWeight: FONT_WEIGHTS.bold,
            color: COLORS.fgTitle,
            textAlign: 'center',
            maxWidth: 1200,
            lineHeight: SIZES.lineHeightTight,
          }}
        >
          {title}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div
            style={{
              opacity: subtitleOpacity,
              fontSize: SIZES.fontH3,
              fontWeight: FONT_WEIGHTS.regular,
              fontFamily: FONTS.body,
              color: COLORS.fgBody,
              textAlign: 'center',
              maxWidth: 900,
              lineHeight: SIZES.lineHeightNormal,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

export default IntroScene;
