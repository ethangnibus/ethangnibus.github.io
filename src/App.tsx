import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectCarousel, type CarouselSlide } from "@/components/ProjectCarousel";
import { SectionHeader } from "@/components/SectionHeader";
import { ExperienceSection } from "@/components/ExperienceSection";
import { Footer } from "@/components/Footer";

const CV_SLIDES: CarouselSlide[] = [
  {
    title: "Recolorizing the Prokudin-Gorskii Collection",
    description: "Turning B&W photos into RGB images",
    image: "/images/computer_vision/recolorizer/recolorizer.jpg",
    smallImage: "/images/computer_vision/recolorizer/recolorizer-small.jpg",
    ctaText: "Show Me",
    ctaHref: "/pdfs/computer_vision/recolorizer.pdf",
    interval: 8000,
  },
  {
    title: "Playing with Filters and Frequency",
    description:
      "Exploring edge detection, blurring, sharpening, Gaussian/Laplacian stacks, and orapples!",
    image: "/images/computer_vision/filters/filters.jpg",
    smallImage: "/images/computer_vision/filters/filters-small.jpg",
    ctaText: "Show Me",
    ctaHref: "/pdfs/computer_vision/filters.pdf",
  },
  {
    title: "Morphing Faces",
    description: "Interpolating from one face to another in both shape and color",
    image: "/images/computer_vision/face_morphing/face_morphing.jpg",
    smallImage: "/images/computer_vision/face_morphing/face_morphing-small.jpg",
    ctaText: "Show Me",
    ctaHref: "/pdfs/computer_vision/face_morphing.pdf",
  },
  {
    title: "Making Mosaics",
    description: "Procedurally stitching images together into panoramas",
    image: "/images/computer_vision/mosaics/mosaics.png",
    smallImage: "/images/computer_vision/mosaics/mosaics-small.png",
    ctaText: "Show Me",
    ctaHref: "/pdfs/computer_vision/mosaics.pdf",
  },
  {
    title: "Keypoint Detection",
    description: "Using PyTorch to automate feature extraction",
    image: "/images/computer_vision/keypoint_detection/keypoint_detection.jpg",
    smallImage:
      "/images/computer_vision/keypoint_detection/keypoint_detection-small.jpg",
    ctaText: "Show Me",
    ctaHref: "/pdfs/computer_vision/keypoint_detection.pdf",
  },
  {
    title: "Style Transfer",
    description:
      "Reimplementing A Neural Algorithm of Artistic Style by Gatys et al. in PyTorch",
    image: "/images/computer_vision/style/style.jpg",
    smallImage: "/images/computer_vision/style/style-small.jpg",
    ctaText: "Show Me",
    ctaHref: "/pdfs/computer_vision/style.pdf",
  },
  {
    title: "Teapot in a Stadium",
    description:
      "An iOS app that renders AR meshes in Berkeley's Memorial Stadium in real-time",
    image: "/images/graphics/stadium_ar/stadium_ar.jpg",
    smallImage: "/images/graphics/stadium_ar/stadium_ar-small.jpg",
    ctaText: "Show Me",
    ctaHref: "https://github.com/mcallisterdavid/oski-184-finalproj",
  },
  {
    title: "Simple Alternate Reality",
    description: "Using linear algebra to draw real-time AR from scratch",
    image: "/images/computer_vision/ar/ar.jpg",
    smallImage: "/images/computer_vision/ar/ar-small.jpg",
    ctaText: "Show Me",
    ctaHref: "/pdfs/computer_vision/style.pdf",
  },
];

const GRAPHICS_SLIDES: CarouselSlide[] = [
  {
    title: "Rasterizer",
    description:
      "Sampling, drawing triangles, and anti-aliasing to convert SVGs to rasters",
    image: "/images/graphics/rasterizer/rasterizer.jpg",
    smallImage: "/images/graphics/rasterizer/rasterizer-small.jpg",
    ctaText: "Show Me",
    ctaHref: "/pdfs/graphics/rasterizer.pdf",
    interval: 8000,
  },
  {
    title: "Mesh Editor",
    description:
      "Using points to make splines, splines to create meshes, and meshes to create more meshes",
    image: "/images/graphics/mesh_editor/mesh_editor.jpg",
    smallImage: "/images/graphics/mesh_editor/mesh_editor-small.jpg",
    ctaText: "Show Me",
    ctaHref: "/pdfs/graphics/mesh_editor.pdf",
  },
  {
    title: "Pathtracer",
    description:
      "Simulating the world by recreating physically based models of light… fun stuff",
    image: "/images/graphics/pathtracer/pathtracer.jpg",
    smallImage: "/images/graphics/pathtracer/pathtracer-small.jpg",
    ctaText: "Show Me",
    ctaHref: "/pdfs/graphics/pathtracer.pdf",
  },
  {
    title: "Pathtracing EVERYTHING",
    description: "Glass? Mirrors? Focal Length? You name it.",
    image: "/images/graphics/pathtracer_extended/pathtracer_extended.jpg",
    smallImage:
      "/images/graphics/pathtracer_extended/pathtracer_extended-small.jpg",
    ctaText: "Show Me",
    ctaHref: "/pdfs/graphics/pathtracer_extended.pdf",
  },
  {
    title: "Cloth Simulation",
    description: "Gravity, cloth, collisions… You get the rest",
    image: "/images/graphics/cloth_simulator/cloth_simulator.jpg",
    smallImage: "/images/graphics/cloth_simulator/cloth_simulator-small.jpg",
    ctaText: "Show Me",
    ctaHref: "/pdfs/graphics/cloth_simulator.pdf",
  },
];

export default function App() {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Global analog film grain — fixed overlay, sits above everything */}
      <div
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='256' height='256' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "220px 220px",
          opacity: 0.042,
        }}
      />
      {/* Navbar floats above scroll content with high z-index */}
      <div className="absolute top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <Navbar />
        </div>
      </div>
      {/* Scroll container fills full space — content scrolls under the navbar */}
      <div id="scroll-container" className="absolute inset-0 overflow-y-auto">
      {/* Grid background div - scrolls with content, sits above the hero picture */}
      {/* py-3 matches the navbar's mt-3/mb-3 margins; h-[58px] matches the navbar pill height (h-14 56px + 2px top/bottom border) */}
      <div className="portal-grid-white py-3">
        <div className="h-[58px]" />
      </div>
      <HeroSection />
      <AboutSection />

      {/* Projects */}
      <div id="projects">
        <SectionHeader
          title="Computer Vision"
          subtitle="A selection of my favorite projects"
          align="left"
          bg="stripes"
        />
        <ProjectCarousel slides={CV_SLIDES} />

        <SectionHeader
          title="Computer Graphics"
          subtitle="From rasterizers to path tracers"
          align="right"
          bg="grid-white"
        />
        <ProjectCarousel slides={GRAPHICS_SLIDES} />
      </div>

      <ExperienceSection />
      <Footer />
      </div>
    </div>
  );
}
