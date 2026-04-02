import { Link } from "react-router-dom";

import { woodPatternStyle } from "@/components/PatternBackground";
import { ProjectedText } from "@/components/ProjectedText";
import {
  CATEGORY_META,
  formatChapterOrdinal,
  type Project,
} from "@/data/projects";
import { APP_COLORS, APP_PALETTE } from "@/theme";

interface ProjectOverviewContentProps {
  project: Project;
}

export function ProjectOverviewContent({
  project,
}: ProjectOverviewContentProps) {
  const category = CATEGORY_META[project.category];
  const firstChapter = project.chapters[0];

  return (
    <div
      id="project-overview"
      className="max-w-3xl mx-auto pt-6 md:pt-8 pb-8 md:pb-12"
    >
      <div className="mb-10 md:mb-12 px-3">
        <h2 className="app-title-2 app-text-strong mb-4">
          <ProjectedText color={APP_COLORS.textStrong} intensity={0.25}>
            Introduction
          </ProjectedText>
        </h2>
        <p className="app-body app-text-body">
          {project.introduction}
        </p>
      </div>

      <section>
        <div className="mb-6 md:mb-8 px-3">
          <h2 className="app-title-2 app-text-strong">
            <ProjectedText color={APP_COLORS.textStrong} intensity={0.25}>
              Table of Contents
            </ProjectedText>
          </h2>
        </div>

        <div className="space-y-5 px-3">
          {project.chapters.map((chapter, index) => (
            <article
              key={chapter.slug}
              className="rounded-none md:rounded-[3px] border-y md:border shadow-lg shadow-black/10 overflow-hidden"
              style={{
                ...woodPatternStyle("close-fslash", {
                  bgColor: APP_PALETTE.cardWarm,
                  lineOpacity: 0.09,
                }),
                borderColor: `rgba(${APP_PALETTE.woodLineRgb}, 0.16)`,
              }}
            >
              <Link
                to={`/blog/${project.slug}/${chapter.slug}`}
                className="group block px-3 py-3 transition-transform duration-200 ease-out hover:scale-[1.015] active:scale-[1.005]"
              >
                <div className="mb-3">
                  <p className="app-eyebrow text-app-body/55 mb-1 tabular-nums">
                    {formatChapterOrdinal(index)}
                  </p>
                  <h3 className="app-title-3 app-text-strong group-hover:text-app-headingHover transition-colors">
                    {chapter.title}
                  </h3>
                </div>

                <div className="w-full aspect-[3/2] rounded-[2px] overflow-hidden bg-app-media mb-3">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${chapter.image})` }}
                  />
                </div>

                <p className="app-body text-app-body/85">{chapter.description}</p>

                <div className="flex justify-end mt-3">
                  <span
                    className="shrink-0 app-eyebrow"
                    style={{ color: category.color }}
                  >
                    Read →
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <div className="pt-8 mt-10">
        <div className="flex justify-end">
          {firstChapter && (
            <Link
              to={`/blog/${project.slug}/${firstChapter.slug}`}
              className="pill-btn pill-btn-default px-8 py-3.5"
            >
              <span className="pill-btn-inner">Start reading →</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
