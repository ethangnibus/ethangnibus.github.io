import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { APP_PALETTE } from "@/theme";
import { ProjectedText } from "./ProjectedText";
import { woodPatternStyle, type PatternVariant } from "./WoodPatternBackground";

export type SectionAccent = "default" | "crimson" | "violet";

const ACCENTS: Record<
  SectionAccent,
  {
    tint: string | undefined;
    badgeBg: string;
    badgeText: string;
    subtitleColor: string;
  }
> = {
  default: {
    tint: undefined,
    badgeBg: `radial-gradient(ellipse 110% 160% at 52% 35%, rgba(${APP_PALETTE.portalPoofRgb},0.26) 0%, rgba(${APP_PALETTE.portalPoofRgb},0.09) 58%, rgba(${APP_PALETTE.portalPoofRgb},0.02) 100%)`,
    badgeText: APP_PALETTE.portalPoof,
    subtitleColor: APP_PALETTE.portalPoof,
  },
  crimson: {
    tint: `rgba(${APP_PALETTE.categoryCvRgb}, 0.10)`,
    badgeBg: `radial-gradient(ellipse 110% 160% at 52% 35%, rgba(${APP_PALETTE.categoryCvRgb},0.28) 0%, rgba(${APP_PALETTE.categoryCvRgb},0.10) 58%, rgba(${APP_PALETTE.categoryCvRgb},0.02) 100%)`,
    badgeText: APP_PALETTE.categoryCv,
    subtitleColor: APP_PALETTE.categoryCv,
  },
  violet: {
    tint: `rgba(${APP_PALETTE.categoryGraphicsRgb}, 0.10)`,
    badgeBg: `radial-gradient(ellipse 110% 160% at 52% 35%, rgba(${APP_PALETTE.categoryGraphicsRgb},0.28) 0%, rgba(${APP_PALETTE.categoryGraphicsRgb},0.10) 58%, rgba(${APP_PALETTE.categoryGraphicsRgb},0.02) 100%)`,
    badgeText: APP_PALETTE.categoryGraphics,
    subtitleColor: APP_PALETTE.categoryGraphics,
  },
};

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  align?: "left" | "right" | "center";
  bg?: PatternVariant;
  accent?: SectionAccent;
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  bg = "close-grid",
  accent = "default",
}: SectionHeaderProps) {
  const theme = ACCENTS[accent];

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

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden h-[290px] flex flex-col justify-center px-10 md:px-16",
        alignClass,
      )}
      style={woodPatternStyle(bg)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Accent color tint overlay */}
      {theme.tint && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: theme.tint }}
        />
      )}

      {/* Projected badge */}
      <span
        className={cn(
          "portal-projected-badge inline-block font-mono text-base tracking-[0.15em] uppercase font-bold mb-5 px-5 py-2",
          badgeAlignClass,
        )}
        style={
          {
            "--badge-bg": theme.badgeBg,
          } as React.CSSProperties
        }
      >
        <ProjectedText color={theme.badgeText} intensity={0.4}>
          Projects
        </ProjectedText>
      </span>

      <h1 className="font-mono text-5xl md:text-6xl font-bold text-app-ink">
        <ProjectedText color={APP_PALETTE.textInk}>{title}</ProjectedText>
      </h1>
      <p
        className="font-mono mt-4 text-xl tracking-wide"
        style={{ color: theme.subtitleColor }}
      >
        <ProjectedText color={theme.subtitleColor} intensity={0.6}>
          {subtitle}
        </ProjectedText>
      </p>

    </motion.div>
  );
}
