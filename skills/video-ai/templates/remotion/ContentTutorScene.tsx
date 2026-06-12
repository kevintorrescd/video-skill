/**
 * ContentTutorScene.tsx — Main teaching / lecture scene
 *
 * ~450–600 frames (15–20 s @ 30 fps)
 *
 * Layout:
 *   Left 55 %  → topic pill, title, staggered bullet points
 *   Right 45 % → optional image card
 */

import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Img,
} from 'remotion';
import { COLORS, FONTS, FONT_WEIGHTS, SIZES } from './tokens';
import {
  fadeIn,
  slideInLeft,
  slideInUp,
  slideInRight,
  scaleIn,
  staggerDelay,
} from './animations';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export interface ContentTutorSceneProps {
  /** Section / slide title */
  title: string;
  /** Optional topic number shown as a pill badge, e.g. "Tema 2" */
  topicNumber?: string;
  /** Bullet points to reveal one-by-one */
  points: string[];
  /** Optional illustration / screenshot URL (Remotion static asset) */
  imageSrc?: string;
  /** Accent color override (defaults to green) */
  accent?: string;
  accentSoft?: string;
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

const BulletPoint: React.FC<{
  text: string;
  index: number;
  frame: number;
  fps: number;
  accent: string;
}> = ({ text, index, frame, fps, accent }) => {
  const delay = 60 + staggerDelay(index, 15);
  const opacity = fadeIn(frame, delay, 20);
  const y = slideInUp(frame, delay, fps, 30, 'snappy');

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 16,
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      {/* Bullet dot */}
      <div
        style={{
          marginTop: 8,
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: accent,
          flexShrink: 0,
        }}
      />
      {/* Text */}
      <div
        style={{
          fontFamily: FONTS.body,
          fontWeight: FONT_WEIGHTS.regular,
          fontSize: SIZES.fontBody,
          color: COLORS.fgBody,
          lineHeight: SIZES.lineHeightRelaxed,
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

export const ContentTutorScene: React.FC<ContentTutorSceneProps> = ({
  title,
  topicNumber,
  points,
  imageSrc,
  accent = COLORS.accentGreen,
  accentSoft = COLORS.accentGreenSoft,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Animations ──────────────────────────────────────────────────
  const pillOpacity = fadeIn(frame, 5, 20);
  const pillX = slideInLeft(frame, 5, fps, 60, 'snappy');

  const titleOpacity = fadeIn(frame, 20, 25);
  const titleY = slideInUp(frame, 20, fps, 30, 'snappy');

  const imageOpacity = fadeIn(frame, 30, 30);
  const imageX = slideInRight(frame, 30, fps, 80, 'gentle');

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgScene,
        padding: SIZES.paddingScene,
        fontFamily: FONTS.title,
      }}
    >
      {/* ── Two-column grid ────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          gap: 60,
        }}
      >
        {/* ── LEFT: Content ──────────────────────────────────── */}
        <div
          style={{
            flex: imageSrc ? '0 0 55%' : '1 1 100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 28,
          }}
        >
          {/* Topic pill */}
          {topicNumber && (
            <div
              style={{
                opacity: pillOpacity,
                transform: `translateX(${pillX}px)`,
                alignSelf: 'flex-start',
                backgroundColor: accentSoft,
                color: accent,
                fontFamily: FONTS.body,
                fontWeight: FONT_WEIGHTS.semibold,
                fontSize: SIZES.fontSmall,
                padding: '6px 20px',
                borderRadius: SIZES.radiusPill,
              }}
            >
              {topicNumber}
            </div>
          )}

          {/* Title */}
          <div
            style={{
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
              fontSize: SIZES.fontH2,
              fontWeight: FONT_WEIGHTS.bold,
              color: COLORS.fgTitle,
              lineHeight: SIZES.lineHeightTight,
            }}
          >
            {title}
          </div>

          {/* Bullet list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {points.map((pt, i) => (
              <BulletPoint
                key={i}
                text={pt}
                index={i}
                frame={frame}
                fps={fps}
                accent={accent}
              />
            ))}
          </div>
        </div>

        {/* ── RIGHT: Image card ──────────────────────────────── */}
        {imageSrc && (
          <div
            style={{
              flex: '0 0 40%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: imageOpacity,
              transform: `translateX(${imageX}px)`,
            }}
          >
            <div
              style={{
                backgroundColor: COLORS.bgCard,
                border: `1px solid ${COLORS.borderCard}`,
                borderRadius: SIZES.radiusLarge,
                padding: 16,
                boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                overflow: 'hidden',
              }}
            >
              <Img
                src={imageSrc}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: SIZES.radiusMedium,
                  display: 'block',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

export default ContentTutorScene;
