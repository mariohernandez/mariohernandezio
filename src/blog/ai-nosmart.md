---
date: "2026-06-16"
title: "Don't let AI have the last word"
subtitle: "Do you feel confident to push back on AI's proposed coding solutions? I hope so."
slug: dont-let-ai-have-the-last-word
tags: ['ai', 'coding']
draft: false
featured: true
featuredImage: "/images/heroes/ai-bot.webp"
featuredImageAlt: "A teacher pointing at a chalkboard that reads 'Hello, world' while a robot student raises its hand to ask a question."
imageThumb: "/images/thumbs/ai-bot-thumb.webp"
featuredImageCredit: "Claude Design"
featuredImageCreditUrl: "https://claude.com/product/overview"
summary: AI has not replaced my learning habits, it has validated them.
---
What an exciting time to be a developer. Over the past year, I've gradually begun adopting a number of AI tools to improve the quality of my work, be more efficient, and even dive into areas of development I had never been strong in.

The days of reading blog posts and tutorials or trying code challenges are over. **Or are they?**

I subscribe to a handful of technical newsletters which arrive in my inbox every week. I always look forward to learning about the new stuff, improvements to old stuff, or the exciting features or tools coming down the development pipeline. I read each one of them in their entirety and if I am too busy, I keep them in my inbox until I have the time to go through them. Sometimes this means I have two issues to read through because I have not been able to get the previous one. I never delete them until I am done with them.

Why waste my time when I can easily ask AI for help? The learning process is exciting for me, it always has been. In the AI era it might even be more important because what if AI is wrong? How do I know the code snippet I am provided is correct or won't cause regressions in my project? Maybe this is the reason I don't use front-end frameworks like Bootstrap or Tailwind in my projects. I have used them for prototyping, but never to dictate the direction or coding conventions in my project.

Let's take a look at a basic example that may seem trivial but could lead to major issues if not understood. Then we will dive into the real reason I decided to write this post.

## HTML/CSS Block-level element vs. Inline-level element

If you know CSS really well you can skip these examples, but if you don't know what block-level and inline-level elements are in the context of HTML/CSS, you may run into issues with your code you'd think is not working when in fact it might be working as intended.

```css
.block {
  display: block; /* 1 */
  margin: 24px;   /* 2 */
  padding: 24px;  /* 3 */
  width: 100px;   /* 4 */
}
```

**display:block**:

1. every side affects the layout.
1. all 4 sides push surrounding boxes.
1. all 4 sides expand the box.
1. width/height are honored.
1. breaks content flow by creating a line break (i.e. `<p>`, `<div>`, `<h2>`)

```css
.inline {
  display: inline; /* 1 */
  margin: 24px;    /* 2 */
  padding: 24px;   /* 3 */
  width: 100px;    /* 4 */
}
```

**display:inline**:

1. only the horizontal axis affects layout.
1. left/right push adjacent inline content; top/bottom are **IGNORED** entirely.
1. left/right push adjacent content; top/bottom are PAINTED but reserve NO space — they don't push the lines above/below apart.
1. width / height have **NO EFFECT**.
1. does not break content flow (i.e. `<a>`, `<span>`, `<img>`)

```css
.inline-block {
  display: inline-block;  /* 1 */
  margin: 24px;           /* 2 */
  padding: 24px;          /* 3 */
  width: 100px;           /* 4 */
}
```

**display:inline-block**:

1. best of both worlds, inline element with block characteristics.
1. all 4 sides reserve space.
1. all 4 sides reserve space.
1. width / height honored again.
1. top/bottom are PAINTED but reserve NO space — they don't push the lines above/below apart. (i.e. any element with `display: inline-block;`).

Did you know all those specifics about the `display` CSS property? What if I didn't understand them and wondered why my layout is broken? What if I want to turn an inline-level element into a block-level element and vice versa? What would that do to my layout or spacing around elements?

## The real example that validated my learning thirst

Here is when it became clear to me that you don't need to be an expert, but at the very least understanding your code can provide you with the ability to question AI's decisions and even push back on its recommendations.

The code challenge was relatively simple because I have done this many times, but this time it was at the end of my day and I was exhausted. So I figured I'd make use of AI to help me complete this task.

## Build a Card component with SDC in Storybook

<!-- [Single Directory Components, SDC](https://mariohernandez.io) -->

I'll focus on only the one piece AI and I had a disagreement on and had to have a heart-to-heart talk about; The card's cta link.

* As any typical card, I needed a title, image, label, and a link/cta field.
* The link needed a label (i.e. "Read the full article"), url, and an icon (svg).

AI built the component for me using SDC's conventions along with my custom Storybook's workflow and it worked as expected in Drupal and Storybook, but since this was one of the first components I was building in this new project, I decided that for the link's icon, I wanted to extract the inline SVG from the `link.twig` template and instead create an `<svg>...</svg>` asset out of it so I could re-use it in other components.

Originally, AI had opted to use Twig's `source()` function which is a valid and proper approach for inlining SVGs into components or Twig templates, however, I like to use `{% raw %}{% include %}{% endraw %}` as it provides better cache management especially if I plan to use many icons on my site.

Here's the verbatim conversation about this "simple" change:

**Me**:
_can we extract the icon's svg tag and create a file for it inside `src/assets/images/`? then twig include it in `link.twig`? this way we can reuse it in other components_{.callout}

Simple enough, except my project's workflow is unique in that SDC and Storybook share assets (twig, yml, css, js, images), to ensure there is a single source of thruth. However, since this was a new project, I had not registered all the required namespaces for Drupal and Storybook to share assets.

**AI**:
_Good call — `{% raw %}{% include %}{% endraw %}` sidesteps source() entirely and avoids the namespace registration work in both Drupal and Storybook_.{.callout}

At this point AI proposed to write a theme hook to register a new Twig namespace Drupal could use to access assets directory.

The proposal of a theme hook to register a new Twig namespace was a **NO NO** for me because I knew it was not necessary. This takes me back to my original point of being able to understand the code to challenge AI proposed solutions that may not be necessary or an alternative/twig-friendly approach may do just fine.
I immediately questioned the proposal and provided a recommendation.

**Me**
_how about adding a new namespace for drupal that points to src/assets so both storybook and drupal use the same path for assets?_{.callout}

**AI**
_That's the cleanest approach. A single `@assets` namespace registered in both Storybook and Drupal means the same `{% raw %}{% include '@assets/images/icon-arrow.svg' %}{% endraw %}` line works identically in both environments - no `<theme-name>.theme` hook needed at all_{.callout}

Needless to say, this was the right call and the final result was summarized by AI as:

**AI**
{% raw %}

<div class="callout">
- src/assets/images/icon-arrow.svg — created, contains the SVG <br>
- vite.config.js — assets namespace added (Drupal) <br>
- .storybook/main.js — assets namespace added (Storybook) <br>
- components/link/link.twig — inline SVG replaced with <br />{% include '@assets/images/icon-arrow.svg' %}
</div>
{% endraw %}

## In closing

When properly trained and instructed, AI can be a real asset to your coding process. Clearly in my case I had not done a good job at providing the right context and instructions for the Assistant to follow. However, whenever I run into situations like this, I make sure it is documented for AI's future use.
