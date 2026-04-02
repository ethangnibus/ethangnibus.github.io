export interface ChapterSection {
  id: string;
  title: string;
}

/** Canonical section ids + display titles; numbering (1.1, 1.2, …) is derived from order. */
export const CHAPTER_OUTLINES: Record<string, ChapterSection[]> = {
  "learning-graphics/rasterizer": [
    { id: "overview", title: "Overview" },
    { id: "rasterizing-single-color-triangles", title: "Rasterizing Single-Color Triangles" },
    { id: "antialiasing-by-supersampling", title: "Antialiasing by Supersampling" },
    { id: "transforms", title: "Transforms" },
    { id: "barycentric-coordinates", title: "Barycentric Coordinates" },
    { id: "pixel-sampling-texture-mapping", title: "Pixel Sampling for Texture Mapping" },
    { id: "level-sampling-mipmaps", title: "Level Sampling with Mipmaps" },
    { id: "art-competition", title: "Art Competition" },
  ],
  "learning-graphics/mesh-editor": [
    { id: "overview", title: "Overview" },
    { id: "bezier-curves-and-surfaces", title: "Bezier Curves and Surfaces" },
    { id: "sampling", title: "Sampling" },
    { id: "loop-subdivision", title: "Loop Subdivision for Mesh Upsampling" },
    { id: "optional-extra-credit", title: "Optional Extra Credit" },
  ],
  "learning-graphics/pathtracer": [
    { id: "overview", title: "Overview" },
    { id: "ray-generation-intersection", title: "Ray Generation & Intersection" },
    { id: "bounding-volume-hierarchy", title: "Bounding Volume Hierarchy" },
    { id: "direct-illumination", title: "Direct Illumination" },
    { id: "global-illumination", title: "Global Illumination" },
    { id: "adaptive-sampling", title: "Adaptive Sampling" },
  ],
  "learning-graphics/reflections-and-refractions": [
    { id: "overview", title: "Overview" },
    { id: "mirror-glass-materials", title: "Mirror & Glass Materials" },
    { id: "depth-of-field-thin-lens", title: "Depth of Field (Thin Lens)" },
  ],
  "learning-graphics/cloth-simulation": [
    { id: "overview", title: "Overview" },
    { id: "masses-springs", title: "Masses & Springs" },
    { id: "numerical-integration", title: "Simulation via Numerical Integration" },
    { id: "collisions-objects", title: "Handling Collisions with Other Objects" },
    { id: "self-collisions", title: "Handling Self-Collisions" },
    { id: "shaders", title: "Shaders" },
    { id: "extra-credit", title: "Extra Credit" },
  ],
  "learning-vision/recolorizing": [
    { id: "overview", title: "Overview" },
    { id: "approach", title: "Approach" },
    { id: "result-example-images", title: "Result on Example Images" },
    { id: "result-extra-images", title: "Result on Extra Images" },
    { id: "bells-and-whistles", title: "Bells and Whistles" },
    { id: "bells-and-whistles-results", title: "Bells and Whistles Results" },
  ],
  "learning-vision/filters-and-frequency": [
    { id: "overview", title: "Overview" },
    { id: "fun-with-filters", title: "Fun with Filters" },
    { id: "fun-with-frequencies", title: "Fun with Frequencies" },
  ],
  "learning-vision/morphing-faces": [
    { id: "overview", title: "Overview" },
    { id: "defining-correspondences", title: "Defining Correspondences" },
    { id: "midway-face", title: "Computing the Mid-way Face" },
    { id: "morph-sequence", title: "The Morph Sequence" },
    { id: "mean-face", title: "Mean Face of a Population" },
    { id: "extrapolating-mean", title: "Extrapolating from the Mean" },
    { id: "bells-and-whistles", title: "Bells and Whistles" },
  ],
  "learning-vision/making-mosaics": [
    { id: "overview", title: "Overview" },
    { id: "warping-mosaicing", title: "Image Warping and Mosaicing" },
    { id: "feature-matching-autostitching", title: "Feature Matching for Autostitching" },
  ],
  "learning-vision/keypoint-detection": [
    { id: "overview", title: "Overview" },
    { id: "nose-tip-detection", title: "Nose Tip Detection" },
    { id: "full-facial-keypoints", title: "Full Facial Keypoints Detection" },
    { id: "larger-dataset", title: "Train With Larger Dataset" },
    { id: "pixelwise-classification", title: "Pixelwise Classification" },
    { id: "kaggle", title: "Kaggle" },
  ],
  "learning-vision/style-transfer": [
    { id: "overview", title: "Overview" },
    { id: "building-the-network", title: "Building The Network" },
    { id: "style-ratio-layers", title: "Varying Style Ratio & Style Layers" },
    { id: "multiple-styles", title: "Multiple Different Styles on One Image" },
    { id: "repetitive-styling", title: "Repetitive Styling" },
  ],
  "learning-vision/teapot-in-a-stadium": [
    { id: "overview", title: "Overview" },
    { id: "technical-approach", title: "Technical Approach" },
    { id: "results", title: "Results" },
    { id: "source-code", title: "Source Code" },
  ],
  "learning-vision/alternate-reality": [
    { id: "overview", title: "Overview" },
    { id: "importing-video-feed", title: "Importing a Video Feed" },
    { id: "tracking-points", title: "Tracking Points" },
    { id: "projection-matrices", title: "Finding the Projection Matrices" },
    { id: "displaying-the-box", title: "Displaying the Box" },
  ],
};
