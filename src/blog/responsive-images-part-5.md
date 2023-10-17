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

Out of the box, Drupal ships with the following media types: Audio, Document, Image, Remote video, and Video.  You can create new media types if needed. For example, you could create a new media type that is of type "Image" (or references the Image media type).  Why would you do this?  Well, in some cases, you may have specific requirements to handle images of a particular entity and rather than modify the existing Image media type, you could create a new one so you can manage specific settings on the new type and don't run the risk of breaking something on your site by updating the default Image media type.Creating new media types is outside the scope of this post, but wanted to let you know what's available to you.

Drupal's Media module is not enabled by default.  Let's start by enableing the Media and Media Library modules. After enabling the modules, follow these steps to configure responsive images within the Image media type:

1. Navigate to `/admin/structure/media`
1. Since we'll be working with images, click the **Edit** link to the right of the Image media type
1. We won't get into all the wonders of Media types, instead let's jump into **Manage display**

Like any other Drupal entity bundle, Manage displays, also known as View modes, are a pretty powerful feature. So what are view modes?  View modes are a way to display content in different ways.  Take a look at the image below.  Each of the numbered marks is a view mode. Same content, different ways and different fields.

<div class="body-image image__centered">

<img src="/images/modes.webp" alt="Image of amazon.com page showin a computer mouse">

</div>

## Creating Media view modes

Now that we understand how view modes work, we will use them to manage/display our responsive images. Let's start by creating a new Media view mode.

1. Within the Manage display tab for the Image media type, scroll down and expand the **Custom display settings** fieldset
1. Click **Manage view modes**
1. In the View modes screen scroll down to the Media section and click **Add new Media view mode**
1. Type **News full** as the view mode name. Spoiler, news articles is where we will use reponsive images.
1. Click **Save**
1. Go back to the Image media type Manage display screen (/admin/structure/media/manage/image/display)
1. Scroll down and expand the **Custom display settings** fieldset
1. Check **News full** and click **Save**.  This enables the newly created view mode.  You should now see it under the Manage display tab for the Image media type.

<div class="post-hint">

**Note**: I realize we have used the same name, **16:9 (Max 720px)**, for image styles and responsive image styles, so to make things less confusing we named the Media view mode **News full**. Using **16:9 (Max 720px)** as the Media view name would had made it reusable, but for the purpose of this guide I wanted to avoid confusion when we connect all the pieces together.

</div>

## Configure the new view mode

It's time to link the new view mode for the Image media type to the responsive image style we created.

1. Withing the Manage display screen, click the **News full** view mode we just created
1. Change the Format of the image field to **Responsive image**
1. Click the gear icon to the right of the image field
1. Under _Responsive image style_ select **16:9 (Max 720px)**.  This is the responsive image style we created before.
1. Link image to nothing
1. Click **Update**
1. Scroll to the bottom of the page and click **Save**

## Where do we use the responsive images?

So image styles, responsive image styles and image view mode are all connected and working great (you'll have to take my word for it 😃).  One thing though, what content in our site will take advantage of all the beutiful work we've done?  How about the Article content type?  Every news article will be able to take advantage of the responsive images work we've done.

### Replace the image field with a Media type field

One thing about the image field that ships with the Article content type. The image field does not use Drupal's Media, it's a stand-alone basic image field. This does not mean we can't use responsive images with this type of image field, we can, but since we have prepared the Media system with a media entity of type image, it makes more sense to use a media type image field as this provides more advantages over a basic image image.  For example, with the media type image field, we can take advantage of media library, add more fields to the image media type, reuse images, and much more.

1. From the admin toolbar, click **Structure**, **Content types**
1. Click **Manage fields** to the right of the Article content type
1. For the image field, click the dropdown under _Operations_ and select **Delete**
1. Click **Delete** again to confirm you want to delete the image field.  The image field is now gone

### Adding a new media reference field to the Article content type

1. Still within the _Manage fields_ for the Article content types
1. Click **Create a new field**
1. In the _Add a new field_ dropdown, select **Media** which is located under the _Reference_ section. Notice there is also an image field, but this is the same kind we just deleted.  Media is what we want.
1. Type **Image** as the label for the new field
1. Click **Save and configure**
1. Keep the _Allowed number of values_ as **Limited to 1** and click **Save field settings**
1. Optional but always a good practice is to add Help text. (i.e. Upload or select an image for this article)
1. Check the box if you want to make this a required field
1. Reference method should be **Default**
1. Check the **Create referenced entities if they don't already exist** checkbox
1. For _Media type_ check **Image**
1. Click **Save settings**.  A new Image field is now available but this time it's a Media reference field of type Image.

### Arranging the field for content entry and content display

By default the new image field was added at the bottom of the list of fields. Let's move the field up.  We will follow the same steps for the **Manage form display** (for when content is created), and **Manage display** (for when content is displayed on the page).

1. Within the **Manage form display** tab scroll down until you find the new Image field
1. Drag it up so it displays right under the Title field
1. Click **Save**
1. Repeat for **Manage display**

### Configure responsive images for the new image field

1. Still within the Article content type page, click **Manage display**
1. Drupal by default provides 3 view modes for the Article content type: **Default**, **RSS**, **Teaser**, and **Full content** (currently not enabled).  We can create as many new view modes as we want/need, but for this excersice we will use the ones Drupal provides.
1. Scroll down the page and expand the **Custom display settings** fieldset
1. Check the **Full content** checkbox.  It's a good practice to uncheck any view modes that are not being used or not planning on using.
1. Click **Save**
1. After saving the changes, click **Full content** from the list of view modes
1. For the image field, make sure its Format is set to **Rendered entity**.  Since the new Image field we added is of Media type, the image is an entity and we want to render it as such.
1. Click the gear icon to the far right of the Image field
1. Under _View mode_ select **16:9 (Max 720px)**
1. Click **Update** then scroll down and click **Save**.  That's it.

## Displaying responsive images in news articles

Before we can see the responsive images, let's create a couple of news articles so we have content to work with.  Go ahead and create a few news articles using the Article content type.  Upload images that are at least 1440px in width so we can see our responsive image styles in action.

<div class="post-pager">

[< Responsive images and Media](../responsive-images-and-media)
[Responsive image styles >](../responsive-image-styles)

</div>
