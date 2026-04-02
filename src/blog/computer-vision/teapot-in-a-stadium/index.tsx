import {
  BlogSection,
  BlogParagraph,
  BlogImage,
  BlogDivider,
  BlogCallout,
} from "@/components/blog";

import { BLOG_CATEGORY_ACCENTS } from "@/theme";

const ACCENT = BLOG_CATEGORY_ACCENTS.cv;

export function TeapotInAStadiumContent() {
  return (
    <div>
      <BlogSection sectionId="overview" accent={ACCENT}>
        <BlogParagraph>
          Teapot in a Stadium is an iOS app that renders augmented reality meshes in real-time
          inside UC Berkeley's Memorial Stadium. The app uses ARKit to track the camera's pose
          relative to the stadium, then overlays 3D models — including the classic graphics teapot —
          anchored to real-world positions on the stadium floor.
        </BlogParagraph>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="technical-approach" accent={ACCENT}>
        <BlogParagraph>
          The project was built as a final project for CS 184 (Computer Graphics and Imaging) with
          team members from the class. ARKit provides the camera tracking and world-space anchoring;
          the custom rendering layer draws the 3D meshes in real-time using Metal.
        </BlogParagraph>
        <BlogCallout accent={ACCENT}>
          AR mesh rendering at real-time framerates inside a large outdoor venue like Memorial Stadium
          requires careful management of occlusion, lighting estimation, and anchor drift — all
          challenges explored in this project.
        </BlogCallout>
      </BlogSection>

      <BlogSection sectionId="results" accent={ACCENT}>
        <BlogImage
          src="/images/graphics/stadium_ar/stadium_ar.jpg"
          alt="Teapot in Memorial Stadium"
          caption="AR teapot and mesh objects rendered inside UC Berkeley's Memorial Stadium"
        />
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="source-code" accent={ACCENT}>
        <BlogParagraph>
          The full source code and project documentation are available on GitHub. The repository
          includes the iOS app source, ARKit configuration, and Metal shader code.
        </BlogParagraph>
        <BlogCallout accent={ACCENT}>
          View the project on GitHub ↗ — link in the header above.
        </BlogCallout>
      </BlogSection>
    </div>
  );
}
