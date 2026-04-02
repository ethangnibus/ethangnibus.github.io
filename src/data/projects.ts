import type { ComponentType } from "react";

import { APP_PALETTE } from "@/theme";
import {
  CHAPTER_OUTLINES,
  type ChapterSection,
} from "./chapterOutlines";
import { AlternateRealityContent } from "@/blog/computer-vision/alternate-reality";
import { FiltersAndFrequencyContent } from "@/blog/computer-vision/filters-and-frequency";
import { KeypointDetectionContent } from "@/blog/computer-vision/keypoint-detection";
import { MakingMosaicsContent } from "@/blog/computer-vision/making-mosaics";
import { MorphingFacesContent } from "@/blog/computer-vision/morphing-faces";
import { RecolorizingContent } from "@/blog/computer-vision/recolorizing";
import { StyleTransferContent } from "@/blog/computer-vision/style-transfer";
import { TeapotInAStadiumContent } from "@/blog/computer-vision/teapot-in-a-stadium";
import { ClothSimulationContent } from "@/blog/computer-graphics/cloth-simulation";
import { MeshEditorContent } from "@/blog/computer-graphics/mesh-editor";
import { PathtracerContent } from "@/blog/computer-graphics/pathtracer";
import { RasterizerContent } from "@/blog/computer-graphics/rasterizer";
import { ReflectionsAndRefractionsContent } from "@/blog/computer-graphics/reflections-and-refractions";

export type ProjectCategory = "cv" | "graphics";

export type { ChapterSection };

export interface Chapter {
  title: string;
  shortTitle: string;
  description: string;
  introductionText: string;
  image: string;
  smallImage: string;
  href: string;
  slug: string;
  content: ComponentType;
  ctaLabel?: string;
  /** Ordered sections within this chapter; displayed as chapterIndex.sectionIndex (e.g. 1.2). */
  sections: ChapterSection[];
}

function chapterSections(projectSlug: string, chapterSlug: string): ChapterSection[] {
  const key = `${projectSlug}/${chapterSlug}`;
  return CHAPTER_OUTLINES[key] ?? [];
}

/** Stable DOM id for in-page section links (blog chapter posts). */
export function sectionAnchorId(
  projectSlug: string,
  chapterSlug: string,
  sectionId: string,
): string {
  return `s-${projectSlug}-${chapterSlug}-${sectionId}`;
}

export function formatChapterNumber(zeroBasedChapterIndex: number): string {
  return String(zeroBasedChapterIndex + 1);
}

/** Display label e.g. "Chapter 1" (not "1: Title"). */
export function formatChapterOrdinal(zeroBasedChapterIndex: number): string {
  return `Chapter ${formatChapterNumber(zeroBasedChapterIndex)}`;
}

export function formatSectionNumber(
  zeroBasedChapterIndex: number,
  zeroBasedSectionIndex: number,
): string {
  return `${zeroBasedChapterIndex + 1}.${zeroBasedSectionIndex + 1}`;
}

export interface Project {
  title: string;
  shortTitle: string;
  description: string;
  intro: string;
  introductionBlurb: string;
  introduction: string;
  image: string;
  smallImage: string;
  slug: string;
  category: ProjectCategory;
  chapters: Chapter[];
}

export type BlogPage =
  | { kind: "project"; project: Project }
  | { kind: "chapter"; project: Project; chapter: Chapter }
  | { kind: "end" };

/** Terminal page after the last chapter in reading order */
export const BLOG_END_PATH = "/blog/end" as const;

/** Portfolio / “About me” home (hero + about, experience, education). */
export const PORTFOLIO_HOME_PATH = "/blog/about-me" as const;

/** Main scroll region id used by `SiteShell` (hero + blog pages). */
export const SITE_SCROLL_CONTAINER_ID = "site-scroll" as const;

/** Scroll offset so anchors / chapter headings clear the fixed shell navbar (align with blog `pt-24`). */
export const SITE_NAVBAR_SCROLL_OFFSET = 96;

/**
 * Labels shared by the hero project switcher and the blog sidebar outline.
 * Category row titles use {@link CATEGORY_META}[category].carouselLabel.
 */
