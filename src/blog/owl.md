---
date: "2025-05-01"
title: "Understanding The Owl Selector in CSS"
subtitle: "Sometimes you come across a hack or creative way to address an issue and you ask yourself: Why didn't I think of that?"
tags: ['css', 'theme']
draft: false
featured: true
featuredImage: "/images/heroes/owl.webp"
featuredImageAlt: "White owl with fully spread wings flying over snow"
imageThumb: "/images/thumbs/owl-thumb.webp"
featuredImageCredit: "Todd Steitle"
featuredImageCreditUrl: "https://unsplash.com/@tsteitle"
summary: "If you are a seasoned developer you would probably agree that many times we focus so much on learning the new things that we forget about the basics or things we learned when we were getting started."
eleventyExcludeFromCollections: false
---

With all the advancements in CSS over the past few years, it's surprising to discover a technique that's been available all along. If you're well-versed in CSS, you might already know this little nugget: `selector > * + * {...}`. Let's dive into it.

## Lobotomized Owls 🦉 🦉

The Lobotomized Owl (`* + *`), or **Owl selector**, is one of my favorite techniques for managing document flow and achieving consistent spacing in a highly manageable way. While the Owl selector can be used for various style settings, my preferred use is to add spacing between sibling elements.

### How does the Owl selector work?

_The Owl selector targets elements that are preceded by an immediate sibling_. This means that if you apply the Owl selector to a group of HTML elements, the styles will apply to all elements except the first one, as the first one doesn't have a preceding sibling. We'll see some examples shortly.

