import type { Variants } from "framer-motion";

/** Parent: stagger children after optional delay (seconds). */
export function staggerContainer(
  stagger = 0.08,
  delayChildren = 0,
): Variants {
  return {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren },
    },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };
}

export const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export const fadeUpItemTight: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};
