---
date: "2026-01-06"
title: "Two Drupal core issues in responsive images you may not know you are experiencing - and how to fix them"
subtitle: "Explaining and patching two issues in Drupal core that could afect how your responsive images render."
slug: responsive-images-core-issues
series:
  slug: "responsive-images"
  order: 8
tags: ['responsive images', 'drupal']
draft: false
featured: true
featuredImage: "/images/heroes/details.webp"
featuredImageAlt: "Illustration of person using a laptop with coding-related graphics projected on a big screen."
imageThumb: "/images/thumbs/details-thumb.webp"
featuredImageCredit: "Microsoft Copilot"
featuredImageCreditUrl: "https://copilot.microsoft.com/"
summary: "I have identified two bugs in Drupal core's responsive_image which create big problems when rendering images."
---

In early 2025 I was faced with an odd issue with images which I originally ignored thinking it was something I was doing wrong when configuring responsive images for one of my projects. I was a little confused because I have worked with Drupal's responsive images for a while, I have given several talks on the topic, and as you can see, I have written about it extensively, and yet, this was an issue I had not ran into in the past.

It became clear this was not a misconfiguration on my part when I ran into the same issue in a separate project.

**The issue (TLDR)**: _Images render using the fallback image dimensions rather than the image selected by the browser_.

**Full version**: Starting with Drupal 10.4, while configuring responsive images for a Drupal project, I noticed the images were rendering smaller than they should which was a big problem. After experiencing the same issue in a second project, I began researching and ran across this Drupal issue **INSERT ORIGINAL FALLBACK ISSUE HERE (NOT MY OWN)**.

It turned out a recent "improvement" to responsive images was to force your image to use the dimensions of the fallback image. The logic behind this change was to prevent content-shifting during the page load. If the browser does not know at what size an image should render, content would shift on the page until the right image dimensions have been identified and added to the image's `width` and `height` attributes.

The issue above is a real issue because Drupal can't assign the right image width and height to the `<img>` tag until the page loads. I don't know the answer to solving this issue however, forcing images to always use the dimensions of the fallback image is not the solution. In fact, doing this defeats the entire purpose of responsive images. At its core, when using the image's `srcset` and `sizes` attributes, the browser selects the best image based on several factors including screen resolution, connection speed, screen size, etc.

If you use the `<picture>` element, there is no issue because with the fallback image because `<picture>` allows us to instruct the browser as to which image to use for each breakpoint.

## The patch

The clue for me was the original drupal issue where the functionality to use the fallback image's width and height was set. My solution in the way of a patch was to undo that functionality and go back to the original way things were.

I created [issue:3516726](https://www.drupal.org/project/drupal/issues/3516726) where I added a simple patch.

## Wait, there is more

Would you believe it that as soon as I created the patch above I identified a second responsive images bug? That's right!
Let's do this again.

**Second issue (TLDR)**: _Drupal assigns the width and height of the last image in the list of image styles within the responsive images configuration_.

**Full version**: In reality, this new bug is no different than the first one -- it forces the width and height of an arbitrary image rather than the one selected by the browser.

The intentions are still good but I don't think this is how to go about addressing the core issue; provide the correct width and height to the render image to avoid content shifting and also address an accessibility issue.

When configuring responsive images using the image's `srcset` and `sizes` attribute rather than the `<picture>` element, you want to provide multiple images sources as well as a dimension for how big or how small the image should render. With this data at hand, the browser makes an smart decision of selecting the best image for the job based on several factors including screen resolution, connection speed, screen size, etc.

The problem I identified this time is that Drupal selects the last image style in the list of sources you have provided regardless of whether the image style meets the configuration criteria you have defined. Again, this defeats the entire purpose of responsive images as it did in the first issue.

## The second patch

Just like before, I filed [Issue:3523451](https://www.drupal.org/project/drupal/issues/3523451) which effectively updates Drupal's logic and rather than prescribe a specific image style based on its location in the list of sources, it identifies the best image candidate.

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