The Lobotomized Owl isn't a new CSS concept; it's been around since the beginning of CSS and was first discussed back in 2014 when [A List Apart](https://alistapart.com/article/axiomatic-css-and-lobotomized-owls/){target="_blank" rel="noopener noreferrer"} wrote about it. Read that article for a more in-depth description of the Owl selector.

## Understanding the Owl selector

### Concept

The Owl selector allows you to manage the document flow by using the [next sibling combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/Next-sibling_combinator){target="_blank" rel="noopener noreferrer"} (`+`), along with the [universal selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Universal_selectors){target="_blank" rel="noopener noreferrer"} (`*`).

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

## Scoping the Owl selector

Using the Owl selector in its original form (`* + *`), could result in unexpected updates due to its broad scope. Narrowing the scope is prefered.

Chaining the Owl selector with `.parent >`:

```css
.parent > * + * {
  margin-block-start: 2rem;
}
```

Nesting it within `.parent` along with other rules that may exist:

```css
.parent {
  /* other rules here. */

  > * + * {
    margin-block-start: 2rem;
  }
}
```

By narrow the scope as shown above, and using the [child selector](https://developer.mozilla.org/en-US/docs/Web/CSS/Child_combinator){target="_blank" rel="noopener noreferrer"} (`>`), a `2rem` top margin is added to "direct" children of `.parent`, but only if they have a preceding sibling.

### Visual example

A more visual representation of what the CSS is doing can be seen here:

![Four boxes representing divs](/images/blog-images/owl.webp){.body-image .body-image--narrow .body-image--left aria-hidden="true"}

FIG 1: Each white box represents a div while the purple boxes represent top margin.{.caption}

> Instead of writing styles, we’ve created a style axiom: an overarching principle for the layout of content flow. - [Heydon Pickering](https://alistapart.com/author/heydonworks/){target="_blank" rel="noopener noreferrer"}.

## Traditional approach for handling margin

In the past I would do something like this to handle margin on a group of elements.

```css
.my-list {
  li:not(:first-child) {
    border-block-start: 1px solid #000;
  }
}
```

That's not terribly bad, but the problem with this approach is that it increases the specificity of the rule, which could complicate overrides.

Before `:not` was a thing, I would also do something like this (please forgive me):

```css
.my-list {
  li {
    border-block-start: 1px solid #000;
  }
}

.my-list {
  li:first-child {
    border: 0;
  }
}
```

There's nothing wrong with this example except that it's more code and you're overriding rules. Ultimately, it works, so don't feel too bad if you've done this. Just don't do it again 😉. Instead, do this:

```css
.my-list {
  > * + * {
    border-block-start: 1px solid #000;
  }
}
```

## A more complex example

The examples above are pretty simple, but in many cases, our HTML may not be as clean or uniform as the examples we've seen. Here's a more realistic example where our markup is a combination of different HTML tags.

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

The HTML above is actually the code used on each of the blog posts on this site. Let's break it down in an illustration form for a better visual representation.

![Visual representation of blog post markup](/images/blog-images/article.webp){.body-image .body-image--narrow .body-image--left aria-hidden="true"}

FIG 2. Illustration of the markup structure of a Blog post.{.caption}

From the code and **FIG 2** above, we notice the following:

1. The `<article>` tag is the top parent element with four direct child elements (_Tag, Header, Share, and Article content_).
1. The `<header>` tag is also a parent element itself with three direct child elements (_Title, Subtitle, and Date_).
1. There is a mix of HTML tags.

Let's start with the `<article>` parent selector:

```css
.blog-post {
  > * + * {
    margin-block-start: 2rem;
  }
}
```

The result of this CSS rule is a 2rem top margin on direct sibling children of the `.blog-post` selector, except the first/top one. I have highlighted in purple how this looks in FIG 3. below:

![Blog post diagram displaying margin in purple](/images/blog-images/article2.webp){.body-image .body-image--narrow .body-image--left aria-hidden="true"}

FIG 3. The purple boxes represent the space added by the CSS above.{.caption}

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

With very little CSS code we have been able to achieve consistent spacing in direct sibling children of the `<article>` as well as nested ones inside the `<header>`.  In the spirit of staying [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself){target="_blank" rel="noopener noreferrer"}, we could even combine both rules to reduce code repitition.

```css
      .blog-post,
      .blog-post__header {
  > * + * {
    margin-block-start: 2rem;
  }
}
```

## What if the HTML structure changes?

It's not uncommon for the HTML of a document to change. Some of my blog posts, for example, have subtitle text while others don't. The beauty of the Owl selector is that it doesn't depend on specific HTML tags or structure in your document. If new sibling elements are added or some are removed, the spacing previously defined with the Owl selector will continue to work as intended without breaking the document flow.

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
* Another advantage of using Gap for spacing, is that when it comes to responsive design, the gap rules you apply to elements for mobile, will remain in place as you transition to tablet or desktop. No need to change the gap settings if the direction of your layout has changed. See FIG 5. below.
* Gap is great for menu lists where you may want to add spacing in between each menu item except the ones at the end.

![Example of gap settings on sibling elements](/images/blog-images/gap.webp){.body-image .body-image--wide .body-image--left aria-hidden="true"}

FIG 5. Visual of Gap on column and row mode.{.caption}

### Cons of gap

If you opt to use Gap for spacing, this means you either need to use `display: flex` or `display: grid` on the parent element. This is not a bad thing if you are already using flex or grid on that parent element, but if your only reason for using gap is for spacing purposes, then I would recommend using the Owl technique instead as it requires not additional properties on your parent selector.

## In closing

I don't think there has ever been a more exciting time to work with CSS than now. The capabilities of CSS and browser support have never been better. Sometimes however, using some of the most basic techniques can make a great impact in our projects.

If you found this post useful, stay tuned for more like it.

## Resources

* [What is the 'Owl selector' (* + *)?](https://www.youtube.com/watch?v=0O0ssm70g1g){target="_blank" rel="noopener noreferrer"} &mdash; Brand new video
* [My favourite 3 lines of CSS](https://piccalil.li/blog/my-favourite-3-lines-of-css/){target="_blank" rel="noopener noreferrer"}
* [The Stack](https://every-layout.dev/layouts/stack/){target="_blank" rel="noopener noreferrer"}
* [Axiomatic CSS and Lobotomized Owls](https://alistapart.com/article/axiomatic-css-and-lobotomized-owls/){target="_blank" rel="noopener noreferrer"}
