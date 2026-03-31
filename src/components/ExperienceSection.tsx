import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PillButton } from "./PillButton";
import { ProjectedText } from "./ProjectedText";

/* ── Card data ── */

interface CardData {
  company: string;
  rank: string;
  suit: string;
  suitColor: string;
  role: string;
  description: string;
  image: React.ReactNode;
  href: string;
  ctaText: string;
  isCurrent?: boolean;
}

/* ── Compact icons for card faces ── */

const StealthIcon = () => (
  <svg
    className="rounded-full"
    width="72"
    height="72"
    viewBox="0 0 140 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ backgroundColor: "#1a1a1a" }}
  >
    <ellipse cx="70" cy="52" rx="35" ry="18" fill="#1a1a2e" />
    <path d="M30 55 Q70 35 110 55 L105 60 Q70 45 35 60 Z" fill="#1e1e3a" />
    <ellipse cx="70" cy="58" rx="42" ry="8" fill="#2a2a4a" />
    <ellipse cx="70" cy="85" rx="28" ry="22" fill="#1a1a2e" />
    <circle cx="52" cy="82" r="16" fill="#050510" stroke="#5A6458" strokeWidth="1.5" />
    <circle cx="88" cy="82" r="16" fill="#050510" stroke="#5A6458" strokeWidth="1.5" />
    <path d="M68 82 Q70 78 72 82" stroke="#5A6458" strokeWidth="1.5" fill="none" />
    <path d="M36 82 L28 78" stroke="#5A6458" strokeWidth="1.5" />
    <path d="M104 82 L112 78" stroke="#5A6458" strokeWidth="1.5" />
    <path d="M60 102 Q70 108 80 102" stroke="#2a2a4a" strokeWidth="2" fill="none" />
    <circle cx="46" cy="76" r="3" fill="#6B2E1A" opacity="0.6" />
    <circle cx="82" cy="76" r="3" fill="#6B2E1A" opacity="0.6" />
  </svg>
);

function CardImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      width={72}
      height={72}
      className="w-[72px] h-[72px] rounded-full object-cover"
      loading="lazy"
    />
  );
}

/* ── The deck ── */

const CARDS: CardData[] = [
  {
    company: "Stealth Startup",
    rank: "A",
    suit: "♠",
    suitColor: "#2a1a0a",
    role: "Full-Stack Engineer",
    description:
      "Building AI notetaking software that cuts hours of healthcare paperwork per day. Transcription, UX, and full-stack ownership from prototype to production. React / Django / TypeScript / Python / AWS.",
    image: <StealthIcon />,
    href: "https://www.linkedin.com/in/ethangnibus",
    ctaText: "Ask me about it",
    isCurrent: true,
  },
  {
    company: "UC Berkeley",
    rank: "K",
    suit: "♦",
    suitColor: "#8B1A2B",
    role: "CS 169A Instructor",
    description:
      "Teaching and organizing a class about SWE to 200+ Berkeley students :)",
    image: <CardImage src="/images/main/ucb/ucb.png" alt="UC Berkeley" />,
    href: "https://classes.berkeley.edu/content/2023-summer-compsci-169a-001-lec-001",
    ctaText: "Become my student",
  },
  {
    company: "Saasbook",
    rank: "Q",
    suit: "♣",
    suitColor: "#2a1a0a",
    role: "Software Engineer",
    description:
      "Maintaining an online SaaS textbook and its assignments for various universities.",
    image: <CardImage src="/images/main/eecs/eecs.jpg" alt="Saasbook / EECS" />,
    href: "https://e.saasbook.info/",
    ctaText: "GET /the/saasbook",
  },
  {
    company: "MRSL",
    rank: "J",
    suit: "♥",
    suitColor: "#8B1A2B",
    role: "Machine Learning Intern",
    description:
      "Developed a mobile app that classifies software-defined radio signals.",
    image: <CardImage src="/images/main/mrsl/mrsl.jpg" alt="MRSL" />,
    href: "https://www.mrsl.com/",
    ctaText: "Process some signals",
  },
  {
    company: "MBARI",
    rank: "10",
    suit: "♠",
    suitColor: "#2a1a0a",
    role: "Front-End Engineer",
    description:
      "Made a website for marine researchers to analyze ecogeological data.",
    image: <CardImage src="/images/main/mbari/mbari.jpg" alt="MBARI" />,
    href: "https://www.mbari.org/",
    ctaText: "Explore the ocean",
  },
];

