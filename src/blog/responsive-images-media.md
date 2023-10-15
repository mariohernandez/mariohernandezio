---
date: "2023-10-09"
title: "Responsive images and Media"
tags: ['drupal','responsive-images','media']
draft: false
featured: false
featuredImage: "/images/media.webp"
featuredImageAlt: "Watter color mountains"
featuredImageCredit: "Simon Berger"
featuredImageCreditUrl: "https://unsplash.com/@8moments"
summary: "In Drupal, the core Media module manages the creation, editing, deletion, settings, and display of media entities."
---
In Drupal, the core [Media module](https://www.drupal.org/docs/8/core/modules/media/overview) manages the creation, editing, deletion, settings, and display of media entities. Media items are typically images, documents, slideshows, YouTube videos, tweets, Instagram photos, etc. Media entities are standard Drupal content entities. And are grouped by Media type bundles. Like content types they can have fields added, and their display can be managed via view modes.

## Working with Media in Drupal

Out of the box, Drupal ships with the following media types: Audio, Document, Image, Remote video, and Video.  Media types are entity bundles just like content types. In addition, you can create new media types when needed. Creating new media types is outside the scope of this post.

Also out of the box, Drupal's Media module is not enabled by default.  Let's start by enableing the Media and Media Library modules. There are several media configurations steps needed for managing responsive images.  Let's start:

1. Navigate to `/admin/structure/media`
1. Since we'll be working with images, click the **Edit** link to the right of the Image media type
1. We won't get into all the wonders of Media types, instead let's jump into **Manage display**

Like any other Drupal entity bundle, Manage displays, also known as View modes, are a pretty powerful feature. So what are view modes?  View modes are a way to display content in different ways.  Take a look at the image below.  Each of the numbered marks is a view mode. Same content, different ways and different fields.

<div class="body-image image__centered">

<img src="/images/modes.webp" alt="Image of amazon.com page showin a computer mouse">

</div>

## Media view modes

Now that we understand how view modes work, we will use them to manage/display our responsive images. Let's start by creating a new view mode.

1. Within the Manage display tab for the Image media type, scroll down and expand the **Custom display settings** fieldset
1. Click **Manage view modes**
1. In the View modes screen scroll down to the Media section and click **Add new Media view mode**
1. Type **6:9 Max 720px** (Looks familiar?)
1. Click **Save**
1. Go back to Image media type Manage display screen (/admin/structure/media/manage/image/display)
1. Scroll down and expand the **Custom display settings** fieldset
1. Check **6:9 Max 720px** and click **Save**.  This enables the newly created view mode.  You should now see it under the Manage display tab for the Image media type.

**Note**: The name **6:9 Max 720px** is not required but just like image styles and responsive image styles, it makes our new view mode reusable on any other entituy bundle.

## Configure the new view mode

It's time to link the new view mode for the Image media type to the responsive image style we created in previous articles.

1. Click the **6:9 Max 720px** view mode we just created
1. Change the Format of the image field to **Responsive image**
1. Click the gear icon on the right of the image field
1. Under _Responsive image style_ select **6:9 (Max 720px)**.  This is the responsive image style we created before.
1. Link image to nothing
1. Click **Update**
1. Scroll to the bottom of the page and click **Save**

## Where do we use the responsive images?

So image styles, responsive image styles and image view mode are all connected and working great (you'll have to take my word for it 😃).  One thing though, what content in our site will take advantage of all the beutiful work we've done?  How about the Article content type?  Every news article will be able to take advantage of the responsive images work we've done.

The Article content type has an image field which we will use to display responsive images.  The image field that comes with the Article content type out of the box does not use Drupal's Media, it's a stand-alone basic image field. This does not mean we can't use responsive images with this type of field. we can, but since we have prepared the Media system with a media entity of type image, we will first replace the Article's image field with a new field that uses the media type bundle.  Let's do this now.

1. From the admin toolbar, click **Structure**, **Content types**
1. Click **Manage fields** to the right of the Article content type
1. For the image field, click the dropdown under _Operations_ and select **Delete**
1. Click **Delete** again to confirm you want to delete the image field.  The image field is now gone

### Adding a new media field to the Article content type

1. Still within the _Manage fields_ for the Article content types
1. Click **Create a new field**
1. In the _Add a new field_ dropdown, select **Media** which is located under the _Reference_ section. Notice there is also an image type of field, but this is the same kind we just deleted.  Media is what we want
1. Type **Image** as the label for the new field
1. Click **Save and configure**
1. Keep the _Allowed number of values_ as **Limited to 1** and click **Save field settings**
1. Optional but it's always a good practice to add Help text. (i.e. Upload or select an image for this article)
1. Check the box if you want to make this a required field
1. Reference method should be **Default**
1. Check the **Create referenced entities if they don't already exist** checkbox
1. For _Media type_ check **Image**
1. Click **Save settings**.  A new Image field is now available but this time it's a Media reference field of type Image.

### Arranging the field for content entry

By default the new image field would be added at the bottom of the list of fields within the **Manage form display** tab.  This is probably not the best place for the field.  We can drag it up so it displays right under the Title field when we are creating a new news article then click **Save**

### Configure responsive images for the new image field

Now that we have a new Media reference field of type Image, we can complete the configuration for responsive images in the Article content type.

1. Still within the Article content type page, click **Manage display**
1. Drupal by default provides 3 view modes for the Article content type: **Default**, **RSS**, and **Teaser**.  We can create as many new view modes as we want/need, but for this excersice we will use the ones Drupal provides by default.
1. Scroll down the page and expand the **Custom display settings** fieldset
1. Check the **Full content** checkbox.  It's a good practice to uncheck any view modes that are not being used or not planning on using.
1. Click **Save**
1. After saving the changes, click **Full content** from the list of view modes.  The order the fields are listed is the order in which they will display when you are reading a news article.  Reorder the fields as you wish and save your changes.
1. For the image field, make sure its Format is set to **Rendered entity**.  Since the new Image field we added is of Media type, the image is an entity and we want to render it as such.
1. Click the gear icon on the far right of the Image field
1. Under _View mode_ select **6:9 Max 720px**. This view mode is the one we created for the Media type Image at the begining of this post.
1. Click **Update** then scroll down and click **Save**.  That's it.

## Displaying responsive images in news articles

Before we can see the responsive images, let's create a couple of news articles so we have content to work with.  Go ahead and create a few news articles using the Article content type.  Upload images that are at a minimum 1440px so we can see our responsive image styles in action.




1.




1.

## What's the use of responsive image styles?

If you read the posts about the `<picture>` element as well as the one about `srcset` and `sizes` attributes, we discussed that whether you are doing are direction or simply doing resolution switching, we need to provide a collection of images so we can choose the best image for different device sizes. The way we provide a collection of images is by using responsive image styles.


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
