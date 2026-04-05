import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { getCssVarsForPath } from "@/theme";

// ── Color parsing / interpolation ─────────────────────────────────────────────

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function hexToRgb(s: string): [number, number, number] | null {
  const m = s.trim().match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return null;
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.round(v).toString(16).padStart(2, "0"))
      .join("")
  );
}

function parseRgba(s: string): [number, number, number, number] | null {
  const m = s
    .trim()
    .match(
      /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/,
    );
  if (!m) return null;
  return [
    parseFloat(m[1]),
    parseFloat(m[2]),
    parseFloat(m[3]),
    m[4] !== undefined ? parseFloat(m[4]) : 1,
  ];
}

/** "r, g, b" tuple string (used for --app-wood-line-rgb etc.) */
function parseTuple(s: string): [number, number, number] | null {
  const m = s.trim().match(/^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)$/);
  if (!m) return null;
  return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
}

function interpolate(from: string, to: string, t: number): string {
  if (from === to) return to;

  // "r, g, b" tuple
  const ft = parseTuple(from);
  const tt = parseTuple(to);
  if (ft && tt) {
    return `${Math.round(lerp(ft[0], tt[0], t))}, ${Math.round(lerp(ft[1], tt[1], t))}, ${Math.round(lerp(ft[2], tt[2], t))}`;
  }

  // #rrggbb hex
  const fh = hexToRgb(from);
  const th = hexToRgb(to);
  if (fh && th) {
    return rgbToHex(lerp(fh[0], th[0], t), lerp(fh[1], th[1], t), lerp(fh[2], th[2], t));
  }

  // rgba(...)
  const fr = parseRgba(from);
  const tr = parseRgba(to);
  if (fr && tr) {
    const r = lerp(fr[0], tr[0], t);
    const g = lerp(fr[1], tr[1], t);
    const b = lerp(fr[2], tr[2], t);
    const a = lerp(fr[3], tr[3], t);
    if (fr[3] === 1 && tr[3] === 1) {
      return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, 1)`;
    }
    return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a.toFixed(3)})`;
  }

  // Can't parse — snap at finish
  return t >= 1 ? to : from;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

const DURATION = 700;

export function usePaletteTransition() {
  const location = useLocation();
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const targetVars = getCssVarsForPath(location.pathname);
    const root = document.documentElement;

    // Cancel any in-flight animation
    if (rafRef.current !== undefined) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = undefined;
    }

    // Snap immediately when the user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      for (const [name, val] of Object.entries(targetVars)) {
        root.style.setProperty(name, val);
      }
      return;
    }

    // Snapshot current values
    const fromVars: Record<string, string> = {};
    for (const name of Object.keys(targetVars)) {
      const inline = root.style.getPropertyValue(name).trim();
      const computed = getComputedStyle(root).getPropertyValue(name).trim();
      fromVars[name] = inline || computed || targetVars[name];
    }

    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const raw = Math.min(elapsed / DURATION, 1);
      const t = easeInOut(raw);

      for (const [name, target] of Object.entries(targetVars)) {
        const from = fromVars[name] ?? target;
        root.style.setProperty(name, interpolate(from, target, t));
      }

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = undefined;
      }
    }

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== undefined) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = undefined;
      }
    };
  }, [location.pathname]);
}