/* ── Fan layout constants ── */

const CARD_W = 230;
const CARD_H = 330;
const FAN_ANGLE = 8;
const X_STEP = 48;
const Y_DROOP = 6;
const ACTIVE_LIFT = 14;
const CONTAINER_H = 400;

/* ── Playing card face ── */

function PlayingCardFace({ card }: { card: CardData }) {
  return (
    <div
      className="w-full h-full rounded-lg relative overflow-hidden flex flex-col select-none"
      style={{
        backgroundColor: "#faf8f4",
        border: "1.5px solid rgba(120,55,30,0.18)",
      }}
    >
      {/* Inner frame */}
      <div className="absolute inset-[5px] rounded-md border border-black/[0.06] pointer-events-none z-10" />

      {/* Top-left corner */}
      <div className="absolute top-2 left-2.5 z-20 flex flex-col items-center leading-none">
        <span
          className="font-serif text-lg font-bold"
          style={{ color: card.suitColor }}
        >
          {card.rank}
        </span>
        <span
          className="text-base -mt-0.5"
          style={{ color: card.suitColor }}
        >
          {card.suit}
        </span>
      </div>

      {/* Bottom-right corner (inverted) */}
      <div className="absolute bottom-2 right-2.5 z-20 flex flex-col items-center leading-none rotate-180">
        <span
          className="font-serif text-lg font-bold"
          style={{ color: card.suitColor }}
        >
          {card.rank}
        </span>
        <span
          className="text-base -mt-0.5"
          style={{ color: card.suitColor }}
        >
          {card.suit}
        </span>
      </div>

      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center px-10 text-center">
        <div className="mb-3">{card.image}</div>
        <h4 className="font-mono font-bold text-sm text-[#1a1a1a] tracking-tight leading-tight">
          <ProjectedText color="#1a1a1a" intensity={0.7}>
            {card.company}
          </ProjectedText>
        </h4>
        {card.isCurrent && (
          <span
            className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase mt-1"
            style={{ color: "#A0522D" }}
          >
            Active
          </span>
        )}
        <div className="w-8 h-px bg-black/10 my-2.5" />
        <p className="font-mono font-bold text-xs text-[#555] uppercase tracking-wider">
          <ProjectedText color="#555555" intensity={0.5}>
            {card.role}
          </ProjectedText>
        </p>
      </div>
    </div>
  );
}

/* ── Round image helper (for Academic Record) ── */

function RoundImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      width={140}
      height={140}
      className="w-36 h-36 rounded-full object-cover"
      loading="lazy"
    />
  );
}

/* ── Main section ── */

