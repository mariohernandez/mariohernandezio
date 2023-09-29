---
date: "2023-09-27"
title: "Drupal base path"
tags: ['drupal','twig']
draft: false
featured: true
featuredImage: "/images/paths.jpg"
featuredImageAlt: "Person confronted with two paths to choose from"
featuredImageCredit: "Caleb Jones"
featuredImageCreditUrl: "https://unsplash.com/@gcalebjones"
summary: "There are times when building a Drupal site you need to dynamically point to an asset or resource that may not be saved in the database but instead is located somewhere in the site's file system."
---
Recently I was building a component that required a static image which was not stored in the database but instead needed to be stored somewhere in the file system of the site.  There are several ways for serving a static image for example we could have stored the image in the `{% raw %}sites/default/files/images/{% endraw %}` directory.  A very common approach which in many cases would work just fine, however, in my case I was building a component and I wanted for the component image to be located within the same component's directory.  This makes sense because if I wanted to reuse or share this component, all component assets would be included in a single directory.

## Requirements

My goal with this task was to dynamically point to the image regardless the site this component was running on.  Oh yeah, we are running a multi-site architecture with hundreds of sites and a single code base.  So this component needed to work in all of these hundreds of sites.  Now the challenge seems a little more... "challenging".

## ¡Manos a la hobra'!'

I started by doing research to determine the best way possible to achieve this.  I read about using a pre-process function that would generate a dynamic base path of the site but I was hoping I could keep things simple and do everything on the front-end with only Twig. This would make it a more appealing approach for front-end developers.

After some research, I came across two little gems that became game-chargers for my project.  One of these gems is the `{% raw %}{{ url('<front>') }}{% endraw %}` Twig function.  This will provide the current site's homepage/base path. The other very handy Twig function is `{% raw %}{{ active_theme_path() }}{% endraw %}` which prints the path of the current active theme (`{% raw %}themes/custom/my_theme{% endraw %}`). While researching for this task, I also found you can use the `{% raw %}{{ directory }}{% endraw %}` Twig variable in your theme's templates to print the active theme's path.  A word of coution when using either the `{% raw %}{{ active_theme_path() }}{% endraw %}` function of the `{% raw %}{{ directory }}{% endraw %}` variable as these could have different results depending on your whether you are using them in a base or sub theme.  Here's a [drupal.org issue](https://www.drupal.org/project/drupal/issues/3049414) that discusses this in more detail.
Armed with these two little functions, and one Twig variable, we can now work in generating a dynamic path to our theme's directory where the static image for our component is located.  So this may seem like a simple thing but remember, our component's image should work regardless of the site the component is used on within our multi-site architecture.  Some sites even use a different sub-theme but the parent theme is always the same which is where our image is stored.

## Building the dynamic path

Before we can use the first function we need to run it through the `{% raw %}|render{% endraw %}` Twig filter.  Since Twig will return an array from the `{% raw %}{{ url() }}{% endraw %}` function, we need to convert it to a string because we need the value of the function. Let's take a look:

{% raw %}

```php
{{ url('<front>')|render }} # This will give us http://my-site.com/
```

{% endraw %}

Next let's work with the theme path function. Similarly to the function above, we will use the `{% raw %}|render{% endraw %}` Twig filter to convert it from an array to a string.

{% raw %}

```php
{{ active_theme_path()|render }} # This will give us themes/custom/my-theme
```

{% endraw %}

Now that we have two strings we can joint them together to compose the full path to our image:

{% raw %}

```php
<img src="{{ url('<front>')|render }}{{ active_theme_path()|render }}/images/image.jpg" alt="alt text" />
```

{% endraw %}

If we want to get fancy we could actually set a variable to shorten things a bit:

{% raw %}

```php
{% set theme_url = url('<front>')|render ~ active_theme_path()|render %}
<img src="{{ theme_url ~ '/images/image.jpg' }}" alt="alt text" />
```

{% endraw %}

And there you have it.  A dynamic path that will work on any of our sites.

I realized some people reading this already knew all of this but I didn't.  So I figured I would share it because I bet there are others out there that also do not know about the `{% raw %}{{ url('<front>') }}{% endraw %}` or `{% raw %}{{ active_theme_path() }}{% endraw %}` Twig functions as well as the `{% raw %}{{ directory }}{% endraw %}` variable.  As I said before, there are many ways to handle this challenge, but in my case this is exactly how I wanted to approachh it.  I hope this was helpful.  Cheers!
