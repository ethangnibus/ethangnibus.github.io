import { motion, type HTMLMotionProps } from "framer-motion";

import { fadeUpItem, staggerContainer } from "@/lib/motionChoreography";
import { cn } from "@/lib/utils";

type StaggerOnViewProps = Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView"> & {
  stagger?: number;
  delayChildren?: number;
};

export function StaggerOnView({
  className,
  children,
  stagger = 0.1,
  delayChildren = 0.05,
  viewport,
  ...rest
}: StaggerOnViewProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px", ...viewport }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = Omit<HTMLMotionProps<"div">, "variants">;

export function StaggerItem({ className, children, ...rest }: StaggerItemProps) {
  return (
    <motion.div className={cn(className)} variants={fadeUpItem} {...rest}>
      {children}
    </motion.div>
  );
}
