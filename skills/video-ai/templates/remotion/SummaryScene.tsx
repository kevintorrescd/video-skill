/**
 * SummaryScene.tsx — Key takeaways / recap scene
 *
 * ~300 frames (10 s @ 30 fps)
 *
 * Timeline:
 *   0-25    "Puntos Clave" pill + title animate in
 *  30+      Checkmark items stagger in
 */

import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { COLORS, FONTS, FONT_WEIGHTS, SIZES } from './tokens';
import {
  fadeIn,
  slideInUp,
  slideInLeft,
  scaleIn,
  staggerDelay,
} from './animations';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export interface SummarySceneProps {
  /** Heading override (default "Puntos Clave") */
  title?: string;
  /** Key takeaway strings */
  points: string[];
}

/* ------------------------------------------------------------------ */
/*  Checkmark item                                                    */
/* ------------------------------------------------------------------ */

const CheckItem: React.FC<{
  text: string;
  index: number;
  frame: number;
  fps: number;
}> = ({ text, index, frame, fps }) => {
  const delay = 35 + staggerDelay(index, 14);
  const opacity = fadeIn(frame, delay, 20);
  const y = slideInUp(frame, delay, fps, 30, 'snappy');
  const checkScale = scaleIn(frame, delay + 5, fps, 'bouncy');

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 20,
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      {/* Checkmark circle */}
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          backgroundColor: COLORS.accentGreenSoft,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${checkScale})`,
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 22,
            color: COLORS.accentGreen,
            fontWeight: FONT_WEIGHTS.bold,
          }}
        >
          ✓
        </span>
      </div>

      {/* Text */}
      <div
        style={{
          fontFamily: FONTS.body,
          fontWeight: FONT_WEIGHTS.medium,
          fontSize: SIZES.fontBody,
          color: COLORS.fgTitle,
          lineHeight: SIZES.lineHeightRelaxed,
          paddingTop: 6,
        }}
      >
        {text}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export const SummaryScene: React.FC<SummarySceneProps> = ({
  title = 'Puntos Clave',
  points,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pillOpacity = fadeIn(frame, 0, 15);
  const pillX = slideInLeft(frame, 0, fps, 40, 'snappy');

  const titleOpacity = fadeIn(frame, 10, 20);
  const titleY = slideInUp(frame, 10, fps, 25, 'snappy');

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgScene,
        padding: SIZES.paddingScene,
        fontFamily: FONTS.title,
      }}
    >
      {/* ── Decorative green corner ────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 300,
          height: 300,
          background: `linear-gradient(135deg, ${COLORS.accentGreenSoft} 0%, transparent 70%)`,
          opacity: 0.5,
        }}
      />

      {/* ── Content area (card) ────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
          maxWidth: 1200,
        }}
      >
        {/* Pill badge */}
        <div
          style={{
            opacity: pillOpacity,
            transform: `translateX(${pillX}px)`,
            alignSelf: 'flex-start',
            backgroundColor: COLORS.accentGreenSoft,
            color: COLORS.accentGreen,
            fontFamily: FONTS.body,
            fontWeight: FONT_WEIGHTS.semibold,
            fontSize: SIZES.fontSmall,
            padding: '6px 20px',
            borderRadius: SIZES.radiusPill,
            marginBottom: 20,
          }}
        >
          📋 Resumen
        </div>

        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: SIZES.fontH2,
            fontWeight: FONT_WEIGHTS.bold,
            color: COLORS.fgTitle,
            marginBottom: 44,
          }}
        >
          {title}
        </div>

        {/* Check items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {points.map((pt, i) => (
            <CheckItem
              key={i}
              text={pt}
              index={i}
              frame={frame}
              fps={fps}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default SummaryScene;
