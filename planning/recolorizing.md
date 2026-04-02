# Task: Update `recolorizing` blog post to be 1:1 with the PDF

## Context

You are updating the blog post for **Recolorizing** to be a complete, 1:1 match with the original PDF write-up.

**Files involved:**
- PDF: `public/blog/computer-vision/recolorizing/pdfs/recolorizer.pdf`
- Blog post source: `src/blog/computer-vision/recolorizing/index.tsx`
- Images base path: `/blog/computer-vision/recolorizing/images/` (used as the `B` constant)

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

- The `const B = "/blog/recolorizing/images"` line must stay exactly as-is
- All image srcs: `` `${B}/filename.ext` ``
- Accent color for this project: `#8B1A2B`
- Exported function name must remain: `RecolorizingContent`

## Available images (39 total)

Filenames follow the pattern `page{N}_img{M}.ext` — N is the PDF page, M is image index on that page.
Cross-reference with the PDF text below to determine which image belongs in each section.

```
page2_img1.jpeg
page2_img2.jpeg
page2_img3.jpeg
page2_img4.jpeg
page2_img5.jpeg
page2_img6.jpeg
page3_img1.jpeg
page3_img2.jpeg
page3_img3.jpeg
page3_img4.jpeg
page3_img5.jpeg
page3_img6.jpeg
page4_img1.jpeg
page4_img2.jpeg
page4_img3.jpeg
page4_img4.jpeg
page4_img5.jpeg
page4_img6.jpeg
page5_img1.jpeg
page5_img2.jpeg
page5_img3.jpeg
page5_img4.jpeg
page5_img5.jpeg
page5_img6.jpeg
page6_img1.jpeg
page6_img2.jpeg
page6_img3.jpeg
page6_img4.jpeg
page6_img5.jpeg
page6_img6.jpeg
page7_img1.jpeg
page7_img2.jpeg
page7_img3.jpeg
page7_img4.jpeg
page8_img2.jpeg
page9_img1.jpeg
page9_img2.jpeg
page9_img3.jpeg
page9_img4.jpeg
```

## Full PDF text (all pages)

