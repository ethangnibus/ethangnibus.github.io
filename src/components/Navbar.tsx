import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { PillButton } from "./PillButton";
import { ProjectedText } from "./ProjectedText";
import { APP_PALETTE } from "@/theme";

interface NavbarProps {
  edgeToEdge: boolean;
  sidebarOpen: boolean;
  onMenuToggle: () => void;
}

export function Navbar({ edgeToEdge, sidebarOpen, onMenuToggle }: NavbarProps) {
  return (
    <motion.nav
      aria-label="Primary"
      className={`shrink-0 overflow-hidden ${
        edgeToEdge
          ? "w-full border-b rounded-none pt-[env(safe-area-inset-top)]"
          : "border rounded-full mx-3 mt-3 mb-3"
      }`}
      style={{
        background: `linear-gradient(to bottom, var(--app-navbar-grad-top) 0%, var(--app-navbar-grad-bottom) 100%)`,
        borderColor: `var(--app-navbar-border)`,
        boxShadow:
          "0 6px 20px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08), inset 0 -1px 0 rgba(255,255,255,0.55)",
      }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        opacity: { duration: 0.4, ease: "easeOut" },
        y: { duration: 0.4, ease: "easeOut" },
      }}
    >
      <div
        className={`flex items-center justify-between ${edgeToEdge ? "px-4" : "px-5"} min-h-14 h-14`}
      >
        {/* Left: hamburger (hidden when sidebar open) + brand */}
        <button
          type="button"
          className="group -ml-1 rounded-lg px-1 py-1 text-left outline-none transition-[transform,colors] duration-200 hover:text-app-strong active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-app-accent/90 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--app-navbar-grad-top)]"
          onClick={onMenuToggle}
          aria-expanded={sidebarOpen}
          aria-controls="site-sidebar"
          aria-label={
            sidebarOpen ? "Close navigation menu" : "Open navigation menu"
          }
        >
          <span className="flex items-center text-app-default transition-transform duration-200 can-hover:group-hover:scale-[1.02]">
            <motion.span
              className="inline-flex items-center justify-center overflow-hidden"
              initial={false}
              animate={{
                width: sidebarOpen ? 0 : 40,
                marginRight: sidebarOpen ? 0 : 12,
                opacity: sidebarOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            >
              <motion.span
                className="inline-flex min-h-9 min-w-9 shrink-0 items-center justify-center sm:min-h-8 sm:min-w-8"
                aria-hidden
                initial={false}
                animate={{
                  scale: sidebarOpen ? 0.5 : 1,
                  rotate: sidebarOpen ? 90 : 0,
                }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <Menu className="h-6 w-6 shrink-0" strokeWidth={2} />
              </motion.span>
            </motion.span>
            <span className="app-nav-brand">
              <ProjectedText
                text="Ethan Gnibus"
                color={APP_PALETTE.textNav}
                intensity={0.7}
              />
            </span>
          </span>
        </button>

        <PillButton
          className="app-cta min-h-[44px] px-5 py-2 sm:min-h-0"
          href="https://www.linkedin.com/in/ethangnibus"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ProjectedText
            text="Connect"
            color={APP_PALETTE.textNav}
            intensity={0.5}
          />
        </PillButton>
      </div>
    </motion.nav>
  );
}
