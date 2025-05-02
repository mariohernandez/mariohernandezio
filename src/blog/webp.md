---
date: "2025-04-12"
title: "Using modern image formats to improve performance"
subtitle: "Small wins, when added up can make a big difference. This is one of those small wins which can result in performance gains for your website."
tags: ['drupal', 'media']
draft: false
featured: false
featuredImage: "/images/heroes/webp.webp"
featuredImageAlt: "Google Lighthouse Metrics for MarioHernandez.io"
imageThumb: "/images/thumbs/webp-thumb.webp"
featuredImageCredit: ""
featuredImageCreditUrl: ""
summary: "Media, in particular images, have always been a hot topic for discussion as it relates to website performance. Learn about this relatively easy approach to reduce image file sizes."
eleventyExcludeFromCollections: false
---

I've always been drawn to working with images, and when responsive images came onto the scene, I dove deep into learning everything I could about them.
I've written extensively about [Responsive images](/series/responsive-images) if you need a refresher, but today, let's focus on modern image formats. In particular, **WebP**.

## WebP

WebP is a modern image format developed by Google that provides superior compression and quality compared to traditional formats like JPEG and PNG. It supports both lossy and lossless compression, transparency, and animation, making it a versatile choice for web images. WebP helps improve website performance by reducing file sizes, which leads to faster loading times and better user experience.

### Is WebP widely supported?

Since 2020, all major browsers support WebP. ([Check caniuse for details](https://caniuse.com/?search=webp){target=_blank rel="noopener noreferrer}). My site, this site, uses WebP exclusively for most images and although it is not a big site, I still see performance improvements.

## Updating Drupal to use WebP

You would think that a big upgrade like this would be a complex task but you'll be surprised to learn that enabling WebP for new and existing images in Drupal is straightforward. Let's quickly go over the steps.

1. Edit each of your image styles and add the **Convert** effect.
  ![Image crop preview settings](/images/blog-images/exibit-webp.png){.body-image .body-image--short .body-image--left aria-hidden="true"}

    Fig. 1: Selecting the Convert effect for an image style.{.caption}

2. Select and add the WebP format to the image style.
  ![Image crop preview settings](/images/blog-images/exibit-webp2.png){.body-image .body-image--short .body-image--left aria-hidden="true"}

    Fig. 2: Adding the WebP format to an image style.{.caption}

That's it!

**Fun fact!**: WebP support was introduced to Drupal core in [Drupal 9.2.0](https://gorannikolovski.com/blog/drupal-92-will-support-webp-images-out-box){target=_blank rel="noopener noreferrer}, which was released on June 16, 2021. Before this core integration, WebP support in Drupal was only available through contributed modules or custom code. The inclusion in core made the format's benefits available to all Drupal 9.2+ sites without requiring additional modules.{.callout}

## Demo

I did a quick and simple test to show the difference in file size when adding a typical JPEG image to an article, then converting it to WebP using the steps above. The test was done in Drupal 10.x.

### First: Using a JPEG image

Using a JPEG image on an article node, shows a file size of `289kb`.

![Article with JPEG image showing browser's dev tools](/images/blog-images/img-jpg.webp){.body-image .body-image--short .body-image--left aria-hidden="true"}

Fig. 3: Example shows using a JPEG format.{.caption}

### Then: Using a WebP image

After converting the imag eto Webp by updating the image style of that image, the file size was reduced to `76kb`. That's about 60% file size reduction.

![Article with Webp image showing browser's dev tools](/images/blog-images/img-webp.webp){.body-image .body-image--short .body-image--left aria-hidden="true"}

Fig. 3: Example shows using a WebP format.{.caption}

**NOTE**: This was a pretty basic comparison test. File size reduction will vary depending on original file zize, format, and other preferences on your site.{.callout}

## What about other formats like Avif?

The Avif image format is also a great option with many benefits. The browser support is really good at the time of this post (See [caniuse](https://caniuse.com/?search=avif){target=_blank rel="noopener noreferrer}), and it's worth looking into it as an alternative to WebP, or even combining the two depending on your media needs.

## In closing

It's all about the small wins. This one is pretty simple but can provide significant performance benefits. Give it a try!

### Resources

* [Google's page on WebP](https://developers.google.com/speed/webp){target=_blank rel="noopener noreferrer}
* [WebP files explained](https://www.adobe.com/creativecloud/file-types/image/raster/webp-file.html){target=_blank rel="noopener noreferrer}
* [Mozilla's Image file type formats guide](https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types#webp_image){target=_blank rel="noopener noreferrer}
