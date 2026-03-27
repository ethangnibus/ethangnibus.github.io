import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  align?: "left" | "right" | "center";
  bg?: "silver" | "white" | "grid-white" | "checkered" | "stripes";
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  bg = "silver",
}: SectionHeaderProps) {
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
        bg === "white" ? "bg-white" : bg === "grid-white" ? "portal-grid-white" : bg === "checkered" ? "portal-checkered" : bg === "stripes" ? "portal-stripes" : "bg-[#f0f0f0]",
        "relative overflow-hidden h-[290px] flex flex-col justify-center px-10 md:px-16",
        alignClass
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Top rule — hot pink */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-portal-cosmo/50 to-transparent" />

      {/* Projected badge */}
      <span
        className={cn(
          "portal-projected-badge inline-block font-mono text-portal-poof text-base tracking-[0.15em] uppercase font-bold mb-5 px-5 py-2",
          badgeAlignClass
        )}
        style={{ "--badge-bg": "radial-gradient(ellipse 110% 160% at 52% 35%, rgba(139,79,204,0.26) 0%, rgba(139,79,204,0.09) 58%, rgba(139,79,204,0.02) 100%)" } as React.CSSProperties}
      >
        Projects
      </span>

      <h1 className="font-mono text-5xl md:text-6xl font-bold text-[#0a0a1a]">{title}</h1>
      <p className="font-mono text-portal-poof mt-4 text-xl tracking-wide">{subtitle}</p>

      {/* Bottom rule — purple */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-portal-poof/30 to-transparent" />
    </motion.div>
  );
}
