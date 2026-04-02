import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { APP_PALETTE } from "@/theme";
import { PillButton } from "./PillButton";
import { PortalProjectedBadge } from "./PortalProjectedBadge";
import { ProjectedText } from "./ProjectedText";
import { SectionHeadlineStack } from "./SectionHeadlineStack";
import { StaggerItem, StaggerOnView } from "./StaggerOnView";
import { WoodCloseUpBackSlash } from "./WoodPatternBackground";

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
    style={{ backgroundColor: APP_PALETTE.expSeqBg }}
  >
    <ellipse cx="70" cy="52" rx="35" ry="18" fill={APP_PALETTE.expSeqSpace1} />
    <path d="M30 55 Q70 35 110 55 L105 60 Q70 45 35 60 Z" fill={APP_PALETTE.expSeqSpace2} />
    <ellipse cx="70" cy="58" rx="42" ry="8" fill={APP_PALETTE.expSeqSpace3} />
    <ellipse cx="70" cy="85" rx="28" ry="22" fill={APP_PALETTE.expSeqSpace1} />
    <circle cx="52" cy="82" r="16" fill={APP_PALETTE.expSeqEyeFill} stroke={APP_PALETTE.expSeqStroke} strokeWidth="1.5" />
    <circle cx="88" cy="82" r="16" fill={APP_PALETTE.expSeqEyeFill} stroke={APP_PALETTE.expSeqStroke} strokeWidth="1.5" />
    <path d="M68 82 Q70 78 72 82" stroke={APP_PALETTE.expSeqStroke} strokeWidth="1.5" fill="none" />
    <path d="M36 82 L28 78" stroke={APP_PALETTE.expSeqStroke} strokeWidth="1.5" />
    <path d="M104 82 L112 78" stroke={APP_PALETTE.expSeqStroke} strokeWidth="1.5" />
    <path d="M60 102 Q70 108 80 102" stroke={APP_PALETTE.expSeqMouth} strokeWidth="2" fill="none" />
    <circle cx="46" cy="76" r="3" fill={APP_PALETTE.expSeqCheek} opacity="0.6" />
    <circle cx="82" cy="76" r="3" fill={APP_PALETTE.expSeqCheek} opacity="0.6" />
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
    suitColor: APP_PALETTE.playingCardSuitDark,
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
    suitColor: APP_PALETTE.categoryCv,
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
    suitColor: APP_PALETTE.playingCardSuitDark,
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
    suitColor: APP_PALETTE.categoryCv,
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
    suitColor: APP_PALETTE.playingCardSuitDark,
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
        backgroundColor: APP_PALETTE.experienceCardBg,
        border: `1.5px solid rgba(${APP_PALETTE.woodLineRgb},0.18)`,
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
        <h4 className="font-mono font-bold text-sm text-app-default tracking-tight leading-tight">
          <ProjectedText
            text={card.company}
            color={APP_PALETTE.textDefault}
            intensity={0.7}
          />
        </h4>
        {card.isCurrent && (
          <span
            className="text-[9px] font-mono font-bold tracking-[0.2em] uppercase mt-1"
            style={{ color: APP_PALETTE.portalCosmo }}
          >
            Active
          </span>
        )}
        <div className="w-8 h-px bg-black/10 my-2.5" />
        <p className="font-mono font-bold text-xs text-app-mutedDark uppercase tracking-wider">
          <ProjectedText
            text={card.role}
            color={APP_PALETTE.textMutedDark}
            intensity={0.5}
          />
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
    <div id="experience" className="flex flex-col md:gap-6 overflow-hidden scroll-mt-24">
      {/* ── Section header ── */}
      <div className="relative overflow-hidden h-[290px] flex flex-col justify-center px-10 md:px-16 text-center">
        <SectionHeadlineStack
          staggerLines
          badgeLabel="Employment History"
          badgeTextColor={APP_PALETTE.portalRose}
          badgeBg={`radial-gradient(ellipse 110% 160% at 48% 25%, rgba(${APP_PALETTE.portalRoseRgb},0.24) 0%, rgba(${APP_PALETTE.portalRoseRgb},0.08) 58%, rgba(${APP_PALETTE.portalRoseRgb},0.02) 100%)`}
          badgeIntensity={0.4}
          title="I've worked at a few places"
          subtitle="Here are the cool ones"
          subtitleColor={APP_PALETTE.portalRose}
          subtitleIntensity={0.6}
          align="center"
        />
      </div>

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
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Company name with arrows inline */}
          <div className="flex items-center justify-center gap-1">
            <button
              onClick={() => paginate(-1)}
              className="shrink-0 p-2 text-app-body hover:bg-app-body/10 rounded-full transition-all duration-200 active:scale-90"
              aria-label="Previous card"
            >
              <ProjectedText color={APP_PALETTE.textBody} intensity={0.5}>
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </ProjectedText>
            </button>

            <h4 className="font-mono text-xl md:text-2xl font-bold text-app-default min-w-0">
              <ProjectedText
                text={activeCard.company}
                color={APP_PALETTE.textDefault}
                intensity={0.8}
              />
            </h4>

            <button
              onClick={() => paginate(1)}
              className="shrink-0 p-2 text-app-body hover:bg-app-body/10 rounded-full transition-all duration-200 active:scale-90"
              aria-label="Next card"
            >
              <ProjectedText color={APP_PALETTE.textBody} intensity={0.5}>
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </ProjectedText>
            </button>
          </div>

          {activeCard.isCurrent && (
            <PortalProjectedBadge
              label="Active"
              textColor={APP_PALETTE.portalCosmo}
              intensity={0.35}
              badgeBg={`radial-gradient(ellipse 110% 160% at 50% 40%, rgba(${APP_PALETTE.portalCosmoRgb},0.30) 0%, rgba(${APP_PALETTE.portalCosmoRgb},0.11) 58%, rgba(${APP_PALETTE.portalCosmoRgb},0.03) 100%)`}
              className="text-xs px-4 py-1 tracking-widest mt-1"
              alignClass="inline-block"
            />
          )}
          <p className="text-app-muted text-sm md:text-base mt-2 leading-relaxed">
            <ProjectedText
              text={activeCard.description}
              color={APP_PALETTE.textMuted}
              intensity={0.4}
            />
          </p>
          <div className="mt-4">
            <PillButton
              href={activeCard.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 text-sm tracking-widest"
            >
              <ProjectedText
                text={activeCard.ctaText}
                color={APP_PALETTE.textDefault}
                intensity={0.4}
              />
            </PillButton>
          </div>
        </motion.div>
      </div>

      {/* ── Academic Record ── */}
      <WoodCloseUpBackSlash
        id="education"
        className="relative overflow-hidden shadow-lg shadow-black/10 scroll-mt-24"
      >
        <StaggerOnView className="max-w-2xl mx-auto py-16 px-6 md:px-12 text-center">
          <StaggerItem>
            <div className="mb-5">
              <PortalProjectedBadge
                label="Academic Record"
                textColor={APP_PALETTE.portalRose}
                intensity={0.4}
                badgeBg={`radial-gradient(ellipse 110% 160% at 48% 25%, rgba(${APP_PALETTE.portalRoseRgb},0.24) 0%, rgba(${APP_PALETTE.portalRoseRgb},0.08) 58%, rgba(${APP_PALETTE.portalRoseRgb},0.02) 100%)`}
                alignClass="inline-block"
              />
            </div>
          </StaggerItem>

          <StaggerItem>
            <h1 className="font-mono text-5xl md:text-6xl font-bold mb-6">
              <ProjectedText
                text="I'm a Golden Bear!"
                color={APP_PALETTE.textInk}
              />
            </h1>
          </StaggerItem>

          <StaggerItem>
            <img
              src="/images/main/will_square/will_square.jpg"
              alt="Ethan Gnibus"
              className="w-40 h-40 rounded-full mx-auto border-2 border-portal-cosmo/40 shadow-lg object-cover mb-8"
              loading="lazy"
            />
          </StaggerItem>

          <StaggerItem>
            <p className="text-app-warm text-xl leading-relaxed mb-2">
              <ProjectedText
                text="University of California, Berkeley"
                color={APP_PALETTE.textBodyWarm}
                intensity={0.35}
              />
            </p>
          </StaggerItem>
          <StaggerItem>
            <p className="text-app-warm text-lg leading-relaxed">
              <ProjectedText color={APP_PALETTE.textBodyWarm} intensity={0.35}>
                <span className="font-mono font-semibold text-portal-cosmo">B.A. Computer Science</span>
                {" · "}
                <span className="font-mono font-semibold text-portal-cosmo">Minor, Data Science</span>
              </ProjectedText>
            </p>
          </StaggerItem>
          <StaggerItem>
            <p className="font-mono text-sm text-app-body mt-2">
              <ProjectedText
                text="Aug 2019 – May 2023"
                color={APP_PALETTE.textBody}
                intensity={0.35}
              />
            </p>
          </StaggerItem>
        </StaggerOnView>
      </WoodCloseUpBackSlash>
    </div>
  );
}
