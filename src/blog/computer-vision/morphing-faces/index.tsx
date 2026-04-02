import {
  BlogSection,
  BlogSubsection,
  BlogParagraph,
  BlogImage,
  BlogFigureGrid,
  BlogDivider,
  BlogCallout,
} from "@/components/blog";
import { BLOG_CATEGORY_ACCENTS } from "@/theme";

const B = "/blog/learning-vision/morphing-faces/images";

const ACCENT = BLOG_CATEGORY_ACCENTS.cv;

export function MorphingFacesContent() {
  return (
    <div>
      <BlogSection sectionId="overview" accent={ACCENT}>
        <BlogParagraph>
          In this project, I morph one face into another by simultaneously warping it into
          the target's shape while cross-dissolving the colors between the two images. I use
          this technique to compute the "mid-way" face — the average shape and color of two
          faces — and to produce a smooth morph sequence video. I also find the average face
          shape of an entire population, use it to generate caricatures of my own face, and
          as a bonus, create a music video morph.
        </BlogParagraph>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="defining-correspondences" accent={ACCENT}>
        <BlogParagraph>
          To morph faces, we must first warp them into a common average shape. This requires
          finding corresponding landmark points in both images, averaging their positions, then
          warping each image so that its landmarks align with those averaged locations.
        </BlogParagraph>
        <BlogParagraph>
          I built a GUI in matplotlib to pick matching points on each face. Delaunay
          triangulation then meshes those correspondences into a triangle grid — the building
          blocks for per-triangle affine warping.
        </BlogParagraph>
        <BlogFigureGrid
          figures={[
            { src: `${B}/page1_img1.jpeg`, label: "Emma's face" },
            { src: `${B}/page1_img2.jpeg`, label: "Juliette's face" },
          ]}
          caption="The two input images used to find an average face"
        />
        <BlogFigureGrid
          figures={[
            { src: `${B}/page1_img3.png`, label: "GUI — picking points on Emma" },
            { src: `${B}/page1_img4.png`, label: "GUI — picking points on Juliette" },
          ]}
          caption="Custom matplotlib GUI for selecting correspondences"
        />
        <BlogFigureGrid
          figures={[
            { src: `${B}/page2_img1.png`, label: "Delaunay triangulation — Emma" },
            { src: `${B}/page2_img2.png`, label: "Delaunay triangulation — Juliette" },
          ]}
          caption="Delaunay triangulation over the defined correspondences"
        />
        <BlogFigureGrid
          figures={[
            { src: `${B}/page2_img3.jpeg`, label: "triangulation detail — Emma" },
            { src: `${B}/page2_img4.jpeg`, label: "triangulation detail — Juliette" },
          ]}
          caption="Triangle mesh that will be used to warp each image"
        />
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="midway-face" accent={ACCENT}>
        <BlogParagraph>
          Using each image's triangle mesh, I warp both faces into the average geometry —
          the mean of all corresponding point locations. Each triangle in the source image
          is mapped to its counterpart in the average shape via an affine transform. Then
          the two warped images are color-averaged to produce the mid-way face.
        </BlogParagraph>
        <BlogFigureGrid
          figures={[
            { src: `${B}/page2_img5.jpeg`, label: "Emma — before warp" },
            { src: `${B}/page2_img6.jpeg`, label: "Juliette — before warp" },
          ]}
          caption="Input faces before warping"
        />
        <BlogFigureGrid
          figures={[
            { src: `${B}/page2_img7.jpeg`, label: "Emma — warped to average shape" },
            { src: `${B}/page2_img8.jpeg`, label: "Juliette — warped to average shape" },
          ]}
          caption="Both faces warped into the average geometry"
        />
        <BlogFigureGrid
          figures={[
            { src: `${B}/page3_img1.jpeg`, label: "Emma — warped (average shape)" },
            { src: `${B}/page3_img2.jpeg`, label: "Juliette — warped (average shape)" },
          ]}
          caption="Warped results confirming average geometry alignment"
        />
        <BlogFigureGrid
          figures={[
            { src: `${B}/page3_img3.jpeg`, label: "mid-way face" },
          ]}
          columns={2}
          caption="The final mid-way face: mean shape and mean color of both inputs"
        />
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="morph-sequence" accent={ACCENT}>
        <BlogParagraph>
          By interpolating the warp fraction and color mix from 0 to 1, a smooth video
          transition is produced. Both shape and appearance change continuously from one
          face to the other. This interpolated output is the Morph Sequence.
        </BlogParagraph>
        <BlogCallout accent={ACCENT}>
          Bilinear sampling left visible smearing artifacts when applied to low-resolution
          images. To handle this, I implemented nearest-neighbor sampling as a fallback,
          giving cleaner results on low-res inputs.
        </BlogCallout>
        <BlogFigureGrid
          figures={[
            { src: `${B}/page7_img3.jpeg`, label: "before — bilinear sampling (low-res)" },
            { src: `${B}/page7_img4.jpeg`, label: "after — bilinear sampling (low-res)" },
          ]}
          caption="Bilinear sampling produces artifacts on low-resolution images"
        />
        <BlogFigureGrid
          figures={[
            { src: `${B}/page7_img5.jpeg`, label: "before — nearest neighbors (low-res)" },
            { src: `${B}/page7_img6.jpeg`, label: "after — nearest neighbors (low-res)" },
          ]}
          caption="Nearest-neighbor sampling gives clean results on low-resolution inputs"
        />
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="mean-face" accent={ACCENT}>
        <BlogParagraph>
          I sourced data from a Kaggle dataset of celebrity faces with labeled landmark
          points. Each face was individually warped into the common average shape, then
          all warped images were averaged together to compute the mean celebrity face.
        </BlogParagraph>
        <BlogFigureGrid
          figures={[
            { src: `${B}/page7_img8.png`, label: "average celebrity" },
            { src: `${B}/page8_img2.png`, label: "average celebrity with geometry shown" },
          ]}
          caption="The computed average celebrity face"
        />
        <BlogParagraph>
          Here I warped my face into the geometry of the average celebrity. The dataset
          contains only greyscale images, but I wrote the algorithm to support full color.
          As proof, here is my face warped into the average celebrity's geometry in full color:
        </BlogParagraph>
        <BlogFigureGrid
          figures={[
            { src: `${B}/page8_img5.png`, label: "my face warped into avg celebrity geometry (color)" },
          ]}
          columns={2}
          caption="Full-color warp of my face into the average celebrity's geometry"
        />
        <BlogParagraph>
          Here I reversed the direction — warping the average celebrity into the geometry
          of my face:
        </BlogParagraph>
        <BlogFigureGrid
          figures={[
            { src: `${B}/page9_img3.png`, label: "average celebrity warped into my face's geometry" },
          ]}
          columns={2}
          caption="Average celebrity warped into the author's geometry"
        />
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="extrapolating-mean" accent={ACCENT}>
        <BlogParagraph>
          Using the difference between my face and the average celebrity, I can
          overexaggerate the features that distinguish me from the mean — producing a
          caricature. An alpha of 0 gives the average celebrity, alpha = 1 gives my face,
          and alpha above 1 pushes characteristics further beyond in the direction of my
          face's deviation from the mean.
        </BlogParagraph>
        <BlogCallout accent={ACCENT}>
          "It seems like I'm happier than the average celebrity!"
        </BlogCallout>
        <BlogParagraph>
          The dataset was in greyscale, so to also extrapolate by color my face must first
          be converted to greyscale. Colors are then mixed proportionally to alpha so the
          result is exaggerated in both shape and color.
        </BlogParagraph>
        <BlogFigureGrid
          figures={[
            { src: `${B}/page11_img7.png`, label: "color extrapolation" },
            { src: `${B}/page11_img8.jpeg`, label: "color extrapolation" },
          ]}
          caption="Shape and color both extrapolated from the mean"
        />
        <BlogParagraph>
          Unfortunately, the dataset was very low resolution and had few correspondences,
          making the results underwhelming even though the algorithm can produce beautiful
          morphs on higher-quality inputs (as seen in the morph sequence GIF). To better
          demonstrate the technique, I upscaled my face image and used estimated average
          features from the average celebrity image to provide denser correspondences.
          Here are the results:
        </BlogParagraph>
        <BlogFigureGrid
          figures={[
            { src: `${B}/page12_img1.png`, label: "α = 0" },
            { src: `${B}/page12_img2.jpeg`, label: "α = 0.5" },
            { src: `${B}/page12_img3.jpeg`, label: "α = 1.0" },
            { src: `${B}/page12_img4.jpeg`, label: "α = 1.5" },
          ]}
          caption="High-res upscaled extrapolation — α = 0 to 1.5"
        />
        <BlogFigureGrid
          figures={[
            { src: `${B}/page12_img5.jpeg`, label: "α = 2.0" },
            { src: `${B}/page12_img6.jpeg`, label: "α = 2.5" },
            { src: `${B}/page12_img7.jpeg`, label: "α = 3.0" },
            { src: `${B}/page12_img8.jpeg`, label: "α = 3.5" },
          ]}
          caption="High-res upscaled extrapolation — α = 2.0 to 3.5"
        />
        <BlogFigureGrid
          figures={[
            { src: `${B}/page13_img1.jpeg`, label: "α = 3.0" },
            { src: `${B}/page13_img2.jpeg`, label: "α = 3.5" },
          ]}
          caption="Final high-alpha results"
        />
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="bells-and-whistles" accent={ACCENT}>
        <BlogParagraph>
          As a bonus, I created a music video morph sequence using the face morphing
          pipeline developed throughout this project.
        </BlogParagraph>
      </BlogSection>
    </div>
  );
}
