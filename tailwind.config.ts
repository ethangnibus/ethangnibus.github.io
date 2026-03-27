/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        // Eberlabs palette
        portal: {
          cosmo: "#D93390",      // Hot Pink — primary CTA/interactive, on light bg
          cosmoLight: "#FF5CB0", // Hot Pink light — for dark backgrounds
          poof: "#8B4FCC",       // Medium Purple — labels, badges, on light bg
          poofLight: "#C090FF",  // Purple light — for dark backgrounds
          tape: "#F45210",       // Vermillion Orange — warm accent, on light bg
          tapeLight: "#F9A800",  // Amber — warm LED glow (kept for reference, replaced by go)
          go: "#1FAD4E",         // Portal green — on light backgrounds (old cosmo)
          goLight: "#2EE065",    // Portal green — for dark backgrounds (old cosmoLight)
          blue: "#6B8FEF",       // Cornflower Blue — alternate accent
          blueLight: "#9BB5FF",  // Cornflower Blue light — for dark backgrounds
          dark: "#1a1a1a",
          darker: "#0a0a0a",
          silver: "#f0f0f0",     // MacBook silver panel
          silverMid: "#e0e0e0",  // card headers, borders
          silverDark: "#c8c8c8", // deeper accent
          cream: "#FAF8F4",      // Warm white — analog warmth
          creamMid: "#F0EBE3",   // Warm silver panel
          white: "#ffffff",
        },
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
