---
date: "2025-09-15"
title: "Code reviews using AI"
slug: code-reviews-using-ai
tags: ['ai', 'coding']
draft: false
featured: true
featuredImage: "/images/heroes/ai.webp"
featuredImageAlt: "Illustration of person using a laptop with coding-related graphics around him."
imageThumb: "/images/thumbs/ai.webp"
featuredImageCredit: "Microsoft Copilot"
featuredImageCreditUrl: "https://copilot.microsoft.com/"
summary: "I've always thought of peer code review as a way to learn from others. Now you can use AI to not only review your code but also learn how your code can be improved."
---
Peer code reviews are a critical part of any web development team. Not only do they validate the the quality and integrity of your code, but they are a great learning and teaching tool.

## Why should I use AI to reviw my code?

The concept of automating tasks to be more productive and efficient when writing code is nothing new. We do it all the time to lint, format, and test our code. Doing code reviews through AI can provide another layer of scrutiny to improve your code's quality.

When I work on personal projects projects and I'm a one-developer team, AI is a big help to give my code a second set of eyes that otherwise I would not get.

## Should AI replace peer code reviews?

No. There are factors sometimes when your code may need to be written a specific way. AI may flag your code as needing improvements because it does not have the full context of why the code was written your way. A peer on the other hand, may be fully aware of why it needs to be done this way and can focus on ensuring your code will not create regressions of any kind.

## Which AI tool is the best for code reviews?

Short answer: The one that works for you. Choosing an AI tool is no different than selecting a framework for your project or the plugin/packages you need to get the job done. The best thing to do is to test the tools you are aware of and see for yourself which provides the most value and provide the best experience.

Some of the tools I've used in the past few months include:

