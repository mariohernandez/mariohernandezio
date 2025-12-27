---
date: "2025-12-28"
title: "A semantic, responsive, and accessible accordion component"
subtitle: "A native and lightweight solution for building a pretty common component, the accordion."
slug: 2025-favorite-front-end-tips-tricks
tags: ['front-end','coding', 'css']
draft: false
featured: true
featuredImage: "/images/heroes/ai.webp"
featuredImageAlt: "Illustration of person using a laptop with coding-related graphics around him."
imageThumb: "/images/thumbs/ai.webp"
featuredImageCredit: "Microsoft Copilot"
featuredImageCreditUrl: "https://copilot.microsoft.com/"
summary: "As 2025 comes to an end, I'd like to share of the tips and tricks that not only made me a better developer, but resulted on better UX, performance, and accessibility in my projects."
---
It's interesting how sometimes we think that for something to make an impact in our web projects it has to be big or complex. Sometimes the simplest, smaller solutions can produce significant benefits. I am a big believer of starting with the basics and native tools and techniques before looking into third party solutions. You'd be surprised how many times developers skip this step and don't realize native solutions in HTML or CSS can achieve similar results as advanced tools or techniques.

This principle of starting lean with native solutions not only applies to the tools you end up using, but also how you write the first line of code in your project.

Lately I've been working on a big rebrand project which introduced new color palettes as well as new components. As I started building new components sometimes it was tempting to add text color, spacing, background color, etc. from the start. I'm sure many of us have fallen into that trap. I call it a trap because if I stand back and stop myself from writing any styles and let the component render at its most basic state, often times I would find that many of the attributes of the component would already be available simply by writing the right markup and let the component automatically adhere to the project's base styles such as text color, background colors, font size, spacing, etc.

Had I followed my original instict to start styling the component right from the start, I would had most likely write duplicate rules that I would also had to override only to end up at the same place I started before any styles were written.

## The accordion

We have all seen them. Accordions are ideal for presenting content in a compact way while allow you to show additional content only when needed. A good example of this content are Frequently Asked Questions (FAQ).

The same way I used to approach styling a component, the first thing I would typically do when it was time to build an accordion-like component in Drupal was to download and enable either the [FAQ](https://www.drupal.org/project/faq) or [FAQ field](https://www.drupal.org/project/faq) Drupal modules. Both modules are great depending on your desired functionality. The issue with this approach is that I will end up with multiple dependencies such as a Drupal module, JavaScript or JQuery, and lots of CSS I didn't write.

### The &lt;details&gt; and &lt;summary&gt; HTML elements

HTML and CSS have come a long way in the last 5-10 years and the browser support has improved rapidly. Thanks to this we can now use native solutions to build interactive functionality. The `<details>` HTML element is a perfect example of how far we've come.

### The Markup

```html
<details>
  <summary>Ttitle summary</summary>
  ...details content
</details>
```

Don't be fooled by the simplicity of the markup above. The `<details>` element is full of surprises and goodies. Let's go over a few of them:

- **Baseline Widely available**: The `<details>` and `<summary>` elements have been fully supported in modern browsers since January 2020.
- **Semantic out of the box**: SEO and accessibility friendly.
- **Accessible by default**: Fully functional with assistive technologies and keyboard-navigational out of the box.
- **Responsive by default**: It naturally adapts to device's viewport width.
- **Interactive**: When the details content is visible, an attribute of `open` is enabled in the `<details>` element. This makes it possible to style or animate the element based on its state.
- **Searchable by default**: If you do a page search (`Cmd + F` or `Ctrl + F`), if a match is found within a details element, the element will automatically open to show your results. 🤯 (Test it below)

{% raw %}
<details>
  <summary>The title of a basic/native accordion</summary>
  <p>Go ahead and do a page search using any of the keywords in this details content and if a match is found the details will automatically open.</p>
</details>
{% endraw %}


## AI

### Code reviews

### Code agents

## HTML

### Details element

## CSS

### Responsive videos

### Owl selector

### Subgrid

## Accessibility

### Aria attributes

## Details HTML element

Do you ever build accordions for things like FAQs or other content that benefit from splitting it into different tabs or hidden containers?
In the past while working in Drupal projects my first instinct has beeen to use a contrib module like [FAQ](https://www.drupal.org/project/faq), or [FAQ_field](https://www.drupal.org/project/faq). These are two great modules, but before adding yet another dependency to your project, consider using a lighter approach by simply using an HTML element and some css. No JavaScript needed.

Take a look at this demo and then let's review the code that it took to build it.

**The HTML**

```html
<details>
  <summary>Sed posuere consectetur est at lobortis.</summary>
  <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Sed posuere consectetur est at lobortis.</p>
</details>
```

**The CSS**

```css
details {
  background: #ffffff;
  font-size: 1rem;
  inline-size: 100%;
  max-inline-size: 640px;

  &:hover {
    cursor: pointer;
  }

  &::details-content {
    line-height: 1.5;
  }
}

summary {
  padding: var(--details-padding);
}
```

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
