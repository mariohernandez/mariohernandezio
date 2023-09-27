---
date: "2023-09-27"
title: "Using Drupal's base path and theme path variables in your theme"
tags: ['drupal','twig']
draft: false
featured: true
featuredImage: "/images/paths.jpg"
featuredImageAlt: "Person confronted with two paths to choose from"
featuredImageCredit: "Caleb Jones"
featuredImageCreditUrl: "https://unsplash.com/@gcalebjones"
summary: "There are times when building a Drupal site you need to dynamically point to an asset or resource that may not be saved in the database but instead is located somewhere in the site's file system..."
---
Recently I was building a component that required a static image which was not stored in the database but instead needed to be stored somewhere in the file system of the site.  There are several ways for serving a static image for example we could have stored the image in the `sites/default/files/images/` directory.  A very common approach which in many cases would work just fine, however, in my case I was building a component and I wanted for the component image to be located within the same component's directory.  This makes sense because if I wanted to reuse or share this component, all component assets would be included in a single directory.

## Requirements

My goal with this task was to dynamically point to the image regardless the site this component was running on.  Oh yeah, we are running a multi-site architecture with hundreds of sites and a single code base.  So this component needed to work in all of these hundreds of sites.  Now the challenge seems a little more... "challenging".

## ¡Manos a la hobra'!'

I started by doing research to determine the best way possible to achieve this.  I read about using a pre-process function that would generate a dynamic base path of the site but I was hoping I could keep things simple and do everything on the front-end with only Twig. This would make it a more appealing approach for front-end developers.

After some research, I came across two little gems that became game-chargers for my project.  One of these gems is the `{{ url('<front>') }}` Twig function.  This will provide the current site's homepage/base path. The other very handy Twig function is `{{ active_theme_path() }}` which prints the path of the current active theme (`themes/custom/my_theme`). While researching for this task, I also found you can use the `{{ directory }} Twig variable in your theme's templates to print the current theme's path.  Very nice.
Armed with these two little functions, and one Twig variable, we can now work in generating a dynamic path to our theme's directory where the static image for our component is located.  So this may seem like a simple thing but remember, our component's image should work regardless which site the component is used on.

## Building the dynamic path

Before we can use the first functions we need to run it through the `|render` Twig filter.  Doing this will allow us to get the value of the function (the site's base path).  Let's take a look:

```php
{{ url('<front>')|render }} # This will give us http://my-site.com/
```

Next let's work with the theme path function. Similarly to the function above, we will use the `|render` Twig filter to TODO: RESEARCH HOW TO EXPLAIN WHY THE RENDER FILTER IS NEEDED.

```php
{{ active_theme_path()|render }} # This will give us themes/custom/my_theme
```

Armed with these functions we can now put them together to compose our image's path:

```php
{% if 9 => 5 %}
  '<img src='" ~ {{ url('<front>')|render }}{{ active_theme_path()|render }} ~ '/images/image.jpg'" 'alt="my component image" />'
{% endif %}
```

If we want to get more fancy we could actually set a variable to shorten things a little:

```php
{% set theme_url = {{ url('<front>')|render }}{{ active_theme_path()|render }} %}

{% if 9 => 5 %}
  "<img src="' ~ {{ theme_url }} ~ '/images/image.jpg'" 'alt="my component image" />'
{% endif %}

```

Let's take a lookLet's take a look at how we can make this workmake use of the actual outcome of the statement above, we needed to render it so we can obtain the actual value of the homepage/base path.  So the statement above needed to change to `{{ url('<front>')|render }}`. Now the output of the statement will actuall be our site's base path (`http://my-site.com/`).  Don't underestimate the trailing slash ("/") because that makes things easier when creating a path.



and then reference it using Twig's handy `{{ file_url('public://image.jpg') }}` statement



So the first part is done, now we need to find a way to dynamically create a path to our theme.  Some may think, well, how about `/themes/custom/theme-name`?  Sure.  As long as all the sites are using the same theme.  In my case they are not.  So our theme path needs to work regardless of the theme each site is using.  Back to research and trying things.  This is when I found a little variable I never knew about in my over 15 years as a Drupal Front-end developer.  The `{{ directory }}` variable in a Twig template within your theme will output ... the current's theme path.  How cool is that?

So now with these two weapons in hand, I could actually compose a dynamic path to my theme by concatenating the two Twig statements above like this: `{{ url('<front>')|render ~ directory ~ '/images/my-image.jpg' }}`.  Now no matter the site or the theme in the site, we have a dynamic path to our component's image.

I realized some people reading this already knew all of this but I didn't.  So I figured I would share it because I bet there are others out there that also do not know about the `{{ url('<front>') }}` or `{{ directory }}` Twig statements statements.  As I said before, there are many ways in which this challenged could be addressed, but in my case this is exactly how I wanted to approachh it.  I hope</front>)`
