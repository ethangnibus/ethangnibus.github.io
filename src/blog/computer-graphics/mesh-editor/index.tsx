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

const B = "/blog/learning-graphics/mesh-editor/images";

const ACCENT = BLOG_CATEGORY_ACCENTS.graphics;

export function MeshEditorContent() {
  return (
    <div>
      <BlogSection sectionId="overview" accent={ACCENT}>
        <BlogParagraph>
          In this project, I built some systems that are helpful for geometric modeling in 2D
          and 3D. I implemented Bezier Curves and Bezier Surfaces, which help turn control
          points into smooth lines. I also updated a 3D mesh codebase to support smooth shading,
          edge flips, edge splits, and loop subdivision to upsample the mesh. I really like
          Blender so I thought this project was really cool.
        </BlogParagraph>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="bezier-curves-and-surfaces" accent={ACCENT}>
        <BlogSubsection title="Part 1: Bezier Curves with 1D de Casteljau Subdivision">
          <BlogParagraph>
            Casteljau's algorithm takes in a set of control points and outputs a smooth curve
            (Bezier curve) that can be manipulated by moving the control points. I implemented
            this algorithm by recursively finding midpoints between pairs of control points. This
            ratio was defined as t, where t is in the range [0, 1].
          </BlogParagraph>
          <BlogParagraph>
            I start with N control points. Between each pair of control points, I find a new
            point that is at the position t would be if the first old point is 0 and the second
            old point is 1 (the new point is somewhere on the line between the old points,
            governed by t). I then repeat this same process on these N-1 new points until I am
            left with a single point. This point represents the point "t" of the way through our
            final Bezier curve. I draw this point to the screen, then repeat this process with a
            dense number of t's so that I am left with a curve!
          </BlogParagraph>
          <BlogParagraph>
            We will apply de Casteljau's to the points above to get the green line above. Below
            are screenshots of each step of the evaluation from the original control points down
            to the final evaluated point.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page2_img1.png`, label: "Zero iterations", alt: "Zero iterations of de Casteljau" },
              { src: `${B}/page2_img2.png`, label: "One iteration", alt: "One iteration of de Casteljau" },
              { src: `${B}/page2_img3.png`, label: "Two iterations", alt: "Two iterations of de Casteljau" },
              { src: `${B}/page2_img4.png`, label: "Three iterations", alt: "Three iterations of de Casteljau" },
              { src: `${B}/page2_img5.png`, label: "Four iterations", alt: "Four iterations of de Casteljau" },
              { src: `${B}/page2_img6.png`, label: "Five iterations", alt: "Five iterations of de Casteljau" },
            ]}
            columns={3}
            caption="Each step of de Casteljau subdivision on a 6-point Bezier curve"
          />
          <BlogParagraph>
            Below is a slightly different Bezier curve showing the same curve evaluated at
            different values of t by moving the original control points around and modifying the
            parameter t via mouse scrolling.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page2_img7.png`, label: "t = 0", alt: "Bezier curve at t=0" },
              { src: `${B}/page2_img8.png`, label: "t ≈ 0.3", alt: "Bezier curve at t≈0.3" },
              { src: `${B}/page2_img9.png`, label: "t ≈ 0.7", alt: "Bezier curve at t≈0.7" },
              { src: `${B}/page2_img10.png`, label: "t ≈ 1", alt: "Bezier curve at t≈1" },
            ]}
            caption="The same Bezier curve evaluated at different values of t"
          />
        </BlogSubsection>

        <BlogSubsection title="Part 2: Bezier Surfaces with Separable 1D de Casteljau Subdivision">
          <BlogParagraph>
            Above we showed why de Casteljau's is useful to represent 2D Bezier curves. We can
            represent 3D Bezier surfaces by applying de Casteljau's to "patches" of points. To
            do this we break up our patch of points into its rows, and apply de Casteljau to each
            individual row until we get the point specified at (u, v).
          </BlogParagraph>
          <BlogParagraph>
            In <code>BezierPatch::evaluate(...)</code>, we iterate through the rows of our patch
            and use <code>BezierPatch::evaluate1D(...)</code> specified at u to get back a list
            of control points at u. We then use <code>BezierPatch::evaluate1D(...)</code>{" "}
            specified at v to get the point at v that lies on the line of control points
            specified at u. <code>BezierPatch::evaluate1D(...)</code> repeatedly applies de
            Casteljau using <code>BezierPatch::evaluateStep(...)</code> until we get one point
            back. <code>BezierPatch::evaluateStep(...)</code> calculates one step of de Casteljau
            just like in Part 1.
          </BlogParagraph>
          <BlogImage
            src={`${B}/page3_img3.png`}
            alt="Bezier surface teapot"
            caption="The Utah Teapot constructed by calculating Bezier Surfaces"
          />
        </BlogSubsection>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="sampling" accent={ACCENT}>
        <BlogSubsection title="Part 3: Average Normals for Half-Edge Meshes">
          <BlogParagraph>
            To calculate area-weighted vertex normals, I found a triangle's three vertices using
            the mesh data structures. Then I used their positions to get two vectors that I could
            use to find the area of the triangle. I used sqrt(x² + y² + z²) to find the area,
            then multiplied the area by the cross product of the two vectors to get a
            perpendicular vector. I then took the norm of the perpendicular vector and did this
            to every triangle that the provided vertex is a part of. I then took the average of
            all these perpendicular vectors to get the average normal.
          </BlogParagraph>
          <BlogParagraph>
            Below are screenshots of dae/teapot.dae comparing teapot shading with and without
            vertex normals.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page3_img4.png`, label: "Flat shading with vertex normals", alt: "Flat shading with vertex normals" },
              { src: `${B}/page3_img5.png`, label: "Flat shading with vertex normals", alt: "Flat shading with vertex normals (2)" },
              { src: `${B}/page4_img1.png`, label: "Flat shading — white shader", alt: "Flat shading with white shader" },
              { src: `${B}/page4_img2.png`, label: "Phong shading — white shader", alt: "Phong shading with white shader" },
              { src: `${B}/page4_img3.png`, label: "Flat shading — brown shader", alt: "Flat shading with brown shader" },
              { src: `${B}/page4_img4.png`, label: "Phong shading — brown shader", alt: "Phong shading with brown shader" },
            ]}
            columns={2}
            caption="Flat vs. Phong shading on the teapot — area-weighted normals produce the smooth look"
          />
        </BlogSubsection>

        <BlogSubsection title="Part 4: Half-Edge Flip">
          <BlogParagraph>
            To implement edge flips, I loaded all vertices based on the left side of a reference
            diagram using the mesh data structures. I then reassigned pointers based on the right
            side of the image. I found visually flipping edges and looking at how the triangles
            line up on the mesh useful for debugging.
          </BlogParagraph>
          <BlogImage
            src={`${B}/page4_img5.png`}
            alt="Edge flip diagram"
            caption="Reference diagram for pointer reassignment during edge flips"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page4_img6.png`, label: "Before first diagonal flip", alt: "Before first diagonal flip" },
              { src: `${B}/page4_img7.png`, label: "After first diagonal flip", alt: "After first diagonal flip" },
              { src: `${B}/page4_img8.png`, label: "After second diagonal flip", alt: "After second diagonal flip" },
              { src: `${B}/page4_img9.png`, label: "After third diagonal flip", alt: "After third diagonal flip" },
            ]}
            caption="Sequential diagonal edge flips on the teapot mesh"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page5_img1.png`, label: "Before first horizontal flip", alt: "Before first horizontal flip" },
              { src: `${B}/page5_img2.png`, label: "After 2 consecutive horizontal flips", alt: "After 2 consecutive horizontal flips" },
              { src: `${B}/page5_img3.png`, label: "Before first vertical flip", alt: "Before first vertical flip" },
              { src: `${B}/page5_img4.png`, label: "After first vertical flip", alt: "After first vertical flip" },
            ]}
            caption="Horizontal and vertical edge flips"
          />
          <BlogCallout accent={ACCENT}>
            Debugging note: I had a really hard time figuring out why my program was stuck in an
            infinite loop. I spent hours on Piazza and ended up finding that I declared everything
            as some variation of <code>______Iter&amp; variableName = ...</code> instead of{" "}
            <code>______Iter variableName = ...</code>. This meant I was resetting pointers wrong
            when doing things like <code>v0-&gt;halfedge() = h4</code>. Removing all the{" "}
            <code>&amp;</code>'s fixed the problem!
          </BlogCallout>
        </BlogSubsection>

        <BlogSubsection title="Part 5: Half-Edge Split">
          <BlogParagraph>
            I used the same methodology as edge flip, but I used the diagram below as the right
            side of the image. I drew this one myself!
          </BlogParagraph>
          <BlogImage
            src={`${B}/page6_img1.png`}
            alt="Hand-drawn edge split diagram"
            caption="Hand-drawn diagram used for pointer reassignment during edge splits"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page6_img2.png`, label: "Before first split", alt: "Before first split" },
              { src: `${B}/page6_img3.png`, label: "After first split", alt: "After first split" },
              { src: `${B}/page6_img4.png`, label: "After second split", alt: "After second split" },
              { src: `${B}/page6_img5.png`, label: "Before third split", alt: "Before third split" },
              { src: `${B}/page6_img6.png`, label: "After third split", alt: "After third split" },
              { src: `${B}/page6_img7.png`, label: "Before horizontal split", alt: "Before horizontal split" },
              { src: `${B}/page6_img8.png`, label: "After horizontal split", alt: "After horizontal split" },
              { src: `${B}/page6_img9.png`, label: "After lots of splits", alt: "After lots of splits" },
            ]}
            columns={2}
            caption="Sequential edge splits — new vertices appear at edge midpoints"
          />
          <BlogParagraph>
            Below are screenshots showing a mesh before and after a combination of both edge
            splits and edge flips.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page7_img1.png`, label: "Before first split", alt: "Before first split (combined)" },
              { src: `${B}/page7_img2.png`, label: "After first split", alt: "After first split (combined)" },
              { src: `${B}/page7_img3.png`, label: "After second split", alt: "After second split (combined)" },
              { src: `${B}/page7_img4.png`, label: "Before first flip", alt: "Before first flip (combined)" },
              { src: `${B}/page7_img5.png`, label: "After third split", alt: "After third split (combined)" },
              { src: `${B}/page7_img6.png`, label: "After second flip", alt: "After second flip (combined)" },
              { src: `${B}/page7_img7.png`, label: "After fourth split", alt: "After fourth split (combined)" },
              { src: `${B}/page7_img8.png`, label: "After third flip", alt: "After third flip (combined)" },
            ]}
            columns={2}
            caption="Combining splits and flips to reshape mesh topology"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page7_img9.png`, label: "After more splits", alt: "After more splits" },
              { src: `${B}/page7_img10.png`, label: "Final result", alt: "Final combined result" },
            ]}
            caption="Further combined split and flip operations"
          />
          <BlogCallout accent={ACCENT}>
            Debugging note: I actually ended up getting this problem first try. I think it's
            because I used the convention from the diagram I drew.
          </BlogCallout>
          <BlogParagraph>
            I did not implement support for boundary edges.
          </BlogParagraph>
        </BlogSubsection>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="loop-subdivision" accent={ACCENT}>
        <BlogParagraph>
          To implement loop subdivision, I iterated through all edges and set all edges and
          vertices' <code>isNew</code> field to false, calculated new vertex locations based on
          proximal vertices, calculated updated old vertex locations using a different proximal
          equation, split edges and assigned the midpoint's new location based on what I
          calculated, flipped new edges that aren't on a pre-existing line, then updated the old
          vertex locations.
        </BlogParagraph>
        <BlogParagraph>
          I observed that after subdivision with no pre-split, sharp corners and edges are
          rounded off. Differences in meshes subdivided with and without a pre-split can be seen
          below.
        </BlogParagraph>
        <BlogFigureGrid
          figures={[
            { src: `${B}/page8_img1.png`, label: "Before subdividing — no pre-split around spout", alt: "Before subdividing with no pre-split around spout" },
            { src: `${B}/page8_img2.png`, label: "After subdividing — no pre-split around spout", alt: "After subdividing with no pre-split around spout" },
            { src: `${B}/page8_img3.png`, label: "Before subdividing — with pre-split around spout", alt: "Before subdividing with pre-split around spout" },
            { src: `${B}/page8_img4.png`, label: "After subdividing — with pre-split around spout", alt: "After subdividing with pre-split around spout" },
          ]}
          caption="Pre-splitting around the teapot spout preserves the sharp rim during subdivision"
        />
        <BlogParagraph>
          As we can see, in areas I pre-split, more of the high-frequency detail is preserved.
          I CAN reduce the rounding effect by pre-splitting. The subdivided mesh with
          pre-splitting looks far closer to the original mesh than the subdivided mesh with no
          pre-splitting. This seemed to happen with both sharp corners and edges in my research.
        </BlogParagraph>

        <BlogSubsection title="Cube Subdivision: Asymmetry and Pre-processing">
          <BlogParagraph>
            With our algorithm for subdivision, we find new vertex positions based on old vertex
            positions and move old vertex positions based on the positions of adjacent vertices.
            A mesh with a low number of vertices will lose lots of information about where
            vertices originally are and will dramatically change shape as seen below.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page8_img5.png`, label: "No subdivision", alt: "Cube with no subdivision" },
              { src: `${B}/page8_img6.png`, label: "Subdivision 1", alt: "Cube after 1 subdivision" },
              { src: `${B}/page9_img1.png`, label: "Subdivision 2", alt: "Cube after 2 subdivisions" },
              { src: `${B}/page9_img2.png`, label: "Subdivision 3", alt: "Cube after 3 subdivisions" },
              { src: `${B}/page9_img3.png`, label: "Subdivision 4", alt: "Cube after 4 subdivisions" },
              { src: `${B}/page9_img4.png`, label: "Subdivision 5", alt: "Cube after 5 subdivisions" },
            ]}
            columns={3}
            caption="Loop subdivision on the cube without pre-processing — becomes asymmetric and loses shape"
          />
          <BlogParagraph>
            To mitigate this, we will repetitively split so neighboring vertices update on
            adjacent vertices that are closer together. This will mitigate a good amount of the
            subdivision rounding as seen below.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page9_img5.png`, label: "No subdivision", alt: "Pre-split cube with no subdivision" },
              { src: `${B}/page9_img6.png`, label: "Subdivision 1", alt: "Pre-split cube after 1 subdivision" },
              { src: `${B}/page9_img7.png`, label: "Subdivision 2", alt: "Pre-split cube after 2 subdivisions" },
              { src: `${B}/page9_img8.png`, label: "Subdivision 3", alt: "Pre-split cube after 3 subdivisions" },
            ]}
            caption="Loop subdivision on the cube with pre-processing — shape is retained much better"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page10_img1.png`, label: "No subdivision", alt: "Pre-split cube no subdivision (alt)" },
              { src: `${B}/page10_img2.png`, label: "Subdivision 1", alt: "Pre-split cube subdivision 1 (alt)" },
              { src: `${B}/page10_img3.png`, label: "Subdivision 2", alt: "Pre-split cube subdivision 2 (alt)" },
              { src: `${B}/page10_img4.png`, label: "Subdivision 3", alt: "Pre-split cube subdivision 3 (alt)" },
            ]}
            caption="The cube's shape is retained much better — it would look even better with uniform edge splits"
          />
          <BlogCallout accent={ACCENT}>
            Each subdivision step moves old vertex positions based on a weighted average of
            surrounding vertices. In sparse meshes this causes dramatic shape changes. More
            splits create denser neighborhoods, reducing the per-vertex influence and better
            preserving the original shape.
          </BlogCallout>
        </BlogSubsection>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="optional-extra-credit" accent={ACCENT}>
        <BlogSubsection title="Part 7: Design Your Own Mesh">
          <BlogParagraph>
            Not doing.
          </BlogParagraph>
        </BlogSubsection>
      </BlogSection>
    </div>
  );
}
