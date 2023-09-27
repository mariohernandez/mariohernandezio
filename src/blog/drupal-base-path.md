---
date: "2023-09-27"
title: "Using Drupal's base path and theme path variables in your theme"
tags: ['drupal']
draft: false
featured: true
featuredImage: '/images/paths.jpg'
featuredImageAlt: 'Person confronted with two paths to choose from'
featuredImageCredit: 'Caleb Jones'
featuredImageCreditUrl: 'https://unsplash.com/@gcalebjones'
summary: 'There are times when building a Drupal site you need to dynamically point to an asset or resource that may not be saved in the database but instead is located somewhere in the site's file system...
---

Recently I was building a component that required a static image which was not stored in the database but instead needed to be stored somewhere in the file system of the site.  There are several ways for serving a static image for example we could have stored the image in the `sites/default/files/images/` directory.  A very common approach which in many cases would work just fine, however, in my case I was building a component and I wanted for the component image to be located within the same component's directory.  This makes sense because if I wanted to reuse or share this component, all component assets would be included in a single directory.

and then reference it using Twig's handy `{{ file_url('public://image.jpg') }}` statement

My goal with this task was to dynamically point to the image regardless the site this component was running on.  Did I forget to mention we are running a multi-site architecture with hundreds of sites and a single code base? yeah, so this component needed to work in all of these hundreds of sites.  Now the challenge seems a little more... "challenging".

I started doing some research to determine the best way possible to achieve this.  I read about creating a pre-process function that would generate a dynamic path of the site's base path and also the theme's path where the image is located, but I was hoping I coudld achieve this in Twig since after all I was bulding the component in Twig.  After some research and trying different things, I ran across two little gems that were a game-charger.  In most twig templates, you can get your site's base path by using `{{ url('<front>') }}`.  This however is not good enough because if used as it was declared here, what would print on the page would be **<front>**, a string.  Before we can make use of the actual outcome of the statement above, we needed to render it so we can obtain the actual value of the homepage/base path.  So the statement above needed to change to `{{ url('<front>')|render }}`. Now the output of the statement will actuall be our site's base path (`http://my-site.com/`).  Don't underestimate the trailing slash ("/") because that makes things easier when creating a path.

So the first part is done, now we need to find a way to dynamically create a path to our theme.  Some may think, well, how about `/themes/custom/theme-name`?  Sure.  As long as all the sites are using the same theme.  In my case they are not.  So our theme path needs to work regardless of the theme each site is using.  Back to research and trying things.  This is when I found a little variable I never knew about in my over 15 years as a Drupal Front-end developer.  The `{{ directory }}` variable in a Twig template within your theme will output ... the current's theme path.  How cool is that?

So now with these two weapons in hand, I could actually compose a dynamic path to my theme by concatenating the two Twig statements above like this: `{{ url('<front>')|render ~ directory ~ '/images/my-image.jpg' }}`.  Now no matter the site or the theme in the site, we have a dynamic path to our component's image.

I realized some people reading this already knew all of this but I didn't.  So I figured I would share it because I bet there are others out there that also do not know about the `{{ url('<front>') }}` or `{{ directory }}` Twig statements statements.  As I said before, there are many ways in which this challenged could be addressed, but in my case this is exactly how I wanted to approachh it.  I hope</front>)`
