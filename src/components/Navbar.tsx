import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { PillButton } from "./PillButton";
import { ProjectedText } from "./ProjectedText";
import { APP_COLORS, APP_PALETTE } from "@/theme";

interface NavbarProps {
  edgeToEdge: boolean;
  sidebarOpen: boolean;
  onMenuToggle: () => void;
}

export function Navbar({ edgeToEdge, sidebarOpen, onMenuToggle }: NavbarProps) {
  return (
    <motion.nav
      className={`shrink-0 overflow-hidden ${
        edgeToEdge
          ? "w-full border-b rounded-none"
          : "border rounded-full mx-3 mt-3 mb-3"
      }`}
      style={{
        background: `linear-gradient(to bottom, ${APP_PALETTE.navbarGradTop} 0%, ${APP_PALETTE.navbarGradBottom} 100%)`,
        borderColor: APP_PALETTE.navbarBorder,
        boxShadow:
          "0 16px 48px rgba(0,0,0,0.28), 0 4px 12px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.65)",
      }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        opacity: { duration: 0.4, ease: "easeOut" },
        y: { duration: 0.4, ease: "easeOut" },
      }}
    >
      <div className={`flex items-center justify-between ${edgeToEdge ? "px-4" : "px-5"} h-14`}>
        {/* Left: hamburger + brand */}
        <button
          type="button"
          className="group outline-none focus:outline-none"
          onClick={onMenuToggle}
          aria-expanded={sidebarOpen}
          aria-label={
            sidebarOpen ? "Close navigation menu" : "Open navigation menu"
          }
        >
          <span className="flex items-center text-app-default transition-transform duration-200 group-hover:scale-105">
            <motion.span
              className="inline-flex items-center overflow-hidden"
              initial={false}
              animate={{
                width: sidebarOpen ? 0 : 24,
                marginRight: sidebarOpen ? 0 : 12,
                opacity: sidebarOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            >
              <motion.span
                className="inline-flex"
                initial={false}
                animate={{
                  scale: sidebarOpen ? 0.5 : 1,
                  rotate: sidebarOpen ? 90 : 0,
                }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <Menu className="w-6 h-6 shrink-0" />
              </motion.span>
            </motion.span>
            <span className="app-nav-brand tracking-[0.05em]">
              <ProjectedText color={APP_COLORS.textNav} intensity={0.7}>
                Ethan Gnibus
              </ProjectedText>
            </span>
          </span>
        </button>

        {/* Right: Contact Me */}
        <PillButton
          className="app-cta px-5 py-2"
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/ethangnibus",
              "_blank",
            )
          }
        >
          <ProjectedText color={APP_COLORS.textNav} intensity={0.5}>
            Connect
          </ProjectedText>
        </PillButton>
      </div>
    </motion.nav>
  );
}
