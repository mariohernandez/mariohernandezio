---
date: "2025-02-14"
title: "Integrating Font Awesome Pro and Kits in your Drupal theme"
subtitle: "Font Awsome Pro in combination with icons kits are a great way to manage your icons library so you only load the icons your website uses."
tags: ['fontawesome','drupal']
draft: false
featured: true
featuredImage: "/images/icons.webp"
featuredImageAlt: "Person taking a picture with their phone"
imageThumb: "/images/thumbs/icons-thumb.webp"
featuredImageCredit: "Kipras Štreimikis"
featuredImageCreditUrl: "https://unsplash.com/@kkipras"
summary: "Take better control of your Font Awesome icons library using a single Drupal module."
eleventyExcludeFromCollections: false
---

In this post I'm going to describe how to use the [Font Awesome](https://www.drupal.org/project/fontawesome){target=_blank rel="noopener noreferrer} Drupal module to integrate Fontawesome Pro along with icons kits with your drupal website. The top-level requirements include:

1. Use Font Awesome Pro
1. Use Icons Kits to only allow pre-approved icons
1. Provide an icon picker with preview of the icons for better user experience for content creators

<span class="callout">
<strong>NOTE</strong>: This post focuses on Font Awesome Pro. The free version of Font Awesome may be simpler to integrate.
</span>

## Font Awesome Pro

Having a Font Awesome Pro account provides more advantages than the free version. The Pro accounts gives you more control of the icons you can use, you can upload custom icons, create icons kits, and more. Obviously the Pro version is a paid version and there are several tiers of Pro you can get.

## Font Awesome Kits

Font Awesome Kits are like collection of icons you can create when your goal is to limit the icons you want your team to use. This is perfect when you don't really need to load all 55,663 icons available in Font Awesome (as the date of this post), but instead you have a pre-approved list of icons your organization uses.

## The setup

### Creating a Font Awesome Kit

* Login to your Font Awesome account and click the **Your Kits** link
* Create a kit using the type of icons you wish to include in it (Solid, Regular, Light, Thin, etc.)
* When you are finished with your kit and have selected the icons you want to make available for your content creators, you can download the kit to your computer.  We'll be back to this later.

### Enable the modules

Originally I was looking a various Drupal modules to accomplish without going into too much detail, combining multiple Font Awesome-related modules did not do the trick, instead, I ended up using a single module which fulfilled all my requirements.

* First things first, download and install the [Font Awesome](https://www.drupal.org/project/fontawesome){target=_blank rel="noopener noreferrer} module
* The module comes with a companion submodule, **Fontawesome Icon picker widget**, `fontawesome_iconpicker_widget`, install it as well
* In your project's root, ensure you have a `libraries/` directory which is where the Font Awesome library and the icon picker widget library will be stored
* Run `drush fa:download` to download the `fonticonpicker` library

<span class="callout">
<strong>NOTE</strong>: Please read the README.md from the Font Awesome module for more details about configuration.
</span>

### Configure Font Awesome

There are many settings you can configure and these are based on your specific requirements. I'm going to list only the ones that applied to me and will ignore the rest.

* Navigate to **Configuration > Content Authoring > Font Awesome Settings** or `admin/config/content/fontawesome`
* First setting is to choose a tag for your icons, you can use `<i>` or `<span>`. Either is fine
* Next select a Font Awesome Method. **SVG with JS** is the recommended method
* Check the **Load Font Awesome Library?**. This option works for me but if you are loading the Font Awesome library some other way, you may need to leave this box unchecked.
* Uncheck the **External File Configuration** box because we will be loading our library locally. Using an external file configuration/URL may not work with the Pro version of Font Awesome.
* Under **Partial file configuration**, check the icons you wish to serve on your site. Keep in mind, the options you select should match the type of icons you added when you created the kit
* Save your changes

### Adding the Font Awesome library

### Creating a new Drupal library

### Creating a new field of type Font Awesome

## Adding icons to your pages

![Image crop preview settings](/images/blog-images/crop-preview.png){.body-image .body-image--wide .body-image--left}

Fig. 1: Screenshot of Crop preview configuration.{.caption}

You may not know this but you can change image styles for almost any image within Drupal's admin. I recently completed a lot of work around image styles within our platform and perhaps I unknowingly changed the image style used by Drupal's crop preview. I can't say for sure.

## Solution

The issue was not so much the aspect ratio used in the image style used as the crop preview, but rather the hard dimensions of the image style. These dimensions were forcing all images, regardless of their aspect ratio, to use the square aspect ratio as the starting point for cropping, rather than the original image.
The solution is to use an image style that uses the **Scale** image effect, as the crop preview. The Scale image effect does not require image dimensions and thus allows your cropping area to always reset to the original image.

If you read [comment #5](https://www.drupal.org/project/image_widget_crop/issues/3222406#comment-14903564){target=_blank rel="noopener noreferrer} in the issue page you will see **juamerico** explanation of the issue in more detail and what he did to fix it.

### Steps taken to address the issue

1. I created a new image style called **Crop preview** with the Scale image effect as well as using a wide aspect ratio or crop type such as 16:9.
1. I configured the **Manage form display** for the **Image** media type (`admin/structure/media/manage/image/form-display`), so it uses the new image style I just created.  See **Fig. 2** below

![Image crop preview settings](/images/blog-images/crop-preview-img.png){.body-image .body-image--wide .body-image--left}

Fig. 2: Screenshot of Manage form display settings for images.{.caption}

<span class="callout">
<strong>NOTE</strong>: Your environment may be configured differently than mine and you may not have the same options as I do.
</span>

With the changes to the Crop preview image style, every time you crop the image you are dealing with the original image rather than an already cropped image.

## In closing

The main reason for writing about this topic is so I know what to do next time I run into this issue. I hope you find this helpful.
