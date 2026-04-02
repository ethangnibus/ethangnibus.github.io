import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { AboutSection } from "@/components/AboutSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { Footer } from "@/components/Footer";
import { PORTFOLIO_HOME_PATH, SITE_SCROLL_CONTAINER_ID } from "@/data/projects";

/** Body below the shared hero (see `BlogPortfolioHeroLayout`). */
export function PortfolioHomePage() {
  const location = useLocation();
  const navigate = useNavigate();

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

  return (
    <>
      <div className="max-w-4xl mx-auto w-full">
        <AboutSection />
      </div>

      <div className="max-w-4xl mx-auto w-full">
        <ExperienceSection />
      </div>

      <div className="shadow-lg shadow-black/10">
        <Footer />
      </div>
    </>
  );
}
