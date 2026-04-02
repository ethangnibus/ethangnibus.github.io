import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  CATEGORY_META,
  getPagePath,
  getPageTitle,
  type BlogPage,
} from "@/data/projects";
import { APP_PALETTE } from "@/theme";

interface BlogPageNavigationProps {
  previous: BlogPage | null;
  next: BlogPage | null;
}

function getEyebrow(direction: "previous" | "next", page: BlogPage | null) {
  if (!page) return direction === "previous" ? "Previous" : "Next";
  if (page.kind === "end") {
    return direction === "previous" ? "Previous Chapter" : "Finale";
  }
  if (page.kind === "project") {
    return "Table of Contents";
  }

  return direction === "previous" ? "Previous Chapter" : "Next Chapter";
}

function getPageColor(page: BlogPage | null) {
  if (!page) return APP_PALETTE.textBody;
  if (page.kind === "end") return APP_PALETTE.textBody;
  return CATEGORY_META[page.project.category].color;
}

export function BlogPageNavigation({
  previous,
  next,
}: BlogPageNavigationProps) {
  return (
    <div
      className="fixed bottom-0 md:bottom-6 z-50 flex justify-center pointer-events-none"
      style={{
        left: "var(--blog-main-left, 0px)",
        width: "var(--blog-main-width, 100vw)",
      }}
    >
      <div
        className="flex rounded-none md:rounded-full overflow-hidden w-full max-w-3xl pointer-events-auto border-t md:border"
        style={{
          background: `linear-gradient(to bottom, ${APP_PALETTE.pillWoodBgTop} 0%, ${APP_PALETTE.pillWoodBgBottom} 100%)`,
          borderColor: APP_PALETTE.pillWoodBorder,
          boxShadow:
            "0 4px 16px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.65)",
        }}
      >
        {previous ? (
          <Link
            to={getPagePath(previous)}
            onClick={() => window.scrollTo(0, 0)}
            className="flex-1 flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-black/[0.05] active:bg-black/[0.09] min-w-0 overflow-hidden"
          >
            <ChevronLeft className="w-4 h-4 shrink-0 text-app-body" />
            <span className="flex flex-col min-w-0">
              <span className="app-eyebrow text-app-body/60 leading-none mb-0.5">
                {getEyebrow("previous", previous)}
              </span>
              <span
                className="app-body truncate leading-snug"
                style={{ color: getPageColor(previous) }}
              >
                {getPageTitle(previous)}
              </span>
            </span>
          </Link>
        ) : (
          <div className="flex-1 flex items-center gap-3 px-5 py-3.5 min-w-0 overflow-hidden opacity-30 pointer-events-none">
            <ChevronLeft className="w-4 h-4 shrink-0 text-app-body" />
            <span className="app-eyebrow text-app-body leading-none">
              Previous
            </span>
          </div>
        )}

        <div className="w-px self-stretch bg-app-accent/30 shrink-0" />

        {next ? (
          <Link
            to={getPagePath(next)}
            onClick={() => window.scrollTo(0, 0)}
            className="flex-1 flex items-center justify-end gap-3 px-5 py-3.5 transition-colors hover:bg-black/[0.05] active:bg-black/[0.09] min-w-0 overflow-hidden"
          >
            <span className="flex flex-col min-w-0">
              <span className="app-eyebrow text-app-body/60 leading-none mb-0.5 self-end">
                {getEyebrow("next", next)}
              </span>
              <span
                className="app-body truncate leading-snug"
                style={{ color: getPageColor(next) }}
              >
                {getPageTitle(next)}
              </span>
            </span>
            <ChevronRight className="w-4 h-4 shrink-0 text-app-body" />
          </Link>
        ) : (
          <div className="flex-1 flex items-center justify-end gap-3 px-5 py-3.5 min-w-0 overflow-hidden opacity-30 pointer-events-none">
            <span className="app-eyebrow text-app-body leading-none">
              Next
            </span>
            <ChevronRight className="w-4 h-4 shrink-0 text-app-body" />
          </div>
        )}
      </div>
    </div>
  );
}
