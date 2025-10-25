---
date: "2025-10-06"
title: "Normalize images captions in your website"
subtitle: "A cleaner and more performant approach to managing your website images caption text."
tags: ['css', 'theme']
# series:
#   slug: "css"
#   order: 1
draft: false
featured: false
featuredImage: "/images/heroes/frame.webp"
featuredImageAlt: "Black metal frame on beach sand"
imageThumb: "/images/thumbs/frame-thumb.webp"
featuredImageCredit: "Mooz L."
featuredImageCreditUrl: "https://unsplash.com/@ml335"
summary: "Creating visual harmony between images and captions text in your web project."
eleventyExcludeFromCollections: false
---

Caption text in website images is one of those things that may not seem like a major issue, but it always needs to be addressed globally within your project—otherwise, it’s not going to be a pretty picture (pun intended).

## The problem

![Building walls image with caption text that expands beyond the image](/images/blog-images/broken-caption.webp){.body-image .body-image--left}

By default, even when using semantic markup, an image's caption text would expand as wide as it can unless it is restricted by its parent container. Wouldn't it be nice if the caption text did not grow any wider than the image's width?

The `<figure>` and `<figcaption>` elements (recommended semantic markup for images and captions), are both "block-level elements", which means by default they both would span as wide as their containers. Although you can solve this problem by managing the width of the container, the solution I am interested in is for the caption text width to never exceed the width of the image no matter the width of the parent container.

## The solution

Let's start with the standard and semantic markup for an image and its caption.

### The markup

{% raw %}

```html
<figure>
  <img src="image-path/image.webp" alt="Image alt text" />
  <figcaption>Image caption text.</figcaption>
</figure>
```

{% endraw %}

The `<figcaption>` is the element which provides the accessible name for the parent `<figure>`. So not only is the markup above semantic, but it is also important for accessibility as well as SEO.

### The CSS

```css
figure {
  inline-size: fit-content;

  figcaption {
    contain: inline-size;
  }
}
```

That's it! 🌈

Adding the CSS rule above to your global or reset stylesheets ensures the caption text will always be in harmony with the parent image.

### The result

![Building walls image with caption text that aligns with the image width](/images/blog-images/fixed-caption.webp){.body-image .body-image--left .body-image--wide}

I added a couple of extra lines of CSs to make the text look smaller and italic as well as some padding around the text.

```css
figure {
  inline-size: fit-content;

  figcaption {
    contain: inline-size;
    font-size: 90%;
    font-style: italic;
    padding: 2rem;
  }
}
```

## How does this work?

`inline-size` is a CSS logical property, meaning its direction depends on the writing mode of the document. In this example, you could also write `width: fit-content` with the same effect.

`fit-content` ensures the element is never smaller than its min-content size and never larger than its max-content size, while also respecting the available space. Similar to min-width or max-width. As a result, this lays the ground for the figcaption element. It creates the width context the figcaption element should adhere to.

`contain` tells the browser that an element and its subtree are independent of the rest of the page. This allows the browser to limit layout, style, and paint calculations only to that element when changes happen.

Using `inline-size` effectively “cages” the content horizontally: the content inside the element can’t force it to grow wider. Any overflow will be clipped, wrapped, or otherwise constrained.

In the case of the image caption, the `inline-size` value ensures the text width will never exceed the width of the image which was previously defined by using `fit-content`.

### Bonus

This technique not only solves the caption width issue—it also improves performance. By using modern logical properties, the browser does less processing to render your elements.

## In closing

Although this is technically still a hack, it feels much cleaner than previous approaches. And with the added performance benefits, I’d call this a win. I hope you find it useful.

Happy Coding! 🧑🏽‍💻
