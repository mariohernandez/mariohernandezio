---
date: "2024-06-02"
title: "Using ViteJS for your Drupal front-end builds"
tags: ['drupal','storybook','components']
draft: true
featured: false
featuredImage: "/images/mountains.webp"
featuredImageAlt: "Overlapped mountains painted with water colors"
imageThumb: "/images/thumbs/mountains-thumb.webp"
featuredImageCredit: "Alex Shutin"
featuredImageCreditUrl: "https://unsplash.com/@fiveamstories"
summary: "If you are looking for the next front-end build tool for your Drupal project, or any project, you need to try ViteJS. "
---
<!-- I consider myself pretty loyal to the tools I use on a daily basis as a web developer. I am not the kind of dev who jumps on the new and shiny stuff just because it looks cool or out of peer pressure. I learned early on in my career that if the tools you use do exactly what you need and do it well, there is no need to switch to the latest tools. Don't get me wrong, I try things and experiment with them but if at the end of the day I am not getting any more value than what I am getting out of my current tools, I keep using the tools I am familiar with. -->

Recently at my work we decided to move out of the current design system, Patternlab, and into a more modern one, Storybook. We also took this opportunity to look at other tools that could be replaced to improve our current front-end workflow. We had been using Gulp for a while as the build tool, and at a personal level, I have been using Gulp for almost 10 years. We knew swithing design systems would require us to change to a different build tool. We thought the obvious choice was Webpack, but as I looked deeper into build tools I discovered [ViteJS](https://vitejs.dev){target=_blank rel=noopener}.

Vite is considered the _Next Generation Frontend Tooling_, and during our testing we were extremely impressed not only with how fast it is, but also with its plugins ecosystem as well as its community support. Compared to other build tools, Vite is relatively new, but it has been around for a few years now and it has matured to the point I feel confident using it on any project I work on. I'll let you [read about Vite's features](https://vitejs.dev/guide/){target=_blank rel=noopener} on your own and how it compares to other build tools, but for now I am going to focus on building an automated workflow for a Drupal front-end environment or theme. Mind you, most of the things we'll cover apply to any project type, not just Drupal.

## Tasks to automate

Build tools like Vite make it possible to automate repeatitive tasks to run in the background without getting in the way of our work. Here are some of the tasks we will setup to run automatically:

* Compile, lint, concatenate, and minify code
* Optimize static assets such as images
* Copy assets such as CSS, JS, and Images from `/src` to `/dist`
* Watch for changes to code and automatically perform the appropriate tasks

### Watch task

One task we all are used to running while we work is the **watch** task. Being able to make changes to CSS, JS, and even Twig, then automatically compile our code is not only efficient but also productive.

Most of the work we will be doing today will be inside `vite.config.js` in combination with adding some extentions or packages in `package.json`.

* We will install two packages, **path** and **vite-plugin-watch-and-run** by running:

{% raw %}

```bash
npm i -D path vite-plugin-watch-and-run
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
