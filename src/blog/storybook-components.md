---
date: "2024-04-15"
title: "Integrating Storybook components with Drupal"
tags: ['drupal','storybook','components']
draft: true
featured: false
featuredImage: "/images/wall.webp"
featuredImageAlt: "A brick wall"
imageThumb: "/images/thumbs/wall-thumb.webp"
featuredImageCredit: "Gustavo"
featuredImageCreditUrl: "https://unsplash.com/@natura_photos"
summary: "In this post we'll go over the process of making Drupal aware of the components you have built in Storybook."
---
In the [previous post](../building-a-modern-drupal-theme-with-storybook), we went into detail about how to build a new Drupal theme using Storybook as its design system.  We also built a simple component to demonstrate how using TwigJS we can allow Storybook to understand TwigPHP functions and logic.  In this post, the focus will be on making Drupal aware of those components by connecting Drupal to Storybook.

## What is Drupal integration?

In the context of Drupal development using the component-driven approach, Drupal integration means connecting Drupal presenter templates such as node.html.twig, block.html.twig, paragraph.html.twig, etc. to Storybook by mapping Drupal fields to component fields in Storybook. This in turn allows for your Drupal content to be rendered wrapped in the components you built in Storybook.

The advantage of using a design system like Storybook is that you are in full control of the markup for each component.  This is extremely empowering because as we all know, Drupal is not known for producing the best markup when rendering content. In using Storybook, or any other design system for that matter, the markup we define when building the components is what Drupal will render making things look more semantic, accessible and easier to work with.

## Building the component

Just like we did when we built the **title** component in the [previous post](../building-a-modern-drupal-theme-with-storybook/), we will follow the same process for the **Card** component, which is a more complex component. Let's start.

1. Inside the **components** directory create a new directory called **card**
1. Inside the **card** directory add the following four files:
    * `card.yml`: for the component's demo data
    * `card.twig`: for the component's markup and logic
    * `card.css`: for the component's styles
    * `card.stories.jsx`: for Storybook story
1. Update **card.yml** as follows:
1. Update **card.twig** as follows:
1. Update **card.css** as follows:
1. Update **card.stories.jsx** as follows:


