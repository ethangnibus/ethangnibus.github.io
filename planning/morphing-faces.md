# Task: Update `morphing-faces` blog post to be 1:1 with the PDF

## Context

You are updating the blog post for **Morphing Faces** to be a complete, 1:1 match with the original PDF write-up.

**Files involved:**
- PDF: `public/blog/computer-vision/morphing-faces/pdfs/face_morphing.pdf`
- Blog post source: `src/blog/computer-vision/morphing-faces/index.tsx`
- Images base path: `/blog/computer-vision/morphing-faces/images/` (used as the `B` constant)

## What "1:1" means

- Every **section** from the PDF must appear with equivalent content
- Every **image** from the PDF must be present — use the extracted images listed below
- Every **paragraph** should appear (lightly edited for blog voice is fine, but nothing omitted)
- Every **result, table, data point, comparison** mentioned should be included
- **Section order** must match the PDF
- "N/A" and "I did not complete this" sections should still appear as brief notes

## Component system (`@/components/blog`)

```tsx
BlogSection       // title: string, accent: string, children
BlogSubsection    // title: string, children
BlogParagraph     // children (text)
BlogImage         // src, alt, caption?
BlogFigureGrid    // figures: {src,label,alt?}[], columns?: 2|3|4, caption?
BlogDivider       // (no props) — place between major sections
BlogCallout       // accent: string, children — for key findings / formulas
```

- The `const B = "/blog/morphing-faces/images"` line must stay exactly as-is
- All image srcs: `` `${B}/filename.ext` ``
- Accent color for this project: `#8B1A2B`
- Exported function name must remain: `MorphingFacesContent`

## Available images (35 total)

Filenames follow the pattern `page{N}_img{M}.ext` — N is the PDF page, M is image index on that page.
Cross-reference with the PDF text below to determine which image belongs in each section.

```
page11_img7.png
page11_img8.jpeg
page12_img1.png
page12_img2.jpeg
page12_img3.jpeg
page12_img4.jpeg
page12_img5.jpeg
page12_img6.jpeg
page12_img7.jpeg
page12_img8.jpeg
page13_img1.jpeg
page13_img2.jpeg
page1_img1.jpeg
page1_img2.jpeg
page1_img3.png
page1_img4.png
page2_img1.png
page2_img2.png
page2_img3.jpeg
page2_img4.jpeg
page2_img5.jpeg
page2_img6.jpeg
page2_img7.jpeg
page2_img8.jpeg
page3_img1.jpeg
page3_img2.jpeg
page3_img3.jpeg
page7_img3.jpeg
page7_img4.jpeg
page7_img5.jpeg
page7_img6.jpeg
page7_img8.png
page8_img2.png
page8_img5.png
page9_img3.png
```

## Full PDF text (all pages)

