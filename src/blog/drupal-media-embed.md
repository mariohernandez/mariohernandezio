---
date: "2024-01-02"
title: "How to manage image embeds with Drupal media"
tags: ['drupal', 'media']
featured: true
featuredImage: "/images/media-embed.webp"
featuredImageAlt: "Siluete of man in front of sphere"
imageThumb: "/images/thumbs/media-embed-small.webp"
featuredImageCredit: "Greg Rakozy"
featuredImageCreditUrl: "https://unsplash.com/@grakozy"
summary: "Take control of your image embeds in your Drupal site using these guidelines."
---

Allowing your content creators to embed images in text fields is a big risk if you don't have the right measures in place to get properly rendered images without jeopardizing your site's performance. I recently worked on addressing various media-related issues and I have made an effort to document the process I've taken hoping it could help others in the community.  I started by writing a seven-part guide on [how to setup responsive images](../responsive-images-in-drupal-a-guide).  In this post I'll focus on images embeds which require special attention.

If you followed or read the responsive images guide, you should be able to take advantage of some of the work we did there in this post.  The guidelines covered in this post include:

* Defining requirements
* Image styles
* Media view modes
* Text format configuration

## Defining requirements

Before you write the first line of code or set the first drupal configuration for this issue, you need to have a clear understanding of your requirements.  Here is a summary of my requirements:

* Only certain user roles can embed images

  If not all authenticated users can embed images means we need to figure out if the text formats used in our site will allow us to set the restrictions we need.  Otherwise we may need to create or edit a text format that only the target user roles have access to.

* Users need to be able to choose the image size and aspect ratio from a list of options

  In my case I met with the stakeholders who know content editor's needs and have the authority to decide which image sizes and/or aspect ratios editors should be able to choose from. One unique requirement here was that the options should use layman's terms and be user-friendly.  This means some of the labels we were using such as **21:9 Cinemascope** needed to be easier to understand by non-technical users.  We came up with options which may or may not work for your specific requirements. These size options are relative to the site's content area which at its maximum is about 1300px.

  * Small square, Small portrait, Small rectangular
  * Medium square, Medium portrait, Medium rectangular, Medium rectangular wide
  * Large square, Large rectangular, Large rectangular wide
  * Extra large square, Extra large rectangular, Extra large rectangular wide
  * Super large full width

* If no option is selected by users, set a default image size

  For the default option when no selection is made by the user, we decided to use the Medium rectangular option.  This has an aspect ratio of 3:2 and it measures about 720x480.

* Existing Media items need to be available for embedding

  This was a tricky one because my original inclination was to create a new Media type so we can isolate all configuration for its view modes and not overpopulate our default Media type of **Image**.  However, this ended up not working for us because when you limit your image embeds to only be available in the new Media type, you don't get access to any of the media items (images), that have already been uploaded and are part of the site's media library.  Ultimately we ended up using the existing/default Media type Image and our dev team had to compromise on having a very busy list of view modes for the Image media type.  More on this later.

* Images need the ability to be cropped wihin the Media page

  Since most of our images already provide the ability to be cropped at different aspect ratios, using the default Media type  in the previous bullet point made this an easy solution.

## Image styles

It all starts with image styles.  I'm not going to go over how to create image styles, you can read my post [Image styles in Drupal](../image-styles-in-drupal).  The one thing I am going to repeat however is the importance of creating reusable image styles.  Reusable image styles can help you reduce the number of image styles you create while providing the flexibility you need with each use case.

Image styles are key as each of the size options we defined above translate into image styles.  So Small square for example, is an image style that is defined as `1:1 (250px)`.  Medium rectangular would be something like `3:2 (720x480)`, etc.  You may be wondering, how do you plan on using fiendly names for your content editors when your image styles names are something like 1:1 (250px)?  Great question.  Since we are using Drupal's Media, content editors do not interact directly with image styles, they do with Media view modes.  More on this later.

## Media view modes

View modes are one of Drupal's more powerful features.  Being able to display content is different ways with little effort can turn your website into a dynamic content hub.  The example I always give when someone asks me what are view modes or how do they work is the Amazon website. When you are viewing a product in amazon.com, you will notice that the same product or similar ones appear all over the page but in slightly different ways, with different fields or styles.  See the page below for an example.

![Example of Amazon.com website](/images/modes.webp)

_The image above shows many ways in which a product can be displayed.  This is what view modes are_.

In Drupal, every entity such as content types, media types, blocks, etc., offer the ability to create view modes.  For the purpose of image embeds, we will create a Media type view mode for each image style we plan on using.  Let's go over how this relationship between view modes and image styles works for image embeds.

### Configure view modes for image embeds

1. In your Drupal site, create or identify an image style for each image size option you wish to provide to users when embedding images.
1. Next, create a Media type view mode for each image style (`/admin/structure/display-modes/view`). **Very iimportant**, remember the view mode's label (name) is where we are going to use friendly name (i.e. Medium rectangular wide).  Feel free to customize the view mode machine name as you feel works best for you.
1. Now, let's tie the two together:

   * Go to the media type you plan on using for media embeds (`/admin/structure/media/manage/image/display`)
   * Scroll down and expand the **Custom display settings** fieldset
   * Check each of the view modes you created in step 2 and click **Save**
1. Now click each of the view modes and update the image field to use the respective image style

## Configure the text format

Our view modes and image styles configuration is all done.  Now we need to configure the text format that will make use of this configuration.

1. Go to the Text formats and editors page (`/admin/config/content/formats`)
1. Click **Configure** next to the text format you plan on using (i.e. Full HTML)
1. Ensure the right user roles are selected
1. In the **Toolbar configuration**, drag the **Drupal media** button from the _Available buttons_ options to the _Active toolbar_ section.
1. Scroll to the **Enabled filters** section
1. Check the **Embed media** checkbox
1. Scroll to the **Filter settings* section and set the following:
   * **Default view mode**: This is the default display that will be used if content editors don't pick an option when embedding images.

   * **Media types selectable in the Media Library**: Select the Media type you created all the view modes for in the previous section.

   * **View modes selectable in the 'Edit media' dialog**: Finally, select each of the view modes you created in the previous section.

  * Click **Save configuration**

## Testing your configuration

Now that we've completed all the configuration we should be able to take it for test drive.
* Go to any page where there is a text field with a WYSIWYG editor.
* Make sure you are using the right text format within the editor
* Click the **Embed media** button from the editor's toolbar
* Select or upload the image you'd like to embed
