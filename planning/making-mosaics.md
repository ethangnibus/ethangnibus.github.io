# Task: Update `making-mosaics` blog post to be 1:1 with the PDF

## Context

You are updating the blog post for **Making Mosaics** to be a complete, 1:1 match with the original PDF write-up.

**Files involved:**
- PDF: `public/blog/computer-vision/making-mosaics/pdfs/mosaics.pdf`
- Blog post source: `src/blog/computer-vision/making-mosaics/index.tsx`
- Images base path: `/blog/computer-vision/making-mosaics/images/` (used as the `B` constant)

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

- The `const B = "/blog/making-mosaics/images"` line must stay exactly as-is
- All image srcs: `` `${B}/filename.ext` ``
- Accent color for this project: `#8B1A2B`
- Exported function name must remain: `MakingMosaicsContent`

## Available images (43 total)

Filenames follow the pattern `page{N}_img{M}.ext` — N is the PDF page, M is image index on that page.
Cross-reference with the PDF text below to determine which image belongs in each section.

```
page10_img1.png
page10_img2.png
page1_img1.png
page1_img2.png
page2_img1.png
page2_img2.png
page2_img3.png
page2_img4.png
page2_img5.png
page3_img1.png
page3_img2.png
page3_img3.png
page3_img4.png
page3_img5.png
page3_img6.png
page3_img7.png
page4_img1.png
page4_img2.png
page4_img3.png
page4_img4.png
page4_img5.png
page5_img1.png
page5_img2.png
page5_img3.png
page5_img4.png
page6_img1.png
page6_img2.png
page6_img3.png
page6_img4.png
page7_img1.png
page7_img2.png
page7_img3.png
page7_img4.png
page8_img1.png
page8_img2.png
page8_img3.png
page8_img4.png
page9_img1.png
page9_img2.png
page9_img3.png
page9_img4.png
page9_img5.png
page9_img6.png
```

## Full PDF text (all pages)

