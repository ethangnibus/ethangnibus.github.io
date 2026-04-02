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

const B = "/blog/learning-graphics/cloth-simulation/images";

const ACCENT = BLOG_CATEGORY_ACCENTS.graphics;

export function ClothSimulationContent() {
  return (
    <div>
      <BlogSection sectionId="overview" accent={ACCENT}>
        <BlogParagraph>
          In this project, I implemented cloth simulation by following the PointMass and Spring
          method. This required building the PointMass-Spring grid itself, applying various
          forces to said PointMasses to simulate things like gravity, colliding the cloth with
          primitives such as spheres and planes, and colliding the cloth with itself. I also
          implemented GLSL Shaders that run in parallel on the GPU so that my simulation could
          look pretty without taking hours to render!
        </BlogParagraph>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="masses-springs" accent={ACCENT}>
        <BlogParagraph>
          In Part 1, I wrote the code that represents a grid of masses and springs. To do this
          I first made num_width_points × num_height_points PointMasses, oriented them
          horizontally or vertically based on the orientation variable, then emplaced them to
          the back of the point_masses vector. Next, for every PointMass in the point_masses
          vector, I created its structural, shearing, and bending springs and added them to the
          springs vector if they should exist.
        </BlogParagraph>

        <BlogSubsection title="Wireframe Views">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page1_img1.png`, label: "bird's eye view of pinned2", alt: "Bird's eye view of pinned2 wireframe" },
              { src: `${B}/page1_img2.png`, label: "pinned2 viewed from an angle", alt: "Angled view of pinned2 wireframe" },
              { src: `${B}/page2_img1.png`, label: "zoomed in shot of pinned2", alt: "Zoomed in wireframe of pinned2" },
            ]}
            columns={3}
            caption="scene/pinned2.json — cloth wireframe from several viewing angles"
          />
        </BlogSubsection>

        <BlogSubsection title="Spring Types">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page2_img2.png`, label: "structural springs only", alt: "Structural springs only" },
              { src: `${B}/page2_img3.png`, label: "shearing springs only", alt: "Shearing springs only" },
              { src: `${B}/page2_img4.png`, label: "bending springs only", alt: "Bending springs only" },
            ]}
            columns={3}
            caption="Individual spring types isolated"
          />
        </BlogSubsection>

        <BlogSubsection title="Constraint Combinations">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page2_img5.png`, label: "(1) without shearing constraints", alt: "Without shearing constraints" },
              { src: `${B}/page2_img6.png`, label: "(2) only shearing constraints", alt: "Only shearing constraints" },
              { src: `${B}/page3_img1.png`, label: "(3) all constraints", alt: "All constraints combined" },
            ]}
            columns={3}
            caption="Wireframe with different constraint combinations"
          />
        </BlogSubsection>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="numerical-integration" accent={ACCENT}>
        <BlogParagraph>
          In Part 2 I simulated external and spring correction forces to act on the PointMasses
          that make up our cloth. I then used Verlet integration to find the new positions of
          the PointMasses after the forces are applied to them. To better mimic real world
          behavior, I limited how far each spring could stretch by constraining the distance
          each pair of connected PointMasses could be apart from one another.
        </BlogParagraph>

        <BlogSubsection title="Spring Constant (ks) Effects">
          <BlogParagraph>
            With a low ks (less than 100) the cloth seems to vibrate after swiftly falling to a
            resting position. With a high ks (above 10,000,000) the cloth falls to a resting
            position very rigidly. While in a resting position, it is much less flexible than
            the sub-100 or 5,000 counterparts. It seems that the cloth goes from simulating a
            free-flowing and light material like netting to a dense and stiff material such as
            construction paper and beyond as ks goes from low values to high values.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page4_img1.png`, label: "ks = 1 N/m — wiggly like a waterbed", alt: "ks = 1" },
              { src: `${B}/page4_img2.png`, label: "ks = 100,000 N/m — stiff like construction paper", alt: "ks = 100000" },
            ]}
            caption="Low ks produces a loose, floppy cloth; high ks produces a rigid sheet"
          />
        </BlogSubsection>

        <BlogSubsection title="Density Effects">
          <BlogParagraph>
            A low density value like 1 seems to reflect a material that doesn't weigh much like
            netting — it holds its top edge at almost a straight line, meaning there is not much
            weight pulling the material down between the pinned PointMasses. On the other hand, a
            high density value such as 10,000 visually looks very heavy as if it could be
            simulating chainmail. The top edge sinks down about an eighth of the way down the
            entire mesh. We can also notice that PointMasses jiggle around unlike the low density
            case, telling us that there is lots of stress on the springs when density is high. As
            density goes from low to high, the material simulated goes from one that doesn't weigh
            much to one that weighs a lot.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page4_img3.png`, label: "density = 1 g/cm² — light like netting", alt: "density = 1" },
              { src: `${B}/page4_img4.png`, label: "density = 99,999 g/cm² — heavy like chainmail, jittery under stress", alt: "density = 99999" },
            ]}
            caption="Density controls how much the cloth sags under gravity"
          />
        </BlogSubsection>

        <BlogSubsection title="Damping Effects">
          <BlogParagraph>
            Low values of damping like 0 appear to accelerate the cloth's movement while higher
            values like 1 appear to slow it down. At low damping, the cloth swings about rather
            than falling to its resting position — it is wavy and jittery almost like a sheet
            drying in the wind. As the damping factor increases, the cloth rests to a halt.
            Replaying the simulation with a damping factor of 1 shows the cloth falling down to
            its resting position and immediately stopping. The damping factor controls how
            powerful springs in our model are at constraining the movement of the PointMasses.
            Low damping means springs have little control over forces other than holding the
            cloth together; as damping rises, springs get better at making PointMasses less
            affected by other forces.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page4_img5.png`, label: "damping = 0 — cloth swings, won't settle", alt: "damping = 0" },
              { src: `${B}/page4_img6.png`, label: "damping = 1 — cloth falls and sits still immediately", alt: "damping = 1" },
            ]}
            caption="Damping controls how quickly the cloth settles to rest"
          />
        </BlogSubsection>

        <BlogSubsection title="Resting State — scene/pinned4.json">
          <BlogParagraph>
            Below are shaded versions of scene/pinned4.json in its final resting state with
            default parameters.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page4_img7.png`, label: "wireframe", alt: "Wireframe pinned4" },
              { src: `${B}/page4_img8.png`, label: "normal shading", alt: "Normal shading pinned4" },
              { src: `${B}/page4_img9.png`, label: "diffuse shading", alt: "Diffuse shading pinned4" },
              { src: `${B}/page5_img1.png`, label: "Blinn-Phong shading", alt: "Blinn-Phong pinned4" },
              { src: `${B}/page5_img2.png`, label: "texture shading", alt: "Texture shading pinned4" },
              { src: `${B}/page5_img3.png`, label: "bump shading", alt: "Bump shading pinned4" },
              { src: `${B}/page5_img4.png`, label: "displacement shading", alt: "Displacement shading pinned4" },
              { src: `${B}/page5_img5.png`, label: "mirror shading", alt: "Mirror shading pinned4" },
              { src: `${B}/page5_img6.png`, label: "custom shading (cell shader)", alt: "Cell shader pinned4" },
            ]}
            columns={3}
            caption="scene/pinned4.json at rest — all shader modes"
          />
        </BlogSubsection>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="collisions-objects" accent={ACCENT}>
        <BlogParagraph>
          In Part 3, I added collision to my cloth simulation. First, I added collision with
          spheres by bumping a PointMass a little above the sphere if it ever crosses over the
          sphere's surface or rests on the surface. I also implemented collisions with planes by
          doing the same if a PointMass crosses from one side of the plane's surface or rests on
          the surface. Both of these involved finding the intersection point, finding an offset
          point a little on the outside of the object's intersection point, and applying a
          correction vector scaled by friction to correct every PointMass's position that
          intersects.
        </BlogParagraph>

        <BlogSubsection title="Cloth Draped over a Sphere">
          <BlogParagraph>
            I simulated the following with Blinn-Phong Shading. As ks goes from a low value to a
            high value, the cloth seems to go from simulating a thin material to simulating a
            thick material. At lower values, more folds appear and the cloth falls into place more
            swiftly. At higher values, fewer folds appear and the cloth slowly pulls itself into
            place. When ks = 50, the cloth looks like a bandana. When ks = 500 it looks like a
            tablecloth. When ks = 5,000 it looks like a towel. When ks = 50,000 it looks like a
            sheet of rubber.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page6_img3.png`, label: "ks = 50 — thin like a bandana", alt: "ks = 50 sphere" },
              { src: `${B}/page6_img4.png`, label: "ks = 500 — tablecloth", alt: "ks = 500 sphere" },
              { src: `${B}/page6_img5.png`, label: "ks = 5,000 — towel", alt: "ks = 5000 sphere" },
              { src: `${B}/page6_img6.png`, label: "ks = 50,000 — rubber sheet", alt: "ks = 50000 sphere" },
            ]}
            caption="Cloth draped over a sphere at varying spring constants (Blinn-Phong shading)"
          />
        </BlogSubsection>

        <BlogSubsection title="Cloth at Rest on a Plane">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page6_img7.png`, label: "wireframe", alt: "Wireframe cloth on plane" },
              { src: `${B}/page7_img1.png`, label: "normal shading", alt: "Normal shading cloth on plane" },
              { src: `${B}/page7_img2.png`, label: "diffuse shading", alt: "Diffuse shading cloth on plane" },
              { src: `${B}/page7_img3.png`, label: "Blinn-Phong shading", alt: "Blinn-Phong cloth on plane" },
              { src: `${B}/page7_img4.png`, label: "texture shading", alt: "Texture shading cloth on plane" },
              { src: `${B}/page7_img5.png`, label: "bump shading", alt: "Bump shading cloth on plane" },
              { src: `${B}/page7_img6.png`, label: "displacement shading", alt: "Displacement shading cloth on plane" },
              { src: `${B}/page7_img7.png`, label: "mirror shading", alt: "Mirror shading cloth on plane" },
              { src: `${B}/page7_img8.png`, label: "custom shading (cell shader)", alt: "Cell shader cloth on plane" },
            ]}
            columns={3}
            caption="Cloth lying peacefully at rest on the plane — all shader modes"
          />
          <BlogParagraph>
            Displacement shading looks unusual because the displaced plane vectors clip into the
            mesh's vertices or vice versa. Cell shading (my extra credit shader) looks unusual
            because the light hitting the flat plane and the flat cloth fall into the same bucket.
          </BlogParagraph>
        </BlogSubsection>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="self-collisions" accent={ACCENT}>
        <BlogParagraph>
          In Part 4 I created and accelerated collisions between the cloth and itself. To do
          this, I assigned PointMasses hashes based on their position in the scene so that
          PointMasses with the same hash are in the same partition of the scene space. Then I
          used this hash to put PointMasses that are close in proximity into the same bin in a
          spatial map. Then I loop through all PointMasses, see if the current PointMass
          collides with any other PointMass in its spatial map bin, and apply a correcting
          force to it if it does collide.
        </BlogParagraph>

        <BlogSubsection title="Cloth Falling and Folding">
          <BlogParagraph>
            The following images were simulated using normal shading.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page8_img1.png`, label: "step 1", alt: "Self-collision step 1" },
              { src: `${B}/page8_img2.png`, label: "step 2", alt: "Self-collision step 2" },
              { src: `${B}/page8_img3.png`, label: "step 3", alt: "Self-collision step 3" },
              { src: `${B}/page8_img4.png`, label: "step 4", alt: "Self-collision step 4" },
              { src: `${B}/page8_img5.png`, label: "step 5", alt: "Self-collision step 5" },
              { src: `${B}/page8_img6.png`, label: "step 6", alt: "Self-collision step 6" },
              { src: `${B}/page8_img7.png`, label: "step 7", alt: "Self-collision step 7" },
              { src: `${B}/page8_img8.png`, label: "step 8", alt: "Self-collision step 8" },
            ]}
            columns={4}
            caption="Cloth falling and folding on itself — as observed, the cloth folds over itself nicely"
          />
        </BlogSubsection>

        <BlogSubsection title="Low Density (1 g/cm²)">
          <BlogParagraph>
            Low density causes the cloth to fall in a way that makes big ripples. It folds back
            and forth over itself like lasagna. When it falls it is relatively still and moves
            smoothly. It rests in a sleek, smooth way like a wet paper towel.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page9_img1.png`, label: "low density — early fall", alt: "Low density step 1" },
              { src: `${B}/page9_img2.png`, label: "low density — folding", alt: "Low density step 2" },
              { src: `${B}/page9_img3.png`, label: "low density — settling", alt: "Low density step 3" },
              { src: `${B}/page9_img4.png`, label: "low density — at rest", alt: "Low density step 4" },
            ]}
            caption="Self-collision with low density (1 g/cm²) — normal shading"
          />
        </BlogSubsection>

        <BlogSubsection title="High Density (99,999 g/cm²)">
          <BlogParagraph>
            High density causes the cloth to crash on itself and make a bunch of tiny folds. It
            clumps up like dropping chainmail. When it falls it lays to rest in a big pile. It
            eventually spreads out more, but has tiny ripples that are tight-knit.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page9_img5.png`, label: "high density — early fall", alt: "High density step 1" },
              { src: `${B}/page9_img6.png`, label: "high density — crashing", alt: "High density step 2" },
              { src: `${B}/page9_img7.png`, label: "high density — settling", alt: "High density step 3" },
              { src: `${B}/page9_img8.png`, label: "high density — at rest", alt: "High density step 4" },
            ]}
            caption="Self-collision with high density (99,999 g/cm²) — normal shading"
          />
        </BlogSubsection>

        <BlogSubsection title="Low ks (1)">
          <BlogParagraph>
            Like the high density case, a low ks makes the cloth fold into tiny ripples. This
            time they are more evenly dispersed rather than clumped around the center of mass.
            The cloth falls into a springy pile. When it lays out flat, it is bubbly like a
            windy tarp or lava.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page10_img1.png`, label: "ks = 1 — early fall", alt: "Low ks step 1" },
              { src: `${B}/page10_img2.png`, label: "ks = 1 — folding", alt: "Low ks step 2" },
              { src: `${B}/page10_img3.png`, label: "ks = 1 — springy pile", alt: "Low ks step 3" },
              { src: `${B}/page10_img4.png`, label: "ks = 1 — bubbly at rest", alt: "Low ks step 4" },
            ]}
            caption="Self-collision with ks = 1 — normal shading"
          />
        </BlogSubsection>

        <BlogSubsection title="High ks (99,999)">
          <BlogParagraph>
            When there is a high ks, the cloth falls and creates big ripples. The folds seem to
            be more uniform than the low density case. The cloth slides into a nice overlapping
            pile like thin vinyl. The cloth moves smoothly and falls in place with barely any
            ripples.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page10_img5.png`, label: "ks = 99,999 — early fall", alt: "High ks step 1" },
              { src: `${B}/page10_img6.png`, label: "ks = 99,999 — uniform folds", alt: "High ks step 2" },
              { src: `${B}/page10_img7.png`, label: "ks = 99,999 — settling", alt: "High ks step 3" },
              { src: `${B}/page10_img8.png`, label: "ks = 99,999 — smooth at rest", alt: "High ks step 4" },
            ]}
            caption="Self-collision with ks = 99,999 — normal shading"
          />
        </BlogSubsection>

        <BlogCallout accent={ACCENT}>
          High ks and low density are similar. Low ks and high density are similar. The main
          difference between low ks and high density is that low ks is much more bubbly and
          "springy" — think steamy boiling water vs. bubbling stew. The main difference between
          high ks and low density is that high ks PointMasses are constrained more by adjacent
          PointMasses than the low density case.
        </BlogCallout>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="shaders" accent={ACCENT}>
        <BlogParagraph>
          In Part 5 I was able to make my cloth simulation look pretty in real time by
          implementing GLSL Shaders! GLSL Shaders run in parallel on the GPU, so they can do
          lots of computationally intensive work to make simulations look pretty without
          affecting performance too much. The mandatory shaders I implemented were Diffuse
          Shading, Blinn-Phong Shading, Texture Mapping, Bump Mapping, Displacement Mapping,
          and Environment-mapped Reflections (similar to a mirror). I also did extra credit to
          make my own shader — a Cell Shader!
        </BlogParagraph>

        <BlogSubsection title="What Is a Shader Program?">
          <BlogParagraph>
            A shader program is a program that runs in parallel on the GPU so that real-time
            renders can look good while still running fast. While the CPU calculates things such
            as collisions and mesh building that have to be done while knowing what everything
            else in the scene is doing, a shader program can run without needing to know those
            interactions. Because of that, we can essentially pixel-sample in parallel super fast
            and render an impressive scene at a quick speed while keeping a similar framerate.
          </BlogParagraph>
          <BlogParagraph>
            To create lighting and material effects, a shader program uses vertex and fragment
            shaders. Vertex shaders change the geometric properties of vertices retrieved from
            the program running on the CPU — they can update positions, normals, etc. before
            sending that info to fragment shaders. After handling and sending these vertex
            values, the values are interpolated over the polygon they will appear on. Fragment
            shaders take these interpolated values and use them to change how the output pixels
            are colored. To keep things simple: if you want to edit the features in a scene
            you'd write a vertex shader; if you want to change how the features are colored,
            you'd write a fragment shader.
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="Blinn-Phong Shading">
          <BlogParagraph>
            The Blinn-Phong shading model is a variation of the Phong shading model that is
            faster for directionally lit scenes. This shading model has components of diffuse
            shading, ambient shading, and specular shading. The combination of these three means
            that we can make objects look globally illuminated really quickly. The algorithm
            separately computes ambient color, diffuse color, and specular color. For specular
            color (the part that reflects shiny light), if the dot product between the direction
            to the light and the vertex normal (both normalized) is positive, then find the
            half-angle and raise it to a power depending on how much you want the shine to span.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page11_img1.png`, label: "ambient component only", alt: "Blinn-Phong ambient only" },
              { src: `${B}/page11_img2.png`, label: "diffuse component only", alt: "Blinn-Phong diffuse only" },
              { src: `${B}/page11_img3.png`, label: "specular component only", alt: "Blinn-Phong specular only" },
              { src: `${B}/page11_img4.png`, label: "full Blinn-Phong", alt: "Full Blinn-Phong shading" },
            ]}
            caption="Blinn-Phong components and the combined result"
          />
        </BlogSubsection>

        <BlogSubsection title="Texture Mapping">
          <BlogParagraph>
            Using a custom texture by modifying the textures directory.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page12_img1.png`, label: "the texture used", alt: "Custom texture" },
              { src: `${B}/page12_img2.png`, label: "sphere — front-on", alt: "Texture sphere front" },
              { src: `${B}/page12_img3.png`, label: "sphere — side profile", alt: "Texture sphere side" },
              { src: `${B}/page12_img4.png`, label: "cloth — front-on", alt: "Texture cloth front" },
              { src: `${B}/page12_img5.png`, label: "cloth — side profile", alt: "Texture cloth side" },
            ]}
            columns={3}
            caption="Custom texture mapping on sphere and cloth"
          />
        </BlogSubsection>

        <BlogSubsection title="Bump vs. Displacement Mapping">
          <BlogParagraph>
            Bump mapping perturbs surface normals based on a texture to give the illusion that
            surfaces extrude, while displacement mapping actually moves the vertices. This is
            because in bump shading we only modify normals based on texture features, while in
            displacement shading we modify both normals and vertex positions. I chose to use a
            texture with high red contrast so it's easy to differentiate vectors that have been
            moved — the sphere clearly shows extruding vertices at areas that are red from the
            texture.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page12_img6.png`, label: "the texture used", alt: "Bump/displacement texture" },
            ]}
            columns={2}
            caption="Texture used for bump and displacement mapping"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page13_img1.png`, label: "bump shading — sphere", alt: "Bump shading sphere" },
              { src: `${B}/page13_img2.png`, label: "bump shading — cloth", alt: "Bump shading cloth" },
              { src: `${B}/page13_img3.png`, label: "displacement shading — sphere", alt: "Displacement shading sphere" },
              { src: `${B}/page13_img4.png`, label: "displacement shading — cloth", alt: "Displacement shading cloth" },
            ]}
            caption="Bump and displacement shading on sphere and cloth"
          />
          <BlogParagraph>
            Below we compare bump and displacement when changing the mesh's coarseness. As the
            coarseness of the mesh increases, there is little to no quality increase on Bump
            Shading other than the roundness of the sphere. Displacement Shading, however, sees
            massive quality improvements — more vertices means displacements can be more precise.
            This is why the sphere goes from looking like a spiky ball with a texture projected
            onto it at -o 16 -a 16, to a planet with mountains at default settings, to a ball
            with hairs at -o 128 -a 128. In total, Bump Shading looks about the same on objects
            with varying coarseness, but Displacement Shading gets far more detailed as coarseness
            increases.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page13_img5.png`, label: "bump — sphere (-o 16 -a 16)", alt: "Bump shading coarse" },
              { src: `${B}/page13_img6.png`, label: "displacement — sphere (-o 16 -a 16)", alt: "Displacement shading coarse" },
              { src: `${B}/page13_img7.png`, label: "bump — sphere (default)", alt: "Bump shading default" },
              { src: `${B}/page13_img8.png`, label: "displacement — sphere (default)", alt: "Displacement shading default" },
              { src: `${B}/page14_img1.png`, label: "bump — sphere (-o 128 -a 128)", alt: "Bump shading fine" },
              { src: `${B}/page14_img2.png`, label: "displacement — sphere (-o 128 -a 128)", alt: "Displacement shading fine" },
            ]}
            caption="Bump vs. displacement at three mesh resolutions — displacement improves dramatically with more vertices"
          />
        </BlogSubsection>

        <BlogSubsection title="Mirror Shader">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page14_img3.png`, label: "sphere — front-on", alt: "Mirror sphere front" },
              { src: `${B}/page14_img4.png`, label: "sphere — side profile", alt: "Mirror sphere side" },
              { src: `${B}/page14_img5.png`, label: "cloth — front-on", alt: "Mirror cloth front" },
              { src: `${B}/page14_img6.png`, label: "cloth — side profile", alt: "Mirror cloth side" },
            ]}
            caption="Environment-mapped mirror shader on sphere and cloth"
          />
        </BlogSubsection>

        <BlogSubsection title="Cell Shader (Extra Credit)">
          <BlogParagraph>
            For my custom shader, I chose to make a cell shader. The idea behind a cell shader
            is that it bins similar color values into groups, then chooses one color to represent
            that entire group. This simulates how colors are often used in cartoons and gives the
            world a comical feel. To find these bins, I decided to use the dot product between
            the direction to light and the normal.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page15_img1.png`, label: "sphere — front-on", alt: "Cell shader sphere front" },
              { src: `${B}/page15_img2.png`, label: "sphere — side profile", alt: "Cell shader sphere side" },
              { src: `${B}/page15_img3.png`, label: "cloth — front-on", alt: "Cell shader cloth front" },
              { src: `${B}/page15_img4.png`, label: "cloth — side profile", alt: "Cell shader cloth side" },
              { src: `${B}/page15_img5.png`, label: "pinned2", alt: "Cell shader pinned2" },
              { src: `${B}/page15_img6.png`, label: "pinned4 — unrealistic!", alt: "Cell shader pinned4" },
            ]}
            caption="Custom cell shader simulating cartoon-style flat shading"
          />
        </BlogSubsection>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="extra-credit" accent={ACCENT}>
        <BlogParagraph>
          I implemented a custom shader to simulate cartoony art styles in real time — a cell
          shader! Refer to the Part 5 section above to see it in action.
        </BlogParagraph>
      </BlogSection>
    </div>
  );
}
