import {
  makePatternComponent,
  WOOD_MATERIAL,
  woodPatternStyle,
  type PatternVariant,
  type PatternStyleOptions,
} from "./PatternBackground";

export { woodPatternStyle, WOOD_MATERIAL };
export type { PatternVariant, PatternStyleOptions };

export const WoodCloseUpGrid = makePatternComponent("close-grid", WOOD_MATERIAL, "WoodCloseUpGrid");
export const WoodFarAwayGrid = makePatternComponent("far-grid", WOOD_MATERIAL, "WoodFarAwayGrid");
export const WoodCloseUpForwardSlash = makePatternComponent("close-fslash", WOOD_MATERIAL, "WoodCloseUpForwardSlash");
export const WoodFarAwayForwardSlash = makePatternComponent("far-fslash", WOOD_MATERIAL, "WoodFarAwayForwardSlash");
export const WoodCloseUpBackSlash = makePatternComponent("close-bslash", WOOD_MATERIAL, "WoodCloseUpBackSlash");
export const WoodFarAwayBackSlash = makePatternComponent("far-bslash", WOOD_MATERIAL, "WoodFarAwayBackSlash");
export const WoodVerticalLines = makePatternComponent("vertical-lines", WOOD_MATERIAL, "WoodVerticalLines");
