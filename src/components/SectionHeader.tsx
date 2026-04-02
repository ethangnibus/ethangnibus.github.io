import { cn } from "@/lib/utils";
import { APP_PALETTE } from "@/theme";
import { woodPatternStyle, type PatternVariant } from "./WoodPatternBackground";
import { SectionHeadlineStack } from "./SectionHeadlineStack";

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
  badgeLabel?: string;
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  bg = "close-grid",
  accent = "default",
  badgeLabel = "Projects",
}: SectionHeaderProps) {
  const theme = ACCENTS[accent];

  const alignClass =
    align === "left"
      ? "text-left"
      : align === "right"
        ? "text-right"
        : "text-center";

  return (
    <div
      className={cn(
        "relative overflow-hidden h-[290px] flex flex-col justify-center px-10 md:px-16",
        alignClass,
      )}
      style={woodPatternStyle(bg)}
    >
      {theme.tint && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundColor: theme.tint }}
        />
      )}

      <SectionHeadlineStack
        staggerLines
        badgeLabel={badgeLabel}
        badgeTextColor={theme.badgeText}
        badgeBg={theme.badgeBg}
        badgeIntensity={0.4}
        title={title}
        subtitle={subtitle}
        subtitleColor={theme.subtitleColor}
        subtitleIntensity={0.6}
        align={align}
      />
    </div>
  );
}
