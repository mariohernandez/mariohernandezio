---
date: "2023-10-09"
title: "Image styles in Drupal"
tags: ['drupal','responsive-images','srcset','sizes']
draft: false
featured: false
featuredImage: "/images/image-styles.webp"
featuredImageAlt: "A person rowin behind a water color painted sky"
featuredImageCredit: "Ngoc Mai Pham"
featuredImageCreditUrl: "https://unsplash.com/@potatonori"
summary: "I'd like to think of Drupal's image styles as templates for cropping and sizing images."
---
Now that we've gone over some very important concepts of responsive images, it's time to put it all together in practice so we can render responsive images. This and subsequent articles in this series will be very Drupal specific. Image styles are how Drupal manages the way we crop and size images.

## What are image styles?

Before we get to building image styles, let's go over what they really are.  As I said earlier, image styles are templates we define for cropping and sizing images. You can use these templates with any image on your site and as many times as you'd like.  Thanks to image styles our images will always rendered within the parameters of those templates. Imagine you have a couple of picture frames you'd like to use to hang some pictures in your house or office.  One frame is 5x7, another is 4x6 and one last one is 8x10.  The picture frames are Drupal's image styles.

So we have some picture frames and we have ordered several pictures from our favorite online service. There is one picture in particular I really love and I want to frame it using the 3 picture frames. So, although it is the same picture, I ordered different sizes of it (one for each frame size), and this will allow me to hang the 3 pictures in different sizes, aspect ratios and orientation. That in a nutshell are image styles.

<img src="/images/images.webp" alt="Drawn images of different sizes">


## Image styles best practices

Image styles are actually pretty easy to create but unfortunately because of this they can be misused or mismanaged. If not done properly, you may end up with a lot more image styles than you really need or image styles that are not well define and do no provide the outcome you are looking for.  To avoid this, let's go over some best practices for creating image styles which will result in less image styles to manage.

### Naming image styles

Have you heard the phrase "naming things is hard"?  It's true.  Unfortunately when it comes to image styles, if not named properly you can get yourself in a lot of trouble. Quick example, let's say I want to create an image style that I'd like to use on images of news articles that are displayed on the homepage. One might think a good name for the image style may be something like "**Homepage news article images**". It doesn't seem so bad of a name but let me point out a few issues with this name:

- The image style is limited to the homepage
- It is limited to news article images
- It lacks information about the image dimensions or aspect ratio

One key best practice of image styles is that they should be reusable. The more reusable an image style is the less image styles you will need to create which in turn becomes easier to manage.  The main issue with the image style above ("Homepage news article images"), besides the 3 bullet points we called out, is that is not reusable.  The name of it limits us to only use it on the homepage and only for news article images.  If we want to display similar images elsewhere, we would need to create another image style maybe with the same parameters as the first one.  You may be asking yourself, wait, why can't we use the same image style elsewhere?  Technically you can, but think about how confusing it will be to use an image style called "Homepage news article images", not on the homepage and not on news article images.

### Creating reusable image styles

One very efficient way for creating reusable image styles is to name them based on the image aspect ratio (whenever possible).  For example: "**6:9 (Max 720px)**", or "**1:1 (500px)**".  Here are some reasons why this is a great way to name image styles:

- They are not specific to any page or type of image (articles, events, etc.)
- They provide key information about the image aspect ratio and their dimensions
- I can use these image styles hundreds of times on any image that meets the requirements and on any page
- By creating/naming image styles this way, I may have just saved myself from creating many other image styles. Less image styles is easier to manage.

I hope you see the impact good names for image styles have in your site. When you are working on an enterprise level website, using the best practices above can really help you with the maintenance of your image styles.

### Image styles use cases

