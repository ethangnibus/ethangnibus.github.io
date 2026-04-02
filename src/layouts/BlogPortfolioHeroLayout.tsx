import { Outlet, useNavigate, useOutletContext } from "react-router-dom";

import { HeroProjectsCarousel } from "@/components/HeroProjectsCarousel";
import { PORTFOLIO_HOME_PATH, PROJECTS } from "@/data/projects";
import type { SiteShellOutletContext } from "@/layouts/siteShellContext";

/**
 * Single hero carousel for both portfolio home and project overview so slide index and
 * AnimatePresence survive route changes (e.g. graphics → about-me animates in correctly).
 */
export function BlogPortfolioHeroLayout() {
  const navigate = useNavigate();
  const { mainContentWidth, blogSidebarOpen, toggleBlogSidebar } =
    useOutletContext<SiteShellOutletContext>();

  const handleSelectSection = (section: "about" | string) => {
    navigate(section === "about" ? PORTFOLIO_HOME_PATH : `/blog/${section}`);
  };

  return (
    <div className="flex flex-col md:gap-6">
      <div id="projects">
        <HeroProjectsCarousel
          contentWidth={mainContentWidth}
          projects={PROJECTS}
          onSelect={handleSelectSection}
          onStartReading={(path) => navigate(path)}
          blogSidebarOpen={blogSidebarOpen}
          onToggleBlogSidebar={toggleBlogSidebar}
        />
      </div>
      <Outlet />
    </div>
  );
}
