/**
 * StepByStepScene.tsx — Sequential walkthrough scene
 *
 * ~600 frames (20 s @ 30 fps)
 *
 * Timeline:
 *   0-25     Title + progress bar animate in
 *   30+      Steps reveal one-by-one with stagger
 *            Active step is highlighted, previous steps dim
 *            Progress bar advances per step
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
  progressBar,
  staggerDelay,
} from './animations';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export interface Step {
  title: string;
  description: string;
}

export interface StepByStepSceneProps {
  /** Scene title */
  title: string;
  /** Ordered steps (max ~6 recommended) */
  steps: Step[];
  /** Frames each step stays as "active" before the next appears */
  framesPerStep?: number;
  /** Accent override */
  accent?: string;
  accentSoft?: string;
}

/* ------------------------------------------------------------------ */
/*  Step card                                                         */
/* ------------------------------------------------------------------ */

const StepCard: React.FC<{
  step: Step;
  index: number;
  total: number;
  frame: number;
  fps: number;
  framesPerStep: number;
  accent: string;
  accentSoft: string;
}> = ({ step, index, total, frame, fps, framesPerStep, accent, accentSoft }) => {
  const enterFrame = 30 + index * framesPerStep;
  const opacity = fadeIn(frame, enterFrame, 20);
  const x = slideInLeft(frame, enterFrame, fps, 60, 'snappy');

  // Status logic
  const activeFrom = enterFrame;
  const activeUntil = enterFrame + framesPerStep;
  const isActive = frame >= activeFrom && frame < activeUntil;
  const isCompleted = frame >= activeUntil;

  const circleBg = isActive
    ? accent
    : isCompleted
    ? accent
    : COLORS.bgNeutral;
  const circleFg = isActive || isCompleted ? '#ffffff' : COLORS.fgBody;
  const cardBg = isActive ? COLORS.bgCard : 'transparent';
  const cardBorder = isActive ? COLORS.borderCard : 'transparent';
  const textOpacity = isActive ? 1 : isCompleted ? 0.55 : 1;

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${x}px)`,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 20,
        padding: 20,
        borderRadius: SIZES.radiusMedium,
        backgroundColor: cardBg,
        border: `1px solid ${cardBorder}`,
        boxShadow: isActive ? '0 4px 20px rgba(0,0,0,0.06)' : 'none',
      }}
    >
      {/* Number circle */}
      <div
        style={{
          width: SIZES.bulletSize + 8,
          height: SIZES.bulletSize + 8,
          borderRadius: '50%',
          backgroundColor: circleBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: FONTS.title,
          fontWeight: FONT_WEIGHTS.bold,
          fontSize: 22,
          color: circleFg,
          flexShrink: 0,
        }}
      >
        {isCompleted ? '✓' : index + 1}
      </div>

      {/* Text */}
      <div style={{ opacity: textOpacity }}>
        <div
          style={{
            fontFamily: FONTS.title,
            fontWeight: FONT_WEIGHTS.bold,
            fontSize: SIZES.fontH3 - 4,
            color: COLORS.fgTitle,
            marginBottom: 6,
          }}
        >
          {step.title}
        </div>
        <div
          style={{
            fontFamily: FONTS.body,
            fontWeight: FONT_WEIGHTS.regular,
            fontSize: SIZES.fontBody - 2,
            color: COLORS.fgBody,
            lineHeight: SIZES.lineHeightRelaxed,
          }}
        >
          {step.description}
        </div>
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export const StepByStepScene: React.FC<StepByStepSceneProps> = ({
  title,
  steps,
  framesPerStep = 90,
  accent = COLORS.accentGreen,
  accentSoft = COLORS.accentGreenSoft,
}) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  // ── Title anim ──────────────────────────────────────────────────
  const titleOpacity = fadeIn(frame, 0, 20);
  const titleY = slideInUp(frame, 0, fps, 30, 'snappy');

  // ── Progress bar ────────────────────────────────────────────────
  const totalStepFrames = steps.length * framesPerStep;
  const progress = progressBar(frame, 30, 30 + totalStepFrames);
  const barWidth = (width - SIZES.paddingScene * 2) * progress;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bgScene,
        padding: SIZES.paddingScene,
        fontFamily: FONTS.title,
      }}
    >
      {/* ── Progress bar (top) ─────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: SIZES.paddingScene,
          right: SIZES.paddingScene,
          height: SIZES.progressBarHeight,
          backgroundColor: COLORS.bgNeutral,
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: barWidth,
            height: '100%',
            backgroundColor: accent,
            borderRadius: 3,
          }}
        />
      </div>

      {/* ── Title ──────────────────────────────────────────────── */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          fontSize: SIZES.fontH2,
          fontWeight: FONT_WEIGHTS.bold,
          color: COLORS.fgTitle,
          marginBottom: 40,
          marginTop: 20,
        }}
      >
        {title}
      </div>

      {/* ── Steps list ─────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {steps.map((step, i) => (
          <StepCard
            key={i}
            step={step}
            index={i}
            total={steps.length}
            frame={frame}
            fps={fps}
            framesPerStep={framesPerStep}
            accent={accent}
            accentSoft={accentSoft}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

export default StepByStepScene;
