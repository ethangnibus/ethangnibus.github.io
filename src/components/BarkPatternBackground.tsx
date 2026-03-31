import {
  makePatternComponent,
  BARK_MATERIAL,
  barkPatternStyle,
  type PatternVariant,
  type PatternStyleOptions,
} from "./PatternBackground";

export { barkPatternStyle, BARK_MATERIAL };
export type { PatternVariant, PatternStyleOptions };

export const BarkCloseUpGrid = makePatternComponent("close-grid", BARK_MATERIAL, "BarkCloseUpGrid");
export const BarkFarAwayGrid = makePatternComponent("far-grid", BARK_MATERIAL, "BarkFarAwayGrid");
export const BarkCloseUpForwardSlash = makePatternComponent("close-fslash", BARK_MATERIAL, "BarkCloseUpForwardSlash");
export const BarkFarAwayForwardSlash = makePatternComponent("far-fslash", BARK_MATERIAL, "BarkFarAwayForwardSlash");
export const BarkCloseUpBackSlash = makePatternComponent("close-bslash", BARK_MATERIAL, "BarkCloseUpBackSlash");
export const BarkFarAwayBackSlash = makePatternComponent("far-bslash", BARK_MATERIAL, "BarkFarAwayBackSlash");
export const BarkVerticalLines = makePatternComponent("vertical-lines", BARK_MATERIAL, "BarkVerticalLines");
