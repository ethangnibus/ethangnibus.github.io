import { useLayoutEffect } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";

import { BlurImage } from "@/components/BlurImage";
import { ProjectedText } from "@/components/ProjectedText";
import { BlogArticleLead } from "@/components/blog/BlogArticleLead";
import { BlogChapterProvider } from "@/components/blog";
import { BlogPageNavigation } from "@/components/blog/BlogPageNavigation";
import { woodPatternStyle } from "@/components/WoodPatternBackground";
import {
  CATEGORY_META,
  findChapterBySlug,
  formatChapterOrdinal,
  getAdjacentPages,
  getChapterBySlug,
  getProjectBySlug,
  getProjectOverviewPath,
  SITE_NAVBAR_SCROLL_OFFSET,
  SITE_SCROLL_CONTAINER_ID,
} from "@/data/projects";
import { APP_COLORS } from "@/theme";

function NotFound() {
  return (
    <div
      className="min-h-[100dvh] flex items-center justify-center"
      style={woodPatternStyle("far-grid")}
    >
      <div className="text-center px-6">
        <h1 className="app-title-1 app-text-strong mb-4">
          <ProjectedText text="404" color={APP_COLORS.textStrong} />
        </h1>
        <p className="app-body app-text-body mb-8">Chapter not found</p>
        <Link to="/blog" className="pill-btn pill-btn-default px-6 py-3">
          <span className="pill-btn-inner">&larr; Back to Projects</span>
        </Link>
      </div>
    </div>
  );
}

export function BlogPost() {
  const location = useLocation();
  const { projectSlug, chapterSlug } = useParams<{
    projectSlug: string;
    chapterSlug: string;
  }>();

  if (!projectSlug || !chapterSlug) return <NotFound />;

  const project = getProjectBySlug(projectSlug);
  if (!project) {
    const legacyChapter = findChapterBySlug(chapterSlug);
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

  const chapter = getChapterBySlug(project, chapterSlug);
  if (!chapter) {
    const chapterElsewhere = findChapterBySlug(chapterSlug);
    if (chapterElsewhere) {
      return (
        <Navigate
          to={`/blog/${chapterElsewhere.project.slug}/${chapterElsewhere.chapter.slug}`}
          replace
        />
      );
    }

    return <NotFound />;
  }

  const category = CATEGORY_META[project.category];
  const adjacent = getAdjacentPages(project.slug, chapter.slug);
  const ContentComponent = chapter.content;
  const isExternal = chapter.href.startsWith("http");
  const chapterIndex = project.chapters.findIndex((c) => c.slug === chapter.slug);

  useLayoutEffect(() => {
    const raw = location.hash.startsWith("#")
      ? location.hash.slice(1)
      : location.hash;
    if (!raw) return;
    const el = document.getElementById(raw);
    const scroller = document.getElementById(SITE_SCROLL_CONTAINER_ID);
    if (!el || !scroller) return;
    const top =
      el.getBoundingClientRect().top + scroller.scrollTop - SITE_NAVBAR_SCROLL_OFFSET;
    scroller.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, [location.pathname, location.hash]);

  return (
    <div className="min-h-[100dvh]" style={woodPatternStyle("far-grid")}>
      <div className="max-w-3xl mx-auto pt-24 md:pt-28 pb-28 md:pb-32">
        <BlogArticleLead
          backTo={getProjectOverviewPath(project.slug)}
          backLabel={`\u2190 Back to ${category.label}`}
          categoryLabel={category.label}
          categoryColor={category.color}
          chapterOrdinal={formatChapterOrdinal(chapterIndex)}
          title={chapter.title}
          description={chapter.description}
        />

        <div className="relative aspect-[3/2] overflow-hidden bg-app-media border-y md:border border-app-black shadow-lg shadow-black/10 mb-8 md:mb-12">
          <BlurImage
            src={chapter.image}
            smallSrc={chapter.smallImage}
            alt={chapter.title}
          />
          <div className="absolute inset-0 portal-depth-inset pointer-events-none" />
        </div>

        <div className="app-prose mb-12 md:mb-16 px-3">
          <BlogChapterProvider
            value={{ project, chapter, chapterIndex }}
          >
            <ContentComponent />
          </BlogChapterProvider>
        </div>

        <div className="flex justify-center pt-8 px-3">
          <a
            href={chapter.href}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn pill-btn-default px-8 py-3.5"
          >
            <span className="pill-btn-inner">
              {chapter.ctaLabel ?? (isExternal ? "View on GitHub ↗" : "View Original PDF ↗")}
            </span>
          </a>
        </div>
      </div>

      <BlogPageNavigation
        previous={adjacent?.previous ?? null}
        next={adjacent?.next ?? null}
      />
    </div>
  );
}
