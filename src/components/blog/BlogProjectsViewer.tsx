import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { BlurImage } from "@/components/BlurImage";
import { LetterboxBars } from "@/components/blog/LetterboxBars";
import { woodPatternStyle } from "@/components/WoodPatternBackground";
import {
  CATEGORY_META,
  getProjectOverviewPath,
  PORTFOLIO_HOME_IMAGE,
  PORTFOLIO_HOME_PATH,
  PROJECTS,
  SITE_NAV_LABELS,
  type Project,
} from "@/data/projects";
import { APP_PALETTE } from "@/theme";

interface BlogProjectsViewerProps {
  /** Highlight (but still show) a specific project — used on per-project end pages. */
  currentProjectSlug?: string;
}

const PORTFOLIO_HOME_SMALL_IMAGE = "/images/main/two_trees/two_trees-small.jpg";


export function BlogProjectsViewer({ currentProjectSlug }: BlogProjectsViewerProps) {
  return (
    <div className="w-full max-w-3xl mx-auto px-3 py-8 md:py-12 space-y-6">
      <AboutHomeCard />
      {PROJECTS.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project}
          isCurrent={project.slug === currentProjectSlug}
        />
      ))}
    </div>
  );
}

function AboutHomeCard() {
  const { pathname } = useLocation();
  const isSelected = pathname === PORTFOLIO_HOME_PATH;
  const accent = APP_PALETTE.textBody;
  const frameColor = accent;

  return (
    <article
      className="rounded-none md:rounded-[3px] border-y md:border shadow-lg shadow-black/10 overflow-hidden"
      style={{
        ...woodPatternStyle("close-fslash", {
          bgColor: "var(--app-card-warm)",
          lineOpacity: 0.09,
        }),
        borderColor: `rgba(var(--app-wood-line-rgb), 0.16)`,
      }}
    >
      <Link
        to={PORTFOLIO_HOME_PATH}
        className="group block px-3 py-3 transition-transform duration-200 ease-out can-hover:hover:scale-[1.01] active:scale-[1.005]"
      >
        <div className="mb-3">
          <p className="app-eyebrow mb-1" style={{ color: accent }}>
            Portfolio home
          </p>
          <h3 className="app-title-2 app-text-strong can-hover:group-hover:text-app-headingHover transition-colors">
            {SITE_NAV_LABELS.aboutMe}
          </h3>
        </div>

        <div
          className="w-full aspect-[3/2] rounded-[2px] overflow-hidden bg-app-media mb-3 relative border-2 box-border"
          style={{ borderColor: isSelected ? frameColor : "transparent" }}
        >
          <BlurImage
            src={PORTFOLIO_HOME_IMAGE}
            smallSrc={PORTFOLIO_HOME_SMALL_IMAGE}
            alt=""
          />
          <div className="absolute inset-0 portal-depth-inset pointer-events-none" />
          <LetterboxBars barBackground={isSelected ? frameColor : "black"} />
        </div>

        <p
          className="app-body mb-3"
          style={{ color: "rgba(var(--app-text-body-rgb), 0.85)" }}
        >
          Return to the portfolio landing page — intro, experience, education, and the project hero
          carousel.
        </p>

        <div className="flex items-center justify-end">
          <span
            className="shrink-0 app-eyebrow inline-flex items-center gap-1"
            style={{ color: accent }}
          >
            Go home
            <ChevronRight className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
          </span>
        </div>
      </Link>
    </article>
  );
}

function ProjectCard({ project, isCurrent }: { project: Project; isCurrent: boolean }) {
  const category = CATEGORY_META[project.category];

  return (
    <article
      className="rounded-none md:rounded-[3px] border-y md:border shadow-lg shadow-black/10 overflow-hidden"
      style={{
        ...woodPatternStyle("close-fslash", {
          bgColor: "var(--app-card-warm)",
          lineOpacity: 0.09,
        }),
        borderColor: `rgba(var(--app-wood-line-rgb), 0.16)`,
      }}
    >
      <Link
        to={getProjectOverviewPath(project.slug)}
        className="group block px-3 py-3 transition-transform duration-200 ease-out can-hover:hover:scale-[1.01] active:scale-[1.005]"
      >
        <div className="mb-3">
          <p
            className="app-eyebrow mb-1"
            style={{ color: isCurrent ? `rgba(var(--app-text-body-rgb), 0.45)` : category.color }}
          >
            {isCurrent ? "Currently reading" : category.carouselLabel}
          </p>
          <h3 className="app-title-2 app-text-strong can-hover:group-hover:text-app-headingHover transition-colors">
            {project.title}
          </h3>
        </div>

        <div
          className="w-full aspect-[3/2] rounded-[2px] overflow-hidden bg-app-media mb-3 relative border-2 box-border"
          style={{ borderColor: isCurrent ? category.color : "transparent" }}
        >
          <BlurImage
            src={project.image}
            smallSrc={project.smallImage}
            alt={project.title}
          />
          <div className="absolute inset-0 portal-depth-inset pointer-events-none" />
          <LetterboxBars barBackground={isCurrent ? category.color : "black"} />
        </div>

        <p
          className="app-body mb-3"
          style={{ color: "rgba(var(--app-text-body-rgb), 0.85)" }}
        >
          {project.description}
        </p>

        <div className="flex items-center justify-between">
          <span
            className="app-eyebrow tabular-nums"
            style={{ color: "rgba(var(--app-text-body-rgb), 0.45)" }}
          >
            {project.chapters.length} {project.chapters.length === 1 ? "chapter" : "chapters"}
          </span>
          {!isCurrent && (
            <span
              className="shrink-0 app-eyebrow inline-flex items-center gap-1"
              style={{ color: category.color }}
            >
              Browse
              <ChevronRight className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
            </span>
          )}
        </div>
      </Link>

      {/* Chapter list */}
      <div
        className="border-t"
        style={{ borderColor: `rgba(var(--app-wood-line-rgb), 0.16)` }}
      >
        {project.chapters.map((chapter, index) => (
          <Link
            key={chapter.slug}
            to={`/blog/${project.slug}/${chapter.slug}`}
            className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-black/[0.05] active:bg-black/[0.09]"
            style={{
              borderTop: index > 0 ? `1px solid rgba(var(--app-wood-line-rgb), 0.1)` : undefined,
            }}
          >
            <span
              className="app-eyebrow tabular-nums shrink-0 w-6"
              style={{ color: "rgba(var(--app-text-body-rgb), 0.4)" }}
            >
              {index + 1}
            </span>
            <span className="app-body truncate" style={{ color: "rgba(var(--app-text-body-rgb), 0.8)" }}>
              {chapter.title}
            </span>
            <span className="ml-auto inline-flex shrink-0" style={{ color: category.color }}>
              <ChevronRight className="size-4" strokeWidth={2} aria-hidden />
            </span>
          </Link>
        ))}
      </div>
    </article>
  );
}
