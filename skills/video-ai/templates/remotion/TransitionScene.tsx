/**
 * TransitionScene.tsx — Section transition / divider
 *
 * ~90 frames (3 s @ 30 fps)
 *
 * Timeline:
 *   0-40   Green line draws horizontally across center
 *  20-60   Title fades in and scales up
 *  70-90   Gentle hold
 */

import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { COLORS, FONTS, FONT_WEIGHTS, SIZES } from './tokens';
import { fadeIn, scaleFrom, drawLine } from './animations';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export interface TransitionSceneProps {
  /** Title of the next section */
  nextTitle: string;
  /** Optional section number, e.g. "Sección 3" */
  sectionLabel?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export const TransitionScene: React.FC<TransitionSceneProps> = ({
  nextTitle,
  sectionLabel,
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  // ── Animations ──────────────────────────────────────────────────
  const lineWidth = drawLine(frame, 0, 40, width * 0.35);
  const lineOpacity = fadeIn(frame, 0, 15);

  const titleOpacity = fadeIn(frame, 20, 25);
  const titleScale = scaleFrom(frame, 20, fps, 0.85, 'gentle');

  const labelOpacity = fadeIn(frame, 10, 20);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgScene,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: FONTS.title,
      }}
    >
      {/* ── Subtle background circle ───────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: COLORS.accentGreenSoft,
          opacity: fadeIn(frame, 5, 30) * 0.25,
        }}
      />

      {/* ── Center stack ───────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        }}
      >
        {/* Section label */}
        {sectionLabel && (
          <div
            style={{
              opacity: labelOpacity,
              fontFamily: FONTS.body,
              fontWeight: FONT_WEIGHTS.semibold,
              fontSize: SIZES.fontCaption,
              color: COLORS.accentGreen,
              letterSpacing: 3,
              textTransform: 'uppercase',
            }}
          >
            {sectionLabel}
          </div>
        )}

        {/* Green line */}
        <div
          style={{
            width: lineWidth,
            height: 4,
            backgroundColor: COLORS.accentGreen,
            borderRadius: 2,
            opacity: lineOpacity,
          }}
        />

        {/* Title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            fontSize: SIZES.fontH1,
            fontWeight: FONT_WEIGHTS.bold,
            color: COLORS.fgTitle,
            textAlign: 'center',
            maxWidth: 1000,
            lineHeight: SIZES.lineHeightTight,
          }}
        >
          {nextTitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default TransitionScene;
