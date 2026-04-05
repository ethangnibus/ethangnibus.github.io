import { useLayoutEffect } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";

import { BlurImage } from "@/components/BlurImage";
import { ProjectedText } from "@/components/ProjectedText";
import { BlogArticleLead } from "@/components/blog/BlogArticleLead";
import { BlogChapterProvider } from "@/components/blog";
import { ChapterTriptych } from "@/components/blog/ChapterTriptych";
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
import { APP_PALETTE } from "@/theme";

function NotFound() {
  return (
    <div
      className="min-h-[100dvh] flex items-center justify-center"
      style={woodPatternStyle("far-grid")}
    >
      <div className="text-center px-6">
        <h1 className="app-title-1 app-text-strong mb-4">
          <ProjectedText text="404" color={APP_PALETTE.textStrong} />
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

  // Resolve project + chapter before any early returns so hook order stays stable.
  const project = projectSlug ? getProjectBySlug(projectSlug) : undefined;
  const chapter =
    project && chapterSlug ? getChapterBySlug(project, chapterSlug) : undefined;

  // Scroll to in-page hash anchor on navigation — must be called unconditionally.
  useLayoutEffect(() => {
    if (!chapter) return;
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
  }, [location.pathname, location.hash, chapter]);

  // ── Early returns (after all hooks) ──────────────────────────

  if (!projectSlug || !chapterSlug) return <NotFound />;

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

  const adjacent = getAdjacentPages(project.slug, chapter.slug);
  const ContentComponent = chapter.content;
  const isExternal = chapter.href.startsWith("http");
  const category = CATEGORY_META[project.category];
  const tocPath = getProjectOverviewPath(project.slug);
  const chapterIndex = project.chapters.findIndex((c) => c.slug === chapter.slug);

  const currentPage = { kind: "chapter" as const, project, chapter };

  return (
    <div className="min-h-[100dvh]" style={woodPatternStyle("far-grid")}>
      {/* Spacer for the navbar: 56px edge-to-edge (mobile) / 80px floating pill (desktop: mt-3 + h-14 + mb-3) */}
      <div className="h-14 md:h-20" />

      <ChapterTriptych
        project={project}
        previous={adjacent?.previous ?? null}
        current={currentPage}
        next={adjacent?.next ?? null}
        backToProject={{
          href: tocPath,
          label: project.title,
          accentColor: category.color,
        }}
      />

      {/* Main content */}
      <div className="max-w-3xl mx-auto pt-10 md:pt-12 pb-10 md:pb-12">
        <BlogArticleLead
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
          <BlogChapterProvider value={{ project, chapter, chapterIndex }}>
            <ContentComponent />
          </BlogChapterProvider>
        </div>

        <div className="flex justify-center pt-8 px-3 pb-4">
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

      {/* Triptych at bottom — same prev | current | next */}
      <ChapterTriptych
        project={project}
        previous={adjacent?.previous ?? null}
        current={currentPage}
        next={adjacent?.next ?? null}
      />
    </div>
  );
}
