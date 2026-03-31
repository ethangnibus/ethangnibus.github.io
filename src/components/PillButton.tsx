import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PillButtonProps {
  variant?: "default" | "carousel" | "bark";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initial?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animate?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  exit?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transition?: any;
}

export function PillButton({
  variant = "default",
  href,
  target,
  rel,
  onClick,
  children,
  className,
  initial,
  animate,
  exit,
  transition,
}: PillButtonProps) {
  const variantClass =
    variant === "carousel"
      ? "pill-btn-carousel"
      : variant === "bark"
        ? "pill-btn-bark"
        : "pill-btn-default";
  const cls = cn("pill-btn", variantClass, className);
  const wrapped = <span className="pill-btn-inner">{children}</span>;

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={cls}
        initial={initial}
        animate={animate}
        exit={exit}
        transition={transition}
      >
        {wrapped}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={cls}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
    >
      {wrapped}
    </motion.button>
  );
}
