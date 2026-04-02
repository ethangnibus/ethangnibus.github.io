import { forwardRef } from "react";

import { APP_PALETTE } from "@/theme";

/* ── Pattern variant names ────────────────────────────────────── */

export type PatternVariant =
  | "close-grid"
  | "far-grid"
  | "close-fslash"
  | "far-fslash"
  | "close-bslash"
  | "far-bslash"
  | "vertical-lines";

export interface PatternStyleOptions {
  bgColor?: string;
  lineRgb?: string;
  lineOpacity?: number;
}

/* ── Material presets ────────────────────────────────────────── */

export interface MaterialPreset {
  bgColor: string;
  lineRgb: string;
  lineOpacity: number;
}

export const WOOD_MATERIAL: MaterialPreset = {
  bgColor: APP_PALETTE.surfaceBase,
  lineRgb: APP_PALETTE.woodLinePatternRgb,
  lineOpacity: 0.15,
};

export const BARK_MATERIAL: MaterialPreset = {
  bgColor: APP_PALETTE.barkBase,
  lineRgb: APP_PALETTE.barkLinePatternRgb,
  lineOpacity: 0.12,
};

/* ── Constants ────────────────────────────────────────────────── */

const CLOSE_SIZE = "50px 50px";
const FAR_SIZE = "31.41592653589793px 31.41592653589793px";

/* ── Background-image builders ────────────────────────────────── */

function gridBg(rgb: string, op: number) {
  return [
    `linear-gradient(rgba(${rgb}, ${op}) 1px, transparent 1px)`,
    `linear-gradient(90deg, rgba(${rgb}, ${op}) 1px, transparent 1px)`,
  ].join(", ");
}

function verticalLinesBg(rgb: string, op: number, spacing: number) {
  return `repeating-linear-gradient(90deg, transparent 0px, transparent ${spacing - 1}px, rgba(${rgb}, ${op}) ${spacing - 1}px, rgba(${rgb}, ${op}) ${spacing}px)`;
}

function slashBg(deg: number, rgb: string, op: number, spacing: number) {
  const g1 = spacing - 1;
  const s1 = spacing;
  const g2 = spacing * 2 - 1;
  const s2 = spacing * 2;
  return `repeating-linear-gradient(${deg}deg, transparent 0px, transparent ${g1}px, rgba(${rgb}, ${op}) ${g1}px, rgba(${rgb}, ${op}) ${s1}px, transparent ${s1}px, transparent ${g2}px, rgba(${rgb}, ${op}) ${g2}px, rgba(${rgb}, ${op}) ${s2}px)`;
}

/* ── Core style builder ──────────────────────────────────────── */

function buildPatternStyle(
  variant: PatternVariant,
  bgColor: string,
  lineRgb: string,
  lineOpacity: number,
): React.CSSProperties {
  switch (variant) {
    case "close-grid":
      return {
        backgroundColor: bgColor,
        backgroundImage: gridBg(lineRgb, lineOpacity),
        backgroundSize: CLOSE_SIZE,
      };
    case "far-grid":
      return {
        backgroundColor: bgColor,
        backgroundImage: gridBg(lineRgb, lineOpacity),
        backgroundSize: FAR_SIZE,
      };
    case "close-fslash":
      return {
        backgroundColor: bgColor,
        backgroundImage: slashBg(-60, lineRgb, lineOpacity, 25),
      };
    case "far-fslash":
      return {
        backgroundColor: bgColor,
        backgroundImage: slashBg(-60, lineRgb, lineOpacity, 15),
      };
    case "close-bslash":
      return {
        backgroundColor: bgColor,
        backgroundImage: slashBg(60, lineRgb, lineOpacity, 25),
      };
    case "far-bslash":
      return {
        backgroundColor: bgColor,
        backgroundImage: slashBg(60, lineRgb, lineOpacity, 15),
      };
    case "vertical-lines":
      return {
        backgroundColor: bgColor,
        backgroundImage: verticalLinesBg(lineRgb, lineOpacity, 22),
      };
  }
}

/* ── Public style helpers ────────────────────────────────────── */

export function patternStyle(
  variant: PatternVariant,
  opts?: PatternStyleOptions,
): React.CSSProperties {
  return buildPatternStyle(
    variant,
    opts?.bgColor ?? WOOD_MATERIAL.bgColor,
    opts?.lineRgb ?? WOOD_MATERIAL.lineRgb,
    opts?.lineOpacity ?? WOOD_MATERIAL.lineOpacity,
  );
}

export function woodPatternStyle(
  variant: PatternVariant,
  opts?: PatternStyleOptions,
): React.CSSProperties {
  return buildPatternStyle(
    variant,
    opts?.bgColor ?? WOOD_MATERIAL.bgColor,
    opts?.lineRgb ?? WOOD_MATERIAL.lineRgb,
    opts?.lineOpacity ?? WOOD_MATERIAL.lineOpacity,
  );
}

export function barkPatternStyle(
  variant: PatternVariant,
  opts?: PatternStyleOptions,
): React.CSSProperties {
  return buildPatternStyle(
    variant,
    opts?.bgColor ?? BARK_MATERIAL.bgColor,
    opts?.lineRgb ?? BARK_MATERIAL.lineRgb,
    opts?.lineOpacity ?? BARK_MATERIAL.lineOpacity,
  );
}

/* ── Component wrapper factory ──────────────────────────────── */

interface PatternProps extends React.HTMLAttributes<HTMLDivElement> {
  bgColor?: string;
  lineRgb?: string;
  lineOpacity?: number;
}

export function makePatternComponent(
  variant: PatternVariant,
  material: MaterialPreset,
  name: string,
) {
  const Comp = forwardRef<HTMLDivElement, PatternProps>(
    ({ bgColor, lineRgb, lineOpacity, style, ...rest }, ref) => (
      <div
        ref={ref}
        style={{
          ...buildPatternStyle(
            variant,
            bgColor ?? material.bgColor,
            lineRgb ?? material.lineRgb,
            lineOpacity ?? material.lineOpacity,
          ),
          ...style,
        }}
        {...rest}
      />
    ),
  );
  Comp.displayName = name;
  return Comp;
}

/* ── Wood components (backward-compatible default exports) ──── */

export const CloseUpGrid = makePatternComponent("close-grid", WOOD_MATERIAL, "CloseUpGrid");
export const FarAwayGrid = makePatternComponent("far-grid", WOOD_MATERIAL, "FarAwayGrid");
export const CloseUpForwardSlash = makePatternComponent("close-fslash", WOOD_MATERIAL, "CloseUpForwardSlash");
export const FarAwayForwardSlash = makePatternComponent("far-fslash", WOOD_MATERIAL, "FarAwayForwardSlash");
export const CloseUpBackSlash = makePatternComponent("close-bslash", WOOD_MATERIAL, "CloseUpBackSlash");
export const FarAwayBackSlash = makePatternComponent("far-bslash", WOOD_MATERIAL, "FarAwayBackSlash");
export const VerticalLines = makePatternComponent("vertical-lines", WOOD_MATERIAL, "VerticalLines");
