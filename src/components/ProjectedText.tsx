import type { CSSProperties, ReactNode } from "react";

interface ProjectedTextProps {
  /**
   * Plain string label — single source for every projected layer (preferred when the content is text).
   */
  text?: string;
  children?: ReactNode;
  /** Target text color (hex). CMY/RGB ink densities are derived from this. */
  color?: string;
  /**
   * Effect intensity from 0 (no effect) to 1 (full). Defaults to 1.
   * Controls CA offsets, blur radius, and corona — not color opacity.
   */
  intensity?: number;
  /**
   * Set true for dark backgrounds. Uses RGB primaries + screen blend (additive).
   * Default (false) uses CMY primaries + multiply blend (subtractive, for light bgs).
   */
  dark?: boolean;
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const full = clean.length === 3
    ? clean.split("").map(c => c + c).join("")
    : clean;
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

type LayerDef = {
  key: string;
  style: CSSProperties;
};

function buildDarkLayers(
  t: number,
  rOpacity: number,
  gOpacity: number,
  bOpacity: number,
): LayerDef[] {
  return [
    {
      key: "r-t",
      style: {
        color: "#FF0000",
        mixBlendMode: "screen",
        filter: `blur(${0.3 * t}px)`,
        opacity: rOpacity,
        transform: `translateX(${0.4 * t}px)`,
      },
    },
    {
      key: "r-w",
      style: {
        color: "#FF0000",
        mixBlendMode: "screen",
        filter: `blur(${0.8 * t}px)`,
        opacity: rOpacity * 0.5,
        transform: `translateX(${0.8 * t}px)`,
      },
    },
    {
      key: "g-t",
      style: {
        color: "#00FF00",
        mixBlendMode: "screen",
        filter: `blur(${0.3 * t}px)`,
        opacity: gOpacity,
        transform: `translateY(${-0.25 * t}px)`,
      },
    },
    {
      key: "g-w",
      style: {
        color: "#00FF00",
        mixBlendMode: "screen",
        filter: `blur(${0.8 * t}px)`,
        opacity: gOpacity * 0.5,
        transform: `translateY(${-0.5 * t}px)`,
      },
    },
    {
      key: "b-t",
      style: {
        color: "#0000FF",
        mixBlendMode: "screen",
        filter: `blur(${0.3 * t}px)`,
        opacity: bOpacity,
        transform: `translateX(${-0.4 * t}px)`,
      },
    },
    {
      key: "b-w",
      style: {
        color: "#0000FF",
        mixBlendMode: "screen",
        filter: `blur(${0.8 * t}px)`,
        opacity: bOpacity * 0.5,
        transform: `translateX(${-0.8 * t}px)`,
      },
    },
  ];
}

function buildLightLayers(
  t: number,
  cOpacity: number,
  mOpacity: number,
  yOpacity: number,
): LayerDef[] {
  return [
    {
      key: "c-t",
      style: {
        color: "#00FFFF",
        mixBlendMode: "multiply",
        filter: `blur(${0.3 * t}px)`,
        opacity: cOpacity,
        transform: `translateX(${-0.4 * t}px)`,
      },
    },
    {
      key: "c-w",
      style: {
        color: "#00FFFF",
        mixBlendMode: "multiply",
        filter: `blur(${0.8 * t}px)`,
        opacity: cOpacity * 0.5,
        transform: `translateX(${-0.8 * t}px)`,
      },
    },
    {
      key: "m-t",
      style: {
        color: "#FF00FF",
        mixBlendMode: "multiply",
        filter: `blur(${0.3 * t}px)`,
        opacity: mOpacity,
        transform: `translateX(${0.4 * t}px) translateY(${-0.25 * t}px)`,
      },
    },
    {
      key: "m-w",
      style: {
        color: "#FF00FF",
        mixBlendMode: "multiply",
        filter: `blur(${0.8 * t}px)`,
        opacity: mOpacity * 0.5,
        transform: `translateX(${0.8 * t}px) translateY(${-0.5 * t}px)`,
      },
    },
    {
      key: "y-t",
      style: {
        color: "#FFFF00",
        mixBlendMode: "multiply",
        filter: `blur(${0.3 * t}px)`,
        opacity: yOpacity,
        transform: `translateY(${0.4 * t}px)`,
      },
    },
    {
      key: "y-w",
      style: {
        color: "#FFFF00",
        mixBlendMode: "multiply",
        filter: `blur(${0.8 * t}px)`,
        opacity: yOpacity * 0.5,
        transform: `translateY(${0.8 * t}px)`,
      },
    },
  ];
}

/**
 * Wraps text in a CMY (light bg) or RGB (dark bg) projector effect.
 * Pass `text="Hello"` so the string is not duplicated in your JSX; all layers read from one value.
 */
export function ProjectedText({
  text,
  children,
  color = "#0a0a1a",
  intensity = 1,
  dark = false,
}: ProjectedTextProps) {
  const t = Math.max(0, Math.min(1, intensity));
  const [r, g, b] = hexToRgb(color);

  const content: ReactNode = text !== undefined && text !== "" ? text : children;

  const plainA11y =
    text !== undefined && text !== ""
      ? text
      : typeof children === "string" || typeof children === "number"
        ? String(children)
        : undefined;

  /** Icons / rich nodes: treat as decorative; parent should set `aria-label` (e.g. icon buttons). */
  const decorativeOnly = plainA11y == null;

  const [rR, gR, bR] = [r / 255, g / 255, b / 255];
  const cOpacity = 1 - r / 255;
  const mOpacity = 1 - g / 255;
  const yOpacity = 1 - b / 255;

  const layers = dark
    ? buildDarkLayers(t, rR, gR, bR)
    : buildLightLayers(t, cOpacity, mOpacity, yOpacity);

  const abs =
    "absolute inset-0 pointer-events-none select-none";

  return (
    <span
      className="relative inline-block"
      aria-hidden={decorativeOnly ? true : undefined}
    >
      {/* Sizing + corona layer */}
      <span
        aria-hidden={plainA11y != null ? true : undefined}
        className="select-none pointer-events-none"
        style={{
          color: dark ? color : "#1a0838",
          filter: `blur(${(dark ? 6 : 8) * t}px)`,
          opacity: (dark ? 0.25 : 0.12) * t,
        }}
      >
        {content}
      </span>

      {plainA11y != null ? (
        <span className="sr-only">{plainA11y}</span>
      ) : null}

      {layers.map(({ key, style }) => (
        <span
          key={key}
          aria-hidden="true"
          className={abs}
          style={style}
        >
          {content}
        </span>
      ))}
    </span>
  );
}
