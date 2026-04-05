/**
 * Single source of truth for app colors. CSS variables are injected on import
 * so `index.css` and Tailwind can reference the same values.
 */

export const APP_PALETTE = {
  // Surfaces
  surfaceHtml: "#BCA68B",
  surfaceBase: "#E6D6C0",
  cardWarm: "#F7F1E8",
  experienceCardBg: "#faf8f4",
  mediaBg: "#0a0a0a",

  // Typography
  textStrong: "#2A2218",
  textBody: "#5A4A30",
  textBodyWarm: "#2A2014",
  textNav: "#1A1A1A",
  textDefault: "#1a1a1a",
  textMuted: "#666666",
  textMutedDark: "#555555",
  textInk: "#0a0a1a",
  textHeadingHover: "#0a0a0a",
  white: "#ffffff",
  black: "#000000",

  /** Space-separated RGB for `rgba(var(--x), a)` / template rgba strings */
  textBodyRgb: "90, 74, 48",
  textBodyWarmRgb: "42, 32, 20",
  categoryCvRgb: "139, 26, 43",
  categoryGraphicsRgb: "75, 29, 107",
  portalCosmoLightRgb: "200, 120, 90",

  // Primary accent (redwood)
  accent: "#78371E",

  // Category / blog accents (aligned with tailwind `portal`)
  categoryCv: "#8B1A2B",
  categoryGraphics: "#4B1D6B",

  // Navbar chrome
  navbarGradTop: "#EBDCC8",
  navbarGradBottom: "#D9C4AB",
  navbarBorder: "rgba(140,65,35,0.8)",

  // Body grid (wood tone)
  woodLineRgb: "120, 55, 30",
  bodyGridOpacity: "0.1",

  // Wood material (patterns + default pills)
  woodLinePatternRgb: "120, 55, 30",
  barkBase: "#B8AFA6",
  barkLinePatternRgb: "80, 70, 60",

  // Pill — default (cabin wood)
  pillWoodBgTop: "#EFE0CC",
  pillWoodBgBottom: "#D9C4AB",
  pillWoodBgHoverTop: "#E6D6C0",
  pillWoodBgHoverBottom: "#CCB8A0",
  pillWoodBorder: "rgba(120,55,30,0.7)",
  pillWoodBorderHover: "rgba(100,40,15,0.9)",

  // Pill — bark
  pillBarkBgTop: "#C8BFB6",
  pillBarkBgBottom: "#AEA498",
  pillBarkBgHoverTop: "#BEB5AC",
  pillBarkBgHoverBottom: "#A49A8E",
  pillBarkBorder: "rgba(120,105,88,0.6)",
  pillBarkBorderHover: "rgba(105,90,72,0.8)",

  // Pill — carousel / glass
  pillCarouselBgTop: "rgba(255,255,255,0.18)",
  pillCarouselBgBottom: "rgba(255,255,255,0.06)",
  pillCarouselBorder: "rgba(160,82,45,0.7)",
  pillCarouselBorderHover: "rgba(160,82,45,0.9)",
  pillCarouselText: "#C8785A",
  pillCarouselHoverBgTop: "#A0522D",
  pillCarouselHoverBgBottom: "#7A3A18",
  pillCarouselShadow: "rgba(160,82,45,0.2)",
  pillCarouselShadowHover: "rgba(160,82,45,0.5)",

  // Portal / illustration accents (SectionHeader, Experience, About)
  portalCosmo: "#A0522D",
  portalCosmoRgb: "160, 82, 45",
  portalCosmoLight: "#C8785A",
  portalPoof: "#6B2E1A",
  /** RGB tuple for `rgba(${portalPoofRgb}, a)` (matches {@link portalPoof}) */
  portalPoofRgb: "107, 46, 26",
  portalPoofLight: "#9A5C40",
  portalBlue: "#5A6458",
  portalSilverDark: "#B09B82",
  portalCrimsonLight: "#C04050",
  portalVioletLight: "#8B5CB0",
  portalRose: "#7A1A3A",
  portalRoseRgb: "122, 26, 58",

  /** Playing-card suit color (dark clubs/spades) */
  playingCardSuitDark: "#2a1a0a",

  // Bark scale (sidebar / tailwind bark.*)
  barkLight: "#C8BFB6",
  barkDark: "#A49A8E",
  barkGrain: "#504638",
  barkBorder: "#786850",
  barkText: "#2A2218",

  // Misc UI
  carouselThumbBorderInactive: "rgba(120, 104, 80, 0.2)",
  blogCaptionTint: "#E6D6C0",
  heroCtaBorder: "rgba(120, 55, 30, 0.25)",
  heroCtaBg: "rgba(241, 230, 214, 0.75)",
  heroCtaBgHover: "#F1E6D6",
  heroCtaBgActive: "#E6D6C0",

  // AboutSection chromatic aberration (decorative)
  aboutMaskPurple: "#1a0838",
  aboutCyan: "#00FFFF",
  aboutMagenta: "#FF00FF",
  aboutYellow: "#FFFF00",

  // Experience sequencer illustration (SVG)
  expSeqBg: "#1a1a1a",
  expSeqSpace1: "#1a1a2e",
  expSeqSpace2: "#1e1e3a",
  expSeqSpace3: "#2a2a4a",
  expSeqEyeFill: "#050510",
  expSeqStroke: "#5A6458",
  expSeqMouth: "#2a2a4a",
  expSeqCheek: "#6B2E1A",
} as const;

