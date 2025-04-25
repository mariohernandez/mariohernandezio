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

## Lobotomized Owls 🦉 🦉

This is probably one of my favorite techniques for applying consistent margin or other styles to direct sibling child elements of a particular selector. The **Lobotomized Owl** looks like this in code `* + *`, which as you can see, it looks like a cute owl. This is not a new CSS thing, it was originally presented [back in 2014](https://alistapart.com/article/axiomatic-css-and-lobotomized-owls/){target="_blank" rel="noopener noreferrer"}.

## Understanding the Lobotomized Owl selector

### Concept

Only apply CSS styles to child elements that have siblins.

### Example

Consider the following HTML:

```html
<div class="parent">
  <div class="child"></div>
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

The CSS rule above adds a `2rem` top margin to any "direct" child of `.parent` (`.parent > *`), but only if it has a sibling (`+ *`).

### Visual example

The image below shows each `div` as a white box and the margin as purple boxes.

![Four boxes representing divs](/images/blog-images/owl.webp){.body-image .body-image--narrow .body-image--left aria-hidden="true"}

FIG 1: Each box represents a div. Purple boxes represent margin/spacing.{.caption}

Notice that the first box in the image above has no top margin because there is no sibling above it. However, boxes 2, 3, and 4 do have siblings above them and therefore the 2rem top margin was added to them.

## Traditional approach for handling margin

In the past I have used other techniques for adding margin to a group of elements. Let's say we have a list of items (ol/ul), and we want to add margin as we did before, but we also want to add inner borders. The Owl selector is perfect for this.

In the past I would do something like this:

```css
.my-list {
  li:not(last-child) {
    border-block-end: 1px solid #000;
  }
}
```

That's not terribly wrong, but before `:not` was a thing, I would do something like this:

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

## A more complex example

The examples above are pretty simple but in many cases, our HTML may not be as clean or uniformed as the examples we've seen. Here's a more realistic example where our markup is a combination of different HTML tags.

```html
<article class="blog-post">

  <div class="blog-post__tag">
    <a href="#" class="eyebrow">Drupal</a>
  </div>

  <header class="blog-post__header">
    <h1 class="blog-post__title">
      Using modern image formats to improve performance
    </h1>
    <p class="blog-post__subtitle">
    Small wins, when added up can make a big difference.
    This is one of those small wins which can result in
    performance gains for your website.</p>
    <div class="blog-post__date">
      <time datetime="2025-xxx-xx">April 12, 2025</time>
    </div>
  </header>

  <div class="blog-post__share">
    <ul class="social-share" role="list">
      <li class="social-share__item">...</li>
      <li class="social-share__item">...</li>
      <li class="social-share__item">...</li>
    </ul>
  </div>

  <div class="blog-post__content">
  ...
  </div>
</article>
```

The HTML above is actually the code used on each of the blog posts on this site. Let's break it down in an ilustration form for a better visual representation.

![Visual representation of blog post markup](/images/blog-images/article.webp){.body-image .body-image--narrow .body-image--left aria-hidden="true"}

FIG 2. Blog post markup represented in rectangular boxes.{.caption}

From the code and **FIG 2** above, we notice the following:

1. The `<article>` tag is the top parent element with four direct child elements (_Tag, Header, Share, and Article content_).
1. The `<header>` tag is also a parent element itself with three direct child elements (_Title, Subtitle, and Date_).

Let's start with the `<article>` as the top parent:

```css
.blog-post {
  > * + * {
    margin-block-start: 2rem;
  }
}
```

The result of this CSS rule is a 2rem top margin on direct sibling children of the `.blog-post` selector. I have highlighted in purple how this looks in FIG 3. below:

![Blog post diagram displaying margin in purple](/images/blog-images/article2.webp){.body-image .body-image--narrow .body-image--left aria-hidden="true"}

FIG 3. The purple boxes represent the space added by the CSS above.{.caption}

Only the _Article content, Share, and Header_ have siblings above them. The _Tag_ element does not and therefore it does not inherit top margin.

Now let's apply the same treatment to the `<header>`:

```css
.blog-post__header {
  > * + * {
    margin-block-start: 2rem;
  }
}
```

To make it easier to diferentiate, this time I highlighted the margin in direct sibling children of the `<header>` tag, in blue. See FIG 4. below:

![Blog post diagram displaying margin in blue](/images/blog-images/article3.webp){.body-image .body-image--narrow .body-image--left aria-hidden="true"}

FIG 4. The blue boxes represent the space added by the CSS above.{.caption}

This time, only the _Date and Subtitle_ elements are given a 2rem top margin.

With very little CSS code we have been able to achieve consistent spacing in direct sibling children of the `<article>` as well as nested ones inside the `<header>`.  In the spirit of staying [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself){target="_blank" rel="noopener noreferrer"}, we could even combine both rules to reduce code repitition.

```css
.blog-post, .blog-post__header { /* Placing in the same line to fix prism bug. */
  > * + * {
    margin-block-start: 2rem;
  }
}
```

## Defining utility clsses

You'll notice on each blog post I use CSS utility classes like `.mt-20` or similar. These help me reduce code repetition but I am very selective where I use these utility clsses as they don't always provide the expected result especially on content where spacing, among other things, is not always consistent across breakpoints. Here are some examples of these CSS utility classes.

```css
/* 10px of top margin */
.mt-10 {
  > * + * {
    margin-block-start: 10px;
  }
}

/* 20px of top margin */
.mt-20 {
  > * + * {
    margin-block-start: 20px;
  }
}

/* 10px of bottom margin */
.mb-10 {
  > * + * {
    margin-block-end: 10px;
  }
}

/* 20px of bottom margin */
.mb-20 {
  > * + * {
    margin-block-end: 20px;
  }
}
```

Whenever I need consistent margins or padding across breakpoints, I use the corresponding utility class.

## What if the HTML structure changes?

It's not uncommom for the HTML of a document to change. Some of my blog posts for example may have subtitle text while others may not. The beauty of the Owl selector is that it is not depending on the specific HTML tags in your document.

You can test this by looking at some of my other blog posts with and without subtitle text (text below the article title). You will see that whether a post has subtitle or not, the spacing remains consistent. If you are up for it, you could inspect any blog post and add new random HTML elements and you'll notice spacing remains consistent.

## What about Gap?

Oh yes, enough about Owls 🦉, Gap is a beautiful thing and can even be used similarly to the Owl selector for adding space in between sibling child elements.

```css
.parent {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
```

### Pros of gap

* The CSS block above will behave exactly as the Owl technique, as in it will only add space between sibling child elements.
* Another advantage of using Gap for spacing, is that when it comes to responsive design, the gap rules you apply to elements for mobile, will remain in place as you transition to tablet or desktop. This means if in mobile your elements were stacked in column direction, but in desktop they change to row, the gap rules will still apply as long as your child elements are siblins. See FIG 5. below.

![Example of gap settings on sibling elements](/images/blog-images/gap.webp){.body-image .body-image--wide .body-image--left aria-hidden="true"}

FIG 5. Visual of Gap on column and row mode.{.caption}

### Cons of gap

If you opt to use Gap for spacing, this means you either need to use `display: flex` or `display: grid` on the parent element. This is not a bad thing if you are already using flex or grid on that parent element, but if your only reason for using gap is for spacing purposes, then I would recommend using the Owl technique instead as it requires not additional properties on your parent selector.

## In closing

CSS has evolved in recent years and there has never been a better time to do amazing things with it. I will continue to write about CSS and share more tips and tricks. Stay tuned!
