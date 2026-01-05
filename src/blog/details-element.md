---
date: "2026-01-05"
title: "Native Accordions. Let HTML do the heavy lifting"
subtitle: "A native and lightweight solution for building advanced UIs without dependencies."
tags: ['front-end','coding', 'css']
draft: false
featured: true
featuredImage: "/images/heroes/details.webp"
featuredImageAlt: "Illustration of person using a laptop with coding-related graphics projected on a big screen."
imageThumb: "/images/thumbs/details-thumb.webp"
featuredImageCredit: "Microsoft Copilot"
featuredImageCreditUrl: "https://copilot.microsoft.com/"
summary: "If you haven't looked at the &lt;details&gt; element lately you may be missing out on some great features."
---

It's interesting how we often assume a tool or coding technique must be large or complex to impact our web projects. Oftentimes, the simplest, smallest solutions produce the exact outcome you are looking for. What if, before writing code or downloading a module, we took a step back to see if a native solution already exists?

You'd be surprised how many times developers skip this step, failing to realize that native HTML or CSS features can achieve results similar to advanced tools or techniques. In this post we will focus on the `<details>` HTML element to build pretty awesome accordions.

## The &lt;details&gt; and &lt;summary&gt; HTML elements

The `<details>` element, also known as the Details disclosure element, it's described as...

>...the &lt;details&gt; HTML element creates a disclosure widget in which information is visible only when the widget is toggled into an open state. A summary or label must be provided using the &lt;summary&gt; element.

HTML and CSS have come a long way in the last years, and browser support has improved rapidly. As a result, we can use native solutions to build interactive functionality that previously required JavaScript.

![Baseline status badge for details](https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility/high.png)

_The [&lt;details&gt; element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details) reached **Baseline Widely available** status in January 2020_.

### The Markup

The markup is simple, but it does require the `<summary>` element to be nested within the `<details>` tag. This structure unlocks several native browser features:

```html
<details>
  <summary>Title summary</summary>
  ...details content
</details>
```

Basic markup and nesting structure of the &lt;details&gt; and &lt;summary&gt; elements.{.caption}

Don't be fooled by the simplicity of the markup above though. The `<details>` in combination with the `<summary>` elements pack a surprising set of features. More on this shortly.

While the tags and nesting order above are required, you can still get creative with your markup if the functionality you are building requires specific markup structure. See below:

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

I have to admit, I was not aware of one or two of these features. I'm glad to learn about them.

### Attributes{.small-h3}

* `open`: This Boolean attribute indicates whether the details — that is, the contents of the `<details>` element — are currently visible. The details are shown when this attribute exists, or hidden when this attribute is absent. By default this attribute is absent.
* `name`: The name attribute specifies a group name. Modern browsers now support the `name` attribute on `<details>` elements, allowing you to create exclusive accordions (where opening one closes others) using only HTML. 🌟

### Events{.small-h3}

* `toggle`: If for some reason you need to use JavaScript, the `<details>`'s `toggle` event is available to tap into it with JavaScript.
* **Native Disclosure Widget**: By default, the `<details>` element is collapsed, showing only the content of the `<summary>`.

### Accessibility{.small-h3}

* **Accessible by Default**: The structure is recognized by screen readers as a disclosure widget, and it is natively keyboard-accessible using the Enter or Space keys.
* **Focusable**: By default the `<details>` element is focusable when navigating with keyboard or assistive technologies. It's smart enough that if its details contain focusable content (i.e. links, buttons, etc.), it automaically navigates those elements by simply continuing to press the Tab key.

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

{% raw %}
<p class="codepen" data-height="562" data-default-tab="result" data-slug-hash="jErEPoj" data-pen-title="Accordion with Details element" data-preview="true" data-user="mariohernandez" style="height: 562px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/mariohernandez/pen/jErEPoj">
  Accordion with Details element</a> by Mario Hernandez (<a href="https://codepen.io/mariohernandez">@mariohernandez</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
      </p>
      <script async src="https://public.codepenassets.com/embed/index.js"></script>
{% endraw %}

_Demo of an accordion component built with the `<details>` element and CSS_.

### Live demo

I recently implemented this very component in a [Drupal site](https://www.almd.uscourts.gov/jurors/frequently-asked-questions){target="_blank" rel="noopener noreferrer}. 🤓

## Resources

* Detail's `::details-conent` pseudo elment. [Learn more](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/::details-content){target="_blank" rel="noopener noreferrer}.
* The `<details>` element reached [Baseline Widely available](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details) in 2020.

## In closing

Even after using the `<details>` element for some time, I am still blown away by how much functionality a few lines of HTML combined with CSS can create. My advice to developers—especially those who have been coding for a while—is to revisit the basics from time to time; you'll be surprised how much things have evolved. Happy coding! 🌟
