# Task: Update `mesh-editor` blog post to be 1:1 with the PDF

## Context

You are updating the blog post for **Mesh Editor** to be a complete, 1:1 match with the original PDF write-up.

**Files involved:**
- PDF: `public/blog/computer-graphics/mesh-editor/pdfs/mesh_editor.pdf`
- Blog post source: `src/blog/computer-graphics/mesh-editor/index.tsx`
- Images base path: `/blog/computer-graphics/mesh-editor/images/` (used as the `B` constant)

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

- The `const B = "/blog/mesh-editor/images"` line must stay exactly as-is
- All image srcs: `` `${B}/filename.ext` ``
- Accent color for this project: `#4B1D6B`
- Exported function name must remain: `MeshEditorContent`

## Available images (71 total)

Filenames follow the pattern `page{N}_img{M}.ext` — N is the PDF page, M is image index on that page.
Cross-reference with the PDF text below to determine which image belongs in each section.

```
page10_img1.png
page10_img2.png
page10_img3.png
page10_img4.png
page1_img1.png
page1_img2.png
page2_img1.png
page2_img10.png
page2_img2.png
page2_img3.png
page2_img4.png
page2_img5.png
page2_img6.png
page2_img7.png
page2_img8.png
page2_img9.png
page3_img1.png
page3_img2.png
page3_img3.png
page3_img4.png
page3_img5.png
page4_img1.png
page4_img2.png
page4_img3.png
page4_img4.png
page4_img5.png
page4_img6.png
page4_img7.png
page4_img8.png
page4_img9.png
page5_img1.png
page5_img2.png
page5_img3.png
page5_img4.png
page5_img5.png
page5_img6.png
page5_img7.png
page5_img8.png
page6_img1.png
page6_img2.png
page6_img3.png
page6_img4.png
page6_img5.png
page6_img6.png
page6_img7.png
page6_img8.png
page6_img9.png
page7_img1.png
page7_img10.png
page7_img2.png
page7_img3.png
page7_img4.png
page7_img5.png
page7_img6.png
page7_img7.png
page7_img8.png
page7_img9.png
page8_img1.png
page8_img2.png
page8_img3.png
page8_img4.png
page8_img5.png
page8_img6.png
page9_img1.png
page9_img2.png
page9_img3.png
page9_img4.png
page9_img5.png
page9_img6.png
page9_img7.png
page9_img8.png
```

## Full PDF text (all pages)

