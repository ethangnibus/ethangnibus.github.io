import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { PillButton } from "./PillButton";

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
];

function scrollToId(id: string) {
  const container = document.getElementById("scroll-container");
  const el = document.getElementById(id);
  if (!el || !container) return;
  container.scrollTo({ top: el.offsetTop, behavior: "smooth" });
}

function scrollToTop() {
  document.getElementById("scroll-container")?.scrollTo({ top: 0, behavior: "smooth" });
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      className="shrink-0 overflow-hidden mx-3 mt-3 mb-3"
      style={{
        background: "linear-gradient(to bottom, #f4f4f4 0%, #d6d6d6 100%)",
        borderRadius: "9999px",
        border: "1px solid rgba(200,200,200,0.9)",
        boxShadow:
          "0 16px 48px rgba(0,0,0,0.28), 0 4px 12px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.85)",
      }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between px-5 h-14">
        {/* Brand */}
        <button
          onClick={scrollToTop}
          className="font-mono text-[#1a1a1a] font-bold text-xl tracking-wider uppercase transition-all duration-300 hover:text-portal-cosmo"
        >
          Ethan Gnibus
        </button>

        {/* Desktop links */}
        <ul className="hidden sm:flex items-center gap-3">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <PillButton onClick={() => scrollToId(link.id)} className="text-sm tracking-widest px-5 py-2">
                {link.label}
              </PillButton>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden text-[#1a1a1a] hover:text-portal-cosmo transition-colors duration-300 p-2 rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.9) 0%, rgba(220,220,220,0.7) 100%)",
            border: "1px solid rgba(180,180,180,0.8)",
            boxShadow:
              "0 2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.95)",
          }}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown — inside the island so rounded corners clip it */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="sm:hidden overflow-hidden"
            style={{
              background: "linear-gradient(to bottom, #e8e8e8 0%, #d0d0d0 100%)",
              borderTop: "1px solid rgba(180,180,180,0.5)",
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <ul className="flex flex-col gap-3 px-5 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <PillButton
                    onClick={() => { scrollToId(link.id); setMenuOpen(false); }}
                    className="text-sm tracking-widest w-full px-4 py-2.5 justify-start"
                  >
                    {link.label}
                  </PillButton>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
