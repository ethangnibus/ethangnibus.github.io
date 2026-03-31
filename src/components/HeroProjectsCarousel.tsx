import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BlurImage } from "./BlurImage";
import { ProjectedText } from "./ProjectedText";

/* ── Public slide interface ── */

export interface CarouselSlide {
  title: string;
  description: string;
  image: string;
  smallImage: string;
  ctaText: string;
  ctaHref: string;
  interval?: number;
}

/* ── Section config ── */

type SlideGroup = "hero" | "cv" | "graphics";

const SECTIONS: Record<SlideGroup, { title: string } | null> = {
  hero: null,
  cv: { title: "Computer Vision" },
  graphics: { title: "Computer Graphics" },
};

/* ── Internal flat slide ── */

interface FlatSlide {
  group: SlideGroup;
  image: string;
  smallImage: string;
  title: string;
  subtitle: string;
  href?: string;
  interval?: number;
}

/* ── Image overlay ── */

const IMAGE_OVERLAY: React.CSSProperties = {
  backgroundImage: [
    "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.02) 30%, rgba(0,0,0,0.40) 100%)",
    "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)",
    "linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
  ].join(", "),
  backgroundSize:
    "100% 100%, 31.41592653589793px 31.41592653589793px, 31.41592653589793px 31.41592653589793px",
};

/* ── Stack depth shadow layers ── */

const STACK_LAYERS = [
  { rotate: "2.5deg", tx: -3, ty: 4, bg: "#f5f2ed", shadow: "0 2px 12px rgba(0,0,0,0.10)" },
  { rotate: "-2deg", tx: 5, ty: 9, bg: "#f0ede8", shadow: "0 2px 8px rgba(0,0,0,0.06)" },
];

/* ── Polaroid card ── */

function PolaroidCard({ slide }: { slide: FlatSlide }) {
  const isHero = slide.group === "hero";
  const section = SECTIONS[slide.group];

  return (
    <div className="h-full w-full flex flex-col bg-[#faf8f4] rounded-[3px]">
      {/* Image area with even border on top/left/right */}
      <div className="relative flex-1 mx-[10px] mt-[10px] md:mx-3.5 md:mt-3.5 overflow-hidden bg-[#0a0a0a]">
        <BlurImage src={slide.image} smallSrc={slide.smallImage} alt={slide.title} />
        <div className="absolute inset-0 portal-depth-inset" style={IMAGE_OVERLAY} />
        {!isHero && section && (
          <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10">
            <span className="font-mono text-[8px] md:text-[10px] tracking-[0.2em] uppercase font-bold text-white/60 bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5 md:px-2.5 md:py-1">
              {section.title}
            </span>
          </div>
        )}
      </div>
      {/* Caption area — thick bottom border like a polaroid */}
      <div className="shrink-0 px-[10px] pt-2 pb-[10px] md:px-3.5 md:pt-2.5 md:pb-3.5">
        <h3 className="font-mono text-sm md:text-lg font-bold text-[#1a1a1a] truncate">
          <ProjectedText color="#1a1a1a" intensity={0.4}>
            {isHero ? "Hi Friends," : slide.title}
          </ProjectedText>
        </h3>
        <p className="font-mono text-[10px] md:text-xs text-[#888] mt-0.5 line-clamp-1">
          {isHero ? "Welcome to my Blog \u2014 I'm Ethan" : slide.subtitle}
        </p>
      </div>
    </div>
  );
}

/* ── Main component ── */

interface HeroProjectsCarouselProps {
  cvSlides: CarouselSlide[];
  graphicsSlides: CarouselSlide[];
}

