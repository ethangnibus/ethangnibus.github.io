import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { woodPatternStyle } from "@/components/WoodPatternBackground";
import { SITE_SCROLL_CONTAINER_ID } from "@/data/projects";
import { usePaletteTransition } from "@/hooks/usePaletteTransition";

import type { SiteShellOutletContext } from "./siteShellContext";

export function SiteShell() {
  usePaletteTransition();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainContentRef = useRef<HTMLDivElement | null>(null);
  const [mainContentWidth, setMainContentWidth] = useState(0);

  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsSmall(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsSmall(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const hideMain = isSmall && sidebarOpen;

  useLayoutEffect(() => {
    if (hideMain) {
      document.documentElement.style.removeProperty("--blog-main-left");
      document.documentElement.style.removeProperty("--blog-main-width");
      return;
    }

    const element = mainContentRef.current;
    if (!element) return;

    const syncMainColumn = () => {
      const r = element.getBoundingClientRect();
      setMainContentWidth(r.width);
      document.documentElement.style.setProperty("--blog-main-left", `${r.left}px`);
      document.documentElement.style.setProperty("--blog-main-width", `${r.width}px`);
    };

    syncMainColumn();
    const observer = new ResizeObserver(syncMainColumn);
    observer.observe(element);
    window.addEventListener("resize", syncMainColumn);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncMainColumn);
      document.documentElement.style.removeProperty("--blog-main-left");
      document.documentElement.style.removeProperty("--blog-main-width");
    };
  }, [hideMain]);

  const outletContext: SiteShellOutletContext = {
    mainContentWidth,
    blogSidebarOpen: sidebarOpen,
    toggleBlogSidebar: () => setSidebarOpen((open) => !open),
  };

  return (
    <div className="flex flex-row h-[100dvh] w-full overflow-hidden">
      <div
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "220px 220px",
          opacity: 0.042,
        }}
      />

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isSmall={isSmall}
      />

      {!hideMain && (
        <div
          ref={mainContentRef}
          className="relative flex-1 flex flex-col min-w-0 h-full overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 z-50 pointer-events-none">
            <div className="pointer-events-auto w-full">
              <Navbar
                edgeToEdge={isSmall}
                sidebarOpen={sidebarOpen}
                onMenuToggle={() => setSidebarOpen((open) => !open)}
              />
            </div>
          </div>

          <div
            id={SITE_SCROLL_CONTAINER_ID}
            className="flex-1 overflow-y-auto md:pb-6"
            style={woodPatternStyle("far-grid")}
          >
            <Outlet context={outletContext} />
          </div>
        </div>
      )}
    </div>
  );
}
