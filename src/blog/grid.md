---
date: "2025-09-21"
title: "CSS Grid and subgrid - Building next-level layouts"
subtitle: "These are five of the most common CSS techniques I use to improve code quality, consistency and reduce duplication."
tags: ['css', 'theme']
draft: false
featured: false
featuredImage: "/images/heroes/owl.webp"
featuredImageAlt: "White owl with fully spread wings flying over snow"
imageThumb: "/images/thumbs/owl-thumb.webp"
featuredImageCredit: "Todd Steitle"
featuredImageCreditUrl: "https://unsplash.com/@tsteitle"
summary: "So you think you know CSS? Take a look at this simple technique for managing spacing between sibling elements."
eleventyExcludeFromCollections: true
---

It's an exciting time to be a front-end developer. CSS has come a long way and things we couldn't even imagine ten years ago, are now possible with CSS. In this post of the CSS Series, the focus will be on CSS Grid and subgrid. This is not a complete guide of CSS Grid, but a practical example of its use in combination with subgrid.

## What is subgrid?

You probably have heard and maybe even used CSS Grid, but perhaps subgrid may be a new term to you. As described in [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Subgrid), **subgrid** is a value of the CSS grid layout module used by `grid-template-columns` and `grid-template-rows`.

```css
.parent {
  display: grid;
  grid-template-rows: repeat(3, auto);
}

.child {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;
}
```

Example of a basic use of subgrid.{.caption}

## What does it all mean?

There are several ways to define a grid depending on your requirements. Regardless of the approach you take, the goal is always the same, place grid items in a grid. AT its core, when you add `display: grid` to a container, any direct children become grid items and can be placed in the new grid you just defined.

Things get a little more complicated when your grid items have children, or grid items of their own. but you wish you could place them within the grandparent grid cells. The problem is that CSS Grid only allows for grid items to be placed within their parent's grid cells, grandchildren grid items cannot. This is where subgrid comes in.



## My top five css tips & tricks

Picking a favorite would be like asking me to pick my favorite kid, not gonna happen. There are obviously many more of these I could list but let's keep it simple for now.

1. [The Owl Selector](./owl.md)
1. [Container queries](...)
1. [CSS custom properties](...)
1. [Border image](...)
1. [The `:has` & `:not` pseudo selectors](...)

### The Owl Selector

You all know my feelings about this one so I am not going to repeat myself. If you haven't read my post about [the Owl selector](./owl.md) please do so at some point and you will be glad you did.

### Container queries

For over 14 years we have been using Media Queries to make our website adapt to any device size. I literally remember the very moment I heard and saw Media Queries in action. I thought I had just discovered the most amazing feature in web development. I wasn't wrong.
Fast-forward about a decade later, I started hearing about Container Queries and although my reaction was not the same as when I heard about Media Queries, I was still pretty excited for the many ways in which they would take responsive design to the next level.

#### When to use Container Queries vs. Media Queries?

In some cases it may not make a difference which you use but there are use cases where only one or the other would do the job. Here's an example of the latter.

Consider the following Card component.

![Wide card](/images/blog-images/card-demo.webp){.body-image .body-image--left}

Card component in wide and narrow displays.{.caption}

You may think the display requirements are to show the wide version on desktop and the narrow version on mobile, and you would be partially right. Except that the component can also be added on narrow containers like a page's sidebar.

Using Media Queries alone would not work because as soon as the viewport becomes wider than the mobile dimension we set up in the media query, the component's layout will change to the wide display even when added on a page's narrow sidebar. Sure you could add a class to indicate when the component is in a narrow container but the goal is for the component to naturally adapt to the width of its container, not the viewport width.

Here's the structural markup of the Card component.

```html
<div class="card">
  <div class="card__inner">
    <div class="card__text">...</div>
    <div class="card__image">...</div>
  </div>
</div>
```

The CSS to achieve both wide and narrow displays looks something like this.

```css
.card {
  container: card / inline-size;
}

.card__inner {
  display: flex;
  flex-direction: column;
  gap: 20px;

  @container (inline-size >= 640px) {
    flex-direction: row;
  }
}
```

Using container queries the card component layout changes from narrow to wide.{.caption}

Container queries do not allow you to modify the parent selector where the container property has been set, you can only update children of the container. This is why we have `.card__inner` to be used as the container to watch for. Based on this container's width, we can adjust the layout of the card.


CSS Grid on its own is a powerful tool for creating flexible and responsive layouts, but in combination with Subgrids, CSS Grid scalability is taken to the next level.

[Modern Browsers support](https://caniuse.com/?search=subgrid) is excellent.


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
