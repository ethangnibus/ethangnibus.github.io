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

const B = "/blog/learning-vision/recolorizing/images";

const ACCENT = BLOG_CATEGORY_ACCENTS.cv;

export function RecolorizingContent() {
  return (
    <div>
      <BlogSection sectionId="overview" accent={ACCENT}>
        <BlogParagraph>
          In the early 1900s, Sergei Mikhailovich Prokudin-Gorskii traveled around the
          Russian Empire with a goal in mind to photograph everything he saw in color.
          This was before color photography existed, so Sergei planned to take pictures of
          the same scene three times in a row. One photograph would be taken with a filter
          over the lens so that only red light would be captured. The second would only capture
          green light. The third would only capture blue. Sergei hypothesized that one could
          project all three images together to reconstruct said scene in full color! In this
          project I aim to take individual R, G, B photos from Sergei's collection, align them
          using code, then output them as a full color image.
        </BlogParagraph>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="approach" accent={ACCENT}>
        <BlogSubsection title="Exhaustive Search Alignment">
          <BlogParagraph>
            To implement this image-aligning program, I first split the scans of Sergei's photos
            into three channels: R, G, and B. Next, I implemented a function that aligns two images
            using exhaustive search. This function translates the G and R channels by every (x, y)
            displacement vector where x is chosen from the range −15 to 15 and y is chosen from the
            range −15 to 15. At each displacement vector, I used an image matching metric to score
            each displacement vector. I implemented Sum of Squared Differences (SSD) and normalized
            cross-correlation (NCC), but I found that NCC's results were better so I chose to use the
            latter. After scoring every displacement vector for a channel, I took the one that scored
            the best, and used it to translate the input channel by said vector. This way, the R and G
            channels can be aligned to the B channel if they were to be overlapped. I finished up by
            writing code that took these three individual R, G, and B channels, then combined them to
            be shown as a full color image.
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="Image Pyramid">
          <BlogParagraph>
            This implementation worked for small images (it worked perfectly on 256×256 images for
            example), but as the dimensions of an image increased, the program took far too long to
            compute. Not only that, but the quality of alignment dropped and eventually stopped working.
            This was because the (−15, 15) range of displacement I tested and ranked became obsolete as
            the image sizes I tested increased since they had lower frequency change between pixels. To
            account for this, I implemented an image pyramid function to speed up alignment and ensure
            that it worked across all image sizes.
          </BlogParagraph>
          <BlogParagraph>
            To construct this image pyramid, I created a mipmap-like collection of rescaled versions of
            the input channel and the channel to compare it to. I downsampled the input channels by a
            factor of two, stored the downsampled channels, then repeated the process until the
            downsampled input channel was small enough to accurately align with the downsampled compare
            channel using displacement vectors with changes in x being from the range −15 to 15 and
            changes in y from the range −15 to 15. Once I had the displacement vector at the lowest
            resolution in the pyramid, I multiplied the displacement vector by a factor of 2, applied the
            transition to the input channel one resolution layer above it, then tested aligning the input
            channel at this layer with the output layer at the same layer using displacement vectors with
            changes in x being from the range −3 to 3 and changes in y from the range −3 to 3. I lowered
            the ranges of values that we choose from because the adjustments we need to make after aligning
            one layer below are small (and the program will run faster with a smaller range of tested
            displacement vectors). I then add these displacements to the previous displacement vector,
            multiply the displacement vector by a factor of 2, and iteratively repeat the process on all
            levels of the image pyramid until we reach the highest resolution channels. Once the program
            reaches the highest resolution channels, they should align nicely when translated by the total
            accumulated displacement vector.
          </BlogParagraph>
          <BlogParagraph>
            By following this algorithm, I was able to align images that normally took minutes to compute
            in less than 10 seconds.
          </BlogParagraph>
          <BlogParagraph>
            This implementation worked for many images and was fast, but for some images it failed to align
            images properly. Because of this, I decided to implement edge detection and image normalization
            to improve my accuracy. See the Bells and Whistles section for more details.
          </BlogParagraph>
        </BlogSubsection>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="result-example-images" accent={ACCENT}>
        <BlogParagraph>
          The following is the result of my algorithm on all the provided example images.
        </BlogParagraph>

        <BlogCallout accent={ACCENT}>
          Displacements are (x, y) pixel offsets applied to the G and R channels to align them
          to the B channel.
        </BlogCallout>

        {/* cathedral.tif */}
        <BlogSubsection title="cathedral.tif">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page2_img1.jpeg`, label: "Before displacement" },
              { src: `${B}/page2_img2.jpeg`, label: "After — G: (2, 4)  R: (2, 12)" },
            ]}
            caption="cathedral.tif"
          />
        </BlogSubsection>

        {/* church.tif */}
        <BlogSubsection title="church.tif">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page2_img3.jpeg`, label: "Before displacement" },
              { src: `${B}/page2_img4.jpeg`, label: "After — G: (0, 24)  R: (0, 62)" },
            ]}
            caption="church.tif"
          />
        </BlogSubsection>

        {/* emir.tif */}
        <BlogSubsection title="emir.tif">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page2_img5.jpeg`, label: "Before displacement" },
              { src: `${B}/page2_img6.jpeg`, label: "After — G: (24, 48)  R: (40, 106)" },
            ]}
            caption="emir.tif"
          />
        </BlogSubsection>

        {/* harvesters.tif */}
        <BlogSubsection title="harvesters.tif">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page3_img1.jpeg`, label: "Before displacement" },
              { src: `${B}/page3_img2.jpeg`, label: "After — G: (18, 60)  R: (10, 124)" },
            ]}
            caption="harvesters.tif"
          />
        </BlogSubsection>

        {/* icon.tif */}
        <BlogSubsection title="icon.tif">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page3_img3.jpeg`, label: "Before displacement" },
              { src: `${B}/page3_img4.jpeg`, label: "After — G: (16, 40)  R: (22, 88)" },
            ]}
            caption="icon.tif"
          />
        </BlogSubsection>

        {/* lady.tif */}
        <BlogSubsection title="lady.tif">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page3_img5.jpeg`, label: "Before displacement" },
              { src: `${B}/page3_img6.jpeg`, label: "After — G: (10, 56)  R: (12, 120)" },
            ]}
            caption="lady.tif"
          />
        </BlogSubsection>

        {/* melons.tif */}
        <BlogSubsection title="melons.tif">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page4_img1.jpeg`, label: "Before displacement" },
              { src: `${B}/page4_img2.jpeg`, label: "After — G: (10, 80)  R: (12, 176)" },
            ]}
            caption="melons.tif"
          />
        </BlogSubsection>

        {/* monastery.jpg */}
        <BlogSubsection title="monastery.jpg">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page4_img3.jpeg`, label: "Before displacement" },
              { src: `${B}/page4_img4.jpeg`, label: "After — G: (0, −4)  R: (2, 2)" },
            ]}
            caption="monastery.jpg"
          />
        </BlogSubsection>

        {/* onion_church.tif */}
        <BlogSubsection title="onion_church.tif">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page4_img5.jpeg`, label: "Before displacement" },
              { src: `${B}/page4_img6.jpeg`, label: "After — G: (26, 52)  R: (36, 108)" },
            ]}
            caption="onion_church.tif"
          />
        </BlogSubsection>

        {/* sculpture.tif */}
        <BlogSubsection title="sculpture.tif">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page5_img1.jpeg`, label: "Before displacement" },
              { src: `${B}/page5_img2.jpeg`, label: "After — G: (−10, 32)  R: (−26, 140)" },
            ]}
            caption="sculpture.tif"
          />
        </BlogSubsection>

        {/* self_portrait.tif */}
        <BlogSubsection title="self_portrait.tif">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page5_img3.jpeg`, label: "Before displacement" },
              { src: `${B}/page5_img4.jpeg`, label: "After — G: (30, 80)  R: (36, 174)" },
            ]}
            caption="self_portrait.tif"
          />
        </BlogSubsection>

        {/* three_generations.tif */}
        <BlogSubsection title="three_generations.tif">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page5_img5.jpeg`, label: "Before displacement" },
              { src: `${B}/page5_img6.jpeg`, label: "After — G: (0, 60)  R: (0, 116)" },
            ]}
            caption="three_generations.tif"
          />
        </BlogSubsection>

        {/* tobolsk.jpg */}
        <BlogSubsection title="tobolsk.jpg">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page6_img1.jpeg`, label: "Before displacement" },
              { src: `${B}/page6_img2.jpeg`, label: "After — G: (2, 2)  R: (2, 6)" },
            ]}
            caption="tobolsk.jpg"
          />
        </BlogSubsection>

        {/* train.tif */}
        <BlogSubsection title="train.tif">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page6_img3.jpeg`, label: "Before displacement" },
              { src: `${B}/page6_img4.jpeg`, label: "After — G: (0, 42)  R: (28, 84)" },
            ]}
            caption="train.tif"
          />
        </BlogSubsection>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="result-extra-images" accent={ACCENT}>
        <BlogParagraph>
          The following is the result of my algorithm on some other images downloaded from
          the Prokudin-Gorskii collection.
        </BlogParagraph>

        {/* lake.tif */}
        <BlogSubsection title="lake.tif">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page6_img5.jpeg`, label: "Before displacement" },
              { src: `${B}/page6_img6.jpeg`, label: "After — G: (6, −24)  R: (8, −36)" },
            ]}
            caption="lake.tif"
          />
        </BlogSubsection>

        {/* shell.tif */}
        <BlogSubsection title="shell.tif">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page7_img1.jpeg`, label: "Before displacement" },
              { src: `${B}/page7_img2.jpeg`, label: "After — G: (4, 26)  R: (8, 110)" },
            ]}
            caption="shell.tif"
          />
        </BlogSubsection>

        {/* rock.tif */}
        <BlogSubsection title="rock.tif">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page7_img3.jpeg`, label: "Before displacement" },
              { src: `${B}/page7_img4.jpeg`, label: "After — G: (2, 44)  R: (2, 164)" },
            ]}
            caption="rock.tif"
          />
        </BlogSubsection>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="bells-and-whistles" accent={ACCENT}>
        <BlogSubsection title="Channel Normalization">
          <BlogParagraph>
            I implemented channel normalization in an attempt to make similarities in the input
            channel and compare channel more apparent. Here's an example of a channel before
            and after normalization.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page8_img1.jpeg`, label: "Before normalize" },
              { src: `${B}/page8_img2.jpeg`, label: "After normalize" },
            ]}
            caption="Channel before and after normalization"
          />
        </BlogSubsection>

        <BlogSubsection title="Edge Detection">
          <BlogParagraph>
            I implemented Edge Detection by referencing a lecture on the topic I found at
            https://www.cse.psu.edu/~rtc12/CSE486/lecture02.pdf. This approach involves taking
            two partial derivatives in the x and y direction, then using the magnitude of those
            partial derivative channels to edge detect! I found that it worked best when I ignored
            the y direction. Results are as follows:
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page8_img3.jpeg`, label: "Input channel" },
              { src: `${B}/page8_img4.jpeg`, label: "Ix = Partial derivative wrt x" },
            ]}
            caption="Edge detection pipeline (1/2)"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page8_img5.jpeg`, label: "Iy = Skipping partial derivative wrt y" },
              { src: `${B}/page8_img6.jpeg`, label: "Magnitude of gradient (Ix² + Iy²)" },
            ]}
            caption="Edge detection pipeline (2/2)"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page9_img1.jpeg`, label: "After normalization" },
              { src: `${B}/page9_img2.jpeg`, label: "Result after applying to G and R" },
            ]}
            caption="Normalized gradient and final result applied to G and R channels"
          />
        </BlogSubsection>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="bells-and-whistles-results" accent={ACCENT}>
        <BlogParagraph>
          Altogether, my extra work paid off!
        </BlogParagraph>
        <BlogFigureGrid
          figures={[
            { src: `${B}/page9_img3.jpeg`, label: "Before" },
            { src: `${B}/page9_img4.jpeg`, label: "After" },
          ]}
          caption="Before and after applying channel normalization and edge detection"
        />
      </BlogSection>
    </div>
  );
}