```
=== PAGE 1 ===
3/2/22, 12:36 AM
CS 184 Mesh Editor
127.0.0.1:5500/docs/index.html
1/10
CS 184: Computer Graphics and Imaging, Spring 2020
Project 2: Mesh Editor
Ethan Gnibus, CS184-gutter
Overview
Give a high-level overview of what you implemented in this project. Think about what you've built as a whole.
Share your thoughts on
what interesting things you've learned from completing the project.
In this project, I built some systems that are helpful to do geometric modelling in 2d and 3d. I implemented Bezier Curves,
Bezier
Surfaces which help turn control points into smooth lines. I also updated a 3d mesh codebase to support smooth shading,
edge flips,
edge splits, and loop subdivision to upsample the mesh. I really like Blender so I thought this project was really cool.
Section I: Bezier Curves and Surfaces
Part 1: Bezier curves with 1D de Casteljau subdivision
Briefly explain de Casteljau's algorithm and how you implemented it in order to evaluate Bezier curves.
Casteljau's algorithm takes in a set of control points and outputs a smooth curve (Bezier curve) that can be manipulated by moving the
control points.
I implemented this algorithm by recursively finding midpoints between pairs of control points. This ratio was defined as
t, where t is in the range [0, 1].
I start with N control points. between each pair of control points, I find a new point that is at the
position t would be if the first old point is 0
and the second old point is 1 (the new point is somewhere on the line between the old
point and the new point, governed by t). I then repeat this
same process on these N-1 new points until I am left with a single point.
This point represents the point "t" of the way through our final Bezier curve.
I draw this point to the screen. I then repreat this process
with a dense number of "t's" so that I am left with a curve!
Take a look at the provided .bzc files and create your own Bezier curve with 6 control points of your choosing. Use this Bezier curve for
your screenshots below.
We will apply de Casteljau's to the points above to get the green line above.
Show screenshots of each step / level of the evaluation from the original control points down to the final evaluated point. Press E to
step through. Toggle C to show the completed Bezier curve as well.

=== PAGE 2 ===
3/2/22, 12:36 AM
CS 184 Mesh Editor
127.0.0.1:5500/docs/index.html
2/10
Zero iterations.
One iteration.
Two iterations.
Three iterations.
Four Iterations.
Five iterations.
Show a screenshot of a slightly different Bezier curve by moving the original control points around and modifying the parameter tt via
mouse scrolling.
Below I will show a series of pictures of the same curve evaluated at different values of t.
t at 0.
t around 0.3.

=== PAGE 3 ===
3/2/22, 12:36 AM
CS 184 Mesh Editor
127.0.0.1:5500/docs/index.html
3/10
t around 0.7.
t close to 1.
Part 2: Bezier surfaces with separable 1D de Casteljau subdivision
Briefly explain how de Casteljau algorithm extends to Bezier surfaces and how you implemented it in order to evaluate Bezier
surfaces.
Above we just showed why de Casteljau's is useful to represent 2d Bezier curves. We could represent 3d Bezier surfaces
by applying
de Casteljau's to "patches" of points. To do this we break up our patch of points into its rows, and apply
de Casteljau to each individual
row until we get the point specifiec at (u,v). To do this, we have the function
BezierPatch::evaluate(...). In evalueate, we iterate through
the rows of our patch and use BezierPatch::evaluate1D(...)
specified at u to get back a list of control points at u. We then use
BezierPatch::evaluate1D(...) specified at v to
get the point at v that lies on the line of control points specified at u.
BezierPatch::evaluate1D(...) repeatedly
applies de Casteljau using BezierPatch::evaluateStep(...) until we get one point back.
BezierPatch::evaluateStep(...)
calculates one step of de Casteljau just like in Part 1.
Show a screenshot of bez/teapot.bez (not .dae) evaluated by your implementation.
The teapot above was construced by calculation Bezier Surfaces.
Section II: Sampling
Part 3: Average normals for half-edge meshes
Briefly explain how you implemented the area-weighted vertex normals.
To calculate area-weighted vertex normals, I found a triangle's three vertices using the mesh datastructures. Then I used
their
positions to get two vectors that I could use to find the area of the triangle. I used sqrt(x^2 + y^2 + z^2) to find
the area, then
multiplied the area by the cross product of the the two vectors to get a perpendicular vector. I then
took the norm of the
perpendicular vector and did this to every triangle that the provided vertex is a part of. I then took the
average of all these
perpendicular vectors to get the average normal.
Show screenshots of dae/teapot.dae (not .bez) comparing teapot shading with and without vertex normals.
Use Q to toggle default flat
shading and Phong shading.

=== PAGE 4 ===
3/2/22, 12:36 AM
CS 184 Mesh Editor
127.0.0.1:5500/docs/index.html
4/10
Flat shading with vertex normals.
Flat shading with vertex normals.
Flat shading with white shader.
Phong shading with white shader.
Flat shading with brown shader.
Phong shading with brown shader.
Part 4: Half-edge flip
Briefly explain how you implemented the edge flip operation and describe any interesting implementation / debugging tricks you have
used.
To implement edge flips, I loaded all vertices based on the left side of the image below using the mesh data structures. I then
reassigned
pointers based on the right side of the image. I found visually flipping edges and looking how the triangles line up on the
mesh useful for
debugging.
This piazza post was useful.
Show screenshots of a mesh before and after some edge flips.

=== PAGE 5 ===
3/2/22, 12:36 AM
CS 184 Mesh Editor
127.0.0.1:5500/docs/index.html
5/10
Before first diagonal flip.
After first diagonal flip.
After second diagonal flip.
After third diagonal flip.
Before first horizontal flip.
After 2 consecutive horizontal flips.
Before first vertical flip.
After first vertical flip.
Write about your eventful debugging journey, if you have experienced one.
I had a really hard time figuring out why my program was stuck in an infinate loop. I spent hours on piazza and ended up finding out
that I
declared everything as some variation of ______Iter& varibleName = ...; instead of ______Iter& varibleName = ...;. This meant that I
was
resetting pointers wrong when I did things like v0->halfedge() = h4;. Removing all the &'s fixed my problem!
Part 5: Half-edge split
Briefly explain how you implemented the edge split operation and describe any interesting implementation / debugging tricks you
have used.

=== PAGE 6 ===
3/2/22, 12:36 AM
CS 184 Mesh Editor
127.0.0.1:5500/docs/index.html
6/10
I used the same methodology as edge flip, but I used the diagram below as the right side of the image.
I drew this one myself!
Before first split.
After first split.
After second split.
Before third split.
After third split.
Before horizontal split.

=== PAGE 7 ===
3/2/22, 12:36 AM
CS 184 Mesh Editor
127.0.0.1:5500/docs/index.html
7/10
After horizontal split.
After lots of splits.
Show screenshots of a mesh before and after a combination of both edge splits and edge flips.
Before first split.
After first split.
After second split.
Before first flip.
After third split.
After second flip.

=== PAGE 8 ===
3/2/22, 12:36 AM
CS 184 Mesh Editor
127.0.0.1:5500/docs/index.html
8/10
After fourth split.
After third flip.
Write about your eventful debugging journey, if you have experienced one.
I actually ended up getting this problem first try. I think it's because I used the convention from the diagram I drew.
If you have implemented support for boundary edges, show screenshots of your implementation properly handling split operations
on boundary edges.
I did not implement.
Part 6: Loop subdivision for mesh upsampling
Briefly explain how you implemented the loop subdivision and describe any interesting implementation / debugging tricks you have
used.
To implement loop subdivision, I iterated through all edges and set all edges and vertices's ->isNew field to false, calculated new
vertex locations
based on proximal vertices, calculated updated old vertex locations using a different proximal equation, split edges
and assingned the midpoint's new
location based on what I calculated, flipped new edges that aren't on a preexisting line, then
updated the old vertex locations.
Take some notes, as well as some screenshots, of your observations on how meshes behave after loop subdivision.
What happens to
sharp corners and edges? Can you reduce this effect by pre-splitting some edges?
I observed that after subdivision with no pre-split, sharp corners and edges are rounded off. Differences in meshes
subdivided with
and without a pre-split can be seen below.
Before subdividing with no pre-split around the spout. After subdividing with no pre-split around the spout.
Before subdividing with pre-split around the spout.
After subdividing with pre-split around the spout.

=== PAGE 9 ===
3/2/22, 12:36 AM
CS 184 Mesh Editor
127.0.0.1:5500/docs/index.html
9/10
As we can see, in areas I pre-split, some more of the high frequency change is preserved. I CAN reduce this effect by presplitting.
The
subdivided mesh with pre-splitting looks far closer to the original mesh than the subdivided mesh with no pre-splitting.
This seemed
to happend with both sharp corners and edges in my research.
Load dae/cube.dae. Perform several iterations of loop subdivision on the cube.
Notice that the cube becomes slightly asymmetric
after repeated subdivisions.
Can you pre-process the cube with edge flips and splits so that the cube subdivides symmetrically?
Document these effects and explain why they occur. Also explain how your pre-processing helps alleviate the effects.
With our algorithm for subdivision, we find new vertex positions based on old vertex positions and move old vertex positions
based
on the positions of adjacent vertices. A mesh with low numbers of vertices will lose lots of information about where vertices
originally
are as the update and will dramatically change as seen below.
No Subdivision.
Subdivision 1.
Subdivision 2.
Subdivision 3.
Subdivision 4.
Subdivision 5.
To mitigate this, we will repetitively split so neighboring vertices update on adjacent vertices that are closer together. This will
mitigate
a good amount of the subdivision rounding as seen below.

=== PAGE 10 ===
3/2/22, 12:36 AM
CS 184 Mesh Editor
127.0.0.1:5500/docs/index.html
10/10
No Subdivision.
Subdivision 1.
Subdivision 2.
Subdivision 3.
As we could see, the cube's shape is retained much better. It would look even better if I split edges in a uniform way!
If you have implemented any extra credit extensions, explain what you did and document how they work with screenshots.
I did not.
Section III: Optional Extra Credit
Part 7: Design your own mesh!
Save your best polygon mesh as partsevenmodel.dae in your docs folder and show us a screenshot of the mesh in your write-up.
Not doing.
Include a series of screenshots showing your original mesh and your mesh after one and two rounds of subdivision.
If you have used
custom shaders, include screenshots of your mesh with those shaders applied as well.
Not doing.
Describe what you have done to enhance your mesh beyond the simple humanoid mesh described in the tutorial.
Not doing.
https://cal-cs184-student.github.io/sp22-project-webpages-ethangnibus/

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

const B = "/blog/mesh-editor/images";
const ACCENT = "#4B1D6B";

export function MeshEditorContent() {
  return (
    <div>
      <BlogSection title="Overview" accent={ACCENT}>
        <BlogParagraph>
          This project builds the geometric modeling infrastructure behind a 3D mesh editor —
          from Bezier curves all the way to Loop subdivision. The tools implemented here are the
          same operations that drive real-time modeling in software like Blender.
        </BlogParagraph>
      </BlogSection>

      <BlogDivider />

      <BlogSection title="Section I — Bezier Curves &amp; Surfaces" accent={ACCENT}>
        <BlogSubsection title="de Casteljau's Algorithm">
          <BlogParagraph>
            Casteljau's algorithm evaluates a Bezier curve at parameter t by recursively finding
            interpolated points between each pair of control points at ratio t, until a single
            point remains. Repeating this for many values of t traces out the full curve.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page2_img3.png`, label: "0 iterations" },
              { src: `${B}/page2_img4.png`, label: "1 iteration" },
              { src: `${B}/page2_img5.png`, label: "2 iterations" },
              { src: `${B}/page2_img6.png`, label: "final curve" },
            ]}
            caption="de Casteljau steps on a 6-point Bezier curve"
          />
        </BlogSubsection>

        <BlogSubsection title="Bezier Surfaces">
          <BlogParagraph>
            Extending de Casteljau's to 3D: apply the algorithm to each row of a patch of
            control points at parameter u, collecting one control point per row. Then apply the
            algorithm again to those points at parameter v to get the surface point at (u, v).
          </BlogParagraph>
          <BlogImage
            src={`${B}/page3_img1.png`}
            alt="Bezier surface teapot"
            caption="The Utah Teapot constructed from Bezier surface patches"
          />
        </BlogSubsection>
      </BlogSection>

      <BlogDivider />

      <BlogSection title="Section II — Half-Edge Mesh Operations" accent={ACCENT}>
        <BlogSubsection title="Area-Weighted Vertex Normals">
          <BlogParagraph>
            Smooth (Phong) shading requires per-vertex normals. These are computed as a
            weighted average of the normals of all adjacent triangles, weighted by triangle area.
            The result interpolates smoothly across the surface.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page3_img3.png`, label: "flat shading" },
              { src: `${B}/page3_img4.png`, label: "Phong shading" },
            ]}
            caption="Flat vs. Phong shading on the teapot — area-weighted normals produce the smooth look"
          />
        </BlogSubsection>

        <BlogSubsection title="Edge Flip">
          <BlogParagraph>
            Edge flip rotates a shared edge between two triangles by 90°, changing the mesh
            topology without adding or removing vertices. All half-edge pointers are reassigned
            explicitly from a diagram to ensure correctness.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page4_img2.png`, label: "before flip" },
              { src: `${B}/page4_img3.png`, label: "after 1 flip" },
              { src: `${B}/page4_img4.png`, label: "after 2 flips" },
              { src: `${B}/page4_img5.png`, label: "after 3 flips" },
            ]}
            caption="Sequential edge flips on the teapot mesh"
          />
        </BlogSubsection>

        <BlogSubsection title="Edge Split">
          <BlogParagraph>
            Edge split inserts a new vertex at the midpoint of an edge, dividing the two
            adjacent triangles into four. Like edge flip, all half-edge pointers are manually
            reassigned using a hand-drawn diagram.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page5_img3.png`, label: "before split" },
              { src: `${B}/page5_img4.png`, label: "after 1 split" },
              { src: `${B}/page5_img5.png`, label: "after 2 splits" },
              { src: `${B}/page5_img6.png`, label: "after 3 splits" },
            ]}
            caption="Sequential edge splits — new vertices appear at edge midpoints"
          />
        </BlogSubsection>

        <BlogSubsection title="Edge Flip + Split Combined">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page6_img4.png`, label: "before" },
              { src: `${B}/page6_img5.png`, label: "after splits" },
              { src: `${B}/page6_img6.png`, label: "after splits + flips" },
            ]}
            columns={3}
            caption="Combining splits and flips to reshape the mesh topology"
          />
        </BlogSubsection>
      </BlogSection>

      <BlogDivider />

      <BlogSection title="Loop Subdivision" accent={ACCENT}>
        <BlogParagraph>
          Loop subdivision upsamples a mesh by splitting every edge and repositioning vertices
          using a weighted average of their neighbors. It smooths sharp features — corners and
          edges are rounded. Pre-splitting edges before subdivision can preserve high-frequency
          detail in specific areas.
        </BlogParagraph>
        <BlogFigureGrid
          figures={[
            { src: `${B}/page8_img3.png`, label: "original — no pre-split" },
            { src: `${B}/page8_img4.png`, label: "subdivided — no pre-split" },
            { src: `${B}/page8_img5.png`, label: "original — with pre-split" },
            { src: `${B}/page8_img6.png`, label: "subdivided — with pre-split" },
          ]}
          caption="Pre-splitting around the teapot spout preserves the sharp rim during subdivision"
        />

        <BlogSubsection title="Cube Subdivision">
          <BlogParagraph>
            A cube subdivided naively becomes asymmetric because its initial topology has
            diagonal edges that break cube symmetry. Pre-splitting all edges to create a
            symmetric mesh gives a much more uniform result after subdivision.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page9_img1.png`, label: "no subdiv" },
              { src: `${B}/page9_img2.png`, label: "1 subdivision" },
              { src: `${B}/page9_img3.png`, label: "2 subdivisions" },
              { src: `${B}/page9_img4.png`, label: "3 subdivisions" },
            ]}
            caption="Loop subdivision on the cube: without pre-splitting, it becomes asymmetric"
          />
        </BlogSubsection>

        <BlogCallout accent={ACCENT}>
          Each subdivision step moves old vertex positions based on a weighted average of
          surrounding vertices — in sparse meshes this causes dramatic shape changes. More
          splits create denser neighborhoods, reducing the per-vertex influence and better
          preserving the original shape.
        </BlogCallout>
      </BlogSection>
    </div>
  );
}

```

## Output

Return the complete, updated `src/blog/computer-graphics/mesh-editor/index.tsx`. No truncation — include every section.
