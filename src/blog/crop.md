---
date: "2024-08-18"
title: "SOLVED - Cannot crop based on original image after initial crop has been set"
tags: ['drupal', 'media','crop']
draft: false
featured: false
featuredImage: "/images/crop.webp"
featuredImageAlt: "Person taking a picture with their phone"
imageThumb: "/images/thumbs/crop-thumb.webp"
featuredImageCredit: "Kipras Štreimikis"
featuredImageCreditUrl: "https://unsplash.com/@kkipras"
summary: "Cropping images in Drupal is a great way to ensure your images always look their best."
eleventyExcludeFromCollections: false
---

If you have read my posts about responsive images you will know I have done quite a bit of work with Drupal media and in particular, images. However, I recently ran into an issue I had not experienced before and it was quite challenging to comprehend. The issue was related to image cropping.
In our Drupal platform we allow content editors to manually crop images using a hand-full of crop types for various aspect ratios such as 1:1, 3:4, 4:3, 16:9, etc. To achieve the manual crop we use the [Crop API](https://www.drupal.org/project/crop){target=_blank rel="noopener noreferrer} and [Image Widget Crop](https://www.drupal.org/project/image_widget_crop){target=_blank rel="noopener noreferrer} Drupal modules.

The issue we started noticing is that no matter the image we were using, all cropping settings were limited to a predefined aspect ratio of 1:1 or square, rather than the original image's aspect ratio. This was causing big problems for us because editors were not able to properly crop images and as a result images were rendered with odd cropping settings.

After some research, I found an issue that had been reported in the Image Widget Crop module, [issue #3222406](https://www.drupal.org/project/image_widget_crop/issues/3222406){target=_blank rel="noopener noreferrer}. This was exactly the issue we were having and was relieved it wasn't something unique to our platform.

## Cause of the issue

Looking back, I think this issue was partly of my own making, but seeing that others were experiencing the same it's also possible it was just an odd bug. Long story short, the issue was caused by using an image style with specific hard dimension, as the **crop preview** image, See **Fig. 1** below.

![Image crop preview settings](/images/blog-images/crop-preview.png){.body-image .body-image--wide .body-image--left}

Fig. 1: Screenshot of Crop preview configuration.{.caption}

You may not know this but you can change image styles for almost any image within Drupal's admin. I recently completed a lot of work around image styles within our platform and perhaps I unknowingly changed the image style used by Drupal's crop preview. I can't say for sure.

## Solution

The issue was not so much the aspect ratio used in the image style used as the crop preview, but rather the hard dimensions of the image style. These dimensions were forcing all images, regardless of their aspect ratio, to use the square aspect ratio as the starting point for cropping, rather than the original image.
The solution is to use an image style that uses the **Scale** image effect, as the crop preview. The Scale image effect does not require image dimensions and thus allows your cropping area to always reset to the original image.

If you read [comment #5](https://www.drupal.org/project/image_widget_crop/issues/3222406#comment-14903564){target=_blank rel="noopener noreferrer} in the issue page you will see **juamerico** explanation of the issue in more detail and what he did to fix it.

### Steps taken to address the issue

1. I created a new image style called **Crop preview** with the Scale image effect as well as using a wide aspect ratio or crop type such as 16:9.
1. I configured the **Manage form display** for the **Image** media type (`admin/structure/media/manage/image/form-display`), so it uses the new image style I just created.  See **Fig. 2** below

![Image crop preview settings](/images/blog-images/crop-preview-img.png){.body-image .body-image--wide .body-image--left}

Fig. 2: Screenshot of Manage form display settings for images.{.caption}

**NOTE**: Your environment may be configured differently than mine and you may not have the same options as I do.{.callout}

With the changes to the Crop preview image style, every time you crop the image you are dealing with the original image rather than an already cropped image.

## In closing

The main reason for writing about this topic is so I know what to do next time I run into this issue. I hope you find this helpful.
