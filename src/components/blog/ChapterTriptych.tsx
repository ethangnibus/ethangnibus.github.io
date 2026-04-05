import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { LetterboxBars } from "@/components/blog/LetterboxBars";
import {
  getPageCardMeta,
  SITE_SCROLL_CONTAINER_ID,
  type BlogPage,
  type Project,
} from "@/data/projects";
import { APP_PALETTE, NAVBAR_SURFACE } from "@/theme";

// ─── helpers ─────────────────────────────────────────────────────────────────

function glow(rgbTriple: string, alpha = 0.35) {
  return `0 0 12px rgba(${rgbTriple}, ${alpha})`;
}

function categoryGlow(category: "cv" | "graphics") {
  return category === "cv"
    ? glow(APP_PALETTE.categoryCvRgb)
    : glow(APP_PALETTE.categoryGraphicsRgb);
}

interface SlotInfo {
  image: string;
  label: string;
  activeBg: string;
  glowShadow: string;
  href: string;
}

function getSlotInfo(page: BlogPage, fallback: Project): SlotInfo {
  const meta = getPageCardMeta(page, fallback);
  const activeBg = meta.color ?? APP_PALETTE.textBody;
  const glowShadow =
    page.kind !== "end"
      ? categoryGlow(page.project.category)
      : glow(APP_PALETTE.textBodyRgb, 0.3);

  return {
    image: meta.image,
    label: meta.eyebrow,
    activeBg,
    glowShadow,
    href: meta.href,
  };
}

// ─── sub-components ───────────────────────────────────────────────────────────

/** Active (current-page) slot — highlighted, links back to self and scrolls to top. */
function ActiveSlot({ info }: { info: SlotInfo }) {
  return (
    <Link
      to={info.href}
      onClick={() => document.getElementById(SITE_SCROLL_CONTAINER_ID)?.scrollTo({ top: 0 })}
      aria-label={`Current page: ${info.label} — scroll to top`}
      className="group relative w-full overflow-hidden rounded-[3px] aspect-[1.618/1] border-2 block transition-all duration-200"
      style={{
        borderColor: NAVBAR_SURFACE.border,
        boxShadow: info.glowShadow,
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center scale-[1.04]"
        style={{ backgroundImage: `url(${info.image})` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(0,0,0,0.18) 0%, ${info.activeBg}CC 100%)`,
        }}
      />
      <LetterboxBars barBackground={NAVBAR_SURFACE.gradient} />
      <span className="app-eyebrow relative z-10 block px-2 py-3 text-white text-center text-balance">
        {info.label}
      </span>
    </Link>
  );
}

/** Inactive (navigable) slot — dark gradient, link. */
function LinkSlot({ info, direction }: { info: SlotInfo; direction: "prev" | "next" }) {
  return (
    <Link
      to={info.href}
      aria-label={`${direction === "prev" ? "Previous" : "Next"}: ${info.label}`}
      className="group relative w-full overflow-hidden rounded-[3px] aspect-[1.618/1] border block transition-all duration-200"
      style={{
        borderColor: APP_PALETTE.carouselThumbBorderInactive,
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out can-hover:group-hover:scale-[1.04]"
        style={{ backgroundImage: `url(${info.image})` }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.52) 100%)",
        }}
      />
      <LetterboxBars />
      {/* Arrow — decorative, scales up on hover on pointer devices */}
      <span
        className="absolute inset-0 z-10 flex items-center justify-center text-white text-xl transition-transform duration-300 ease-out can-hover:group-hover:scale-125 pointer-events-none"
        aria-hidden
      >
        {direction === "prev" ? "←" : "→"}
      </span>
      <span className="app-eyebrow relative z-10 block px-2 py-3 text-white text-center text-balance">
        {info.label}
      </span>
    </Link>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

interface ChapterTriptychProps {
  /** The page to the left — null renders nothing in that slot. */
  previous: BlogPage | null;
  /** The currently-active page — null renders nothing in that slot. */
  current: BlogPage | null;
  /** The page to the right — null renders nothing in that slot. */
  next: BlogPage | null;
  /** Project used as image fallback for the global-end page. */
  project: Project;
  /**
   * When set (e.g. top-of-page chapter nav), shows a back link above the chapter row,
   * inside the same max-width column as the cards so left edges align.
   */
  backToProject?: { href: string; label: string; accentColor: string };
}

export function ChapterTriptych({
  previous,
  current,
  next,
  project,
  backToProject,
}: ChapterTriptychProps) {
  const currentInfo = current ? getSlotInfo(current, project) : null;

  const grid = (
    <>
      {/* Left — previous (skip TOC pages) */}
      {previous && previous.kind !== "project" ? (
        <LinkSlot info={getSlotInfo(previous, project)} direction="prev" />
      ) : (
        <div />
      )}

      {/* Center — current (active) */}
      {currentInfo ? <ActiveSlot info={currentInfo} /> : <div />}

      {/* Right — next */}
      {next ? (
        <LinkSlot info={getSlotInfo(next, project)} direction="next" />
      ) : (
        <div />
      )}
    </>
  );

  return (
    <div
      className="py-2 px-2.5 border-y"
      style={{
        backgroundColor: `rgba(${APP_PALETTE.woodLineRgb}, 0.15)`,
        borderColor: `rgba(${APP_PALETTE.woodLineRgb}, 0.22)`,
      }}
    >
      {backToProject ? (
        <div className="max-w-3xl mx-auto">
          <div className="pb-2">
            <Link
              to={backToProject.href}
              className="app-eyebrow inline-flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-70"
              style={{ color: backToProject.accentColor }}
            >
              <ArrowLeft size={14} strokeWidth={2} />
              {backToProject.label}
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2">{grid}</div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-2">{grid}</div>
      )}
    </div>
  );
}
