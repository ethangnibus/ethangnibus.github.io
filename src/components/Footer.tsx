import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer
      className="relative overflow-hidden py-10 flex items-center justify-center"
      style={{
        background: "linear-gradient(to bottom, #f4f4f4 0%, #d6d6d6 100%)",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
        backgroundSize: "50px 50px",
        borderTop: "1px solid rgba(31,173,78,0.25)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.85)",
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <p className="font-mono text-[#555] text-sm tracking-[0.35em] uppercase">
        © 2026 Ethan Gnibus
      </p>
    </motion.footer>
  );
}