```
=== PAGE 1 ===
11/18/22, 1:39 AM
CS 194-26 Project 4
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj4B/cs194-26-ahn/
1/10
CS 194-26: Image Manipulation and Computational Photography, Fall 2022
Project 4: [Auto]Stitching Photo Mosaics
Ethan Gnibus
Part 1: IMAGE WARPING and MOSAICING
Overview
In this project I will take images collected with my phone and warp them together
into a seamless mosaic. To do this, I must first take
pictures, define correspondences
inside of each image, use these correspondences to recover homographies, then use these
homographies to warp the image so that I could turn them into mosaics. I will
create both rectified images and mosaics.
Part 1.1: Shoot the Pictures
I chose to shoot two pictures outside of FSM in Berkeley.
These are what the pictures look like with no editing:
FSM 1
FSM 2
Part 1.2: Recover Homographies
To make a mosaic between both images, I chose to forward warp from FSM 1
to FSM 2. This involved me finding the matrix H, such
that if we have
a point p on FSM 1 and a point p' on FSM 2, then H @ p ≈ p'. Doing this
required me to make a GUI to select 4 or more
correspondences on both images.
I ended up choosing 19 correspondences and used least squares to approximate
the best H for the
homography. Below is the GUI I made.

=== PAGE 2 ===
11/18/22, 1:39 AM
CS 194-26 Project 4
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj4B/cs194-26-ahn/
2/10
GUI
Part 1.3: Warp the Images
Now that I have a homography, I can warp my original image into the homography!
FSM 1
FSM 1 Warped
Part 1.4: Image Rectification
Using this warping technique, we can now rectify images so that we can change
the perspective of the camera looking at them!
Pattern on my table
Rectified pattern on my table

=== PAGE 3 ===
11/18/22, 1:39 AM
CS 194-26 Project 4
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj4B/cs194-26-ahn/
3/10
Pattern on my walkway
Rectified pattern on my walkway
Pattern on my bathroom floor
Rectified pattern on my bathroom floor
My back wall
My back wall rectified to face front
If we crop the rectified image, we can see the back wall facing towards us
My back wall rectified and cropped to face front
Part 1.5: Blend the images into a mosaic
Now that we can rectify images, we can warp one image then translate
the other to overlap with the first. By
Using a laplacian
pyramid, we can blend both of these
images to make a smooth mosaic

=== PAGE 4 ===
11/18/22, 1:39 AM
CS 194-26 Project 4
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj4B/cs194-26-ahn/
4/10
FSM 1
FSM 2
Warped FSM 1
FSM 2
Mosaic
Part 1.6: What I learned
In this project, the coolest thing I learned is how to compute homographies!
Using homographies, I can warp the perspective of a
photo so that I could view
it at different angles. My favorite example of this is when I warped the back
wall of a historic house in
Berkeley so that you could view it from the front.
I think this has super cool use cases and I'm excited to use it more in the
future.
Part 1.7: Bells and Whistles
I did not complete any bells and whistles.
Part 2: FEATURE MATCHING for AUTOSTITCHING
Overview
In this project I extend the previous part of the project by automatically
finding correspondence points on the input images. This
entails implementing
automatic corner detection, finding feature descriptors for those corners,
matching corners across images using

=== PAGE 5 ===
11/18/22, 1:39 AM
CS 194-26 Project 4
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj4B/cs194-26-ahn/
5/10
these feature descriptors, using
RANSAC to compute the homography between images, then passing the
result into my previous code
to get a mosaic.
Part 2.1: Detecting corner features in an image
Here I implement a single-scale Harris Interest Point Detector without
sub-pixel accuracy. Below I display a figure of the Harris corners
overlaid on the input images.
FSM 1
FSM 2
FSM 1 with points
FSM 2 with points
Part 2.2: Extracting a Feature Descriptor for each feature point
Here I impement Adaptive Non-Maximal Suppression to extract feature descriptors
for each feature point. Below I include the chosen
corners overlaid on the input images.
FSM 1
FSM 2

=== PAGE 6 ===
11/18/22, 1:39 AM
CS 194-26 Project 4
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj4B/cs194-26-ahn/
6/10
FSM 1 with all points
FSM 2 with all points
FSM 1 with chosen points
FSM 2 with chosen points
Here I implement feature descriptor extraction with no rotation invariance
nor wavelet transform. To do this, I extract 8x8 patches
sampled from larger
40x40 windows. I bias/gain-normalize the descriptors to improve accuracy.
This is what one looks like:
40x40 patch
8x8 patch
Bias/gain normalized 8x8 patch
Part 2.3: Matching these feature descriptors between two images
Here I implement feature matching. To do this, I used nearest neighbors to
find corresponding points on both images. For each point
in Image A, I
found it's first and second nearest neigbor points in Image B, 1-NN and
2-NN respectively. Next I calculated the Lowe
Ratio (1-NN / 2-NN).
I then filtered out points that had high Lowe Ratios by discarding them
if they are above a certain threshold of my
choosing. The reasoning behind
this is that if two points on Image B have similar Squared-Sums of Differences
with a point on Image
A, then it's more likely that both aren't matches to
the point on Image A. Below I show the result of this process, with FSM 1 acting
as
Image A and FSM 2 acting as Image B:

=== PAGE 7 ===
11/18/22, 1:39 AM
CS 194-26 Project 4
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj4B/cs194-26-ahn/
7/10
Matched points on FSM 1
Matched points on FSM 2
Part 2.4: Use a robust method (RANSAC) to compute a homography
In this part I implement RANSAC to compute a homography between my images.
In the next part, I will feed this homography into my
code from Part 1 to
produce a mosaic!
4 points used to get homography on im1
4 points used to get homography on im2
Part 2.5: Produce some mosaics
Below I feed some sample images into my code from Part 2 then
Part 1 to produce some mosiacs. I also compare these mosaics
to the
one I produce by hand-selecting their correspondences.
FSM
FSM 1
FSM 2

=== PAGE 8 ===
11/18/22, 1:39 AM
CS 194-26 Project 4
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj4B/cs194-26-ahn/
8/10
FSM 1
FSM 2
Mosaic with automatically chosen correspondences
Mosaic with manually chosen correspondences
Takeaways
Both images look good, but the points chosen by hand looks slightly cleaner than
the points chosen automatically. In the automatic
case, there is some fading around the
"Berkeley" letters, because the points chosen are kind of close to each other. This makes
the
homography less accurate the further you go from those points. Since the "Berkeley"
letters aren't in the points, they are subject to
this artifact.
Butterfly

=== PAGE 9 ===
11/18/22, 1:39 AM
CS 194-26 Project 4
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj4B/cs194-26-ahn/
9/10
Butterfly 1
Butterfly 2
Mosaic with automatically chosen correspondences
Mosaic with manually chosen correspondences
Takeaways
Both look bad. If I fail to hold my camera steadily while taking the 2 pictures, I might
change it's position too much resuling in a huge
change in perspective. This makes
the panorama bad even if my transform and automatic point recognition works perfectly.
Cory Courtyard
Cory 1
Cory 2

=== PAGE 10 ===
11/18/22, 1:39 AM
CS 194-26 Project 4
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj4B/cs194-26-ahn/
10/10
Mosaic with automatically chosen correspondences
Mosaic with manually chosen correspondences
Takeaways
Both work perfect! If I take pictures correctly and my automatic point recognition works,
Then you can't decipher the transition from
one to the next at all.
Part 2.6: What I learned
Making panoramas is much more difficult than I ever thought. I really liked writing the code to find
points, but I found it really hard to
write the code to find hompagraphies. I ended up enjoying
the entire process after I understood it. I also found out that
the quality of
your panorama is highly dependent on how good you are at stabalizing your camera when you
take pictures.
Part 2.7: Bells and Whistles
I did not complete any Bells and Whistles
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj4A/cs194-26-ahn/

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

const B = "/blog/making-mosaics/images";
const ACCENT = "#8B1A2B";

export function MakingMosaicsContent() {
  return (
    <div>
      <BlogSection title="Overview" accent={ACCENT}>
        <BlogParagraph>
          This project builds a pipeline to stitch photographs into seamless panoramic mosaics.
          It has two parts: manually-specified homographies for a first pass, then a fully automatic
          pipeline that detects corners, extracts feature descriptors, matches them across images,
          and uses RANSAC to robustly compute the homography.
        </BlogParagraph>
      </BlogSection>

      <BlogDivider />

      <BlogSection title="Part 1 — Manual Image Warping &amp; Mosaicing" accent={ACCENT}>
        <BlogSubsection title="Shooting the Pictures">
          <BlogParagraph>
            Photos were taken outside FSM (Free Speech Movement Café) at UC Berkeley, holding the
            camera steady with the same center of projection to minimize parallax.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page1_img1.png`, label: "FSM 1" },
              { src: `${B}/page1_img2.png`, label: "FSM 2" },
            ]}
            caption="Input image pair shot outside FSM at Berkeley"
          />
        </BlogSubsection>

        <BlogSubsection title="Recovering Homographies">
          <BlogParagraph>
            A homography H maps points from FSM 1 into the coordinate frame of FSM 2,
            such that H @ p ≈ p'. A custom GUI was built to mark 19 correspondence points
            across both images, then least squares was used to solve for the best-fit H.
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="Image Rectification">
          <BlogParagraph>
            Before building the full mosaic, homography warping was validated by "rectifying"
            images — transforming them so a flat surface appears front-on, regardless of the
            original camera angle.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page3_img1.png`, label: "table pattern — original" },
              { src: `${B}/page3_img2.png`, label: "table pattern — rectified" },
              { src: `${B}/page3_img3.png`, label: "walkway pattern — original" },
              { src: `${B}/page3_img4.png`, label: "walkway pattern — rectified" },
            ]}
            caption="Image rectification: surfaces warped to face the camera directly"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page3_img6.png`, label: "historic back wall — original" },
              { src: `${B}/page3_img7.png`, label: "back wall — rectified and cropped" },
            ]}
            caption="A historic Berkeley house wall rectified to face front"
          />
        </BlogSubsection>

        <BlogSubsection title="Blending into a Mosaic">
          <BlogParagraph>
            With a valid homography, FSM 1 is warped into FSM 2's coordinate system. A Laplacian
            pyramid blend joins both images seamlessly.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page2_img2.png`, label: "FSM 1 — original" },
              { src: `${B}/page2_img1.png`, label: "FSM 2 — original" },
              { src: `${B}/page4_img3.png`, label: "FSM mosaic" },
            ]}
            columns={3}
            caption="The manual mosaic: warped FSM 1 blended with FSM 2"
          />
        </BlogSubsection>
      </BlogSection>

      <BlogDivider />

      <BlogSection title="Part 2 — Automatic Feature Matching" accent={ACCENT}>
        <BlogSubsection title="Harris Corner Detection">
          <BlogParagraph>
            Corners are strong matching candidates because they have high gradient magnitude in
            multiple directions. A single-scale Harris interest point detector finds candidate
            corners on each image.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page5_img1.png`, label: "FSM 1 — Harris corners" },
              { src: `${B}/page5_img2.png`, label: "FSM 2 — Harris corners" },
            ]}
            caption="Harris corners detected on both images (hundreds of candidates)"
          />
        </BlogSubsection>

        <BlogSubsection title="Adaptive Non-Maximal Suppression &amp; Feature Descriptors">
          <BlogParagraph>
            ANMS reduces the corner set to a well-distributed subset by keeping only corners that
            are locally maximal within a suppression radius. For each kept corner, a feature
            descriptor is extracted: an 8×8 patch sampled from a larger 40×40 window and
            bias/gain-normalized.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page5_img3.png`, label: "FSM 1 — ANMS corners" },
              { src: `${B}/page5_img4.png`, label: "FSM 2 — ANMS corners" },
            ]}
            caption="After ANMS: a manageable set of well-distributed interest points"
          />
        </BlogSubsection>

        <BlogSubsection title="Feature Matching &amp; RANSAC">
          <BlogParagraph>
            Correspondences are found using nearest-neighbor matching with Lowe's ratio test:
            a match is kept only if the best match is significantly closer than the second-best.
            RANSAC then robustly fits a homography by repeatedly sampling 4-point subsets and
            keeping the largest inlier set.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page7_img1.png`, label: "matched points on FSM 1" },
              { src: `${B}/page7_img2.png`, label: "matched points on FSM 2" },
            ]}
            caption="Automatically matched correspondences after Lowe's ratio filtering"
          />
        </BlogSubsection>

        <BlogSubsection title="Mosaic Comparison">
          <BlogParagraph>
            The auto-stitched mosaics are compared side-by-side with the manually-stitched versions.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page8_img3.png`, label: "FSM — auto correspondences" },
              { src: `${B}/page8_img4.png`, label: "FSM — manual correspondences" },
            ]}
            caption='FSM mosaic: auto vs. manual. Both look good; the manual version is slightly sharper around "Berkeley".'
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page9_img3.png`, label: "Cory Hall — auto" },
              { src: `${B}/page9_img4.png`, label: "Cory Hall — manual" },
            ]}
            caption="Cory Hall courtyard: both methods produce a seamless result"
          />
          <BlogCallout accent={ACCENT}>
            The mosaic quality is highly dependent on camera stability between shots.
            A change in camera position (as opposed to rotation only) introduces parallax
            that no homography can compensate for.
          </BlogCallout>
        </BlogSubsection>
      </BlogSection>
    </div>
  );
}

```

## Output

Return the complete, updated `src/blog/computer-vision/making-mosaics/index.tsx`. No truncation — include every section.