```
=== PAGE 1 ===
10/12/22, 5:47 PM
CS 194-26 Project 3
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/ﬁles/proj3/cs194-26-ahn/
1/13
CS 194-26: Image Manipulation and Computational Photography, Fall 2022
Project 3: Face Morphing
Ethan Gnibus
Overview
In this project, I will morph Image1 into Image2 by simultaneously warping Image1 into the shape of Image2 while cross-dissolving the
colors from Image1 into Image2. I will use this technique to compute the "Mid-way" face, or the average shape and colors of two faces.
Additionally, I will make a video of a gradual warp from one face to another. I will also ênd the average face shape for an entire
population use it to show more possibilities of warping. I will then use this population mean to make a caricature of my face. I've also
decided to make a music video at the end.
Part 1. Defining Correspondences
To morph faces, we must êrst warp them into an average shape. Doing this requires us to ênd corresponding points in both images,
averaging the location of those corresponding points, then warping our images so that their corresponding points overlap with the
average location. 
The êrst step in this process involves deêning these correspondences, which entails creating a GUI to pick points on both images, then
making a triangular mesh between points. 
Below are the two input images that I used to ênd an average face
Emma's face
Juliette's face
I made a GUI using matplotlib in Python to choose corresponding points

=== PAGE 2 ===
10/12/22, 5:47 PM
CS 194-26 Project 3
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/ﬁles/proj3/cs194-26-ahn/
2/13
GUI to pick points on Emma's face
GUI to pick points on Juliette's face
After deêning suìcient correspondences, I made a triangle mesh over them using Delaunay triangulation. This will later be used to
morph the shape of each image into the shape of the average between both images. We will go over this process in the next part.
Delaunay triangulation over Emma's correspondences Delaunay triangulation over Juliette's correspondences
Part 2. Computing the "Mid-way Face"
Next I used each input image's triangle mesh to warp each face into the shape of the average face.
Emma's face before warp
Juliette's face before warp

=== PAGE 3 ===
10/12/22, 5:47 PM
CS 194-26 Project 3
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/ﬁles/proj3/cs194-26-ahn/
3/13
Emma's face warped into the average shape of both faces Juliette's face warped into the average shape of both faces
After this, I averaged the colors in the warped images so that the output image is the mean of the input images, both in shape and
color.
Mean face
Part 3. The Morph Sequence
By interpolating the fraction by which we warp correspondences and mix colors from the êrst image to the other, we can create a
smooth transition between images! We will refer to this transition as the Morph Sequence.
This Morph Sequence can be found here.
Part 4. The "Mean face" of a population
I got my data from https://www.kaggle.com/datasets/drgilermo/face-images-with-marked-landmark-points?resource=download

=== PAGE 4 ===
10/12/22, 5:47 PM
CS 194-26 Project 3
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/ﬁles/proj3/cs194-26-ahn/
4/13
Face 1
Face 1 morphed into the average shape
Face 1
Face 1 morphed into the average shape
Face 1
Face 1 morphed into the average shape

=== PAGE 5 ===
10/12/22, 5:47 PM
CS 194-26 Project 3
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/ﬁles/proj3/cs194-26-ahn/
5/13
Face 1
Face 1 morphed into the average shape
Face 1
Face 1 morphed into the average shape
Face 1
Face 1 morphed into the average shape

=== PAGE 6 ===
10/12/22, 5:47 PM
CS 194-26 Project 3
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/ﬁles/proj3/cs194-26-ahn/
6/13
Face 1
Face 1 morphed into the average shape
Face 1
Face 1 morphed into the average shape
Face 1
Face 1 morphed into the average shape

=== PAGE 7 ===
10/12/22, 5:47 PM
CS 194-26 Project 3
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/ﬁles/proj3/cs194-26-ahn/
7/13
Face 1
Face 1 morphed into the average shape
When warping my examples, I noticed that bilinear sampling left weird artifacts when working with low-resolution images:
Before bilinear sampling on low-res image
After bilinear sampling on low-res image
Because of this, I chose to also implement nearest neighbors sampling so that we could get good results on low-resolution images too!
Before nearest neighbors on low-res image
After nearest neighbors on low-res image
I morphed all the faces in the dataset together to compute the average celebrity:

=== PAGE 8 ===
10/12/22, 5:47 PM
CS 194-26 Project 3
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/ﬁles/proj3/cs194-26-ahn/
8/13
Average Celebrity
Average Celebrity with average geometry shown
Here I warped my face into the geometry of the average celebrity:
My Face
My face warped into the average celebrity's geometry
The dataset only had greyscale images, but I wrote my algorithm to work for full color images. As proof, here's my face warped into
the average celebrity's geometry in full color:
My Face in color
My face warped into the average celebrity's geometry
Here I warped the average celebrity into the geometry of my face:

=== PAGE 9 ===
10/12/22, 5:47 PM
CS 194-26 Project 3
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/ﬁles/proj3/cs194-26-ahn/
9/13
Average Celebrity
Average celebrity warped into my face's geometry
Part 5. Extrapolating from the mean
Using the diéerence between my face and the average celebrity's face, I can overexaggerate the diéerence between my features and
that of a celebrity. This will result in a "larger than life" image that will intensify characteristics of celebrities that I don't have. Here's an
example below.
alpha = 0
alpha = 0.5
alpha = 1.0
alpha = 1.5

=== PAGE 10 ===
10/12/22, 5:47 PM
CS 194-26 Project 3
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/ﬁles/proj3/cs194-26-ahn/
10/13
alpha = 2.0
alpha = 2.5
alpha = 3.0
alpha = 3.5
As you can see, it seems like I'm happier than the average celebrity!
The dataset I used was in greyscale, so I have to convert my face to greyscale if I also want to extrapolate by color. Here I mix colors by
a fraction proportional to alpha. This makes it so my face is exaggerated in both shape and color!
alpha = 0
alpha = 0.5

=== PAGE 11 ===
10/12/22, 5:47 PM
CS 194-26 Project 3
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/ﬁles/proj3/cs194-26-ahn/
11/13
alpha = 1.0
alpha = 1.5
alpha = 2.0
alpha = 2.5
alpha = 3.0
alpha = 3.5
Unfortunately, the dataset I chose was very low resolution and lacked a high number of correspondences. This made it so my results
were underwhelming even though my algorithms can produce beautiful morphed images as seen in the GIF above. Fortunately, the
average celebrity picture gives me lots of data to use to predict average features of the dataset. I decided to upscale the image of my
face and use estimated average features to show how my face would looked warped into the shape of the average celebrity with more
correspondences. Here are my results:

=== PAGE 12 ===
10/12/22, 5:47 PM
CS 194-26 Project 3
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/ﬁles/proj3/cs194-26-ahn/
12/13
alpha = 0
alpha = 0.5
alpha = 1.0
alpha = 1.5
alpha = 2.0
alpha = 2.5

=== PAGE 13 ===
10/12/22, 5:47 PM
CS 194-26 Project 3
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/ﬁles/proj3/cs194-26-ahn/
13/13
alpha = 3.0
alpha = 3.5
Part 6. Bells and Whistles
I made a music video that can be found here
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/êles/proj3/cs194-26-ahn/

```

