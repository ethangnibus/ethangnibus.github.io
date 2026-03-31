import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { PillButton } from "./PillButton";
import { ProjectedText } from "./ProjectedText";

interface NavbarProps {
  sidebarOpen: boolean;
  onMenuOpen: () => void;
}

export function Navbar({ sidebarOpen, onMenuOpen }: NavbarProps) {
  return (
    <motion.nav
      className="shrink-0 overflow-hidden mx-3 mt-3 mb-3"
      style={{
        background: "linear-gradient(to bottom, #EBDCC8 0%, #D9C4AB 100%)",
        border: "1px solid rgba(140,65,35,0.8)",
        boxShadow:
          "0 16px 48px rgba(0,0,0,0.28), 0 4px 12px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.65)",
        borderRadius: "9999px",
      }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        opacity: { duration: 0.4, ease: "easeOut" },
        y: { duration: 0.4, ease: "easeOut" },
      }}
    >
      <div className="flex items-center justify-between px-5 h-14">
        {/* Left: hamburger + brand */}
        <button
          className="group outline-none focus:outline-none"
          onClick={onMenuOpen}
          aria-label="Open navigation menu"
        >
          <span className="flex items-center text-[#1a1a1a] transition-transform duration-200 group-hover:scale-105">
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
            <span className="font-mono font-bold text-xl tracking-wider uppercase">
              <ProjectedText color="#1a1a1a" intensity={0.7}>
                Ethan Gnibus
              </ProjectedText>
            </span>
          </span>
        </button>

        {/* Right: Contact Me */}
        <PillButton
          className="text-sm tracking-widest px-5 py-2"
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/ethangnibus",
              "_blank",
            )
          }
        >
          <ProjectedText color="#1a1a1a" intensity={0.5}>
            Contact Me
          </ProjectedText>
        </PillButton>
      </div>
    </motion.nav>
  );
}
