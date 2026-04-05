import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  getPageColor,
  getPagePath,
  getPageTitle,
  type BlogPage,
} from "@/data/projects";

interface BlogPageNavigationProps {
  previous: BlogPage | null;
  next: BlogPage | null;
}

function getEyebrow(direction: "previous" | "next", page: BlogPage | null) {
  if (!page) return direction === "previous" ? "Previous" : "Next";
  if (page.kind === "end") return direction === "previous" ? "Previous" : "Finale";
  if (page.kind === "projectEnd") return "Finale";
  if (page.kind === "project") return "Table of Contents";
  return direction === "previous" ? "Previous Chapter" : "Next Chapter";
}


export function BlogPageNavigation({ previous, next }: BlogPageNavigationProps) {
  const barStyle = {
    background: `linear-gradient(to bottom, var(--app-pill-wood-bg-top) 0%, var(--app-pill-wood-bg-bottom) 100%)`,
    borderColor: `var(--app-pill-wood-border)`,
    boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.65)",
  };

  return (
    <div className="flex border-t" style={barStyle}>
      {/* Previous */}
      <div className="flex-1 overflow-hidden">
        {previous ? (
          <Link
            to={getPagePath(previous)}
            className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-black/[0.05] active:bg-black/[0.09] min-w-0 overflow-hidden"
          >
            <ChevronLeft className="w-4 h-4 shrink-0 text-app-body" />
            <span className="flex flex-col min-w-0">
              <span className="app-eyebrow text-app-body/60 leading-none mb-0.5">
                {getEyebrow("previous", previous)}
              </span>
              <span className="app-body truncate leading-snug" style={{ color: getPageColor(previous) }}>
                {getPageTitle(previous)}
              </span>
            </span>
          </Link>
        ) : (
          <div className="flex items-center gap-3 px-5 py-3.5 min-w-0 overflow-hidden opacity-30 pointer-events-none">
            <ChevronLeft className="w-4 h-4 shrink-0 text-app-body" />
            <span className="app-eyebrow text-app-body leading-none">Previous</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-px self-stretch" style={{ backgroundColor: `var(--app-pill-wood-border)` }} />

      {/* Next */}
      <div className="flex-1 overflow-hidden">
        {next ? (
          <Link
            to={getPagePath(next)}
            className="flex items-center justify-end gap-3 px-5 py-3.5 transition-colors hover:bg-black/[0.05] active:bg-black/[0.09] min-w-0 overflow-hidden"
          >
            <span className="flex flex-col min-w-0 items-end">
              <span className="app-eyebrow text-app-body/60 leading-none mb-0.5">
                {getEyebrow("next", next)}
              </span>
              <span className="app-body truncate leading-snug" style={{ color: getPageColor(next) }}>
                {getPageTitle(next)}
              </span>
            </span>
            <ChevronRight className="w-4 h-4 shrink-0 text-app-body" />
          </Link>
        ) : (
          <div className="flex items-center justify-end gap-3 px-5 py-3.5 min-w-0 overflow-hidden opacity-30 pointer-events-none">
            <span className="app-eyebrow text-app-body leading-none">Next</span>
            <ChevronRight className="w-4 h-4 shrink-0 text-app-body" />
          </div>
        )}
      </div>
    </div>
  );
}
