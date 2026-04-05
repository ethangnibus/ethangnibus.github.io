/**
 * Shared letterbox bar pair that slides in on hover.
 *
 * Two strategies:
 *  - "height"    — bars grow from h-0 → h-[8%] on group-hover (used for thumbnails)
 *  - "translate" — bars slide in from off-screen on group-hover (used for hero images)
 *
 * Both strategies are gated behind `can-hover` so they never fire on touch devices.
 */

interface LetterboxBarsProps {
  /** CSS `background` value for both bars. Defaults to black. */
  barBackground?: string;
  /** Animation strategy. Default "height". */
  strategy?: "height" | "translate";
}

export function LetterboxBars({
  barBackground = "black",
  strategy = "height",
}: LetterboxBarsProps) {
  const common =
    "absolute left-0 right-0 z-[5] pointer-events-none";

  if (strategy === "translate") {
    return (
      <>
        <div
          className={`${common} top-0 h-[8%] -translate-y-full transition-transform duration-500 can-hover:group-hover:translate-y-0`}
          style={{ background: barBackground }}
          aria-hidden
        />
        <div
          className={`${common} bottom-0 h-[8%] translate-y-full transition-transform duration-500 can-hover:group-hover:translate-y-0`}
          style={{ background: barBackground }}
          aria-hidden
        />
      </>
    );
  }

  // Default: height strategy
  return (
    <>
      <div
        className={`${common} top-0 h-0 transition-[height] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] can-hover:group-hover:h-[8%]`}
        style={{ background: barBackground }}
        aria-hidden
      />
      <div
        className={`${common} bottom-0 h-0 transition-[height] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] can-hover:group-hover:h-[8%]`}
        style={{ background: barBackground }}
        aria-hidden
      />
    </>
  );
}
