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

Topics covered in this post include:

1. [Seting up the Vite & Storybook environment](#setup)
1. [Building the app for the first time](#building-app)
1. [Updating the project's structure](#updating)
1. [Storybook's CSS configuration](#global-css)
1. [Configure postCSS & TwigJS](#postcss-twigjs)
1. [Copying static assets](#copying)
1. [Building a watch task](#watch)
1. [Linting CSS and JavaScript](#linting)

## Seting up the Vite & Storybook environment {id=setup}

In a [previous post](../building-a-modern-drupal-theme-with-storybook), I wrote in detail how to build a front-end environment with Vite, I am going to spare you those details here but you can refernce them from the original post.

1. In your command line, navigate to the directory where you wish to build your environment. If you're building a new Drupal theme, navigate to `web/themes/custom/`
1. Run the following commands:
    * After Storybook is installed, it should automatically launch in your default browser.

{% raw %}

```shell
npm create vite@latest storybook
cd storybook
npx storybook@latest init --type react
```

{% endraw %}

Fig. 1: The first command builds the Vite project, and the last one integrates Storybook into it.{.caption}

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
* **build**: This is the "do it all" command. Running `npm run build` on a project runs every task defined in the build job we will create later. CI/CD runners run this command to build your app for production.
* **lint**: Will lint your JavaScript code inside `.js` or `.jsx` files.
* **preview**: This is also another Vite-specific command which runs your app in preview mode.
* **storybook**: This is the command you run to launch and keep Storybook running while you code.
* **build-storybok**: To build a static version of Storybook to package it or share it, or to run it as a static version of your project.

Most commands above are pretty standard in most front-end projects, and we will keep most of them, but will change or extend what they do.

## Building your app for the first time {id=building-app}

* Stop Storybook by pressing **Ctrl + C**
* Run the build command:
{% raw %}

```bash
npm run build
```

{% endraw %}

Your returned output should look similar to this:

![Output of build command](/images/blog-images/build.webp){.body-image .body-image--narrow .body-image--left}

Fig. 4: Screenshot of files compiled by the build command.{.caption}

By default, Vite compiles the CSS into `dist/assets/`, and names the files by appending a random 8 character string to the original file name. For a React/Vite app like ours, when the random string changes, Vite is smart enough to automatically and dynamically update any reference to the files. However, Drupal libraries expect CSS and JS file names to stay consistent and not change. Let's change Vite's original behavior so compiled assets are consistently named.

* First, install the **glob** extension. We'll use this shortly to import multiple CSS files in a single import.

{% raw %}

```shell
npm i -D glob
```

{% endraw %}

* Then, open `vite.config.js` in your code editor. This is Vite's main configuration file.
* Add these two imports around line 3 or directly after the last import in the file

{% raw %}

```js
import path from 'path';
import { glob } from 'glob';
```

{% endraw %}

* Finally, add a build configuration in which we will make the configuration changes for compiling location and file names:

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

* First we imported `path` and `{ glob }`. **path** is part of Vite and **glob** was added by the extension we installed above.
* Then we added a **build** configuration in which we defined several settings:
  * `emptyOutDir`: When the build job runs, the `dist` directory will be emptied before the new compiled code is added. This ensure any old code that no longer belongs, will be removed in favor of the new code.
  * `outDir`: Defines the App's output directory.
  * `rollupOptions`: This is Vite's system for bundleing code and within it we can include neat configurations:
    * `input`: The directory where we want Vite to look for our files. Here's where the **path** and **glob** imports we added earlier, are being used. By using `src/**/**/*.css`, we are instructing Vite to look three levels deep into the `src` directory, and find any file that ends with **.css**.
    * `output`: The destination for where our CSS code will be compiled (`dist/css`), and the file names should retain their original names. This allows the removal of the random 8 digit string from file names.

Now if we run `npm run build` again, the output should be similar to this:

![Second output of build command](/images/blog-images/build-after.webp){.body-image .body-image--narrow .body-image--left}

Fig. 6: Screenshot of compiled code using the original file names.{.caption}

The random 8 character string is gone and notice that this time the build job is pulling more CSS files. Since we configured the input to go three levels deep, the **src/stories** directory was included as part of the input path.

## Updating the structure of the project {id=updating}

Let's quickly review the structure of the project. Our goal is to adopt the Atomic Design methodology for our component-driven development workflow. At a high level, this is the current structure:

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

Fig. 7: Basic structure of a Vite project listing only the most important parts.{.caption}

* **> .storybook** is the main location for Storybook's configuration.
* **> dist** is where all compiled code is copied into and where the production app looks for all code.
* **> public** is where we can store images and other static assets we need to reference from our site. Similar to Drupal's `/sites/default/files/`.
* **> src** is the directory we work out of. We will update the structure of this directory next.
* **package.json** tracks all the different node packages we install for our app as well as the scripts we can run in our app.
* **vite.config.js** is Vite's main configuration file. This is probably where we will spend most of our time.

### Restructure the project

Let's update the environment so it reflects the structure of a typical Drupal theme or front-end environment that uses an Atomic Design methodology.

* First stop Storybook from running by pressing **Ctrl + C** on your keyboard.
* Next, create a new directory inside **src**, called **patterns**.
* Inside **patterns**, create these directories: **base**, **components**, and **utilities**.
* Inside **components**, create these directories: **01-atoms**, **02-molecules**, **03-organisms**, **04-layouts**, and **05-pages**.
* While we're at it, delete the **stories** directory inside **src**, since we won't be using it.
* Also while at it, create a new file named **.nvmrc** in the root of your project
    * Inside `.nvmrc` add the following: `v20.12.2` (This is the node version the project uses).

{% raw %}
<span class="callout">
<strong>NOTE</strong>: We will not use all these directories in this tutorial, but we created them simply to be aware of which folders you will ultimately need.
</span>
{% endraw %}

### Add pre-built components

As our environment grows we will have components inside those folders, for now, download the following pre-built components so we have something to test our environment with:

* **01-atoms/button & title** [Download](https://github.com/mariohernandez/storybook/tree/variations/src/components/01-atoms){target=_blank rel=noopener}
* **02-molecules/card** [Download](https://github.com/mariohernandez/storybook/tree/variations/src/components/01-molecules){target=_blank rel=noopener}
* Save them all in their contentpart directories in your project. Now run:

{% raw %}

```shell
npm run build
npm run storybook
```

{% endraw %}

The components are available but are not styled despite the fact that each component contains a CSS stylesheet in its directory. The reason is we haven't told Storybook where those styles are and how to consume them.  Let's do that next.

## Storybook's CSS configuration {id=global-css}

To start, we will setup site-wide, or global styles, which should be available anywhere on the site. For components styles, ideally the system we put in place will automatically recognize the CSS as new components are added.

{% raw %}

<span class="callout">
<strong>NOTE</strong>: This workflow is only for Storybook, for Drupal we will use Drupal libraries in which we will include any CSS required for each component.
</span>

{% endraw %}

### Global styles

* Inside **patterns/base**, Add these pre-built **reset.css** and **styles.css** stylesheets. Going forward, this will be the place for creating styles for colors, typography, etc.
* Inside **patterns/utilities** is where you will add stylesheets for different utilities we may use such as media-queries, grid, backgrounds, etc.

* Inside **src/patterns**, create a new stylesheet called `global.css`.
* Inside **global.css**, add the following imports:

{% raw %}

```css
@import 'base/reset.css';
@import 'base/base.css';
@import-glob 'base/*.css';
@import-glob 'utilities/*.css';
```

{% endraw %}

The order in which we have imported our stylesheets is on purpose as the cascading order in which the styles load makes a difference. We start from `reset`, `base`, and `utilities`.

* `reset.css` removes any browser inconsistencies to ensure all browsers start at the same plain level field before any of our styles are applied.
* `base.css` contains all the site's base styles such as typography, branding and colors, etc.
* `base/*.css` contains other special base-related styles.
* `utilities/*.css` are all custom utilities we use as we style elements such as spacing, sizing, z-index, etc.
* Lastly, all other styles come next such as components, layouts, etc.

### Updating Storybook's Preview

The best place for CSS Styles to be available while we build or update components is in **.storybook/preview.js**.

* Inside `.storybook/preview.js` add these imports somewhere after the existing imports.

{% raw %}

```js
// Imports all global and utilities CSS
import '../dist/css/global.css';
import '../dist/css/utils.css';

// Import all components CSS.
import '../dist/css/components.css';
```

{% endraw %}

Fig. 6: Snippet showing importing of all CSS inside preview.js.{.caption}

* Inside `src/patterns/`, create a new stylesheet named **components.css**.
* Inside `components.css` add the following imports:

{% raw %}

```css
@import-glob './components/01-atoms/**/*.css';
@import-glob './components/02-molecules/**/*.css';
@import-glob './components/03-organisms/**/*.css';
@import-glob './components/04-layouts/**/*.css';
@import-glob './components/05-pages/**/*.css';
```

{% endraw %}

Fig. 10: Glob-importing all component's stylesheets.{.caption}

In the snippet above we are making use of the **postcss-import** and **postcss-import-ext-glob** extensions we installed earlier.

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

## Configuring postCSS and TwigJS {id=postcss-twigjs}

With the project now restructured we can begin setting up the ground for processing CSS using postCSS and getting Storybook to understand Twig.

### Install the required node packages {id=install-packages}

As we start interacting with CSS as well as Twig, we need to install several node packages to enable functionality we would not have otherwise. In the interest of time, let's install them all at once.

* In your command line and inside the **storybook** directory, run this very long command:

{% raw %}

```shell
npm i -D postcss postcss-import postcss-import-ext-glob postcss-nested postcss-preset-env html-react-parser twig twig-drupal-filters vite-plugin-twig-drupal @modyfi/vite-plugin-yaml vite-plugin-twig-drupal
```

{% endraw %}

Fig. 8: A long list of node packages that allow postCSS and Twig functionality in Storybook.{.caption}

About half of those packages are for postCSS and the other half are for Twig. I'll try to describe them as we interact with them.

### Configure PostCSS {id=configure-postcss}

Native CSS has come a long way to the point that I am no longer using Sass as a CSS preprocessor. Plain CSS and postCSS can do almost everything I used to only be able to do with Sass.  So far this has worked great for me.

* At the root of the **storybook** directory, create a new file called `postcss.config.js`, and in it, add the following:

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

Fig. 9: Base configuration for postCSS.{.caption}

One really cool thing about Vite is that it comes with postCSS functionality built-in. As long as a `postcss.config.js` file exists in the root of your project, Vite will take care of any plugins you may have added. Notice how we are not doing much configuration for those plugins except for defining them. Let's review the code above:

* `postcss-import` the base for importing CSS stylesheets.
* `postcss-import-ext-glob` to do bulk `@import` of all CSS content in a folder, versus individual imports for each file.
* `postcss-nested` makes it possible to nest in CSS.
* `postcss-preset-env` defines the CSS browser support level we need. [Stage 4](https://cssdb.org/#the-staging-process){target=_blank rel=noopener} means we want the "web standards" level of support.

### Configure TwigJS {id=configure-twigjs}

Now we need to configure the environment with TwigJS. This will help Storybook understand Twig.

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

Fig. 10: Configuration to enable TwigJS in Storybook.{.caption}

The configuration above is simply setting up a function with `twig` and `twig-drupal-filters` to make it possible for Storybook to understand Twig code, and also understand Drupal filters we may use.

### Creating Twig namespaces and enable YML

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
        atoms: join(__dirname, './src/patterns/components/01-atoms'),
        molecules: join(__dirname, './src/patterns/components/02-molecules'),
        organisms: join(__dirname, './src/patterns/components/03-organisms'),
        layouts: join(__dirname, './src/patterns/components/04-layouts'),
        pages: join(__dirname, './src/patterns/components/05-pages'),
      },
    }),
    yml(),
  ],
  build: {
    emptyOutDir: true,
    outDir: 'dist',
    rollupOptions: {
      input: glob.sync(path.resolve(__dirname,'./src/patterns/components/**/*.css')),
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

Fig. 11: Adding Twig namespaces to use when nesting components.{.caption}

Since we are making several changes to the Vite configuration, it is easier to override everything and I can explain what was added.

* I added two new `import`s which are used by Storybook to understand Twig:

  * `vite-plugin-twig-drupal` handles transforming Twig files into Javascript functions.
  * `@modyfi/vite-plugin-yaml` let's us pass demo data and variables in **YML** format to our Twig components.

* Since we restructured our environment earlier, I updated the `rollupOptions` in the **build** object to reflect the new environment structure (`./src/patterns/components/**/*.css`).
* Lastly, we added Twig namespaces, one for each of the directories we created earlier, (`@atoms`, `@molecules`, etc.).

With all the configuration updates we just made, we need to rebuild the project in order for all the changes to take effect. Run the following commands (inside the **storybook** directory):

{% raw %}

```shell
npm run build
npm run storybook
```

{% endraw %}

If all was done properly, you should see the Button, Title, and Card components in Storybook. Great job! 🎉
If you don't see the expected components or got errors, please carefully review the instructions and make any needed corrections.

The bulk of the work for our environment is done, but we're only halfway there. Let's quickly review what we've accomplished thus far:

1. We built a new Vite project and integrated Storybook into it.
1. Updated the structure of the project so it works for our needs and requirements.
1. Configured Storybook so it understand Twig which our components are built with.
1. Updated the CSS compiling process to generate consistent file names.

The second half of this post will focus on creating specific task for copying static assets, building a watch task, and finally linting our code.

## Copying static assets {id=copying}

One thing most projects have the need for is copying static assets like images, icons, and other files from `src` into `dist`. Vite comes with built-in functionality to do this as long as you place those assets inside the `public` directory. However, sometimes we may have those assets alongside our components or other directories within our project.  Let's setup a quick task to do the copying when running the build command.

Like anything else in Vite, there is more than one way to do something. In our case we will use a nice plugin called `vite-plugin-static-copy`. Let's set it up.

* In your command line and inside the **storybook** directory, install the extension:

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
    src: './src/patterns/components/**/*.js',
    dest: 'js',
  },
  {
    src: './src/patterns/components/**/*.{png,jpg,jpeg,svg,webp,mp4}',
    dest: 'images',
  }],
}),
```

{% endraw %}

Fig. 12: Adds tasks for copying JavaScript and Images from src to dist.{.caption}

We added two targets inside the `viteStaticCopy` function, one to copy JavaScript files from within our components directory into `dist/js`, and the other one to copy images from our components directory into `dist/images`. As you can imagine you can add as many targets as needed. We don't need to specify a target for copying CSS files since this is already being done as part of the default build command.

If you run `npm run build`, any images or JS files inside any of your components will be copied into the respective directory in `dist`.

## Building a watch task {id=watch}

So far if we want any of the tasks we've configured to run, we need to run `npm run build`. Ideally, we want for those tasks to run automatically as we work on the project without us running a command. We can setup a watch task so every time we update any of the files we work on the task will be triggered and run.

Again, if you want to do something in Vite, there's an extension for that!  In this case, that extension is `vite-plugin-watch-and-run`. You know the drill.

{% raw %}

```shell
npm i -D vite-plugin-watch-and-run
```

{% endraw %}

* At the top of `vite.config.js`, right after all the existing imports, import our new extension:

{% raw %}

```js
import { watchAndRun } from 'vite-plugin-watch-and-run';
```

{% endraw %}

* Next, still inside `vite.config.js`, add the following plugin anywhere within the `plugins: []` array:
{% raw %}

```js
watchAndRun([
  {
    name: 'css',
    watchKind: ['add', 'change', 'unlink'],
    watch: path.resolve('./src/patterns/components/**/*.css'),
    run: 'npm run vite:build',
    delay: 300,
  },
  {
    name: 'js',
    watchKind: ['add', 'change', 'unlink'],
    watch: path.resolve('./src/patterns/components/**/*.js'),
    run: 'npm run vite:build',
    delay: 300,
  },
]),
```

{% endraw %}

Fig. 14: Configuration for CSS and JS watch task.{.caption}

* Finally, open `package.json` and within the **scripts** section, add the following:

{% raw %}

```json
"vite:watch": "vite build --watch",
"watch": "npm run vite:watch & npm run storybook",
```

{% endraw %}

Fig. 15: Two new npm commands for linting code.{.caption}

The new watch task above is actually a combination of two other tasks: `vite:watch` and `storybook`.

Let's briefly go over the configuration in **watchAndRun**:

* `name` is an arbitrary name you wish to assign to the task
* `watchKind` is the type of change (add, delete, and change).
* `watch` is the path to watch for changes
* `run` is the command to run when changes do happen
* `delay` is a little pause from doing anything in the event that many files are added or removed at once.

When the new watch task is evoked (`npm run watch`), the following happens:

1. Vite build runs with a **--watch** flag which will stay running until it is manually stopped, and will listen for any changes to CSS and JS.
1. It will build Storybook and will launch it on your default browser.
1. When changes are saved, the watch task recompiles the code and storybook does a Hot Module Reload, or HMR, to reflect the changes.

## Linting CSS and JavaScript {id=linting}

Our workflow is coming along nicely. There are many other things we can do but for now, we will end with one last task: CSS and JS linting.

* Install the required packages

{% raw %}

```shell
npm i -D eslint stylelint vite-plugin-checker stylelint-config-standard stylelint-order stylelint-selector-pseudo-class-lvhfa
```

{% endraw %}

* Next, after the last import in `vite.config.js`, add one more:

{% raw %}

```js
import checker from 'vite-plugin-checker';
```

{% endraw %}

* Then, let's add one more plugin anywhere inside the `plugins: []` array:

{% raw %}

```js
checker({
  eslint: {
    lintCommand: 'eslint "./src/patterns/components/**/*.{js,jsx}"',
  },
  stylelint: {
    lintCommand: 'stylelint "./src/patterns/components/**/*.css"',
  },
}),
```

{% endraw %}

Fig. 16: Checks for linting CSS and JavaScript.{.caption}

* Finally, let's add two new commands to `package.json` to be able to execute the checks above on demand:

{% raw %}

```json
"eslint": "eslint --ext .js,.jsx,.ts,.tsx .",
"stylelint": "stylelint './src/patterns/components/**/*.css'",
```

{% endraw %}

Fig. 17: Two new npm commands to lint CSS and JavaScript.{.caption}

* We installed a series of packages related to ESLint and Stylelint.
* `vite-plugin-checker` is a plugin that can run TypeScript, VLS, vue-tsc, ESLint, and Stylelint in worker thread.
* We imported `vite-plugin-checker` and also created a new plugin with two checks, one for ESLint and the other for Stylelint.
* By default the new checks will run when we execute `npm run build`, but we also added them as individual commands so we can run them on demand.

To test all the functionality we've implemented, run the commands below and then try updating any of the CSS in the project to ensure the changes are reflected in Storybook. You could also try writing bad CSS or JS to see the linters warning you about the errors.

{% raw %}

```shell
npm run build
npm run watch
```

{% endraw %}


## In closing

I realize this was a very long post, but I hope you found it useful. Automation in a font-end project is an essential part to be productive and focus on the actual work, coding. There are many ways to do everything I covered here and I challenge you to find better and more efficient ways. For now, thanks for visiting.

## Remaining sections of the post

* Create a task to copy assets
* Create tasks for linting code
* Redefine the Build command
* Create a new Watch task
* Add `.nvmrc`
* Add `.eslintrc` & `.stylelint.yml`
