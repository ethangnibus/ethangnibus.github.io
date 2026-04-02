import { motion } from "framer-motion";

import { fadeUpItemTight, staggerContainer } from "@/lib/motionChoreography";
import { APP_COLORS } from "@/theme";
import { ProjectedText } from "./ProjectedText";

export interface HeroIntroTextColumnProps {
  /** Top line: e.g. "About Me" or full category name. */
  eyebrow: string;
  eyebrowColor: string;
  eyebrowIntensity?: number;
  /** Main title: e.g. "Hi Friends!" or "Graphics". */
  title: string;
  titleIntensity?: number;
  description: string;
}

/**
 * Eyebrow + projected title + plain description with staggered entrance.
 * Wrap with an outer `motion.div` + `AnimatePresence` for slide transitions.
 */
export function HeroIntroTextColumn({
  eyebrow,
  eyebrowColor,
  eyebrowIntensity = 0.3,
  title,
  titleIntensity = 0.3,
  description,
}: HeroIntroTextColumnProps) {
  return (
    <motion.div
      variants={staggerContainer(0.07, 0.02)}
      initial="hidden"
      animate="show"
      className="flex flex-col"
    >
      <motion.span
        variants={fadeUpItemTight}
        className="app-eyebrow block mb-1"
        style={{ color: eyebrowColor }}
      >
        <ProjectedText
          text={eyebrow}
          color={eyebrowColor}
          intensity={eyebrowIntensity}
        />
      </motion.span>

      <motion.div variants={fadeUpItemTight}>
        <h2 className="app-title-1 app-text-strong pt-3">
          <ProjectedText
            text={title}
            color={APP_COLORS.textStrong}
            intensity={titleIntensity}
          />
        </h2>
      </motion.div>

      <motion.p
        variants={fadeUpItemTight}
        className="app-body-lg pt-4 max-w-xl text-app-body/80"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}
