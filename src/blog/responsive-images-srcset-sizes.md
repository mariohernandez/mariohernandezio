---
date: "2023-10-09"
title: "Responsive images using srcset and sizes attributes"
tags: ['drupal','responsive-images','srcset','sizes']
draft: false
featured: false
featuredImage: "/images/srcset-sizes.webp"
featuredImageAlt: "A person rowin behind a water color painted sky"
featuredImageCredit: "Robin GAILLOT-DREVON"
featuredImageCreditUrl: "https://unsplash.com/@robingaillotdrevon"
summary: "The challenge is finding the balance between enhancing the look of your website through the use of images without sacrificing the performance of your website."
---
In the [previous article](./responsive-images-in-drupal-a-complete-guide.md) we detailed what art direction is and how to address it using the `<picture>` element.  In this post, the focus will be how to address responsive images when the requirement is image resolution switching.  Resolution switching in the context of responsive images is rendering identical image content (same aspect ratio), on all devices.  Unlike art direction where each device gets a different cropped image that may vary on aspect ratio, resolution switching uses identical images that are simply larger or smaller based on the device but retain the same aspect ratio and cropping settings.  Resolution switching is how most images are rendered (the rule), the `<picture>` element approach is the exception to the rule. Take a look at an example of resolution switching below.

<img src="/images/res-switching.webp" alt="Image of lights show displayed in different device sizes">

The image above demonstrate how multiple resolutions of the same image can be served to different devices.  All the images in the example above are cropped exactly the same maintaining the same aspect ratio from large to small.

## Using srcset and sizes attributes

Using the `srcset` and `sizes` image attributes is how most images are rendered in the web today.  As indicated before, this is the recommended way for configuring responsive images if all you need is to switch resolution of images rather than art direction.  So how does this approach work?  Let's take a look at a typical configuration of the `<img>` tag using the image above as an example of the various image sizes we will want to choose from:

{% raw %}

```html
<img
  srcset="original-image.jpg 2400w, extra-large.jpg 2000w,
          large.jpg 1600w, medium.jpg 1080w, small.jpg 800w, x-small.jpg 500w"
  sizes="100vw"
  src="large.jpg"
  alt="Image of sky shown at different resolutions" />
```

{% endraw %}

Let's break things down so we can understand how this approach is what you should be using if you are planning to implement responsive images.

- `<img>`: Right off the bat we start by using a widely supported html tag.
- `srcset`: The `srcset` attribute in the img tag serves two important roles, 1) It stores a list of images that can be used by the browser, 2) Each image provides its width value which plays a role on the browser choosing the right image.
- `sizes`: The example above is pretty simple but we can get pretty complex if needed.  The `sizes` attribute tells the browser the width, in relation to the viewport, the image should be rendered at.  The value of `100vw` shown above, means the image will be rendered at 100% the viewport width on all the devices.
- `src`: The `src` attribute is used as a fallback if everything fails.

## What does all this mean?

Let me explain things in more detail because it is important we understand how this approach is so much better than using the `<picture>` element.

The biggest difference/advantage of using `srcset` and `sizes` versus `<picture>`, is the fact that we let the browser decide which image is the best image to render on any device.  This is possible thanks to all the information we have supplied to the browser.  For example, in the `srcset` we are not only providing the browser with a list of images to choose from, but we are also telling the browser how big each image is.  This is very important because the browser will use this information when choosing the image to render on any given device.  In the `<picture>` element approach, the image size descriptors are not available.

The `sizes` value tells the browser the size the image needs to be rendered at in relation to the viewport.  This too is extremely important information we are providing the browser because if the browser knows the dimensions of all the images to choose from and how big/small the image needs to be rendered, then the browser is able to pick the best image possible.

But there are more benefits when we let the browser make the decisions.  The browser is smarter and knows more about the web environment than we do when a page or image is rendered. For example, the browser knows the viewport width used when viewing a website, it knows how fast/slow your internet connection is, and it knows about any user browser settings.  Using all this information the browser is able to determine which image from the `srcset` will meet the requirements we are defining the best.  In contrast, with the `<picture>` element, we tell the browser which image to use solely based on the device size.

## Closing the gap

| Environment conditions                  |Does the developers know? |Does the browser know? |
| --------------------------------------- | :----: | :----: |
| Viewport dimensions                     | No     | Yes              |
| Image size relative to the viewport     | Yes    | Yes via `sizes`  |
| Screen density                          | No     | Yes              |
| Images dimensions                       | Yes    | Yes via `srcset` |

Insert chart closing the gap.

<div class="post__nav">
  <div class="post_prev">
    <span>Previous:</span>
  </div>
  <div class="post_next">
    <span>Next:</span>
  </div>
</div>
