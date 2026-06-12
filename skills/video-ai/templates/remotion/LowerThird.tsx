/**
 * LowerThird.tsx — Name / role overlay component
 *
 * ~180 frames default (6 s @ 30 fps)
 *
 * Timeline:
 *   start+0       Pill slides in from left
 *   start+10      Text fades in
 *   start+dur-30  Pill slides out to left
 *
 * This is an overlay — render it on top of any scene.
 */

import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';
import { COLORS, FONTS, FONT_WEIGHTS, SIZES, TIMING } from './tokens';
import { SPRING_CONFIG } from './animations';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export interface LowerThirdProps {
  /** Person's name */
  name: string;
  /** Role / title */
  role: string;
  /** Frame at which the lower third enters */
  startFrame: number;
  /** Total display duration in frames (default 180) */
  durationFrames?: number;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export const LowerThird: React.FC<LowerThirdProps> = ({
  name,
  role,
  startFrame,
  durationFrames = TIMING.lowerThird,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - startFrame;
  const exitStart = durationFrames - 30;

  // Not visible yet or already gone
  if (localFrame < 0 || localFrame > durationFrames) return null;

  // ── Enter animation ─────────────────────────────────────────────
  const enterProgress = spring({
    frame: Math.max(0, localFrame),
    fps,
    config: SPRING_CONFIG.snappy,
  });

  // ── Exit animation ──────────────────────────────────────────────
  const exitProgress =
    localFrame >= exitStart
      ? interpolate(localFrame, [exitStart, durationFrames], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        })
      : 0;

  const translateX = interpolate(enterProgress, [0, 1], [-400, 0]) +
    interpolate(exitProgress, [0, 1], [0, -400]);

  const contentOpacity = interpolate(
    enterProgress,
    [0.3, 1],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
  ) * (1 - exitProgress);

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: 60,
          transform: `translateX(${translateX}px)`,
          display: 'flex',
          alignItems: 'stretch',
          borderRadius: SIZES.radiusMedium,
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        }}
      >
        {/* Green accent bar */}
        <div
          style={{
            width: 6,
            backgroundColor: COLORS.accentGreen,
          }}
        />

        {/* Content area */}
        <div
          style={{
            backgroundColor: COLORS.bgCard,
            padding: '16px 32px',
            opacity: contentOpacity,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.title,
              fontWeight: FONT_WEIGHTS.bold,
              fontSize: SIZES.fontBody,
              color: COLORS.fgTitle,
              marginBottom: 4,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontFamily: FONTS.body,
              fontWeight: FONT_WEIGHTS.regular,
              fontSize: SIZES.fontSmall,
              color: COLORS.fgBody,
            }}
          >
            {role}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default LowerThird;
