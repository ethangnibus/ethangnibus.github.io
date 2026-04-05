import type { MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  CATEGORY_META,
  getProjectOverviewPath,
  PORTFOLIO_HOME_PATH,
  PORTFOLIO_HOME_IMAGE,
  PROJECTS,
  SITE_NAV_LABELS,
} from "@/data/projects";
import { NAVBAR_SURFACE } from "@/theme";

/** Two fixed inset shadows so `box-shadow` can fade (interpolating alpha on the same form). */
function rowInsetHairlines(
  active: boolean,
  showTop: boolean,
  showBottom: boolean,
): string {
  const hairline = "var(--app-row-hairline)";
  const off = "rgba(0,0,0,0)";
  const top = !active && showTop ? hairline : off;
  const bottom = !active && showBottom ? hairline : off;
  return `inset 0 1px 0 0 ${top}, inset 0 -1px 0 0 ${bottom}`;
}

/** Matches hero carousel thumbnails: theme accent reads as dark brown / purple / red per portal. */
const rowSelected = "bg-[var(--app-accent)] text-white";
const rowHover = "hover:bg-black/[0.055]";
const linkPad =
  "flex w-full min-w-0 flex-col rounded-none text-left transition-[background-color,color,box-shadow] duration-300 ease-out";

/** Letterbox bars on image hover — same motion as `HeroProjectsCarousel` strip thumbnails. */
const letterboxBarEase = "duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]";
const letterboxBarBase = `absolute left-0 right-0 z-[5] h-0 pointer-events-none transition-[height] ${letterboxBarEase} can-hover:group-hover:h-[8%]`;

/** Tight inset; horizontal gutter matches the label row. */
const gutterX = "px-2.5 sm:px-3.5";

/** Top inset matches horizontal gutter (`gutterX`); no bottom pad so label spacing stays tight. */
const thumbWrapClass = `w-full shrink-0 ${gutterX} pb-0 pt-2.5 sm:pt-3.5`;

const thumbClass =
  "aspect-[16/10] w-full object-cover bg-[var(--app-card-warm)]";

const linkLabelClass = `block min-w-0 w-full truncate ${gutterX} pb-2 pt-1.5 text-[0.9375rem] font-sans leading-snug tracking-tight sm:pb-2.5 sm:pt-2`;

function handleSidebarLinkClick(
  e: MouseEvent<HTMLAnchorElement>,
  onNavigate?: () => void,
) {
  if (!onNavigate) return;
  if (e.defaultPrevented) return;
  if (e.button !== 0) return;
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  onNavigate();
}

function SidebarNavLink({
  to,
  label,
  thumbSrc,
  active,
  showTopBorder,
  showBottomBorder,
  inactiveAccentColor,
  onNavigate,
}: {
  to: string;
  label: string;
  thumbSrc: string;
  active: boolean;
  showTopBorder: boolean;
  showBottomBorder: boolean;
  inactiveAccentColor?: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={(e) => handleSidebarLinkClick(e, onNavigate)}
      className={`${linkPad} ${
        active
          ? `font-semibold ${rowSelected}`
          : `bg-transparent app-text-body ${rowHover} hover:text-[var(--app-text-strong)]`
      }`}
      style={{ boxShadow: rowInsetHairlines(active, showTopBorder, showBottomBorder) }}
    >
      <div className={thumbWrapClass}>
        <div
          className={`group relative w-full overflow-hidden rounded-sm border-2 transition-[border-color] duration-300 ease-out ${
            active ? "" : "border-transparent"
          }`}
          style={active ? { borderColor: NAVBAR_SURFACE.border } : undefined}
        >
          <img
            src={thumbSrc}
            alt=""
            className={thumbClass}
            width={680}
            height={425}
            sizes="(max-width: 639px) 100vw, 340px"
            loading="lazy"
            decoding="async"
          />
          <div
            className={`top-0 ${letterboxBarBase} ${active ? "" : "bg-black"}`}
            style={active ? { background: NAVBAR_SURFACE.gradient } : undefined}
            aria-hidden
          />
          <div
            className={`bottom-0 ${letterboxBarBase} ${active ? "" : "bg-black"}`}
            style={active ? { background: NAVBAR_SURFACE.gradient } : undefined}
            aria-hidden
          />
        </div>
      </div>
      <span
        className={`${linkLabelClass} ${active ? "font-semibold text-white/[0.96]" : "font-medium"} ${!active && inactiveAccentColor ? "opacity-[0.85]" : ""}`}
        style={
          !active && inactiveAccentColor
            ? { color: inactiveAccentColor }
            : undefined
        }
      >
        {label}
      </span>
    </Link>
  );
}

const GRAPHICS_SLUG = "learning-graphics";
const VISION_SLUG = "learning-vision";

export function BlogOutlineExplorer({
  onNavigate,
}: {
  /** Fullscreen / small sidebar: invoked after a normal in-app navigation click. */
  onNavigate?: () => void;
} = {}) {
  const { pathname } = useLocation();

  const graphicsProject = PROJECTS.find((p) => p.slug === GRAPHICS_SLUG);
  const visionProject = PROJECTS.find((p) => p.slug === VISION_SLUG);

  if (!graphicsProject || !visionProject) {
    return null;
  }

  const aboutActive = pathname === PORTFOLIO_HOME_PATH;
  const graphicsActive = pathname.startsWith(`/blog/${GRAPHICS_SLUG}`);
  const visionActive = pathname.startsWith(`/blog/${VISION_SLUG}`);

  return (
    <nav className="flex min-h-0 w-full flex-col gap-0 overflow-y-auto overflow-x-hidden text-left">
      <SidebarNavLink
        to={PORTFOLIO_HOME_PATH}
        label={SITE_NAV_LABELS.aboutMe}
        thumbSrc={PORTFOLIO_HOME_IMAGE}
        active={aboutActive}
        showTopBorder={false}
        showBottomBorder={false}
        onNavigate={onNavigate}
      />
      <SidebarNavLink
        to={getProjectOverviewPath(graphicsProject.slug)}
        label={CATEGORY_META.graphics.label}
        thumbSrc={graphicsProject.image}
        active={graphicsActive}
        showTopBorder={!aboutActive}
        showBottomBorder={!visionActive}
        inactiveAccentColor={CATEGORY_META.graphics.color}
        onNavigate={onNavigate}
      />
      <SidebarNavLink
        to={getProjectOverviewPath(visionProject.slug)}
        label={CATEGORY_META.cv.label}
        thumbSrc={visionProject.image}
        active={visionActive}
        showTopBorder={!graphicsActive}
        showBottomBorder
        inactiveAccentColor={CATEGORY_META.cv.color}
        onNavigate={onNavigate}
      />
    </nav>
  );
}
