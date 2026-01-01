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

Who knew a little H TML element could pack so many ...

### What does all this mean?

Knowing all the features available in the details element opens up all kind of posibilities for the astetics and behavior we want to achive for the accordion. Using modern CSS allows us to not only style the accordion any way we wish, but using newly supported transition rules we can achieve a smooth open/close transition only possible with JavaScript in the past. Let's take a look at how we can build a truly beautiful and animated accordion.

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

## In closing

It's an exciting time in web development and although there is a lot of uncertainty about AI, there are areas that are relatively safe to experiment with while still being cautious for unexpected results. Happy Coding! 🤖
