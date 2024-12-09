---
date: "2025-01-01"
title: "Integrating Font Awesome Pro and Kits in your Drupal theme"
subtitle: "Font Awsome Pro in combination with Kits are a great way to manage your icons library so you only load the icons your website uses."
tags: ['fontawesome','drupal']
draft: false
featured: true
featuredImage: "/images/icons.webp"
featuredImageAlt: "Person taking a picture with their phone"
imageThumb: "/images/thumbs/icons-thumb.webp"
featuredImageCredit: "Kipras Štreimikis"
featuredImageCreditUrl: "https://unsplash.com/@kkipras"
summary: "Take better control of your icons library using a single Drupal module."
eleventyExcludeFromCollections: false
---

You may be thinking: Font Awesome? I know how to do that in my theme. But did you know that the Pro version of Font Awesome is not fully compatible with the Fontawesome module? In addition, did you know that if you use Font Awesome's custom icons kits, the fontawesome module is also not fully compatible with them?

Recently I ran into the roadblocks described above and was not sure I was going to be able to get both, Font Awesome Pro and Font Awesome Kits, to work within my theme. Luckily thanks to some workarounds, I was able to achieve both.  This is the approach I took for getting things to work.

<span class="callout">
<strong>NOTE</strong>: If you are using the free version of Font Awesome, you should not have issues integrating them with your team, this walkthrough only applies to the Pro version.
</span>

## Font Awesome Pro

Having a Font Awesome Pro account provides many more options than their free version. The Pro accounts gives you more control of the icons you can use, upload custom icons, create kits, and more. Obviously the Pro version is a paid version and there are several tiers of Pro you can get.

## Font Awesome Kits

Font Awesome Kits are like collection of icons you can create when your goal is to limit the icons you want your team to use. This is perfect when you don't really need to load all 55,663 icons available in Font Awesome (as the date of this post), but instead you have a pre-approved list of icons your organization uses.


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

<span class="callout">
<strong>NOTE</strong>: Your environment may be configured differently than mine and you may not have the same options as I do.
</span>

With the changes to the Crop preview image style, every time you crop the image you are dealing with the original image rather than an already cropped image.

## In closing

The main reason for writing about this topic is so I know what to do next time I run into this issue. I hope you find this helpful.
