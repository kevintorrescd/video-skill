/**
 * ClosingScene.tsx — Outro with GOLGOTHA ACADEMY branding
 *
 * ~150 frames (5 s @ 30 fps)
 *
 * Timeline:
 *   0-40   Wordmark scales in (spring)
 *  30-60   "Gracias" text fades
 *  50-80   CTA fades in
 *  70+     Social links stagger in
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
  scaleIn,
  slideInUp,
  staggerDelay,
} from './animations';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export interface SocialLink {
  platform: string;
  handle: string;
}

export interface ClosingSceneProps {
  /** Call-to-action text, e.g. "¡Suscríbete para más lecciones!" */
  ctaText?: string;
  /** Social media links */
  socialLinks?: SocialLink[];
  /** Override the thank-you message */
  thankYouText?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export const ClosingScene: React.FC<ClosingSceneProps> = ({
  ctaText,
  socialLinks,
  thankYouText = '¡Gracias por aprender con nosotros!',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── Animations ──────────────────────────────────────────────────
  const wordmarkScale = scaleIn(frame, 0, fps, 'gentle');
  const wordmarkOpacity = fadeIn(frame, 0, 30);

  const thanksOpacity = fadeIn(frame, 30, 25);
  const thanksY = slideInUp(frame, 30, fps, 25, 'snappy');

  const ctaOpacity = fadeIn(frame, 50, 25);
  const ctaY = slideInUp(frame, 50, fps, 20, 'snappy');

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgScene,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: FONTS.title,
      }}
    >
      {/* ── Decorative circles ─────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: -60,
          right: -60,
          width: 300,
          height: 300,
          borderRadius: '50%',
          backgroundColor: COLORS.accentGreenSoft,
          opacity: fadeIn(frame, 10, 40) * 0.4,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: -40,
          left: -40,
          width: 200,
          height: 200,
          borderRadius: '50%',
          backgroundColor: COLORS.accentGreenSoft,
          opacity: fadeIn(frame, 15, 40) * 0.3,
        }}
      />

      {/* ── Centered content ───────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
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

        {/* Green accent line */}
        <div
          style={{
            width: 120,
            height: 4,
            backgroundColor: COLORS.accentGreen,
            borderRadius: 2,
            opacity: wordmarkOpacity,
          }}
        />

        {/* Thank you */}
        <div
          style={{
            opacity: thanksOpacity,
            transform: `translateY(${thanksY}px)`,
            fontSize: SIZES.fontH2,
            fontWeight: FONT_WEIGHTS.bold,
            color: COLORS.fgTitle,
            textAlign: 'center',
            marginTop: 12,
          }}
        >
          {thankYouText}
        </div>

        {/* CTA */}
        {ctaText && (
          <div
            style={{
              opacity: ctaOpacity,
              transform: `translateY(${ctaY}px)`,
              backgroundColor: COLORS.accentGreen,
              color: '#ffffff',
              fontFamily: FONTS.body,
              fontWeight: FONT_WEIGHTS.semibold,
              fontSize: SIZES.fontBody,
              padding: '14px 40px',
              borderRadius: SIZES.radiusPill,
              marginTop: 8,
            }}
          >
            {ctaText}
          </div>
        )}

        {/* Social links */}
        {socialLinks && socialLinks.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: 32,
              marginTop: 20,
            }}
          >
            {socialLinks.map((link, i) => {
              const delay = 70 + staggerDelay(i, 10);
              const opacity = fadeIn(frame, delay, 20);
              const y = slideInUp(frame, delay, fps, 20, 'snappy');

              return (
                <div
                  key={i}
                  style={{
                    opacity,
                    transform: `translateY(${y}px)`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      fontFamily: FONTS.body,
                      fontWeight: FONT_WEIGHTS.semibold,
                      fontSize: SIZES.fontSmall,
                      color: COLORS.fgBody,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                    }}
                  >
                    {link.platform}
                  </div>
                  <div
                    style={{
                      fontFamily: FONTS.body,
                      fontWeight: FONT_WEIGHTS.medium,
                      fontSize: SIZES.fontCaption,
                      color: COLORS.accentGreen,
                    }}
                  >
                    {link.handle}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

export default ClosingScene;
