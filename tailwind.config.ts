import type { Config } from "tailwindcss";
import { TAILWIND_THEME_COLORS } from "./src/theme";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: TAILWIND_THEME_COLORS,
      fontFamily: {
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [
    ({ addVariant }: { addVariant: (name: string, definition: string) => void }) => {
      /** Only apply hover styles on devices that support true pointer hover. */
      addVariant("can-hover", "@media (hover: hover) and (pointer: fine)");
    },
  ],
} satisfies Config;
