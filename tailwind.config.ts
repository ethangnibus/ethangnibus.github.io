/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        portal: {
          cosmo: "#A0522D",
          cosmoLight: "#C8785A",
          poof: "#6B2E1A",
          poofLight: "#9A5C40",
          blue: "#5A6458",
          silverDark: "#B09B82",
          crimson: "#8B1A2B",
          crimsonLight: "#C04050",
          violet: "#4B1D6B",
          violetLight: "#8B5CB0",
          rose: "#7A1A3A",
        },
        bark: {
          base: "#B8AFA6",
          light: "#C8BFB6",
          dark: "#A49A8E",
          grain: "#504638",
          border: "#786850",
          text: "#2A2218",
        },
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};
