import { useCallback, useLayoutEffect, useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  CATEGORY_META,
  getProjectOverviewPath,
  PORTFOLIO_HOME_PATH,
  PROJECTS,
  SITE_NAV_LABELS,
  SITE_SCROLL_CONTAINER_ID,
} from "@/data/projects";
import { APP_COLORS } from "@/theme";

const NAVBAR_OFFSET = 80;

function scrollPortfolioToId(id: string) {
  const container = document.getElementById(SITE_SCROLL_CONTAINER_ID);
  const el = document.getElementById(id);
  if (!container || !el) return;
  container.scrollTo({
    top: el.offsetTop - NAVBAR_OFFSET,
    behavior: "smooth",
  });
}

function blogPathMatch(pathname: string) {
  if (!pathname.startsWith("/blog")) return null;
  if (pathname === PORTFOLIO_HOME_PATH) return null;
  if (pathname === "/blog") {
    return { projectSlug: null as string | null, chapterSlug: null as string | null };
  }
  if (!pathname.startsWith("/blog/")) return null;
  const rest = pathname.slice("/blog/".length);
  if (!rest || rest === "end") {
    return { projectSlug: null as string | null, chapterSlug: null as string | null };
  }
  const parts = rest.split("/").filter(Boolean);
  if (parts.length === 1) {
    return { projectSlug: parts[0]!, chapterSlug: null as string | null };
  }
  return { projectSlug: parts[0]!, chapterSlug: parts[1]! };
}

/** Collapse all groups except those needed to show the current route. */
function expansionForPathname(pathname: string) {
  const expandedProjects = new Set<string>();

  if (
    pathname === PORTFOLIO_HOME_PATH ||
    pathname === "/" ||
    pathname === ""
  ) {
    return {
      aboutMeOpen: true,
      expandedProjects,
    };
  }

  const m = blogPathMatch(pathname);
  if (!m?.projectSlug) {
    return {
      aboutMeOpen: false,
      expandedProjects,
    };
  }

  expandedProjects.add(m.projectSlug);

  return {
    aboutMeOpen: false,
    expandedProjects,
  };
}

