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
Recently at my place of work we made the decision to switch our current design system to Storybook. We knew switching design systems also meant switching front-end build tools. The obvious choice seemed to be Webpack, but as I looked deeper into build tools, I discovered [ViteJS](https://vitejs.dev){target=_blank rel=noopener}.

Vite is considered the _Next Generation Frontend Tooling_, and when tested, we were extremely impressed not only with how fast Vite is, but also with its plugins ecosystem and its community support. Vite is relatively new, but it is pretty solid and very well maintained. [Learn more about Vite](https://vitejs.dev/guide/){target=_blank rel=noopener}.

{% raw %}
<span class="callout">
<strong>NOTE</strong>: Most configurations covered in this post should work on any project type, not only Drupal.
</span>
{% endraw %}

## Setup the environment

In a [previous post](../building-a-modern-drupal-theme-with-storybook) I wrote in detail how to build a front-end environment with Vite, I am going to spare you those details here but you can refernce them from the original post. To keep things simple, we will keep Drupal out of the picture. We can integrate it later.

1. In your command line, navigate to the directory where you wish to build your environment
1. Run the following commands:

{% raw %}

```shell
npm create vite@latest storybook
cd storybook
npx storybook@latest init --type react
```

{% endraw %}

Fig. 1: The first command builds the Vite project, and the last one integrates Storybook into it.{.caption}

### Reviewing the out of the box Vite's & Storybook's scripts

Before we start writing tasks, let's take a look at the ones that Vite and Storybook include out the box. We may find that those tasks already do what we want or may only need minor tweaks to make them our own.

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

Fig. 2: Example of app tasks out of the box.{.caption}

To run any of those scripts append `npm run` and the name of the script, for example: `npm run build`, `npm run lint`, etc.
Let's take a quick look at each of the tasks.

* **dev**: This is a Vite-specific command which runs the Vite app we just build for local development
* **build**: This is the "do it all" command. Running `npm run build` on a project should run every task and build every part of your app. CI/CD runners run this command to build your full app for production. Run this command locally to build your app for the first time or after making configuration updates to your app.
* **lint**: Very self explanatory. In this case, this command will lint your JavaScript code as long as your files extensions are `.js` or `.jsx`.
* **preview**: This is also another Vite-specific command which runs your app in preview mode.
* **storybook**: This is the command you run to launch and keep Storybook running while you code.
* **build-storybok**: To build a static version of Storybook to package it and share it or to make it available on a server independently of your website.

The scripts or commands above are pretty standard in most front-end projects and we will keep most of them, but will probably change or extend what they do.

## Testing the commands

One thing that makes Vite different from other build tools is that it automatically names the compiled assets in such a way to help with caching issues. This may work well for you but in some cases, you may want to change this behavior as it will not work with Drupal since Drupal expects specific file names for your CSS and JavaScript.  Let's take a look by running the build command.

* In your command line, navigate to the **storybook** directory
* Run the build command:
{% raw %}

```bash
npm run build
```

{% endraw %}

In my case, the build command resulted in something like this:

![Output of build command](/images/blog-images/build.webp){.body-image .body-image--wide}

Fig. 4: Screenshot of files compiled by the build command with random string in name.{.caption .caption--center}

Notice how each file that was compiled and placed inside the `dist/assets/` directory has been named by adding a random 8 character string after the original file name and before the extension? The random string may change making its name very unpredictable. Vite is smart enough to dynamically update any references to these files even if their random string changes. However, if we were to create a Drupal library where we need to specify the path to our CSS or JS files, we need to know exactly what that name is and that the name will not change.  For this reason I made a configuration change to my app to ensure the filenames for CSS and JavaScript don't use the random string but instead keep their original name when placed inside the dist/assets directory.

* Open `vite.config.js` in your code editor
* Add these two imports directly after the last import

{% raw %}

```js
import path from 'path';
import { glob } from 'glob'
```

{% endraw %}

* Then add a build config to set a few critical settings:

{% raw %}

```js
  plugins: [react()],
  build: {
    emptyOutDir: true,
    minify: true,
    outDir: 'dist',
    rollupOptions: {
      input: glob.sync(path.resolve(__dirname,'src/**/**/*.css')),
      output: {
        assetFileNames: 'css/[name].css',
      },
    },
  },
```

{% endraw %}

Fig. 5: Build object to modify where files are rendered as well as their name preferences.{.caption}

* First we imported `path`, part of Vite, and `{ glob }`, an external extension, in order to be able to resolve our file's path and capture all CSS files together by globbing.
* Then we added a **build** configuration in which we defined several settings:
  * `emptyOutDir`: This means when the build job runs, the `dist` directory will be emptied before the new compiled code is added. This ensure any old code that no longer belongs, will be removed in favor of the new code.
  * `minify`: Self explanatory.
  * `outDir`: Defines what the App's output directory is.
  * `rollupOptions`: This is pretty powerful because you can include a lot of neat configuration in it:
    * `input`: The directory where we want Vite to look for our files. Here's where **path** and **glob** are being used. By using `src/**/**/*.css`, we are instructing Vite to look three directories deep inside the `src` directory, and find any file that ends with **.css**. You will see shortly why we did this.
    * `output`: The destination for where our CSS code will be compiled. In addition, we are telling Vite that our files should be placed inside `css`, which will automatically be created inside `dist` since this is our output directory, and the file names should retain their original names plus the extension. This allows the removal of the random 8 digit string from file names.

Now if we run `npm run build` again, the output should be similar to this:

![Second output of build command](/images/blog-images/build-after.webp){.body-image .body-image--wide}

Fig. 6: Screenshot of files compiled by the build command with original file names.{.caption .caption--center}

The random 8 character string is gone and notice that this time the build job is pulling CSS files from `src/stories` directory because we configured Vite to go a few levels deeper into the `src` directory.

## Project restructure

So far we've been working with Vite's and Storybook's default project structure, but we need update it to reflect the structure of a typical front-end or drupal theme project.



Let's quickly review the structure of our environment so we can more effectively plan for where source code will live and where production code will be compiled/copied into.

The project structure below only lists the most important files and directories.

{% raw %}

```md
> .storybook
> dist
> public
> src
package.json
vite.config.js
```

{% endraw %}

Fig. 3: Basic structure of a Vite project.{.caption}

* **> .storybook** is a key location for Storybook to store all its configuration files. We may interact with this directory and its files as part of this post.
* **> dist** is where all compiled code eventually is copied into. This directory is where your app or website looks for CSS, JS, Images, etc. when running in production. We  never edit or modify any code inside `dist`.
* **> public** is where we can store things like images we need to reference from our site. Similar to Drupal's `/sites/default/files/`.
* **> src** is where all the code we write is typically stored. Within this directory you will have all our components or patterns as well as CSs, and JS we are writing.
* **package.json** tracks all the different node packages we install for our app to run.
* **vite.config.js** is Vite's main configuration file. This is probably where we will spend most of our time.

## Let's start

For this post we will focus on the **watch** task (which does not yet exist), but is the one developers use the most while working on a project.
In general, a _watch_ task would normally **compile, lint, concatenate,** and **minify** code. In some cases it may also include things like copy assets from the `/src` directory to `/dist`. For more specific functions additional tasks can be created.

Most of the work we will be done in `vite.config.js` in combination with adding extentions in `package.json`.

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