/** @deprecated Use APP_PALETTE for new code; kept for existing imports. */
export const APP_COLORS = {
  textStrong: APP_PALETTE.textStrong,
  textBody: APP_PALETTE.textBody,
  textBodyWarm: APP_PALETTE.textBodyWarm,
  textNav: APP_PALETTE.textNav,
  accent: APP_PALETTE.accent,
} as const;

export const BLOG_CATEGORY_ACCENTS = {
  cv: APP_PALETTE.categoryCv,
  graphics: APP_PALETTE.categoryGraphics,
} as const;

/**
 * Matches `Navbar.tsx` chrome. Uses CSS vars so blog portal palettes (graphics / vision)
 * pick up the correct gradient automatically.
 */
export const NAVBAR_SURFACE = {
  gradient:
    "linear-gradient(to bottom, var(--app-navbar-grad-top) 0%, var(--app-navbar-grad-bottom) 100%)",
  /** Solid edge for 2px borders (top stop of the navbar gradient). */
  border: "var(--app-navbar-grad-top)",
} as const;

/** Tailwind `extend.colors` — import in tailwind.config.ts */
export const TAILWIND_THEME_COLORS = {
  portal: {
    cosmo: APP_PALETTE.portalCosmo,
    cosmoLight: APP_PALETTE.portalCosmoLight,
    poof: APP_PALETTE.portalPoof,
    poofLight: APP_PALETTE.portalPoofLight,
    blue: APP_PALETTE.portalBlue,
    silverDark: APP_PALETTE.portalSilverDark,
    crimson: APP_PALETTE.categoryCv,
    crimsonLight: APP_PALETTE.portalCrimsonLight,
    violet: APP_PALETTE.categoryGraphics,
    violetLight: APP_PALETTE.portalVioletLight,
    rose: APP_PALETTE.portalRose,
  },
  bark: {
    base: APP_PALETTE.barkBase,
    light: APP_PALETTE.barkLight,
    dark: APP_PALETTE.barkDark,
    grain: APP_PALETTE.barkGrain,
    border: APP_PALETTE.barkBorder,
    text: APP_PALETTE.barkText,
  },
  app: {
    strong: APP_PALETTE.textStrong,
    body: APP_PALETTE.textBody,
    warm: APP_PALETTE.textBodyWarm,
    nav: APP_PALETTE.textNav,
    default: APP_PALETTE.textDefault,
    muted: APP_PALETTE.textMuted,
    mutedDark: APP_PALETTE.textMutedDark,
    ink: APP_PALETTE.textInk,
    accent: APP_PALETTE.accent,
    surface: APP_PALETTE.surfaceBase,
    surfaceHtml: APP_PALETTE.surfaceHtml,
    cardWarm: APP_PALETTE.cardWarm,
    media: APP_PALETTE.mediaBg,
    headingHover: APP_PALETTE.textHeadingHover,
    categoryCv: APP_PALETTE.categoryCv,
    categoryGraphics: APP_PALETTE.categoryGraphics,
    white: APP_PALETTE.white,
    black: APP_PALETTE.black,
    blogCaption: APP_PALETTE.blogCaptionTint,
    cosmo: APP_PALETTE.portalCosmo,
    rose: APP_PALETTE.portalRose,
  },
} as const;