export function ExperienceSection() {
  const [activeIdx, setActiveIdx] = useState(0);

  const paginate = useCallback((dir: number) => {
    setActiveIdx((prev) => (prev + dir + CARDS.length) % CARDS.length);
  }, []);

  /* Swipe support */
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, []);
  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!touchStart.current) return;
      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      const dy = e.changedTouches[0].clientY - touchStart.current.y;
      touchStart.current = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        paginate(dx < 0 ? 1 : -1);
      }
    },
    [paginate],
  );

  const activeCard = CARDS[activeIdx];

  return (
    <div id="experience" className="flex flex-col md:gap-6 overflow-hidden">
      {/* ── Section header ── */}
      <motion.div
        className="relative overflow-hidden h-[290px] flex flex-col justify-center px-10 md:px-16 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <span
          className="portal-projected-badge inline-block mx-auto font-mono text-base tracking-[0.15em] uppercase font-bold mb-5 px-5 py-2"
          style={
            {
              "--badge-bg":
                "radial-gradient(ellipse 110% 160% at 48% 25%, rgba(122,26,58,0.24) 0%, rgba(122,26,58,0.08) 58%, rgba(122,26,58,0.02) 100%)",
            } as React.CSSProperties
          }
        >
          <ProjectedText color="#7A1A3A" intensity={0.4}>
            Employment History
          </ProjectedText>
        </span>
        <h1 className="font-mono text-5xl md:text-6xl font-bold text-[#0a0a1a]">
          <ProjectedText color="#0a0a1a">
            I've worked at a few places
          </ProjectedText>
        </h1>
        <p
          className="font-mono mt-4 text-xl tracking-wide"
          style={{ color: "#7A1A3A" }}
        >
          <ProjectedText color="#7A1A3A" intensity={0.6}>
            Here are the cool ones
          </ProjectedText>
        </p>
      </motion.div>

      {/* ── Rainbow fan of playing cards ── */}
      <div
        className="relative w-full"
        style={{ height: CONTAINER_H }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {CARDS.map((card, i) => {
          const offset = i - activeIdx;
          const absOffset = Math.abs(offset);
          const isActive = offset === 0;

          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                width: CARD_W,
                height: CARD_H,
                left: `calc(50% - ${CARD_W / 2}px)`,
                top: 30,
                zIndex: isActive ? 20 : 10 - absOffset,
                cursor: "pointer",
              }}
              animate={{
                x: offset * X_STEP,
                y: isActive ? -ACTIVE_LIFT : offset * offset * Y_DROOP,
                rotate: offset * FAN_ANGLE,
                scale: isActive ? 1.08 : 1 - absOffset * 0.03,
                opacity: absOffset > 2 ? 0.4 : 1,
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              onClick={() => {
                if (!isActive) setActiveIdx(i);
                else if (card.href)
                  window.open(card.href, "_blank", "noopener,noreferrer");
              }}
            >
              <div
                className="h-full rounded-lg"
                style={{
                  boxShadow: isActive
                    ? "0 12px 40px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.1)"
                    : "0 4px 16px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.06)",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                <PlayingCardFace card={card} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Active card detail + navigation ── */}
      <div className="flex flex-col items-center px-6 pb-8">
        <motion.div
          key={activeIdx}
          className="text-center max-w-md mb-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h4 className="font-mono text-xl md:text-2xl font-bold text-[#1a1a1a]">
            <ProjectedText color="#1a1a1a" intensity={0.8}>
              {activeCard.company}
            </ProjectedText>
          </h4>
          {activeCard.isCurrent && (
            <span
              className="portal-projected-badge inline-block text-xs font-mono font-bold px-4 py-1 tracking-widest uppercase mt-1"
              style={
                {
                  "--badge-bg":
                    "radial-gradient(ellipse 110% 160% at 50% 40%, rgba(160,82,45,0.30) 0%, rgba(160,82,45,0.11) 58%, rgba(160,82,45,0.03) 100%)",
                } as React.CSSProperties
              }
            >
              <ProjectedText color="#A0522D" intensity={0.35}>
                Active
              </ProjectedText>
            </span>
          )}
          <p className="text-[#666] text-sm md:text-base mt-2 leading-relaxed">
            <ProjectedText color="#666666" intensity={0.4}>
              {activeCard.description}
            </ProjectedText>
          </p>
          <div className="mt-4">
            <PillButton
              href={activeCard.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 text-sm tracking-widest"
            >
              <ProjectedText color="#1a1a1a" intensity={0.4}>
                {activeCard.ctaText}
              </ProjectedText>
            </PillButton>
          </div>
        </motion.div>

        {/* Navigation arrows + counter */}
        <div className="flex items-center justify-center">
          <button
            onClick={() => paginate(-1)}
            className="shrink-0 p-2.5 md:p-3 text-[#5A4A30] hover:bg-[#5A4A30]/10 rounded-full transition-all duration-200 active:scale-90"
            aria-label="Previous card"
          >
            <ProjectedText color="#5A4A30" intensity={0.5}>
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
            </ProjectedText>
          </button>

          <span className="font-mono text-sm md:text-base font-bold tracking-wider tabular-nums min-w-[3rem] text-center leading-none flex items-center justify-center">
            <ProjectedText color="#5A4A30" intensity={0.5}>
              {activeIdx + 1}/{CARDS.length}
            </ProjectedText>
          </span>

          <button
            onClick={() => paginate(1)}
            className="shrink-0 p-2.5 md:p-3 text-[#5A4A30] hover:bg-[#5A4A30]/10 rounded-full transition-all duration-200 active:scale-90"
            aria-label="Next card"
          >
            <ProjectedText color="#5A4A30" intensity={0.5}>
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
            </ProjectedText>
          </button>
        </div>
      </div>

      {/* ── Dossier ── */}
      <motion.div
        className="relative mx-4 md:mx-8 mb-10 max-w-2xl md:mx-auto"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Manila folder */}
        <div
          className="relative rounded-[3px]"
          style={{
            backgroundColor: "#C9AA6B",
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.012) 3px, rgba(0,0,0,0.012) 6px)",
            border: "1px solid #B89850",
            boxShadow:
              "0 6px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)",
          }}
        >
          {/* Folder tab */}
          <div
            className="absolute -top-[22px] left-8 md:left-12 px-5 py-1 rounded-t-[3px]"
            style={{
              backgroundColor: "#C9AA6B",
              border: "1px solid #B89850",
              borderBottom: "none",
            }}
          >
            <span className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-bold text-[#5A3E1B]/60">
              Academic Record
            </span>
          </div>

          {/* Document page */}
          <div className="m-4 md:m-5">
            <div
              className="relative rounded-[2px] p-6 md:p-8"
              style={{
                backgroundColor: "#faf7f1",
                border: "1px solid rgba(0,0,0,0.05)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              {/* Content */}
              <div className="flex gap-6 md:gap-8">
                {/* Photo */}
                <div className="flex-shrink-0">
                  <div
                    className="w-[100px] h-[128px] md:w-[120px] md:h-[152px] rounded-[2px] overflow-hidden"
                    style={{
                      border: "1px solid rgba(0,0,0,0.1)",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                    }}
                  >
                    <img
                      src="/images/main/will_square/will_square.jpg"
                      alt="Ethan Gnibus"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Fields */}
                <div className="flex-1 min-w-0 space-y-3 md:space-y-4">
                  <div>
                    <p className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[#8B7355]">
                      Name
                    </p>
                    <p className="font-mono text-lg md:text-xl font-bold text-[#1a1a1a] tracking-tight leading-tight mt-0.5">
                      Ethan Gnibus
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[#8B7355]">
                      Institution
                    </p>
                    <p className="font-mono text-sm md:text-base font-bold text-[#333] leading-tight mt-0.5">
                      University of California, Berkeley
                    </p>
                  </div>
                  <div className="flex gap-4 md:gap-6">
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[#8B7355]">
                        Degree
                      </p>
                      <p className="font-mono text-xs md:text-sm font-bold text-[#444] leading-tight mt-0.5">
                        B.A. Computer Science
                      </p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[#8B7355]">
                        Minor
                      </p>
                      <p className="font-mono text-xs md:text-sm font-bold text-[#444] leading-tight mt-0.5">
                        Data Science
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-[#8B7355]">
                      Period
                    </p>
                    <p className="font-mono text-xs md:text-sm font-bold text-[#444] leading-tight mt-0.5">
                      Aug 2019 – May 2023
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
