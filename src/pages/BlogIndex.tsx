import { Link } from "react-router-dom";

import { ProjectedText } from "@/components/ProjectedText";
import { StaggerItem, StaggerOnView } from "@/components/StaggerOnView";
import { woodPatternStyle } from "@/components/WoodPatternBackground";
import {
  CATEGORY_META,
  formatChapterOrdinal,
  getProjectOverviewPath,
  PORTFOLIO_HOME_PATH,
  PROJECTS,
} from "@/data/projects";
import { APP_COLORS } from "@/theme";

export function BlogIndex() {
  return (
    <div className="min-h-[100dvh]" style={woodPatternStyle("far-grid")}>
      <div className="max-w-3xl mx-auto pt-24 md:pt-28 pb-8 md:pb-16">
        <StaggerOnView className="px-3">
          <StaggerItem>
            <Link
              to={PORTFOLIO_HOME_PATH}
              className="inline-flex items-center gap-1 app-body text-app-body hover:text-app-strong transition-colors mb-8 md:mb-10"
            >
              <ProjectedText
                text={"\u2190 Back Home"}
                color={APP_COLORS.textBody}
                intensity={0.3}
              />
            </Link>
          </StaggerItem>

          <StaggerItem>
            <h1 className="app-title-1 app-text-strong mb-2 md:mb-3">
              <ProjectedText
                text="Projects"
                color={APP_COLORS.textStrong}
                intensity={0.4}
              />
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="app-body-lg text-app-body/80 mb-8 md:mb-12 max-w-2xl">
              Each project now has a table of contents, a short introduction, and then its chapters.
            </p>
          </StaggerItem>
        </StaggerOnView>

        <div className="flex flex-col gap-8 md:gap-10">
          {PROJECTS.map((project) => {
            const category = CATEGORY_META[project.category];
            return (
              <section
                key={project.slug}
                className="border-y md:border rounded-none md:rounded-[3px] px-4 py-7 md:px-6 md:py-9"
                style={{ borderColor: `${category.color}30` }}
              >
                <span className="block app-eyebrow mb-3" style={{ color: category.color }}>
                  <ProjectedText
                    text={category.label}
                    color={category.color}
                    intensity={0.3}
                  />
                </span>

                <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-6">
                  <Link
                    to={getProjectOverviewPath(project.slug)}
                    className="group block md:w-56 shrink-0"
                  >
                    <div className="aspect-[3/2] overflow-hidden bg-app-media rounded-[2px]">
                      <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.03]"
                        style={{ backgroundImage: `url(${project.smallImage})` }}
                      />
                    </div>
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                      <div>
                        <h2 className="app-title-2 app-text-strong">
                          <ProjectedText
                            text={project.shortTitle}
                            color={APP_COLORS.textStrong}
                            intensity={0.25}
                          />
                        </h2>
                        <p className="app-body text-app-body/80 mt-2 max-w-xl">
                          {project.description}
                        </p>
                      </div>

                      <Link
                        to={getProjectOverviewPath(project.slug)}
                        className="app-cta"
                        style={{ color: category.color }}
                      >
                        Open TOC →
                      </Link>
                    </div>

                    <div className="flex flex-col gap-2">
                      {project.chapters.map((chapter, index) => (
                        <Link
                          key={chapter.slug}
                          to={`/blog/${project.slug}/${chapter.slug}`}
                          className="group flex items-center gap-4 py-3 px-3 md:px-4 -mx-3 md:-mx-4 rounded-[3px] transition-colors hover:bg-black/[0.03] active:bg-black/[0.05]"
                        >
                          <div className="app-eyebrow text-app-body/55 w-[5.5rem] shrink-0 leading-snug tabular-nums">
                            {formatChapterOrdinal(index)}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="app-title-3 app-text-strong group-hover:text-app-headingHover transition-colors truncate">
                              <ProjectedText
                                text={chapter.title}
                                color={APP_COLORS.textStrong}
                                intensity={0.2}
                              />
                            </h3>
                            <p className="app-body text-app-body/70 mt-0.5 line-clamp-1">
                              {chapter.description}
                            </p>
                          </div>

                          <span
                            className="shrink-0 app-eyebrow opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{ color: category.color }}
                          >
                            {chapter.ctaLabel ?? "Read →"}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