const CSS_VAR_MAP: Record<string, string> = {
  "--surface-base": APP_PALETTE.surfaceBase,
  "--surface-html": APP_PALETTE.surfaceHtml,
  "--app-text-strong": APP_PALETTE.textStrong,
  "--app-text-body": APP_PALETTE.textBody,
  "--app-text-nav": APP_PALETTE.textNav,
  "--app-text-default": APP_PALETTE.textDefault,
  "--app-accent": APP_PALETTE.accent,
  "--app-accent-rgb": "120, 55, 30",
  "--app-text-body-rgb": "90, 74, 48",
  "--app-text-body-warm-rgb": APP_PALETTE.textBodyWarmRgb,
  "--app-portal-cosmo-light-rgb": APP_PALETTE.portalCosmoLightRgb,
  "--app-border-subtle": "rgba(0,0,0,0.1)",
  "--app-row-hairline": "rgba(0,0,0,0.06)",
  "--app-card-warm": APP_PALETTE.cardWarm,
  "--app-navbar-grad-top": APP_PALETTE.navbarGradTop,
  "--app-navbar-grad-bottom": APP_PALETTE.navbarGradBottom,
  "--app-navbar-border": APP_PALETTE.navbarBorder,
  "--app-wood-line-rgb": APP_PALETTE.woodLineRgb,
  "--app-body-grid-opacity": APP_PALETTE.bodyGridOpacity,
  "--app-pill-wood-bg-top": APP_PALETTE.pillWoodBgTop,
  "--app-pill-wood-bg-bottom": APP_PALETTE.pillWoodBgBottom,
  "--app-pill-wood-bg-hover-top": APP_PALETTE.pillWoodBgHoverTop,
  "--app-pill-wood-bg-hover-bottom": APP_PALETTE.pillWoodBgHoverBottom,
  "--app-pill-wood-border": APP_PALETTE.pillWoodBorder,
  "--app-pill-wood-border-hover": APP_PALETTE.pillWoodBorderHover,
  "--app-pill-wood-text": APP_PALETTE.textDefault,
  "--app-pill-bark-bg-top": APP_PALETTE.pillBarkBgTop,
  "--app-pill-bark-bg-bottom": APP_PALETTE.pillBarkBgBottom,
  "--app-pill-bark-bg-hover-top": APP_PALETTE.pillBarkBgHoverTop,
  "--app-pill-bark-bg-hover-bottom": APP_PALETTE.pillBarkBgHoverBottom,
  "--app-pill-bark-border": APP_PALETTE.pillBarkBorder,
  "--app-pill-bark-border-hover": APP_PALETTE.pillBarkBorderHover,
  "--app-pill-bark-text": APP_PALETTE.textStrong,
  "--app-pill-bark-text-hover": APP_PALETTE.textDefault,
  "--app-pill-carousel-bg-top": APP_PALETTE.pillCarouselBgTop,
  "--app-pill-carousel-bg-bottom": APP_PALETTE.pillCarouselBgBottom,
  "--app-pill-carousel-border": APP_PALETTE.pillCarouselBorder,
  "--app-pill-carousel-border-hover": APP_PALETTE.pillCarouselBorderHover,
  "--app-pill-carousel-text": APP_PALETTE.pillCarouselText,
  "--app-pill-carousel-hover-bg-top": APP_PALETTE.pillCarouselHoverBgTop,
  "--app-pill-carousel-hover-bg-bottom": APP_PALETTE.pillCarouselHoverBgBottom,
  "--app-pill-carousel-shadow": APP_PALETTE.pillCarouselShadow,
  "--app-pill-carousel-shadow-hover": APP_PALETTE.pillCarouselShadowHover,
  "--app-pill-carousel-text-hover": APP_PALETTE.white,
};

export function injectAppPaletteCssVars(): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  for (const [name, value] of Object.entries(CSS_VAR_MAP)) {
    root.style.setProperty(name, value);
  }
}

injectAppPaletteCssVars();

// ── Per-blog color palettes ───────────────────────────────────────────────────

/** Full CSS-var map for the about-me / default warm-wood palette. */
const PALETTE_ABOUT_ME: Record<string, string> = { ...CSS_VAR_MAP };