```
=== PAGE 1 ===
9/9/22, 9:04 PM
CS 194-26 Project 1
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj1/cs194-26-ahn/
1/9
CS 194-26: Image Manipulation and Computational Photography, Fall 2022
Project 1: Images of the Russian Empire
Colorizing the Prokudin-Gorskii photo collection
Ethan Gnibus
Overview
Text giving a brief overview of the project, and text describing your approach. If you ran into problems on images, describe how you
tried to solve them. The website does not need to be pretty; you just need to explain what you did.
In the early 1900's, Sergei Mikhailovich Prokudin-Gorskii travelled around the
Russian Empire with a goal in mind to photograph
everything he saw in color.
This was before color photography existed, so Sergei planned to take pictures of
the same scene three
times in a row. One photograph would be taken with a filter
over the lens so that only red light would be captured. The second would
only capture
green light. The third would only capture blue. Sergei hypothesized that one could
project all three images together to
reconstruct said scene in full color! In this
project I aim to take individual R, G, B photos from Sergei's collection, align them
using code,
then output them as a full color image.
To implement this image-aligning program, I first split the scans of Sergi's photos
into three channels: R, G, and B. Next, I implemented
a function that aligns
two images using exhaustive search. This funcion translates the G and R channels
by every (x, y) displacement
vector where x is chosen from the range -15 to 15 and y is chosen from the range from -15 to 15. At each displacement vector, I used
an image
matching metric to score each displacement vector. I implemented Sum of Squared Differences
(SSD) and normalized cross-
correlation (NCC), but I found that NCC's results were
better so I chose to use the latter. After scoring every displacement
vector for a
channel, I took the one that scored the best, and used it to tranlate the
input channel by said vector. This way, the R and G channels
can be aligned to the B
channel if they were to be ovelapped. I finished up by writing code that took these
three individual R, G, and B
channels, then combined them to be shown as a full color
image.
This implemetation worked for small images (it worked perfectly on 256x256 images
for example), but as the dimensions of an image
increased, the program took far too
long to compute. Not only that, but the quality of alignment dropped and eventually
stopped
working. This was because the (-15, 15) range of displacement I tested and
ranked became obsolete as the image sizes I tested
increased since they had lower
frequency change between pixels. To account for this, I implemented an image pyramid
function to
speed up alignment and ensure that it worked across all image sizes.
To construct this image pyramid, I created a mipmap-like collection of rescaled versions
of the input channel and the channel to
compare it to. I downsampled the input
channels by a factor of two, stored them downsampled channels, then repeated
the process
until the downsampled input channel was small enough to accurately
align with the downsampled compare channel using
displacement vectors with changes in
x being from the range -15 to 15 and changes in y from the range -15 to 15. Once I had
the
displacement vector at the lowest resolution in the pyramid, I multiplied the
displacement vector by a factor of 2, applied the
transition to the input channel
one resolution layer above it, then tested aligning the input channel at this layer
with the output layer
at the same layer using displacement vectors with changes in
x being from the range -3 to 3 and changes in y from the range -3 to 3. I
lowered the
ranges of values that we choose from because the adjustments we need to make after
aligning one layer below are small
(and the program will run faster with a smaller
range of tested displacement vectors). I then add these displacements to the previous
displacement vector, multipy the displacement vector by a factor of 2, and iteratively
repeat the process on all levels of the image
pyramid until we reach the highes resolution
channels. Once the program reaches the highest resolution channels, they should
align
nicely when translated by the total accumulated displacement vector.
By following this algorithm, I was able to align images that
normally took minutes to
compute in less than 10 seconds.
This implemetation worked for many images and was fast, but for some images it failed to
align images properly. Because of this, I
decided to implement edge detection and
image normalization to improve my accuracy. See the "Bells and Whistles" section
for more
details.
Result on example images

=== PAGE 2 ===
9/9/22, 9:04 PM
CS 194-26 Project 1
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj1/cs194-26-ahn/
2/9
The following is the result of my algorithm on all the provided example images:
cathedral.tif
Before displacement
After displacing G and R channels by
G: (2, 4)
R: (2, 12)
church.tif
Before displacement
After displacing G and R channels by
G: (0, 24)
R: (0, 62)
emir.tif
Before displacement
After displacing G and R channels by
G: (24, 48)
R: (40, 106)

=== PAGE 3 ===
9/9/22, 9:04 PM
CS 194-26 Project 1
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj1/cs194-26-ahn/
3/9
harvesters.tif
Before displacement
After displacing G and R channels by
G: (18, 60)
R: (10, 124)
icon.tif
Before displacement
After displacing G and R channels by
G: (16, 40)
R: (22, 88)
lady.tif
Before displacement
After displacing G and R channels by
G: (10, 56)
R: (12, 120)
melons.tif

=== PAGE 4 ===
9/9/22, 9:04 PM
CS 194-26 Project 1
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj1/cs194-26-ahn/
4/9
Before displacement
After displacing G and R channels by
G: (10, 80)
R: (12, 176)
monastery.jpg
Before displacement
After displacing G and R channels by
G: (0, -4)
R: (2, 2)
onion_church.tif
Before displacement
After displacing G and R channels by
G: (26, 52)
R: (36, 108)
sculpture.tif

=== PAGE 5 ===
9/9/22, 9:04 PM
CS 194-26 Project 1
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj1/cs194-26-ahn/
5/9
Before displacement
After displacing G and R channels by
G: (-10, 32)
R: (-26, 140)
self_portrait.tif
Before displacement
After displacing G and R channels by
G: (30, 80)
R: (36, 174)
three_generations.tif
Before displacement
After displacing G and R channels by
G: (0, 60)
R: (0, 116)
tobolsk.jpg

=== PAGE 6 ===
9/9/22, 9:04 PM
CS 194-26 Project 1
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj1/cs194-26-ahn/
6/9
Before displacement
After displacing G and R channels by
G: (2, 2)
R: (2, 6)
train.tif
Before displacement
After displacing G and R channels by
G: (0, 42)
R: (28, 84)
Result on extra images
The following is the result of my algorithm on some other images downloaded from the Prokudin-Gorskii collection.
lake.tif
Before displacement
After displacing G and R channels by
G: (6, -24)

=== PAGE 7 ===
9/9/22, 9:04 PM
CS 194-26 Project 1
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj1/cs194-26-ahn/
7/9
R: (8, -36)
shell.tif
Before displacement
After displacing G and R channels by
G: (4, 26)
R: (8, 110)
rock.tif
Before displacement
After displacing G and R channels by
G: (2, 44)
R: (2, 164)
Bells and Whistles
Channel Normalization
I implemented channel normalization in an attempt to make similaraties in the input
channel and compare channel to be more
apparent. Here's an example of a channel before
and after normalization.

=== PAGE 8 ===
9/9/22, 9:04 PM
CS 194-26 Project 1
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj1/cs194-26-ahn/
8/9
Before normalize
After normalize
Edge Detection
I implemented Edge Detection by referencing a lecture on the topic I found at
https://www.cse.psu.edu/~rtc12/CSE486/lecture02.pdf.
This approach involves taking
two partial derivatives in the x and y direction, then using the magnitude of
those partial derivative
channels edge detect! I found that it worked best when I
ignored the y direction. Results are as follows:
Input channel
Ix = Partial derivative wrt x
Iy = Skipping partial derivative wrt y
Magnitude of gradient (Ix^2 + Iy^2)

=== PAGE 9 ===
9/9/22, 9:04 PM
CS 194-26 Project 1
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj1/cs194-26-ahn/
9/9
After normalization
Result after applying to G and R
Bells and Whistles Results
Alltogether, my extra work paid off!
Before
After
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

const B = "/blog/recolorizing/images";
const ACCENT = "#8B1A2B";

export function RecolorizingContent() {
  return (
    <div>
      <BlogSection title="Overview" accent={ACCENT}>
        <BlogParagraph>
          In the early 1900s, Sergei Mikhailovich Prokudin-Gorskii traveled the Russian Empire
          photographing everything he saw — in color. Since color photography didn't exist yet,
          he captured each scene three times through red, green, and blue filters. His hypothesis:
          project all three images together to reconstruct full color. The goal of this project is to
          take those individual R, G, B channel photographs and algorithmically align them into
          a single color image.
        </BlogParagraph>
      </BlogSection>

      <BlogDivider />

      <BlogSection title="Approach" accent={ACCENT}>
        <BlogSubsection title="Exhaustive Search Alignment">
          <BlogParagraph>
            The first step is splitting each scan into three channels: R, G, and B. To align two
            channels, an exhaustive search translates one channel over every (x, y) displacement
            vector in the range [−15, 15]. At each displacement, the alignment quality is scored
            using normalized cross-correlation (NCC). NCC outperformed Sum of Squared Differences
            (SSD) in practice.
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="Image Pyramid">
          <BlogParagraph>
            Exhaustive search works for small images (256×256), but on larger scans it becomes
            too slow and loses accuracy because the fixed displacement range becomes inadequate.
            To handle this, an image pyramid (mipmap-like) is constructed by repeatedly downsampling
            each channel by 2×. Alignment starts at the smallest resolution, then the displacement
            vector is scaled up and refined at each successive level using a smaller range [−3, 3].
            This brings large-image alignment time from minutes down to under 10 seconds.
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="Bells & Whistles: Edge Detection &amp; Normalization">
          <BlogParagraph>
            For images where the pyramid approach struggled, edge detection was added as a
            preprocessing step. Partial derivatives in x and y produce a gradient magnitude image,
            which makes edges much more salient for the NCC metric. Channel normalization further
            improves accuracy by making pixel intensity distributions more consistent across channels.
          </BlogParagraph>
        </BlogSubsection>
      </BlogSection>

      <BlogDivider />

      <BlogSection title="Results — Provided Examples" accent={ACCENT}>
        <BlogParagraph>
          Below are a selection of before-and-after results. Each "before" shows the unaligned
          channel stack; "after" shows the final aligned color image.
        </BlogParagraph>

        <BlogCallout accent={ACCENT}>
          Displacements are (x, y) pixel offsets applied to the G and R channels to align them
          to the B channel.
        </BlogCallout>

        <BlogFigureGrid
          figures={[
            { src: `${B}/page2_img3.jpeg`, label: "cathedral — before" },
            { src: `${B}/page2_img4.jpeg`, label: "cathedral — after (G: 2,4  R: 2,12)" },
            { src: `${B}/page2_img5.jpeg`, label: "church — before" },
            { src: `${B}/page2_img6.jpeg`, label: "church — after (G: 0,24  R: 0,62)" },
          ]}
          caption="Cathedral and Church: before/after alignment"
        />

        <BlogFigureGrid
          figures={[
            { src: `${B}/page3_img1.jpeg`, label: "emir — before" },
            { src: `${B}/page3_img2.jpeg`, label: "emir — after (G: 24,48  R: 40,106)" },
            { src: `${B}/page3_img3.jpeg`, label: "harvesters — before" },
            { src: `${B}/page3_img4.jpeg`, label: "harvesters — after (G: 18,60  R: 10,124)" },
          ]}
          caption="Emir and Harvesters"
        />

        <BlogFigureGrid
          figures={[
            { src: `${B}/page5_img1.jpeg`, label: "self portrait — before" },
            { src: `${B}/page5_img2.jpeg`, label: "self portrait — after (G: 30,80  R: 36,174)" },
            { src: `${B}/page5_img3.jpeg`, label: "three generations — before" },
            { src: `${B}/page5_img4.jpeg`, label: "three generations — after (G: 0,60  R: 0,116)" },
          ]}
          caption="Self Portrait and Three Generations"
        />

        <BlogFigureGrid
          figures={[
            { src: `${B}/page6_img3.jpeg`, label: "train — before" },
            { src: `${B}/page6_img4.jpeg`, label: "train — after (G: 0,42  R: 28,84)" },
            { src: `${B}/page4_img5.jpeg`, label: "onion church — before" },
            { src: `${B}/page4_img6.jpeg`, label: "onion church — after (G: 26,52  R: 36,108)" },
          ]}
          caption="Train and Onion Church"
        />
      </BlogSection>

      <BlogDivider />

      <BlogSection title="Results — Extra Images" accent={ACCENT}>
        <BlogParagraph>
          The algorithm was also tested on additional images downloaded directly from the
          Prokudin-Gorskii collection.
        </BlogParagraph>

        <BlogFigureGrid
          figures={[
            { src: `${B}/page7_img1.jpeg`, label: "lake — before" },
            { src: `${B}/page7_img2.jpeg`, label: "lake — after (G: 6,−24  R: 8,−36)" },
            { src: `${B}/page7_img3.jpeg`, label: "shell — before" },
            { src: `${B}/page7_img4.jpeg`, label: "shell — after (G: 4,26  R: 8,110)" },
          ]}
          caption="Lake and Shell from the Prokudin-Gorskii collection"
        />
      </BlogSection>

      <BlogDivider />

      <BlogSection title="Bells &amp; Whistles Results" accent={ACCENT}>
        <BlogParagraph>
          After applying channel normalization and edge detection preprocessing, alignment accuracy
          improved significantly on challenging images like Emir (whose clothing has very different
          intensity profiles across channels).
        </BlogParagraph>
        <BlogFigureGrid
          figures={[
            { src: `${B}/page9_img3.jpeg`, label: "before extra processing" },
            { src: `${B}/page9_img4.jpeg`, label: "after normalization + edge detection" },
          ]}
          caption="Effect of normalization and edge detection on a difficult image"
        />
      </BlogSection>
    </div>
  );
}

```

## Output

Return the complete, updated `src/blog/computer-vision/recolorizing/index.tsx`. No truncation — include every section.
