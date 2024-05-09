---
date: "2024-05-20"
title: "Using ViteJS for your Drupal front-end builds"
tags: ['drupal','front-end']
draft: false
featured: true
featuredImage: "/images/mountains.webp"
featuredImageAlt: "Overlapped mountains painted with water colors"
imageThumb: "/images/thumbs/mountains-thumb.webp"
featuredImageCredit: "Alex Shutin"
featuredImageCreditUrl: "https://unsplash.com/@fiveamstories"
summary: "If you are searching for the next front-end build tool for your Drupal project, or any project, you need to try ViteJS. "
---
Recently at my work we decided to move out of the current design system, Patternlab, and into a more modern one, Storybook. We also took this opportunity to look at other tools that could be replaced to improve our current front-end workflow. Professionally and personally I have been using Gulp for almost 10 years. We knew switching design systems also meant switching front-end build tools. The obvious choice seemed to be Webpack, but as I looked deeper into build tools, I discovered [ViteJS](https://vitejs.dev){target=_blank rel=noopener}.

Vite is considered the _Next Generation Frontend Tooling_, and during our testing we were extremely impressed not only with how fast Vite is, but also with its plugins ecosystem and its community support. Compared to other build tools, Vite is relatively new, but it has been around for a few years now and it has matured to the point I feel confident using it on any project I work on. I'll let you [read about Vite's features](https://vitejs.dev/guide/){target=_blank rel=noopener} on your own and how it compares to other build tools, but for now I am going to focus on building an automated workflow for a Drupal front-end environment or theme. Mind you, most of the things we'll cover apply to any project type, not just Drupal.

## Tasks to automate

Build tools like Vite make it possible to automate repeatitive tasks to run in the background without getting in the way of our work. At the end of this post, our automated workflow will be able to perform the following tasks:

* Watch, compile, lint, concatenate, and minify code
* Optimize static assets such as images
* Copy assets such as CSS, JS, and Images from `/src` to `/dist`

## Setup the environment

If you've followed along in previous post, you should have an environment ready to follow along in this post. If you need an environment, you can grab the codebase from the previous post which will get you all you need to complete the tasks in this post.

{% raw %}
<span class="callout callout--top-border">
<p>The repo below contains everything you need to follow along. Be sure you switch to the **card** branch.</p>

<a href="https://github.com/mariohernandez/storybook/tree/card" class="button button--reverse" target="_blank" rel="noopener">Download the code</a>
</span>
{% endraw %}


## Watch task

One task we are all familiar with is the **watch** task. Being able to make changes to CSS, JS, and even Twig, then automatically compile our code is not only efficient but also productive.

Most of the work we will be doing today will be inside `vite.config.js` in combination with adding some extentions or packages in `package.json`.

* To start, let's install the first package, **vite-plugin-watch-and-run** by running:

{% raw %}

```bash
npm i -D vite-plugin-watch-and-run
```

{% endraw %}

* Next we will set the configuration to put these packages to work. Inside `vite.config.js` add the following:

{% raw %}

```js
import path from 'path'
import { watchAndRun } from 'vite-plugin-watch-and-run'

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    watchAndRun([
      {
        name: 'css',
        watchKind: ['add', 'change', 'unlink'],
        watch: path.resolve('source/patterns/**/*.css'),
        run: 'npm run vite:build',
        delay: 300,
      },
      {
        name: 'js',
        watchKind: ['add', 'change', 'unlink'],
        watch: path.resolve('source/patterns/**/*.js'),
        run: 'npm run vite:build',
        delay: 300,
      },
      {
        name: 'images',
        watchKind: ['add', 'change', 'unlink'],
        watch: path.resolve('source/patterns/**/*.{png,jpg,jpeg,svg,webp,mp4}'),
        run: 'npm run vite:build',
        delay: 300,
      },
    ])
  ]
}

export default config
```

{% endraw %}
