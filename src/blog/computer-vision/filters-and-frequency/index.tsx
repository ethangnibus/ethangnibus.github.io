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

const B = "/blog/learning-vision/filters-and-frequency/images";

const ACCENT = BLOG_CATEGORY_ACCENTS.cv;

export function FiltersAndFrequencyContent() {
  return (
    <div>
      <BlogSection sectionId="overview" accent={ACCENT}>
        <BlogParagraph>
          In this project, I manipulate images using filters and frequency to extract useful
          information and make cool art. I use filters to blur images, take the partial derivative
          in x and y of images, and edge detect images. I use frequencies to sharpen images, make
          hybrid images, and blend images together!
        </BlogParagraph>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="fun-with-filters" accent={ACCENT}>
        <BlogSubsection title="1.1 Finite Difference Operator">
          <BlogParagraph>
            Here is the starting point — the classic cameraman image:
          </BlogParagraph>
          <BlogImage
            src={`${B}/page1_img1.png`}
            alt="Cameraman input image"
            caption="cameraman.png"
          />
          <BlogParagraph>
            We can find the partial derivative in x and y of any image using convolution. To do
            this, we construct the finite difference operators D_x = [1, −1] and D_y = [1, −1]ᵀ,
            then convolve the original image by each to get the following:
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page2_img1.jpeg`, label: "Partial derivative in x", alt: "Partial derivative in x" },
              { src: `${B}/page2_img2.jpeg`, label: "Partial derivative in y", alt: "Partial derivative in y" },
            ]}
          />
          <BlogParagraph>
            We can combine the partial derivatives in x and y to get the gradient magnitude of our
            original image:
          </BlogParagraph>
          <BlogImage
            src={`${B}/page2_img3.jpeg`}
            alt="Gradient magnitude"
            caption="Gradient Magnitude"
          />
          <BlogParagraph>
            To edge detect, we binarize the gradient magnitude by turning pixels white if their
            value is above a threshold, or black if not:
          </BlogParagraph>
          <BlogImage
            src={`${B}/page2_img4.jpeg`}
            alt="Bad edge detection"
            caption="Bad Edge Detection"
          />
          <BlogParagraph>
            Using partial derivatives, we are able to find the slope of how fast things change in
            the x and y directions of our images. If the slope is high at a given point, we know
            that significant change happens there. Knowing where significant change occurs in the x
            and y directions is useful because we can combine them to see where significant change
            happens in both directions — this is essentially what taking the gradient magnitude
            does. Now that we know where significant change is in all directions, we can use that
            information to determine how significant that change must be for our algorithm to
            recognize that pixel as an edge.
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="1.2 Derivative of Gaussian (DoG) Filter">
          <BlogParagraph>
            Unfortunately, our edge detection algorithm alone results in lots of unwanted noise. To
            filter out some of the high frequencies, we run the original image through a low-pass
            filter before running our edge detection algorithm:
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page3_img1.png`, label: "Input Image", alt: "Input image" },
              { src: `${B}/page3_img2.jpeg`, label: "Blurred Image", alt: "Blurred image" },
              { src: `${B}/page3_img3.jpeg`, label: "Edge Detection (blurred)", alt: "Edge detection after blur" },
            ]}
            columns={3}
          />
          <BlogParagraph>
            Here we compare our old edge detection algorithm (no blur) and our new edge detection
            algorithm (with blur):
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page3_img4.jpeg`, label: "Edge Detection Before Blur", alt: "Edge detection before blur" },
              { src: `${B}/page3_img3.jpeg`, label: "Edge Detection After Blur", alt: "Edge detection after blur" },
            ]}
            caption="Blurring before edge detection removes noise at the cost of thicker edges"
          />
          <BlogParagraph>
            As we can see, when we blur we get much less noise! This is because blurring an image
            removes its high frequencies. We can also see that this process has a tradeoff — the
            edge detection algorithm finds fine lines on the unblurred image, but thick lines on the
            blurred image. The lack of high-frequency data makes our edge detection estimate on
            lower-frequency data, resulting in less drastic change. This shows the dynamic between
            edge detection accuracy and noise reduction that must be optimized when making an edge
            detection algorithm.
          </BlogParagraph>
          <BlogCallout accent={ACCENT}>
            Runtime Optimizations: To speed up our algorithm, we can take the derivative of the
            Gaussian filters and use them to convolve the input image directly. This reduces from 3
            convolution calls to 2 while producing the same result.
          </BlogCallout>
          <BlogParagraph>
            Here is a visualization of the two approaches. The "before" approach convolves the
            input image by a Gaussian filter first, then takes partial derivatives (3 convolution
            calls total):
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page4_img1.png`, label: "Input Image", alt: "Input image" },
              { src: `${B}/page4_img2.png`, label: "Convolve input image by Gaussian Filter", alt: "Convolve by Gaussian diagram" },
              { src: `${B}/page4_img3.jpeg`, label: "Blurred Image", alt: "Blurred image" },
              { src: `${B}/page4_img4.jpeg`, label: "Partial derivative in x (one convolution call)", alt: "Partial derivative in x" },
              { src: `${B}/page4_img5.jpeg`, label: "Partial derivative in y (one convolution call)", alt: "Partial derivative in y" },
              { src: `${B}/page4_img6.jpeg`, label: "Gradient Magnitude", alt: "Gradient magnitude" },
            ]}
            caption="Before runtime optimizations — 3 convolution calls"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page5_img1.png`, label: "Output Image", alt: "Output image before optimization" },
            ]}
            caption="Output — 3 convolution calls total"
          />
          <BlogParagraph>
            The "after" approach convolves directly by the pre-differentiated Gaussian filters (2
            convolution calls total):
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page5_img6.png`, label: "Input Image", alt: "Input image" },
              { src: `${B}/page5_img3.jpeg`, label: "Blurred Partial Derivative in x", alt: "Blurred partial derivative in x" },
              { src: `${B}/page5_img4.jpeg`, label: "Blurred Partial Derivative in y", alt: "Blurred partial derivative in y" },
              { src: `${B}/page5_img7.jpeg`, label: "Gradient Magnitude", alt: "Gradient magnitude" },
              { src: `${B}/page6_img1.jpeg`, label: "Output Image", alt: "Output image" },
            ]}
            caption="After runtime optimizations — 2 convolution calls, same result"
          />
        </BlogSubsection>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="fun-with-frequencies" accent={ACCENT}>
        <BlogSubsection title="2.1 Image Sharpening">
          <BlogParagraph>
            Sometimes when you are working with images, you find yourself with a blurry image that
            you want to sharpen. To sharpen an image, we make its high-frequency data more
            prominent. We pass the image through a low-pass filter by convolving it with a
            Gaussian, getting a blurred version. Then we subtract the blurred image from the
            original to get the high-frequency data. Finally, we add the high-frequency data back
            into the original image and get a sharpened image:
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page6_img2.jpeg`, label: "Input Image", alt: "Input image" },
              { src: `${B}/page6_img3.jpeg`, label: "Low Frequencies", alt: "Low frequencies" },
              { src: `${B}/page7_img1.jpeg`, label: "High Frequencies", alt: "High frequencies" },
              { src: `${B}/page7_img2.png`, label: "Sharpened Image", alt: "Sharpened image" },
            ]}
            caption="Sharpening via high-frequency extraction and re-addition"
          />
          <BlogParagraph>
            For simplicity, here is the same process shown on just the red channel of an image:
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page7_img3.jpeg`, label: "Input Image (red channel)", alt: "Input image red channel" },
              { src: `${B}/page7_img4.jpeg`, label: "Low Frequencies", alt: "Low frequencies" },
              { src: `${B}/page7_img5.jpeg`, label: "High Frequencies", alt: "High frequencies" },
              { src: `${B}/page8_img1.jpeg`, label: "Sharpened Image", alt: "Sharpened image" },
            ]}
            caption="Red channel sharpening breakdown"
          />
          <BlogParagraph>
            We can combine all these operations into a single convolution called the unsharp mask
            filter. This makes sharpening across all color channels easy:
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page8_img2.png`, label: "Input Image", alt: "Input image" },
              { src: `${B}/page8_img3.jpeg`, label: "Sharpened Image", alt: "Sharpened image" },
            ]}
            caption="Unsharp mask filter applied to a full-color image"
          />
          <BlogParagraph>
            Here's what it looks like if we use this unsharp mask filter to take a sharp image,
            blur it, then try to sharpen it again:
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page8_img4.jpeg`, label: "Sharp Image", alt: "Sharp image" },
              { src: `${B}/page8_img5.png`, label: "Blurred", alt: "Blurred image" },
              { src: `${B}/page9_img1.png`, label: "Blurred then Sharpened", alt: "Blurred then sharpened" },
            ]}
            columns={3}
            caption="Resharpening a blurred image — some high frequencies are lost irrecoverably"
          />
          <BlogParagraph>
            Evidently, resharpening doesn't seem to be as simple as the blurring process. By simply
            applying the unsharp mask filter to the blurred image, we do not get the original sharp
            image back. By multiplying the unsharp mask by a small coefficient, we can get a result
            much closer to the original image.
          </BlogParagraph>
          <BlogParagraph>
            Sharpening a few images of my choice:
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page9_img2.jpeg`, label: "Input Face", alt: "Input face" },
              { src: `${B}/page9_img3.png`, label: "Sharpened Face", alt: "Sharpened face" },
              { src: `${B}/page9_img4.jpeg`, label: "Input DALL-E Mini", alt: "Input DALL-E mini" },
              { src: `${B}/page9_img5.jpeg`, label: "Sharpened DALL-E Mini", alt: "Sharpened DALL-E mini" },
            ]}
            caption="Unsharp mask applied to images of my choice"
          />
        </BlogSubsection>

        <BlogSubsection title="2.2 Hybrid Images">
          <BlogParagraph>
            We can combine the low frequencies of one image with the high frequencies of another to
            make a hybrid image! This hybrid image will look like the first image from far away and
            the second image from up close. An example:
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page9_img6.jpeg`, label: "Derek", alt: "Derek" },
              { src: `${B}/page10_img1.jpeg`, label: "Nutmeg", alt: "Nutmeg" },
              { src: `${B}/page10_img2.jpeg`, label: "Derek High Frequencies", alt: "Derek high frequencies" },
              { src: `${B}/page10_img3.jpeg`, label: "Nutmeg's Low Frequencies", alt: "Nutmeg's low frequencies" },
              { src: `${B}/page10_img4.jpeg`, label: "Hybrid Image", alt: "Hybrid image" },
              { src: `${B}/page10_img5.jpeg`, label: "Hybrid (highs and lows swapped)", alt: "Hybrid with swapped frequencies" },
            ]}
            caption="Derek + Nutmeg hybrid image and frequency components"
          />
          <BlogParagraph>
            Here we can see the log magnitude of the Fourier transform of the two input images,
            the filtered images, and the hybrid image:
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page10_img6.jpeg`, label: "Derek (Fourier)", alt: "Derek Fourier transform" },
              { src: `${B}/page11_img1.jpeg`, label: "Nutmeg (Fourier)", alt: "Nutmeg Fourier transform" },
              { src: `${B}/page11_img2.jpeg`, label: "Derek High Frequencies (Fourier)", alt: "Derek high frequencies Fourier" },
              { src: `${B}/page11_img3.jpeg`, label: "Nutmeg's Low Frequencies (Fourier)", alt: "Nutmeg low frequencies Fourier" },
              { src: `${B}/page11_img4.jpeg`, label: "Hybrid (Fourier)", alt: "Hybrid image Fourier transform" },
            ]}
            caption="Log magnitude Fourier transforms confirming frequency separation"
          />
          <BlogParagraph>
            As we can see, the low-pass filter only lets the low frequencies of the first image
            through. The high-pass filter only lets the high frequencies of the second image
            through. Consequently, the hybrid image has the low frequencies from the first picture
            and the high frequencies from the second.
          </BlogParagraph>
          <BlogParagraph>
            Here I experiment with some hybrid image results.
          </BlogParagraph>
          <BlogParagraph>
            Mixing Ethan with Juliette:
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page11_img5.jpeg`, label: "Juliette", alt: "Juliette" },
              { src: `${B}/page12_img1.jpeg`, label: "Ethan", alt: "Ethan" },
              { src: `${B}/page12_img2.jpeg`, label: "Mixed", alt: "Mixed hybrid" },
              { src: `${B}/page12_img3.jpeg`, label: "Mixed Flipped", alt: "Mixed hybrid flipped" },
            ]}
            caption="Hybrid: Ethan + Juliette"
          />
          <BlogParagraph>
            Mixing Ethan with Emma:
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page12_img4.jpeg`, label: "Emma", alt: "Emma" },
              { src: `${B}/page12_img5.jpeg`, label: "Ethan", alt: "Ethan" },
              { src: `${B}/page12_img6.jpeg`, label: "Mixed", alt: "Mixed hybrid" },
              { src: `${B}/page13_img1.jpeg`, label: "Mixed Flipped", alt: "Mixed hybrid flipped" },
            ]}
            caption="Hybrid: Ethan + Emma"
          />
          <BlogCallout accent={ACCENT}>
            Bells & Whistles: I chose to implement hybrid images with color and found that the
            images looked the best if I used full color for both the high and low frequencies.
          </BlogCallout>
        </BlogSubsection>

        <BlogSubsection title="2.3 Gaussian and Laplacian Stacks">
          <BlogParagraph>
            Here we want to make a seamless transition between two pictures by blending across
            frequencies. To do this we make Gaussian Stacks and Laplacian Stacks for both images,
            combine both stacks using a mask, then add all layers of the combined stack to get our
            resulting blended image.
          </BlogParagraph>
          <BlogParagraph>
            A Gaussian Stack is a collection of same-sized images made by repetitively blurring an
            input image and saving it at each step. We blur by convolving the current layer in the
            stack by a Gaussian filter.
          </BlogParagraph>
          <BlogParagraph>
            A Laplacian Stack is a collection of same-sized images made by finding the high
            frequencies that exist in the current layer of the Gaussian Stack, but not in any of
            the layers below the stack. To find layer i of the Laplacian Stack, you subtract the
            (i−1)th layer of the Gaussian Stack from the ith layer. At the last layer of the
            Laplacian Stack, you save the most blurred version of the input image you have in the
            Gaussian Stack.
          </BlogParagraph>
          <BlogParagraph>
            Here's what the Gaussian and Laplacian stacks for the red channel of an orange looks like:
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page13_img2.jpeg`, label: "Gaussian Stack Level 0", alt: "Orange Gaussian stack level 0" },
              { src: `${B}/page13_img4.jpeg`, label: "Laplacian Stack Level 0", alt: "Orange Laplacian stack level 0" },
              { src: `${B}/page14_img2.jpeg`, label: "Gaussian Stack Level 2", alt: "Orange Gaussian stack level 2" },
              { src: `${B}/page14_img4.jpeg`, label: "Laplacian Stack Level 2", alt: "Orange Laplacian stack level 2" },
            ]}
            caption="Gaussian and Laplacian stacks for the orange (red channel)"
          />
          <BlogParagraph>
            Here's what the Gaussian and Laplacian stacks for the red channel of an apple looks like:
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page16_img3.jpeg`, label: "Gaussian Stack Level 0", alt: "Apple Gaussian stack level 0" },
              { src: `${B}/page16_img4.jpeg`, label: "Laplacian Stack Level 0", alt: "Apple Laplacian stack level 0" },
              { src: `${B}/page16_img6.jpeg`, label: "Gaussian Stack Level 1", alt: "Apple Gaussian stack level 1" },
              { src: `${B}/page17_img2.jpeg`, label: "Laplacian Stack Level 1", alt: "Apple Laplacian stack level 1" },
              { src: `${B}/page17_img4.jpeg`, label: "Gaussian Stack Level 2", alt: "Apple Gaussian stack level 2" },
              { src: `${B}/page17_img6.jpeg`, label: "Laplacian Stack Level 2", alt: "Apple Laplacian stack level 2" },
              { src: `${B}/page18_img2.jpeg`, label: "Gaussian Stack Level 3", alt: "Apple Gaussian stack level 3" },
              { src: `${B}/page18_img4.jpeg`, label: "Laplacian Stack Level 3", alt: "Apple Laplacian stack level 3" },
            ]}
            caption="Gaussian and Laplacian stacks for the apple (red channel)"
          />
          <BlogParagraph>
            Here we can see how we use two images and their Laplacian stacks to make a mixed image
            like an orapple:
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page19_img3.jpeg`, label: "Apple Laplacian Stack Level 0 (Red Channel)", alt: "Apple laplacian level 0" },
              { src: `${B}/page19_img4.jpeg`, label: "Orange Laplacian Stack Level 0 (Red Channel)", alt: "Orange laplacian level 0" },
              { src: `${B}/page19_img5.jpeg`, label: "Orapple Laplacian Stack Level 0", alt: "Orapple laplacian level 0" },
              { src: `${B}/page19_img8.jpeg`, label: "Apple Laplacian Stack Level 2 (Red Channel)", alt: "Apple laplacian level 2" },
              { src: `${B}/page20_img3.jpeg`, label: "Apple Laplacian Stack Level 4 (Red Channel)", alt: "Apple laplacian level 4" },
              { src: `${B}/page20_img4.jpeg`, label: "Orange Laplacian Stack Level 4 (Red Channel)", alt: "Orange laplacian level 4" },
              { src: `${B}/page20_img5.jpeg`, label: "Orapple Laplacian Stack Level 4", alt: "Orapple laplacian level 4" },
              { src: `${B}/page20_img6.jpeg`, label: "Final Orapple Result (RGB)", alt: "Final orapple result" },
            ]}
            caption="Combining apple and orange Laplacian stacks to produce the orapple"
          />
        </BlogSubsection>

        <BlogSubsection title="2.4 Multiresolution Blending (the Oraple!)">
          <BlogParagraph>
            As you can see, our image blending algorithm has nice results! I achieved these results
            by blurring the mask I use to combine images more and more as we go from blending high
            frequencies to blending low frequencies. As a result, the small features contained in
            high-frequency data are blended together over a short distance, while the large features
            contained in low-frequency data are blended together over long distances.
          </BlogParagraph>
          <BlogParagraph>
            The capabilities of this algorithm are best seen when I create an irregular mask when
            blending two images.
          </BlogParagraph>
          <BlogParagraph>
            Putting a frog in a world of smiley faces:
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page21_img1.jpeg`, label: "Input Image 1", alt: "Input image 1 (frog)" },
              { src: `${B}/page21_img2.jpeg`, label: "Input Image 2", alt: "Input image 2 (smiley faces)" },
              { src: `${B}/page21_img3.jpeg`, label: "Irregular Blending Mask", alt: "Irregular blending mask" },
              { src: `${B}/page21_img4.jpeg`, label: "Final Result", alt: "Frog blended into smiley faces" },
            ]}
            caption="Frog blended into a world of smiley faces using an irregular mask"
          />
          <BlogParagraph>
            Blending my eye into my hand:
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page22_img1.jpeg`, label: "Input Image 1", alt: "Input image 1 (eye)" },
              { src: `${B}/page22_img2.jpeg`, label: "Input Image 2", alt: "Input image 2 (hand)" },
              { src: `${B}/page22_img3.jpeg`, label: "Irregular Blending Mask", alt: "Irregular blending mask" },
              { src: `${B}/page22_img4.jpeg`, label: "Final Result", alt: "Eye blended into hand" },
            ]}
            caption="Eye blended into hand using an irregular mask"
          />
          <BlogCallout accent={ACCENT}>
            Bells & Whistles: I implemented full color for blending. The coolest part of this
            assignment is finding out that I could edit frequencies at specific frequency bands
            using Laplacian Stacks. I want to make a video where the starting frame has the high
            frequencies of the first video and low frequencies of the second video, then as time
            goes on the frequencies interpolate so that the ending frame has low frequencies of
            the first video and high frequencies of the second video.
          </BlogCallout>
        </BlogSubsection>
      </BlogSection>
    </div>
  );
}
