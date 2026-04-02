import { useLayoutEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import "@/theme";
import "./index.css";
import { SiteShell } from "@/layouts/SiteShell.tsx";
import { PortfolioHomePage } from "@/pages/PortfolioHomePage.tsx";
import { ProjectOverviewPage } from "@/pages/ProjectOverviewPage.tsx";
import { BlogIndex } from "@/pages/BlogIndex.tsx";
import {
  BlogIntroduction,
  BlogIntroductionAlias,
} from "@/pages/BlogIntroduction.tsx";
import { BlogPost } from "@/pages/BlogPost.tsx";
import { BlogEnd } from "@/pages/BlogEnd.tsx";
import { PORTFOLIO_HOME_PATH, SITE_SCROLL_CONTAINER_ID } from "@/data/projects.ts";

function ScrollToTop() {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById(SITE_SCROLL_CONTAINER_ID)?.scrollTo({ top: 0 });
  }, [location.pathname]);

  return null;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route element={<SiteShell />}>
        <Route path="/" element={<Navigate to={PORTFOLIO_HOME_PATH} replace />} />
        <Route path="/blog/about-me" element={<PortfolioHomePage />} />
        <Route path="/blog/end" element={<BlogEnd />} />
        <Route
          path="/blog/:projectSlug/introduction"
          element={<BlogIntroduction />}
        />
        <Route
          path="/blog/:projectSlug/intro"
          element={<BlogIntroductionAlias />}
        />
        <Route path="/blog/:projectSlug/:chapterSlug" element={<BlogPost />} />
        <Route path="/blog/:projectSlug" element={<ProjectOverviewPage />} />
        <Route path="/blog" element={<BlogIndex />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
