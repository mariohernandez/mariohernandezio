---
date: "2023-10-09"
title: "Managing Images in Drupal, a complete guide"
tags: ['drupal','images','media']
draft: false
featured: true
featuredImage: "/images/emily-bernal.webp"
featuredImageAlt: "Person confronted with two paths to choose from"
featuredImageCredit: "Emily Bernal"
featuredImageCreditUrl: "https://unsplash.com/@emilybernal"
summary: "The challenge is finding the balance between enhancing the look of your website through the use of images without sacrificing the performance of your website."
---
Media, including images, are an essential part of a website.  They enhance the appeal of the website and make the user experience a more pleasant one. The challenge is finding the balance between enhancing the look of a website through the use of images and other media without sacrificing the performance of your website. In this guide, we'll dig deep into how to find that balance by going over knowledge, techniques and practices that will provide you with a solid understanding of the best way to serve images to your visitors using the latest technologies and taking advantage of the advances of web browsers in recent years.to

**NOTE**: Although the content in this guide is intended for Drupal website, the core principles of responsive images apply to any website or technology you may be using to build your sites.

## Where do we start?

Choosing Drupal as your CMS is a great place to start.  Drupal has always been ahead of the game when it comes to managing images by providing features such as image compression, image styles, responsive images styles and media library to mention a few. All these features, and more, come out of the box in Drupal.  In fact, most of what we will cover in this guide will be solely out of the box features.  We may touch on third party or contrib techniques or tools but mostly for letting you know what's available not as a hard requirement for managing images in Drupal.

It is important to become well-versed with all the tools available in Drupal for managing images.  Only then you will be able to make the most of those tools. Don't worry though, this guide will provide you with a lot of knowledge about all the pieces that take part in building a solid system for managing images.

Let's start by breaking down the topics this guide will focus on and organizing them in a table of contents:

- What are responsive images?
- Resolution switching
- Art direction
- Dimesifying image styles
- Resonsive image styles
- Media, media types and view modes
- Third party of contrib tools

## What are responsive images?

A responsive image is one whose dimensions adjust to changes in screen resolutions. The concept of responsive images is one that developers and designers have been strugling to deal with ever since Ethan Marcotte published his famous blog post, [Responsive Web Design](https://alistapart.com/article/responsive-web-design/), back in 2010 followed by his book of the same title.  The concept itself is pretty straight forward, serve the right image to any device type based on various factors such as screen resolution, internet speed, device orientation, and others.  The techniques for achieving this concept is not as easy.  I can honestly say that over 10 years after reponsive images were introduced, we are still trying to figure out the best way to solve the issue of image rendering especially as it relates to performance.  Read more about [responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images).

So if the concept of responsive images is so simple, why don't we have one standard for effectively implementing it?  Well, images are complicated.  They bring with them all sorts of issues that can negatively impact a website if not properly handled.  Some of this issues include: Resolution, file size or weight, file type, bandwidth demands, browser support, and more.

Some of these issues have been resolved by fast internet speeds available nowadays, better browser support for file tyes such as webp, as well as excellent image compression technologies.  However, there are still some issues that will probably never go away and that's what makes this topic so complicated.  One issue in particular is using poorly compressed images that are extremely big in file size.  Unfortunately often times this is at the hands of people who lack the knowledge of creating images that are light in weight and properly compressed.

### Ways to improve image files for your website

If you are responsible for creating or working with images in an image editor such as Photoshop, Illustrator, GIMP, and others, you have great tools at your disposal to ensure your images are optimized and sized properly.  You can play around with the image quality scale as you export your images and ensure are not bigger than they have to be.  There are many other tools that can help you with compression.  One little tool I've been using for years is this little app called [ImageOptim](https://imageoptim.com/howto.html), which allows you to drop in your images in it and it compresses them saving you some file size and improving compression.

Depending on your requirements and environment, you could also look at using different file types for your images.  One highly recommended image type is **webp**.  With the ability to do lossless and lossy compression, webp provides significant improvements in file sizes while still maintaining your images high quality.  The browser support for webp is excellent as it is supported by all major browsers, but do some research as there are some hosting platforms that do not support webp and this could be a problem for you.

To give you an example of how good webp is, the image in the header of this blog post was originally exported from Photoshop as a `.JPG`, which resulted in a 317KB file size.  This is not bad, but then I ran the image through the ImageOptim app and the file size was reduced to 120KB. That's a 62% file size reduction.  Then I exported the same image from Photoshop but this time in webp format and the file size was only 93KB.  That's 71% in file size reduction compared to the original JPG version.
