/**
 * Motion Graphics Components for Remotion — Golgotha Academy
 *
 * Production-ready motion graphics primitives inspired by:
 * - reactvideoeditor/remotion-templates (81 native effects)
 * - @remotion/transitions (TransitionSeries, fade, slide, wipe)
 * - @remotion/shapes (Rect, Circle, Triangle, Star, Polygon)
 *
 * All components are color-agnostic: they accept color props from the design tokens.
 * Import COLORS from './tokens' and pass them as props.
 */

import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from 'remotion';
import { COLORS, FONTS } from './tokens';

// ────────────────────────────────────────────────────────────────
// 1. KINETIC TYPOGRAPHY
// ────────────────────────────────────────────────────────────────

interface KineticTextProps {
  text: string;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number;
  /** Animation style: 'word' | 'character' | 'line' */
  mode?: 'word' | 'character' | 'line';
  /** Delay in frames between each unit */
  staggerFrames?: number;
  /** Start frame offset */
  startFrame?: number;
  /** Animation type for each unit */
  entrance?: 'fadeUp' | 'fadeIn' | 'scaleIn' | 'slideLeft' | 'slideRight' | 'bounceIn';
}

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  color = COLORS.fgTitleMain,
  fontSize = 48,
  fontFamily = FONTS.title,
  fontWeight = 800,
  mode = 'word',
  staggerFrames = 4,
  startFrame = 0,
  entrance = 'fadeUp',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const units =
    mode === 'character'
      ? text.split('')
      : mode === 'line'
        ? text.split('\n')
        : text.split(' ');

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: mode === 'character' ? 0 : fontSize * 0.3,
      }}
    >
      {units.map((unit, i) => {
        const unitStart = startFrame + i * staggerFrames;
        const localFrame = frame - unitStart;

        let opacity = 1;
        let translateY = 0;
        let translateX = 0;
        let scale = 1;

        if (entrance === 'fadeUp') {
          opacity = interpolate(localFrame, [0, 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          translateY = interpolate(localFrame, [0, 10], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        } else if (entrance === 'fadeIn') {
          opacity = interpolate(localFrame, [0, 12], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        } else if (entrance === 'scaleIn') {
          const s = spring({ frame: Math.max(0, localFrame), fps, config: { damping: 12, mass: 0.8, stiffness: 200 } });
          scale = s;
          opacity = interpolate(localFrame, [0, 5], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        } else if (entrance === 'slideLeft') {
          opacity = interpolate(localFrame, [0, 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          translateX = interpolate(localFrame, [0, 10], [60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        } else if (entrance === 'slideRight') {
          opacity = interpolate(localFrame, [0, 8], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
          translateX = interpolate(localFrame, [0, 10], [-60, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        } else if (entrance === 'bounceIn') {
          const s = spring({ frame: Math.max(0, localFrame), fps, config: { damping: 8, mass: 1, stiffness: 150 } });
          scale = s;
          translateY = interpolate(s, [0, 1], [40, 0]);
          opacity = interpolate(localFrame, [0, 3], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        }

        return (
          <span
            key={i}
            style={{
              display: 'inline-block',
              opacity,
              transform: `translateY(${translateY}px) translateX(${translateX}px) scale(${scale})`,
              color,
              fontSize,
              fontFamily,
              fontWeight,
              lineHeight: 1.2,
              whiteSpace: mode === 'character' ? 'pre' : 'normal',
            }}
          >
            {unit}
            {mode === 'word' && i < units.length - 1 ? '\u00A0' : ''}
          </span>
        );
      })}
    </div>
  );
};

// ────────────────────────────────────────────────────────────────
// 2. ANIMATED SHAPES (color-agnostic geometric primitives)
// ────────────────────────────────────────────────────────────────

interface AnimatedShapeProps {
  shape: 'circle' | 'rect' | 'triangle' | 'star' | 'hexagon';
  size?: number;
  color?: string;
  strokeColor?: string;
  strokeWidth?: number;
  /** Draw-on animation: animate stroke dash */
  drawOn?: boolean;
  /** Scale entrance via spring */
  scaleEntrance?: boolean;
  /** Rotation in degrees (animated per frame) */
  rotate?: boolean;
  rotateSpeed?: number;
  startFrame?: number;
  style?: React.CSSProperties;
}

export const AnimatedShape: React.FC<AnimatedShapeProps> = ({
  shape,
  size = 100,
  color = COLORS.accentGreen,
  strokeColor,
  strokeWidth = 3,
  drawOn = false,
  scaleEntrance = true,
  rotate = false,
  rotateSpeed = 2,
  startFrame = 0,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  const scale = scaleEntrance
    ? spring({ frame: Math.max(0, localFrame), fps, config: { damping: 14, mass: 1, stiffness: 120 } })
    : 1;

  const rotation = rotate ? (localFrame * rotateSpeed) : 0;

  const paths: Record<string, string> = {
    circle: `M ${size / 2} 0 A ${size / 2} ${size / 2} 0 1 1 ${size / 2} ${size} A ${size / 2} ${size / 2} 0 1 1 ${size / 2} 0`,
    rect: `M 0 0 L ${size} 0 L ${size} ${size} L 0 ${size} Z`,
    triangle: `M ${size / 2} 0 L ${size} ${size} L 0 ${size} Z`,
    star: generateStarPath(size / 2, size / 4, 5),
    hexagon: generatePolygonPath(size / 2, 6),
  };

  const path = paths[shape] || paths.circle;
  const pathLength = estimatePathLength(shape, size);

  const dashOffset = drawOn
    ? interpolate(localFrame, [0, 30], [pathLength, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 0;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        ...style,
      }}
    >
      <path
        d={path}
        fill={drawOn ? 'none' : color}
        stroke={strokeColor || color}
        strokeWidth={drawOn ? strokeWidth : 0}
        strokeDasharray={drawOn ? pathLength : undefined}
        strokeDashoffset={drawOn ? dashOffset : undefined}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

function generateStarPath(outerR: number, innerR: number, points: number): string {
  const cx = outerR;
  const cy = outerR;
  const parts: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = (Math.PI * i) / points - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    parts.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
  }
  return parts.join(' ') + ' Z';
}

function generatePolygonPath(r: number, sides: number): string {
  const cx = r;
  const cy = r;
  const parts: string[] = [];
  for (let i = 0; i < sides; i++) {
    const angle = (2 * Math.PI * i) / sides - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    parts.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
  }
  return parts.join(' ') + ' Z';
}

function estimatePathLength(shape: string, size: number): number {
  const r = size / 2;
  switch (shape) {
    case 'circle': return 2 * Math.PI * r;
    case 'rect': return 4 * size;
    case 'triangle': return 3 * size;
    case 'star': return 10 * (size / 2);
    case 'hexagon': return 6 * size * 0.5;
    default: return 4 * size;
  }
}

// ────────────────────────────────────────────────────────────────
// 3. STAT COUNTER (animated number count-up)
// ────────────────────────────────────────────────────────────────

interface StatCounterProps {
  from?: number;
  to: number;
  /** Duration in frames */
  duration?: number;
  startFrame?: number;
  prefix?: string;
  suffix?: string;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  formatNumber?: boolean;
}

export const StatCounter: React.FC<StatCounterProps> = ({
  from = 0,
  to,
  duration = 60,
  startFrame = 0,
  prefix = '',
  suffix = '',
  color = COLORS.fgTitleMain,
  fontSize = 72,
  fontFamily = FONTS.title,
  formatNumber = true,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  const progress = interpolate(localFrame, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const value = Math.round(from + (to - from) * progress);
  const display = formatNumber ? value.toLocaleString() : String(value);

  const opacity = interpolate(localFrame, [0, 8], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        fontFamily,
        fontSize,
        fontWeight: 800,
        color,
        opacity,
        textAlign: 'center',
      }}
    >
      {prefix}{display}{suffix}
    </div>
  );
};

// ────────────────────────────────────────────────────────────────
// 4. PROGRESS BAR (animated horizontal fill)
// ────────────────────────────────────────────────────────────────

interface ProgressBarProps {
  progress: number; // 0–1
  width?: number;
  height?: number;
  color?: string;
  bgColor?: string;
  borderRadius?: number;
  /** Duration in frames for the fill animation */
  duration?: number;
  startFrame?: number;
  showLabel?: boolean;
  labelColor?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  width = 600,
  height = 16,
  color = COLORS.accentGreen,
  bgColor = COLORS.bgNeutral,
  borderRadius = 8,
  duration = 45,
  startFrame = 0,
  showLabel = false,
  labelColor = COLORS.fgBody,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  const animatedProgress = interpolate(localFrame, [0, duration], [0, progress], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ width, height, backgroundColor: bgColor, borderRadius, overflow: 'hidden' }}>
        <div
          style={{
            width: `${animatedProgress * 100}%`,
            height: '100%',
            backgroundColor: color,
            borderRadius,
            transition: 'none',
          }}
        />
      </div>
      {showLabel && (
        <span style={{ fontFamily: FONTS.body, fontSize: 16, color: labelColor, fontWeight: 600 }}>
          {Math.round(animatedProgress * 100)}%
        </span>
      )}
    </div>
  );
};

// ────────────────────────────────────────────────────────────────
// 5. ANIMATED BAR CHART (data-driven animated bars)
// ────────────────────────────────────────────────────────────────

interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  width?: number;
  height?: number;
  barGap?: number;
  /** Duration in frames for each bar to fill */
  duration?: number;
  /** Stagger delay between bars */
  stagger?: number;
  startFrame?: number;
  labelColor?: string;
  valueColor?: string;
  showValues?: boolean;
}

export const AnimatedBarChart: React.FC<BarChartProps> = ({
  data,
  width = 800,
  height = 400,
  barGap = 16,
  duration = 30,
  stagger = 6,
  startFrame = 0,
  labelColor = COLORS.fgBody,
  valueColor = COLORS.fgTitle,
  showValues = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const maxValue = Math.max(...data.map((d) => d.value));
  const barWidth = (width - (data.length - 1) * barGap) / data.length;
  const chartColors = [COLORS.accentGreen, COLORS.accentBlue, COLORS.accentViolet, COLORS.accentAmber];

  return (
    <div style={{ width, height, display: 'flex', alignItems: 'flex-end', gap: barGap }}>
      {data.map((item, i) => {
        const barStart = startFrame + i * stagger;
        const localFrame = frame - barStart;
        const barColor = item.color || chartColors[i % chartColors.length];

        const barHeight = interpolate(localFrame, [0, duration], [0, (item.value / maxValue) * (height - 40)], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
          easing: Easing.out(Easing.cubic),
        });

        const opacity = interpolate(localFrame, [0, 8], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        return (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: barWidth, opacity }}>
            {showValues && (
              <span style={{ fontFamily: FONTS.body, fontSize: 14, fontWeight: 700, color: valueColor, marginBottom: 4 }}>
                {item.value}
              </span>
            )}
            <div style={{ width: barWidth, height: barHeight, backgroundColor: barColor, borderRadius: '6px 6px 0 0' }} />
            <span style={{ fontFamily: FONTS.body, fontSize: 12, color: labelColor, marginTop: 8, textAlign: 'center' }}>
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// ────────────────────────────────────────────────────────────────
// 6. PARTICLE BURST (decorative celebration effect)
// ────────────────────────────────────────────────────────────────

interface ParticleBurstProps {
  particleCount?: number;
  colors?: string[];
  startFrame?: number;
  duration?: number;
  originX?: number;
  originY?: number;
  spread?: number;
}

export const ParticleBurst: React.FC<ParticleBurstProps> = ({
  particleCount = 30,
  colors = [COLORS.accentGreen, COLORS.accentBlue, COLORS.accentViolet, COLORS.accentAmber],
  startFrame = 0,
  duration = 40,
  originX = 960,
  originY = 540,
  spread = 300,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  if (localFrame < 0 || localFrame > duration + 20) return null;

  const particles = React.useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      angle: (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5,
      speed: 0.5 + Math.random() * 0.5,
      size: 4 + Math.random() * 8,
      color: colors[i % colors.length],
      delay: Math.random() * 5,
    }));
  }, [particleCount, colors]);

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {particles.map((p, i) => {
        const pFrame = localFrame - p.delay;
        if (pFrame < 0) return null;

        const progress = interpolate(pFrame, [0, duration], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        const x = originX + Math.cos(p.angle) * spread * progress * p.speed;
        const y = originY + Math.sin(p.angle) * spread * progress * p.speed + progress * progress * 200;
        const opacity = interpolate(progress, [0, 0.7, 1], [1, 1, 0]);
        const scale = interpolate(progress, [0, 0.3, 1], [0, 1, 0.3]);

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: p.color,
              opacity,
              transform: `scale(${scale})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// ────────────────────────────────────────────────────────────────
// 7. ANIMATED LINE DRAW (SVG path draw-on)
// ────────────────────────────────────────────────────────────────

interface LineDrawProps {
  /** SVG path d attribute */
  path: string;
  viewBox?: string;
  color?: string;
  strokeWidth?: number;
  duration?: number;
  startFrame?: number;
  width?: number;
  height?: number;
}

export const LineDraw: React.FC<LineDrawProps> = ({
  path,
  viewBox = '0 0 200 200',
  color = COLORS.accentGreen,
  strokeWidth = 3,
  duration = 45,
  startFrame = 0,
  width = 200,
  height = 200,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  // Approximate path length (works for most cases)
  const pathLength = 1000;
  const drawProgress = interpolate(localFrame, [0, duration], [pathLength, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.quad),
  });

  return (
    <svg width={width} height={height} viewBox={viewBox}>
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={pathLength}
        strokeDashoffset={drawProgress}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// ────────────────────────────────────────────────────────────────
// 8. TEXT HIGHLIGHT (word-by-word highlight animation)
// ────────────────────────────────────────────────────────────────

interface TextHighlightProps {
  text: string;
  highlightWords: number[];
  highlightColor?: string;
  textColor?: string;
  highlightedTextColor?: string;
  fontSize?: number;
  fontFamily?: string;
  staggerFrames?: number;
  startFrame?: number;
}

export const TextHighlight: React.FC<TextHighlightProps> = ({
  text,
  highlightWords,
  highlightColor = COLORS.accentGreenSoft,
  textColor = COLORS.fgBody,
  highlightedTextColor = COLORS.fgTitle,
  fontSize = 24,
  fontFamily = FONTS.body,
  staggerFrames = 8,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const words = text.split(' ');

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 8px', lineHeight: 1.8 }}>
      {words.map((word, i) => {
        const isHighlighted = highlightWords.includes(i);
        const wordStart = startFrame + highlightWords.indexOf(i) * staggerFrames;
        const localFrame = frame - wordStart;

        const bgOpacity = isHighlighted
          ? interpolate(localFrame, [0, 10], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
          : 0;

        return (
          <span
            key={i}
            style={{
              fontSize,
              fontFamily,
              color: isHighlighted && bgOpacity > 0.5 ? highlightedTextColor : textColor,
              backgroundColor: isHighlighted ? `${highlightColor}` : 'transparent',
              opacity: isHighlighted ? undefined : 1,
              padding: isHighlighted ? '2px 8px' : 0,
              borderRadius: 6,
              transform: `scale(${isHighlighted ? interpolate(bgOpacity, [0, 1], [1, 1.05]) : 1})`,
              display: 'inline-block',
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};

// ────────────────────────────────────────────────────────────────
// 9. BRAND LOGO COMPONENT (SVG-based, animated)
// ────────────────────────────────────────────────────────────────

interface BrandLogoProps {
  /** Override the default SVG logo path */
  logoSvgPath?: string;
  text?: string;
  color?: string;
  textColor?: string;
  fontSize?: number;
  /** Scale animation via spring */
  animated?: boolean;
  startFrame?: number;
  showText?: boolean;
  size?: number;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  text = 'GOLGOTHA ACADEMY',
  color = COLORS.accentGreen,
  textColor,
  fontSize = 48,
  animated = true,
  startFrame = 0,
  showText = true,
  size = 80,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - startFrame;

  const scale = animated
    ? spring({ frame: Math.max(0, localFrame), fps, config: { damping: 14, mass: 1, stiffness: 100 } })
    : 1;

  const textOpacity = animated
    ? interpolate(localFrame, [10, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, transform: `scale(${scale})` }}>
      {/* Logo mark — use the SVG file via <img> or inline SVG */}
      <img
        src={require('./assets/logo-golgotha-academy.svg').default || './assets/logo-golgotha-academy.svg'}
        width={size}
        height={size}
        style={{ filter: `brightness(0) saturate(100%)` /* will be overridden by CSS */ }}
        alt="Golgotha Academy"
      />
      {showText && (
        <div
          style={{
            fontFamily: FONTS.title,
            fontSize,
            fontWeight: 800,
            color: textColor || color,
            opacity: textOpacity,
            letterSpacing: 4,
            textAlign: 'center',
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

// ────────────────────────────────────────────────────────────────
// 10. CARD FLIP (3D flip reveal)
// ────────────────────────────────────────────────────────────────

interface CardFlipProps {
  front: React.ReactNode;
  back: React.ReactNode;
  width?: number;
  height?: number;
  flipFrame?: number;
  duration?: number;
}

export const CardFlip: React.FC<CardFlipProps> = ({
  front,
  back,
  width = 400,
  height = 250,
  flipFrame = 45,
  duration = 20,
}) => {
  const frame = useCurrentFrame();

  const rotation = interpolate(frame, [flipFrame, flipFrame + duration], [0, 180], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });

  const showFront = rotation < 90;

  return (
    <div style={{ width, height, perspective: 1000 }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `rotateY(${rotation}deg)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            borderRadius: 16,
            overflow: 'hidden',
            backgroundColor: COLORS.bgCard,
            border: `1px solid ${COLORS.borderCard}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          {front}
        </div>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            borderRadius: 16,
            overflow: 'hidden',
            backgroundColor: COLORS.bgPositive,
            border: `2px solid ${COLORS.accentGreen}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          {back}
        </div>
      </div>
    </div>
  );
};
