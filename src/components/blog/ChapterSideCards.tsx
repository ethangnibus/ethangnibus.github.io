import { Link } from "react-router-dom";

import { LetterboxBars } from "@/components/blog/LetterboxBars";
import {
  getPageCardMeta,
  type BlogPage,
  type Project,
} from "@/data/projects";
import { APP_PALETTE } from "@/theme";


interface ChapterSideCardsProps {
  project: Project;
  /** Pass null to hide the previous card (e.g. on the TOC page). */
  previous: BlogPage | null;
  /** Pass null to hide the next card (e.g. on the end page). */
  next: BlogPage | null;
}

/**
 * Inline prev/next chapter thumbnails — mirrors the hero carousel thumbnail style.
 * Constrained within the parent max-w container.
 */
export function ChapterSideCards({ project, previous, next }: ChapterSideCardsProps) {
  if (!previous && !next) return null;

  return (
    <div className="flex items-start justify-between gap-4 px-3 pt-10 pb-4">
      {/* Previous */}
      {previous ? (
        <SideCard page={previous} direction="previous" project={project} />
      ) : (
        <div className="flex-1" />
      )}

      {/* Next */}
      {next ? (
        <SideCard page={next} direction="next" project={project} />
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}

interface SideCardProps {
  page: BlogPage;
  direction: "previous" | "next";
  project: Project;
}

function SideCard({ page, direction, project }: SideCardProps) {
  const isPrev = direction === "previous";
  const meta = getPageCardMeta(page, project);
  const activeBg = meta.color ?? APP_PALETTE.textBody;

  return (
    <Link
      to={meta.href}
      aria-label={`${isPrev ? "Previous" : "Next"}: ${meta.eyebrow} — ${meta.title}`}
      className={`group flex flex-col ${isPrev ? "items-start" : "items-end"} flex-1 max-w-[44%] min-w-0`}
    >
      {/* Direction label */}
      <p className="app-eyebrow text-app-body/50 mb-2 leading-none" aria-hidden>
        {isPrev ? "← Previous Chapter" : "Next Chapter →"}
      </p>

      {/* Thumbnail — matches hero carousel thumbnail style exactly */}
      <div
        className="relative w-full overflow-hidden rounded-[3px] border transition-all duration-200"
        style={{
          aspectRatio: "1.618 / 1",
          borderColor: APP_PALETTE.carouselThumbBorderInactive,
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        {/* Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out can-hover:group-hover:scale-[1.04]"
          style={{ backgroundImage: `url(${meta.smallImage})` }}
        />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(0,0,0,0.18) 0%, ${activeBg}CC 100%)`,
          }}
        />

        <LetterboxBars strategy="translate" />

        {/* Chapter ordinal label on image */}
        <div className={`absolute bottom-0 ${isPrev ? "left-0" : "right-0"} px-2 pb-1.5 z-10`} aria-hidden>
          <p className="font-mono text-white/90 leading-none" style={{ fontSize: "0.5625rem" }}>
            {meta.eyebrow}
          </p>
        </div>
      </div>

      {/* Title below image */}
      <p
        className="app-body mt-2 leading-snug line-clamp-2 can-hover:group-hover:text-app-headingHover transition-colors"
        style={{ color: "rgba(var(--app-text-body-rgb), 0.85)", fontSize: "0.8125rem" }}
      >
        {meta.title}
      </p>
    </Link>
  );
}
