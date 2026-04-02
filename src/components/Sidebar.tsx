import { useRef, useEffect, useState, type CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ProjectedText } from "./ProjectedText";
import { BARK_MATERIAL } from "./BarkPatternBackground";
import { BlogOutlineExplorer } from "@/components/blog/BlogOutlineExplorer";
import { APP_COLORS } from "@/theme";

/** Wide enough for `app-body` chapter titles without excessive truncation. */
const SIDEBAR_WIDTH = 320;

const BG_STYLE: CSSProperties = {
  backgroundColor: BARK_MATERIAL.bgColor,
};

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  isSmall: boolean;
}

export function Sidebar({ open, onClose, isSmall }: SidebarProps) {
  const prevOpen = useRef(false);
  const [animateItems, setAnimateItems] = useState(false);

  useEffect(() => {
    if (open && !prevOpen.current) {
      setAnimateItems(true);
    }
    if (!open) {
      setAnimateItems(false);
    }
    prevOpen.current = open;
  }, [open]);

  const ease: [number, number, number, number] = [0.32, 0.72, 0, 1];

  if (isSmall) {
    if (!open) return null;

    return (
      <aside
        className="flex flex-col w-full h-full"
        style={{ ...BG_STYLE }}
      >
        <SidebarContent onClose={onClose} animateItems={animateItems} />
      </aside>
    );
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="shrink-0 h-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: SIDEBAR_WIDTH }}
          exit={{ width: 0 }}
          transition={{ duration: 0.35, ease }}
          style={{ minWidth: 0 }}
        >
          <aside
            className="relative h-full flex flex-col"
            style={{
              width: SIDEBAR_WIDTH,
              ...BG_STYLE,
              borderRight: "3px solid rgba(120,105,88,0.8)",
              boxShadow:
                "6px 0 24px rgba(0,0,0,0.18), 2px 0 8px rgba(0,0,0,0.1)",
            }}
          >
            <SidebarContent onClose={onClose} animateItems={animateItems} />
          </aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SidebarContent({
  onClose,
  animateItems,
}: {
  onClose: () => void;
  animateItems: boolean;
}) {
  const item = (i: number) =>
    animateItems
      ? {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: 0.08 + i * 0.06, ease: "easeOut" as const },
        }
      : {};

  return (
    <>
      {/* Header */}
      <motion.div className="flex items-center justify-between px-5 pt-5 pb-2" {...item(0)}>
        <span className="app-eyebrow app-text-strong">
          <ProjectedText
            text="Blog Posts"
            color={APP_COLORS.textStrong}
            intensity={0.35}
          />
        </span>

        <button
          onClick={onClose}
          className="sidebar-close-btn-bark"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </motion.div>

      <motion.div className="flex-1 flex flex-col min-h-0 mt-1 px-4 pb-6" {...item(1)}>
        <BlogOutlineExplorer />
      </motion.div>
    </>
  );
}
