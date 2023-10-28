---
date: "2023-10-27"
title: "Responsive images in Drupal - a guide"
tags: ['drupal','responsive-images']
draft: false
featured: true
featuredImage: "/images/emily-bernal.webp"
featuredImageAlt: "A book, tablet, mouse, keyboard and monitor on a desktop"
featuredImageCredit: "Emily Bernal"
featuredImageCreditUrl: "https://unsplash.com/@emilybernal"
summary: "In this seven-part guide I cover everything you need to know about responsive images and how to manage them in a Drupal site."
---
Images are an essential part of a website.  They enhance the appeal of the site and make the user experience a more pleasant one. The challenge is finding the balance between enhancing the look of your website through the use of images and not jeopardizing performance. In this guide, we'll dig deep into how to find that balance by going over knowledge, techniques and practices that will provide you with a solid understanding of the best way to serve images to your visitors using the latest technologies and taking advantage of the advances of web browsers in recent years.

Hi, I hope you are ready to dig into responsive images. This is a seven-part guide that will cover everything you need to know about responsive images and how to manage them in a Drupal site. Although the excercises in this guide are Drupal-specific, the core principles of responsive images apply to any platform you use to build your sites.

## Where do we start?

Choosing Drupal as your CMS is a great place to start.  Drupal has always been ahead of the game when it comes to managing images by providing features such as image compression, image styles, responsive images styles and media library to mention a few. All these features, and more, come out of the box in Drupal.  In fact, most of what we will cover in this guide will be solely out of the box Drupal features.  We may touch on third party or contrib techniques or tools but only to let you know what's available not as a hard requirement for managing images in Drupal.

It is important to become well-versed with the tools available in Drupal for managing images.  Only then you will be able to make the most of those tools. Don't worry though, this guide will provide you with a lot of knowledge about all the pieces that take part in building a solid system for managing and serving responsive images.

Let's start by breaking down the topics this guide will cover:

1. [What are responsive images?](#responsive-images)
1. [Art Direction using the `<picture>` HTML element](../art-direction-using-the-picture-html-element)
1. [Image resolution switching using `srcset` and `sizes` attributes](../image-resolution-switching-using-srcset-and-sizes-attributes)
1. [Image styles](../image-styles-in-drupal) and [Responsive image styles](../responsive-image-styles) in Drupal
1. [Responsive images and Media](../responsive-images-and-media)
1. [Responsive images, wrapping up](../responsive-images-wrapping-up)

## What are responsive images? {id=responsive-images}

A responsive image is one whose dimensions adjust to changes in screen resolutions. The concept of responsive images is one that developers and designers have been strugling with ever since Ethan Marcotte published his famous blog post, [Responsive Web Design](https://alistapart.com/article/responsive-web-design/), back in 2010 followed by his book of the same title.  The concept itself is pretty straight forward, serve the right image to any device type based on various factors such as screen resolution, internet speed, device orientation, viewport size, and others.  The technique for achieving this concept is not as easy.  I can honestly say that over 10 years after reponsive images were introduced, we are still trying to figure out the best way to render images that are responsive.  Read more about [responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images).

So if the concept of responsive images is so simple, why don't we have one standard for effectively implementing it?  Well, images are complicated.  They bring with them all sorts of issues that can negatively impact a website if not properly handled.  Some of these issues include: Resolution, file size or weight, file type, bandwidth demands, browser support, and more.

Some of these issues have been resolved by fast internet speeds available nowadays, better browser support for file tyes such as webp, as well as excellent image compression technologies.  However, there are still some issues that will probably never go away and that's what makes this topic so complicated.  One issue in particular is using poorly compressed images that are extremely big in file size.  Unfortunately often times this is at the hands of people who lack the knowledge of creating images that are light in weight and properly compressed. So it's up to us, developers, to anticipate the problems and proactively address them.

### Ways to improve image files for your website

If you are responsible for creating or working with images in an image editor such as Photoshop, Illustrator, GIMP, and others, you have great tools at your disposal to ensure your images are optimized and sized properly.  You can play around with the image quality scale as you export your images and ensure they are not bigger than they need to be.  There are many other tools that can help you with compression.  One little tool I've been using for years is this little app called [ImageOptim](https://imageoptim.com/howto.html), which allows you to drop in your images in it and it compresses them saving you some file size and improving compression.

Depending on your requirements and environment, you could also look at using different file types for your images.  One highly recommended image type is **[webp](https://developers.google.com/speed/webp)**.  With the ability to do lossless and lossy compression, webp provides significant improvements in file sizes while still maintaining your images high quality.  The browser support for webp is excellent as it is supported by all major browsers, but do some research prior to start using it as there are some hosting platforms that do not support webp.

To give you an example of how good webp is, the image in the header of this blog post was originally exported from Photoshop as a `.JPG`, which resulted in a 317KB file size.  This is not bad at all, but then I ran the image through the ImageOptim app and the file size was reduced to 120KB. That's a 62% file size reduction.  Then I exported the same image from Photoshop but this time in `.webp` format and the file size became 93KB.  That's 71% in file size reduction compared to the original JPG version.

## A must have CSS rule in your project

By now it should be clear that the goal for serving images on any website is doing it by using the responsive images approach.  The way you implement responsive images on your site may vary depending on your platform, available tools, and skillset.  Regardless, the following CSS rule should always be available within your project base CSS styles and should apply to all images on your site:

```css
img {
  display: block;
  max-width: 100%;
}
```

Easy right?  That's it, we're done 😃

The CSS rule above will in fact make your images responsive (images will automatically adapt to the width of their containers/viewport).  This rule should be added to your website's base styles so every image in your website becomes responsive by default.  However, this should not be the extend of your responsive images solution.  Although your images will be responsive with the CSS rule above, this does not address image compression nor optimization and this will result in performance issues if you are dealing with extremly large file sizes.  [Take a look at this example](https://codepen.io/mariohernandez/full/ZEVVKab){target=_blank rel=noopener} where the rule above is being used.  Resize your browser to any width including super small to simulate a mobile device.  Notice how the image automatically adapts to the width of the browser. Here's the problem though, the image in this example measures `5760x3840` pixels and it weights 6.7 MB. This means, even if your browser width is super narrow, and the image is resized to a very small visual size, you are still loading an image that is 6.7 MB in weight. No good 👎

In the next post of this series, we will begin the process of implementing a solution for handling responsive images the right way.

<div class="post-pager">

Navigate posts within this series

- [Art Direction using the `<picture>` HTML element](../art-direction-using-the-picture-html-element)

</div>
