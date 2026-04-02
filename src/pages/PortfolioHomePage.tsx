import { useEffect } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";

import { HeroProjectsCarousel } from "@/components/HeroProjectsCarousel";
import { AboutSection } from "@/components/AboutSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { Footer } from "@/components/Footer";
import type { SiteShellOutletContext } from "@/layouts/siteShellContext";
import { PORTFOLIO_HOME_PATH, PROJECTS, SITE_SCROLL_CONTAINER_ID } from "@/data/projects";

export function PortfolioHomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { mainContentWidth, blogSidebarOpen, toggleBlogSidebar } =
    useOutletContext<SiteShellOutletContext>();

  useEffect(() => {
    const st = location.state as { scrollTo?: string } | null;
    const id = st?.scrollTo;
    if (location.pathname !== PORTFOLIO_HOME_PATH || !id) return;
    const container = document.getElementById(SITE_SCROLL_CONTAINER_ID);
    const el = document.getElementById(id);
    if (!container || !el) return;
    requestAnimationFrame(() => {
      container.scrollTo({
        top: el.offsetTop - 80,
        behavior: "smooth",
      });
    });
    navigate(".", { replace: true, state: {} });
  }, [location.pathname, location.state, navigate]);

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

      <div className="max-w-4xl mx-auto w-full">
        <AboutSection />
      </div>

      <div className="max-w-4xl mx-auto w-full">
        <ExperienceSection />
      </div>

      <div className="shadow-lg shadow-black/10">
        <Footer />
      </div>
    </div>
  );
}
