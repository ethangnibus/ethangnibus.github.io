# Task: Update `filters-and-frequency` blog post to be 1:1 with the PDF

## Context

You are updating the blog post for **Filters & Frequency** to be a complete, 1:1 match with the original PDF write-up.

**Files involved:**
- PDF: `public/blog/computer-vision/filters-and-frequency/pdfs/filters.pdf`
- Blog post source: `src/blog/computer-vision/filters-and-frequency/index.tsx`
- Images base path: `/blog/computer-vision/filters-and-frequency/images/` (used as the `B` constant)

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

- The `const B = "/blog/filters-and-frequency/images"` line must stay exactly as-is
- All image srcs: `` `${B}/filename.ext` ``
- Accent color for this project: `#8B1A2B`
- Exported function name must remain: `FiltersAndFrequencyContent`

## Available images (86 total)

Filenames follow the pattern `page{N}_img{M}.ext` — N is the PDF page, M is image index on that page.
Cross-reference with the PDF text below to determine which image belongs in each section.

```
page10_img1.jpeg
page10_img2.jpeg
page10_img3.jpeg
page10_img4.jpeg
page10_img5.jpeg
page10_img6.jpeg
page11_img1.jpeg
page11_img2.jpeg
page11_img3.jpeg
page11_img4.jpeg
page11_img5.jpeg
page12_img1.jpeg
page12_img2.jpeg
page12_img3.jpeg
page12_img4.jpeg
page12_img5.jpeg
page12_img6.jpeg
page13_img1.jpeg
page13_img2.jpeg
page13_img4.jpeg
page14_img2.jpeg
page14_img4.jpeg
page16_img3.jpeg
page16_img4.jpeg
page16_img6.jpeg
page17_img2.jpeg
page17_img4.jpeg
page17_img6.jpeg
page18_img2.jpeg
page18_img4.jpeg
page19_img3.jpeg
page19_img4.jpeg
page19_img5.jpeg
page19_img8.jpeg
page1_img1.png
page20_img3.jpeg
page20_img4.jpeg
page20_img5.jpeg
page20_img6.jpeg
page21_img1.jpeg
page21_img2.jpeg
page21_img3.jpeg
page21_img4.jpeg
page22_img1.jpeg
page22_img2.jpeg
page22_img3.jpeg
page22_img4.jpeg
page2_img1.jpeg
page2_img2.jpeg
page2_img3.jpeg
page2_img4.jpeg
page3_img1.png
page3_img2.jpeg
page3_img3.jpeg
page3_img4.jpeg
page4_img1.png
page4_img2.png
page4_img3.jpeg
page4_img4.jpeg
page4_img5.jpeg
page4_img6.jpeg
page5_img1.png
page5_img3.jpeg
page5_img4.jpeg
page5_img5.jpeg
page5_img6.png
page5_img7.jpeg
page6_img1.jpeg
page6_img2.jpeg
page6_img3.jpeg
page7_img1.jpeg
page7_img2.png
page7_img3.jpeg
page7_img4.jpeg
page7_img5.jpeg
page8_img1.jpeg
page8_img2.png
page8_img3.jpeg
page8_img4.jpeg
page8_img5.png
page9_img1.png
page9_img2.jpeg
page9_img3.png
page9_img4.jpeg
page9_img5.jpeg
page9_img6.jpeg
```

## Full PDF text (all pages)

