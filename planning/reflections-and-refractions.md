# Task: Update `reflections-and-refractions` blog post to be 1:1 with the PDF

## Context

You are updating the blog post for **Reflections & Refractions** to be a complete, 1:1 match with the original PDF write-up.

**Files involved:**
- PDF: `public/blog/computer-graphics/reflections-and-refractions/pdfs/pathtracer_extended.pdf`
- Blog post source: `src/blog/computer-graphics/reflections-and-refractions/index.tsx`
- Images base path: `/blog/computer-graphics/reflections-and-refractions/images/` (used as the `B` constant)

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

- The `const B = "/blog/reflections-and-refractions/images"` line must stay exactly as-is
- All image srcs: `` `${B}/filename.ext` ``
- Accent color for this project: `#4B1D6B`
- Exported function name must remain: `ReflectionsAndRefractionsContent`

## Available images (20 total)

Filenames follow the pattern `page{N}_img{M}.ext` — N is the PDF page, M is image index on that page.
Cross-reference with the PDF text below to determine which image belongs in each section.

```
page1_img2.png
page1_img3.png
page1_img4.png
page2_img1.png
page2_img2.png
page2_img3.png
page3_img1.png
page3_img2.png
page3_img3.png
page3_img4.png
page4_img1.png
page4_img2.png
page4_img3.png
page4_img4.png
page4_img5.png
page4_img6.png
page5_img1.png
page5_img2.png
page5_img3.png
page5_img4.png
```

## Full PDF text (all pages)