export const SITE_NAV_LABELS = {
  aboutMe: "About Me",
  browseBlogPosts: "Browse Blog Posts",
  closeBlogPosts: "Close Blog Posts",
} as const;

export const CATEGORY_META: Record<
  ProjectCategory,
  {
    label: string;
    shortLabel: string;
    heroTitle: string;
    carouselLabel: string;
    color: string;
  }
> = {
  cv: {
    label: "Learning Computer Vision",
    shortLabel: "Vision",
    heroTitle: "Vision",
    carouselLabel: "Learning Vision",
    color: APP_PALETTE.categoryCv,
  },
  graphics: {
    label: "Learning Computer Graphics",
    shortLabel: "Graphics",
    heroTitle: "Graphics",
    carouselLabel: "Learning Graphics",
    color: APP_PALETTE.categoryGraphics,
  },
};

export const PROJECTS: Project[] = [
  {
    title: CATEGORY_META.graphics.label,
    shortTitle: CATEGORY_META.graphics.shortLabel,
    description:
      "A running log of building graphics from the ground up, from triangles and meshes to light, optics, and cloth.",
    intro:
      "Five chapters from triangles and meshes to light transport, optics, and cloth.",
    introductionBlurb:
      "From rasterization and geometry to path tracing, optics, and cloth simulation.",
    introduction:
      "This project moves through computer graphics in the order I learned it. It starts with rasterization and geometry, then builds toward physically based rendering, reflections and refractions, and finally simulation. Each chapter adds a new piece of the graphics pipeline, so by the end the work has grown from simple image generation into a richer model of how scenes, materials, light, and motion behave.",
    image: "/blog/project-overviews/learning-graphics-overview.jpg",
    smallImage: "/blog/project-overviews/learning-graphics-overview-small.jpg",
    slug: "learning-graphics",
    category: "graphics",
    chapters: [
      {
        title: "Rasterizer",
        shortTitle: "Raster",
        description:
          "Sampling, drawing triangles, and applying anti-aliasing to convert SVGs into rasters",
        introductionText:
          "This chapter starts with the most basic question in graphics: how do you turn shapes into pixels? I work through triangle rasterization, sampling, and anti-aliasing so the pipeline has a solid foundation. By the end, the focus is on understanding how careful low-level image generation decisions shape everything that comes after.",
        image: "/images/graphics/rasterizer/rasterizer.jpg",
        smallImage: "/images/graphics/rasterizer/rasterizer-small.jpg",
        href: "/blog/learning-graphics/rasterizer/pdfs/rasterizer.pdf",
        slug: "rasterizer",
        content: RasterizerContent,
        sections: chapterSections("learning-graphics", "rasterizer"),
      },
      {
        title: "Mesh Editor",
        shortTitle: "Mesh",
        description:
          "Points to make splines, splines to make meshes, and meshes to make even more meshes",
        introductionText:
          "Once pixels are under control, the next step is representing geometry in a more expressive way. This chapter explores curves, splines, subdivision, and the data structures that make editable surfaces possible. It shifts the project from drawing flat primitives toward building and manipulating richer 3D forms.",
        image: "/images/graphics/mesh_editor/mesh_editor.jpg",
        smallImage: "/images/graphics/mesh_editor/mesh_editor-small.jpg",
        href: "/blog/learning-graphics/mesh-editor/pdfs/mesh_editor.pdf",
        slug: "mesh-editor",
        content: MeshEditorContent,
        sections: chapterSections("learning-graphics", "mesh-editor"),
      },
      {
        title: "Pathtracer",
        shortTitle: "Paths",
        description:
          "Simulating the world by recreating physically based models of light - the fun stuff",
        introductionText:
          "Here the project moves from approximate image generation into physically based rendering. I implement ray tracing, materials, lighting, and sampling so images emerge from simulated light transport rather than handcrafted rules. This chapter is the turning point where the renderer starts to feel like a model of the world instead of just a drawing program.",
        image: "/images/graphics/pathtracer/pathtracer.jpg",
        smallImage: "/images/graphics/pathtracer/pathtracer-small.jpg",
        href: "/blog/learning-graphics/pathtracer/pdfs/pathtracer.pdf",
        slug: "pathtracer",
        content: PathtracerContent,
        sections: chapterSections("learning-graphics", "pathtracer"),
      },
      {
        title: "Reflections & Refractions",
        shortTitle: "Reflect",
        description:
          "Extending the pathtracer with realistic glass, mirrors, and adjustable depth of field",
        introductionText:
          "With a pathtracer in place, this chapter pushes it toward more realistic optics. I add reflective and refractive materials, which means thinking carefully about how rays bounce, bend, and accumulate through a scene. It also introduces depth of field, making the renderer feel less like a technical exercise and more like a virtual camera.",
        image: "/images/graphics/pathtracer_extended/pathtracer_extended.jpg",
        smallImage:
          "/images/graphics/pathtracer_extended/pathtracer_extended-small.jpg",
        href: "/blog/learning-graphics/reflections-and-refractions/pdfs/pathtracer_extended.pdf",
        slug: "reflections-and-refractions",
        content: ReflectionsAndRefractionsContent,
        sections: chapterSections("learning-graphics", "reflections-and-refractions"),
      },
      {
        title: "Cloth Simulation",
        shortTitle: "Cloth",
        description:
          "Simulating fabric with spring-mass systems, gravity, and real-time collision detection",
        introductionText:
          "The final graphics chapter leaves static images behind and focuses on motion. I model cloth as a spring-mass system, then work through forces, constraints, and collisions so the fabric behaves believably over time. It closes the project by showing how graphics also depends on simulation, not just rendering.",
        image: "/images/graphics/cloth_simulator/cloth_simulator.jpg",
        smallImage: "/images/graphics/cloth_simulator/cloth_simulator-small.jpg",
        href: "/blog/learning-graphics/cloth-simulation/pdfs/cloth_simulator.pdf",
        slug: "cloth-simulation",
        content: ClothSimulationContent,
        sections: chapterSections("learning-graphics", "cloth-simulation"),
      },
    ],
  },
  {
    title: CATEGORY_META.cv.label,
    shortTitle: CATEGORY_META.cv.shortLabel,
    description:
      "A tour through vision work that starts with image processing and ends in neural nets, style transfer, and AR.",
    intro:
      "Eight chapters from classic image processing to learned models, style transfer, and AR.",
    introductionBlurb:
      "From filtering and geometry to neural models, style transfer, and augmented reality.",
    introduction:
      "This project follows a computer vision arc from foundational image operations to more complex geometric, learning-based, and interactive systems. The early chapters focus on filtering, frequency, alignment, and warping; the middle chapters introduce learned keypoints and neural style transfer; and the final chapters branch into augmented reality experiments that connect vision with rendering and real-time interaction.",
    image: "/blog/project-overviews/learning-vision-overview.jpeg",
    smallImage: "/blog/project-overviews/learning-vision-overview-small.jpeg",
    slug: "learning-vision",
    category: "cv",
    chapters: [
      {
        title: "Recolorizing",
        shortTitle: "Recolor",
        description:
          "Recolorizing the Prokudin-Gorskii Collection - turning B&W photos into RGB images",
        introductionText:
          "This chapter begins with alignment and reconstruction rather than learning or high-level semantics. I take historical glass-plate photographs and recover full-color images by reasoning carefully about channel offsets and image structure. It sets the tone for the rest of the project by showing how much can be achieved with simple vision techniques applied thoughtfully.",
        image: "/images/computer_vision/recolorizer/recolorizer.jpg",
        smallImage: "/images/computer_vision/recolorizer/recolorizer-small.jpg",
        href: "/blog/learning-vision/recolorizing/pdfs/recolorizer.pdf",
        slug: "recolorizing",
        content: RecolorizingContent,
        sections: chapterSections("learning-vision", "recolorizing"),
      },
      {
        title: "Filters & Frequency",
        shortTitle: "Filters",
        description:
          "Edge detection, blurring, sharpening, Gaussian & Laplacian stacks, and orapples!",
        introductionText:
          "After reconstructing images, this chapter digs into the language of filtering and frequency. I explore convolution, edges, sharpening, hybrid images, and multiscale blending to see how local image operations create dramatically different visual effects. It provides the mathematical and intuitive toolkit that many later vision methods build on.",
        image: "/images/computer_vision/filters/filters.jpg",
        smallImage: "/images/computer_vision/filters/filters-small.jpg",
        href: "/blog/learning-vision/filters-and-frequency/pdfs/filters.pdf",
        slug: "filters-and-frequency",
        content: FiltersAndFrequencyContent,
        sections: chapterSections("learning-vision", "filters-and-frequency"),
      },
      {
        title: "Morphing Faces",
        shortTitle: "Morph",
        description:
          "Interpolating from one face to another - smoothly blending both shape and color",
        introductionText:
          "This chapter shifts from filtering to geometry and correspondence. By defining facial landmarks and interpolating both shape and appearance, I build smooth transitions between people and expressions. It is an early example of how vision often depends on matching structure before transforming pixels.",
        image: "/images/computer_vision/face_morphing/face_morphing.jpg",
        smallImage:
          "/images/computer_vision/face_morphing/face_morphing-small.jpg",
        href: "/blog/learning-vision/morphing-faces/pdfs/face_morphing.pdf",
        slug: "morphing-faces",
        content: MorphingFacesContent,
        sections: chapterSections("learning-vision", "morphing-faces"),
      },
      {
        title: "Making Mosaics",
        shortTitle: "Mosaics",
        description:
          "Procedurally warping and stitching images together into seamless panoramic mosaics",
        introductionText:
          "Here the focus moves to projective geometry and image stitching. I estimate transformations between overlapping photographs, warp them into a common frame, and blend them into a panorama. The chapter connects local correspondences to large-scale scene reconstruction in a way that feels both visual and geometric.",
        image: "/images/computer_vision/mosaics/mosaics.png",
        smallImage: "/images/computer_vision/mosaics/mosaics-small.png",
        href: "/blog/learning-vision/making-mosaics/pdfs/mosaics.pdf",
        slug: "making-mosaics",
        content: MakingMosaicsContent,
        sections: chapterSections("learning-vision", "making-mosaics"),
      },
      {
        title: "Keypoint Detection",
        shortTitle: "Keypts",
        description:
          "Using PyTorch to train neural networks that detect and localize facial keypoints",
        introductionText:
          "This is the point where the project transitions from classical methods to learned models. Instead of designing every feature by hand, I train a neural network to infer meaningful facial landmarks directly from data. The chapter shows how machine learning changes the workflow while still relying on the same geometric intuition from earlier sections.",
        image: "/images/computer_vision/keypoint_detection/keypoint_detection.jpg",
        smallImage:
          "/images/computer_vision/keypoint_detection/keypoint_detection-small.jpg",
        href: "/blog/learning-vision/keypoint-detection/pdfs/keypoint_detection.pdf",
        slug: "keypoint-detection",
        content: KeypointDetectionContent,
        sections: chapterSections("learning-vision", "keypoint-detection"),
      },
      {
        title: "Style Transfer",
        shortTitle: "Style",
        description:
          "Reimplementing A Neural Algorithm of Artistic Style by Gatys et al. in PyTorch",
        introductionText:
          "With neural representations in place, this chapter explores how deep features can encode both content and style. I reimplement neural style transfer and use feature statistics to blend the structure of one image with the texture and appearance of another. It broadens the project from analysis into a more creative use of computer vision.",
        image: "/images/computer_vision/style/style.jpg",
        smallImage: "/images/computer_vision/style/style-small.jpg",
        href: "/blog/learning-vision/style-transfer/pdfs/style.pdf",
        slug: "style-transfer",
        content: StyleTransferContent,
        sections: chapterSections("learning-vision", "style-transfer"),
      },
      {
        title: "Teapot in a Stadium",
        shortTitle: "Teapot",
        description:
          "An iOS app that renders AR meshes inside Berkeley's Memorial Stadium in real-time",
        introductionText:
          "This chapter pushes vision into an interactive real-world setting. Instead of only processing saved images, I work with tracking, device sensing, and real-time rendering to anchor virtual content inside a physical space. It highlights how vision becomes much more demanding when perception and user experience have to run together live.",
        image: "/images/graphics/stadium_ar/stadium_ar.jpg",
        smallImage: "/images/graphics/stadium_ar/stadium_ar-small.jpg",
        href: "https://github.com/mcallisterdavid/oski-184-finalproj",
        slug: "teapot-in-a-stadium",
        content: TeapotInAStadiumContent,
        ctaLabel: "GitHub ↗",
        sections: chapterSections("learning-vision", "teapot-in-a-stadium"),
      },
      {
        title: "Alternate Reality",
        shortTitle: "AR",
        description:
          "Using linear algebra to project and render augmented reality overlays from scratch",
        introductionText:
          "The final vision chapter returns to fundamentals but in a more ambitious setting. I reconstruct projection behavior from tracked points and linear algebra so virtual objects can sit convincingly inside recorded footage. It serves as a capstone because it combines geometry, correspondence, calibration, and rendering into one pipeline.",
        image: "/images/computer_vision/ar/ar.jpg",
        smallImage: "/images/computer_vision/ar/ar-small.jpg",
        href: "/blog/learning-vision/alternate-reality/pdfs/style.pdf",
        slug: "alternate-reality",
        content: AlternateRealityContent,
        sections: chapterSections("learning-vision", "alternate-reality"),
      },
    ],
  },
];