```
=== PAGE 1 ===
9/22/22, 4:32 PM
CS 194-26 Project 2
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj2/cs194-26-ahn/
1/22
CS 194-26: Image Manipulation and Computational Photography, Fall 2022
Project 2: Fun with Filters and Frequencies!
Ethan Gnibus
Overview
In this project, I will manipulate images using filters and frequency to extract useful information and
make cool art. I will use filters to
blur images, take the partial derivative in x and y of images, and
edge detect images. I will use frequencies to sharpen images, make
hybrid images, and blend images together!
Part 1: Fun with Filters
Part 1.1 Finite Difference Operator
Here is the Cameraman Image
cameraman.png
We can find the partial derivative in x and y of any image using convolution.
To do this, we will construct the finite difference operators
D_x = [1, -1]
and D_y = [1, -1].T. Next we will convolve the original image by D_x and D_y
to get the following:

=== PAGE 2 ===
9/22/22, 4:32 PM
CS 194-26 Project 2
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj2/cs194-26-ahn/
2/22
Partial derivative in x
Partial derivative in y
We can combine the partial derivative in x and y to get the gradient magnitude of our
original image:
Gradient Magnitude
To edge detect, we can binarize the gradient magnitude by turning pixels white
if their value is above a threshold, or turning them
black if not:
Bad Edge Detection
Why Gradient Magnitude works for edge detection:

=== PAGE 3 ===
9/22/22, 4:32 PM
CS 194-26 Project 2
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj2/cs194-26-ahn/
3/22
Using partial derivatives, we are able to find the slope of how fast things
change in the x and y directions of our images. If slope is high
at a given point,
we know that significant change happens at that point. Knowing where significant
change in the x and y directions are
useful, because we can combine them
to see where significant change happenes in both directions! This is essentially
what taking the
gradient magnitude is. Now that we know where significant change is
in all directions, we can use that information to determine how
significant that
change must be for our algorithm to recognize that pixel as an edge.
Part 1.2 Derivative of Gaussian (DoG) Filter
Unfortunately, our edge detection algorithm alone results in lots of unwanted noise. To filter out some of the high frequencies
in this
image, we will run the original image through a low-pass filter before running our edge detecion
algorithm:
Input Image
Blurred Image
Edge De
Here we can compare our old edge detection algorithm (no blur) and our new edge detection algorithm (with blur)
Edge Detection Before Blur
Edge Detection After Blur
As we can see, when we blur we get much less noise! This is because blurring an image removes it's high frequencies.
We can also see
that this process has a tradeoff. The edge detection algorithm finds fine lines on the unblurred image,
but it finds thick lines on the
blurred image. The lack of high frequency data makes our edge detection estimate on
lower freqency data, resulting in less drastic
change.
This shows that there is dynamic between edge detection accuracy and
noise reduction that you have to optimize when
making an edge detection algorithm.
Runtime Optimizations
To speed up our algorithm, we can take the derivative of the Gaussian filters, then use them to convolve the
input image. This is in
contrast to taking the partial derivatives of the original image, then convolving the partial derivatives by a Gaussian filter. Here's a
visualization of our two processes:
Before Runtime Optimizations

=== PAGE 4 ===
9/22/22, 4:32 PM
CS 194-26 Project 2
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj2/cs194-26-ahn/
4/22
Input Image
Convolve input image by Gaussian Filter
Blurred Image
Partial derivative in x (one convolution call)
Partial derivative in y (one convolution call)
Gradient Magnitude

=== PAGE 5 ===
9/22/22, 4:32 PM
CS 194-26 Project 2
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj2/cs194-26-ahn/
5/22
Output Image
Here we have a total of 3 convolution calls
After Runtime Optimizations
Input Image
Convolve by Partial
Derivative in dx Gaussian
Filter
Convolve by Partial
Derivative in dy
Gaussian Filter
Blurred Partial Derivative
in x
Blurred Partial
Derivative in y
Gradient Magnitude

=== PAGE 6 ===
9/22/22, 4:32 PM
CS 194-26 Project 2
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj2/cs194-26-ahn/
6/22
Output Image
Here we have a total of 2 convolution calls
As we can see, we get the same result, but the second approach is much faster!
Part 2: Fun with Frequencies!
Part 2.1: Image "Sharpening"
Sometimes when you are working with images, you find yourself with a blurry image that you want to sharpen:
Input Image
Low Frequencies

=== PAGE 7 ===
9/22/22, 4:32 PM
CS 194-26 Project 2
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj2/cs194-26-ahn/
7/22
High Frequencies
Sharpened image
To sharpen an image, we will proceed by making an image's high frequency data more prominent.
To do this we will need to find an
image's high frequency data, then add it back to the original image.
This process entails passing the image through a low-pass filter by
convolving it with a gaussian.
From this operation we get a blurred version of the original image. Next, we subtract the blurred image
from the original image to get the high frequency data from the original image. Finally, we add the
high frequency data back into the
original image and get a sharpened image!
for simplicity, I will show this process with the just the red channel of an image:
Input Image
Low Frequencies
High Frequencies
Sharpened image

=== PAGE 8 ===
9/22/22, 4:32 PM
CS 194-26 Project 2
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj2/cs194-26-ahn/
8/22
We can combine all these operations into a single convolution operation called the unsharp mask filter.
We can construct this unsharp
mask filter for any image to sharpen it. This makes sharpening across all color channes
really easy:
Input Image
Sharpened Image
Here's what it looks like if we use this unsharp makse filter to
take a sharp image, blur it, then try to sharpen it again
Sharp Image
Blurred
Blurred then sharpened
Blurred then sharpened with small coefficient
Evidently, resharpening doesn't seem to be as simple as the blurring process.
By simply applying the unsharp mask filter to the
blurred image, we do not
get the original sharp image back. By multiplying the unsharp mask by a small
coefficient, we can get a result

=== PAGE 9 ===
9/22/22, 4:32 PM
CS 194-26 Project 2
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj2/cs194-26-ahn/
9/22
much closer to the original image.
Unsharpening a few images of my choice
Input Face
Sharpened Face
Input DALL-E Mini
Sharpened DALL-E Mini
Part 2.2: Hybrid Images
We can combine the low frequencies of one image with the high frequencies of another to make a hybrid image!
This hybrid image will
look like the first image from far away and the second image from up close. An
example is below:
Derek
Nutmeg

=== PAGE 10 ===
9/22/22, 4:32 PM
CS 194-26 Project 2
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj2/cs194-26-ahn/
10/22
Derek High Frequencies
Nutmeg's Low Frequencies
Hybrid Frequency
Hybrid Frequency (high's and low's swapped)
Here we can see the log magnitude of the Fourier transform of the two input images,
the filtered images, and the hybrid image.
Derek
Nutmeg

=== PAGE 11 ===
9/22/22, 4:32 PM
CS 194-26 Project 2
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj2/cs194-26-ahn/
11/22
Derek High Frequencies
Nutmeg's Low Frequencies
Hybrid Frequency
As we can see, the low-pass filter only lets the low frequencies of the first image through.
The high-pass filter only lets the high
frequencies of the second image through.
Consequently, the hybrid image has the low frequencies from the first picture and the high
frequencies
from the second.
Here I experiment with some hybrid image results:
Mixing Ethan with Juliette
Juliette
Ethan

=== PAGE 12 ===
9/22/22, 4:32 PM
CS 194-26 Project 2
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj2/cs194-26-ahn/
12/22
Mixed
Mixed Flipped
Mixing Ethan with Emma
Emma
Ethan
Mixed
Mixed Flipped
Bells & Whistles
I chose to implement hybrid images with color and found that the images looked the best if I used
full color for both the high and low
frequencies

=== PAGE 13 ===
9/22/22, 4:32 PM
CS 194-26 Project 2
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj2/cs194-26-ahn/
13/22
Multi-resolution Blending and the Oraple journey
Here we want to make a seamless transition between two pictures by blending across frequencies.
To do this we will make Gaussian
Stacks and Laplacin Stacks for both images,
combine both stacks using a mask, then add all layers of the combined stack to get our
resulting blended image.
Part 2.3: Gaussian and Laplacian Stacks
Gaussian Stack
A Gaussian Stack is a collection of same-sized images made by repetitively blurring an input image
and saving it at each step. We blur
by convolving the current layer in the stack by a Gaussian filter.
Laplacian Stack
A Laplacian Stack is a collection of same-sized images made by finding the high frequencies
that exist in the current layer of the
Gaussian Stack, but not in any of the layers below the
stack. To find layer i of the Laplacian Stack, you subtract the i - 1th
layer of the
Gaussian Stack from the ith layer of the Gaussian Stack. At the last
layer of the Laplacian Stack, you save the most blurred version of
the input image you have in the
Gaussian Stack.
Here's what the Gaussian and Laplacian stacks for the red channel
of an orange looks like:
Gaussian Stack Level 0
Laplacian Stack Level 0
Gaussian Stack Level 1
Laplacian Stack Level 1

=== PAGE 14 ===
9/22/22, 4:32 PM
CS 194-26 Project 2
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj2/cs194-26-ahn/
14/22
Gaussian Stack Level 2
Laplacian Stack Level 2
Gaussian Stack Level 3
Laplacian Stack Level 3
Gaussian Stack Level 4
Laplacian Stack Level 4

=== PAGE 15 ===
9/22/22, 4:32 PM
CS 194-26 Project 2
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj2/cs194-26-ahn/
15/22
Gaussian Stack Level 5
Laplacian Stack Level 5
Gaussian Stack Level 6
Laplacian Stack Level 6
Gaussian Stack Level 7
Laplacian Stack Level 7

=== PAGE 16 ===
9/22/22, 4:32 PM
CS 194-26 Project 2
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj2/cs194-26-ahn/
16/22
Gaussian Stack Level 8
Laplacian Stack Level 8
Here's what the Gaussian and Laplacian stacks for the red channel
of an apple looks like
Gaussian Stack Level 0
Laplacian Stack Level 0
Gaussian Stack Level 1
Laplacian Stack Level 1

=== PAGE 17 ===
9/22/22, 4:32 PM
CS 194-26 Project 2
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj2/cs194-26-ahn/
17/22
Gaussian Stack Level 2
Laplacian Stack Level 2
Gaussian Stack Level 3
Laplacian Stack Level 3
Gaussian Stack Level 4
Laplacian Stack Level 4

=== PAGE 18 ===
9/22/22, 4:32 PM
CS 194-26 Project 2
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj2/cs194-26-ahn/
18/22
Gaussian Stack Level 5
Laplacian Stack Level 5
Gaussian Stack Level 6
Laplacian Stack Level 6
Gaussian Stack Level 7
Laplacian Stack Level 7

=== PAGE 19 ===
9/22/22, 4:32 PM
CS 194-26 Project 2
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj2/cs194-26-ahn/
19/22
Gaussian Stack Level 8
Laplacian Stack Level 8
Here's we can see how we can use two images and their laplacian stacks
to make a mixed image like an orapple:
Apple Laplacian Stack Level 0 (Red Channel)
Orange Laplacian Stack Level 0 (Red Channel)
Orapple Laplacian Stack
Apple Laplacian Stack Level 2 (Red Channel)
Orange Laplacian Stack Level 2 (Red Channel)
Orapple Laplacian Stack

=== PAGE 20 ===
9/22/22, 4:32 PM
CS 194-26 Project 2
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj2/cs194-26-ahn/
20/22
Apple Laplacian Stack Level 4 (Red Channel)
Orange Laplacian Stack Level 4 (Red Channel)
Orapple Laplacian Stack
Combined Apple Laplacian Stack (Red, Green, and
Blue Channels added together)
Combined Orange Laplacian Stack (Red, Green, and
Blue Channels added together)
Final Orapple result (Red, G
added to
Part 2.4: Multiresolution Blending (a.k.a. the oraple!)
As you can see, our image blending algorithm has nice results! I achieved these results by
blurring the mask I use to combine images
more and more as we go from blending
high frequencies to blending low frequencies. As a result, the small features contained
in high
frequency data is blended together over a short distance while the large features contained in
low frequency data is bleneded
together over long distances.
The capabilities of this algorithm is best seen when I create an irregular mask when blending two images:
Putting a frog in a world of smiley faces:

=== PAGE 21 ===
9/22/22, 4:32 PM
CS 194-26 Project 2
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj2/cs194-26-ahn/
21/22
Input Image 1
Input Image 2
Irregular Blending Mask
Final Result
Blending my eye into my hand:

=== PAGE 22 ===
9/22/22, 4:32 PM
CS 194-26 Project 2
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj2/cs194-26-ahn/
22/22
Input Image 1
Input Image 2
Irregular Blending Mask
Final Result
Bells & Whistles
I implemented full color for blending when completing this assignment
The coolest part of this assignment is finding out that I could edit frequencies at specific frequency bands using
Laplacian Stacks. I
want make a video where the starting frame has the high frequencies of the first video and
low frequencies of the second video, then
as time goes on the frequencies interpolate so that the ending frame
has low frequencies of the first video and high frequencies of the
second video.
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj1/cs194-26-ahn/

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

const B = "/blog/filters-and-frequency/images";
const ACCENT = "#8B1A2B";

export function FiltersAndFrequencyContent() {
  return (
    <div>
      <BlogSection title="Overview" accent={ACCENT}>
        <BlogParagraph>
          This project explores two fundamental techniques in computational photography: filters
          and frequency decomposition. Filters enable edge detection, blurring, and sharpening.
          Frequency analysis unlocks hybrid images (which look different from near vs. far) and
          multi-resolution image blending — culminating in the infamous oraple.
        </BlogParagraph>
      </BlogSection>

      <BlogDivider />

      <BlogSection title="Part 1 — Fun with Filters" accent={ACCENT}>
        <BlogSubsection title="Finite Difference Operator">
          <BlogParagraph>
            The partial derivatives of an image in x and y are computed via convolution with the
            finite difference operators D_x = [1, −1] and D_y = [1, −1]ᵀ. Combining these into a
            gradient magnitude image reveals where significant intensity change occurs — the basis
            for edge detection. Binarizing the gradient magnitude produces an edge map.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page1_img1.png`, label: "input: cameraman" },
              { src: `${B}/page2_img1.jpeg`, label: "∂x (partial derivative in x)" },
              { src: `${B}/page2_img2.jpeg`, label: "∂y (partial derivative in y)" },
              { src: `${B}/page2_img3.jpeg`, label: "gradient magnitude" },
            ]}
            caption="Finite difference edge detection on the cameraman image"
          />
        </BlogSubsection>

        <BlogSubsection title="Derivative of Gaussian (DoG) Filter">
          <BlogParagraph>
            Raw gradient-based edge detection picks up too much noise. Pre-blurring with a Gaussian
            low-pass filter removes high frequencies before edge detection, trading fine-line
            precision for much cleaner results.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page3_img2.jpeg`, label: "edge detection — no blur" },
              { src: `${B}/page3_img3.jpeg`, label: "edge detection — with Gaussian blur" },
            ]}
            caption="Blurring before edge detection removes noise at the cost of thicker edges"
          />
          <BlogParagraph>
            As a runtime optimization, the Gaussian filter can be pre-differentiated and applied in
            a single convolution pass, reducing from 3 convolution calls to 2 while producing the
            same result.
          </BlogParagraph>
        </BlogSubsection>
      </BlogSection>

      <BlogDivider />

      <BlogSection title="Part 2 — Fun with Frequencies" accent={ACCENT}>
        <BlogSubsection title="Image Sharpening">
          <BlogParagraph>
            To sharpen an image, its high-frequency content is extracted (by subtracting a
            Gaussian-blurred version from the original) and added back in. This can be combined
            into a single convolution called the unsharp mask filter. The filter works well, but
            resharpening a blurred image doesn't perfectly restore the original — some high
            frequencies are lost irrecoverably.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page6_img2.jpeg`, label: "blurred input" },
              { src: `${B}/page6_img1.jpeg`, label: "sharpened output" },
            ]}
            caption="Unsharp mask filter applied to sharpen a blurred image"
          />
        </BlogSubsection>

        <BlogSubsection title="Hybrid Images">
          <BlogParagraph>
            Combining the low frequencies of one image with the high frequencies of another
            creates a hybrid image that appears differently at different viewing distances. Up close,
            the high-frequency content dominates. From far away, only the low frequencies are
            perceptible.
          </BlogParagraph>
          <BlogCallout accent={ACCENT}>
            The Derek/Nutmeg hybrid: Derek's high frequencies dominate up close, while Nutmeg's
            low frequencies emerge when viewed from a distance.
          </BlogCallout>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page8_img1.jpeg`, label: "Derek (high freq source)" },
              { src: `${B}/page8_img2.png`, label: "Nutmeg (low freq source)" },
              { src: `${B}/page9_img1.png`, label: "hybrid result" },
              { src: `${B}/page9_img2.jpeg`, label: "Fourier transforms" },
            ]}
            caption="Hybrid image: Derek's edges + Nutmeg's shape. The Fourier transforms confirm the frequency separation."
          />
        </BlogSubsection>

        <BlogSubsection title="Gaussian &amp; Laplacian Stacks">
          <BlogParagraph>
            A Gaussian stack is built by repeatedly blurring an image and saving each step — no
            downsampling. A Laplacian stack captures the band-limited detail at each scale by
            subtracting adjacent Gaussian levels. Together they decompose an image into frequency
            bands that can be recombined selectively.
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="Multi-resolution Blending (the Oraple)">
          <BlogParagraph>
            Using Laplacian stacks, two images can be blended seamlessly at each frequency band.
            A mask controls the blend region: high-frequency bands are blended over a short
            transition, while low-frequency bands blend over a wider area. The result is a smooth
            seam that respects the natural scale of features.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page8_img3.jpeg`, label: "input: face" },
              { src: `${B}/page8_img4.jpeg`, label: "input: hand" },
              { src: `${B}/page8_img5.png`, label: "blended result" },
            ]}
            columns={3}
            caption="Irregular mask blending: an eye merged into a hand"
          />
          <BlogParagraph>
            The technique shines with irregular masks. Below, a frog is placed into a world of
            smiley faces.
          </BlogParagraph>
        </BlogSubsection>
      </BlogSection>
    </div>
  );
}

```

## Output

Return the complete, updated `src/blog/computer-vision/filters-and-frequency/index.tsx`. No truncation — include every section.
