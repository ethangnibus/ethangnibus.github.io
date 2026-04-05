import { Link } from "react-router-dom";

import { woodPatternStyle } from "@/components/PatternBackground";
import { ProjectedText } from "@/components/ProjectedText";
import { StaggerItem, StaggerOnView } from "@/components/StaggerOnView";
import { ChapterTriptych } from "@/components/blog/ChapterTriptych";
import {
  CATEGORY_META,
  formatChapterOrdinal,
  type Project,
} from "@/data/projects";
import { APP_PALETTE } from "@/theme";

interface ProjectOverviewContentProps {
  project: Project;
}

export function ProjectOverviewContent({
  project,
}: ProjectOverviewContentProps) {
  const category = CATEGORY_META[project.category];

  return (
    <>
    <div
      id="project-overview"
      className="max-w-3xl mx-auto pt-6 md:pt-8 pb-4 md:pb-6"
    >
      <StaggerOnView className="mb-10 md:mb-12 px-3">
        <StaggerItem>
          <h2 className="app-title-2 app-text-strong mb-4">
            <ProjectedText
              text="Introduction"
              color={APP_PALETTE.textStrong}
              intensity={0.25}
            />
          </h2>
        </StaggerItem>
        <StaggerItem>
          <p className="app-body app-text-body">
            {project.introduction}
          </p>
        </StaggerItem>
      </StaggerOnView>

      <section>
        <StaggerOnView className="mb-6 md:mb-8 px-3">
          <StaggerItem>
            <h2 className="app-title-2 app-text-strong">
              <ProjectedText
                text="Table of Contents"
                color={APP_PALETTE.textStrong}
                intensity={0.25}
              />
            </h2>
          </StaggerItem>
        </StaggerOnView>

        <div className="space-y-5 px-3">
          {project.chapters.map((chapter, index) => (
            <article
              key={chapter.slug}
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
                to={`/blog/${project.slug}/${chapter.slug}`}
                className="group block px-3 py-3 transition-transform duration-200 ease-out can-hover:hover:scale-[1.015] active:scale-[1.005]"
              >
                <div className="mb-3">
                  <p className="app-eyebrow mb-1 tabular-nums" style={{ color: "rgba(var(--app-text-body-rgb), 0.55)" }}>
                    {formatChapterOrdinal(index)}
                  </p>
                  <h3 className="app-title-3 app-text-strong can-hover:group-hover:text-app-headingHover transition-colors">
                    {chapter.title}
                  </h3>
                </div>

                <div className="w-full aspect-[3/2] rounded-[2px] overflow-hidden bg-app-media mb-3">
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${chapter.image})` }}
                  />
                </div>

                <p className="app-body" style={{ color: "rgba(var(--app-text-body-rgb), 0.85)" }}>{chapter.description}</p>

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

    </div>

    {/* Triptych at bottom — Chapter 1 as next, no active slot */}
    {project.chapters[0] && (
      <ChapterTriptych
        project={project}
        previous={null}
        current={null}
        next={{ kind: "chapter", project, chapter: project.chapters[0] }}
      />
    )}
    </>
  );
}