export function getProjectOverviewPath(projectSlug: string) {
  return `/blog/${projectSlug}`;
}

export function getProjectBySlug(projectSlug: string) {
  return PROJECTS.find((project) => project.slug === projectSlug);
}

export function getChapterBySlug(project: Project, chapterSlug: string) {
  return project.chapters.find((chapter) => chapter.slug === chapterSlug);
}

export function findChapterBySlug(chapterSlug: string) {
  for (const project of PROJECTS) {
    const chapter = project.chapters.find((item) => item.slug === chapterSlug);
    if (chapter) {
      return { project, chapter };
    }
  }

  return null;
}

export function getPageBySlugs(projectSlug: string, chapterSlug?: string) {
  const project = getProjectBySlug(projectSlug);
  if (!project) return null;
  if (!chapterSlug) return { kind: "project", project } satisfies BlogPage;

  const chapter = getChapterBySlug(project, chapterSlug);
  if (!chapter) return null;

  return { kind: "chapter", project, chapter } satisfies BlogPage;
}

export function getPagePath(page: BlogPage) {
  if (page.kind === "end") return BLOG_END_PATH;
  if (page.kind === "project") return getProjectOverviewPath(page.project.slug);
  return `/blog/${page.project.slug}/${page.chapter.slug}`;
}

