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

const B = "/blog/learning-vision/style-transfer/images";

const ACCENT = BLOG_CATEGORY_ACCENTS.cv;

export function AlternateRealityContent() {
  return (
    <div>
      <BlogSection sectionId="overview" accent={ACCENT}>
        <BlogParagraph>
          Using a box I drew on and a live video, I attempt to recreate an Augmented Reality
          scene where I can render using 3 dimensions. Limiting myself to only a box with known
          3D coordinates and a video as input, this means I must proceed without knowing intrinsic
          parameters of the camera.
        </BlogParagraph>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="importing-video-feed" accent={ACCENT}>
        <BlogParagraph>
          To complete this project I decided to use cv2's VideoCapture function. This allowed me
          to read in video data in real-time. For the sake of this proof-of-concept, I chose to
          use the video clip below.
        </BlogParagraph>
        <BlogImage
          src={`${B}/page1_img1.png`}
          alt="Recorded video of hand-drawn box"
          caption="Recorded on my phone"
        />
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="tracking-points" accent={ACCENT}>
        <BlogParagraph>
          To make a 3D scene, I can correspond 2D (x, y) points in image-space to 3D (x, y, z)
          points in world-space. The first step in this process is to label 2D (x, y) points in
          image-space. I used matplotlib.pyplot.ginput() to manually label the 2D (x, y) points
          in the first frame of the video. To get the points in the rest of the frames, I used
          off the shelf tracking from cv2! To do this I initialized a separate Median Flow
          tracker on every point from the first frame (cv2.TrackerMedianFlow_create()) and tracked
          until the last frame. My results are below:
        </BlogParagraph>
        <BlogImage
          src={`${B}/page1_img2.png`}
          alt="Video showing tracked points across frames"
          caption="Tracked Points"
        />
        <BlogImage
          src={`${B}/page2_img1.png`}
          alt="Tracked points visualized on the box"
          caption="Tracked Points"
        />
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="projection-matrices" accent={ACCENT}>
        <BlogParagraph>
          Using the known 3D (x, y, z) world-space points that correspond to the 2D (x, y)
          image-space points we just retrieved by tracking, we can recover a transformation
          matrix for every frame that enables us to project 3D meshes onto our 2D video!
        </BlogParagraph>
        <BlogParagraph>
          We proceed by solving least squares on our 2D and 3D points based on the following
          diagram:
        </BlogParagraph>
        <BlogImage
          src={`${B}/page2_img2.jpeg`}
          alt="Linear least squares diagram for camera calibration"
          caption="Linear Least Squares for Camera Calibration"
        />
        <BlogParagraph>
          Where (Xi, Yi, Zi) are the 3D world-space points that correspond to the (ui, vi) 2D
          image-space points. We can reshape the resulting vector to get the following matrix
          filled with mi entries. This matrix is the projection matrix that allows us to go from
          3D world-space to 2D image-space.
        </BlogParagraph>
        <BlogImage
          src={`${B}/page2_img3.jpeg`}
          alt="The projection matrix"
          caption="The Projection Matrix"
        />
        <BlogParagraph>
          Here I display the 3D world-space's axes by defining points in 3D world-space,
          projecting them into 2D image-space, then using cv2's line() function to draw to the
          screen! I repeat this process separately for every frame.
        </BlogParagraph>
        <BlogImage
          src={`${B}/page2_img4.png`}
          alt="Video showing world-space axes projected onto the box"
          caption="Displaying (x, y, z) world-space axes"
        />
        <BlogImage
          src={`${B}/page3_img1.png`}
          alt="World-space axes rendered on the video frame"
          caption="Displaying (x, y, z) world-space axes"
        />
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="displaying-the-box" accent={ACCENT}>
        <BlogParagraph>
          I use the method from above to define a box object in our scene. I use cv2's
          drawContours function to draw the box's green bottom using triangles.
        </BlogParagraph>
        <BlogFigureGrid
          figures={[
            { src: `${B}/page3_img2.png`, label: "Box Mesh", alt: "3D box mesh rendered onto the video frame" },
            { src: `${B}/page3_img3.jpeg`, label: "Box Mesh", alt: "3D box mesh rendered onto the video frame" },
          ]}
          caption="Box Mesh — a 3D box rendered onto the video frame using the recovered projection matrix"
        />
      </BlogSection>
    </div>
  );
}
