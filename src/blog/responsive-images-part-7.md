---
date: "2023-10-09"
title: "Responsive images, the end"
tags: ['drupal','responsive-images']
draft: false
featured: false
featuredImage: "/images/wrap.webp"
featuredImageAlt: "Person holding a wrapped gift box"
featuredImageCredit: "Kira auf der Heide"
featuredImageCreditUrl: "https://unsplash.com/@kadh"
summary: "In Drupal, the core Media module manages the creation, editing, deletion, settings, and display of media entities."
---
When it comes to image resolution switching, all the work we need to do is done.  We will proceed to creating a quick Drupal view to display a list of news articles in which their images will be using the responsive images preparation we've done thus far.  When we finish with that, we will do the last pending thing, configuring responsive image styles using the `<picture>` element.  You didn't forget about the picture element, did you?

## Creating a new Drupal view for news articles

As shown in the image in the previous post, we are going to create a new Drupal view that will display a list of news articles.  Out of the box Drupal already comes with a similar view but in the Olivero theme this view is not displayed the way we want to.  It will be easier to create our own view.

1. From the admin toolbar, clic, **Preferences** | **Views**
1. Click **Add view**
1. Give the new view any name you wish (i.e. News, Latest News, etc.)
1. In the **View settings** select to show Content of type **Article**
1. In **Page settings** check **Create a page**
1. Page title can be anything you wish
1. Type **news** (lower case) as the path
1. Under **Page display settings** chose **Unformatted list** of **teasers**
1. Scroll and click **Save and edit**
1. In the View content page change **teaser** to **Content list** under the _Format_ section.
1. Scroll down and click **Save**

Two important things in the view above:

* The path is the url where the content list will be available (i.e. https://my-site.com/news)
* Changing _Teaser_ to **Content list** is where we make use of the Article view mode we created.

With the view now in place, go to the new page we created, `/news`.  This should show a list of news articles. The example below is how one of the items in the list looks.

![Demo of news article item](/images/img-demo.webp)

The images in each article should reflect the configuration we setup for responsive images.  You can check this by inspecting the images and you should see many of the attributes we configured.  See example below.

![Demo of image and code inspector](/images/img-demo-inspect.webp)

* First, the image is rendering using the `img` tag and not `<picture>`
* The img tag uses the `srcset` and `sizes` attributes
* We can see the diferent image styles we created

<div class="post-pager">

[< Responsive images and Media](../responsive-image-styles)

</div>
