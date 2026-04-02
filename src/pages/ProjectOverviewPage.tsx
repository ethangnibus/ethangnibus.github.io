import { useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import { ProjectOverviewContent } from "@/components/blog/ProjectOverviewContent";
import { ProjectedText } from "@/components/ProjectedText";
import { woodPatternStyle } from "@/components/WoodPatternBackground";
import {
  findChapterBySlug,
  getProjectBySlug,
  PORTFOLIO_HOME_PATH,
  SITE_SCROLL_CONTAINER_ID,
} from "@/data/projects";
import { APP_PALETTE } from "@/theme";

function NotFound() {
  return (
    <div
      className="min-h-[100dvh] flex items-center justify-center"
      style={woodPatternStyle("far-grid")}
    >
      <div className="text-center px-6">
        <h1 className="font-mono text-5xl font-bold text-app-strong mb-4">
          <ProjectedText text="404" color={APP_PALETTE.textStrong} />
        </h1>
        <p className="font-mono text-app-body mb-8">Project not found</p>
        <Link to="/blog" className="pill-btn pill-btn-default px-6 py-3">
          <span className="pill-btn-inner">&larr; Back to Projects</span>
        </Link>
      </div>
    </div>
  );
}

/** Body below the shared hero (see `BlogPortfolioHeroLayout`). */
export function ProjectOverviewPage() {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const navigate = useNavigate();

  if (!projectSlug) {
    return <Navigate to={PORTFOLIO_HOME_PATH} replace />;
  }

  const project = getProjectBySlug(projectSlug);
  if (!project) {
    const legacyChapter = findChapterBySlug(projectSlug);
    if (legacyChapter) {
      return (
        <Navigate
          to={`/blog/${legacyChapter.project.slug}/${legacyChapter.chapter.slug}`}
          replace
        />
      );
    }
    return <NotFound />;
  }

  useEffect(() => {
    const container = document.getElementById(SITE_SCROLL_CONTAINER_ID);
    if (!container) return;
    container.scrollTo({ top: 0, behavior: "smooth" });
  }, [project.slug]);

  return <ProjectOverviewContent project={project} />;
}
