---
date: "2026-01-06"
title: "Native Accordions. Let HTML do the heavy lifting"
subtitle: "A native and lightweight solution for building advanced UIs without dependencies."
tags: ['html','coding', 'css']
draft: false
featured: true
featuredImage: "/images/heroes/details.webp"
featuredImageAlt: "Illustration of person using a laptop with coding-related graphics projected on a big screen."
imageThumb: "/images/thumbs/details-thumb.webp"
featuredImageCredit: "Microsoft Copilot"
featuredImageCreditUrl: "https://copilot.microsoft.com/"
summary: "If you haven't looked at the &lt;details&gt; element lately you may be missing out on some great features."
---

We often assume a tool or coding technique must be complex to be impactful, yet oftentimes, the most elegant solutions are the simplest. Before writing custom code or installing a new module, we should investigate if a native browser solution already exists. Developers often overlook this step, missing the fact that native HTML and CSS can frequently replicate the functionality of advanced third-party libraries with far less overhead.

This post explores the power of the native `<details>` element. By returning to these fundamental building blocks, you can create accessible, high-performance accordions without the weight of unnecessary dependencies.

## The &lt;details&gt; and &lt;summary&gt; HTML elements

The `<details>` element, also known as the Details disclosure element, it's described as...

>...an HTML element which creates a disclosure widget in which information is visible only when the widget is toggled into an open state. A summary or label must be provided using the &lt;summary&gt; element.

HTML and CSS have come a long way in the last years, and browser support has improved rapidly. As a result, we can use native solutions to build interactive functionality that previously required JavaScript.

Details is widely supported by all major browsers since January 2020.
{% baseline 'details' %}

### The Markup

The markup is simple, but it does require the `<summary>` element to be nested within the `<details>` tag. But don't be fooled by the simplicity of the markup, the `<details>` combined with the `<summary>` elements pack a surprising set of features. More on this shortly.

```html
<details>
  <summary>Title summary</summary>
  ...details content
</details>
```

Standard markup and nesting structure of the &lt;details&gt; and &lt;summary&gt; elements.{.caption}

While the markup structure above is required, you can still get creative with the markup should the thing you are building has specific markup requirements. See below:

```html
<details class="accordion" name="demo">
  <summary>
    <h3 class="accordion__title">Cras justo odio, dapibus ac facilisis in</h3>
  </summary>
  <p class="accordion__content">
    Cras mattis <a href="#">consectetur purus</a> sit amet fermentum. Nullam id dolor id nibh ultricies vehicula ut id elit. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
  <span class="accordion__footer">Learn more <a href="#">about this topic</a></span>
</details>
```

A more elaborate example of the &lt;details&gt; and &lt;summary&gt; elements using custom markup while adhering to standards.{.caption}

## Notable &lt;details&gt; features

### Attributes{.small-h3}

* `open`: This Boolean attribute indicates whether the details — that is, the contents of the `<details>` element — are currently visible. The details are shown when this attribute exists, or hidden when this attribute is absent. By default this attribute is absent.
* `name`: The name attribute specifies a group name. Modern browsers now support the `name` attribute on `<details>` elements, allowing you to create exclusive accordions (where opening one closes others) using only HTML. 🌟

### Events{.small-h3}

* `toggle`: If for some reason you need to use JavaScript, the `<details>`'s `toggle` event is available to tap into it with JavaScript.

### Accessibility{.small-h3}

* **Accessible by Default**: The structure is recognized by screen readers as a disclosure widget, and it is natively keyboard-accessible using the Enter or Space keys.
* **Focusable**: By default the `<details>` element is focusable when navigating with keyboard or assistive technologies. It's smart enough that if its details contain focusable content (i.e. links, buttons, etc.), it automatically navigates those elements by simply continuing to press the Tab key.
* **Native Disclosure Widget**: By default, the `<details>` element is collapsed, showing only the content of the `<summary>`.

### Other{.small-h3}

* **Semantic** in nature for improved SEO.
* **Responsive** out of the box. No CSS needed.
* **State-Based Styling**: The presence or absence of the `open` attribute allows you to easily apply different CSS styles for the expanded and collapsed states.
* **Built-in Interactivity**: Clicking or touching on the `<summary>` automatically toggles the `<details>` element's open state, revealing or hiding the nested content without any JavaScript.
* **Page-searchable** by default. If you do a page search by pressing `Cmd + F` or `Ctrl + F` in your keyboard, and if a match is found within a `<details>` element, the `<details>` will automatically open to show the highlighted results. 🤯

#### Try page search below

<div class="callout">

{% raw %}
<details>
  <summary>Click me or press on me</summary>
  <p>Go ahead, close the details first and then do a page search for the word <strong>"beautiful"</strong>. Watch the details element automatically open when the keyword is found.</p>
</details>
{% endraw %}
</div>

## What does this all mean?

Learning about the features available in the `<details>` element opens up all kinds of possibilities for the aesthetics and behavior we want to achieve with the accordion.

### Codepen Demo

With a little CSS and no JavaScript, we end up with an accordion that adheres to web and accessibility standards while providing a smooth animation effect that previously required JavaScript. Run the CodePen below for an example.

<!-- Embedding a codepen. -->
{% codepen "https://codepen.io/mariohernandez/pen/jErEPoj" %}

_Demo of an accordion component built with the `<details>` element and CSS_.

### Live demo

I recently implemented this very component in a [Drupal site](https://www.almd.uscourts.gov/jurors/frequently-asked-questions){target="_blank" rel="noopener noreferrer}. 🤓

## Resources

* Learn more about the `::details-content` [pseudo-element](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::details-content){target="_blank" rel="noopener noreferrer}.
* The `<details>` element reached [Baseline Widely available](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details) in 2020.

## In closing

Even after using the `<details>` element for some time, I am still blown away by how much functionality a few lines of HTML combined with CSS can create. My advice to developers—especially those who have been coding for a while—is to revisit the basics from time to time; you'll be surprised how much things have evolved. Happy coding! 🌟
