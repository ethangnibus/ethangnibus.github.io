import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { BlogOutlineExplorer } from "@/components/blog/BlogOutlineExplorer";

/** Wide enough for chapter titles without excessive truncation; padding matches header. */
const SIDEBAR_WIDTH = 340;

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
        id="site-sidebar"
        className="flex h-full min-h-0 w-full flex-col bg-[var(--app-card-warm)]"
        aria-labelledby="sidebar-outline-title"
      >
        <SidebarContent
          onClose={onClose}
          animateItems={animateItems}
          isSmall={isSmall}
        />
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
            id="site-sidebar"
            className="relative flex h-full min-h-0 flex-col bg-[var(--app-card-warm)]"
            aria-labelledby="sidebar-outline-title"
            style={{
              width: SIDEBAR_WIDTH,
              borderRight: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "1px 0 0 rgba(0,0,0,0.04), 8px 0 32px rgba(0,0,0,0.06)",
            }}
          >
            <SidebarContent
              onClose={onClose}
              animateItems={animateItems}
              isSmall={isSmall}
            />
          </aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SidebarContent({
  onClose,
  animateItems,
  isSmall,
}: {
  onClose: () => void;
  animateItems: boolean;
  isSmall: boolean;
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
      <motion.header
        className="shrink-0 border-b border-black/[0.06] px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-5 sm:pb-3.5 sm:pt-5"
        {...item(0)}
      >
        <div className="flex min-h-11 items-center justify-between gap-3">
          <h2
            id="sidebar-outline-title"
            className="min-w-0 truncate font-sans text-[1.3125rem] font-semibold leading-snug tracking-tight text-app-strong"
          >
            Explore
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="sidebar-close-btn-bark shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--app-accent-rgb),0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--app-card-warm)]"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" strokeWidth={2} aria-hidden />
          </button>
        </div>
      </motion.header>

      <motion.div
        className="flex min-h-0 flex-1 flex-col px-0 pb-[max(1rem,env(safe-area-inset-bottom))] pt-0"
        {...item(1)}
      >
        <BlogOutlineExplorer onNavigate={isSmall ? onClose : undefined} />
      </motion.div>
    </>
  );
}