Storybook looks very promising as a design system for Drupal projects and with the recent release of [Single Directory Components or SDC](https://www.drupal.org/project/sdc), and the new [Storybook module](https://www.drupal.org/project/storybook), we think things can only get better for Drupal front-end development. Unfortunately for us, technical limitations in combination with our specific requirements, prevented us from using SDC or the Storybook module.  Instead, we built our environment from scratch with a stand-alone integration of Storybook 8. We are hopeful the technical issues we ran into with SDC can be addressed in the future so we have an opportunity to incorporate it into our environment.

## Our process and requirements

In choosing Storybook, we went through a rigorous research and testing process to ensure it will not only solve our immediate problems with our current environment, but it will be around as a long term solution. As part of this process, we also tested several available options like [Emulsify](https://www.emulsify.info/){target=_blank rel=noopener} and [Gesso](https://github.com/forumone/gesso){target=_blank rel=noopener} which would be great options for anyone looking for a ready-to-go system out of the box.  Some of our requirements included:

### 1. No components refactoring

The first and non-negotiable requirement was to be able to migrate components from Patternlab to a new design system with the least amount of refactoring as possible.  We have a decent amount of components which have been built within the last year and the last thing we wanted was to have to rebuild them again because we are switching design system.

### 2. A new Front-end build workflow

I personally have been faithful to Gulp as a front-end build tool for as long as I can remember because it did everything I needed done in a very efficient manner.  The Drupal project we maintain also used Gulp, but as part of this migration, we wanted to see what other options were out there that could improve our workflow. The obvious choice seemed to be Webpack, but as we looked closer into this we learned about [ViteJS](https://vitejs.dev/), "_The Next Genration Frontend Tooling_".  Vite delivers on its promise of being "_blazing fast_", and its ecosystem is great and growing, so we went with it.

### 3. No more Sass in favor of PostCSS

CSS has drastically improved in recent years.  It is now possible with plain CSS, to do many of the things you used to be able to only do with Sass or similar CSS Preprocessor.  Eliminating Sass from our workflow meant we would also be able to get rid of many other node dependencies related to Sass. The goal for this project was to use plain CSS in combination with PostCSS and one bonus of using Vite is that Vite offers PostCSS processing out of the box without additional plugins or dependencies. Ofcourse if you want to do more advance PostCSS processing you will probably need some external dependencies.

## Building a new Drupal theme with Storybook

Let's go over the steps to building the base of your new Drupal theme with ViteJS and Storybook.  This will be at a high-level to callout only the most important and Drupal-related parts. This process will create a brand new theme.  If you already have a theme you would like to use, make the appropriate changes to the instructions.

### 1. Setup Storybook with ViteJS

#### ViteJS

* In your Drupal project, navigate to the theme's directory (i.e. `/web/themes/custom/`)
* Run the following command:

{% raw %}

```shell
npm create vite@latest my_theme // replace my_theme with your theme name.
```

{% endraw %}

* When prompted, select the framework of your choice, for us the framework is React.
* When prompted, select the variant for your project, for us this is JavaScript

After the setup finishes you will have a basic Vite project running.

#### Storybook

* Be sure your system is running NodeJS version 18 or higher
* Inside the newly created theme, run this command:

{% raw %}

```shell
npx storybook@latest init --type react
```

{% endraw %}

* After installation completes, you will have a new Storybook instance running
* If Storybook didn't start on its own, start it by running:

{% raw %}

```shell
npm run storybook
```

{% endraw %}

#### TwigJS

Twig templates are server-side templates which are normally rendered with TwigPHP to HTML by Drupal, but Storybook is a JS tool. TwigJS is the JS-equivalent of TwigPHP so that Storybook understands Twig. Let's install all dependencies needed for Storybook to work with Twig.

* Istill within your newly created theme, run this command:

{% raw %}

```shell
npm i -D vite-plugin-twig-drupal html-react-parser @modyfi/vite-plugin-yaml
```

{% endraw %}

* [vite-plugin-twig-drupal](https://github.com/larowlan/vite-plugin-twig-drupal){target=_blank rel=noopener}: If you are using Vite like we are, this is a Vite plugin that handles transforming twig files into a Javascript function that can be used with Storybook.  This plugin includes the following:
  * [Twig](https://www.npmjs.com/package/twig){target=_blank rel=noopener} or TwigJS: This is the JavaScript implementation of the Twig PHP templating language.  This allows Storybook to understand Twig.
    **Note**: TwigJS may not always be in sync with the version of Twig PHP in Drupal and you may run into issues when using certain Twig functions or filters, however, we are adding other extensions that may help with the incompatability issues.
  * [twig-drupal-filters](https://www.npmjs.com/package/twig-drupal-filters){target=_blank rel=noopener}: TwigJS implementation of Twig functions and filters.
  * [drupal attribute](https://github.com/ericmorand/drupal-attribute){target=_blank rel=noopener}: Adds the ability to work with Drupal attributes.
* [html-react-parser](https://www.npmjs.com/package/html-react-parser){target=_blank rel=noopener}: This extension is key for Storybook to parse HTML code into react elements.
* [@modifi/vite-plugin-yaml](https://github.com/Modyfi/vite-plugin-yaml){target=_blank rel=noopener}: Transforms a YAML file into a JS object.  This is useful for passing the component's data to React as args.

#### ViteJS configuration

Update your **vite.config.js** so it makes use of the new extensions we just installed as well as configuring the namesapces for our components.

{% raw %}

```js
import { defineConfig } from "vite"
import yml from '@modyfi/vite-plugin-yaml';
import twig from 'vite-plugin-twig-drupal';
import { join } from "node:path"
export default defineConfig({
  plugins: [
    twig({
      namespaces: {
        components: join(__dirname, "./src/components"),
        // Other namespaces maybe be added.
      },
    }),
    // Allows Storybook to read data from YAML files.
    yml(),
  ],
})
```

{% endraw %}

#### Storybook configuration

Out of the box, Storybook comes with **main.js** and **preview.js** inside the **.storybook** directory. These two files is where a lot of Storybook's configuration is done.  We are going to define the location of our components, same location as we did in **vite.config.js** above (we'll create this directory shortly). We are also going to do a quick config inside **preview.js** for handling drupal filters.

* Inside **.storybook/main.js** file, update the stories array as follows:

{% raw %}

```js
stories: [
  "../src/components/**/*.mdx",
  "../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
],
```

{% endraw %}

* Inside **.storybook/preview.js**, add the following:

{% raw %}

```js
/** @type { import('@storybook/react').Preview } */
import Twig from 'twig';
import drupalFilters from 'twig-drupal-filters';

function setupFilters(twig) {
  twig.cache();
  drupalFilters(twig);
  return twig;
}

setupFilters(Twig);

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

{% endraw %}

#### Creating the components directory

* If Storybook is still running, press `Ctrl + C` to stop it
* Inside the **src** directory, create the **components** directory.  Alternatively, you could rename the existing **stories** directory to **components**.

## Creating your first component

With the current system in place we can start building components.  We'll start with a very simple component to try things out first.

* Inside **src/components**, create a new directory called **title**
* Inside the **title** directory, create the following files: _title.yml_ and _title.twig_

### Writing the code

* Inside **title.yml**, add the following:

{% raw %}

```yaml
---
level: 2
modifier: 'title'
text: 'Welcome to your new Drupal theme with Storybook!'
```

{% endraw %}

* Inside **title.twig**, add the following:

{% raw %}

```php
<h{{ level }}{% if modifier %} class="{{ modifier }}"{% endif %}>{{ text }}</h{{ level }}>
```

{% endraw %}

We have a simple title component that will print a title of anything you want.  The **level** key allows us to change the heading level of the title (i.e. h1, h2, h3, etc.), and the **modifier** key allows us to pass a modifier class to the component.

Currently the title component is not available in storybook.  Storybook uses a special file to display each component as a story, the file name is **component-name.stories.jsx**.

* Inside **title** create a file called **title.stories.jsx**
* Inside the stories file, add the following:

{% raw %}

```js
/**
 * First we import the `html-react-parser` extension to be able to
 * parse HTML into react.
 */
import parse from 'html-react-parser';

/**
 * Next we import the component's markup and logic (twig), data schema (yml),
 * as well as any styles or JS the component may use.
 */
import title from './title.twig';
import data from './title.yml';

/**
 * Next we define a default configuration for the component to use.
 * These settings will be inherited by all stories of the component,
 * shall the component have multiple variations.
 * `component` is an arbitrary name assigned to the default configuration.
 * `title` determines the location and name of the story in Storybook's sidebar.
 * `render` uses the parser extension to render the component's html to react.
 * `args` uses the variables defined in title.yml as react arguments.
 */
const component = {
  title: 'Components/Title',
  render: (args) => parse(title(args)),
  args: { ...data },
};

/**
 * Export the Title and render it in Storybook as a Story.
 * The `name` key allows you to assign a name to each story of the component.
 * For example: `Title`, `Title dark`, `Title light`, etc.
 */
export const TitleElement = {
  name: 'Title',
};

/**
 * Finally export the default object, `component`. Storybook/React requires this step.
 */
export default component;
```

{% endraw %}

If Storybook is running you should be able to see your new title "Story" displaying the text, heading level, and modifier class (if any), that you specified in the yml file. See example below:

![Computer screenshot of a demo story in Storybook](/images/storybook-demo.webp)

I wanted to show you how this works with the simplest of components, the title, because believe it or not, adopting this approach on larger and more complex components is not much different.  Even the React code we wrote does not change much for large components.

In the next blog post, we will build a more complex component that includes or inherits smaller components. I hope you stay tuned. For now, if you want to grab a copy of all the code in this post, you can do so below.

[Download the code](https://github.com/mariohernandez/storybook){.button .button--reverse target=_blank rel=noopener}

## Resources

* Storybook docs
* Storybook stories
* Blog post to SDC and Storybook
* [Blog post to nirvana](https://www.previousnext.com.au/blog/drupal-front-end-nirvana-vite-twig-and-storybook)

## In closing

I'd like to thank [Chaz Chumley](https://twitter.com/chazchumley){target=_blank rel=noopener}, a Senior Software Engineer who did a lot of the configuration discussed in this post.  In addition, we are extremely thankful to the Emulsify and Gesso teams for letting us pick their brains during our research.

I hope this was helpful and if there is anything I can help you with in your journey of a Storybook-friendly Drupal theme, feel free to reach out.