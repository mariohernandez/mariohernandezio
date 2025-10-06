---
date: "2025-09-28"
title: "Code reviews using AI"
subtitle: "My personal experience experimenting with AI tools for code reviews. This is only a preliminary take on AI tools but I see a lot of potential for improving my craft."
slug: code-reviews-using-ai
tags: ['coding', 'ai']
draft: false
featured: false
featuredImage: "/images/heroes/ai.webp"
featuredImageAlt: "Illustration of person using a laptop with coding-related graphics around him."
imageThumb: "/images/thumbs/ai.webp"
featuredImageCredit: "Microsoft Copilot"
featuredImageCreditUrl: "https://copilot.microsoft.com/"
summary: "If you're skeptical about AI tools for code reviews, you might be pleasantly surprised. There are reasons to get excited about them."
---
Peer code reviews are a cornerstone of any successful web development team. I've always thought of peer code review as a way to learn from others. How many times while reviewing someone else's code have you thought to yourself: "_I didn't know you could do that!_", or, "_That's a nice trick, I'll try it next time!_".

_Disclaimer_: This blog post was inspired by a post by [Lullabot](https://www.lullabot.com/articles/how-automated-code-review-tools-reduce-pull-request-bottlenecks){target="_blank" rel="noopener noreferrer"} about AI and code reviews. My take however, is different as I share my personal experience with these tools.

## Why Use AI to Review Your Code?

Automating tasks to boost productivity and efficiency is nothing new in web development. We already rely on tools to lint, format, and test our code. AI-powered code reviews add another layer of scrutiny, helping improve code quality by catching issues that might slip through the cracks during manual review.

When working on personal projects as a solo developer, AI becomes an invaluable second set of eyes offering feedback I wouldn’t otherwise receive. For personal use, many AI tools offer a free tier plan that may lack the advanced bells and whistles, but provides a basic level of functionality that could still be helpful.

## Should AI Replace Peer Code Reviews?

No. While AI can be incredibly helpful, it lacks the full context behind your code decisions. Sometimes, code needs to be written a certain way due to business logic, legacy constraints, or specific architecture choices. AI might flag these as issues, whereas a peer reviewer—familiar with the context—can validate the approach and focus in ensuring your code doesn’t introduce regressions.

## Which AI Tool Is Best for Code Reviews?

Short answer: The one that works best for you.

Choosing an AI tool is like selecting a framework or plugin, it depends on your workflow, preferences, and project needs. The best approach is to try a few and see which one delivers the most value and best user experience. Recently I have tried [GitHub Copilot](https://github.com/resources/articles/software-development){target="_blank" rel="noopener noreferrer"}, [Google Gemini Code Assistant](https://codeassist.google/){target="_blank" rel="noopener noreferrer"}, and [CodeRabbit](https://www.coderabbit.ai/){target="_blank" rel="noopener noreferrer"}.

In most cases, the decision of selecting one tool boils down to cost and your specific environment. The good thing is that these tools are relatively easy to integrate and test before deciding on the one you feel works the best for you.

## Should You Trust AI to Make the Right Choices?

It’s wise to remain skeptical of any code changes or recommendations made by AI. But the beauty of code is that it either works or it doesn’t. Testing and validating AI-suggested changes against your standards is the best way to determine their effectiveness.

## My Experience with AI Code Review Tools

I use GitHub Copilot within my IDE (VS Code), and it has been helpful at times when I needed a hand with code validation or bugs. I like it because is directly integrated with my editor and the feedback it provides is in context with the code as I write it.
I briefly tried CodeRabbit, but I don’t think I gave it a fair shot—planning to revisit it soon. The tool I’ve recently enjoyed using is Google Gemini Code Assistant (yes, it’s a mouthful).

The integration with my personal GitHub repo was straightforward—I was up and running in minutes. It reviews my code when I create a PR and provides a very detailed summary of the changes I'm introducing along with excellent recommendations for improvements or fixes.

## A Real-World Example

I created a pull request with legacy Twig code that clearly needed improvement. Here's what the code does:

1. It embeds images using a media component which provides a set of image dimensions options for editors to choose.
1. Based on the user-selected option, a CSS class is passed through Drupal’s attributes (e.g., medium-landscape, small-portrait).
1. Each CSS class is mapped to a Media view mode which in turn is configured with s specific image style.
1 It provides a default view mode if no size is selected.
1. Displays a validation message if no image is added to the component.

While the code was relatively simple, the AI helped me refactor it into something cleaner, more efficient, and easier to maintain. I'll use this technique again whenever I get the chance.

### Original code

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

### Final code

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

{# Using the twig_tweak module to set the media entity as the value of `image`. #}
{% set image = drupal_entity('media', mid, view_mode) %}

{% if image %}
  <figure class="image-embed{{ attributes ? ' ' ~ attributes.class }}"
    {{ attributes ? attributes|without('class') }}>
    {{ image }}
  </figure>
{% else %}
  <div class="image-embed{{ attributes ? ' ' ~ attributes.class }}"
    {{ attributes ? attributes|without('class') }}>
    <div class="image-embed__empty">
      <span>No media exists, please update or delete this component.</span>
    </div>
  </div>
{% endif %}
```

{% endraw %}

Again, the code is pretty trivial and this is not a ground-breaking situation, but the potential for improving my code using a system like this is definitely a bonus even when working alone in a projects.

## In closing

It's an exciting time in web development and although there is a lot of uncertainty about AI, there are areas that are relatively safe to experiment with while still being cautious for unexpected results. Happy Coding! 🤖
