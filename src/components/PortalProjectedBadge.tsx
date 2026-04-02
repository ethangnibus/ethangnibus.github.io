import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";
import { ProjectedText } from "./ProjectedText";

export interface PortalProjectedBadgeProps {
  /** Single source for visible + projected layers (pass to ProjectedText as `text`). */
  label: string;
  textColor: string;
  intensity?: number;
  /** CSS custom property `--badge-bg` (radial gradient string). */
  badgeBg: string;
  className?: string;
  alignClass?: string;
}

export function PortalProjectedBadge({
  label,
  textColor,
  intensity = 0.4,
  badgeBg,
  className,
  alignClass,
}: PortalProjectedBadgeProps) {
  return (
    <span
      className={cn(
        "portal-projected-badge inline-block font-mono text-base tracking-[0.15em] uppercase font-bold px-5 py-2",
        alignClass,
        className,
      )}
      style={{ "--badge-bg": badgeBg } as CSSProperties}
    >
      <ProjectedText text={label} color={textColor} intensity={intensity} />
    </span>
  );
}
