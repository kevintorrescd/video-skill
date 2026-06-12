/**
 * QuizScene.tsx — Interactive quiz / exercise scene
 *
 * ~360 frames (12 s @ 30 fps)
 *
 * Timeline:
 *   0-30    Question fades + slides up
 *  35-85    Option cards stagger in (2×2 grid)
 *  180      Reveal phase — correct = green, wrong = red
 *  240-340  Explanation fades in
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
  scaleIn,
  staggerDelay,
} from './animations';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizSceneProps {
  /** The question text */
  question: string;
  /** 2–4 answer options */
  options: QuizOption[];
  /** Explanation shown after reveal */
  explanation?: string;
  /** Frame at which answers are revealed (default 180) */
  revealFrame?: number;
}

/* ------------------------------------------------------------------ */
/*  Option card                                                       */
/* ------------------------------------------------------------------ */

const OptionCard: React.FC<{
  option: QuizOption;
  index: number;
  frame: number;
  fps: number;
  revealed: boolean;
  label: string;
}> = ({ option, index, frame, fps, revealed, label }) => {
  const delay = 35 + staggerDelay(index, 12);
  const opacity = fadeIn(frame, delay, 20);
  const y = slideInUp(frame, delay, fps, 40, 'snappy');

  // Reveal colours
  const isCorrect = option.isCorrect;
  const revealBg = revealed
    ? isCorrect
      ? COLORS.bgPositive
      : COLORS.bgError
    : COLORS.bgCard;
  const revealBorder = revealed
    ? isCorrect
      ? COLORS.accentGreen
      : COLORS.fgError
    : COLORS.borderCard;
  const revealIcon = revealed ? (isCorrect ? '✓' : '✗') : label;
  const revealIconColor = revealed
    ? isCorrect
      ? COLORS.accentGreen
      : COLORS.fgError
    : COLORS.fgBody;

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${y}px)`,
        backgroundColor: revealBg,
        border: `2px solid ${revealBorder}`,
        borderRadius: SIZES.radiusMedium,
        padding: '24px 28px',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        transition: 'background-color 0.3s, border-color 0.3s',
      }}
    >
      {/* Label / icon */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          backgroundColor: revealed
            ? isCorrect
              ? COLORS.accentGreenSoft
              : COLORS.bgError
            : COLORS.bgNeutral,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: FONTS.title,
          fontWeight: FONT_WEIGHTS.bold,
          fontSize: 22,
          color: revealIconColor,
          flexShrink: 0,
        }}
      >
        {revealIcon}
      </div>

      {/* Option text */}
      <div
        style={{
          fontFamily: FONTS.body,
          fontWeight: FONT_WEIGHTS.medium,
          fontSize: SIZES.fontBody,
          color: COLORS.fgTitle,
          lineHeight: SIZES.lineHeightNormal,
        }}
      >
        {option.text}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export const QuizScene: React.FC<QuizSceneProps> = ({
  question,
  options,
  explanation,
  revealFrame = 180,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const revealed = frame >= revealFrame;
  const labels = ['A', 'B', 'C', 'D'];

  // Question animation
  const qOpacity = fadeIn(frame, 0, 25);
  const qY = slideInUp(frame, 0, fps, 30, 'snappy');

  // Explanation (after reveal)
  const explOpacity = fadeIn(frame, revealFrame + 40, 25);
  const explY = slideInUp(frame, revealFrame + 40, fps, 20, 'snappy');

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgScene,
        padding: SIZES.paddingScene,
        fontFamily: FONTS.title,
        justifyContent: 'center',
      }}
    >
      {/* ── Quiz badge ─────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: SIZES.paddingScene,
          left: SIZES.paddingScene,
          backgroundColor: COLORS.accentBlueSoft,
          color: COLORS.accentBlue,
          fontFamily: FONTS.body,
          fontWeight: FONT_WEIGHTS.semibold,
          fontSize: SIZES.fontSmall,
          padding: '6px 20px',
          borderRadius: SIZES.radiusPill,
          opacity: fadeIn(frame, 0, 15),
        }}
      >
        Ejercicio
      </div>

      {/* ── Question ───────────────────────────────────────────── */}
      <div
        style={{
          opacity: qOpacity,
          transform: `translateY(${qY}px)`,
          fontSize: SIZES.fontH2,
          fontWeight: FONT_WEIGHTS.bold,
          color: COLORS.fgTitle,
          marginBottom: 48,
          lineHeight: SIZES.lineHeightTight,
          maxWidth: 1400,
        }}
      >
        {question}
      </div>

      {/* ── Options 2×2 grid ───────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: options.length <= 2 ? '1fr' : '1fr 1fr',
          gap: 24,
          maxWidth: 1400,
        }}
      >
        {options.map((opt, i) => (
          <OptionCard
            key={i}
            option={opt}
            index={i}
            frame={frame}
            fps={fps}
            revealed={revealed}
            label={labels[i] ?? String(i + 1)}
          />
        ))}
      </div>

      {/* ── Explanation ────────────────────────────────────────── */}
      {explanation && revealed && (
        <div
          style={{
            opacity: explOpacity,
            transform: `translateY(${explY}px)`,
            marginTop: 40,
            backgroundColor: COLORS.bgPositive,
            border: `1px solid ${COLORS.accentGreen}`,
            borderRadius: SIZES.radiusMedium,
            padding: '20px 28px',
            maxWidth: 1400,
          }}
        >
          <div
            style={{
              fontFamily: FONTS.body,
              fontWeight: FONT_WEIGHTS.medium,
              fontSize: SIZES.fontBody,
              color: COLORS.fgTitle,
              lineHeight: SIZES.lineHeightRelaxed,
            }}
          >
            <span
              style={{
                fontWeight: FONT_WEIGHTS.bold,
                color: COLORS.accentGreen,
                marginRight: 8,
              }}
            >
              💡
            </span>
            {explanation}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

export default QuizScene;
