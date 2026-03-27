import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BlurImage } from "./BlurImage";
import { PillButton } from "./PillButton";

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
    [locked, slides.length]
  );

  const goTo = useCallback(
    (target: number) => {
      if (locked || target === index) return;
      setLocked(true);
      setPage(([cur]) => [target, target > cur ? 1 : -1]);
    },
    [locked, index]
  );

  useEffect(() => {
    const ms = slides[index]?.interval ?? 5000;
    const id = setTimeout(() => paginate(1), ms);
    return () => clearTimeout(id);
  }, [index, slides, paginate]);

  return (
    <div className="relative h-[40vh] min-[450px]:h-[60vh] min-[768px]:h-[88vh] bg-[#0a0a0a] overflow-hidden">
      <div className="absolute top-0 bottom-0 left-0 w-px bg-portal-silverDark/60 z-10" />
      <div className="absolute top-0 bottom-0 right-0 w-px bg-portal-silverDark/60 z-10" />

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
          <BlurImage
            src={slides[index].image}
            smallSrc={slides[index].smallImage}
            alt={slides[index].title}
          />

          <div
            className="absolute inset-0 portal-depth-inset"
            style={{
              backgroundImage: [
                "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.6) 100%)",
                "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)",
                "linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
              ].join(", "),
              backgroundSize: `100% 100%, 31.41592653589793px 31.41592653589793px, 31.41592653589793px 31.41592653589793px`,
            }}
          />

          <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-8 md:px-20">
            {/* Slide counter — tape orange (analog LED feel) */}
            <motion.p
              className="font-mono text-portal-goLight text-sm tracking-[0.4em] uppercase font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </motion.p>

            <motion.h1
              className="font-mono text-3xl min-[450px]:text-4xl min-[768px]:text-6xl font-bold mb-4"
              style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.9)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              {slides[index].title}
            </motion.h1>

            <motion.p
              className="text-lg min-[450px]:text-xl min-[768px]:text-2xl max-w-2xl mb-8 text-white/90"
              style={{ textShadow: "1px 1px 6px rgba(0,0,0,0.9)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
            >
              {slides[index].description}
            </motion.p>

            {/* CTA */}
            <PillButton
              variant="carousel"
              href={slides[index].ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="px-9 py-3.5 text-base tracking-widest"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              {slides[index].ctaText}
            </PillButton>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows — Wii-style bubbly circles */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-portal-blueLight transition-all duration-300 hover:scale-110 p-2 md:p-3 flex items-center justify-center"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.06) 100%)",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: "999px",
          backdropFilter: "blur(4px)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)",
        }}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-7 h-7 md:w-9 md:h-9" />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-10 text-white/80 hover:text-portal-blueLight transition-all duration-300 hover:scale-110 p-2 md:p-3 flex items-center justify-center"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.06) 100%)",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: "999px",
          backdropFilter: "blur(4px)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)",
        }}
        aria-label="Next slide"
      >
        <ChevronRight className="w-7 h-7 md:w-9 md:h-9" />
      </button>

      {/* Dots — active dot is purple, inactive hover is green */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2.5 items-center">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-sm transition-all duration-300 ${
              i === index
                ? "w-6 h-2.5 bg-portal-goLight shadow-[0_0_10px_rgba(46,224,101,0.9)]"
                : "w-2.5 h-2.5 bg-white/35 hover:bg-portal-blueLight/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
