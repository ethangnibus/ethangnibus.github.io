# Task: Update `keypoint-detection` blog post to be 1:1 with the PDF

## Context

You are updating the blog post for **Keypoint Detection** to be a complete, 1:1 match with the original PDF write-up.

**Files involved:**
- PDF: `public/blog/computer-vision/keypoint-detection/pdfs/keypoint_detection.pdf`
- Blog post source: `src/blog/computer-vision/keypoint-detection/index.tsx`
- Images base path: `/blog/computer-vision/keypoint-detection/images/` (used as the `B` constant)

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

- The `const B = "/blog/keypoint-detection/images"` line must stay exactly as-is
- All image srcs: `` `${B}/filename.ext` ``
- Accent color for this project: `#8B1A2B`
- Exported function name must remain: `KeypointDetectionContent`

## Available images (79 total)

Filenames follow the pattern `page{N}_img{M}.ext` — N is the PDF page, M is image index on that page.
Cross-reference with the PDF text below to determine which image belongs in each section.

```
page10_img1.jpeg
page10_img2.jpeg
page10_img3.jpeg
page10_img4.jpeg
page10_img5.jpeg
page10_img6.jpeg
page10_img7.jpeg
page10_img8.jpeg
page11_img1.jpeg
page11_img2.jpeg
page11_img3.jpeg
page11_img4.jpeg
page11_img5.jpeg
page11_img6.jpeg
page11_img7.jpeg
page12_img1.jpeg
page12_img2.jpeg
page12_img3.jpeg
page12_img5.jpeg
page12_img6.jpeg
page13_img1.jpeg
page14_img1.jpeg
page14_img2.jpeg
page14_img3.png
page14_img4.png
page14_img5.jpeg
page14_img6.jpeg
page15_img1.jpeg
page15_img2.jpeg
page15_img3.jpeg
page15_img4.jpeg
page1_img1.jpeg
page1_img2.jpeg
page1_img3.jpeg
page1_img4.jpeg
page1_img5.jpeg
page2_img1.jpeg
page2_img2.jpeg
page2_img3.jpeg
page2_img4.jpeg
page2_img5.jpeg
page2_img6.jpeg
page3_img1.jpeg
page3_img2.jpeg
page3_img3.jpeg
page3_img4.jpeg
page3_img5.jpeg
page3_img6.jpeg
page3_img7.jpeg
page3_img8.jpeg
page4_img1.jpeg
page4_img2.jpeg
page4_img3.jpeg
page4_img4.jpeg
page4_img5.jpeg
page4_img6.jpeg
page5_img1.jpeg
page5_img2.jpeg
page5_img3.jpeg
page5_img4.jpeg
page5_img5.jpeg
page5_img6.jpeg
page6_img1.jpeg
page6_img2.jpeg
page6_img3.jpeg
page6_img4.jpeg
page6_img5.jpeg
page6_img6.jpeg
page6_img7.jpeg
page7_img1.jpeg
page7_img2.jpeg
page7_img3.jpeg
page8_img1.jpeg
page9_img1.jpeg
page9_img2.jpeg
page9_img3.jpeg
page9_img4.jpeg
page9_img5.jpeg
page9_img6.jpeg
```

## Full PDF text (all pages)

