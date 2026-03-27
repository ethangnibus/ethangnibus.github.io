import { motion } from "framer-motion";

const SKILLS = ["gamedev", "computer vision", "SWE"];

const SOCIAL_LINKS = [
  {
    href: "https://www.linkedin.com/in/ethangnibus",
    src: "/images/main/linkedin.svg",
    alt: "LinkedIn",
  },
  {
    href: "https://github.com/ethangnibus",
    src: "/images/main/github.svg",
    alt: "GitHub",
  },
  {
    href: "mailto:ethangnibus@berkeley.edu",
    src: "/images/main/email.svg",
    alt: "Email",
  },
];

export function AboutSection() {
  return (
    <>
      {/* ── Who am I ─────────────────────────────────────────── */}
      <div id="about" className="portal-grid-white relative overflow-hidden">
        {/* Top rule — green */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-portal-cosmo/50 to-transparent" />

        <motion.div
          className="max-w-2xl mx-auto py-14 px-6 md:px-12 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Wii-style pill badge */}
          <span
            className="inline-block font-mono text-portal-poof text-sm tracking-[0.15em] uppercase font-bold mb-4 px-4 py-1.5"
            style={{
              background:
                "linear-gradient(to bottom, rgba(168,85,247,0.12) 0%, rgba(168,85,247,0.06) 100%)",
              border: "1px solid rgba(168,85,247,0.25)",
              borderRadius: "999px",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7)",
            }}
          >
            Subject Profile
          </span>

          <h1 className="font-mono text-4xl font-bold text-[#0d1f14] mb-5 tracking-tight">
            Who am I?
          </h1>

          <p className="text-[#2a3d2f] text-lg leading-relaxed mb-7">
            Full-stack engineer building next-gen healthcare notetaking software.
            I also love{" "}
            {SKILLS.map((skill, i) => (
              <span key={skill}>
                <span className="font-mono font-semibold text-portal-cosmo">{skill}</span>
                {i < SKILLS.length - 2 ? ", " : i === SKILLS.length - 2 ? " and " : ""}
              </span>
            ))}
            . Say hi :)
          </p>

          {/* Social links — Wii-style bubbly circles */}
          <div className="flex justify-center items-center gap-3">
            {SOCIAL_LINKS.map(({ href, src, alt }) => (
              <a
                key={alt}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110 p-3 flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(215,215,215,0.7) 100%)",
                  border: "1px solid rgba(160,160,160,0.5)",
                  borderRadius: "999px",
                  boxShadow:
                    "0 3px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.95)",
                }}
              >
                <img src={src} alt={alt} className="w-14 h-14" loading="lazy" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Bottom rule — purple */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-portal-poof/35 to-transparent" />
      </div>

      {/* ── UCB education block ───────────────────────────────── */}
      <div className="flex flex-col md:flex-row">
        <motion.div
          className="flex-1 bg-[#003262] relative overflow-hidden py-10 px-8 text-center portal-grid-pi portal-depth-inset"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          }}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="font-mono text-portal-poofLight text-xs tracking-[0.3em] uppercase font-bold mb-3">
            Academic Record
          </p>
          <h2 className="font-mono text-3xl font-bold mb-5 text-white">
            I'm a Golden Bear!
          </h2>
          <img
            src="/images/main/will_square/will_square.jpg"
            alt="Ethan Gnibus"
            className="w-36 h-36 rounded-full mx-auto border-2 border-white/40 shadow-lg object-cover"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          className="flex-1 bg-[#FDB515] py-10 px-8 text-center relative overflow-hidden portal-grid-pi portal-depth-inset"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
          }}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="font-mono text-[#5a3a00] text-xs tracking-[0.3em] uppercase font-bold mb-3">
            Institution
          </p>
          <h2 className="font-mono text-3xl font-bold mb-3 text-[#1a1a1a]">
            University of California, Berkeley
          </h2>
          <p className="text-xl font-medium text-[#1a1a1a]">
            Bachelor of Arts, Computer Science
          </p>
          <p className="text-[#4a3000] text-base mt-1">Aug 2019 – May 2023</p>
          <p className="text-xl font-medium text-[#1a1a1a] mt-3">
            Minor, Data Science
          </p>
          <p className="text-[#4a3000] text-base mt-1">Aug 2019 – May 2023</p>
        </motion.div>
      </div>
    </>
  );
}
