import { Link, useOutletContext } from "react-router-dom";
import { ChevronLeft, Menu } from "lucide-react";

import {
  CATEGORY_META,
  getProjectOverviewPath,
  type Chapter,
  type Project,
} from "@/data/projects";
import type { SiteShellOutletContext } from "@/layouts/siteShellContext";

interface ChapterReadingBarProps {
  project: Project;
  chapter: Chapter;
  chapterIndex: number;
}

export function ChapterReadingBar({
  project,
  chapter,
  chapterIndex,
}: ChapterReadingBarProps) {
  const { toggleBlogSidebar } = useOutletContext<SiteShellOutletContext>();
  const category = CATEGORY_META[project.category];

  return (
    <div
      className="sticky top-14 z-40 border-t"
      style={{
        background: `linear-gradient(to bottom, var(--app-pill-wood-bg-top) 0%, var(--app-pill-wood-bg-bottom) 100%)`,
        borderColor: `var(--app-pill-wood-border)`,
        boxShadow: "0 2px 10px rgba(0,0,0,0.10), inset 0 -1px 0 rgba(255,255,255,0.55)",
      }}
    >
      <div className="max-w-3xl mx-auto flex items-center gap-2 px-3 h-11">
        {/* Back to TOC */}
        <Link
          to={getProjectOverviewPath(project.slug)}
          className="shrink-0 flex items-center gap-1 app-eyebrow text-app-body/50 hover:text-app-body transition-colors"
          title={`Table of Contents: ${project.title}`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>{category.shortLabel}</span>
        </Link>

        <div
          className="shrink-0 h-4 w-px"
          style={{ backgroundColor: `rgba(var(--app-text-body-rgb), 0.15)` }}
        />

        {/* Chapter number strip — scrollable on small screens */}
        <div className="flex-1 min-w-0 overflow-x-auto overflow-y-hidden">
          <div className="flex items-center justify-center gap-0.5 min-w-max px-1">
            {project.chapters.map((ch, i) => {
              const isActive = i === chapterIndex;
              return (
                <Link
                  key={ch.slug}
                  to={`/blog/${project.slug}/${ch.slug}`}
                  aria-label={`Chapter ${i + 1}: ${ch.title}`}
                  aria-current={isActive ? "page" : undefined}
                  className="relative w-7 h-7 rounded-[3px] flex items-center justify-center transition-all duration-150 shrink-0 font-mono text-[11px] leading-none"
                  style={
                    isActive
                      ? { backgroundColor: category.color, color: "#fff" }
                      : { color: `rgba(var(--app-text-body-rgb), 0.38)` }
                  }
                >
                  <span aria-hidden>{i + 1}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div
          className="shrink-0 h-4 w-px"
          style={{ backgroundColor: `rgba(var(--app-text-body-rgb), 0.15)` }}
        />

        {/* Browse / open sidebar */}
        <button
          type="button"
          onClick={toggleBlogSidebar}
          aria-label="Browse blog posts"
          className="shrink-0 flex items-center gap-1 app-eyebrow text-app-body/50 hover:text-app-body transition-colors"
        >
          <Menu className="w-3.5 h-3.5" aria-hidden />
          <span className="hidden sm:inline" aria-hidden>Browse</span>
        </button>
      </div>
    </div>
  );
}
