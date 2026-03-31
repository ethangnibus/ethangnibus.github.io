interface ProjectedTextProps {
  children: React.ReactNode;
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

/**
 * Wraps text in a CMY (light bg) or RGB (dark bg) projector effect.
 *
 * Light backgrounds (dark=false, default):
 *   CMY primaries with mix-blend-mode: multiply → target color where layers overlap,
 *   chromatic fringing at sub-pixel-offset edges.
 *
 * Dark backgrounds (dark=true):
 *   RGB primaries with mix-blend-mode: screen → same principle, additive.
 *
 * Usage:
 *   <h1 className="font-mono text-5xl font-bold mb-6">
 *     <ProjectedText color="#0a0a1a">Who am I?</ProjectedText>
 *   </h1>
 *
 *   <h1 className="font-mono text-6xl font-bold text-white">
 *     <ProjectedText color="#ffffff" dark>Hi, I'm Ethan</ProjectedText>
 *   </h1>
 */
export function ProjectedText({
  children,
  color = "#0a0a1a",
  intensity = 1,
  dark = false,
}: ProjectedTextProps) {
  const t = Math.max(0, Math.min(1, intensity));
  const [r, g, b] = hexToRgb(color);

  const blend = dark ? "screen" : "multiply";

  // Light bg: CMY ink densities (subtractive)
  const cOpacity = 1 - r / 255;
  const mOpacity = 1 - g / 255;
  const yOpacity = 1 - b / 255;

  // Dark bg: RGB channel densities (additive)
  const rOpacity = r / 255;
  const gOpacity = g / 255;
  const bOpacity = b / 255;

  const abs = "absolute inset-0 pointer-events-none";

  return (
    <span className="relative inline-block">
      {/* Sizing + corona layer */}
      <span
        aria-hidden="true"
        className="select-none pointer-events-none"
        style={{
          color: dark ? color : "#1a0838",
          filter: `blur(${(dark ? 6 : 8) * t}px)`,
          opacity: (dark ? 0.25 : 0.12) * t,
        }}
      >
        {children}
      </span>

      {/* Accessible layer: invisible but readable by screen readers */}
      <span className={abs} style={{ color, opacity: 0 }}>
        {children}
      </span>

      {dark ? (
        <>
          {/* R — tight layer */}
          <span
            aria-hidden="true"
            className={abs}
            style={{
              color: "#FF0000",
              mixBlendMode: "screen",
              filter: `blur(${0.3 * t}px)`,
              opacity: rOpacity,
              transform: `translateX(${0.4 * t}px)`,
            }}
          >
            {children}
          </span>
          {/* R — wide layer */}
          <span
            aria-hidden="true"
            className={abs}
            style={{
              color: "#FF0000",
              mixBlendMode: "screen",
              filter: `blur(${0.8 * t}px)`,
              opacity: rOpacity * 0.5,
              transform: `translateX(${0.8 * t}px)`,
            }}
          >
            {children}
          </span>
          {/* G — tight layer */}
          <span
            aria-hidden="true"
            className={abs}
            style={{
              color: "#00FF00",
              mixBlendMode: "screen",
              filter: `blur(${0.3 * t}px)`,
              opacity: gOpacity,
              transform: `translateY(${-0.25 * t}px)`,
            }}
          >
            {children}
          </span>
          {/* G — wide layer */}
          <span
            aria-hidden="true"
            className={abs}
            style={{
              color: "#00FF00",
              mixBlendMode: "screen",
              filter: `blur(${0.8 * t}px)`,
              opacity: gOpacity * 0.5,
              transform: `translateY(${-0.5 * t}px)`,
            }}
          >
            {children}
          </span>
          {/* B — tight layer */}
          <span
            aria-hidden="true"
            className={abs}
            style={{
              color: "#0000FF",
              mixBlendMode: "screen",
              filter: `blur(${0.3 * t}px)`,
              opacity: bOpacity,
              transform: `translateX(${-0.4 * t}px)`,
            }}
          >
            {children}
          </span>
          {/* B — wide layer */}
          <span
            aria-hidden="true"
            className={abs}
            style={{
              color: "#0000FF",
              mixBlendMode: "screen",
              filter: `blur(${0.8 * t}px)`,
              opacity: bOpacity * 0.5,
              transform: `translateX(${-0.8 * t}px)`,
            }}
          >
            {children}
          </span>
        </>
      ) : (
        <>
          {/* C — tight layer */}
          <span
            aria-hidden="true"
            className={abs}
            style={{
              color: "#00FFFF",
              mixBlendMode: "multiply",
              filter: `blur(${0.3 * t}px)`,
              opacity: cOpacity,
              transform: `translateX(${-0.4 * t}px)`,
            }}
          >
            {children}
          </span>
          {/* C — wide layer */}
          <span
            aria-hidden="true"
            className={abs}
            style={{
              color: "#00FFFF",
              mixBlendMode: "multiply",
              filter: `blur(${0.8 * t}px)`,
              opacity: cOpacity * 0.5,
              transform: `translateX(${-0.8 * t}px)`,
            }}
          >
            {children}
          </span>
          {/* M — tight layer */}
          <span
            aria-hidden="true"
            className={abs}
            style={{
              color: "#FF00FF",
              mixBlendMode: "multiply",
              filter: `blur(${0.3 * t}px)`,
              opacity: mOpacity,
              transform: `translateX(${0.4 * t}px) translateY(${-0.25 * t}px)`,
            }}
          >
            {children}
          </span>
          {/* M — wide layer */}
          <span
            aria-hidden="true"
            className={abs}
            style={{
              color: "#FF00FF",
              mixBlendMode: "multiply",
              filter: `blur(${0.8 * t}px)`,
              opacity: mOpacity * 0.5,
              transform: `translateX(${0.8 * t}px) translateY(${-0.5 * t}px)`,
            }}
          >
            {children}
          </span>
          {/* Y — tight layer */}
          <span
            aria-hidden="true"
            className={abs}
            style={{
              color: "#FFFF00",
              mixBlendMode: "multiply",
              filter: `blur(${0.3 * t}px)`,
              opacity: yOpacity,
              transform: `translateY(${0.4 * t}px)`,
            }}
          >
            {children}
          </span>
          {/* Y — wide layer */}
          <span
            aria-hidden="true"
            className={abs}
            style={{
              color: "#FFFF00",
              mixBlendMode: "multiply",
              filter: `blur(${0.8 * t}px)`,
              opacity: yOpacity * 0.5,
              transform: `translateY(${0.8 * t}px)`,
            }}
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
}
