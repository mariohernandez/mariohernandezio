---
date: "2024-05-28"
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
Recently I worked on a large Drupal project that needed to migrate its design system from Patternlab to Storybook. I knew switching design systems also meant switching front-end build tools. The obvious choice seemed to be Webpack, but as I looked deeper into build tools, I discovered [ViteJS](https://vitejs.dev){target=_blank rel=noopener}.

Vite is considered the _Next Generation Frontend Tooling_, and when tested, we were extremely impressed not only with how fast Vite is, but also with its plugins ecosystem and its community support. Vite is relatively new, but it is pretty solid and very well maintained. [Learn more about Vite](https://vitejs.dev/guide/){target=_blank rel=noopener}.

{% raw %}
<span class="callout">
<strong>NOTE</strong>: Most configurations covered in this post should work on any project type, not only Drupal.
</span>
{% endraw %}

The topics covered in this post can be broken down in two categories:

1. Building the front-end environment
    * [Setup the front-end environment with Vite & Storybook](#setup)
    * [Restructure the project](#restructure)
    * [Configure TwigJS](#configure-twigjs)
    * [Configure postCSS](#configure-postcss)
    * [Storybook's CSS configuration](#global-css)

1. Automating the workflow
    * [Copying static assets](#copying)
    * [Building a watch task](#watch)
    * [Linting CSS and JavaScript](#linting)

## 1. Setup the front-end environment with Vite & Storybook {id=setup}

In a [previous post](../building-a-modern-drupal-theme-with-storybook), I wrote in detail how to build a front-end environment with Vite and Storybook, I am going to spare you those details here but you can refernce them from the original post.

1. In your command line, navigate to the directory where you wish to build your environment. If you're building a new Drupal theme, navigate to `web/themes/custom/`
1. Run the following commands (Storybook will launch automatically):

{% raw %}

```shell
npm create vite@latest storybook
cd storybook
npx storybook@latest init --type react
```

{% endraw %}

Fig. 1: The first command builds the Vite project, and the last one integrates Storybook into it.{.caption}

### Reviewing Vite's and Storybook's out of the box build scripts

Vite and Storybook ship with a handful of useful scripts. We may find some of them already do what we want or may only need minor tweaks to make them our own.

* In your code editor, open `package.json` from the root of your newly built project.
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

Fig. 2: Example of default Vite and Storybook scripts out of the box.{.caption}

To run any of those scripts prefix them with `npm run`. For example: `npm run build`, `npm run lint`, etc. Let's review the scripts.

* **dev**: This is a Vite-specific command which runs the Vite app we just build for local development
* **build**: This is the "do it all" command. Running `npm run build` on a project runs every task defined in the build configuration we will do later. CI/CD runners run this command to build your app for production.
* **lint**: Will lint your JavaScript code inside `.js` or `.jsx` files.
* **preview**: This is also another Vite-specific command which runs your app in preview mode.
* **storybook**: This is the command you run to launch and keep Storybook running while you code.
* **build-storybok**: To build a static version of Storybook to package it or share it, or to run it as a static version of your project.

### Building your app for the first time

* Stop Storybook by pressing **Ctrl + C** in your keyboard
* Run the build command:
{% raw %}

```bash
npm run build
```

{% endraw %}

The output in the command line should look similar to this:

![Output of build command](/images/blog-images/build.webp){.body-image .body-image--narrow .body-image--left}

Fig. 3: Screenshot of files compiled by the build command.{.caption}

By default, Vite names the compiled files by appending a random 8 character string to the original file name. This works fine for Vite apps, but for Drupal, the libraries we'll create expect for CSS and JS file names to stay consistent and not change. Let's update this default behavior.

* First, install the **glob** extension. We'll use this shortly to import multiple CSS files with a single import statement.

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

* Finally, add a build configuration object with new settings for file names:

{% raw %}

```js
  plugins: [react()],
  build: {
    emptyOutDir: true,
    outDir: 'dist',
    rollupOptions: {
      input: glob.sync(path.resolve(__dirname,'src/**/*.css')),
      output: {
        assetFileNames: 'css/[name].css',
      },
    },
  },
```

{% endraw %}

Fig. 4: Build object to modify where files are compiled as well as their name preferences.{.caption}

* First we imported `path` and `{ glob }`. **path** is part of Vite and **glob** was added by the extension we installed earlier.
* Then we added a **build** configuration object in which we defined several settings:
  * **emptyOutDir**: When the build job runs, the **dist** directory will be emptied before the new compiled code is added.
  * **outDir**: Defines the App's output directory.
  * **rollupOptions**: This is Vite's system for bundleing code and within it we can include neat configurations:
    * **input**: The directory where we want Vite to look for our files. Here's where the **path** and **glob** imports we added earlier are being used. By using `src/**/**/*.css`, we are instructing Vite to look three levels deep into the **src** directory, and find any file that ends with **.css**.
    * **output**: The destination for where our CSS code will be compiled (**dist/css**), and the file names should retain their original names (`assetFileNames: 'css/[name].css'`). This allows the removal of the random 8 digit string from file names.

Now if we run `npm run build` again, the output should be similar to this:

![Second output of build command](/images/blog-images/build-after.webp){.body-image .body-image--narrow .body-image--left}

Fig. 5: Screenshot of compiled code using the original file names.{.caption}

The random 8 character string is gone and notice that this time the build job is pulling more CSS files. Since we configured the input to go three levels deep, the **src/stories** directory was included as part of the input path.

## 2. Restructure the project {id=restructure}

The out of the box Vite project structure is a good start for us. However, we need to make some adjustments so we can adopt the Atomic Design methodology. This is today's standards and will work well with our component-driven development workflow. At a high level, this is the current project structure:

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

Fig. 6: Basic structure of a Vite project listing only the most important parts.{.caption}

* **> .storybook** is the main location for Storybook's configuration.
* **> dist** is where all compiled code is copied into and where the production app looks for all code.
* **> public** is where we can store images and other static assets we need to reference from our site. Similar to Drupal's `/sites/default/files/`.
* **> src** is the directory we work out of. We will update the structure of this directory next.
* **package.json** tracks all the different node packages we install for our app as well as the scripts we can run in our app.
* **vite.config.js** is Vite's main configuration file. This is probably where we will spend most of our time.

### Adop Atomic Design methodology

* First stop Storybook from running by pressing **Ctrl + C** in your keyboard.
* Next, inside **src**, create these directories: **base**, **components**, and **utilities**.
* Inside **components**, create these directories: **01-atoms**, **02-molecules**, **03-organisms**, **04-layouts**, and **05-pages**.
* While we're at it, delete the **stories** directory inside **src**, since we won't be using it.
* Also, create a new file named **.nvmrc** (notice the dot), in the root of your project.
  * Inside `.nvmrc` add the following: `v20.13.1` (This is the node version the project uses). This ensures everyone working in the project uses the same NodeJS version.
  * Run `nvm install` to begin using the new node version.

{% raw %}

<span class="callout">
<strong>NOTE</strong>: We will not use all these directories in this tutorial, but we created them simply to inform you of the typical directories you will need.
</span>

{% endraw %}

### Add pre-built components

As our environment grows we will have components inside the new directories, but for now, we will add pre-built components to have something to test our environment with:

* [Download](https://github.com/mariohernandez/storybook/tree/variations/src/components/01-atoms){target=_blank rel=noopener} the **button** and **title** atoms
* [Download](https://github.com/mariohernandez/storybook/tree/variations/src/components/01-molecules){target=_blank rel=noopener} the **card** molecule
* Feel free to add any other components you may have built yourself. Save them all in their contentpart directories in your project.

{% raw %}

## 3. Configure TwigJS {id=configure-twigjs}

Before we can see the newly added components, we need to configure Storybook to understands the Twig and YML code we are about to introduce.  To do this we need to install several node packages.

* From your command line and within the Storybook directory, run:
{% raw %}

```shell
npm i -D vite-plugin-twig-drupal @modyfi/vite-plugin-yaml twig twig-drupal-filters html-react-parser
```

{% endraw %}

* Next, update `vite.config.js` with the following configuration. Add the new imports at around line 5:

{% raw %}

```js
import Twig from 'twig';
import twig from 'vite-plugin-twig-drupal';
import yml from '@modyfi/vite-plugin-yaml';
import twigDrupal from 'twig-drupal-filters';
import { join } from 'node:path';

function setupTwig(twig) {
  twig.cache();
  twigDrupal(twig);
  return twig;
}

setupTwig(Twig);
```

{% endraw %}

Fig. 5: TwigJS related packages and Drupal filters function.{.caption}

The configuration above is critical for Storybook to understand the code in our components:

* `vite-plugin-twig-drupal`, is the main TwigJS extension for our project.
* Added two new `import`s which are used by Storybook to understand Twig:
  * `vite-plugin-twig-drupal` handles transforming Twig files into Javascript functions.
  * `@modyfi/vite-plugin-yaml` let's us pass data and variables through **YML** to our Twig components.

### Creating Twig namespaces

* Still in `vite.config.js`, Add the **twig** plugin below which includes Twig namesapces. These are only for Storybook:

{% raw %}

```js
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
```

{% endraw %}

Fig. 6: Twig namespaces reflecting project restructure.{.caption}

* Finally, since we updated our project structure earlier, let's update the **rollupOptions** within the Twig build object configuration:

{% raw %}

```js
  build: {
    emptyOutDir: true,
    outDir: 'dist',
    rollupOptions: {
      input: glob.sync(path.resolve(__dirname,'./src/components/**/*.css')),
      output: {
        assetFileNames: 'css/[name].css',
      },
    },
  },
```

{% endraw %}

Fig. 7: Twig plugin with updated input path.{.caption}

With all the configuration updates we just made, we need to rebuild the project in order for all the changes to take effect. Run the following commands (inside the **storybook** directory):

{% raw %}

```shell
npm run build
npm run storybook
```

{% endraw %}

The components are available but as you can see, they are not styled despite the fact that each component contains a CSS stylesheet in its directory. The reason is Storybook has not been configured to find the component's CSS. We'll fix this later.

## 4. Configure postCSS {id=configure-postcss}

What is PostCSS? It is a JavaScript tool or transpiler that turns a special PostCSS plugin syntax into Vanilla CSS.

As we start interacting with CSS, we need to install several node packages to enable functionality we would not have otherwise. Native CSS has come a long way to the point that I no longer use Sass as a CSS preprocessor.

* In your command line and inside the **storybook** directory, run this command:

{% raw %}

```shell
npm i -D postcss postcss-import postcss-import-ext-glob postcss-nested postcss-preset-env
```

{% endraw %}

Fig. 8: A list of node packages that allow postCSS functionality in Storybook.{.caption}

* At the root of the **storybook** directory, create a new file called **postcss.config.js**, and in it, add the following:

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

One really cool thing about Vite is that it comes with postCSS functionality built-in. The only requirement is that you have a `postcss.config.js` file in the project's root. Notice how we are not doing much configuration for those plugins except for defining them. Let's review the code above:

* `postcss-import` the base for importing CSS stylesheets.
* `postcss-import-ext-glob` to do bulk `@import` of all CSS content in a directory.
* `postcss-nested` to unwrap nested rules to make its syntax closer to Sass.
* `postcss-preset-env` defines the CSS browser support level we need. [Stage 4](https://cssdb.org/#the-staging-process){target=_blank rel=noopener} means we want the "web standards" level of support.

## 5. Storybook's CSS configuration {id=global-css}

The goal here is to ensure that every time a new CSS stylesheet is added to the project, Storybook will automatically be aware and begin consuming the CSS.

{% raw %}

<span class="callout">
<strong>NOTE</strong>: This workflow is only for Storybook. In Drupal we will use Drupal libraries in which we will include any CSS required for each component.
</span>

{% endraw %}

### Global styles

* Inside **src/base**, add these pre-built **reset.css** and **base.css** stylesheets.
* Inside **src/**, create a new stylesheet called `styles.css`.
* Inside **styles.css**, add the following imports:

{% raw %}

```css
@import-glob 'base/**/*.css';
@import-glob 'utilities/*.css';
@import-glob 'components/components.css';
```

{% endraw %}

Fig. 10: Imports to gather all global styles.{.caption}

The order in which we have imported our stylesheets is important as the cascading order in which the styles load makes a difference. We start from `reset`, `base`, `utilities`, and then components.

* `reset.css`: A reset stylesheet (or CSS reset) is a collection of CSS rules used to clear the browser's default formatting of HTML elements, removing potential inconsistencies between different browsers before any of our styles are applied.
* `base.css`: CSS Base applies a style foundation for HTML elements that is consistent for baseline styles such as typography, branding and colors, font-sizes, etc.
* `utilities/*.css`: Are a collection of pre-defined CSS rules to accomplish a specific style or task. For example, margins, sizes, z-index, animations, media queries, etc.
* Lastly, components styles are specific to each component. This ensures styles don't leak into other areas or components where they don't belong.

### Updating Storybook's Preview

For Storybook to have access to all our styles, we can import base or global styles so they are available througout storybook when we are looking at any component. Let's apply these styles now.

* In `.storybook/preview.js` add these imports somewhere after the existing imports.

{% raw %}

```js
// Imports all global and utilities CSS
import '../dist/css/global.css';
import '../dist/css/utils.css';

// Import all components CSS.
import '../dist/css/components.css';
```

{% endraw %}

Fig. 11: Snippet showing importing of all CSS inside preview.js.{.caption}

* Inside `src/components/`, create a new stylesheet called **components.css**.
* Inside `components.css` add the following imports:

{% raw %}

```css
@import-glob './01-atoms/**/*.css';
@import-glob './02-molecules/**/*.css';
@import-glob './03-organisms/**/*.css';
@import-glob './04-layouts/**/*.css';
@import-glob './05-pages/**/*.css';
```

{% endraw %}

Fig. 12: Glob-importing all component's stylesheets.{.caption}

Again, order does matter. In the snippet above we are making sure all atoms styles are loaded first, followed by molecules, organisms, etc.

### JavaScript compiling

For JavaScript, we don't need such an elaborate system since JS code is very little compared to CSS. For JS we actually import the components ***.js** files directly into the component where the JS is being used. The components we are using for this post don't use JS, but if you look inside `card.stories.jsx`, I have commented near the top of the file how the component's JS file would be imported if JS was needed.

If the need for a more automated JavaScript processing workflow arose, we could easily integrate JS into one of the task we are building in this post.

### Build the project again

Now that our system for CSS and JS is in place, let's build the project to ensure everything is working as we expect it.

{% raw %}

```shell
npm run build
npm run storybook
```

{% endraw %}

You may notice that now the components in Storybook look styled. This tells us our new system is working as expected.

**This concludes the preparation part of this post. The remaining part will focus on creating automation tasks for compiling, minifying and linting code, copying static assets such as images, and finally, watching for code changes as we code.  Let's start**.

## 6. Copying static assets {id=copying}

Copying static assets like images, icons, JS, and other files from `src` into `dist` is a pretty common practice in front-end projects. Vite comes with built-in functionality to do this. Your assets need to be placed in the **public** directory and Vite will automatically copy them on build. However, sometimes we may have those assets alongside our components or other directories within our project.

In Vite, there are many ways to accomplish any task, in this case, we will be using a nice plugin called `vite-plugin-static-copy`. Let's set it up.

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

* Lastly, still in `vite.config.js`, add the `viteStaticCopy` function configuration inside the `plugins:[]` array:

{% raw %}

```js
plugins: [
  viteStaticCopy({
    targets: [{
      src: './src/components/**/**/*.js',
      dest: 'js',
    },
    {
      src: './src/components/**/**/*.{png,jpg,jpeg,svg,webp,mp4}',
      dest: 'images',
    }],
  }),
],
```

{% endraw %}

Fig. 13: Adds tasks for copying JavaScript and Images from src to dist.{.caption}

We added two targets inside the `viteStaticCopy` function, one to copy JS files from within our components into `dist/js`, and the other one to copy images into `dist/images`.

If you run `npm run build`, any images or JS files inside any of your components will be copied into the respective directory in **dist**.

## 7. Building a watch task {id=watch}

So far if we want any of the tasks we've configured to run, we need to run `npm run build`. Ideally, we would want for those tasks to run automatically as we work in the project, without us running a command. We can setup a watch task so every time we update and save a file, the task will be triggered and run.

For this task, we will use the `vite-plugin-watch-and-run` extension. You know the drill.

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

* Next, still inside `vite.config.js`, add the following plugin anywhere within the `plugins:[]` array. Perhaps after the ending of the last plugin we added:
{% raw %}

```js
watchAndRun([
  {
    name: 'css',
    watchKind: ['add', 'change', 'unlink'],
    watch: path.resolve('./src/patterns/components/**/*.css'),
    run: 'npm run watch',
    delay: 300,
  },
  {
    name: 'js',
    watchKind: ['add', 'change', 'unlink'],
    watch: path.resolve('./src/patterns/components/**/*.js'),
    run: 'npm run watch',
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

Fig. 15: Two new npm commands for for the watch task.{.caption}

The new watch task above is actually a combination of two other tasks: `vite:watch` and `storybook`.

Let's briefly go over the configuration in **watchAndRun**:

* `name` is an arbitrary name you wish to assign to the task
* `watchKind` is the type of change (add, delete, and change)
* `watch` is the path to watch for changes
* `run` is the command to run when changes do happen
* `delay` is a little pause from doing anything in the event that many files are added or removed at once.

When the new watch task is evoked (`npm run watch`), the following happens:

1. Vite build runs with a **--watch** flag which will stay running listening for any CSS or JS changes until it is manually stopped.
1. It will build Storybook and will launch it on your default browser.
1. When changes are saved, the watch task recompiles the code and storybook does a Hot Module Reload, or HMR, to reflect the changes.

## 8. Linting CSS and JavaScript {id=linting}

Our workflow is coming along nicely. There are many other things we can do but for now, we will end with one last task: **CSS and JS linting**.

* Install the required packages. There are several of them.

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

* Then, let's add one more plugin in the `plugins:[]` array:

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

### Configure rules for ESLint and Stylelint

Both ESLint and Stylelint use configuration files where we can configure the various rules we want to enforce when writing code.  The files they use are `eslint.config.js` and `.stylint.js` respectively.  Get copies of each of these files and save them in the root of your project.

To test all the functionality we've implemented, run the commands below and then try updating any of the CSS in the project to ensure the changes are reflected in Storybook. You could also try writing bad CSS or JS to see the linters catch the issues.

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
* Creaate Drupal libraries
* Clean irrelevant Vite files
