import {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  type TouchEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { BlurImage } from "./BlurImage";
import { LetterboxBars } from "./blog/LetterboxBars";
import { HeroIntroTextColumn } from "./HeroIntroTextColumn";
import {
  CATEGORY_META,
  getProjectBySlug,
  PORTFOLIO_HOME_PATH,
  SITE_NAV_LABELS,
  type Project,
} from "@/data/projects";
import { APP_PALETTE, NAVBAR_SURFACE } from "@/theme";

interface Slide {
  title: string;
  description: string;
  image: string;
  smallImage: string;
  section: "about" | string;
  type: "about" | "project";
  category?: Project["category"];
}

const HERO_SLIDE: Slide = {
  title: "Hi Friends!",
  description:
    "You can browse my project portfolio above, or keep scrolling to learn more about me.",
  image: "/images/main/two_trees/two_trees.jpg",
  smallImage: "/images/main/two_trees/two_trees-small.jpg",
  section: "about",
  type: "about",
};

const HERO_META = {
  about: {
    label: SITE_NAV_LABELS.aboutMe,
    shortLabel: "About",
    color: APP_PALETTE.textBody,
    bg: `rgba(${APP_PALETTE.textBodyRgb}, 0.07)`,
    activeBg: APP_PALETTE.textBody,
    text: `rgba(${APP_PALETTE.textBodyRgb}, 0.6)`,
    glow: `0 0 12px rgba(${APP_PALETTE.textBodyRgb}, 0.3)`,
  },
  graphics: {
    ...CATEGORY_META.graphics,
    bg: `rgba(${APP_PALETTE.categoryGraphicsRgb}, 0.07)`,
    activeBg: APP_PALETTE.categoryGraphics,
    text: `rgba(${APP_PALETTE.categoryGraphicsRgb}, 0.7)`,
    glow: `0 0 12px rgba(${APP_PALETTE.categoryGraphicsRgb}, 0.35)`,
  },
  cv: {
    ...CATEGORY_META.cv,
    bg: `rgba(${APP_PALETTE.categoryCvRgb}, 0.07)`,
    activeBg: APP_PALETTE.categoryCv,
    text: `rgba(${APP_PALETTE.categoryCvRgb}, 0.7)`,
    glow: `0 0 12px rgba(${APP_PALETTE.categoryCvRgb}, 0.35)`,
  },
} as const;

/** Sync carousel highlight + hero frame with the URL (sidebar / browse always match the strip). */
function carouselActiveSectionFromPath(pathname: string): "about" | string {
  if (pathname === PORTFOLIO_HOME_PATH) return "about";
  if (!pathname.startsWith("/blog/")) return "about";
  const parts = pathname.slice("/blog/".length).split("/").filter(Boolean);
  if (parts.length === 0) return "about";
  const first = parts[0]!;
  if (first === "end") return "about";
  const project = getProjectBySlug(first);
  return project ? project.slug : "about";
}

interface HeroProjectsCarouselProps {
  contentWidth: number;
  projects: Project[];
  onSelect: (section: "about" | string) => void;
  onStartReading: (path: string) => void;
  blogSidebarOpen: boolean;
  onToggleBlogSidebar: () => void;
}

export function HeroProjectsCarousel({
  contentWidth,
  projects,
  onSelect,
  onStartReading,
  blogSidebarOpen,
  onToggleBlogSidebar,
}: HeroProjectsCarouselProps) {
  const location = useLocation();
  const activeSection = useMemo(
    () => carouselActiveSectionFromPath(location.pathname),
    [location.pathname],
  );
  const slides = useMemo<Slide[]>(
    () => [
      HERO_SLIDE,
      ...projects.map((project) => ({
        title: project.shortTitle,
        description: project.description,
        image: project.image,
        smallImage: project.smallImage,
        section: project.slug,
        type: "project" as const,
        category: project.category,
      })),
    ],
    [projects],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const currentSlide = slides[currentIndex];

  useEffect(() => {
    const targetIndex = slides.findIndex((slide) => slide.section === activeSection);
    if (targetIndex === -1 || targetIndex === currentIndex) return;
    setDirection(targetIndex > currentIndex ? 1 : -1);
    setCurrentIndex(targetIndex);
  }, [activeSection, currentIndex, slides]);

  const goTo = useCallback(
    (target: number) => {
      if (target < 0 || target >= slides.length || target === currentIndex) return;
      setUserInteracted(true);
      onSelect(slides[target].section);
    },
    [currentIndex, onSelect, slides],
  );

  const paginate = useCallback(
    (dir: number) => {
      setUserInteracted(true);
      const target = (currentIndex + dir + slides.length) % slides.length;
      onSelect(slides[target].section);
    },
    [currentIndex, onSelect, slides],
  );

  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const didSwipe = useRef(false);

  const onTouchStart = useCallback((e: TouchEvent) => {
    setUserInteracted(true);
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    didSwipe.current = false;
  }, []);

  const onTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!touchStart.current) return;
      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      const dy = e.changedTouches[0].clientY - touchStart.current.y;
      touchStart.current = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        didSwipe.current = true;
        paginate(dx < 0 ? 1 : -1);
      }
    },
    [paginate],
  );

  const activeMeta =
    currentSlide.type === "about"
      ? HERO_META.about
      : HERO_META[currentSlide.category ?? "graphics"];

  const activeProjectForCta =
    currentSlide.type === "project"
      ? projects.find((p) => p.slug === currentSlide.section)
      : null;
  const firstChapterForCta = activeProjectForCta?.chapters[0];
  const edgeMode = contentWidth > 0 && contentWidth <= 768;
  const compactMode = contentWidth > 0 && contentWidth <= 640;
  const tinyMode = contentWidth > 0 && contentWidth <= 350;

  const visibleSlideIndices = useMemo(() => {
    if (slides.length <= 3) {
      return slides.map((_, index) => index);
    }
    if (currentIndex <= 1) return [0, 1, 2];
    if (currentIndex >= slides.length - 2) {
      return [slides.length - 3, slides.length - 2, slides.length - 1];
    }
    return [currentIndex - 1, currentIndex, currentIndex + 1];
  }, [currentIndex, slides]);

  const getSlideButtonLabel = useCallback((slide: Slide) => {
    if (slide.type === "about") return HERO_META.about.label;
    return HERO_META[slide.category ?? "graphics"].carouselLabel;
  }, []);

  const imageCard = (
    <div
      className={`relative aspect-[3/2] overflow-hidden bg-app-media ${
        edgeMode ? "border-y" : "border"
      } border-app-black shadow-lg shadow-black/10`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
          transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="w-full h-full transition-transform duration-300 ease-out can-hover:group-hover:scale-[1.04]">
            <BlurImage
              src={currentSlide.image}
              smallSrc={currentSlide.smallImage}
              alt={currentSlide.title}
            />
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 portal-depth-inset pointer-events-none" />
      <LetterboxBars strategy="translate" />
      <div className="absolute bottom-[10%] right-3 md:right-4 z-10 opacity-0 can-hover:group-hover:opacity-100 transition-all duration-500 pointer-events-none translate-y-1 can-hover:group-hover:translate-y-0">
        <span
          className={`app-cta inline-flex items-center gap-2 ${
            edgeMode ? "px-3 py-1.5" : "px-4 py-2"
          } text-white`}
          style={{ backgroundColor: activeMeta.activeBg }}
        >
          {currentSlide.type === "about" ? (
            "Contact me ↗"
          ) : (
            <>
              Dive in
              <ArrowRight size={16} strokeWidth={2} className="shrink-0" aria-hidden />
            </>
          )}
        </span>
      </div>
    </div>
  );

  return (
    <div className="w-full flex justify-center">
      <div
        className={`w-full max-w-3xl ${edgeMode ? "" : "pt-[110px]"}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className={`${
            edgeMode
              ? "pt-[83px] pb-1.5 border-y"
              : "pt-2 pb-2 border"
          } ${tinyMode ? "px-0" : edgeMode ? "px-2" : "px-2.5"}`}
          style={{
            backgroundColor: `rgba(${APP_PALETTE.woodLineRgb}, 0.15)`,
            borderColor: `rgba(${APP_PALETTE.woodLineRgb}, 0.22)`,
          }}
        >
          <div className={`grid grid-cols-3 ${tinyMode ? "gap-0" : compactMode ? "gap-1" : "gap-2"}`}>
            {visibleSlideIndices.map((index) => {
              const slide = slides[index];
              const meta =
                slide.type === "about"
                  ? HERO_META.about
                  : HERO_META[slide.category ?? "graphics"];
              const isActive = currentIndex === index;

              return (
                <button
                  key={slide.section}
                  onClick={() => goTo(index)}
                  className={`group relative w-full overflow-hidden ${
                    tinyMode ? "rounded-none" : "rounded-[3px]"
                  } aspect-[1.618/1] transition-all duration-200 ${
                    isActive
                      ? compactMode ? "border" : "border-2"
                      : compactMode ? "border-[0.5px]" : "border"
                  }`}
                  style={{
                    borderColor: isActive
                      ? NAVBAR_SURFACE.border
                      : APP_PALETTE.carouselThumbBorderInactive,
                    boxShadow: isActive ? meta.glow : "0 8px 20px rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out ${
                      isActive ? "scale-[1.04]" : "scale-100 can-hover:group-hover:scale-[1.04]"
                    }`}
                    style={{ backgroundImage: `url(${slide.image})` }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: isActive
                        ? `linear-gradient(180deg, rgba(0,0,0,0.18) 0%, ${meta.activeBg}CC 100%)`
                        : "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.52) 100%)",
                    }}
                  />
                  <LetterboxBars
                    barBackground={isActive ? NAVBAR_SURFACE.gradient : "black"}
                  />
                  <span
                    className={`app-eyebrow relative z-10 block px-2 py-3 text-white text-center text-balance ${
                      tinyMode ? "text-[0.75rem]" : ""
                    }`}
                  >
                    {getSlideButtonLabel(slide)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className={`flex justify-end ${edgeMode ? "pt-1.5" : "pt-2"} px-2`}>
            <button
              type="button"
              onClick={onToggleBlogSidebar}
              aria-expanded={blogSidebarOpen}
              className={`app-cta px-4 py-3 min-h-[44px] border transition-colors ${
                tinyMode ? "text-[0.75rem]" : ""
              }`}
              style={{
                borderColor: `rgba(var(--app-wood-line-rgb), 0.16)`,
                backgroundColor: `var(--app-card-warm)`,
                color: `var(--app-text-body)`,
              }}
            >
              {blogSidebarOpen
                ? SITE_NAV_LABELS.closeBlogPosts
                : SITE_NAV_LABELS.browseBlogPosts}
            </button>
          </div>
        </div>

        <div
          className={`px-3 sm:px-4 pt-6 ${
            firstChapterForCta && activeProjectForCta
              ? "pb-3 md:pb-4"
              : "pb-6 md:pb-8"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="flex flex-col"
            >
              <HeroIntroTextColumn
                eyebrow={activeMeta.label}
                eyebrowColor={activeMeta.color}
                eyebrowIntensity={0.3}
                title={currentSlide.title}
                titleIntensity={0.3}
                description={currentSlide.description}
              />
              {firstChapterForCta && activeProjectForCta && (
                <div className="mt-3 md:mt-4 flex justify-end">
                  <Link
                    to={`/blog/${activeProjectForCta.slug}/${firstChapterForCta.slug}`}
                    className="group inline-flex items-center gap-2 app-eyebrow transition-opacity duration-200 hover:opacity-75 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-app-black rounded-sm"
                    style={{ color: activeMeta.color }}
                    onClick={() => setUserInteracted(true)}
                  >
                    Start reading
                    <ArrowRight
                      size={16}
                      strokeWidth={2}
                      className="shrink-0 transition-transform duration-200 can-hover:group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {currentSlide.type === "about" ? (
          <button
            type="button"
            aria-label="Visit Ethan Gnibus on LinkedIn (opens in new tab)"
            className="block group w-full text-left bg-transparent border-0 p-0"
            onClick={() => {
              setUserInteracted(true);
              if (didSwipe.current) {
                didSwipe.current = false;
                return;
              }
              window.open(
                "https://www.linkedin.com/in/ethangnibus",
                "_blank",
                "noopener,noreferrer",
              );
            }}
          >
            {imageCard}
          </button>
        ) : (
          <button
            type="button"
            aria-label={`Start reading ${currentSlide.title}`}
            className="block group w-full text-left bg-transparent border-0 p-0"
            onClick={() => {
              setUserInteracted(true);
              if (didSwipe.current) {
                didSwipe.current = false;
                return;
              }
              const project = projects.find(
                (candidate) => candidate.slug === currentSlide.section,
              );
              const firstChapter = project?.chapters[0];
              if (!firstChapter) return;
              onStartReading(`/blog/${project.slug}/${firstChapter.slug}`);
            }}
          >
            {imageCard}
          </button>
        )}

      </div>
    </div>
  );
}