## Current blog post (partial — needs to be expanded to full 1:1 coverage)

```tsx
import {
  BlogSection,
  BlogSubsection,
  BlogParagraph,
  BlogImage,
  BlogFigureGrid,
  BlogDivider,
  BlogCallout,
} from "@/components/blog";

const B = "/blog/morphing-faces/images";
const ACCENT = "#8B1A2B";

export function MorphingFacesContent() {
  return (
    <div>
      <BlogSection title="Overview" accent={ACCENT}>
        <BlogParagraph>
          Face morphing blends two faces by simultaneously warping their geometry and
          cross-dissolving their colors. The result is a smooth, continuous transformation
          from one person's face to another's — both in shape and appearance. This project
          builds the full pipeline: correspondence selection, Delaunay triangulation,
          affine warping, and color interpolation.
        </BlogParagraph>
      </BlogSection>

      <BlogDivider />

      <BlogSection title="Part 1 — Defining Correspondences" accent={ACCENT}>
        <BlogParagraph>
          To warp one face into another's shape, corresponding landmarks must first be identified
          on both images. A custom matplotlib GUI was built to pick matching points on each face.
          Delaunay triangulation then meshes these points into triangles — the building blocks for
          warping.
        </BlogParagraph>
        <BlogFigureGrid
          figures={[
            { src: `${B}/page1_img1.jpeg`, label: "input: Emma" },
            { src: `${B}/page1_img2.jpeg`, label: "input: Juliette" },
          ]}
          caption="Two input faces used throughout the project"
        />
        <BlogFigureGrid
          figures={[
            { src: `${B}/page1_img3.png`, label: "triangulation on Emma" },
            { src: `${B}/page1_img4.png`, label: "triangulation on Juliette" },
          ]}
          caption="Delaunay triangulation over the defined correspondences"
        />
      </BlogSection>

      <BlogDivider />

      <BlogSection title="Part 2 — Computing the Mid-way Face" accent={ACCENT}>
        <BlogParagraph>
          The "mid-way face" is computed by averaging the correspondence locations from both
          faces, warping each face into that average geometry using affine transforms per
          triangle, then blending the two warped images at equal weight.
        </BlogParagraph>
        <BlogFigureGrid
          figures={[
            { src: `${B}/page2_img5.jpeg`, label: "Emma — original" },
            { src: `${B}/page2_img6.jpeg`, label: "Juliette — original" },
            { src: `${B}/page2_img7.jpeg`, label: "Emma — warped to avg shape" },
            { src: `${B}/page2_img8.jpeg`, label: "Juliette — warped to avg shape" },
          ]}
          caption="Warping both faces into their average geometry"
        />
        <BlogFigureGrid
          figures={[
            { src: `${B}/page3_img1.jpeg`, label: "mid-way face (avg shape + avg color)" },
          ]}
          columns={2}
          caption="The final mid-way face: mean shape and mean color of both inputs"
        />
      </BlogSection>

      <BlogDivider />

      <BlogSection title="Part 3 — Morph Sequence" accent={ACCENT}>
        <BlogParagraph>
          By varying the warp fraction and color mix from 0 to 1, a smooth video morph is
          produced. Both the shape and appearance interpolate continuously between the two faces.
        </BlogParagraph>
        <BlogCallout accent={ACCENT}>
          Bilinear sampling caused artifacts on low-resolution images — visible smearing at
          triangle boundaries. Nearest-neighbor sampling was added as a fallback for low-res
          inputs, giving cleaner results.
        </BlogCallout>
      </BlogSection>

      <BlogDivider />

      <BlogSection title="Part 4 — Mean Face of a Population" accent={ACCENT}>
        <BlogParagraph>
          Using the Kaggle facial landmark dataset (grayscale celebrity faces with labeled keypoints),
          all faces were morphed into a common average shape to compute the mean face of the population.
        </BlogParagraph>
        <BlogFigureGrid
          figures={[
            { src: `${B}/page7_img3.jpeg`, label: "sample face" },
            { src: `${B}/page7_img4.jpeg`, label: "morphed to average shape" },
            { src: `${B}/page7_img5.jpeg`, label: "another sample" },
            { src: `${B}/page7_img6.jpeg`, label: "morphed to average shape" },
          ]}
          caption="Individual faces warped into the population's average geometry"
        />
        <BlogFigureGrid
          figures={[
            { src: `${B}/page7_img8.png`, label: "average celebrity face" },
            { src: `${B}/page8_img2.png`, label: "Ethan warped to avg celebrity geometry" },
          ]}
          caption="The computed average celebrity face, and the author's face warped into that geometry"
        />
      </BlogSection>

      <BlogDivider />

      <BlogSection title="Part 5 — Extrapolating from the Mean" accent={ACCENT}>
        <BlogParagraph>
          By computing the difference between two faces and scaling it, features can be
          exaggerated beyond either source face. An alpha value of 0 gives the average face,
          alpha = 1 gives the original face, and alpha &gt; 1 produces an exaggerated caricature.
        </BlogParagraph>
        <BlogCallout accent={ACCENT}>
          "It seems like I'm happier than the average celebrity!"
        </BlogCallout>
        <BlogFigureGrid
          figures={[
            { src: `${B}/page9_img3.png`, label: "α = 0 (average celebrity)" },
            { src: `${B}/page8_img5.png`, label: "α = 0.5" },
          ]}
          caption="Extrapolation from the population mean toward the author's face"
        />
        <BlogFigureGrid
          figures={[
            { src: `${B}/page11_img7.png`, label: "high-res result — warped into avg geometry" },
          ]}
          columns={2}
          caption="Using estimated average features with higher resolution for better correspondences"
        />
      </BlogSection>
    </div>
  );
}

```

## Output

Return the complete, updated `src/blog/computer-vision/morphing-faces/index.tsx`. No truncation — include every section.
