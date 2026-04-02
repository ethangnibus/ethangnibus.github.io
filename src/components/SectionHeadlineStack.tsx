import { motion } from "framer-motion";

import { fadeUpItem, staggerContainer } from "@/lib/motionChoreography";
import { cn } from "@/lib/utils";
import { APP_PALETTE } from "@/theme";
import { PortalProjectedBadge } from "./PortalProjectedBadge";
import { ProjectedText } from "./ProjectedText";

export interface SectionHeadlineStackProps {
  badgeLabel: string;
  badgeTextColor: string;
  badgeBg: string;
  badgeIntensity?: number;
  title: string;
  titleColor?: string;
  subtitle: string;
  subtitleColor: string;
  subtitleIntensity?: number;
  align?: "left" | "right" | "center";
  badgeClassName?: string;
  /** Stagger badge → title → subtitle when entering the viewport (parent should be a `motion` with `whileInView`). */
  staggerLines?: boolean;
}

export function SectionHeadlineStack({
  badgeLabel,
  badgeTextColor,
  badgeBg,
  badgeIntensity = 0.4,
  title,
  titleColor = APP_PALETTE.textInk,
  subtitle,
  subtitleColor,
  subtitleIntensity = 0.6,
  align = "center",
  badgeClassName,
  staggerLines = false,
}: SectionHeadlineStackProps) {
  const alignClass =
    align === "left"
      ? "text-left"
      : align === "right"
        ? "text-right"
        : "text-center";

  const badgeAlignClass =
    align === "left"
      ? "mr-auto"
      : align === "right"
        ? "ml-auto"
        : "mx-auto";

  const inner = (
    <>
      <PortalProjectedBadge
        label={badgeLabel}
        textColor={badgeTextColor}
        intensity={badgeIntensity}
        badgeBg={badgeBg}
        alignClass={badgeAlignClass}
        className={cn("mb-5", badgeClassName)}
      />

      <h1 className="font-mono text-5xl md:text-6xl font-bold text-app-ink">
        <ProjectedText text={title} color={titleColor} />
      </h1>
      <p
        className="font-mono mt-4 text-xl tracking-wide"
        style={{ color: subtitleColor }}
      >
        <ProjectedText
          text={subtitle}
          color={subtitleColor}
          intensity={subtitleIntensity}
        />
      </p>
    </>
  );

  if (!staggerLines) {
    return <div className={cn("flex flex-col", alignClass)}>{inner}</div>;
  }

  return (
    <motion.div
      className={cn("flex flex-col", alignClass)}
      variants={staggerContainer(0.1, 0)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      <motion.div variants={fadeUpItem}>
        <PortalProjectedBadge
          label={badgeLabel}
          textColor={badgeTextColor}
          intensity={badgeIntensity}
          badgeBg={badgeBg}
          alignClass={badgeAlignClass}
          className={cn("mb-5", badgeClassName)}
        />
      </motion.div>

      <motion.h1
        variants={fadeUpItem}
        className="font-mono text-5xl md:text-6xl font-bold text-app-ink"
      >
        <ProjectedText text={title} color={titleColor} />
      </motion.h1>
      <motion.p
        variants={fadeUpItem}
        className="font-mono mt-4 text-xl tracking-wide"
        style={{ color: subtitleColor }}
      >
        <ProjectedText
          text={subtitle}
          color={subtitleColor}
          intensity={subtitleIntensity}
        />
      </motion.p>
    </motion.div>
  );
}