export function HeroProjectsCarousel({
  cvSlides,
  graphicsSlides,
}: HeroProjectsCarouselProps) {
  const allSlides = useMemo<FlatSlide[]>(
    () => [
      {
        group: "hero",
        image: "/images/main/two_trees/two_trees.jpg",
        smallImage: "/images/main/two_trees/two_trees-small.jpg",
        title: "Hi Friends,",
        subtitle: "Welcome to my Blog",
        interval: 12000,
      },
      ...cvSlides.map(
        (s): FlatSlide => ({
          group: "cv",
          image: s.image,
          smallImage: s.smallImage,
          title: s.title,
          subtitle: s.description,
          href: s.ctaHref,
          interval: s.interval,
        }),
      ),
      ...graphicsSlides.map(
        (s): FlatSlide => ({
          group: "graphics",
          image: s.image,
          smallImage: s.smallImage,
          title: s.title,
          subtitle: s.description,
          href: s.ctaHref,
          interval: s.interval,
        }),
      ),
    ],
    [cvSlides, graphicsSlides],
  );

  /* ── Group metadata for section tabs ── */

  const groups = useMemo(() => {
    const result: { key: SlideGroup; label: string; shortLabel: string; startIndex: number; count: number }[] = [];
    let lastGroup: SlideGroup | null = null;
    for (let i = 0; i < allSlides.length; i++) {
      if (allSlides[i].group !== lastGroup) {
        const sec = SECTIONS[allSlides[i].group];
        result.push({
          key: allSlides[i].group,
          label: allSlides[i].group === "hero" ? "Welcome" : sec!.title,
          shortLabel: allSlides[i].group === "hero" ? "Intro" : allSlides[i].group === "cv" ? "Vision" : "Graphics",
          startIndex: i,
          count: 0,
        });
        lastGroup = allSlides[i].group;
      }
      result[result.length - 1].count++;
    }
    return result;
  }, [allSlides]);

  /* ── Deck animation state ── */

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDealing, setIsDealing] = useState(false);
  const [dealDir, setDealDir] = useState<1 | -1>(1);
  const [targetIndex, setTargetIndex] = useState(0);

  const activeGroupIdx = useMemo(
    () => groups.findIndex(g => currentIndex >= g.startIndex && currentIndex < g.startIndex + g.count),
    [groups, currentIndex],
  );
  const activeGroup = groups[activeGroupIdx];
  const indexInGroup = currentIndex - activeGroup.startIndex;

  const paginate = useCallback(
    (dir: number) => {
      if (isDealing) return;
      const target = (currentIndex + dir + allSlides.length) % allSlides.length;
      setTargetIndex(target);
      setDealDir(dir > 0 ? 1 : -1);
      setIsDealing(true);
    },
    [isDealing, currentIndex, allSlides.length],
  );

  const goTo = useCallback(
    (target: number) => {
      if (isDealing || target === currentIndex) return;
      setTargetIndex(target);
      setDealDir(target > currentIndex ? 1 : -1);
      setIsDealing(true);
    },
    [isDealing, currentIndex],
  );

  const onDealComplete = useCallback(() => {
    setCurrentIndex(targetIndex);
    setIsDealing(false);
  }, [targetIndex]);

  /* Auto-advance once from the hero slide */
  const [hasAutoAdvanced, setHasAutoAdvanced] = useState(false);
  const [pulseRight, setPulseRight] = useState(false);

  useEffect(() => {
    if (hasAutoAdvanced || isDealing || currentIndex !== 0) return;
    const id = setTimeout(() => {
      setPulseRight(true);
      setTimeout(() => {
        paginate(1);
        setHasAutoAdvanced(true);
        setTimeout(() => setPulseRight(false), 800);
      }, 600);
    }, 3000);
    return () => clearTimeout(id);
  }, [hasAutoAdvanced, isDealing, currentIndex, paginate]);

  /* ── Swipe support (horizontal only for deck) ── */

  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const didSwipe = useRef(false);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
    didSwipe.current = false;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      didSwipe.current = true;
      paginate(dx < 0 ? 1 : -1);
    }
  }, [paginate]);

  /* ── Derived slide data ── */

  const currentSlide = allSlides[currentIndex];
  const targetSlide = allSlides[targetIndex];
  const fwd = dealDir > 0;

  /*
   * Deck metaphor:
   *   Forward  (right) → target slides in on top, current stays below
   *   Backward (left)  → current slides off, target revealed below
   */
  const staticSlide = fwd ? currentSlide : targetSlide;
  const dealingSlide = fwd ? targetSlide : currentSlide;

  const stackDepth = Math.min(currentIndex, 2);

  /* ── Compute card size to preserve aspect ratio ── */

  const containerRef = useRef<HTMLDivElement>(null);
  const [cardSize, setCardSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const CHROME = 160;
    const MAX_WIDTH = 820;

    const update = () => {
      const cw = Math.min(el.clientWidth - 32, MAX_WIDTH);
      const ch = window.innerHeight - CHROME;
      const ratio = 3 / 2;
      let w = cw;
      let h = w / ratio;
      if (h > ch) {
        h = ch;
        w = h * ratio;
      }
      setCardSize({ width: Math.floor(w), height: Math.floor(h) });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);
    return () => { observer.disconnect(); window.removeEventListener("resize", update); };
  }, []);

  const CARD_SHADOW = "0 4px 20px rgba(0,0,0,0.15), 0 2px 6px rgba(0,0,0,0.1)";
  const DEALING_SHADOW = "0 8px 30px rgba(0,0,0,0.2), 0 3px 10px rgba(0,0,0,0.12)";

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center overflow-hidden"
    >
      {/* ── Section tabs (above polaroid) ── */}
      <div className="flex items-center justify-center gap-1.5 md:gap-2 pb-3 md:pb-4 w-full px-3">
        {groups.map((g, gi) => {
          const active = gi === activeGroupIdx;
          return (
            <button
              key={g.key}
              onClick={() => goTo(g.startIndex)}
              className={`font-mono text-[11px] md:text-xs tracking-wider uppercase font-bold px-4 py-2 md:px-5 md:py-2.5 rounded-full transition-all duration-300 ${
                active
                  ? "bg-[#5a4028] text-[#f5f0eb] shadow-md"
                  : "text-[#5A4A30] hover:bg-[#5A4A30]/10"
              }`}
            >
              <ProjectedText
                color={active ? "#f5f0eb" : "#5A4A30"}
                dark={active}
                intensity={0.4}
              >
                <span className="hidden min-[450px]:inline">{g.label}</span>
                <span className="min-[450px]:hidden">{g.shortLabel}</span>
              </ProjectedText>
            </button>
          );
        })}
      </div>

      {/* ── Polaroid deck ── */}
      <a
        href={currentSlide.href ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          if (!currentSlide.href || didSwipe.current) e.preventDefault();
          didSwipe.current = false;
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="group relative block mx-auto cursor-pointer"
        style={{
          width: cardSize.width || "auto",
          height: cardSize.height || "auto",
        }}
      >
        {STACK_LAYERS.map((layer, i) =>
          stackDepth > i ? (
            <div
              key={`stack-${i}`}
              className="absolute inset-0 rounded-[3px]"
              style={{
                zIndex: -i - 1,
                transform: `rotate(${layer.rotate}) translate(${layer.tx}px, ${layer.ty}px)`,
                backgroundColor: layer.bg,
                boxShadow: layer.shadow,
              }}
            />
          ) : null,
        )}

        {isDealing && (
          <div
            className="absolute inset-0 rounded-[3px] overflow-hidden"
            style={{ zIndex: 5, boxShadow: CARD_SHADOW }}
          >
            <PolaroidCard slide={staticSlide} />
          </div>
        )}

        {isDealing ? (
          <motion.div
            key={`deal-${targetIndex}-${dealDir}`}
            className="absolute inset-0 rounded-[3px] overflow-hidden"
            style={{ zIndex: 10, boxShadow: DEALING_SHADOW }}
            initial={fwd
              ? { x: "110%", rotate: 6, scale: 0.96, opacity: 0 }
              : { x: 0, rotate: 0, scale: 1, opacity: 1 }
            }
            animate={fwd
              ? { x: 0, rotate: 0, scale: 1, opacity: 1 }
              : { x: "110%", rotate: 6, scale: 0.96, opacity: 0 }
            }
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            onAnimationComplete={onDealComplete}
          >
            <PolaroidCard slide={dealingSlide} />
          </motion.div>
        ) : (
          <div
            className="absolute inset-0 rounded-[3px] overflow-hidden transition-all duration-300 ease-out group-hover:scale-[1.01] group-hover:-translate-y-0.5"
            style={{ zIndex: 10, boxShadow: CARD_SHADOW }}
          >
            <PolaroidCard slide={currentSlide} />
          </div>
        )}

        {!isDealing && currentSlide.href && (
          <div className="absolute -bottom-3 right-4 md:right-6 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="font-mono text-[9px] md:text-[11px] tracking-[0.15em] uppercase font-bold text-white bg-[#7A2252] px-3 py-1 md:px-4 md:py-1.5 rounded-full shadow-md">
              View Project ↗
            </span>
          </div>
        )}
      </a>

      {/* ── Slide arrows + counter (below polaroid) ── */}
      <div className="flex items-center justify-center pt-3 md:pt-4">
        <button
          onClick={() => paginate(-1)}
          className="shrink-0 p-2.5 md:p-3 text-[#5A4A30] hover:bg-[#5A4A30]/10 rounded-full transition-all duration-200 active:scale-90"
          aria-label="Previous page"
        >
          <ProjectedText color="#5A4A30" intensity={0.5}>
            <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
          </ProjectedText>
        </button>

        <span className="font-mono text-sm md:text-base font-bold tracking-wider tabular-nums min-w-[3rem] text-center leading-none flex items-center justify-center">
          <ProjectedText color="#5A4A30" intensity={0.5}>
            {indexInGroup + 1}/{activeGroup.count}
          </ProjectedText>
        </span>

        <button
          onClick={() => paginate(1)}
          className={`shrink-0 p-2.5 md:p-3 rounded-full transition-all duration-300 active:scale-90 ${
            pulseRight
              ? "text-portal-cosmo scale-125 bg-portal-cosmo/10"
              : "text-[#5A4A30] hover:bg-[#5A4A30]/10"
          }`}
          aria-label="Next page"
        >
          <ProjectedText color={pulseRight ? "#A0522D" : "#5A4A30"} intensity={0.5}>
            <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
          </ProjectedText>
        </button>
      </div>
    </div>
  );
}
