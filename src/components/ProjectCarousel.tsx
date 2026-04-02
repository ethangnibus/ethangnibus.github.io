import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BlurImage } from "./BlurImage";
import { ProjectedText } from "./ProjectedText";
import { APP_PALETTE } from "@/theme";

export interface CarouselSlide {
  title: string;
  description: string;
  image: string;
  smallImage: string;
  ctaText: string;
  ctaHref: string;
  interval?: number;
}

interface ProjectCarouselProps {
  slides: CarouselSlide[];
}

const SLIDE_VARIANTS = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? "100%" : "-100%", opacity: 0 }),
};

const SLIDE_TRANSITION = {
  type: "tween" as const,
  duration: 0.5,
  ease: "easeInOut",
};

const ARROW_STYLE: React.CSSProperties = {
  background:
    "linear-gradient(to bottom, rgba(26,18,10,0.45) 0%, rgba(26,18,10,0.7) 100%)",
  border: "1px solid rgba(200,120,90,0.3)",
  boxShadow:
    "0 4px 16px rgba(0,0,0,0.35), inset 0 1px 0 rgba(200,120,90,0.12)",
};

export function ProjectCarousel({ slides }: ProjectCarouselProps) {
  const [[index, direction], setPage] = useState([0, 0]);
  const [locked, setLocked] = useState(false);

  const paginate = useCallback(
    (newDir: number) => {
      if (locked) return;
      setLocked(true);
      setPage(([cur]) => [
        (cur + newDir + slides.length) % slides.length,
        newDir,
      ]);
    },
    [locked, slides.length],
  );

  const goTo = useCallback(
    (target: number) => {
      if (locked || target === index) return;
      setLocked(true);
      setPage(([cur]) => [target, target > cur ? 1 : -1]);
    },
    [locked, index],
  );

  useEffect(() => {
    const ms = slides[index]?.interval ?? 5000;
    const id = setTimeout(() => paginate(1), ms);
    return () => clearTimeout(id);
  }, [index, slides, paginate]);

  return (
    <div className="flex flex-row">
      {/* Left arrow */}
      <button
        onClick={() => paginate(-1)}
        className="w-12 md:w-16 self-stretch flex items-center justify-center text-portal-cosmoLight/80 hover:text-portal-cosmoLight transition-all duration-300 shrink-0"
        style={ARROW_STYLE}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Square image area */}
      <div className="flex-1 relative aspect-square bg-app-media overflow-hidden min-w-0">
        <AnimatePresence
          initial={false}
          custom={direction}
          onExitComplete={() => setLocked(false)}
        >
          <motion.div
            key={index}
            custom={direction}
            variants={SLIDE_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            transition={SLIDE_TRANSITION}
            className="absolute inset-0"
          >
            <a
              href={slides[index].ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group block absolute inset-0 cursor-pointer"
            >
              <div className="absolute inset-0 transition-transform duration-300 ease-out group-hover:scale-[1.03]">
                <BlurImage
                  src={slides[index].image}
                  smallSrc={slides[index].smallImage}
                  alt={slides[index].title}
                />
              </div>

              <div
                className="absolute inset-0 portal-depth-inset"
                style={{
                  backgroundImage: [
                    "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.6) 100%)",
                    "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)",
                    "linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
                  ].join(", "),
                  backgroundSize:
                    "100% 100%, 31.41592653589793px 31.41592653589793px, 31.41592653589793px 31.41592653589793px",
                }}
              />

              <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-8 md:px-20 transition-transform duration-300 ease-out group-hover:scale-[1.03]">
                {/* Slide counter */}
                <motion.p
                  className="font-mono text-portal-cosmoLight text-sm tracking-[0.4em] uppercase font-bold mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <ProjectedText
                    text={`${String(index + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`}
                    color={APP_PALETTE.portalCosmoLight}
                    dark
                    intensity={0.5}
                  />
                </motion.p>

                <motion.h1
                  className="font-mono text-2xl min-[450px]:text-3xl min-[768px]:text-5xl font-bold mb-3 text-white"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                >
                  <ProjectedText
                    text={slides[index].title}
                    color={APP_PALETTE.white}
                    dark
                  />
                </motion.h1>

                <motion.p
                  className="text-base min-[450px]:text-lg min-[768px]:text-xl max-w-2xl text-white/90"
                  style={{ textShadow: "1px 1px 6px rgba(0,0,0,0.9)" }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 }}
                >
                  <ProjectedText
                    text={slides[index].description}
                    color={APP_PALETTE.white}
                    dark
                    intensity={0.5}
                  />
                </motion.p>
              </div>
            </a>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2.5 items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-sm transition-all duration-300 ${
                i === index
                  ? "w-6 h-2.5 bg-portal-cosmoLight shadow-[0_0_10px_rgba(200,120,90,0.9)]"
                  : "w-2.5 h-2.5 bg-white/35 hover:bg-portal-cosmoLight/70"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right arrow */}
      <button
        onClick={() => paginate(1)}
        className="w-12 md:w-16 self-stretch flex items-center justify-center text-portal-cosmoLight/80 hover:text-portal-cosmoLight transition-all duration-300 shrink-0"
        style={ARROW_STYLE}
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>
    </div>
  );
}
