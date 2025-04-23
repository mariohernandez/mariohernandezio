---
date: "2025-04-28"
title: "Modern CSS techniques to improve your Drupal theme"
subtitle: "Small wins, when added up can make a big difference. This is one of those small wins which can result in performance gains for your website."
tags: ['css', 'theme']
draft: false
featured: true
featuredImage: "/images/heroes/webp.webp"
featuredImageAlt: "Google Lighthouse Metrics for MarioHernandez.io"
imageThumb: "/images/thumbs/webp-thumb.webp"
featuredImageCredit: ""
featuredImageCreditUrl: ""
summary: "Media, in particular images, have always been a hot topic for discussion as it relates to website performance. Learn about this relatively easy approach to reduce image file sizes."
eleventyExcludeFromCollections: false
---

I don't think there has ever been a more exciting time to work with CSS than now. The capabilities of CSS have evolved in such a way that some things that could only be done with JavaScript a few years ago are now achievable with only CSS. In addition, CSS has gifted developers with a series of amazing new features which have changed the landscape for front-end development.

In this blog series, I hope to share some incredible and very useful CSS tips and tricks that can help you become a better developer and enhace the UX of your website.

## Lobotomized Owls

This is probably one of my favorite techniques for applying consistent margin or other styles to direct sibling child elements of a particular selector. The [Lobotomized Owl](https://alistapart.com/article/axiomatic-css-and-lobotomized-owls/){target="_blank" rel="noopener noreferrer"} looks like this `* + *`. This is not a new CSS thing, as you can see in the blog above it was originally discussed back in 2014.

### Understanding the Lobotomized Owl

#### Concept

Only apply CSS styles to child elements that have siblins.

#### Example

Consider the following HTML:

```html
<div class="parent">
  <div class="child"></div>
  <div class="child"></div>
  <div class="child"></div>
</div>
```

Let's say we want to apply top margin to sibling child elements:

```css
.parent > * + * {
  margin-block-start: 2rem;
}
```

The CSS rule above indicates that any "direct" child (`.parent >`), regardless of what it is, will be applied a top margin of 2rems.

#### Visual example

![Three boxes representing divs](/images/blog-images/owl.png){.body-image .body-image--short .body-image--left aria-hidden="true"}

FIG. 1: Each box represents a div.{.caption}

* The image above shows the 3 divs we created earlier as boxes.
* With the CSS we wrote, the 2rem margin will only be applied to those boxes that have siblings.

### When should I use the Owl?

My personal preference is to do exactly what I just did above. The reason for this is that if there is a chance there will be more child elements added to the "parent", I don't have to modify my code for margin to be automatically applied to new child elements.

In the past I have made the mistake of adding margin to each individual child element which not only creates duplicate code, but it can become inconsistent. Also, when new child elements are added, I need to go back and add margin to the new elements.

### Other uses

Let's say we have a list of items (ol/ul), and we want to add margin as we did before, but we also want to add inner borders. The Owl selector is perfect for this.

In the past I would do something like:

```css
.my-list {
  li:not(last-child) {
    border-block-end: 1px solid #000;
  }
}
```

Or worst yet, before `:not` was a thing:

```css
.my-list {
  li {
    border-block-end: 1px solid #000;
  }
}

.my-list {
  li:last-child {
    border: 0;
  }
}
```

Now I can simply do:

```css
.my-list {
  > * + * {
    border-block-end: 1px solid #000;
  }
}
```

Give the Owl a try and you will see that not only will you write less code, but your styles will be applied more consistently to elements where you use this technique.

## What about Gap?

Oh yes, Gap is a beautiful thing and can even be used similarly to the Owl trick for adding space in between two sibling child elements.

```css
.parent {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
```

### Pros of gap

* The CSS block above will behave exactly as the Owl technique, as in it will only add space to sibling child elements.
* Another advantage of using Gap for spacing, is that when it comes to responsive design, the gap rules you apply to elements for mobile, will remain in place as you transition to tablet or desktop. This means if in mobile your elements were stacked, but in desktop they are side-by-side, the gap rules will still apply as long as your child elements are siblins.

### Cons of gap

If you opt to use Gap for spacing, this means you either need to use `display: flex` or `display: grid` on the parent element. This is not a bad thing if you are already using flex or grid on that parent element, but if your only reason for using gap is for spacing purposes, then I would recommend using the Owl technique instead as it requires not additional properties on your parent selector.

## In closing

CSS has evolved in recent years and there has never been a better time to do amazing things with it. I will continue to write about CSS and share more tips and tricks. Stay tuned!