```
=== PAGE 1 ===
11/18/22, 1:37 AM
CS 194-26 Project 4
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj5/cs194-26-ahn/
1/15
CS 194-26: Image Manipulation and Computational Photography, Fall 2022
Project 5: Facial Keypoint Detection with Neural Networks
Ethan Gnibus
Overview
In this project I will detect facial keypoints on an image using many Deep Learning
techniques for Computer Vision
Part 1: Nose Tip Detection
Here I want to use a neural network to predict the
tip of someone's nose. I will proceed by training with
a small dataset, the IMM Face
Database.
Here I show a few sampled images from my dataloader
visualized with their ground-truth keypoints.
Here I plot the train and validation MSE loss during the training process.

=== PAGE 2 ===
11/18/22, 1:37 AM
CS 194-26 Project 4
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj5/cs194-26-ahn/
2/15
Here I show how hyper parameters effect results.
Here I change the learning rate
lr = 1e-100
lr = 1e-3

=== PAGE 3 ===
11/18/22, 1:37 AM
CS 194-26 Project 4
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj5/cs194-26-ahn/
3/15
lr = 1e-2
lr = 1
As we can see, lower learning rates "slow down" learning so that
the loss changes much less across epochs. Higher learning rates
"explode" learning so that the loss changes drastically across
epochs. I found lr = 1e-2 to be the best when training with
10 epochs for
a model with 3 layers. The runtime stays roughly
the same with different learning rates.
Here I change the number of layers with a learning rate of 1e-3
2 Convolutional Layers
Runtime = 1191.257 seconds
Number of Learnable Parameters = 31577378
3 Convolutional Layers
Runtime = 182.345 seconds
Number of Learnable Parameters = 940346

=== PAGE 4 ===
11/18/22, 1:37 AM
CS 194-26 Project 4
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj5/cs194-26-ahn/
4/15
4 Convolutional Layers
Runtime = 134.378 seconds
Number of Learnable Parameters = 26474
As we can see, as the number of convolutional layers increases,
the number of learnable parameters in the network decreases and
the runtime improves. This is becuase the less we convolve, the
more features we have to train in the fully connected layers (MLP).
I
found 3 Layers to have the best result. I found 3 convolutional
layers to get the best results.
Here I show two facial images where the network detects the nose correctly.
Here I show two facial images where the network detects the nose incorrectly.
I think the neural network fails to detect keypoints because the model is overfit! I think the model has learned to output keypoints
close to the center of the image because noses are generally photographed
in the center of the image. Even though this behavior
doesn't correctly
solve the detection problem we wanted to complete, the model thinks
it is preforming well. This is because learning
to output points near
the center of the image is similar to learning the average point, which
has low loss. We would have to mitigate
overfitting to change this behavior.
Part 2: Full Facial Keypoints Detection

=== PAGE 5 ===
11/18/22, 1:37 AM
CS 194-26 Project 4
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj5/cs194-26-ahn/
5/15
Here I want to use a neural network to predict
all 58 facial keypoints from the IMM Face Database
on new input images. I will proceed
by training with
a small dataset, the IMM Face Database.
Here I show a few sampled images from my dataloader
visualized with their ground-truth keypoints.
My Model
My architecture:
Hyperparameters:
Data Augmentation = {
imgaug.augmenters.Multiply,
imgaug.augmenters.GammaContrast,
Random Rotation,
Random Translation
}
Epochs = 25
Criterion = MSE Loss
Optimizer = Adam
Batch Size = 1
Convolutional Layers = 5
Trainable Parameters = 192908
Here I plot the training and validation loss across iterations:

=== PAGE 6 ===
11/18/22, 1:37 AM
CS 194-26 Project 4
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj5/cs194-26-ahn/
6/15
Here I show two facial images where the network detects the nose well.
Here I show two facial images where the network detects the nose poorly.
I think the neural network fails to detect keypoints because
The dataset is still too small. Right now, it seems that
the dataset is
optimized to work for the small train set,
but fails a lot on data not in that set.
Even with data augmentation, it
seems that the dataset
fails to mitigate overfitting. To solve this,
I can train on a bigger dataset.
During the learning process of a convolutional neural network, backpropagation
updates the filters that are convolved with the input
images. When trained
correctly, these filters extract useful information that allows our network to
predict keypoints. Filters in the first
few layers of the network detect
basic features such as lines and edges. As we go deeper into the network,
these filters get more
specialized and start learning more abstract features
such as texture. Here I display some learned filters from the first 3 layers
for
simplicity:
Convolutional Layer 1

=== PAGE 7 ===
11/18/22, 1:37 AM
CS 194-26 Project 4
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj5/cs194-26-ahn/
7/15
Convolutional Layer 2
Convolutional Layer 3
Part 3: Train With Larger Dataset
Here I want to use a neural network to predict
all 68 facial keypoints from the
ibug_300W_large_face_landmark
on new input images. I
will proceed by training with
the ibug_300W_large_face_landmark dataset, a dataset
with 6666 images.
My Model
My architecture:

=== PAGE 8 ===
11/18/22, 1:37 AM
CS 194-26 Project 4
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj5/cs194-26-ahn/
8/15
Hyperparameters:
Data Augmentation = {
  Multiply Brightness by (0.25, 2.0),
  Multiply Saturation by (0.25, 2.0),
  Multiply Contrast by (0.25, 2.0),
  Multiply Hue by (-0.5, 0.5),
  Affine Transforms: {
    Crop image by (0, 5) pixels,
    Scale x by (0.4, 1.5),
    Scale y by (0.4, 1.5),
    Rotate by (-25, 25) degrees,
    Translate x by (-20, 20) pixels,
    Translate y by (-20, 20) pixels,
    Shear image by (-20, 20)
  }
  iaa.Jigsaw with 1-3 rows and 1-3 columns,

=== PAGE 9 ===
11/18/22, 1:37 AM
CS 194-26 Project 4
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj5/cs194-26-ahn/
9/15
  Resize image to 224x224
}
Normalize Color (Divide by 255 then subtract by 0.5)
Epochs
  Training with old layers frozen and new layers unfrozen = 10
  Training with all layers unfrozen = 40
Criterion = MSE Loss
Optimizer = Adam
Batch Size = 16
Number of Layers = 18
Transfer Learned From = ResNet-18
Trainable Parameters = 11502664
Here I plot the training and validation loss across iterations. I
I train with all layers frozen except the first convolution and the
fully
connected layer at the end. This is because they are the only
layers I update and I'm using transfer learning. Next, I unfreeze
all layers
then continue to train. Here are the results:
MSE Loss when only new layers are unfrozen
MSE Loss when all layers are unfrozen
Here I visualize some images with the keypoints prediction in the validation set.
I chose to jigsaw my training data so that my model
doesn't assume that
keypoints will always be in locations relative to each other.
I ended training with a train mse loss of 1.812 and
validation mse loss of 0.433.
Fantastic results: slight mistake on eyebrow
Almost perfect even out of frame

=== PAGE 10 ===
11/18/22, 1:37 AM
CS 194-26 Project 4
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj5/cs194-26-ahn/
10/15
Great results but not super aligned with ground truth
Amazing results with warp
Poor results with Jigsaw (although some are right)
Nice results: messed up face shape
Try running the trained model on no less than 3
photos from your collection. Which ones does it
get right? Which ones does it fail on?
Here I run the model on 6 of my own images.
Nice: Messing up eyes
Perfect! (With glasses too!)

=== PAGE 11 ===
11/18/22, 1:37 AM
CS 194-26 Project 4
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj5/cs194-26-ahn/
11/15
Bad: Noisy glasses and hair seem to mess it up
Great: Messing up face shape
Really Bad: Noisy hair making it miss almost all
landmarks
Very Bad: Missing face shape, lips, and nose ridge. Probably because of
glasses
I submitted this score to the kaggle autograder with a score of 13.62223
Part 4: Pixelwise Classification
Report on the details of your implementation and your findings.
When making a Pixelwise Classification Model, I found that it might not
be as useful as I thought without doing a lot of extra work. One
problem
that I noticed is that output keypoints are found by taking a weighted average
of the heatmap for a given keypoint. This
means that if the keypoint were to be
outside of the image, it would be predicted wrong 100% of the time. This shows that
not using
pixelwise classification has a slight advantage in some cases (because
it can predict outside of the image's coordinates among other
things).
To generate heatmaps, I made a 2D Gaussian then shifted it to to the location
of a keypoint (Gaussian Distribution). My process can be
seen below. To make a 2D Gaussian,
I took the outer product of a 1D Gaussian and its transpose. I made this
1D Gaussian with a
kernel size of 35 and a sigma of 7.

=== PAGE 12 ===
11/18/22, 1:37 AM
CS 194-26 Project 4
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj5/cs194-26-ahn/
12/15
2D Gaussian
Location of keypoint
2D Gaussian shifted
Here I show accumulated heatmaps of all landmarks of two images.
Image 1
Accumulated heatmap of Image 1
Image 2
Accumulated heatmap of Image 2
My Model
My architecture:

=== PAGE 13 ===
11/18/22, 1:37 AM
CS 194-26 Project 4
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj5/cs194-26-ahn/
13/15
Hyperparameters:
Data Augmentation = {
  Multiply Brightness by (0.25, 2.0),
  Multiply Saturation by (0.25, 2.0),
  Multiply Contrast by (0.25, 2.0),
  Multiply Hue by (-0.5, 0.5),
  Affine Transforms: {
    Crop image by (0, 4) pixels,
    Scale x by (0.6, 1.4),
    Scale y by (0.6, 1.4),
    Rotate by (-20, 20) degrees,
    Translate x by (-15, 15) pixels,
    Translate y by (-15, 15) pixels,
    Shear image by (-15, 15)
  }
  Resize image to 224x224
}
Normalize Color (Divide by 255 then subtract by 0.5)
Epochs
  Training with old layers frozen and new layers unfrozen = 10
  Training with all layers unfrozen = 10
Criterion = MSE Loss

=== PAGE 14 ===
11/18/22, 1:37 AM
CS 194-26 Project 4
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj5/cs194-26-ahn/
14/15
Optimizer = Adam
Batch Size = 16
Number of Layers = 18
Transfer Learned From = U-Net
Trainable Parameters = 7764676
Here I plot the training and validation loss across iterations. I
I train with all layers frozen except the first convolution and the
fully
connected layer at the end. This is because they are the only
layers I update and I'm using transfer learning. Next, I unfreeze
all layers
then continue to train. Here are the results:
MSE Loss when only new layers are unfrozen
MSE Loss when all layers are unfrozen
Visualize some (two) images with the keypoints prediction in the testing set.
Test Prediction 1
Test Prediction 2
Try running the trained model on no less than 3 photos from your collection.
Which ones does it get right? Which ones does it fail on?

=== PAGE 15 ===
11/18/22, 1:37 AM
CS 194-26 Project 4
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj5/cs194-26-ahn/
15/15
FAIL
FAIL
FAIL
FAIL
Part 5: Kaggle
Report your best model (if it is different from part 3 or
part 4, please describe the model architecture) and report
the mean absolute
error and Kaggle username on the website
after uploading your predictions on the testing set to our
class Kaggle competiton.
My best model was the one from part 3. My Mean absolute error was 13.62223 and
my Kaggle username is Ethan Gnibus.
https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj5/cs194-26-ahn/

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

const B = "/blog/keypoint-detection/images";
const ACCENT = "#8B1A2B";

export function KeypointDetectionContent() {
  return (
    <div>
      <BlogSection title="Overview" accent={ACCENT}>
        <BlogParagraph>
          This project implements facial keypoint detection using convolutional neural networks,
          progressing from a tiny nose-tip detector trained on 40 images to a ResNet-18-based
          model that localizes 68 landmarks across 6,666 images. Along the way, the project
          explores architecture choices, data augmentation strategies, transfer learning,
          and pixelwise classification with heatmaps.
        </BlogParagraph>
      </BlogSection>

      <BlogDivider />

      <BlogSection title="Part 1 — Nose Tip Detection" accent={ACCENT}>
        <BlogParagraph>
          The first model targets a single keypoint: the tip of the nose. Training uses the
          small IMM Face Database (40 images). The goal is to understand how hyperparameters
          like learning rate and network depth affect training and generalization.
        </BlogParagraph>

        <BlogSubsection title="Hyperparameter Study">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page2_img1.jpeg`, label: "lr = 1e-3 (good)" },
              { src: `${B}/page2_img2.jpeg`, label: "lr = 1e-2 (best)" },
              { src: `${B}/page2_img3.jpeg`, label: "lr = 1 (exploding loss)" },
            ]}
            columns={3}
            caption="Effect of learning rate on train/validation MSE loss over 10 epochs"
          />
          <BlogParagraph>
            Higher learning rates accelerate training but risk instability. lr = 1e-2 with 10 epochs
            gave the best results for a 3-layer network.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page3_img1.jpeg`, label: "2 conv layers (31.6M params)" },
              { src: `${B}/page3_img2.jpeg`, label: "3 conv layers (940K params)" },
              { src: `${B}/page3_img3.jpeg`, label: "4 conv layers (26K params)" },
            ]}
            columns={3}
            caption="Fewer conv layers = larger FC layers = more parameters. 3 layers was the sweet spot."
          />
        </BlogSubsection>

        <BlogSubsection title="Success and Failure Cases">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page4_img1.jpeg`, label: "correct detection" },
              { src: `${B}/page4_img2.jpeg`, label: "correct detection" },
              { src: `${B}/page4_img3.jpeg`, label: "incorrect — overfitting to center" },
              { src: `${B}/page4_img4.jpeg`, label: "incorrect — overfitting to center" },
            ]}
            caption='The model overfits by predicting points near center — effectively learning the "average nose position"'
          />
        </BlogSubsection>
      </BlogSection>

      <BlogDivider />

      <BlogSection title="Part 2 — Full 58-Keypoint Detection" accent={ACCENT}>
        <BlogParagraph>
          The second model predicts all 58 facial landmarks from the IMM Face Database. Despite
          adding data augmentation (brightness, contrast, rotation, translation) and 5 conv layers,
          the small dataset size limits generalization — the model continues to overfit.
        </BlogParagraph>

        <BlogSubsection title="Architecture">
          <BlogCallout accent={ACCENT}>
            5 convolutional layers · 192,908 trainable parameters · 25 epochs ·
            Adam optimizer · MSE loss · batch size 1
          </BlogCallout>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page5_img1.jpeg`, label: "train / val loss curve" },
            ]}
            columns={2}
            caption="Training and validation loss across iterations"
          />
        </BlogSubsection>

        <BlogSubsection title="Learned Filters">
          <BlogParagraph>
            Early convolutional layers learn to detect low-level features like edges and lines.
            Deeper layers develop more abstract representations. The filters below are from the
            first three layers.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page6_img1.jpeg`, label: "conv layer 1 filters" },
              { src: `${B}/page6_img2.jpeg`, label: "conv layer 2 filters" },
              { src: `${B}/page6_img3.jpeg`, label: "conv layer 3 filters" },
            ]}
            columns={3}
            caption="Visualizing learned convolutional filters — earlier layers detect simple patterns"
          />
        </BlogSubsection>
      </BlogSection>

      <BlogDivider />

      <BlogSection title="Part 3 — ResNet-18 on Large Dataset" accent={ACCENT}>
        <BlogParagraph>
          The final model uses transfer learning from ResNet-18 trained on ImageNet,
          fine-tuned on the iBUG 300-W dataset (6,666 images, 68 landmarks). Training
          proceeds in two phases: first with old layers frozen, then with all layers unfrozen.
        </BlogParagraph>

        <BlogSubsection title="Architecture &amp; Data Augmentation">
          <BlogCallout accent={ACCENT}>
            ResNet-18 base · 18 layers · 11.5M trainable parameters · 10 frozen epochs + 40
            unfrozen epochs · Jigsaw augmentation to prevent keypoint co-dependency
          </BlogCallout>
          <BlogParagraph>
            Aggressive augmentation: brightness/saturation/contrast/hue multipliers,
            affine transforms (scale, rotate ±25°, translate ±20px, shear ±20°), and jigsaw
            shuffling. Final validation MSE: 0.433.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page9_img1.jpeg`, label: "loss: frozen phase" },
              { src: `${B}/page9_img2.jpeg`, label: "loss: full fine-tuning" },
            ]}
            caption="MSE loss in two training phases (frozen layers then all unfrozen)"
          />
        </BlogSubsection>

        <BlogSubsection title="Predictions">
          <BlogFigureGrid
            figures={[
              { src: `${B}/page9_img3.jpeg`, label: "great result" },
              { src: `${B}/page9_img4.jpeg`, label: "slight eyebrow error" },
              { src: `${B}/page10_img1.jpeg`, label: "good with glasses" },
              { src: `${B}/page10_img2.jpeg`, label: "poor — hair interference" },
            ]}
            caption="Representative validation set predictions — Kaggle score: 13.62 MAE"
          />
        </BlogSubsection>
      </BlogSection>

      <BlogDivider />

      <BlogSection title="Part 4 — Pixelwise Classification (Heatmaps)" accent={ACCENT}>
        <BlogParagraph>
          Instead of directly regressing keypoint coordinates, a U-Net predicts a 2D Gaussian
          heatmap for each landmark. The predicted keypoint location is the weighted average of
          the heatmap. This approach has a subtle limitation: if a keypoint falls outside the
          image frame, the heatmap average will always be wrong.
        </BlogParagraph>
        <BlogFigureGrid
          figures={[
            { src: `${B}/page12_img1.jpeg`, label: "image 1" },
            { src: `${B}/page12_img2.jpeg`, label: "accumulated heatmap 1" },
            { src: `${B}/page12_img3.jpeg`, label: "image 2" },
            { src: `${B}/page12_img5.jpeg`, label: "accumulated heatmap 2" },
          ]}
          caption="Accumulated heatmaps overlaying all 68 predicted landmark positions"
        />
      </BlogSection>
    </div>
  );
}

```

## Output

Return the complete, updated `src/blog/computer-vision/keypoint-detection/index.tsx`. No truncation — include every section.
