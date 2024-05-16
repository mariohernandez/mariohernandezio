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
Recently I worked on a large Drupal project that needed to migrate from Patternlab to Storybook. I knew switching design systems also meant switching front-end build tools. The obvious choice seemed to be Webpack, but as I looked deeper into build tools, I discovered [ViteJS](https://vitejs.dev){target=_blank rel=noopener}.

Vite is considered the _Next Generation Frontend Tooling_, and when tested, we were extremely impressed not only with how fast Vite is, but also with its plugins ecosystem and its community support. Vite is relatively new, but it is pretty solid and very well maintained. [Learn more about Vite](https://vitejs.dev/guide/){target=_blank rel=noopener}.

{% raw %}
<span class="callout">
<strong>NOTE</strong>: Most configurations covered in this post should work on any project type, not only Drupal.
</span>
{% endraw %}

This post is broken down in 3 parts. Part 1 focuses on these tasks:

1. [Seting up the Storybook environment](#setup)
1. [Testing the default build](#testing)
1. [Updating the project's structure](#updating)

## Setting up the environment {id=setup}

In a [previous post](../building-a-modern-drupal-theme-with-storybook), I wrote in detail how to build a front-end environment with Vite, I am going to spare you those details here but you can refernce them from the original post. To keep things simple, we will keep Drupal out of the picture. We can integrate it later.

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

After Storybook is installed, it should automatically launch in your default browser.

### Reviewing Vite's and Storybook's out of the box build scripts

Vite and Storybook ship with a handful of useful build scripts. We may find some of them already do what we want or may only need minor tweaks to make them our own.

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

To run any of those scripts prefix them with `npm run`. For example: `npm run build`, `npm run lint`, etc.
Let's review the scripts above.

* **dev**: This is a Vite-specific command which runs the Vite app we just build for local development
* **build**: This is the "do it all" command. Running `npm run build` on a project runs every task defined in the build job we will create later. CI/CD runners run this command to build your app for production. Run this command locally to build your app for the first time or after making configuration updates to your app.
* **lint**: Will lint your JavaScript code inside `.js` or `.jsx` files.
* **preview**: This is also another Vite-specific command which runs your app in preview mode.
* **storybook**: This is the command you run to launch and keep Storybook running while you code.
* **build-storybok**: To build a static version of Storybook to package it or share it, or to run it as a static version of your project.

The scripts or commands above are pretty standard in most front-end projects and we will keep most of them, but will probably change or extend what they do.

## Testing the commands {id=testing}

* In your command line, navigate to the **storybook** directory
* Run the build command:
{% raw %}

```bash
npm run build
```

{% endraw %}

Your returned output should look similar to this:

![Output of build command](/images/blog-images/build.webp){.body-image .body-image--narrow .body-image--left}

Fig. 4: Screenshot of files compiled by the build command.{.caption}

Vite compiles the CSS into `dist/assets/`, and names the files by appending a random 8 character string to the original file name. For a React/Vite app like ours, when the random string changes, Vite is smart enough to automatically and dynamically update any reference to the files. However, Drupal libraries expect CSS and JS file names to stay consistent and not change. Let's change Vite's original behavior so compiled assets are consistently named.

* Open `vite.config.js` in your code editor
* Add these two imports around line 3 or directly after the last import in the file

{% raw %}

```js
import path from 'path';
import { glob } from 'glob';
```

{% endraw %}

* Then add a build object where our tasks will be set:

{% raw %}

```js
  plugins: [react()],
  build: {
    emptyOutDir: true,
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

Fig. 5: Build object to modify where files are compiled as well as their name preferences.{.caption}

* First we imported `path` and `{ glob }`, both Vite's core features. We'll see these in action soon.
* Then we added a **build** configuration in which we defined several settings:
  * `emptyOutDir`: This means when the build job runs, the `dist` directory will be emptied before the new compiled code is added. This ensure any old code that no longer belongs, will be removed in favor of the new code.
  * `outDir`: Defines the App's output directory.
  * `rollupOptions`: This is Vite's system for bundleing code and within it we can include neat configurations:
    * `input`: The directory where we want Vite to look for our files. Here's where the **path** and **glob** imports we added earlier, are being used. By using `src/**/**/*.css`, we are instructing Vite to look three levels deep into the `src` directory, and find any file that ends with **.css**.
    * `output`: The destination for where our CSS code will be compiled (`dist/css`), and the file names should retain their original names. This allows the removal of the random 8 digit string from file names.

Now if we run `npm run build` again, the output should be similar to this:

![Second output of build command](/images/blog-images/build-after.webp){.body-image .body-image--wide .body-image--left}

Fig. 6: Screenshot of compiled code using the original file names.{.caption}

The random 8 character string is gone and notice that this time the build job is pulling more CSS files. Since we configured the input to go three levels deep, the `src/stories` directory was included as part of the input path.

## Updating the structure of the project {id=updating}

Let's quickly review the structure of the project as we need to make some changes to integrate an Atomic Design workflow. This means we will need to add a new directory structure. At a high level, the current structure is as follows:

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

Fig. 3: Basic structure of a Vite project listing only the most important parts.{.caption}

* **> .storybook** is the main location for Storybook's configuration.
* **> dist** is where all compiled code is copied into and where the production app looks for all code. We  never update any code inside `dist`.
* **> public** is where we can store images and other static assets we need to reference from our site. Similar to Drupal's `/sites/default/files/`.
* **> src** is the directory we work out of. We will update the structure of this directory next.
* **package.json** tracks all the different node packages we install for our app as well as the scripts we can run in our app.
* **vite.config.js** is Vite's main configuration file. This is probably where we will spend most of our time.

### Restructure the project

Now let's update the environment so it reflects the structure of a typical Drupal theme or front-end environment that uses an Atomic Design methodology.

* First stop Storybook from running by pressing **Ctrl + C** on your keyboard.
* Next, create a new directory inside **src**, called **patterns**.
* Inside **patterns**, create these directories: **base**, **components**, and **utilities**.
* Inside **components**, create these directories: **01-atoms**, **02-molecules**, **03-organisms**, **04-layouts**, and **05-pages**.

{% raw %}
<span class="callout">
<strong>NOTE</strong>: We will not use all these directories in this tutorial, but we created them siply to be aware of which folders you will ultimately need.
</span>
{% endraw %}

As our environment grows we will have components inside those folders, for now, download the following pre-built components:

* **01-atoms/button & title** [Download](https://github.com/mariohernandez/storybook/tree/variations/src/components/01-atoms){target=_blank rel=noopener}
* **02-molecules/card** [Download](https://github.com/mariohernandez/storybook/tree/variations/src/components/01-molecules){target=_blank rel=noopener}
* Save them all in their contentpart directories in your project.

## Configuring postCSS and TwigJS

With the project now restructured we can begin setting up the ground for processing CSS using postCSS and getting Storybook to understand Twig. Doing this will require the following tasks:

1. [Install the required node packages](#install-packages)
1. [Configure postCSS](#configure-postcss)
1. [Configure TwigJS](#configure-twigjs)
1. [Global CSS and JS workflow](#css-and-js-workflow)

### Install the required node packages {id=install-packages}

Now we are getting to the point where we will start interacting with CSS as well as Twig. For this reason, we need to install several node packages related to postCSS and Twig.

* In your command line and inside the **storybook** directory, run this very long command:

{% raw %}

```shell
npm i -D postcss postcss-import postcss-import-ext-glob postcss-nested postcss-preset-env html-react-parser twig twig-drupal-filters vite-plugin-twig-drupal
```

About half of those packages are for postCSS and the other half are for Twig. I'll try to describe each of the packages we just installed as we interact with them.

{% endraw %}

* At the root of the **storybook** directory, create a new file called **postcss.config.js**, and in it, add the following:

### Configure PostCSS {id=configure-postcss}

{% raw %}

```js
import postcssImport from 'postcss-import';
import postcssImportExtGlob from 'postcss-import-ext-glob';
import postcssNested from 'postcss-nested';
import postcssPresetEnv from 'postcss-preset-env';

export default {
  plugins: [
    postcssImportExtGlob(),
    postcssImport(),
    postcssNested(),
    postcssPresetEnv({
      stage: 4,
    }),
  ],
};
```

{% endraw %}

One really cool thing about Vite is that it comes with postCSS functionality built-in. This means that as long as a `postcss.config.js` file in the root of your project, Vite will take care of any plugins you may have added. Notice how we are not doing much configuration for those plugins except for defining them.

To review what we did above:

* `postcss-import` the base to be able to import CSS stylesheets into other stylesheets.
* `postcss-import-ext-glob` to define a single `@import` for all CSS content in a folder, versus individual imports for each file.
* `postcss-nested` makes it possible to nest in CSS the same way we typically do it in Sass.
* `postcss-preset-env` allows us to define the type of environment we need for CSS mostly around the type of browser support we need. [Stage 4](https://cssdb.org/#the-staging-process){target=_blank rel=noopener} means we want the "web standards" level of support.

Since we included a couple of components which were built in Twig, we also need to configure the environment with TwigJS. This will help Storybook understand Twig.

### Configure TwigJS {id=configure-twigjs}

* Inside `.storybook/preview.js`, move all existing content down, and at the very top of the file add the following:

{% raw %}

```js
import Twig from 'twig';
import twigDrupal from 'twig-drupal-filters';

function setupTwig(twig) {
  twig.cache();
  twigDrupal(twig);
  return twig;
}

setupTwig(Twig);
```

{% raw %}

The `twig` and `twig-drupal-filters` extensions make it possible for Storybook to first understand Twig code, and second also understand any Drupal filters we may use in Twig.

* Now open `vite.config.js` and override all of its content with the following:

{% raw %}

```js
/* eslint-disable */
import { defineConfig } from 'vite'
import { join } from 'node:path'
import twig from 'vite-plugin-twig-drupal';
import path from 'path';
import { glob } from 'glob'
import yml from '@modyfi/vite-plugin-yaml';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    twig({
      namespaces: {
        atoms: join(__dirname, './src/components/01-atoms'),
        molecules: join(__dirname, './src/components/02-molecules'),
        organisms: join(__dirname, './src/components/03-organisms'),
        layouts: join(__dirname, './src/components/04-layouts'),
        pages: join(__dirname, './src/components/05-pages'),
      },
    }),
    yml(),
  ],
  build: {
    emptyOutDir: true,
    outDir: 'dist',
    rollupOptions: {
      input: glob.sync(path.resolve(__dirname,'src/components/**/*.css')),
      output: {
        assetFileNames: 'css/[name].css',
      },
    },
    sourcemap: true,
    manifest: false,
  },
})
```

{% endraw %}

Since we are making several changes to the Vite configuration, it is easier to override everything and I can explain what was added.

* Added two new `import`s which are used by Storybook to understand Twig:

  * `vite-plugin-twig-drupal` handles transforming Twig files into Javascript functions.
  * `@modyfi/vite-plugin-yaml` let's us use `.yml` to provide demo data to our Twig components.

* Since we restructured our environment earlier, I updated the `rollupOptions` in the **build** object to reflect the new environment structure (`src/components/**/*.css`).
* Lastly, we added two new plugins: `twig` and `yml[]`:
  * In the **twig** plugin we redefined our namespaces to include all of the ones we anticipate.
  * The **yml()** plugin is simply to be able to pass demo data to our components using yml.

With all the configuration updates we just made, we need to rebuild the project in order for all the changes to take effect. Run the following commands (inside the **storybook** directory):

{% raw %}

```shell
npm run build
npm run storybook
```

{% endraw %}

If all was done properly, you should see the Button, Title, and Card components in Storybook. Great job! 🎉
If you don't see the expected components or got errors, please carefully review the instructions.

So the bulk of the work for our environment is done. Let's resume what we've accomplished thus far:

1. We built a new Vite project and integrated Storybook into it.
1. Updated the structure of the project so it works for our needs and requirements.
1. Configured Storybook so it understand Twig which our components are built with.
1. Implemented an automated workflow for compiling all CSS code

## What's next?

One thing most projects have the need for is copying static assets like images, icons, and other files from `src` into `dist`. Vite comes with built-in functionality to do this as long as you place those assets inside the `public` directory. However, sometimes we may have those assets alongside our components or other directories within our project.  Let's setup a quick task to do the copying when running the build command.

Like anything else in Vite, there are many ways to do one thing. In our case we will use a nice plugin called `vite-plugin-static-copy`. Let's set it up.

* In your command line and inside the **storybook** directory, install the plugin:

{% raw %}

```shell
npm i -D vite-plugin-static-copy
```

{% endraw %}

* Next, at the top of `vite.config.js`, right after all the existing imports, import our new extension:

{% raw %}

```js
import { viteStaticCopy } from 'vite-plugin-static-copy';
```

{% endraw %}

* Lastly, still in `vite.config.js`, add the plugin configuration inside the `plugins: []` array:

{% raw %}

```js
viteStaticCopy({
  targets: [{
    src: 'src/components/**/*.js',
    dest: 'js',
  },
  {
    src: 'src/components/**/*.{png,jpg,jpeg,svg,webp,mp4}',
    dest: 'images',
  }],
}),
```

{% endraw %}

We added two targets, one to copy JavaScript files from within our components directory into `dist/js`, and the other one to copy any type of image from our components directory into `dist/images`. As you can imagine you can add as many targets as needed.

If you run `npm run build`, any images or JS files inside any of your components will be copied into the respective directory in `dist`.

## Watch task

We have pretty much everything we planned for, done. However, so far if we want any of jobs we've configured to run, we need to run `npm run build`. This is great, but ideally, we want for those jobs to run automatically without us running a command. We can setup a watch plugin so every time we update any of the files we work on the appropriate tasks will run.  Let's do it.

Again, if you want to do something in Vite, there's an extension for that!  In this case, that extension is `vite-plugin-watch-and-run`. Just like we did before, we are going to first install the package, import it into our project, setup the cofiguration for it, and finally, create the watch task in package.json. This will be done in `vite.config.js`.

{% raw %}

```shell
npm i -D vite-plugin-watch-and-run
```

{% endraw %}

* Next, at the top of `vite.config.js`, right after all the existing imports, import our new extension:

{% raw %}

```js
import { watchAndRun } from 'vite-plugin-watch-and-run';
```

{% endraw %}

{% raw %}

```js
watchAndRun([
  {
    name: 'css',
    watchKind: ['add', 'change', 'unlink'],
    watch: path.resolve('src/components/**/*.css'),
    run: 'npm run vite:build',
    delay: 300,
  },
  {
    name: 'js',
    watchKind: ['add', 'change', 'unlink'],
    watch: path.resolve('src/components/**/*.js'),
    run: 'npm run vite:build',
    delay: 300,
  },
  {
    name: 'images',
    watchKind: ['add', 'unlink'],
    watch: path.resolve('src/components/**/*.{png,jpg,jpeg,svg,webp,mp4}'),
    run: 'npm run vite:build',
    delay: 300,
  },
]),
```

{% endraw %}

* Open `package.json` and within the **scripts** section, add the following:

{% raw %}

```json
"vite:build": "vite build",
"vite:watch": "vite build --watch",
"watch": "npm run vite:watch & npm run storybook:dev",
```

{% endraw %}

The new watch task above is actually a combination of two other tasks: `vite:watch` and `storybook:dev`.
When the new watch task is evoked (`npm run watch`), the following happens:

1. Vite runs with a **watch** flag which means it will stay running until it is manually stopped, and will listen for any changes to CSS, JS and images.
1. It will build Storybook and will launch it on your default browser.
1. When changes are saved, the watch task runs again and storybook automatically reflects the changes.

Let's briefly go over the configuration in **watchAndRun**:

* `name` is an arbitrary name you wish to assign to the task
* `watchKind` is the type of change (add, delete, and change). For the images task we only react to add and delete.
* `watch` is the task to run when changes occurred
* `run` is the command to run when changes do happen
* `delay` is a little pause from doing anything in the event that many files are added or removed at once.

## In closing

I realize this was a very long post, but I hope I was able cover the topic so it is useful to you. Automation in a font-end project is of essence to be productive and focus on the actual work, coding. There are so many ways to do everything I covered here and I challenge you to find better and more efficient ways. Until next time, thanks for visiting.



The components are available but are not styled despite the fact that each component contains a CSS stylesheet in its directory. The reason is we haven't told Storybook where those styles are and how to consume them.  Let's do that now.

We need to plan for worst-case scenario which is our component's catalog growing with tens of components. Ideally the system we put in place will automatically recognize new CSS and JS files as they are created.

{% raw %}

<span class="callout">
<strong>NOTE</strong>: This workflow is only for Storybook, for Drupal we will use Drupal libraries in which we will include any CSS/JS required for each component.
</span>

{% endraw %}

### Single stylesheet compiling

This should be a one-time setup and once in place and new stylesheets are created, they will automatically be included in our new workflow.

#### Global styles

* Inside **patterns/base**, create stylesheets related to base/global styles such as **reset.css**, **colors.css**, **typography.css**, etc.
* Inside **patterns/utilities**, create other stylesheets for utilities you will use as you code such as **layout.css**, **media-queries.css**, **z-index.css**, etc.

* Inside **src/patterns**, create two new stylesheets: `global.css` and `utils.css`.
* Inside **global.css**, add the following import:

{% raw %}

```css
@import-glob 'base/*.css';
```

{% endraw %}

* Inside **utils.css**, add the following import:

{% raw %}

```css
@import-glob 'utilities/*.css';
```

{% endraw %}

* Now, inside `.storybook/preview.js` add these imports somewhere after the existing imports. Don't worry, we will create `all.css` shortly.

{% raw %}

```js
// Imports all global and utilities CSS
import '../dist/css/global.css';
import '../dist/css/utils.css';

// Import all components CSS.
import '../dist/css/all.css';
```

{% endraw %}

Fig. 6: Snippet showing importing of all CSS inside preview.js.{.caption}

#### Components styles

* Inside **src/patterns/components**, create a new file called `all.css`
* Inside **all.css**, add the following imports:

{% raw %}

```css
@import-glob 'base/global.css';
@import-glob 'base/utilities.css';
@import-glob '01-atoms/**/*.css';
@import-glob '02-molecules/**/*.css';
@import-glob '03-organisms/**/*.css';
@import-glob '04-layouts/**/*.css';
@import-glob '05-pages/**/*.css';
```

{% endraw %}

Fig. 7: Snippet showing several CSS imports using a globbing approach.{.caption}

In the snippet above we are making use of the **postcss-import** and **postcss-import-ext-glob** plugins we installed earlier. Through globbing we are able to automatically capture any CSS stylesheets that exist in either of those directories.

### JavaScript compiling

For JavaScript, we don't need such an elaborate system since JS code is very little compared to CSS. For JS we actually import the components ***.js** files directly into the component where the JS is being used. The components we are using for this post don't use JS, but if you look inside `card.stories.jsx`, I have commented near the top of the file how the component's JS file would be imported if JS was needed.

### Build the project again

Now that our system for CSS and JS is in place, let's build the project to ensure everything is working as we expect it.

{% raw %}

```shell
npm run build
npm run storybook
```

{% endraw %}

You may notice that now the components in Storybook look styled. This tells us things are working and we can continue.

## Remaining sections of the post

* Create a task to copy assets
* Create tasks for linting code
* Redefine the Build command
* Create a new Watch task
