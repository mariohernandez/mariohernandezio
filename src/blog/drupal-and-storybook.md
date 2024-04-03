---
date: "2024-04-08"
title: "Building a modern Drupal theme with Storybook"
tags: ['drupal','storybook']
draft: false
featured: true
featuredImage: "/images/storybook.webp"
featuredImageAlt: "Wooden hammer painted in yellow in a yellow background"
imageThumb: "/images/thumbs/storybook-thumb.webp"
featuredImageCredit: "Markus Spiske"
featuredImageCreditUrl: "https://unsplash.com/@markusspiske"
summary: "Building a next generation Front-end environment for Drupal has drastically changed with the evolution of component-baded development."
---
Building a custom Drupal theme nowadays is a more complicated process than it used to be.  Most themes require some kind of build tool such as Gulp, Grunt, Webpack or others to automate many of the repeatitive tasks we perform when working on the front-end.  Tasks like compiling and minifying code, compressing images, linting code, and many more.  As Atomic Web Design became a thing, things got more complicated because now if you are building components you need some kind of styleguide or Design System to showcase and maintain those components. One of those design systems for me has been Patternlab. I started using Patternlab in all my Drupal projects almost ten years ago and when I started my new job with [UCLA Health](https://medschool.ucla.edu){target=_blank rel=noopener} last year, I was glad to see they were also using Patternlab.

New tools emerge all the time with better or more advanced features and capabilities and we at UCLA Health thought now is as good time as ever to see what's available and upgrade our front-end environment.

## Enter Storybook

[Storybook](https://storybook.js.org/){target=_blank rel=noopener} is a JavaScript-based design system which was originally released in 2014.  Since then it has gotten better and better and its most recent release, version 8, comes packed with great features.  In addition, Storybook has a pretty active community and a very healthy ecosystem which provides many plugins to extend its core functionality. As a Drupal developer these two things speak volumes of any tool.

Storybook has been very popular in the JavaScript world for many years and during this time, the Drupal community has been trying to successfully and seamenlessly integrate it with Drupal. In recent years a lot of progress has been made in this area and the future of Storybook in a Drupal environment looks primising.

## Our requirements

In choosing Storybook, we went through a rigorous research and testing process to ensure it will not only solve our immediate problems with our current environment, but it will be around as a long term solution. Some of the requirements we tested against include:
<!-- As part of the extensive testing process, I tried both, [Single Directory Components (SDC)](https://www.drupal.org/project/sdc){target=_blank rel=noopener} and the [Storybook Drupal module](https://www.drupal.org/project/storybook){target=_blank rel=noopener}, and although I am completely sold on using SDC, a technical issue between Storybook and SDC prevented me from using SDC, but I am hopeful that this issue will be resolved in the future and I'll be able to use SDC then.  As for the Storybook module, I did not think at this point in time it was the right fit for my project. -->

### 1. No components refactoring

The first and non-negotiable requirement was to be able to migrate components from Patternlab to a new design system with the least amount of refactoring as possible.  We have a decent amount of components which have been built within the last year and the last thing we wanted was to have to rebuild them again because we are switching design system.
<!-- After testing [Emulsify](https://www.emulsify.info/){target=_blank rel=noopener}, [Gesso](https://github.com/forumone/gesso){target=_blank rel=noopener}, and other stand-alone implementations of Storybook I realized they all provided a lot of great features and potential, but ultimately I opted to build my own solution from scratch by using the best parts of all the systems I had tried. -->

### 2. A new Front-end build workflow

I am not the kind of developer who jumps on the latest technology that comes around just because.  As tempting as this may be, I first ask myself, will this new tool do something my current tools are not able to do?  Or, will this improve the way I am doing things?  I have been faithful to Gulp and its ecosystem for as long as I can remember because it did everything I needed done in a very efficient manner.  However, given that it has been so long since using Gulp, I thought I would look into what the next tooling looks like for a front-end project. The obvious choice seemed to be Webpack, but as I looked closer into this I discovered [Vite](https://vitejs.dev/), "_The Next Genration Frontend Tooling_".  Vite delivers on its promise of being "blazing fast" and its ecosystem is great and growing. It was quite the shift going from Gulp to a system like Vite, but after learning more about it the choice was clear.

### 3. No more Sass in favor of PostCSS

CSS has drastically improved in recent years.  It is now possible with plain CSS, to do many of the things you used to only be able to with Sass or similar CSS Preprocessor.  Eliminating Sass from our workflow meant we would also be able to get rid off many other node dependencies related to Sass. The goal for this project was to use plain CSS in combination with PostCSS and one bonus of using Vite is that Vite offers PostCSS processing out of the box without additional plugins or dependencies. Ofcourse if you want to do more advance PostCSS processing you will probably need some external dependencies.

## The new Storybook Drupal environment

We already had a catalog of components to migrate from Patternlab to Storybook. We wanted to switch design systems but not have to rebuild or refactor the components.  The main challenge was, how do we use all the markup and logic written in Twig, in Storybook? Let's go over how this was accomplished. This will be a high-level overview to callout only the most important and Drupal-related parts.

### Tooling

* **Storybook, react edition**
Originally we tested Storybook HTML edition as this is all that is needed for the purpose of our project, but as I worked with it and referenced its documents for assistance, I started to see on their docs pages callouts like this: "This feature is not yet available in React html".  For this reason we switched to Storybook React as this is the edition best supported.
* **Vite, react edition**
This too was something we originally selected the Vanilla edition for more simplicity but we figured using the react edition would work best with Storybook's react edition.
* **NodeJS v20+**
The beauty of building a new system from scratch is that we can use the latest LTS version of NodeJS.  This will make things easier when installing other node dependencies.
* **CSS & PostCSS**
The advancements of CSS in recent years and the browser support made it possible to discontinue Sass and many of its node dependencies we had relied on for years. This automatically aleviates many of the issues we've faced lately with packages compatability with Github actions and other CI/CD tools.
* **Plugins and extensions**
The list of extensions below outlines the critical ones that are required to make Storybook work with Drupal:
  * [Twig](https://www.npmjs.com/package/twig){target=_blank rel=noopener} or TwigJS: This is the JavaScript implementation of the Twig PHP templating language.  This allows Storybook to understand Twig.
  **Note**: TwigJS may not always be in sync with the version of Twig PHP in Drupal and you may run into bugs when using certain Twig functions or filters, however, we've tested all of the common twig functionality and so far it has worked well us. In fact, the next extension actually helps TwigJS be more compatible with Twig PHP.
  * [twig-drupal-filters](https://www.npmjs.com/package/twig-drupal-filters){target=_blank rel=noopener}: TwigJS implementation of Twig functions and filters.
  * [html-react-parser](https://www.npmjs.com/package/html-react-parser){target=_blank rel=noopener}: This extension is key for Storybook to parse HTML code into react elements.
  * [vite-plugin-twig-drupal](https://github.com/larowlan/vite-plugin-twig-drupal){target=_blank rel=noopener}: If you are using Vite like we are, this is a Vite plugin that handles transforming twig files into a Javascript function that can be used with Storybook.
  * [@modifi/vite-plugin-yaml](https://github.com/Modyfi/vite-plugin-yaml){target=_blank rel=noopener}: Transforms a YAML file into a JS object.  This is useful for passing the component's data to React as args.

There are several other packages but those will depend on the functionality and automation you wish to implement.

## Anatomy of a typical component

Now let's go over how a component makes it from Drupal/Twig, to Storybook. A typical component for us is structured as follows:

```php
- card/
    - card.css
    - card.js
    - card.twig
    - card.yml
```

The above structure of a Card component works perfectly in Drupal, but how do we make this work in Storybook since the component's markup and logic is written in Twig?  In Storybook, each visual representation of a component is called [a Story](https://storybook.js.org/docs/writing-stories){target=_blank rel=noopener}, and to create stories out of your components you need to create a file with the following naming convention:
**component-name.stories.jsx**.  In our case, a story for the Card component would be `card.stories.jsx`. Story files can also use any of these extensions depending on your project's specifics: `js | ts | jsx | tsx`.

```php
- card/
  | - card.css
    - card.js
    - card.stories.jsx
    - card.twig
    - card.yml
```

See the content of each of these files in the [attached repository below](#repolink).

### Writing React for the Card component

I have to admit, I don't know react that well and this was a concern for me when we decided to use Storybook.  In my mind I thought I would have to write a lot of react from scratch but luckily the extensions I outlined above eliminate the need of custom react code, instead I just write a small amount of react that can be reused over and over on each component.  Lets take a look at the react code needed for the Card.

Inside `card.stories.jsx`:

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
import card from './card.twig';
import data from './card.yml';
import './card.css';

/**
 * Next we define a default configuration for the component to use.
 * These settings will be inherited by all stories of the component,
 * shall the component have multiple variations.
 * `component` is an arbitrary name assigned to the default configuration.
 * `title` determines the location and name of the story in Storybook's sidebar.
 * `render` uses the parser extension to render the component's html to react.
 * `args` uses the variables defined in card.yml as react arguments.
 */
const component = {
  title: 'Components/Card',
  render: (args) => parse(card(args)),
  args: { ...data },
};

/**
 * Export the Card and render it in Storybook as a Story.
 * The `name` key allows you to assign a name to each story of the component.
 * For example: `Card`, `Card wide`, `Card stacked`, etc.
 */
export const Card = {
  name: 'Card',
};

/**
 * Finally export the default object, `component`. Storybook/React requires this step.
 */
export default component;;
```

That's it! Notice that all we are doing is consuming the code we've written in each of the files inside the Card directory.  Storybook in combination with the extensions we've installed are doing all the heavy lifting.

I'd like to mention that there are different ways in which the code above can be written and still have the same result.  We tried a couple of other formats in an effort to make the code easier to read and ultimately landed on the above.

For a more complete example of the Card component, I've created a simple demo project.{id=repolink}

[Download the code](https://github.com/mariohernandez/storybook){.button .button--reverse target=_blank rel=noopener}

## In closing

I hope this was helpful and if there is anything I can help you with in your journey of a Storybook-friendly Drupal theme, feel free to reach out.
