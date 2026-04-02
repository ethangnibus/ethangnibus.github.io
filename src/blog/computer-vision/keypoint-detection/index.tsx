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

const B = "/blog/learning-vision/keypoint-detection/images";

const ACCENT = BLOG_CATEGORY_ACCENTS.cv;

export function KeypointDetectionContent() {
  return (
    <div>
      <BlogSection sectionId="overview" accent={ACCENT}>
        <BlogParagraph>
          In this project I detect facial keypoints on an image using many Deep Learning
          techniques for Computer Vision.
        </BlogParagraph>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="nose-tip-detection" accent={ACCENT}>
        <BlogParagraph>
          Here I want to use a neural network to predict the tip of someone's nose. I will
          proceed by training with a small dataset, the IMM Face Database.
        </BlogParagraph>

        <BlogSubsection title="Dataloader Samples">
          <BlogParagraph>
            Here I show a few sampled images from my dataloader visualized with their
            ground-truth keypoints.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page1_img1.jpeg`, alt: "dataloader sample 1" },
              { src: `${B}/page1_img2.jpeg`, alt: "dataloader sample 2" },
              { src: `${B}/page1_img3.jpeg`, alt: "dataloader sample 3" },
              { src: `${B}/page1_img4.jpeg`, alt: "dataloader sample 4" },
            ]}
            caption="Sampled images from the dataloader with ground-truth nose tip keypoints"
          />
          <BlogParagraph>
            Here I plot the train and validation MSE loss during the training process.
          </BlogParagraph>
          <BlogImage
            src={`${B}/page1_img5.jpeg`}
            alt="train and validation MSE loss"
            caption="Train and validation MSE loss during training"
          />
        </BlogSubsection>

        <BlogSubsection title="Hyperparameter Study: Learning Rate">
          <BlogParagraph>
            Here I show how hyperparameters effect results. Here I change the learning rate.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page2_img1.jpeg`, label: "lr = 1e-100" },
              { src: `${B}/page2_img2.jpeg`, label: "lr = 1e-3" },
              { src: `${B}/page2_img3.jpeg`, label: "lr = 1e-2" },
              { src: `${B}/page2_img4.jpeg`, label: "lr = 1" },
            ]}
            caption="Effect of learning rate on train/validation MSE loss over 10 epochs"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page2_img5.jpeg`, alt: "learning rate detail" },
              { src: `${B}/page2_img6.jpeg`, alt: "learning rate detail" },
            ]}
          />
          <BlogParagraph>
            As we can see, lower learning rates "slow down" learning so that the loss changes
            much less across epochs. Higher learning rates "explode" learning so that the loss
            changes drastically across epochs. I found lr = 1e-2 to be the best when training
            with 10 epochs for a model with 3 layers. The runtime stays roughly the same with
            different learning rates.
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="Hyperparameter Study: Number of Layers">
          <BlogParagraph>
            Here I change the number of layers with a learning rate of 1e-3.
          </BlogParagraph>
          <BlogCallout accent={ACCENT}>
            2 Conv Layers · Runtime = 1191.257s · Learnable Parameters = 31,577,378{"\n"}
            3 Conv Layers · Runtime = 182.345s · Learnable Parameters = 940,346{"\n"}
            4 Conv Layers · Runtime = 134.378s · Learnable Parameters = 26,474
          </BlogCallout>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page3_img1.jpeg`, label: "2 conv layers (31.6M params, 1191s)" },
              { src: `${B}/page3_img2.jpeg`, label: "3 conv layers (940K params, 182s)" },
              { src: `${B}/page3_img3.jpeg`, label: "4 conv layers (26K params, 134s)" },
            ]}
            columns={3}
            caption="Effect of number of convolutional layers on loss and runtime"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page3_img4.jpeg`, alt: "layer detail" },
              { src: `${B}/page3_img5.jpeg`, alt: "layer detail" },
              { src: `${B}/page3_img6.jpeg`, alt: "layer detail" },
              { src: `${B}/page3_img7.jpeg`, alt: "layer detail" },
              { src: `${B}/page3_img8.jpeg`, alt: "layer detail" },
            ]}
          />
          <BlogParagraph>
            As we can see, as the number of convolutional layers increases, the number of
            learnable parameters in the network decreases and the runtime improves. This is
            because the less we convolve, the more features we have to train in the fully
            connected layers (MLP). I found 3 convolutional layers to get the best results.
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="Success and Failure Cases">
          <BlogParagraph>
            Here I show two facial images where the network detects the nose correctly.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page4_img1.jpeg`, label: "correct detection" },
              { src: `${B}/page4_img2.jpeg`, label: "correct detection" },
            ]}
            caption="Successful nose tip detections"
          />
          <BlogParagraph>
            Here I show two facial images where the network detects the nose incorrectly.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page4_img3.jpeg`, label: "incorrect" },
              { src: `${B}/page4_img4.jpeg`, label: "incorrect" },
            ]}
            caption="Failed nose tip detections"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page4_img5.jpeg`, alt: "additional result" },
              { src: `${B}/page4_img6.jpeg`, alt: "additional result" },
            ]}
          />
          <BlogParagraph>
            I think the neural network fails to detect keypoints because the model is
            overfit! I think the model has learned to output keypoints close to the center
            of the image because noses are generally photographed in the center of the image.
            Even though this behavior doesn't correctly solve the detection problem we wanted
            to complete, the model thinks it is performing well. This is because learning to
            output points near the center of the image is similar to learning the average
            point, which has low loss. We would have to mitigate overfitting to change this
            behavior.
          </BlogParagraph>
        </BlogSubsection>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="full-facial-keypoints" accent={ACCENT}>
        <BlogParagraph>
          Here I want to use a neural network to predict all 58 facial keypoints from the
          IMM Face Database on new input images. I will proceed by training with a small
          dataset, the IMM Face Database.
        </BlogParagraph>

        <BlogSubsection title="Dataloader Samples">
          <BlogParagraph>
            Here I show a few sampled images from my dataloader visualized with their
            ground-truth keypoints.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page5_img1.jpeg`, alt: "dataloader sample 1" },
              { src: `${B}/page5_img2.jpeg`, alt: "dataloader sample 2" },
              { src: `${B}/page5_img3.jpeg`, alt: "dataloader sample 3" },
            ]}
            caption="Sampled images from the dataloader with ground-truth 58-point keypoints"
          />
        </BlogSubsection>

        <BlogSubsection title="My Model">
          <BlogParagraph>
            My architecture:
          </BlogParagraph>
          <BlogImage
            src={`${B}/page5_img4.jpeg`}
            alt="model architecture"
            caption="Network architecture for full facial keypoint detection"
          />
          <BlogCallout accent={ACCENT}>
            Data Augmentation: Multiply, GammaContrast, Random Rotation, Random Translation
            · Epochs = 25 · Criterion = MSE Loss · Optimizer = Adam · Batch Size = 1
            · Convolutional Layers = 5 · Trainable Parameters = 192,908
          </BlogCallout>
          <BlogParagraph>
            Here I plot the training and validation loss across iterations:
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page5_img5.jpeg`, alt: "training loss" },
              { src: `${B}/page5_img6.jpeg`, alt: "validation loss" },
            ]}
            caption="Training and validation MSE loss across iterations"
          />
        </BlogSubsection>

        <BlogSubsection title="Success and Failure Cases">
          <BlogParagraph>
            Here I show two facial images where the network detects the nose well.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page6_img1.jpeg`, label: "good detection" },
              { src: `${B}/page6_img2.jpeg`, label: "good detection" },
            ]}
            caption="Successful full facial keypoint detections"
          />
          <BlogParagraph>
            Here I show two facial images where the network detects the nose poorly.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page6_img3.jpeg`, label: "poor detection" },
              { src: `${B}/page6_img4.jpeg`, label: "poor detection" },
            ]}
            caption="Failed full facial keypoint detections"
          />
          <BlogParagraph>
            I think the neural network fails to detect keypoints because the dataset is
            still too small. Right now, it seems that the dataset is optimized to work for
            the small train set, but fails a lot on data not in that set. Even with data
            augmentation, it seems that the dataset fails to mitigate overfitting. To solve
            this, I can train on a bigger dataset.
          </BlogParagraph>
        </BlogSubsection>

        <BlogSubsection title="Learned Filters">
          <BlogParagraph>
            During the learning process of a convolutional neural network, backpropagation
            updates the filters that are convolved with the input images. When trained
            correctly, these filters extract useful information that allows our network to
            predict keypoints. Filters in the first few layers of the network detect basic
            features such as lines and edges. As we go deeper into the network, these
            filters get more specialized and start learning more abstract features such as
            texture. Here I display some learned filters from the first 3 layers for
            simplicity.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page6_img5.jpeg`, label: "Convolutional Layer 1" },
              { src: `${B}/page6_img6.jpeg`, alt: "conv layer 1 detail" },
              { src: `${B}/page6_img7.jpeg`, alt: "conv layer 1 detail" },
            ]}
            columns={3}
            caption="Convolutional Layer 1 — early filters detect simple edges and lines"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page7_img1.jpeg`, label: "Convolutional Layer 2" },
              { src: `${B}/page7_img2.jpeg`, label: "Convolutional Layer 3" },
            ]}
            caption="Layers 2 and 3 — deeper filters develop more abstract representations"
          />
        </BlogSubsection>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="larger-dataset" accent={ACCENT}>
        <BlogParagraph>
          Here I want to use a neural network to predict all 68 facial keypoints from the
          ibug_300W_large_face_landmark on new input images. I will proceed by training
          with the ibug_300W_large_face_landmark dataset, a dataset with 6666 images.
        </BlogParagraph>

        <BlogSubsection title="My Model">
          <BlogParagraph>
            My architecture:
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page7_img3.jpeg`, alt: "architecture diagram part 1" },
              { src: `${B}/page8_img1.jpeg`, alt: "architecture diagram part 2" },
            ]}
            caption="ResNet-18 based architecture for 68-keypoint detection"
          />
          <BlogCallout accent={ACCENT}>
            Data Augmentation: Brightness ×(0.25–2.0), Saturation ×(0.25–2.0), Contrast
            ×(0.25–2.0), Hue ×(−0.5–0.5) · Affine: crop (0–5px), scale x/y (0.4–1.5),
            rotate ±25°, translate ±20px, shear ±20 · Jigsaw (1–3 rows × 1–3 cols) ·
            Resize 224×224 · Normalize: ÷255 −0.5 · Epochs: 10 (frozen) + 40 (all
            unfrozen) · Criterion = MSE Loss · Optimizer = Adam · Batch Size = 16 ·
            Number of Layers = 18 · Transfer Learned From = ResNet-18 ·
            Trainable Parameters = 11,502,664
          </BlogCallout>
        </BlogSubsection>

        <BlogSubsection title="Training Loss">
          <BlogParagraph>
            Here I plot the training and validation loss across iterations. I train with
            all layers frozen except the first convolution and the fully connected layer at
            the end. This is because they are the only layers I update and I'm using
            transfer learning. Next, I unfreeze all layers then continue to train. Here are
            the results:
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page9_img1.jpeg`, label: "MSE Loss when only new layers are unfrozen" },
              { src: `${B}/page9_img2.jpeg`, label: "MSE Loss when all layers are unfrozen" },
            ]}
            caption="Training and validation MSE loss across both training phases"
          />
        </BlogSubsection>

        <BlogSubsection title="Validation Predictions">
          <BlogParagraph>
            Here I visualize some images with the keypoints prediction in the validation
            set. I chose to jigsaw my training data so that my model doesn't assume that
            keypoints will always be in locations relative to each other. I ended training
            with a train MSE loss of 1.812 and validation MSE loss of 0.433.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page9_img3.jpeg`, label: "Fantastic results: slight mistake on eyebrow" },
              { src: `${B}/page9_img4.jpeg`, label: "Almost perfect even out of frame" },
              { src: `${B}/page9_img5.jpeg`, label: "Great results but not super aligned with ground truth" },
              { src: `${B}/page9_img6.jpeg`, label: "Amazing results with warp" },
              { src: `${B}/page10_img1.jpeg`, label: "Poor results with Jigsaw (although some are right)" },
              { src: `${B}/page10_img2.jpeg`, label: "Nice results: messed up face shape" },
            ]}
            caption="Representative validation set predictions"
          />
        </BlogSubsection>

        <BlogSubsection title="Personal Photos">
          <BlogParagraph>
            Here I run the model on 6 of my own images.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page10_img3.jpeg`, label: "Nice: Messing up eyes" },
              { src: `${B}/page10_img4.jpeg`, label: "Perfect! (With glasses too!)" },
              { src: `${B}/page10_img5.jpeg`, label: "Bad: Noisy glasses and hair seem to mess it up" },
              { src: `${B}/page10_img6.jpeg`, label: "Great: Messing up face shape" },
              { src: `${B}/page11_img1.jpeg`, label: "Really Bad: Noisy hair making it miss almost all landmarks" },
              { src: `${B}/page11_img2.jpeg`, label: "Very Bad: Missing face shape, lips, and nose ridge — probably because of glasses" },
            ]}
            caption="Model predictions on personal photos — some succeed, some fail"
          />
          <BlogParagraph>
            I submitted this score to the Kaggle autograder with a score of 13.62223.
          </BlogParagraph>
        </BlogSubsection>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="pixelwise-classification" accent={ACCENT}>
        <BlogParagraph>
          When making a Pixelwise Classification Model, I found that it might not be as
          useful as I thought without doing a lot of extra work. One problem that I noticed
          is that output keypoints are found by taking a weighted average of the heatmap for
          a given keypoint. This means that if the keypoint were to be outside of the image,
          it would be predicted wrong 100% of the time. This shows that not using pixelwise
          classification has a slight advantage in some cases (because it can predict outside
          of the image's coordinates among other things).
        </BlogParagraph>

        <BlogSubsection title="Generating Heatmaps">
          <BlogParagraph>
            To generate heatmaps, I made a 2D Gaussian then shifted it to the location of a
            keypoint (Gaussian Distribution). My process can be seen below. To make a 2D
            Gaussian, I took the outer product of a 1D Gaussian and its transpose. I made
            this 1D Gaussian with a kernel size of 35 and a sigma of 7.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page11_img3.jpeg`, label: "2D Gaussian" },
              { src: `${B}/page11_img4.jpeg`, label: "Location of keypoint" },
              { src: `${B}/page11_img5.jpeg`, label: "2D Gaussian shifted" },
            ]}
            columns={3}
            caption="Process for generating a keypoint heatmap: 2D Gaussian shifted to keypoint location"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page11_img6.jpeg`, alt: "heatmap detail" },
              { src: `${B}/page11_img7.jpeg`, alt: "heatmap detail" },
            ]}
          />
          <BlogParagraph>
            Here I show accumulated heatmaps of all landmarks of two images.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page12_img1.jpeg`, label: "Image 1" },
              { src: `${B}/page12_img2.jpeg`, label: "Accumulated heatmap of Image 1" },
              { src: `${B}/page12_img3.jpeg`, label: "Image 2" },
              { src: `${B}/page12_img5.jpeg`, label: "Accumulated heatmap of Image 2" },
            ]}
            caption="Accumulated heatmaps overlaying all 68 predicted landmark positions"
          />
        </BlogSubsection>

        <BlogSubsection title="My Model">
          <BlogParagraph>
            My architecture:
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page12_img6.jpeg`, alt: "architecture diagram part 1" },
              { src: `${B}/page13_img1.jpeg`, alt: "architecture diagram part 2" },
            ]}
            caption="U-Net based architecture for pixelwise keypoint heatmap prediction"
          />
          <BlogCallout accent={ACCENT}>
            Data Augmentation: Brightness ×(0.25–2.0), Saturation ×(0.25–2.0), Contrast
            ×(0.25–2.0), Hue ×(−0.5–0.5) · Affine: crop (0–4px), scale x/y (0.6–1.4),
            rotate ±20°, translate ±15px, shear ±15 · Resize 224×224 ·
            Normalize: ÷255 −0.5 · Epochs: 10 (frozen) + 10 (all unfrozen) ·
            Criterion = MSE Loss · Optimizer = Adam · Batch Size = 16 ·
            Number of Layers = 18 · Transfer Learned From = U-Net ·
            Trainable Parameters = 7,764,676
          </BlogCallout>
        </BlogSubsection>

        <BlogSubsection title="Training Loss">
          <BlogParagraph>
            Here I plot the training and validation loss across iterations. I train with all
            layers frozen except the first convolution and the fully connected layer at the
            end. This is because they are the only layers I update and I'm using transfer
            learning. Next, I unfreeze all layers then continue to train. Here are the
            results:
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page14_img1.jpeg`, label: "MSE Loss when only new layers are unfrozen" },
              { src: `${B}/page14_img2.jpeg`, label: "MSE Loss when all layers are unfrozen" },
            ]}
            caption="Training and validation MSE loss for U-Net pixelwise classifier"
          />
        </BlogSubsection>

        <BlogSubsection title="Test Predictions">
          <BlogParagraph>
            Visualize some (two) images with the keypoints prediction in the testing set.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page14_img3.png`, label: "Test Prediction 1" },
              { src: `${B}/page14_img4.png`, label: "Test Prediction 2" },
            ]}
            caption="Pixelwise classification model predictions on the test set"
          />
        </BlogSubsection>

        <BlogSubsection title="Personal Photos">
          <BlogParagraph>
            Here I run the trained model on my own photos.
          </BlogParagraph>
          <BlogFigureGrid
            figures={[
              { src: `${B}/page14_img5.jpeg`, label: "FAIL" },
              { src: `${B}/page14_img6.jpeg`, label: "FAIL" },
              { src: `${B}/page15_img1.jpeg`, label: "FAIL" },
              { src: `${B}/page15_img2.jpeg`, label: "FAIL" },
            ]}
            caption="Pixelwise classification model on personal photos — all fail"
          />
          <BlogFigureGrid
            figures={[
              { src: `${B}/page15_img3.jpeg`, label: "FAIL" },
              { src: `${B}/page15_img4.jpeg`, label: "FAIL" },
            ]}
          />
        </BlogSubsection>
      </BlogSection>

      <BlogDivider color={ACCENT} />

      <BlogSection sectionId="kaggle" accent={ACCENT}>
        <BlogParagraph>
          My best model was the one from Part 3. My Mean Absolute Error was 13.62223 and
          my Kaggle username is Ethan Gnibus.
        </BlogParagraph>
      </BlogSection>
    </div>
  );
}
