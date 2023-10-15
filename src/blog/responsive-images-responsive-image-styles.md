---
date: "2023-10-09"
title: "Responsive image styles in Drupal"
tags: ['drupal','responsive-image-styles']
draft: false
featured: false
featuredImage: "/images/picture-frames.webp"
featuredImageAlt: "Two picture frames on a counter"
featuredImageCredit: "Sincerely Media"
featuredImageCreditUrl: "https://unsplash.com/@sincerelymedia"
summary: "Responsive image styles in Drupal are bundles that contain one or more image styles."
---
In a nutshell, responsive image styles are a collection of image styles.  It can be confusing because the similarities on their name, but responsive image styles are a bundle that holds one or more image styles.

## What's the use of responsive image styles?

If you read the posts about the `<picture>` element as well as the one about `srcset` and `sizes` attributes, we discussed that whether you are doing are direction or simply doing resolution switching, we need to provide a collection of images so we can choose the best image for different device sizes. The way we provide a collection of images is by using responsive image styles.

<div class="body-image image__narrow image__centered">

<img src="/images/responsive-image-styles.webp" alt="Three images stored in a box">

</div>

## Naming responsive image styles

In the previous post we went in detail about best practices for naming image styles, properly naming responsive image styles is just as important but there are some differences in guidelines for naming responsive image styles.  While naming image styles is mostly based on the characteristics of the images (aspec ratio, orientation, dimensions), naming responsive image styles is typically based on the use case.  Let's take a look at some examples.

Let's say we are building a photo gallery where we will use a series of images to display as a slider or grid of images. We don't need to worry what the images aspect ratio or dimentions are, we're only interested on how the images will be used.  In this example the use case is a Gallery.  So a name for the responsive image style that makes sense to me would be **Gallery** or even **Photo gallery**.

The example above was very specific but is one that may be common when working on a media website.  Other examples where we may want to use names that could apply to more than one use case, might be something like **6:9 (Max 720px)** or **4:3 (Max 460px)**. These responsive image styles names give us all the information we need regarding their use case.  One important point I'd like to make when I name image styles or responsive image styles is the use of **(Max xxx)**.  To me this is critical because it tells me the biggest size of the image where these styles can be used.  In the two examples above, I can tell right away that I can use the responsive image styles in images **720px** and below and **460px** and below respectively.  Some people opt not to include dimension specs which makes it very hard to know what size images can use those styles.

## Back to hands-on exercises

We are going to create a new responsive image style where we will make use of the two image styles we created in the previous post.

In Drupal 8 we used the Picture and Breakpoints contrib modules to handle responsive images.  Starting with Drupal 9, Drupal provides the "**Responsive image**" core module which means we don't need to install any contrib modules. However, responsive image is not enabled by default.

### Resolution switching

Here's where all of our knowledge about `<picture>` (art direction) and `srcset` and `sizes` (resolution switching) comes in handy.  We'll start with resolution switching because art direction requires additional configuration which we have not done yet.  We'll get to that shortly.

1. Enable the Responsive image core module (/admin/modules)
1. Once enabled, head over to `/admin/config/media/responsive-image-style` to begin creating our first responsive image style
1. Click **Add responsive image style**
1. Type **6:9 (Max 720)** as the label for the responsive image style
1. Edit the machine name so it reads `6_9_max_720px`
1. Select **Responsive image* from the Breakpoint group dropdown
1. Scroll down and select a Fallback image style (**Large (480x480)** or any other square image style)
1. Expand the **1x Viewport Sizing []** panel
1. Under **Type**, select **Select multiple image styles and use the sizes attribute.**
1. Under **Sizes** type the following: **(max-width:700px) 100vw, 50vw** (I'll explain shortly)
1. Under **Image styles** select the two image styles we created before (6:9 (Max 720px) and 6:9 (Max 1440px))
1. Scroll down and click **Save**

<div class="body-image image__centered">

<img src="/images/responsive-image-style-screenshot.webp" alt="Three images stored in a box">

</div>

### Let's go over everything we just did

Since we are doing resolution switching and not art direction, we chose **Responsive image** from the Breakpoint group dropdown.  Doing so presents to us the **1x Vieport Sizing []** screen with the following options:

- **Type**: Again, since we are doing resolution switching (using `srcset` and `sizes` attributes), the obvious choice here is **Select multiple image styles and use the sizes attribute**.  The other two options seem irrelevant in this particular example.
- **Sizes**: The Sizes option is where we tell the browser how big/small our images should be rendered in relation to the viewport being used.  Depending on our goal, this field accepts a single value or a media query with some conditions.  Let's say we wanted our images to always render at full width regardless of the device being used (viewport), then the value for the Sizes field would be **100vw** (100% the viewport width).  In our case however, we want the image to display full width (100% the viewport width), but only if the viewport/device is not larger than 700px (max width is 700px), otherwise, meaning if the viewport/device is larger than 700px, we want the image to display at 50% of the device's viewport (50vw). As indicated above, this is the `sizes` attribute of the `<img>` tag.
- **Image styles**: This is where we choose the image styles we want to make available to the browser to pick from.  Think of this as the `srcset` attribute in the `<img>` tag.
- **Fallback image**: We pick a fallback image in case all the above fails.

**Very important**: Remember in the [using the srcset and sizes](#) post our claim was that it's better to let the browser pick the best image possible as the browser is smarter than us?  This is exactly what we are doing here.  We are providing the browser with a collection of images to pick from.  Each image provides its dimensions. Then we tell the browser how big/small we want the images to be rendered.  One thing we are not doing is telling the browser which image to use, we let the browser do that for us.  This is the complete opposite of what we do when we use `<picture>` or art direction.  As a reminder, the method used above is what you would do in most of your images.  This is like the default configuration for your responsive images.  Only when you need to crop your images differently for each device size is when you would use the art direction approach.  We'll cover that next.


## Image styles and responsive image styles are ready, now what?

Now that we have image styles and responsive image styles in place, it's time to tell Drupal to use them.  Before we do however, let's quickly talk about [Drupal's Media](https://www.drupal.org/docs/8/core/modules/media/overview).

<blockquote>
In Drupal, the core Media module manages the creation, editing, deletion, settings, and display of media entities. Media items are typically images, documents, slideshows, YouTube videos, tweets, Instagram photos, etc. Media entities are standard Drupal content entities. And are grouped by Media type bundles. Like content types they can have fields added, and their display can be managed via view modes.
</blockquote>

The core Media module can play a big role in effectively managing responsive images in your site.  Because media uses Media types and view modes, we can use these powerful features to our advantage when managing responsive images.  As part of our plan to effectively manage responsive images, we will rely on the Media module to make the best of responsive images.

We're done creating our first responsive image style.  In the next post, we will work on telling Drupal to use what we've built and we will also get the Media module involved for more flexibility.
