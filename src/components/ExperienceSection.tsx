import { motion } from "framer-motion";
import { PillButton } from "./PillButton";

interface ExperienceCardProps {
  company: string;
  isCurrent?: boolean;
  image: React.ReactNode;
  role: string;
  description: string | React.ReactNode;
  ctaText: string;
  ctaHref: string;
  delay?: number;
}

function ExperienceCard({
  company,
  isCurrent,
  image,
  role,
  description,
  ctaText,
  ctaHref,
  delay = 0,
}: ExperienceCardProps) {
  return (
    <motion.div
      className="overflow-hidden flex flex-col relative"
      style={{
        backgroundColor: "#FAF8F4",
        border: "1px solid rgba(0,0,0,0.1)",
        borderRadius: "24px",
        boxShadow:
          "0 4px 20px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay }}
    >
      {/* Wii-style gloss overlay */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none z-10"
        style={{
          height: "42%",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 100%)",
          borderRadius: "24px 24px 0 0",
        }}
      />

      {/* Card header */}
      <div className="px-6 pt-7 pb-4 text-center relative z-20">
        <p className="font-mono text-portal-blue text-sm tracking-[0.18em] uppercase font-bold mb-1 opacity-80">
          Personnel File
        </p>
        <h4 className="font-mono text-[#1a1a1a] text-2xl font-bold tracking-tight">
          {company}
        </h4>
        {isCurrent && (
          <span
            className="portal-projected-badge inline-block text-portal-cosmo text-xs font-mono font-bold px-4 py-1.5 tracking-widest uppercase mt-2"
            style={{ "--badge-bg": "radial-gradient(ellipse 110% 160% at 50% 40%, rgba(217,51,144,0.30) 0%, rgba(217,51,144,0.11) 58%, rgba(217,51,144,0.03) 100%)" } as React.CSSProperties}
          >
            Active
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="mx-6 h-px bg-black/10 relative z-20" />

      {/* Card body */}
      <div className="flex-1 px-6 py-7 flex flex-col items-center text-center relative z-20">
        <div className="mb-6">{image}</div>
        <ul className="flex-1 w-full text-left space-y-3 mb-7">
          <li className="font-mono font-bold text-[#333] text-lg tracking-wide uppercase">
            {role}
          </li>
          <li className="text-[#444] text-lg leading-relaxed">{description}</li>
        </ul>
        <PillButton href={ctaHref} target="_blank" rel="noopener noreferrer" className="w-full py-3.5 text-base tracking-widest">
          {ctaText}
        </PillButton>
      </div>
    </motion.div>
  );
}

const StealthIcon = () => (
  <svg
    className="rounded-full"
    width="140"
    height="140"
    viewBox="0 0 140 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ backgroundColor: "#1a1a1a" }}
  >
    <ellipse cx="70" cy="52" rx="35" ry="18" fill="#1a1a2e" />
    <path d="M30 55 Q70 35 110 55 L105 60 Q70 45 35 60 Z" fill="#1e1e3a" />
    <ellipse cx="70" cy="58" rx="42" ry="8" fill="#2a2a4a" />
    <ellipse cx="70" cy="85" rx="28" ry="22" fill="#1a1a2e" />
    <circle cx="52" cy="82" r="16" fill="#050510" stroke="#6B8FEF" strokeWidth="1.5" />
    <circle cx="88" cy="82" r="16" fill="#050510" stroke="#6B8FEF" strokeWidth="1.5" />
    <path d="M68 82 Q70 78 72 82" stroke="#6B8FEF" strokeWidth="1.5" fill="none" />
    <path d="M36 82 L28 78" stroke="#6B8FEF" strokeWidth="1.5" />
    <path d="M104 82 L112 78" stroke="#6B8FEF" strokeWidth="1.5" />
    <path d="M60 102 Q70 108 80 102" stroke="#2a2a4a" strokeWidth="2" fill="none" />
    <circle cx="46" cy="76" r="3" fill="#8B4FCC" opacity="0.6" />
    <circle cx="82" cy="76" r="3" fill="#8B4FCC" opacity="0.6" />
  </svg>
);

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

export function ExperienceSection() {
  return (
    <div id="experience">
      {/* Section header — warm stripes */}
      <motion.div
        className="portal-stripes relative overflow-hidden h-[290px] flex flex-col justify-center px-10 md:px-16 text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        {/* Top rule — hot pink */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-portal-cosmo/50 to-transparent" />
        {/* Projected badge — purple */}
        <span
          className="portal-projected-badge inline-block mx-auto font-mono text-portal-poof text-base tracking-[0.15em] uppercase font-bold mb-5 px-5 py-2"
          style={{ "--badge-bg": "radial-gradient(ellipse 110% 160% at 48% 25%, rgba(139,79,204,0.26) 0%, rgba(139,79,204,0.09) 58%, rgba(139,79,204,0.02) 100%)" } as React.CSSProperties}
        >
          Employment History
        </span>
        <h1 className="font-mono text-5xl md:text-6xl font-bold text-[#0a0a1a]">
          I've worked at a few places
        </h1>
        <p className="font-mono text-portal-poof mt-4 text-xl tracking-wide">
          Here are the cool ones
        </p>
        {/* Bottom rule — purple */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-portal-poof/30 to-transparent" />
      </motion.div>

      {/* Cards — warm grey container with purple grid */}
      <div
        className="px-4 py-10 md:px-8 space-y-6 portal-grid-pi portal-depth-inset"
        style={{
          backgroundColor: "#F0EBE3",
          backgroundImage:
            "linear-gradient(rgba(139,79,204,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(139,79,204,0.09) 1px, transparent 1px)",
        }}
      >
        {/* Current role — full width */}
        <div className="max-w-sm mx-auto md:max-w-none">
          <ExperienceCard
            company="Stealth Startup"
            isCurrent
            image={<StealthIcon />}
            role="Full-Stack Engineer"
            description="Building AI notetaking software that cuts hours of healthcare paperwork per day. Transcription, UX, and full-stack ownership from prototype to production. React / Django / TypeScript / Python / AWS."
            ctaText="Ask me about it"
            ctaHref="https://www.linkedin.com/in/ethangnibus"
          />
        </div>

        {/* 2-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ExperienceCard
            company="UC Berkeley"
            image={<RoundImage src="/images/main/ucb/ucb.png" alt="UC Berkeley" />}
            role="CS 169A Instructor"
            description="Teaching and organizing a class about SWE to 200+ Berkeley students :)"
            ctaText="Become my student"
            ctaHref="https://classes.berkeley.edu/content/2023-summer-compsci-169a-001-lec-001"
            delay={0.1}
          />
          <ExperienceCard
            company="Saasbook"
            image={<RoundImage src="/images/main/eecs/eecs.jpg" alt="Saasbook / EECS" />}
            role="Software Engineer"
            description="Maintaining an online SaaS textbook and its assignments for various universities."
            ctaText="GET /the/saasbook"
            ctaHref="https://e.saasbook.info/"
            delay={0.2}
          />
          <ExperienceCard
            company="MRSL"
            image={<RoundImage src="/images/main/mrsl/mrsl.jpg" alt="MRSL" />}
            role="Machine Learning Intern"
            description="Developed a mobile app that classifies software-defined radio signals."
            ctaText="Process some signals"
            ctaHref="https://www.mrsl.com/"
            delay={0.1}
          />
          <ExperienceCard
            company="MBARI"
            image={<RoundImage src="/images/main/mbari/mbari.jpg" alt="MBARI" />}
            role="Front-End Engineer"
            description="Made a website for marine researchers to analyze ecogeological data."
            ctaText="Explore the ocean"
            ctaHref="https://www.mbari.org/"
            delay={0.2}
          />
        </div>
      </div>
    </div>
  );
}
