import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  getPageColor,
  getPagePath,
  getPageTitle,
  SITE_SCROLL_CONTAINER_ID,
  type BlogPage,
} from "@/data/projects";

/** Matches the fixed navbar height (h-14 = 56px). */
const NAVBAR_HEIGHT = 56;
/** Minimum gutter width (each side) before showing the buttons. */
const MIN_GUTTER = 48;
/** Max-w-3xl in pixels (48rem at 16px base). */
const MAX_CONTENT_W = 768;

function useMainContentWidth() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = document.getElementById(SITE_SCROLL_CONTAINER_ID);
    if (!el) return;
    const update = () => setWidth(el.getBoundingClientRect().width);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return width;
}

interface BlogGutterNavProps {
  previous: BlogPage | null;
  next: BlogPage | null;
}

export function BlogGutterNav({ previous, next }: BlogGutterNavProps) {
  const contentWidth = useMainContentWidth();
  const gutterW = (contentWidth - MAX_CONTENT_W) / 2;
  const hasGutter = gutterW >= MIN_GUTTER;

  if (!hasGutter) return null;

  const btnBase =
    "flex flex-col items-center gap-1 px-2 py-2.5 rounded-[3px] transition-all duration-150";

  const pillStyle = {
    background: `linear-gradient(to bottom, var(--app-pill-wood-bg-top) 0%, var(--app-pill-wood-bg-bottom) 100%)`,
    borderColor: `var(--app-pill-wood-border)`,
    boxShadow: "0 2px 8px rgba(0,0,0,0.14), inset 0 -1px 0 rgba(255,255,255,0.65)",
  };

  return (
    <>
      {/* Left / Previous */}
      <div
        className="fixed z-40 pointer-events-none"
        style={{ top: NAVBAR_HEIGHT + 16, left: "var(--blog-main-left, 0px)" }}
      >
        <div className="pointer-events-auto pl-3">
          {previous ? (
            <Link
              to={getPagePath(previous)}
              aria-label={`Previous: ${getPageTitle(previous)}`}
              className={`${btnBase} border opacity-50 can-hover:hover:opacity-100`}
              style={{ ...pillStyle, color: getPageColor(previous) }}
            >
              <ChevronLeft className="w-5 h-5 text-app-body" aria-hidden />
              <span className="app-eyebrow text-app-body/60 leading-none" style={{ fontSize: "0.5625rem" }}>
                PREV
              </span>
            </Link>
          ) : (
            <div
              className={`${btnBase} border opacity-15 pointer-events-none`}
              style={pillStyle}
              aria-hidden
            >
              <ChevronLeft className="w-5 h-5 text-app-body" aria-hidden />
              <span className="app-eyebrow text-app-body/60 leading-none" style={{ fontSize: "0.5625rem" }}>
                PREV
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Right / Next */}
      <div
        className="fixed z-40 pointer-events-none"
        style={{
          top: NAVBAR_HEIGHT + 16,
          left: "calc(var(--blog-main-left, 0px) + var(--blog-main-width, 100vw))",
          transform: "translateX(-100%)",
        }}
      >
        <div className="pointer-events-auto pr-3">
          {next ? (
            <Link
              to={getPagePath(next)}
              aria-label={`Next: ${getPageTitle(next)}`}
              className={`${btnBase} border opacity-50 can-hover:hover:opacity-100`}
              style={{ ...pillStyle, color: getPageColor(next) }}
            >
              <ChevronRight className="w-5 h-5 text-app-body" aria-hidden />
              <span className="app-eyebrow text-app-body/60 leading-none" style={{ fontSize: "0.5625rem" }}>
                NEXT
              </span>
            </Link>
          ) : (
            <div
              className={`${btnBase} border opacity-15 pointer-events-none`}
              style={pillStyle}
              aria-hidden
            >
              <ChevronRight className="w-5 h-5 text-app-body" aria-hidden />
              <span className="app-eyebrow text-app-body/60 leading-none" style={{ fontSize: "0.5625rem" }}>
                NEXT
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