When naming image styles it helps me to think of the characteristics of the image I am creating image styles for. For example, I have an image that should be rendered in 6:9 aspect ratio and it should not exceed a width of 720px.  This is how I arrived at the name **6:9 (Max 720px)**. This also makes it possible to know which image style to use if I have other images that need to be rendered similarly.  It is perfectly okay to use an image that is slightly off from what an image needs to be rendered at.  For example, Let's say I have an image that should be rendered at 6:9 aspect ratio, but its size should not exceed 640px. for this image, I can still use the **6:9 (Max 720px)** image style.  The keyword **Max** in the image style name makes it possible for me to use it on other images as long as those images don't need to be rendered at a size that exceed 720px.  This is also a technique for limiting the number of image styles you need to create.

A 100px or even 200px difference between the image style dimensions and the image you need to use it on it's an acceptable thing to do for a couple of reasons:

- 100 or 200px in most cases will not make a big of an impact in performance.  For example if my image needs to be rendered at 640px but the image style is resizing it to 720px, you may not see any performance issues, but at the same time, if you are rendering 50 of these images in a page, then this could certainly present performance issues.  So my rule is as long as this is a oneoff type of situation, I'm okay with doing this.
- Keep in mind that just because your image may be resized larger than it actually needs to be rendered, your image will still visually rendered at the right size as I would supposed it is inside a container that will be sized to the right rendering size, via CSS, and therefore your image will be the right size.
- Being able to reuse an image that may be larger than  needed saves me from creating another image style.

## Image styles effects

Image styles effects are the rules you set on each image.  Rules such as cropping, sizing and scaling of images is how we determine how to render the images in our site. In most cases, you want to let content creators of your site upload images that are as big as possible.  Doing so will allow you to use the images in your library in any use case.  It is perfectly okay to scale your images down thorugh the use of image styles, but it is not recommended to scale images up.  Doing so will result in blurry or pixelated images.  This is why is better to upload large images.  But you may be thinking, if I upload super large images, this will affect the performance of my site.  It will if you are rendering the original images, but since we are using image styles, our super large images get resized to smaller images.

Image styles effects can vary from image style to image style.  For example, some image styles will require images to be scaled down, than cropped.  Other image styles will require images to be resized than cropped it and others may just need for images to be resized to specific size.  All these actions are called "Effects" in image styles.  The effects you apply to your image styles will depend on the end goal for rendering the images.  Let's do a quick demo of creating image styles and applying effects to them.

## Hands-on demo

All the principles covered in this series apply to Drupal 8, 9, and 10.  To get started, spinoff a vanilla Drupal site of the version of your choice.  At the begining of this series I mentioned we will stick with only core/out of the box functionality to keep things simple.

### Creating a new image style

1. Login to Drupal as administrator
1. In your Drupal site navigate to `/admin/config/media/image-styles`
1. Click **Add image style**
1. For _Image style name_ type: **1:1 (720px)**
1. To keep things nifty, edit the image style machine name so it reads `1_1_720px`
1. Click **Create new style**

<img src="/images/img-screenshot.webp" alt="Screenshot of image style creation form">

The image style above follows the best practices for name we covered earlier.  This makes this image style reusable on any image that meets the aspect ratio and dimension requirements.

### Adding effects to the image style

For the purpose of this demo, we are going to use the **Scale and crop** effect.

1. While in the page where the new image style was created (admin/config/media/image-styles/manage/1_1_720px), scroll down and you should see the **Effect** dropdown
1. Select **Scale and crop** effect from the dropdown
1. Click **Add**.  The Add Scale and Crop effect screen will come up
1. Type **720** for width and height.  Notice these two values are required.  **Note**: It is important to define fixed dimensions on your image styles.  This ensures your images will be rendered at exactly the size you expect them to.
1. Notice how you can change the focal point of the cropping by clicking any of the circles under **Anchor**.  For this example we'll keep it in the middle circle.
1. Click **Add effect**. This will bring you back to the image style page.
1. We're done!

<img src="/images/img-effect.webp" alt="Screenshot of image effect screen">

## Using the new image style