/** Violet-tinted palette for learning-graphics. */
const PALETTE_GRAPHICS: Record<string, string> = {
  "--surface-base": "#DDD0EC",
  "--surface-html": "#A898B8",
  "--app-text-strong": "#1E1428",
  "--app-text-body": "#483260",
  "--app-text-nav": "#1A1218",
  "--app-text-default": "#180818",
  "--app-accent": "#5B2D8A",
  "--app-accent-rgb": "91, 45, 138",
  "--app-text-body-rgb": "72, 50, 96",
  "--app-card-warm": "#EEE8F7",
  "--app-navbar-grad-top": "#E0D8EE",
  "--app-navbar-grad-bottom": "#CABFDE",
  "--app-navbar-border": "rgba(75, 29, 107, 0.8)",
  "--app-wood-line-rgb": "75, 29, 107",
  "--app-body-grid-opacity": "0.1",
  "--app-pill-wood-bg-top": "#EAE0F4",
  "--app-pill-wood-bg-bottom": "#D8C8E8",
  "--app-pill-wood-bg-hover-top": "#DDD0EC",
  "--app-pill-wood-bg-hover-bottom": "#C8B4DC",
  "--app-pill-wood-border": "rgba(75, 29, 107, 0.7)",
  "--app-pill-wood-border-hover": "rgba(60, 20, 90, 0.9)",
  "--app-pill-wood-text": "#180818",
  "--app-pill-bark-bg-top": "#C4BBD0",
  "--app-pill-bark-bg-bottom": "#ADA0BC",
  "--app-pill-bark-bg-hover-top": "#B8AEC8",
  "--app-pill-bark-bg-hover-bottom": "#A098B4",
  "--app-pill-bark-border": "rgba(100, 80, 120, 0.6)",
  "--app-pill-bark-border-hover": "rgba(85, 65, 105, 0.8)",
  "--app-pill-bark-text": "#1E1428",
  "--app-pill-bark-text-hover": "#180818",
  "--app-pill-carousel-bg-top": "rgba(255, 255, 255, 0.180)",
  "--app-pill-carousel-bg-bottom": "rgba(255, 255, 255, 0.060)",
  "--app-pill-carousel-border": "rgba(91, 45, 138, 0.700)",
  "--app-pill-carousel-border-hover": "rgba(91, 45, 138, 0.900)",
  "--app-pill-carousel-text": "#8B5CB0",
  "--app-pill-carousel-hover-bg-top": "#5B2D8A",
  "--app-pill-carousel-hover-bg-bottom": "#3A1860",
  "--app-pill-carousel-shadow": "rgba(91, 45, 138, 0.200)",
  "--app-pill-carousel-shadow-hover": "rgba(91, 45, 138, 0.500)",
  "--app-pill-carousel-text-hover": "#ffffff",
};

/** Crimson-tinted palette for learning-vision. */
const PALETTE_VISION: Record<string, string> = {
  "--surface-base": "#EDD0D0",
  "--surface-html": "#C89090",
  "--app-text-strong": "#2A0A10",
  "--app-text-body": "#6A1828",
  "--app-text-nav": "#1A0808",
  "--app-text-default": "#1A0808",
  "--app-accent": "#A01020",
  "--app-accent-rgb": "160, 16, 32",
  "--app-text-body-rgb": "106, 24, 40",
  "--app-card-warm": "#FAE9E9",
  "--app-navbar-grad-top": "#F0D8D8",
  "--app-navbar-grad-bottom": "#E0C4C4",
  "--app-navbar-border": "rgba(160, 16, 32, 0.8)",
  "--app-wood-line-rgb": "160, 16, 32",
  "--app-body-grid-opacity": "0.1",
  "--app-pill-wood-bg-top": "#F5DCDC",
  "--app-pill-wood-bg-bottom": "#E8C8C8",
  "--app-pill-wood-bg-hover-top": "#EDD0D0",
  "--app-pill-wood-bg-hover-bottom": "#DDBCBC",
  "--app-pill-wood-border": "rgba(160, 16, 32, 0.7)",
  "--app-pill-wood-border-hover": "rgba(130, 10, 22, 0.9)",
  "--app-pill-wood-text": "#1A0808",
  "--app-pill-bark-bg-top": "#D8B8B8",
  "--app-pill-bark-bg-bottom": "#C8A0A0",
  "--app-pill-bark-bg-hover-top": "#CCA8A8",
  "--app-pill-bark-bg-hover-bottom": "#BC9090",
  "--app-pill-bark-border": "rgba(140, 40, 50, 0.6)",
  "--app-pill-bark-border-hover": "rgba(120, 25, 35, 0.8)",
  "--app-pill-bark-text": "#2A0A10",
  "--app-pill-bark-text-hover": "#1A0808",
  "--app-pill-carousel-bg-top": "rgba(255, 255, 255, 0.180)",
  "--app-pill-carousel-bg-bottom": "rgba(255, 255, 255, 0.060)",
  "--app-pill-carousel-border": "rgba(160, 16, 32, 0.700)",
  "--app-pill-carousel-border-hover": "rgba(160, 16, 32, 0.900)",
  "--app-pill-carousel-text": "#CC2040",
  "--app-pill-carousel-hover-bg-top": "#A01020",
  "--app-pill-carousel-hover-bg-bottom": "#700010",
  "--app-pill-carousel-shadow": "rgba(160, 16, 32, 0.200)",
  "--app-pill-carousel-shadow-hover": "rgba(160, 16, 32, 0.500)",
  "--app-pill-carousel-text-hover": "#ffffff",
};

/**
 * Returns the CSS variable map for the given pathname.
 * Used by usePaletteTransition to animate between palettes on navigation.
 */
export function getCssVarsForPath(pathname: string): Record<string, string> {
  if (pathname.startsWith("/blog/learning-graphics")) return PALETTE_GRAPHICS;
  if (pathname.startsWith("/blog/learning-vision")) return PALETTE_VISION;
  return PALETTE_ABOUT_ME;
}