```
=== PAGE 1 ===
4/1/22, 8:14 PM
Ethan Gnibus | CS 184
127.0.0.1:5500/docs/index.html
1/5
Assignment 3: PathTracer
Ethan Gnibus
In this project, I extended last projects bare bones raytracer to support glass materials,
mirror materials, and to simulate a thin camera
lens that could be used to support depth of field.
This entailed implementing a reflect function, the sample_f() method for a
MirrorBDSF class,
refraction, the sample_f() for a GlassBDSF class, creating a thin lens using geometry, and generating
rays for the
thin lens for pixel sampling.
Part 1: Mirror and Glass Materials
Describe what you did in Part 1. etc...
In Part 1, I made a reflect equation for BSDFs, implemented sample_f for MirrorBSDFs that uses the reflect equation, made a
refraction function for BSDFs,
sample_f for RefractionBSDFs that uses the refraction equation, and a sample_f
function for
GlassBSDFs that uses both the reflection and the refraction.
Show a sequence of six images of scene
CBspheres.dae rendered with
max_ray_depth set to 0, 1, 2, 3, 4, 5,
and 100. The other
settings
should be at least 64 samples per pixel
and 4 samples per light.
I rendered the following with 128 samples per pixel and 4 samples per light.
Ray depth of 0.
Ray depth of 1.
Ray depth of 2.
Ray depth of 3.

=== PAGE 2 ===
4/1/22, 8:14 PM
Ethan Gnibus | CS 184
127.0.0.1:5500/docs/index.html
2/5
Ray depth of 4.
Ray depth of 5.
Ray depth of 100.
As we can see, as the ray depth increases the quality of reflections and refractions increases
(especially when a ray bounces off
multiple objects that reflect or refract).
Point out the new multibounce effects that appear in each image.
At ray depth of 0, no light falls on the scene but we get direct lighting from the light.
At ray depth of 1, direct light falls onto the
scene. We see the light's reflection on the
spheres but otherwise the spheres don't reflect anything else from the scene. Additionally,
no
light bounces to illuminate the ceiling because there is only one bounce.
At ray depth of 2, we can see relfections on both spheres, but
no refraction. We also can
see that there is global illumination and that the ceiling is illuminated.
At ray depth of 3, we can see both
refraction and relflection. However, we can only see
reflection in the glass sphere viewed from the mirror sphere.
At ray depth of 4,
we can see both reflection and refraction in the glass sphere viewed from
the mirror sphere.
At ray depth of 5 global illumination
improves.
At ray depth of 100, global illumination improves greatly.
Explain how these bounce numbers relate to the particular effects that appear.
At ray depth of 0, no light shows up other than the source because we can't bounce a Ray
off of any part of the scene.
At ray depth 1,
we only see direct light and only the reflection of light shows up because
we can bounce 1 light ray. Since it takes 1 depth to render
direct lighting in the scene, it will
take 1 more bounce to render direct lighting in reflections.
At ray depth of 2, we can that this is why
the reflections only show direct illumination even though
the scene is globally illuminated. We can also note that the glass sphere
when viewed from the mirror sphere is at zero bounce lighting now.
Since the glass sphere when viewed from the mirror sphere
should progress one step, we notice that it
is now at direct lighting and reflects. This occurs because objects n bounces away from the
scene's
ray depth will reflect the scene's global illumination n steps later.
We could also notice that a ray depth of 3 means that we get
refraction as well as reflection in the glass.
This occurs because refraction requires two bounces while reflection only requires one.
This logic holds when we are able to notice refraction in the glass sphere when viewed from the mirror sphere at ray depth of 4. This
pattern will recurse and recurse as ray depth increases. The upgraded quality of global
illumination is because we have more bounces
so pixels are more likely to converge.
Part 4: Depth of Field
Describe what you did in Part 4. etc...

=== PAGE 3 ===
4/1/22, 8:14 PM
Ethan Gnibus | CS 184
127.0.0.1:5500/docs/index.html
3/5
In Part 4 I upgraded project 3-1's camera into one that can support thin-lens simulation.
This enabled my raytracer to focus on specific
parts of the scene based on depth. A user
could make the radius of the lens larger to make the image more blurry and adjust the
depth
of the focal point to focus on a certian spot.
In a few sentences, explain the differences
between a pinhole camera model
and a thin-lens camera model.
The main difference between a pinhole camera model and a thin-lens camera model
is that the pinhole camera model renders every
pixel in perfect focus while a
thin-lens camera model simulates the finite aperatures that appear everywhere
in the real world from
cameras to our eyes. The thin-lens camera model that
I implemented supports changing the focal distance and lens radius. This means
that our thin-lens camera model can change the distance that the camera will focus
on in the scene and how blurry the parts that aren't
focused on are. If we set the
lens radius of the thin-lens model, we can also simulate the pinhole camera model!
Show a "focus stack" where you focus at 4
visibly different depths through a scene.
Below I compare the differences between CBbunny.dae rendered with 256 samples per pixel,
16 light rays, 13 bounces, and an
aperture size of 0.30 when I change the depth to focus on.
-d 3.75
-d 4.00
-d 4.25
-d 4.50

=== PAGE 4 ===
4/1/22, 8:14 PM
Ethan Gnibus | CS 184
127.0.0.1:5500/docs/index.html
4/5
-d 4.75
-d 5.00
-d 5.25
-d 5.50
Here we can see the focus depth flow over the CBbunny! Note how
the focus shifts from in front of the bunny at d values around
3.00,
on the bunny at d values around 4.75, and behind the bunny
around 5.50.
Show a sequence of 4 pictures with visibly
different aperture sizes,
all focused at the same point in a scene.
Below I compare the differences between CBbunny.dae rendered with 256 samples per pixel,
16 light rays, 13 bounces, and a depth of
4.56 when I change aperture sizes.
-b 0.00
-b 0.05

=== PAGE 5 ===
4/1/22, 8:14 PM
Ethan Gnibus | CS 184
127.0.0.1:5500/docs/index.html
5/5
-b 0.10
-b 0.25
-b 0.50
-b 1.00
As we can see, the renders start as a pinhole model when b = 0.00,
then they get progressively more blurry as the value of b increases.
At around b = 0.10, we get a nice effect where the bunny is in focus
and the background is blurred. This value is dependent on the
relative
position of the scene in comparison to the camera.
The website for my writeup is https://cal-cs184-student.github.io/sp22-project-webpages-ethangnibus/

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

const B = "/blog/reflections-and-refractions/images";
const ACCENT = "#4B1D6B";

export function ReflectionsAndRefractionsContent() {
  return (
    <div>
      <BlogSection title="Overview" accent={ACCENT}>
        <BlogParagraph>
          This project extends the pathtracer with two new material types — mirror and glass —
          and a thin-lens camera model for depth of field. Mirrors use perfect reflection;
          glass uses Snell's Law for refraction and Schlick's approximation to decide whether
          each ray reflects or refracts.
        </BlogParagraph>
      </BlogSection>

      <BlogDivider />

      <BlogSection title="Part 1 — Mirror &amp; Glass Materials" accent={ACCENT}>
        <BlogParagraph>
          Mirror BSDFs reflect rays perfectly using the standard reflect equation. Glass BSDFs
          implement full refraction via Snell's Law, with total internal reflection handled when
          the ray hits the surface at a shallow angle. Schlick's approximation probabilistically
          decides whether each ray reflects or refracts, weighted by the Fresnel coefficient.
        </BlogParagraph>
        <BlogFigureGrid
          figures={[
            { src: `${B}/page1_img2.png`, label: "depth 0 — direct light only" },
            { src: `${B}/page1_img3.png`, label: "depth 1 — direct illumination" },
            { src: `${B}/page1_img4.png`, label: "depth 2 — reflections visible" },
            { src: `${B}/page2_img1.png`, label: "depth 3 — refraction appears" },
            { src: `${B}/page2_img2.png`, label: "depth 4 — full glass behavior" },
            { src: `${B}/page2_img3.png`, label: "depth 100 — converged" },
          ]}
          columns={3}
          caption="CBspheres.dae: max ray depth 0→100. Reflections need depth≥2; refraction needs depth≥3."
        />
        <BlogCallout accent={ACCENT}>
          At depth 2: both spheres reflect their environment but the glass sphere shows no
          refraction yet. At depth 3: the glass sphere finally refracts — it takes two bounces
          to enter and exit the glass medium. Objects visible through the mirror sphere need
          one extra bounce, explaining the one-step delay in what they show.
        </BlogCallout>
      </BlogSection>

      <BlogDivider />

      <BlogSection title="Part 4 — Depth of Field (Thin Lens)" accent={ACCENT}>
        <BlogParagraph>
          A thin-lens camera replaces the pinhole model. Rays are sampled across a circular
          lens aperture and converged to a focal plane at a specified distance. Objects at the
          focal distance are sharp; objects in front or behind are blurred proportionally to
          lens radius.
        </BlogParagraph>

        <BlogSubsection title="Focus Stack">
          <BlogParagraph>
            Sweeping the focal distance across the scene at a fixed aperture of 0.30 shifts
            which depth plane is in focus.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page3_img1.png`, label: "d = 3.75 — in front of bunny" },
              { src: `${B}/page3_img2.png`, label: "d = 4.25 — bunny's face" },
              { src: `${B}/page3_img3.png`, label: "d = 4.75 — bunny's body" },
              { src: `${B}/page3_img4.png`, label: "d = 5.50 — behind bunny" },
            ]}
            caption="Focus stack: changing focal distance sweeps the sharp plane through the scene"
          />
        </BlogSubsection>

        <BlogSubsection title="Aperture Study">
          <BlogParagraph>
            At the same focal distance, increasing the lens radius increases depth of field
            blur. At b=0.00, the camera behaves as a pinhole (infinite depth of field).
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page4_img1.png`, label: "b = 0.00 — pinhole (sharp everywhere)" },
              { src: `${B}/page4_img2.png`, label: "b = 0.05 — slight blur" },
              { src: `${B}/page4_img3.png`, label: "b = 0.10 — bokeh effect" },
              { src: `${B}/page4_img5.png`, label: "b = 0.50 — heavy blur" },
              { src: `${B}/page5_img1.png`, label: "b = 1.00 — very blurry" },
            ]}
            caption="Aperture study at fixed focus depth — larger aperture = shallower depth of field"
          />
        </BlogSubsection>
      </BlogSection>
    </div>
  );
}

```

## Output

Return the complete, updated `src/blog/computer-graphics/reflections-and-refractions/index.tsx`. No truncation — include every section.