export function getPageTitle(page: BlogPage) {
  if (page.kind === "end") return "Thanks for reading";
  if (page.kind === "project") return page.project.title;
  const chIdx = page.project.chapters.findIndex((c) => c.slug === page.chapter.slug);
  return `${formatChapterOrdinal(Math.max(0, chIdx))} — ${page.chapter.title}`;
}

export function getReadingOrder(): BlogPage[] {
  return [
    ...PROJECTS.flatMap((project) => [
      { kind: "project", project } as const,
      ...project.chapters.map(
        (chapter) => ({ kind: "chapter", project, chapter }) as const,
      ),
    ]),
    { kind: "end" } as const,
  ];
}

export function getAdjacentPages(
  projectSlug: string,
  chapterSlug?: string,
): {
  current: BlogPage;
  previous: BlogPage | null;
  next: BlogPage | null;
} | null {
  const current = getPageBySlugs(projectSlug, chapterSlug);
  if (!current) return null;

  const readingOrder = getReadingOrder();
  const currentPath = getPagePath(current);
  const index = readingOrder.findIndex(
    (page) => getPagePath(page) === currentPath,
  );

  if (index === -1) return null;

  return {
    current,
    previous: index > 0 ? readingOrder[index - 1] : null,
    next: index < readingOrder.length - 1 ? readingOrder[index + 1] : null,
  };
}

/** Adjacent nav when viewing the terminal blog page */
export function getAdjacentForBlogEnd(): {
  previous: BlogPage | null;
  next: BlogPage | null;
} {
  const readingOrder = getReadingOrder();
  const last = readingOrder[readingOrder.length - 1];
  if (last?.kind !== "end") {
    return { previous: null, next: null };
  }
  const prevIdx = readingOrder.length - 2;
  return {
    previous: prevIdx >= 0 ? readingOrder[prevIdx]! : null,
    next: null,
  };
}
