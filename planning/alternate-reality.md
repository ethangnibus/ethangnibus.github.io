# Task: Update `alternate-reality` blog post to be 1:1 with the PDF

## Context

You are updating the blog post for **Alternate Reality** to be a complete, 1:1 match with the original PDF write-up.

**Files involved:**
- PDF: `public/blog/computer-vision/alternate-reality/pdfs/style.pdf`
- Blog post source: `src/blog/computer-vision/alternate-reality/index.tsx`
- Images base path: `/blog/style-transfer/images/` (used as the `B` constant)

**Important note:** This PDF covers BOTH projects. The `alternate-reality` blog post covers only pages 1-3 (Poor Man\'s Augmented Reality). Images are shared with style-transfer and live at public/blog/computer-vision/style-transfer/images/.

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

- The `const B = "/blog/style-transfer/images"` line must stay exactly as-is
- All image srcs: `` `${B}/filename.ext` ``
- Accent color for this project: `#8B1A2B`
- Exported function name must remain: `AlternateRealityContent`

## Available images (53 total)

Filenames follow the pattern `page{N}_img{M}.ext` — N is the PDF page, M is image index on that page.
Cross-reference with the PDF text below to determine which image belongs in each section.

```
page1_img1.png
page1_img2.png
page2_img1.png
page2_img2.jpeg
page2_img3.jpeg
page2_img4.png
page3_img1.png
page3_img2.png
page3_img3.jpeg
page4_img1.jpeg
page4_img2.jpeg
page4_img3.jpeg
page4_img4.jpeg
page4_img5.jpeg
page4_img6.jpeg
page4_img7.jpeg
page4_img8.jpeg
page4_img9.jpeg
page5_img1.jpeg
page5_img10.jpeg
page5_img11.jpeg
page5_img12.jpeg
page5_img13.jpeg
page5_img14.jpeg
page5_img15.jpeg
page5_img16.jpeg
page5_img17.jpeg
page5_img2.jpeg
page5_img3.jpeg
page5_img4.jpeg
page5_img5.jpeg
page5_img6.jpeg
page5_img7.jpeg
page5_img8.jpeg
page5_img9.jpeg
page6_img1.jpeg
page6_img2.jpeg
page6_img3.jpeg
page6_img4.jpeg
page6_img5.jpeg
page6_img6.jpeg
page6_img7.jpeg
page6_img8.jpeg
page6_img9.jpeg
page7_img1.jpeg
page7_img2.jpeg
page7_img3.jpeg
page7_img4.jpeg
page7_img5.jpeg
page7_img6.jpeg
page8_img1.jpeg
page8_img2.jpeg
page8_img3.jpeg
```

## Full PDF text (all pages)

```
=== PAGE 1 ===
2/17/23, 2:02 PM
CS 194-26 Pre-Canned Final Project
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/projFinalAssigned/cs194-26-ahn/
1/8
CS 194-26: Image Manipulation and Computational Photography, Fall 2022
Poor Man's Augmented Reality and A Neural Algorithm of Artistic Style
Ethan Gnibus
Poor Man's Augmented Reality
Overview
Using a box I drew on and a live video, I attempt to recreate an Augmented Reality scene where I can render using 3 dimensions.
Limiting myself to only a box with known 3D coordinates and a video as input, this means I must proceed without knowing intrinsic
parameters of the camera.
Part 1: Importing a video feed
To complete this project I decided to use cv2's VideoCapture function. This allowed me to read in video data in real-time. For the sake
of this proof-of-concept, I chose to use the video clip below.
Recorded on my phone
Part 2: Tracking Points
To make a 3D scene, can correspond 2D (x, y) points in image-space to 3D (x, y, z) points in world-space. The first step in this process is
to label 2D (x, y) points in image-space. I used matplotlib.pyplot.ginput() to manually label the 2D (x, y) points in the first frame of the
video. To get the points in the rest of the frames, I used off the shelf tracking from cv2! To do this I initialized a separate Median Flow
tracker on every point from the first frame (cv2.TrackerMedianFlow_create()) and tracked until the last frame. My results are below:
0:04 / 0:12

=== PAGE 2 ===
2/17/23, 2:02 PM
CS 194-26 Pre-Canned Final Project
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/projFinalAssigned/cs194-26-ahn/
2/8
Tracked Points
Part 3: Finding the Projection Matrices
Using the known 3D (x, y, z) world-space points that correspond to the 2D (x, y) image-space points we just retrieved by tracking, we
can recover a transformation matrix for every frame that enables us to project 3D meshes onto our 2D video!
We proceed by solving least squares on our 2D and 3D points based on the following diagram:
Linear Least Squares for Camera Calibration
Where (Xi, Yi, Zi) are the 3D world-space points that correspond to the (ui, vi) 2D image-space points. We can reshape the resulting
vector to get the following matrix filled with mi entries. This matrix is the projection matrix that allows us to go from 3D world-space to
2D image-space.
The Projection Matrix
Here I display the 3D world-space's axes by defining points in 3D world-space, projecting them into 2D-image space, then using cv2's
line() function to draw to the screen! I repeat this process separately for every frame.
0:04 0:1

=== PAGE 3 ===
2/17/23, 2:02 PM
CS 194-26 Pre-Canned Final Project
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/projFinalAssigned/cs194-26-ahn/
3/8
Displaying (x, y, z) world-space axes
Part 4: Displaying the Box
I use the method from above to define a box object in our scene. I use cv2's drawContours function to draw the box's green bottom
using trianges.
Box Mesh
A Neural Algorithm of Artistic Style
Overview
In this project based on A Neural Algorithm of Artistic Style, I use the content and style features from VGG-Network to transfer the
style from one image to another. I take these content and style features from 5 convolutional layers in VGG-Network, then train a
separate neural network to balance the loss between an output images content from one image and style from another image.
Using the following VGG-Network architecture, A Neural Algorithm of Artistic Style, uses conv1_1, conv2_1, conv3_1, and conv4_1 as
style features and conv4_2 as the content feature. A VGG-Network can be seen below:
0:02 0:1
0:07 0:1

=== PAGE 4 ===
2/17/23, 2:02 PM
CS 194-26 Pre-Canned Final Project
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/projFinalAssigned/cs194-26-ahn/
4/8
VGG-Network Architecture
Part 1: Building The Network
To implement a paper, I trained a neural network to take in two images and output one image. The goal of the style transfer neural
network is to minimize the sum of the losses Lstyle and Lcontent. Lstyle aims to minimize the mean squared error between the Gram
Matrices of the style image and the output image respectively. Lcontent aims to minimize the mean squared error between the content
features of the content image and output image respectively. I used a variety of hyperparameters as seen below.
Part 2: Varying Style Ratio and Style Layers
Here I show how adjusting the style to image ratio affects outputs. From left to right I adjust from loss favoring content to loss favoring
style. From top to bottom I change which layers the style features come from.
Conv1_1: 10-5
Conv1_1: 10-4
Conv1_1: 10-3
Conv1_1: 10-2
Conv2_1: 10-5
Conv2_1: 10-4
Conv2_1: 10-3
Conv2_1: 10-2

=== PAGE 5 ===
2/17/23, 2:02 PM
CS 194-26 Pre-Canned Final Project
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/projFinalAssigned/cs194-26-ahn/
5/8
Conv3_1: 10-5
Conv3_1: 10-4
Conv3_1: 10-3
Conv3_1: 10-2
Conv4_1: 10-5
Conv4_1: 10-4
Conv4_1: 10-3
Conv4_1: 10-2
Conv5_1: 10-5
Conv5_1: 10-4
Conv5_1: 10-3
Conv5_1: 10-2
Part 3: Multiple different styles on one image
Here I show this project's capabilities by styling a picture of me eating a muffin on the beach:
Style
Content
Output
Style
Content
Output

=== PAGE 6 ===
2/17/23, 2:02 PM
CS 194-26 Pre-Canned Final Project
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/projFinalAssigned/cs194-26-ahn/
6/8
Style
Content
Output
Style
Content
Output
Style
Content
Output
Style
Content
Output
Part 4: Repetitive Styling
Just for fun, I decided to use the output of a style transfer as the style image in the next style transfer. Below are my results:

=== PAGE 7 ===
2/17/23, 2:02 PM
CS 194-26 Pre-Canned Final Project
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/projFinalAssigned/cs194-26-ahn/
7/8
Style
Content
Output
Style
Content
Output
Style
Content
Output
Style
Content
Output

=== PAGE 8 ===
2/17/23, 2:02 PM
CS 194-26 Pre-Canned Final Project
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/projFinalAssigned/cs194-26-ahn/
8/8
Style
Content
Output
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/projFinalAssigned/cs194-26-ahn/

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

const B = "/blog/style-transfer/images";
const AR = "/images/computer_vision/ar/blog";
const ACCENT = "#8B1A2B";

export function AlternateRealityContent() {
  return (
    <div>
      <BlogSection title="Overview" accent={ACCENT}>
        <BlogParagraph>
          Poor Man's Augmented Reality renders 3D mesh overlays onto live video using only
          a hand-drawn box as the reference object. No camera calibration or known intrinsics
          are needed — just a box with known 3D coordinates and a video feed. The projection
          matrix is recovered per-frame from tracked 2D point correspondences.
        </BlogParagraph>
      </BlogSection>

      <BlogDivider />

      <BlogSection title="Part 1 — Importing a Video Feed" accent={ACCENT}>
        <BlogParagraph>
          OpenCV's VideoCapture reads the video in real-time. For this proof of concept,
          a pre-recorded phone video of a hand-drawn box was used as input.
        </BlogParagraph>
      </BlogSection>

      <BlogSection title="Part 2 — Tracking Points" accent={ACCENT}>
        <BlogParagraph>
          The 2D (x, y) image-space coordinates of the box's corners are labeled manually
          in the first frame using matplotlib's ginput(). A separate OpenCV MedianFlow tracker
          is initialized on each point and propagated through every subsequent frame automatically.
        </BlogParagraph>
        <BlogCallout accent={ACCENT}>
          Each tracked point corresponds to a known 3D world-space coordinate on the drawn box,
          establishing the 2D↔3D correspondences needed for projection matrix recovery.
        </BlogCallout>
      </BlogSection>

      <BlogSection title="Part 3 — Recovering the Projection Matrix" accent={ACCENT}>
        <BlogParagraph>
          Given N corresponding (u, v) image-space points and (X, Y, Z) world-space points,
          the projection matrix P is recovered by solving a linear least squares system per frame.
          P maps any 3D point onto the 2D image plane for that frame.
        </BlogParagraph>
        <BlogFigureGrid
          figures={[
            { src: `${B}/page2_img2.jpeg`, label: "tracked points visualized" },
            { src: `${B}/page2_img3.jpeg`, label: "world-space axes projected" },
          ]}
          caption="Left: tracked corner points. Right: the recovered x/y/z world axes drawn on screen."
        />
      </BlogSection>

      <BlogSection title="Part 4 — Displaying the Box" accent={ACCENT}>
        <BlogParagraph>
          Using the per-frame projection matrices, a 3D box mesh is defined in world space,
          projected into 2D image space, and drawn onto each frame using OpenCV's
          drawContours. The box appears anchored to the reference object throughout the video.
        </BlogParagraph>
        <BlogFigureGrid
          figures={[
            { src: `${B}/page3_img2.png`, label: "projected box mesh overlay" },
          ]}
          columns={2}
          caption="A 3D box rendered onto the video frame using the recovered projection matrix"
        />
      </BlogSection>

      <BlogDivider />

      <BlogSection title="Key Insight" accent={ACCENT}>
        <BlogParagraph>
          This approach demonstrates that augmented reality is fundamentally a linear algebra
          problem. Given enough 2D↔3D correspondences and a stable tracker, a projection
          matrix can be recovered from scratch — no calibration target, no known camera model,
          just math and a hand-drawn box.
        </BlogParagraph>
      </BlogSection>
    </div>
  );
}

```

## Output

Return the complete, updated `src/blog/computer-vision/alternate-reality/index.tsx`. No truncation — include every section.
