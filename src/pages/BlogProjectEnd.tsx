import { Navigate, useParams } from "react-router-dom";

import { BlogProjectsViewer } from "@/components/blog/BlogProjectsViewer";
import { ChapterTriptych } from "@/components/blog/ChapterTriptych";
import { woodPatternStyle } from "@/components/WoodPatternBackground";

import {
  CATEGORY_META,
  getAdjacentForProjectEnd,
  getProjectBySlug,
  getProjectOverviewPath,
} from "@/data/projects";

export function BlogProjectEnd() {
  const { projectSlug } = useParams<{ projectSlug: string }>();

  if (!projectSlug) return <Navigate to="/blog" replace />;

  const project = getProjectBySlug(projectSlug);
  if (!project) return <Navigate to="/blog" replace />;

  const category = CATEGORY_META[project.category];
  const adjacent = getAdjacentForProjectEnd(projectSlug);
  const currentPage = { kind: "projectEnd" as const, project };
  const tocPath = getProjectOverviewPath(project.slug);

  return (
    <div className="min-h-[100dvh]" style={woodPatternStyle("far-grid")}>
      {/* Spacer for the navbar: 56px edge-to-edge (mobile) / 80px floating pill (desktop: mt-3 + h-14 + mb-3) */}
      <div className="h-14 md:h-20" />

      <ChapterTriptych
        project={project}
        previous={adjacent?.previous ?? null}
        current={currentPage}
        next={null}
        backToProject={{
          href: tocPath,
          label: project.title,
          accentColor: category.color,
        }}
      />

      {/* Heading */}
      <div className="max-w-3xl mx-auto px-3 md:px-5 pt-8 pb-2">
        <p className="app-eyebrow mb-1" style={{ color: category.color }}>
          {category.carouselLabel}
        </p>
        <h1 className="app-title-1 app-text-strong">Browse Blog Posts</h1>
        <p className="app-body app-text-body mt-2">
          {project.title} — explore chapters or jump to another project.
        </p>
      </div>

      {/* Projects viewer */}
      <BlogProjectsViewer currentProjectSlug={projectSlug} />

      {/* Triptych at bottom — full main-content width */}
      <ChapterTriptych
        project={project}
        previous={adjacent?.previous ?? null}
        current={currentPage}
        next={null}
      />
    </div>
  );
}