export function BlogOutlineExplorer() {
  const location = useLocation();
  const navigate = useNavigate();

  const pathMatch = useMemo(
    () => blogPathMatch(location.pathname),
    [location.pathname],
  );

  const [aboutMeOpen, setAboutMeOpen] = useState(() =>
    expansionForPathname(
      typeof window !== "undefined"
        ? window.location.pathname
        : PORTFOLIO_HOME_PATH,
    ).aboutMeOpen,
  );

  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(() =>
    expansionForPathname(
      typeof window !== "undefined"
        ? window.location.pathname
        : PORTFOLIO_HOME_PATH,
    ).expandedProjects,
  );

  useLayoutEffect(() => {
    const next = expansionForPathname(location.pathname);
    setAboutMeOpen(next.aboutMeOpen);
    setExpandedProjects(next.expandedProjects);
  }, [location.pathname]);

  const toggleProject = useCallback((slug: string) => {
    setExpandedProjects((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }, []);

  const handleSiteLink = useCallback(
    (sectionId: string) => {
      if (location.pathname === PORTFOLIO_HOME_PATH) {
        scrollPortfolioToId(sectionId);
      } else {
        navigate(PORTFOLIO_HOME_PATH, { state: { scrollTo: sectionId } });
      }
    },
    [location.pathname, navigate],
  );

  const handleAboutMeTitleClick = useCallback(() => {
    if (location.pathname !== PORTFOLIO_HOME_PATH) {
      navigate(PORTFOLIO_HOME_PATH);
      return;
    }
    setAboutMeOpen((o) => !o);
  }, [location.pathname, navigate]);

  const aboutMePageActive = location.pathname === PORTFOLIO_HOME_PATH;

  return (
    <nav className="flex flex-col gap-3 overflow-y-auto overflow-x-hidden min-h-0 text-left">
      {/* About Me — same row layout as project headers (w-9 chevron + label) */}
      <div className="select-none">
        <div
          className={`flex items-stretch rounded-md transition-colors ${
            aboutMePageActive ? "bg-black/[0.06]" : "hover:bg-black/[0.05]"
          }`}
        >
          <button
            type="button"
            onClick={() => setAboutMeOpen((o) => !o)}
            className={`flex items-center justify-center w-9 shrink-0 hover:opacity-100 ${
              aboutMePageActive ? "opacity-100 app-text-strong" : "opacity-60"
            }`}
            style={aboutMePageActive ? undefined : { color: APP_COLORS.textBody }}
            aria-label={aboutMeOpen ? "Collapse About me sections" : "Expand About me sections"}
          >
            <ChevronRight
              className={`w-4 h-4 shrink-0 transition-transform ${
                aboutMeOpen ? "rotate-90" : ""
              }`}
              strokeWidth={2}
              aria-hidden
            />
          </button>
          <button
            type="button"
            onClick={handleAboutMeTitleClick}
            className={`flex flex-1 items-center min-w-0 py-2 pr-2 text-left app-body font-semibold rounded-r-md transition-colors ${
              aboutMePageActive
                ? `app-text-strong hover:bg-black/[0.03]`
                : "hover:bg-black/[0.03]"
            }`}
            style={aboutMePageActive ? undefined : { color: APP_COLORS.textBody }}
            aria-label={
              aboutMePageActive
                ? aboutMeOpen
                  ? "Collapse About me sections"
                  : "Expand About me sections"
                : `Go to ${SITE_NAV_LABELS.aboutMe}`
            }
          >
            <span className="truncate min-w-0">{SITE_NAV_LABELS.aboutMe}</span>
          </button>
        </div>

        {aboutMeOpen && (
          <div
            className="mt-1 ml-9 space-y-0.5 border-l-[3px] pl-4"
            style={{ borderLeftColor: APP_COLORS.textBody }}
          >
            {(
              [
                { id: "about", label: "Background" },
                { id: "experience", label: "Experience" },
                { id: "education", label: "Education" },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSiteLink(item.id)}
                className="flex w-full items-center rounded-md px-4 py-2 text-left app-body app-text-body transition-colors hover:bg-black/[0.05] hover:text-[var(--app-text-strong)]"
              >
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {PROJECTS.map((project) => {
        const pOpen = expandedProjects.has(project.slug);
        const category = CATEGORY_META[project.category];
        const overviewActive =
          pathMatch?.projectSlug === project.slug && !pathMatch?.chapterSlug;

        return (
          <div key={project.slug} className="select-none">
            <div
              className={`flex items-stretch rounded-md transition-colors ${
                overviewActive
                  ? "bg-black/[0.06]"
                  : "hover:bg-black/[0.04]"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleProject(project.slug)}
                className={`flex items-center justify-center w-9 shrink-0 hover:opacity-100 ${
                  overviewActive
                    ? "opacity-100 app-text-strong"
                    : "opacity-60"
                }`}
                style={overviewActive ? undefined : { color: category.color }}
                aria-label={pOpen ? "Collapse project chapters" : "Expand project chapters"}
              >
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    pOpen ? "rotate-90" : ""
                  }`}
                  strokeWidth={2}
                />
              </button>
              <Link
                to={getProjectOverviewPath(project.slug)}
                onClick={(e) => {
                  const inProject = pathMatch?.projectSlug === project.slug;
                  if (!inProject) return;
                  e.preventDefault();
                  toggleProject(project.slug);
                }}
                className={`flex flex-1 items-center min-w-0 py-2 pr-2 app-body font-semibold leading-snug rounded-r-md transition-colors ${
                  overviewActive ? "app-text-strong" : ""
                } ${pathMatch?.projectSlug === project.slug ? "hover:bg-black/[0.03]" : ""}`}
                style={overviewActive ? undefined : { color: category.color }}
                aria-label={
                  pathMatch?.projectSlug === project.slug
                    ? pOpen
                      ? "Collapse chapter list"
                      : "Expand chapter list"
                    : undefined
                }
              >
                <span className="truncate min-w-0">
                  {CATEGORY_META[project.category].carouselLabel}
                </span>
              </Link>
            </div>

            {pOpen && (
              <div
                className="mt-1 ml-9 space-y-0.5 border-l-[3px] pl-4"
                style={{ borderLeftColor: category.color }}
              >
                {project.chapters.map((chapter) => {
                  const chapterActive =
                    pathMatch?.projectSlug === project.slug &&
                    pathMatch?.chapterSlug === chapter.slug;
                  return (
                    <Link
                      key={chapter.slug}
                      to={`/blog/${project.slug}/${chapter.slug}`}
                      className={`flex w-full items-center rounded-md px-4 py-2 text-left app-body transition-colors hover:bg-black/[0.05] hover:text-[var(--app-text-strong)] ${
                        chapterActive
                          ? "bg-black/[0.06] font-semibold app-text-strong"
                          : "app-text-body"
                      }`}
                    >
                      <span className="truncate min-w-0">{chapter.title}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}
