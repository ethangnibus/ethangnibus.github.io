import { motion } from "framer-motion";
import { ProjectedText } from "./ProjectedText";
import { woodPatternStyle } from "./WoodPatternBackground";

export function Footer() {
  return (
    <motion.footer
      className="relative overflow-hidden py-10 flex items-center justify-center"
      style={woodPatternStyle("close-grid")}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <p className="font-mono text-[#5A4A30] text-base tracking-[0.35em] uppercase">
        <ProjectedText color="#5A4A30" intensity={0.4}>© 2026 Ethan Gnibus</ProjectedText>
      </p>
    </motion.footer>
  );
}
