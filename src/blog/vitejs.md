---
date: "2024-05-20"
title: "Automating your Drupal Front-end with ViteJS"
tags: ['drupal','front-end']
draft: false
featured: true
featuredImage: "/images/switch.webp"
featuredImageAlt: "Digital on/off switch over a purple gradient"
imageThumb: "/images/thumbs/switch-thumb.webp"
featuredImageCredit: "Joshua Reddekopp"
featuredImageCreditUrl: "https://unsplash.com/@joshuaryanphoto"
summary: "If you are searching for the next front-end build tool for your Drupal project, or any project, you need to try ViteJS. "
---
For the past almost 10 years my front-end build tool of choice has been GulpJS. During this time I have worked on Drupal and non-Drupal project of all sizes and Gulp has always delivered. Recently at my place of work we made the decision to switch our current design system to Storybook. We knew switching design systems also meant switching front-end build tools. The obvious choice seemed to be Webpack, but as I looked deeper into build tools, I discovered [ViteJS](https://vitejs.dev){target=_blank rel=noopener}.

Vite is considered the _Next Generation Frontend Tooling_, and when tested, we were extremely impressed not only with how fast Vite is, but also with its plugins ecosystem and its community support. Vite is relatively new, as it has only been around for about four years at the time of this post, but it has matured and it's maintained by a very active team and community.
Feel free to [read all about Vite](https://vitejs.dev/guide/){target=_blank rel=noopener} on your own, but for now I am going to focus on building an automated workflow for a Drupal theme. Mind you, most of the things covered in this post apply to any project type, not just Drupal.

## Setup the environment

In a [previous post](../building-a-modern-drupal-theme-with-storybook) I wrote in detail how to build a front-end environment with Vite, I am going to spare you those details here as you can refernce them from the original post. To keep things simple, we will keep Drupal out of the picture. We can integrate it later.

1. In your command line, navigate to the directory where you wish to build your environment
1. Run the following commands:

{% raw %}

```shell
npm create vite@latest storybook

npx storybook@latest init --type react
```

{% endraw %}

The first command builds the Vite project, and the second command integrates Storybook into it.{.caption}

### Review out of the box Vite's & Storybook's scripts

We're about to automate several tasks to be a more efficient developer, but before we do, let's take a look at the tasks that Vite and Storybook include out the box. We may find that those tasks already do what we want or may need minor tweaks to make them our own.

* In your code editor, open `package.json` from your newly built project.
* Look in the **scripts** section and you should see something similar to this:

{% raw %}

```shell
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
  "preview": "vite preview",
  "storybook": "storybook dev -p 6006",
  "build-storybook": "storybook build"
},
```

{% endraw %}

To run any of those scripts append `npm run` and the name of the script, for example: `npm run build`, `npm run lint`, etc.
A quick description about each of the scripts above. They're pretty standard in most front-end projects.

* **dev**: This is a Vite-specific command which runs the Vite app we just build for local development
* **build**: This is the "do it all" command. Running `npm run build` on a project should run every task and build every part of your app. CI/CD runners run this command to build your full app for production. Run this command locally to build your app for the first time or after making configuration updates to your app.
* **lint**: Very self explanatory. In this case, this command will lint your JavaScript code as long as your files extensions are `.js` or `.jsx`.
* **preview**: This is also another Vite-specific command which runs your app in preview mode.
* **storybook**: This is the command you run to launch and keep Storybook running while you code.
* **build-storybok**: To build a static version of Storybook to package it and share it or to make it available on a server independently of your website.

## Tasks to automate

Build tools like Vite make it possible to automate repeatitive tasks to run in the background without getting in the way of our work. At the end of this post, our automated workflow will be able to perform the following tasks:

* Watch, compile, lint, concatenate, and minify code
* Optimize static assets such as images
* Copy assets such as CSS, JS, and Images from `/src` to `/dist`

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
