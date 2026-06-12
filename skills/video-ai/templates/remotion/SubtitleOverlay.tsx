/**
 * SubtitleOverlay.tsx — Subtitle / caption overlay component
 *
 * Renders a dark semi-transparent strip at the bottom of the frame
 * with centered white text. Fades in and out at the edges of its
 * time window.
 *
 * This is an overlay — render it on top of any scene.
 */

import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
} from 'remotion';
import { COLORS, FONTS, FONT_WEIGHTS, SIZES } from './tokens';
import { fadeIn, fadeOut } from './animations';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export interface SubtitleOverlayProps {
  /** Subtitle text for this segment */
  text: string;
  /** Frame at which subtitle appears */
  startFrame: number;
  /** Frame at which subtitle disappears */
  endFrame: number;
  /** Fade duration in frames (default 8) */
  fadeDuration?: number;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export const SubtitleOverlay: React.FC<SubtitleOverlayProps> = ({
  text,
  startFrame,
  endFrame,
  fadeDuration = 8,
}) => {
  const frame = useCurrentFrame();

  // Outside visible range
  if (frame < startFrame - 1 || frame > endFrame + 1) return null;

  // ── Opacity ─────────────────────────────────────────────────────
  const enterOpacity = fadeIn(frame, startFrame, fadeDuration);
  const exitOpacity = fadeOut(frame, endFrame - fadeDuration, fadeDuration);
  const opacity = Math.min(enterOpacity, exitOpacity);

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {/* ── Dark strip ─────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: SIZES.subtitleStripHeight + 40,
          backgroundColor: COLORS.overlayDark,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 120px',
          opacity,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.body,
            fontWeight: FONT_WEIGHTS.medium,
            fontSize: SIZES.fontBody,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: SIZES.lineHeightNormal,
            textShadow: '0 1px 4px rgba(0,0,0,0.5)',
          }}
        >
          {text}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default SubtitleOverlay;
