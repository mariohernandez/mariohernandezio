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

In early 2025 I noticed an odd behavior with how responsive images were rendering. This was a Drupal 10.4 site and the configuration I set was being ignored causing images to render smaller than expected.

I am not an expert about responsive images, but I have been working with them for many years. I have conducted training workshops and talks about them and have even written a 7-part blog series about responsive images. My point is, in all these years, I had never encountered this issue.

**Info**: The issues described in this post do not affect the `<picture>` element. They are only present when using the `srcset` & `sizes` attributes of the `<img>` tag.{.callout}

After some debuggin and testing, I noticed the image rendering issue was directly related to the fallback image style used in the responsive images UI. Drupal by default sets the images's `width` and `height` attributes with that of the fallback image style. Unfortunately the result is nothing short of "wrong". See below.

![Comparison screenshot of small rendered image and large loaded image](/images/blog-images/fallback.webp){.body-image}

Rendering image at 325 x 217px (fallback image dimensions), but loading the image at 2600 x 1733px.{.caption}

Additional research led me to [this Drupal.org issue](https://www.drupal.org/node/3377420){target="_blank" rel="noopener noreferrer} which seems to be where things may have changed and resulted on the bug above. After reading through the comments in the issue page [other issues](https://www.drupal.org/project/drupal/issues/3359421){target="_blank" rel="noopener noreferrer} are referenced which are even older than `#3377420`, and go back to Drupal 10.1. On either case, I see the main reason for the new changes was to address a well-known issue when loading images, **Cumulative Layout Shift**.

## Cumulative Layout Shift

Cumulative Layout Shift, or CLS[^1], has been a problem for many years when rendering images or other media content. CLS refers to the shifting of layouts or content as pages with images load. If your Drupal site is rendering images small and then "jumping" to full size, your real-world users are experiencing layout shifts. This is not only a bad user experience for your visitors, but it also affects accessibility and SEO[^2] ranking.

While addressing CLS should be a priority, I don't think forcing the fallback image's dimensions into the rendered image is the way to go about it. I don't have the answer to this problem but there are ways to improve the user experience by reducing CLS. See the "Additional Resources" at the end of this post.

As I mentioned earlier, If you use the `<picture>` element, there is no issue with the fallback image because `<picture>` allows us to instruct the browser which image to use for each breakpoint and by doing so we provide the browser with the image's width which it's all it needs to properly calculate the image's aspect ratio to avoid CLS.

## The patch

The clue for me was the original drupal issue where the functionality to use the fallback image's width and height was set. My solution in the way of a patch was to revert those changes and go back to the original state.

I created [issue:3516726](https://www.drupal.org/project/drupal/issues/3516726){target="_blank" rel="noopener noreferrer} where I added a patch with corresponding tests.

The patch removes the logic that was forcing the fallback image's width and height into the rendered image thus letting the multiple sources/image style candidates be the criteria for the rendered image's dimensions. But...

## ... Another bug?

Would you believe it that after fixing the fallback image issue, I ran across  a second related bug? The second issue is very similar to the first one in that images render at different size of expected. However, the cause of this issue is different; this time Drupal uses the dimensions of the last image style in the responsive image styles UI. The outcome is the same as the first issue because if the dimensions of the last image style are too small then the image would render much smaller than the expected size.

Take the example below: Say I want the image to be rendered at about 1040px when the viewport width reaches 1040px. Since the last image style in my configuration is only 500x500px, that's how big my image will be rendered because the width and height of my image will have 500 as their values.

![Responsive images UI highlighting image styles](/images/blog-images/imgstyle.webp){.body-image}

Responsive images UI highlighting multiple image styles{.caption}

### Second patch

## Why is this happening?

The answer is simple, CLS. It may seem like a relatively easy problem to solve but as you can see from both these issues, it is not.

The core of the issue is that Drupal does not know the image's width and height before the page is fully loaded to populate the image's width and height attributes. It's only after the page has gone through the process of analyzing the responsive images configuration and the page has finished loading, that Drupal has the dimensions information. So in an effort to avoid CLS while the page is loading, Drupal is doing its best to provide some kind of value as width and height so it can reduce the issue of not having width of height descriptor values at all.

## The promise

In theory, the introduction of `srcset` and `sizes` attributes for the `<img>` tag was supposed to be the solution. As you may know, when defining multiple sources so the browser can make a smart decision to select the best one based on the user's environment such as screen size, screen resolution, network speed, browser user preferences, etc., each source must include the `w` descriptor which represents the width of each image/source.  Let's see this in code:

```php
<img
  srcset="image-small.jpg 300w, image-medium.jpg 800w, image-large.jpg 1200w"
  sizes="(min-width: 1200px) 1200px, (min-width: 760px) 800px, 100vw"
  src="image-medium.jpg"
  alt="A description of the image">
```

Code representation of an <img> tag with multiple sources and sizes query.{.caption}

Notice the `srcset` attribute contains multiple image options/sources to satisfy any use case in this example. Also notice how each image includes a width descriptor like `300w`, `800w`, etc. The `w` descriptor's job is to inform the browser how wide each image is.

The next important piece to the puzzle is the `sizes` attribute. The value of `sizes` can be as simple as `100vw` which means, regardless of the breakpoint, the image should always render at 100% the viewport width (full width). However in our example, we are including a basic media query based on the width of the viewport: If the viewport is 1200px or wider, the image should render at 1200px, if it's 760px or wider, the image should render at 800px, otherwise, anything smaller (i.e. mobile devices), should be 100% or full width.

### Putting it all together

In the no-too-distant past (because I still remember), the browser lacked enough information to determine the size an image should render. Now thanks to `srcset` and `sizes`, we can give the browser all the information it needs to make a smart decision as to which image is the best one based on our criteria. Let's go through the scenario in the code snippet above:

* Thanks to the `srcset`, I can tell the browser how wide each image/source is and based on this the browser can calculate the image's aspect ratio which is essential to address CLS.
* The `sizes` media query or value, if it's a single value (i.e. `100vw`), tells the browser: "Hey browser, here are these images each of which are **xx** wide, then look at condition in the `sizes` atribute which will tell you how big images should render in relation to the viewport width. Finally, because you are super smart and know the user's environment really well, select the best image/source to render while ensuring a great UX, performance, and avoid CLS."

We know the browser is doing its job because when I inspect the rendered images while experiencing either of the two bugs above, the image the browser loads is in fact the correct one based on our `srcset` and `sizes` configuration. However, the visual outcome is not what we expect because Drupal is enforcing width and height values to the `<img>` without considering the rendering criteria we have configured.

## Where do we go from here?

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

* [^1]: Cumulative Layout Shift [CLS](https://web.dev/articles/cls){target="_blank" rel="noopener noreferrer"}, April 12, 2023.
* [^2]: CLS is a confirmed, [direct ranking factor for Google](https://www.wixseoexpert.com/post/google-ranking-factors-the-complete-list-2026){target="_blank" rel="noopener noreferrer"}, November 19, 2025.

## Additional resources

* [Optimize Cumulative Layout Shift](https://web.dev/articles/optimize-cls){target="_blank" rel="noopener noreferrer"}
