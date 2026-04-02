import { motion } from "framer-motion";
import { APP_PALETTE } from "@/theme";
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
      <p className="font-mono text-app-body text-base tracking-[0.35em] uppercase">
        <ProjectedText color={APP_PALETTE.textBody} intensity={0.4}>© 2026 Ethan Gnibus</ProjectedText>
      </p>
    </motion.footer>
  );
}
