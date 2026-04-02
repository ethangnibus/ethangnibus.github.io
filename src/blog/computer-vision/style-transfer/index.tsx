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

export function StyleTransferContent() {
  return (
    <div>
      {/* ── Overview ─────────────────────────────────────────────────────── */}
      <BlogSection sectionId="overview" accent={ACCENT}>
        <BlogParagraph>
          In this project based on A Neural Algorithm of Artistic Style, I use the content and
          style features from VGG-Network to transfer the style from one image to another. I take
          these content and style features from 5 convolutional layers in VGG-Network, then train
          a separate neural network to balance the loss between an output image's content from one
          image and style from another image.
        </BlogParagraph>
        <BlogParagraph>
          Using the following VGG-Network architecture, A Neural Algorithm of Artistic Style uses
          conv1_1, conv2_1, conv3_1, and conv4_1 as style features and conv4_2 as the content
          feature.
        </BlogParagraph>
        <BlogImage
          src={`${B}/page4_img1.jpeg`}
          alt="VGG-Network Architecture"
          caption="VGG-Network Architecture"
        />
      </BlogSection>

      <BlogDivider color={ACCENT} />

      {/* ── Part 1 — Building The Network ────────────────────────────────── */}
      <BlogSection sectionId="building-the-network" accent={ACCENT}>
        <BlogParagraph>
          To implement the paper, I trained a neural network to take in two images and output one
          image. The goal of the style transfer neural network is to minimize the sum of the
          losses L_style and L_content.
        </BlogParagraph>
        <BlogCallout accent={ACCENT}>
          L_total = L_style + L_content
        </BlogCallout>
        <BlogParagraph>
          L_style aims to minimize the mean squared error between the Gram Matrices of the style
          image and the output image respectively. L_content aims to minimize the mean squared
          error between the content features of the content image and output image respectively.
          I used a variety of hyperparameters as seen below.
        </BlogParagraph>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      {/* ── Part 2 — Varying Style Ratio and Style Layers ────────────────── */}
      <BlogSection sectionId="style-ratio-layers" accent={ACCENT}>
        <BlogParagraph>
          Here I show how adjusting the style to content ratio affects outputs. From left to right
          I adjust from loss favoring content to loss favoring style. From top to bottom I change
          which layers the style features come from.
        </BlogParagraph>

        <BlogSubsection title="Conv1_1">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page4_img2.jpeg`, label: "Conv1_1: 10⁻⁵" },
              { src: `${B}/page4_img3.jpeg`, label: "Conv1_1: 10⁻⁴" },
              { src: `${B}/page4_img4.jpeg`, label: "Conv1_1: 10⁻³" },
              { src: `${B}/page4_img5.jpeg`, label: "Conv1_1: 10⁻²" },
            ]}
            columns={4}
            caption="Conv1_1 style layer — ratio from 10⁻⁵ (content-heavy) to 10⁻² (style-heavy)"
          />
        </BlogSubsection>

        <BlogSubsection title="Conv2_1">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page4_img6.jpeg`, label: "Conv2_1: 10⁻⁵" },
              { src: `${B}/page4_img7.jpeg`, label: "Conv2_1: 10⁻⁴" },
              { src: `${B}/page4_img8.jpeg`, label: "Conv2_1: 10⁻³" },
              { src: `${B}/page4_img9.jpeg`, label: "Conv2_1: 10⁻²" },
            ]}
            columns={4}
            caption="Conv2_1 style layer — ratio from 10⁻⁵ to 10⁻²"
          />
        </BlogSubsection>

        <BlogSubsection title="Conv3_1">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page5_img1.jpeg`, label: "Conv3_1: 10⁻⁵" },
              { src: `${B}/page5_img2.jpeg`, label: "Conv3_1: 10⁻⁴" },
              { src: `${B}/page5_img3.jpeg`, label: "Conv3_1: 10⁻³" },
              { src: `${B}/page5_img4.jpeg`, label: "Conv3_1: 10⁻²" },
            ]}
            columns={4}
            caption="Conv3_1 style layer — ratio from 10⁻⁵ to 10⁻²"
          />
        </BlogSubsection>

        <BlogSubsection title="Conv4_1">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page5_img5.jpeg`, label: "Conv4_1: 10⁻⁵" },
              { src: `${B}/page5_img6.jpeg`, label: "Conv4_1: 10⁻⁴" },
              { src: `${B}/page5_img7.jpeg`, label: "Conv4_1: 10⁻³" },
              { src: `${B}/page5_img8.jpeg`, label: "Conv4_1: 10⁻²" },
            ]}
            columns={4}
            caption="Conv4_1 style layer — ratio from 10⁻⁵ to 10⁻²"
          />
        </BlogSubsection>

        <BlogSubsection title="Conv5_1">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page5_img9.jpeg`, label: "Conv5_1: 10⁻⁵" },
              { src: `${B}/page5_img10.jpeg`, label: "Conv5_1: 10⁻⁴" },
              { src: `${B}/page5_img11.jpeg`, label: "Conv5_1: 10⁻³" },
              { src: `${B}/page5_img12.jpeg`, label: "Conv5_1: 10⁻²" },
            ]}
            columns={4}
            caption="Conv5_1 style layer — ratio from 10⁻⁵ to 10⁻²"
          />
        </BlogSubsection>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      {/* ── Part 3 — Multiple Different Styles on One Image ───────────────── */}
      <BlogSection sectionId="multiple-styles" accent={ACCENT}>
        <BlogParagraph>
          Here I show this project's capabilities by styling a picture of me eating a muffin on
          the beach:
        </BlogParagraph>

        <BlogFigureGrid
          figures={[
            { src: `${B}/page5_img13.jpeg`, label: "Style" },
            { src: `${B}/page5_img14.jpeg`, label: "Content" },
            { src: `${B}/page5_img15.jpeg`, label: "Output" },
          ]}
          columns={3}
          caption="Style transfer — set 1"
        />

        <BlogFigureGrid
          figures={[
            { src: `${B}/page5_img16.jpeg`, label: "Style" },
            { src: `${B}/page5_img17.jpeg`, label: "Content" },
            { src: `${B}/page6_img1.jpeg`, label: "Output" },
          ]}
          columns={3}
          caption="Style transfer — set 2"
        />

        <BlogFigureGrid
          figures={[
            { src: `${B}/page6_img2.jpeg`, label: "Style" },
            { src: `${B}/page6_img3.jpeg`, label: "Content" },
            { src: `${B}/page6_img4.jpeg`, label: "Output" },
          ]}
          columns={3}
          caption="Style transfer — set 3"
        />

        <BlogFigureGrid
          figures={[
            { src: `${B}/page6_img5.jpeg`, label: "Style" },
            { src: `${B}/page6_img6.jpeg`, label: "Content" },
            { src: `${B}/page6_img7.jpeg`, label: "Output" },
          ]}
          columns={3}
          caption="Style transfer — set 4"
        />

        <BlogFigureGrid
          figures={[
            { src: `${B}/page6_img8.jpeg`, label: "Style" },
            { src: `${B}/page6_img9.jpeg`, label: "Content" },
          ]}
          columns={3}
          caption="Style transfer — set 5"
        />
      </BlogSection>

      <BlogDivider color={ACCENT} />

      {/* ── Part 4 — Repetitive Styling ──────────────────────────────────── */}
      <BlogSection sectionId="repetitive-styling" accent={ACCENT}>
        <BlogParagraph>
          Just for fun, I decided to use the output of a style transfer as the style image in the
          next style transfer. Below are my results:
        </BlogParagraph>

        <BlogFigureGrid
          figures={[
            { src: `${B}/page7_img1.jpeg`, label: "Style" },
            { src: `${B}/page7_img2.jpeg`, label: "Content" },
            { src: `${B}/page7_img3.jpeg`, label: "Output" },
          ]}
          columns={3}
          caption="Repetitive styling — iteration 1"
        />

        <BlogFigureGrid
          figures={[
            { src: `${B}/page7_img3.jpeg`, label: "Style (prev output)" },
            { src: `${B}/page7_img2.jpeg`, label: "Content" },
            { src: `${B}/page7_img4.jpeg`, label: "Output" },
          ]}
          columns={3}
          caption="Repetitive styling — iteration 2"
        />

        <BlogFigureGrid
          figures={[
            { src: `${B}/page7_img4.jpeg`, label: "Style (prev output)" },
            { src: `${B}/page7_img2.jpeg`, label: "Content" },
            { src: `${B}/page7_img5.jpeg`, label: "Output" },
          ]}
          columns={3}
          caption="Repetitive styling — iteration 3"
        />

        <BlogFigureGrid
          figures={[
            { src: `${B}/page7_img5.jpeg`, label: "Style (prev output)" },
            { src: `${B}/page7_img2.jpeg`, label: "Content" },
            { src: `${B}/page7_img6.jpeg`, label: "Output" },
          ]}
          columns={3}
          caption="Repetitive styling — iteration 4"
        />

        <BlogFigureGrid
          figures={[
            { src: `${B}/page8_img1.jpeg`, label: "Style (prev output)" },
            { src: `${B}/page8_img2.jpeg`, label: "Content" },
            { src: `${B}/page8_img3.jpeg`, label: "Output" },
          ]}
          columns={3}
          caption="Repetitive styling — iteration 5"
        />
      </BlogSection>
    </div>
  );
}
