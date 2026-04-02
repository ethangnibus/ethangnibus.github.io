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

const B = "/blog/learning-graphics/pathtracer/images";

const ACCENT = BLOG_CATEGORY_ACCENTS.graphics;

export function PathtracerContent() {
  return (
    <div>
      {/* ── Overview ─────────────────────────────────────────────────────── */}
      <BlogSection sectionId="overview" accent={ACCENT}>
        <BlogParagraph>
          In this assignment, I implemented the algorithms to make a basic ray tracer! In Part 1
          I generated rays and implemented how they intersect with objects in the scene. In Part 2
          I made a BVH accelerator so that ray intersections could happen in a fraction of the time.
          In Part 3 I implemented the code to represent the DiffuseBSDF material and also implemented
          basic direct illumination. In Part 4 I made a way to sample the DiffuseBSDF and used that
          to implement global illumination. In Part 5 I implemented adaptive sampling so that each
          pixel we sample converges so that we output images with no noise.
        </BlogParagraph>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      {/* ── Part 1 — Ray Generation & Intersection ───────────────────── */}
      <BlogSection sectionId="ray-generation-intersection" accent={ACCENT}>
        <BlogSubsection title="What I Did">
          <BlogParagraph>
            In Part 1 I set up a camera and an image sensor that corresponds to an output image so
            that I could generate pixel samples by generating a ray that goes through each location
            on the sensor and updating its corresponding pixel location on the output image. After
            that, I coded intersection tests for ray-triangle intersections and ray-sphere
            intersections so that we could visualize meshes made of spheres and triangles in our scene.
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="Ray Generation &amp; Primitive Intersection">
          <BlogParagraph>
            To generate a ray, we make a sensor in our 3D scene that corresponds to our output image.
            We then set up a camera to point at the sensor. After this, we trace a ray from the camera
            through the sensor and update the pixel the ray intersects with in the output image based
            on some value. At first we make this value to be a debugging color based on the direction
            of the camera ray. This involves converting between image space and camera space. We then
            change the debugging color to be based on the normals of intersected objects. I implemented
            ray-triangle intersection and ray-sphere intersection. How this works is that we trace a
            ray from the camera, through the sensor, and into the scene. If the ray intersects with an
            object we calculate its normal and use barycentric coordinates (triangle) or analytics
            (sphere) to color pixels in a way that the objects in the scene look smooth.
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="Triangle Intersection Algorithm">
          <BlogParagraph>
            To implement ray-triangle intersection, I implemented the Möller–Trumbore algorithm.
            This algorithm essentially uses points on the triangle and the ray to find the intersection
            point's barycentric coordinates on the triangle. We essentially use points on the triangle
            to find edges on the triangle, edges and the ray to find the determinant, return if the ray
            lies in the plane of the triangle based on the determinant, then use the inverse determinant
            and calculations between geometries found from the edges and ray to find the barycentric
            coordinates of the intersection point. If the barycentric coordinates are outside of the
            triangle or if the intersection t (time) is out of bounds we return. We then fill an
            intersection object with the normal that we calculate by using the barycentric coordinates.
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="Normal Shading Results">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page2_img1.png`, label: "CBspheres.dae" },
              { src: `${B}/page2_img2.png`, label: "CBgems.dae" },
              { src: `${B}/page2_img3.png`, label: "bunny.dae" },
              { src: `${B}/page2_img4.png`, label: "bench.dae" },
            ]}
            caption="Normal shading for small .dae files"
          />
        </BlogSubsection>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      {/* ── Part 2 — Bounding Volume Hierarchy ───────────────────────── */}
      <BlogSection sectionId="bounding-volume-hierarchy" accent={ACCENT}>
        <BlogSubsection title="What I Did">
          <BlogParagraph>
            In Part 2, I implemented a Bounding Volume Hierarchy (BVH) to speed up render times.
            First, I partitioned all the primitives in the scene into a binary tree so we could test
            intersections with the bounding box of smaller and smaller nodes in the scene before
            testing the intersection of a primitive. I then implemented the code necessary to intersect
            one of these bounding boxes. Finally, I completed the BVH Acceleration by writing the
            recursive algorithm that performs intersection tests on a ray and bounding boxes before it
            checks if the ray intersects with primitives that are partitioned into that node. Together
            this brings the complexity of ray intersection down from O(n) to O(log(n)).
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="BVH Construction Algorithm">
          <BlogParagraph>
            For my BVH construction algorithm I used recursion. At the start of each recursive call,
            I create a root node, create an AABB box bounding every object in the scene, assign the
            AABB box to the root node, find the AABB longest axis and sort each object along this
            direction, find a (split index) midpoint that divides the bounding box, then divide the
            scene into two sides using the split index. After this I recursively call this function on
            the node's left side and the node's right side so we end up with well spaced out primitive
            partitions in each node. To choose a splitting point, I found it most practical to sort the
            list of primitives based on their location in the longest direction they span, then just
            choose the split point to be the middle of the list. This required me to use std::sort()
            and make my own comparison structs to sort in each direction.
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="Large Scene Renders">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page3_img1.png`, label: "maxplanck.dae" },
              { src: `${B}/page3_img2.png`, label: "beast.dae" },
              { src: `${B}/page3_img3.png`, label: "CBdragon.dae" },
              { src: `${B}/page3_img4.png`, label: "CBlucy.dae" },
            ]}
            caption="Normal shading for large .dae files — only renderable with BVH acceleration"
          />
        </BlogSubsection>

        <BlogSubsection title="BVH Acceleration Analysis">
          <BlogParagraph>
            I tested CBlucy.dae, CBdragon.dae, beast.dae, and CBspheres with and without BVH
            acceleration.
          </BlogParagraph>
          <BlogParagraph>
            CBlucy.dae went from having a render time of 269.3629s to a render time of 0.0313s after
            BVH Acceleration (an 8,605.84× speedup). Before speedup it traced 347,366 rays with an
            average speed of 0.0013 million rays per second and an average of 34,173.89 intersection
            tests per ray. After speedup it traced 98,692 rays with an average speed of 3.1481 million
            rays per second and an average of 10.20 intersection tests per ray.
          </BlogParagraph>
          <BlogParagraph>
            CBdragon.dae went from having a render time of 212.2512s to a render time of 0.0356s after
            BVH Acceleration (a 5,962.11× speedup). Before speedup it traced 348,424 rays with an
            average speed of 0.0016 million rays per second and an average of 31,973.54 intersection
            tests per ray. After speedup it traced 96,604 rays with an average speed of 2.7173 million
            rays per second and an average of 11.20 intersection tests per ray.
          </BlogParagraph>
          <BlogParagraph>
            beast.dae went from having a render time of 81.2201s to a render time of 0.0228s after BVH
            Acceleration (a 3,562.29× speedup). Before speedup it traced 299,422 rays with an average
            speed of 0.0037 million rays per second and an average of 14,616.62 intersection tests per
            ray. After speedup it traced 86,243 rays with an average speed of 3.7908 million rays per
            second and an average of 7.24 intersection tests per ray.
          </BlogParagraph>
          <BlogParagraph>
            CBspheres.dae went from having a render time of 0.0301s to a render time of 0.0332s after
            BVH Acceleration (a 0.907× speedup — actually a slight slowdown). Before speedup it traced
            59,423 rays with an average speed of 1.9745 million rays per second and an average of 8.80
            intersection tests per ray. After speedup it traced 67,637 rays with an average speed of
            2.0383 million rays per second and an average of 6.58 intersection tests per ray.
          </BlogParagraph>
          <BlogParagraph>
            It seems that the more complex a mesh gets, the more it benefits from BVH acceleration.
            From CBlucy.dae to CBdragon.dae to beast.dae to CBspheres.dae, render time speedup slows
            as mesh complexity decreases. We can also see that the average speed increase after
            accelerating is greater in complex meshes as opposed to simple meshes. We can also see that
            the number of rays traced decreases after acceleration if the mesh is complex enough. This
            property checks out with the intention to use BVH acceleration to reduce ray intersection
            from O(n) to O(log(n)).
          </BlogParagraph>
          <BlogParagraph>
            What was interesting to me was that simple meshes, such as CBspheres, could see a slowdown
            after implementing BVH acceleration. This is likely because the time it takes to recurse the
            BVHAccel outweighs the speedup. We can most easily see this in the number of rays traced
            before and after BVH acceleration. CBspheres went from tracing 59,423 rays to tracing
            67,637 rays after speedup, so there must be a turning point in mesh complexity where BVH
            acceleration becomes worth the overhead.
          </BlogParagraph>
        </BlogSubsection>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      {/* ── Part 3 — Direct Illumination ─────────────────────────────── */}
      <BlogSection sectionId="direct-illumination" accent={ACCENT}>
        <BlogSubsection title="What I Did">
          <BlogParagraph>
            In Part 3, I implemented the "f" function for a Bidirectional Scattering Distribution
            Function (BSDF) which means that I used an incoming and outgoing angle to return a value
            that makes it so light reflected off objects with the BSDF material are dispersed equally
            in all directions in the hemisphere it could bounce to. I also implemented zero-bounce
            illumination which are the rays of light that reach the camera without bouncing off another
            light first. After that I implemented direct lighting in two forms. Direct lighting is the
            light that falls on a scene directly from the light source (or that reaches another point
            on the scene after just one light bounce). The first version I implemented was Uniform
            Hemisphere Sampling where I used a Monte Carlo estimator to approximate integrating over
            the light that arrived at a point using a reflection equation to output how much light is
            outgoing from that point. The second form was importance sampling, where we sample rays
            cast from lights in the scene to hit points on the scene directly — this way we can see
            the rays that lights cast even if they only emit from a single point (that otherwise could
            have been missed by sampling the hemisphere from the hit point).
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="Uniform Hemisphere Sampling">
          <BlogParagraph>
            The first implementation of the direct lighting function was Uniform Hemisphere Sampling.
            To do this, I sampled radiance "num_samples" times and added that radiance to L_out. After
            finishing every sample I normalized by dividing L_out by "num_samples". To take each sample
            I used the HemisphereSampler, calculated its pdf using 1.0 / (2.0 * π), tested the
            intersection with a ray from the hit point to the direction of the material we want light
            from. If the incoming ray is blocked it is a shadow. If the ray isn't a shadow we use the
            intersection with the material it hit to get its radiance, and use the "f" function,
            emission of the new material, and cos of the theta angle made by the light bounce as well
            as the pdf to find the output radiance for that sample.
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="Importance Sampling Lights">
          <BlogParagraph>
            The second implementation was Importance Sampling Lights. The difference between uniform
            and importance is that in importance sampling we sample lights directly rather than in
            uniform directions around the hemisphere made by the ray and hit point. In this
            implementation, we iterate through all lights in the scene, assign num_samples based on
            whether or not the light is a delta light, take num_samples at the light to accumulate
            radiance, then update L_out based on this normalized accumulation. In each sample, we do
            the shadow ray test between the light and the hit point. If the ray isn't in shadow we
            calculate radiance in the same way as before.
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="Hemisphere vs. Importance — CBbunny">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page4_img1.png`, label: "Hemisphere — CBbunny" },
              { src: `${B}/page4_img2.png`, label: "Importance — CBbunny" },
            ]}
            caption="Hemisphere vs. importance sampling on CBbunny"
          />
        </BlogSubsection>

        <BlogSubsection title="Hemisphere vs. Importance — CBspheres_lambertian">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page5_img1.png`, label: "Hemisphere — CBspheres_lambertian" },
              { src: `${B}/page5_img2.png`, label: "Importance — CBspheres_lambertian" },
            ]}
            caption="Hemisphere vs. importance sampling on CBspheres_lambertian"
          />
        </BlogSubsection>

        <BlogSubsection title="Light Ray Count Comparison">
          <BlogParagraph>
            Below is CBbunny.dae traced with different numbers of light rays (importance sampling,
            1 sample per pixel):
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page5_img3.png`, label: "1 light ray" },
              { src: `${B}/page5_img4.png`, label: "4 light rays" },
              { src: `${B}/page5_img5.png`, label: "16 light rays" },
              { src: `${B}/page5_img6.png`, label: "64 light rays" },
            ]}
            caption="Noise in soft shadows decreases as light ray count increases"
          />
          <BlogParagraph>
            As we can see the noise in the images decreases as the number of light rays increases.
            Soft shadows are terribly spotty until 64 light rays. At 64 light rays, the spots between
            dark shadows and light shadows — especially in the bunny's shadow — are still spotty. Dark
            shadows seem to look good at 4 light rays and above.
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="Hemisphere vs. Importance: Analysis">
          <BlogParagraph>
            Uniform hemisphere sampling seems to be much noisier than importance sampling when it
            comes to shadows. As we can see in Hemisphere CBbunny, the soft shadows on the back of
            the wall are grainy while the importance sample is smooth. Hemisphere also has a nice
            "bloom" effect that importance doesn't have — you can see this in the blur around
            Hemisphere CBbunny and Hemisphere CBspheres_lambertian compared to their importance
            counterparts. Generally I'd say that lights look better in hemisphere sampling and objects
            that aren't lights look better in importance sampling (better as in lower high frequencies).
          </BlogParagraph>
        </BlogSubsection>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      {/* ── Part 4 — Global Illumination ─────────────────────────────── */}
      <BlogSection sectionId="global-illumination" accent={ACCENT}>
        <BlogSubsection title="What I Did">
          <BlogParagraph>
            In Part 4 I implemented DiffuseBSDF that samples the incoming ray as well as calculates
            the same thing as DiffuseBSDF::f. I then use this to implement global illumination in my
            ray-tracer. This is also called indirect lighting, or the lighting in the scene that is
            not found on the zero or first bounce of a ray of light. I do this using recursion by
            bouncing a ray off of objects and adding the radiance found at each bounce point on top of
            the radiance I would've found from direct illumination.
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="Indirect Lighting Implementation">
          <BlogParagraph>
            To implement the indirect lighting function, I add together zero_bounce_radiance and
            at_least_one_bounce_radiance. In at_least_one_bounce_radiance, I calculate the
            one_bounce_radiance for the current ray, then recurse through the rays that are made when
            that ray bounces off of intersections. If the depth of the ray is less than 1 I return 0;
            if the depth of the ray is 1 I just return the one bounce radiance. Otherwise, I calculate
            the fields — I use the sample_f function to get the reflectance, cos of the theta angle,
            and pdf of the current ray's intersection. I then construct the ray created from the
            bounce, return 0 if the cos of the theta angle isn't positive, and intersect the new ray
            with its new intersection. Then I use Russian roulette to decide if the current and
            recursive radiance should be added to the output radiance. If I do, then I use the
            continuation pdf made by Russian roulette, pdf, recursive call to
            at_least_one_bounce_radiance(), f_sample function, and cos of the theta angle to get the
            current radiance then add it to the accumulated radiance.
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="Global Illumination Renders (1024 spp)">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page6_img1.png`, label: "CBbunny.dae" },
              { src: `${B}/page6_img2.png`, label: "CBspheres_lambertian.dae" },
            ]}
            caption="Global illumination renders at 1024 samples per pixel"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page7_img1.png`, label: "banana.dae" },
              { src: `${B}/page7_img2.png`, label: "building.dae" },
              { src: `${B}/page7_img3.png`, label: "dragon.dae" },
              { src: `${B}/page7_img4.png`, label: "wall-e.dae" },
              { src: `${B}/page7_img5.png`, label: "bench.dae" },
            ]}
            columns={3}
            caption="More global illumination renders at 1024 samples per pixel"
          />
        </BlogSubsection>

        <BlogSubsection title="Direct vs. Indirect — CBspheres_lambertian">
          <BlogParagraph>
            Below we compare the direct and indirect lighting for CBspheres_lambertian.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page8_img1.png`, label: "Reference — global illumination" },
              { src: `${B}/page8_img2.png`, label: "Only direct illumination" },
              { src: `${B}/page8_img3.png`, label: "Only indirect illumination" },
            ]}
            columns={3}
            caption="CBspheres_lambertian: global, direct-only, and indirect-only at 1024 spp"
          />
        </BlogSubsection>

        <BlogSubsection title="Direct vs. Indirect — CBbunny">
          <BlogParagraph>
            Below we compare the direct and indirect lighting for CBbunny.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page8_img4.png`, label: "Reference — global illumination" },
              { src: `${B}/page9_img1.png`, label: "Only direct illumination" },
              { src: `${B}/page9_img2.png`, label: "Only indirect illumination" },
            ]}
            columns={3}
            caption="CBbunny: global, direct-only, and indirect-only at 1024 spp"
          />
        </BlogSubsection>

        <BlogSubsection title="Ray Depth Comparison — CBbunny (1024 spp)">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page9_img4.png`, label: "Ray depth 0" },
              { src: `${B}/page9_img5.png`, label: "Ray depth 1" },
              { src: `${B}/page9_img6.png`, label: "Ray depth 2" },
              { src: `${B}/page10_img1.png`, label: "Ray depth 100" },
            ]}
            caption="CBbunny at 1024 spp with max_ray_depth set to 0, 1, 2, 3, and 100"
          />
          <BlogParagraph>
            As we can see, as ray depth increases, there is less and less shadow. From 0 to 1, we go
            from zero bounce light to a lit scene. At ray depth of 2 and above we get indirect
            lighting. As the ray depth increases, soft shadows get lighter and lighter.
          </BlogParagraph>
          <BlogImage
            src={`${B}/page10_img2.png`}
            alt="Overexposure error at ray depth 100"
            caption="Overexposure error (depth of 100). One of the hardest bugs to debug: direct illumination was being added twice — once in est_radiance_global_illumination and again in at_least_one_bounce_radiance at the same ray depth."
          />
        </BlogSubsection>

        <BlogSubsection title="Sample-per-Pixel Rate Comparison (4 light rays)">
          <BlogParagraph>
            Below we compare rendered views with various sample-per-pixel rates using 4 light rays.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page10_img4.png`, label: "spp 1" },
              { src: `${B}/page11_img1.png`, label: "spp 2" },
              { src: `${B}/page11_img2.png`, label: "spp 4" },
              { src: `${B}/page11_img3.png`, label: "spp 8" },
            ]}
            caption="Sample-per-pixel rates 1–8"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page11_img4.png`, label: "spp 16" },
              { src: `${B}/page11_img5.png`, label: "spp 64" },
              { src: `${B}/page11_img6.png`, label: "spp 128" },
              { src: `${B}/page12_img1.png`, label: "spp 256" },
            ]}
            caption="Sample-per-pixel rates 16–256"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page12_img2.png`, label: "spp 512" },
              { src: `${B}/page12_img3.png`, label: "spp 1024" },
              { src: `${B}/page12_img4.png`, label: "spp 4096" },
            ]}
            caption="Sample-per-pixel rates 512–4096"
          />
          <BlogParagraph>
            As we can see, increasing the sample-per-pixel rate increases the probability that a
            pixel converges, which means that higher sample-per-pixel rates have less noise. This
            noise is most easily seen by the tiny "specs" that are prominent in sample-per-pixel rates
            below 512. To ensure that every pixel converges, we can implement adaptive sampling
            (seen below).
          </BlogParagraph>
        </BlogSubsection>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      {/* ── Part 5 — Adaptive Sampling ───────────────────────────────── */}
      <BlogSection sectionId="adaptive-sampling" accent={ACCENT}>
        <BlogSubsection title="What I Did">
          <BlogParagraph>
            In Part 5, I used statistics to test whether a pixel has converged when taking radiance
            samples. This makes it so we could eliminate noise by ensuring every pixel converges
            before outputting an image. This means every pixel has the potential to stop being sampled
            before it reaches the max number of samples, which could be used to speed up big renders.
            This also gives the algorithm the name "Adaptive Sampling."
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="Adaptive Sampling Implementation">
          <BlogParagraph>
            To implement adaptive sampling, I replaced the for loop that took num_samples samples for
            every pixel with one that checks for convergence every time samplesPerBatch samples are
            taken. To find convergence, I use radiance to find illuminance, then add x_k at each
            sample to s1 and x_k * x_k to s2 at each sample. This way I can use s1 and s2 when I
            check for convergence. I check for convergence by using s1 to find the mean, s1 and s2
            to find the variance, the variance to find the standard deviation, and the standard
            deviation and samples so far to find I. I then break if I is less than the confidence
            interval (which I found using maxTolerance * mean). I then average the accumulated
            radiance by dividing by samples so far, and end by updating the sample buffer count by
            samples_so_far.
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="CBbunny — Adaptive Sampling (2048 spp max)">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page13_img1.png`, label: "Sample rate image" },
              { src: `${B}/page13_img2.png`, label: "Noise-free render result" },
            ]}
            caption="CBbunny adaptive sampling at 2048 spp max, 1 sample per light, max ray depth 5"
          />
          <BlogParagraph>
            Above we can see adaptive sampling applied to the bunny render! As seen by the areas in
            red (high sample rate), the shadows that the bunny casts are very computationally
            intensive. Considering the previous parts of this project, this makes sense because it
            takes multiple bounces to start seeing light in the bunny's shadow. We can infer that
            places that are illuminated by global illumination or have complex geometry require high
            sampling rates. The rest of the image follows because simple geometry such as the walls
            and the floor are blue (low sample rate) and the in-between areas are green (medium sample
            rate).
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="CBspheres_lambertian — Adaptive Sampling">
          <BlogParagraph>
            Out of curiosity, I also rendered CBspheres_lambertian:
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page13_img3.png`, label: "Sample rate image" },
              { src: `${B}/page13_img4.png`, label: "Noise-free render result" },
            ]}
            caption="CBspheres_lambertian adaptive sampling"
          />
        </BlogSubsection>
      </BlogSection>
    </div>
  );
}
