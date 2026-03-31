import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
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
    badgeBg:
      "radial-gradient(ellipse 110% 160% at 52% 35%, rgba(107,46,26,0.26) 0%, rgba(107,46,26,0.09) 58%, rgba(107,46,26,0.02) 100%)",
    badgeText: "#6B2E1A",
    subtitleColor: "#6B2E1A",
  },
  crimson: {
    tint: "rgba(120, 20, 40, 0.10)",
    badgeBg:
      "radial-gradient(ellipse 110% 160% at 52% 35%, rgba(139,26,43,0.28) 0%, rgba(139,26,43,0.10) 58%, rgba(139,26,43,0.02) 100%)",
    badgeText: "#8B1A2B",
    subtitleColor: "#8B1A2B",
  },
  violet: {
    tint: "rgba(75, 29, 107, 0.10)",
    badgeBg:
      "radial-gradient(ellipse 110% 160% at 52% 35%, rgba(75,29,107,0.28) 0%, rgba(75,29,107,0.10) 58%, rgba(75,29,107,0.02) 100%)",
    badgeText: "#4B1D6B",
    subtitleColor: "#4B1D6B",
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

      <h1 className="font-mono text-5xl md:text-6xl font-bold text-[#0a0a1a]">
        <ProjectedText color="#0a0a1a">{title}</ProjectedText>
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
