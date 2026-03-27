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
        {/* Top rule — portal green */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-portal-go/60 to-transparent" />

        <motion.div
          className="max-w-2xl mx-auto py-16 px-6 md:px-12 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Projected badge — portal green */}
          <span
            className="portal-projected-badge inline-block font-mono text-portal-go text-base tracking-[0.15em] uppercase font-bold mb-5 px-5 py-2"
            style={{ "--badge-bg": "radial-gradient(ellipse 110% 160% at 45% 30%, rgba(31,173,78,0.28) 0%, rgba(31,173,78,0.10) 58%, rgba(31,173,78,0.03) 100%)" } as React.CSSProperties}
          >
            Subject Profile
          </span>

          <h1 className="font-mono text-4xl md:text-5xl font-bold text-[#0a0a1a] mb-6 tracking-tight">
            Who am I?
          </h1>

          <p className="text-[#2a2840] text-xl leading-relaxed mb-8">
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
          <div className="flex justify-center items-center gap-4">
            {SOCIAL_LINKS.map(({ href, src, alt }) => (
              <a
                key={alt}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-all duration-300 hover:scale-110 p-3.5 flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(255,255,255,0.98) 0%, rgba(228,222,214,0.85) 100%)",
                  border: "1px solid rgba(160,150,140,0.55)",
                  borderRadius: "999px",
                  boxShadow:
                    "0 3px 10px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.98)",
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
          className="flex-1 bg-[#003262] relative overflow-hidden py-12 px-8 text-center portal-grid-pi portal-depth-inset"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          }}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="font-mono text-portal-poofLight text-sm tracking-[0.3em] uppercase font-bold mb-4">
            Academic Record
          </p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold mb-6 text-white">
            I'm a Golden Bear!
          </h2>
          <img
            src="/images/main/will_square/will_square.jpg"
            alt="Ethan Gnibus"
            className="w-40 h-40 rounded-full mx-auto border-2 border-white/40 shadow-lg object-cover"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          className="flex-1 bg-[#FDB515] py-12 px-8 text-center relative overflow-hidden portal-grid-pi portal-depth-inset"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
          }}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="font-mono text-[#5a3a00] text-sm tracking-[0.3em] uppercase font-bold mb-4">
            Institution
          </p>
          <h2 className="font-mono text-3xl md:text-4xl font-bold mb-4 text-[#1a1a1a]">
            University of California, Berkeley
          </h2>
          <p className="text-xl font-semibold text-[#1a1a1a]">
            Bachelor of Arts, Computer Science
          </p>
          <p className="text-[#4a3000] text-lg mt-1">Aug 2019 – May 2023</p>
          <p className="text-xl font-semibold text-[#1a1a1a] mt-4">
            Minor, Data Science
          </p>
          <p className="text-[#4a3000] text-lg mt-1">Aug 2019 – May 2023</p>
        </motion.div>
      </div>
    </>
  );
}