* [GitHub Copilot](https://github.com/resources/articles/software-development)
* [Google Gemini Code Assistant](https://codeassist.google/)
* [CodeRabbit](https://www.coderabbit.ai/)

## Should I trust AI to make the right choices?

I think you should still be skeptical about any code changes or recommendations by AI, but the thing about code is that either works or it doesn't. Testing and confirming the proposed updates work and follow standards is a good way to determine if AI is providing the right solutions.

## My experience with AI

I have used GitHub Copilot within my IDE and so far I have gotten mixed results. I tried CodeRabbit for a bit but I don't believe I gave it a fair chance and will probably try it again. The one I continue to be pleased with is Google Gemini Code Assistance (a mouth full).
The integration with my Github personal repo was pretty straight forward and I was up and running in minutes.

I created a demo PR with legacy Twig code which honestly could be improved just by looking at it, but you know how it goes. The code does the following:

* Uses a media embed component for embedding images on pages with specific aspect ratio and dimensions.
* In the component's Twig, we check whether a specific CSS class exists in Drupal's attributes. The class is passed from the image size options provided to editos (i.e. Medium Landscape = `medium-landscape`, Small Portrait = `small-portrait`, etc.).
* Based on the CSS class, we set a variable to render a media entity (image) using a preconfigured media view mode which is associated with the proper image style or responsive image style.
* We also provide a default media view mode if the editor does not make a image size selection.
* Finally, if the editor fails to add an image, a validation message is presented (the image may not always be required).

This is the original code and although it is a pretty simple example, the point is that I learned something new that makes my code more efficient, cleaner, and easier to maintain.

{% raw %}

```php
{% if mid %}
  {% if 'small-portrait' in attributes.class %}
    {% set image %}
      {{ drupal_entity('media', mid, 'small_portrait') }}
    {% endset %}
  {% elseif 'small-rectangular' in attributes.class %}
    {% set image %}
      {{ drupal_entity('media', mid, 'small_rectangular') }}
    {% endset %}
  {% elseif 'small-rectangular-tall' in attributes.class %}
    {% set image %}
      {{ drupal_entity('media', mid, 'small_rectangular_tall') }}
    {% endset %}
  {% elseif 'small-square' in attributes.class %}
    {% set image %}
      {{ drupal_entity('media', mid, 'small_square') }}
    {% endset %}
  {% elseif 'medium-portrait' in attributes.class %}
    {% set image %}
      {{ drupal_entity('media', mid, 'medium_portrait') }}
    {% endset %}
  {% elseif 'medium-rectangular' in attributes.class %}
    {% set image %}
      {{ drupal_entity('media', mid, 'medium_rectangular') }}
    {% endset %}
  {% elseif 'medium-rectangular-tall' in attributes.class %}
    {% set image %}
      {{ drupal_entity('media', mid, 'medium_rectangular_tall') }}
    {% endset %}
  {% elseif 'medium-rectangular-wide' in attributes.class %}
    {% set image %}
      {{ drupal_entity('media', mid, 'medium_rectangular_wide') }}
    {% endset %}
  {% elseif 'medium-square' in attributes.class %}
    {% set image %}
      {{ drupal_entity('media', mid, 'medium_square') }}
    {% endset %}
  {% elseif 'large-rectangular' in attributes.class %}
    {% set image %}
      {{ drupal_entity('media', mid, 'large_rectangular') }}
    {% endset %}
  {% elseif 'large-rectangular-tall' in attributes.class %}
    {% set image %}
      {{ drupal_entity('media', mid, 'large_rectangular_tall') }}
    {% endset %}
  {% elseif 'large-rectangular-wide' in attributes.class %}
    {% set image %}
      {{ drupal_entity('media', mid, 'large_rectangular_wide') }}
    {% endset %}
  {% elseif 'large-square' in attributes.class %}
    {% set image %}
      {{ drupal_entity('media', mid, 'large_square') }}
    {% endset %}
  {% else %}
    {% set image %}
      {{ drupal_entity('media', mid, 'large_rectangular') }}
    {% endset %}
  {% endif %}

  <figure class="image-embed{{- attributes ? ' ' ~ attributes.class -}}" {{- attributes ? attributes|without(class) -}}>
    {{ image }}
  </figure>
{% else %}
  <div class="image-embed{{- attributes ? ' ' ~ attributes.class -}}" {{- attributes ? attributes|without(class) -}}>
    <span>No media exists, please update or delete this component.</span>
  </div>
{% endif %}
```

{% endraw %}

After creating a PR which included the code above, Gemini Code Assistant recommended an update to the logic by using a cleaner and concised approach. Take a look:

{% raw %}

```php
{# A twig map to centralize the mapping of view_modes based on CSS classes. #}
{% set view_mode_map = {
  'small-landscape': 'small_landscape',
  'small-landscape-wide': 'small_landscape_wide',
  'small-portrait': 'small_portrait',
  'small-square': 'small_square',
  'medium-landscape': 'medium_landscape',
  'medium-landscape-wide': 'medium_landscape_wide',
  'medium-portrait': 'medium_portrait',
  'medium-square': 'medium_square',
  'large-landscape': 'large_landscape',
  'large-landscape-wide': 'large_landscape_wide',
  'large-portrait': 'large_portrait',
  'large-square': 'large_square'
} %}

{% set view_mode = 'medium_landscape' %} {# Default view mode #}

{% for class, mode in view_mode_map %}
  {% if class in attributes.class %}
    {% set view_mode = mode %}
  {% endif %}
{% endfor %}

{% set image = drupal_entity('media', mid, view_mode) %}

{% if image %}
  <figure class="{{ classes }}" {{ attributes ? attributes|without('class') }}>
    {{ image }}
  </figure>
{% else %}
  <div class="{{ classes }}" {{ attributes ? attributes|without('class') }}>
    <span>No media exists, please update or delete this component.</span>
  </div>
{% endif %}
```

{% endraw %}

Again, the code is pretty trivial and this is not a ground-breaking situation, but the potential for improving my code using a system like this is definitely reasurring even when working on a silo in personal projects.

## In closing

It's an exciting time in web development and although there is a lot of uncertainty about AI, there are areas that are relatively safe to experiment with while still being cautious for unexpected results.

### Resources

* [GitHub Copilot](https://github.com/resources/articles/software-development)
* [Google Gemini Code Assistant](https://codeassist.google/)
* [CodeRabbit](https://www.coderabbit.ai/)
* [Lullabot's post on automated code reviews](https://www.lullabot.com/articles/how-automated-code-review-tools-reduce-pull-request-bottlenecks)
