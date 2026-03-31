import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { PillButton } from "./PillButton";
import { ProjectedText } from "./ProjectedText";
import { barkPatternStyle } from "./BarkPatternBackground";

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
];

const SIDEBAR_WIDTH = 240;

const NAVBAR_HEIGHT = 80;

function scrollToId(id: string) {
  const container = document.getElementById("scroll-container");
  const el = document.getElementById(id);
  if (!el || !container) return;
  container.scrollTo({ top: el.offsetTop - NAVBAR_HEIGHT, behavior: "smooth" });
}

function scrollToTop() {
  document
    .getElementById("scroll-container")
    ?.scrollTo({ top: 0, behavior: "smooth" });
}

function scrollToBottom() {
  const container = document.getElementById("scroll-container");
  if (!container) return;
  container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
}

const BG_STYLE = barkPatternStyle("vertical-lines", {
  lineOpacity: 0.15,
});

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
        <SidebarContent onClose={onClose} animateItems={animateItems} isSmall />
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
            <SidebarContent onClose={onClose} animateItems={animateItems} isSmall={false} />
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
      {/* Header */}
      <motion.div className="flex items-center justify-between px-5 pt-5 pb-3" {...item(0)}>
        <span className="font-mono text-[#2A2218] font-bold text-lg tracking-[0.15em] uppercase">
          <ProjectedText color="#2A2218" intensity={0.5}>
            Jump to
          </ProjectedText>
        </span>

        <button
          onClick={onClose}
          className="sidebar-close-btn-bark"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </motion.div>

      {/* Nav links */}
      <nav className="flex flex-col gap-3 px-5 mt-4">
        <motion.div {...item(1)}>
          <PillButton
            variant="bark"
            onClick={() => {
              scrollToTop();
              if (isSmall) onClose();
            }}
            className="text-sm tracking-widest w-full px-4 py-2.5 justify-start"
          >
            <ProjectedText color="#2A2218" intensity={0.5}>
              Top
            </ProjectedText>
          </PillButton>
        </motion.div>
        {NAV_LINKS.map((link, i) => (
          <motion.div key={link.id} {...item(i + 2)}>
            <PillButton
              variant="bark"
              onClick={() => {
                scrollToId(link.id);
                if (isSmall) onClose();
              }}
              className="text-sm tracking-widest w-full px-4 py-2.5 justify-start"
            >
              <ProjectedText color="#2A2218" intensity={0.5}>
                {link.label}
              </ProjectedText>
            </PillButton>
          </motion.div>
        ))}
        <motion.div {...item(NAV_LINKS.length + 2)}>
          <PillButton
            variant="bark"
            onClick={() => {
              scrollToBottom();
              if (isSmall) onClose();
            }}
            className="text-sm tracking-widest w-full px-4 py-2.5 justify-start"
          >
            <ProjectedText color="#2A2218" intensity={0.5}>
              Bottom
            </ProjectedText>
          </PillButton>
        </motion.div>
      </nav>

      <div className="flex-1" />

      {/* Contact Me */}
      <motion.div className="px-5 pb-5" {...item(NAV_LINKS.length + 3)}>
        <PillButton
          variant="bark"
          className="text-sm tracking-widest w-full px-5 py-2.5"
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/ethangnibus",
              "_blank",
            )
          }
        >
          <ProjectedText color="#2A2218" intensity={0.5}>
            Contact Me
          </ProjectedText>
        </PillButton>
      </motion.div>
    </>
  );
}
