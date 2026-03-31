import { motion } from "framer-motion";
import { BlurImage } from "./BlurImage";
import { ProjectedText } from "./ProjectedText";

function CornerBracket({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const base = "absolute w-10 h-10 pointer-events-none";
  const styles: Record<string, string> = {
    tl: "top-6 left-6 border-t-4 border-l-4",
    tr: "top-6 right-6 border-t-4 border-r-4",
    bl: "bottom-6 left-6 border-b-4 border-l-4",
    br: "bottom-6 right-6 border-b-4 border-r-4",
  };
  return (
    <div className={`${base} ${styles[position]} border-portal-cosmoLight/70`} />
  );
}

export function HeroSection() {
  return (
    <div className="relative h-[40vh] min-[450px]:h-[60vh] min-[768px]:h-[88vh] bg-[#0a0a0a] overflow-hidden">
      <BlurImage
        src="/images/main/two_trees/two_trees.jpg"
        smallSrc="/images/main/two_trees/two_trees-small.jpg"
        alt="Two trees"
      />

      {/* Overlay + faint grid */}
      <div
        className="absolute inset-0 portal-depth-inset"
        style={{
          backgroundImage: [
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.30) 100%)",
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
            "linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          ].join(", "),
          backgroundSize: `100% 100%, 31.41592653589793px 31.41592653589793px, 31.41592653589793px 31.41592653589793px`,
        }}
      />

      <CornerBracket position="tl" />
      <CornerBracket position="tr" />
      <CornerBracket position="bl" />
      <CornerBracket position="br" />

      {/* Bottom rule — champagne gold */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-portal-cosmoLight/60 to-transparent" />

      <div className="relative h-full flex flex-col items-center justify-center gap-4">
        <motion.h1
          className="font-mono text-white text-4xl min-[450px]:text-5xl min-[768px]:text-7xl font-bold text-center px-4 tracking-tight"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
        >
          <ProjectedText color="#ffffff" dark intensity={1}>
            Hi Friends,
          </ProjectedText>
        </motion.h1>

        <motion.p
          className="font-mono text-portal-cosmoLight text-sm tracking-[0.5em] uppercase font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <ProjectedText color="#C8785A" dark intensity={0.6}>
            I'm Ethan
          </ProjectedText>
        </motion.p>

        {/* Divider */}
        <motion.div
          className="w-28 h-px bg-gradient-to-r from-transparent via-portal-cosmoLight to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        />
      </div>
    </div>
  );
}
