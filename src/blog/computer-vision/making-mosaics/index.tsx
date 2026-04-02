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

const B = "/blog/learning-vision/making-mosaics/images";

const ACCENT = BLOG_CATEGORY_ACCENTS.cv;

export function MakingMosaicsContent() {
  return (
    <div>
      <BlogSection sectionId="overview" accent={ACCENT}>
        <BlogParagraph>
          In this project I take images collected with my phone and warp them together into a
          seamless mosaic. To do this, I must first take pictures, define correspondences inside
          of each image, use these correspondences to recover homographies, then use these
          homographies to warp the image so that I could turn them into mosaics. I create both
          rectified images and mosaics.
        </BlogParagraph>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="warping-mosaicing" accent={ACCENT}>
        <BlogSubsection title="1.1 — Shoot the Pictures">
          <BlogParagraph>
            I chose to shoot two pictures outside of FSM in Berkeley. These are what the pictures
            look like with no editing:
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page1_img1.png`, label: "FSM 1" },
              { src: `${B}/page1_img2.png`, label: "FSM 2" },
            ]}
            caption="Input image pair shot outside FSM at UC Berkeley"
          />
        </BlogSubsection>

        <BlogSubsection title="1.2 — Recover Homographies">
          <BlogParagraph>
            To make a mosaic between both images, I chose to forward warp from FSM 1 to FSM 2.
            This involved me finding the matrix H, such that if we have a point p on FSM 1 and a
            point p' on FSM 2, then H @ p ≈ p'. Doing this required me to make a GUI to select 4
            or more correspondences on both images.
          </BlogParagraph>
          <BlogParagraph>
            I ended up choosing 19 correspondences and used least squares to approximate the best
            H for the homography. Below is the GUI I made.
          </BlogParagraph>
          <BlogImage
            src={`${B}/page2_img1.png`}
            alt="Correspondence selection GUI"
            caption="GUI used to select 19 correspondence points across both images"
          />
        </BlogSubsection>

        <BlogSubsection title="1.3 — Warp the Images">
          <BlogParagraph>
            Now that I have a homography, I can warp my original image into the homography!
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page2_img2.png`, label: "FSM 1" },
              { src: `${B}/page2_img3.png`, label: "FSM 1 Warped" },
            ]}
            caption="FSM 1 before and after applying the homography warp"
          />
        </BlogSubsection>

        <BlogSubsection title="1.4 — Image Rectification">
          <BlogParagraph>
            Using this warping technique, we can now rectify images so that we can change the
            perspective of the camera looking at them!
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page2_img4.png`, label: "Pattern on my table" },
              { src: `${B}/page2_img5.png`, label: "Rectified pattern on my table" },
            ]}
            caption="Table surface rectified to appear face-on"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page3_img1.png`, label: "Pattern on my walkway" },
              { src: `${B}/page3_img2.png`, label: "Rectified pattern on my walkway" },
            ]}
            caption="Walkway pattern rectified to appear face-on"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page3_img3.png`, label: "Pattern on my bathroom floor" },
              { src: `${B}/page3_img4.png`, label: "Rectified pattern on my bathroom floor" },
            ]}
            caption="Bathroom floor pattern rectified to appear face-on"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page3_img5.png`, label: "My back wall" },
              { src: `${B}/page3_img6.png`, label: "My back wall rectified to face front" },
            ]}
            caption="Historic Berkeley house back wall rectified to face the camera"
          />
          <BlogParagraph>
            If we crop the rectified image, we can see the back wall facing towards us:
          </BlogParagraph>
          <BlogImage
            src={`${B}/page3_img7.png`}
            alt="Back wall rectified and cropped to face front"
            caption="My back wall rectified and cropped to face front"
          />
        </BlogSubsection>

        <BlogSubsection title="1.5 — Blend the Images into a Mosaic">
          <BlogParagraph>
            Now that we can rectify images, we can warp one image then translate the other to
            overlap with the first. By using a Laplacian pyramid, we can blend both of these
            images to make a smooth mosaic.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page4_img1.png`, label: "FSM 1" },
              { src: `${B}/page4_img2.png`, label: "FSM 2" },
            ]}
            caption="Input images"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page4_img3.png`, label: "Warped FSM 1" },
              { src: `${B}/page4_img4.png`, label: "FSM 2" },
            ]}
            caption="FSM 1 warped into FSM 2's coordinate frame, alongside FSM 2"
          />
          <BlogImage
            src={`${B}/page4_img5.png`}
            alt="FSM mosaic"
            caption="Final Laplacian-blended mosaic"
          />
        </BlogSubsection>

        <BlogSubsection title="1.6 — What I Learned">
          <BlogParagraph>
            In this project, the coolest thing I learned is how to compute homographies! Using
            homographies, I can warp the perspective of a photo so that I could view it at
            different angles. My favorite example of this is when I warped the back wall of a
            historic house in Berkeley so that you could view it from the front. I think this has
            super cool use cases and I'm excited to use it more in the future.
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="1.7 — Bells and Whistles">
          <BlogParagraph>I did not complete any bells and whistles.</BlogParagraph>
        </BlogSubsection>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="feature-matching-autostitching" accent={ACCENT}>
        <BlogParagraph>
          In this part I extend the previous section by automatically finding correspondence points
          on the input images. This entails implementing automatic corner detection, finding feature
          descriptors for those corners, matching corners across images using these feature
          descriptors, using RANSAC to compute the homography between images, then passing the
          result into my previous code to get a mosaic.
        </BlogParagraph>

        <BlogSubsection title="2.1 — Detecting Corner Features in an Image">
          <BlogParagraph>
            Here I implement a single-scale Harris Interest Point Detector without sub-pixel
            accuracy. Below I display a figure of the Harris corners overlaid on the input images.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page5_img1.png`, label: "FSM 1" },
              { src: `${B}/page5_img2.png`, label: "FSM 2" },
            ]}
            caption="Original input images"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page5_img3.png`, label: "FSM 1 with points" },
              { src: `${B}/page5_img4.png`, label: "FSM 2 with points" },
            ]}
            caption="Harris corners overlaid on both images"
          />
        </BlogSubsection>

        <BlogSubsection title="2.2 — Extracting a Feature Descriptor for Each Feature Point">
          <BlogParagraph>
            Here I implement Adaptive Non-Maximal Suppression (ANMS) to extract feature
            descriptors for each feature point. ANMS reduces the full set of Harris corners to a
            well-distributed subset by retaining only corners that are locally maximal within a
            suppression radius. Below I include the chosen corners overlaid on the input images.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page6_img1.png`, label: "FSM 1 with all points" },
              { src: `${B}/page6_img2.png`, label: "FSM 2 with all points" },
            ]}
            caption="All ANMS candidate points on both images"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page6_img3.png`, label: "FSM 1 with chosen points" },
              { src: `${B}/page6_img4.png`, label: "FSM 2 with chosen points" },
            ]}
            caption="Final chosen interest points after ANMS filtering"
          />
          <BlogParagraph>
            Here I implement feature descriptor extraction with no rotation invariance nor wavelet
            transform. To do this, I extract 8×8 patches sampled from larger 40×40 windows. I
            bias/gain-normalize the descriptors to improve accuracy. This is what one looks like:
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="2.3 — Matching Feature Descriptors Between Two Images">
          <BlogParagraph>
            Here I implement feature matching. To do this, I used nearest neighbors to find
            corresponding points on both images. For each point in Image A, I found its first and
            second nearest neighbor points in Image B, 1-NN and 2-NN respectively. Next I
            calculated the Lowe Ratio (1-NN / 2-NN). I then filtered out points that had high
            Lowe Ratios by discarding them if they are above a certain threshold of my choosing.
            The reasoning behind this is that if two points on Image B have similar
            Squared-Sums of Differences with a point on Image A, then it's more likely that both
            aren't matches to the point on Image A. Below I show the result of this process, with
            FSM 1 acting as Image A and FSM 2 acting as Image B:
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page7_img1.png`, label: "Matched points on FSM 1" },
              { src: `${B}/page7_img2.png`, label: "Matched points on FSM 2" },
            ]}
            caption="Automatically matched correspondences after Lowe's ratio test filtering"
          />
        </BlogSubsection>

        <BlogSubsection title="2.4 — Use RANSAC to Compute a Homography">
          <BlogParagraph>
            In this part I implement RANSAC to compute a homography between my images. In the next
            part, I will feed this homography into my code from Part 1 to produce a mosaic!
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page7_img3.png`, label: "4 points used to get homography on im1" },
              { src: `${B}/page7_img4.png`, label: "4 points used to get homography on im2" },
            ]}
            caption="The 4 RANSAC-selected inlier points used to compute the final homography"
          />
        </BlogSubsection>

        <BlogSubsection title="2.5 — Produce Some Mosaics">
          <BlogParagraph>
            Below I feed some sample images into my code from Part 2 then Part 1 to produce some
            mosaics. I also compare these mosaics to the one I produce by hand-selecting their
            correspondences.
          </BlogParagraph>

          <BlogCallout accent={ACCENT}>FSM</BlogCallout>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page8_img1.png`, label: "FSM 1" },
              { src: `${B}/page8_img2.png`, label: "FSM 2" },
            ]}
            caption="FSM input images"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page8_img3.png`, label: "Mosaic with automatically chosen correspondences" },
              { src: `${B}/page8_img4.png`, label: "Mosaic with manually chosen correspondences" },
            ]}
            caption="FSM mosaic: auto vs. manual correspondences"
          />
          <BlogParagraph>
            Both images look good, but the points chosen by hand looks slightly cleaner than the
            points chosen automatically. In the automatic case, there is some fading around the
            "Berkeley" letters, because the points chosen are kind of close to each other. This
            makes the homography less accurate the further you go from those points. Since the
            "Berkeley" letters aren't in the points, they are subject to this artifact.
          </BlogParagraph>

          <BlogCallout accent={ACCENT}>Butterfly</BlogCallout>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page9_img1.png`, label: "Butterfly 1" },
              { src: `${B}/page9_img2.png`, label: "Butterfly 2" },
            ]}
            caption="Butterfly input images"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page9_img3.png`, label: "Mosaic with automatically chosen correspondences" },
              { src: `${B}/page9_img4.png`, label: "Mosaic with manually chosen correspondences" },
            ]}
            caption="Butterfly mosaic: auto vs. manual correspondences"
          />
          <BlogParagraph>
            Both look bad. If I fail to hold my camera steadily while taking the 2 pictures, I
            might change its position too much resulting in a huge change in perspective. This
            makes the panorama bad even if my transform and automatic point recognition works
            perfectly.
          </BlogParagraph>

          <BlogCallout accent={ACCENT}>Cory Courtyard</BlogCallout>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page9_img5.png`, label: "Cory 1" },
              { src: `${B}/page9_img6.png`, label: "Cory 2" },
            ]}
            caption="Cory Hall courtyard input images"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page10_img1.png`, label: "Mosaic with automatically chosen correspondences" },
              { src: `${B}/page10_img2.png`, label: "Mosaic with manually chosen correspondences" },
            ]}
            caption="Cory Hall mosaic: auto vs. manual correspondences"
          />
          <BlogParagraph>
            Both work perfectly! If I take pictures correctly and my automatic point recognition
            works, then you can't decipher the transition from one to the next at all.
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="2.6 — What I Learned">
          <BlogParagraph>
            Making panoramas is much more difficult than I ever thought. I really liked writing the
            code to find points, but I found it really hard to write the code to find homographies.
            I ended up enjoying the entire process after I understood it. I also found out that the
            quality of your panorama is highly dependent on how good you are at stabilizing your
            camera when you take pictures.
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="2.7 — Bells and Whistles">
          <BlogParagraph>I did not complete any Bells and Whistles.</BlogParagraph>
        </BlogSubsection>
      </BlogSection>
    </div>
  );
}
