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
Building a custom Drupal theme nowadays is a more complicated process than it used to be.  Most themes now require some kind of build tool such as Gulp, Grunt or Webpack in addition to other NodeJS dependencies to automate many of the repeatitive tasks we perform when working on the front-end.  Tasks like compiling and minifying code, compressing images, linting code, and many more.  As Atomic Web Design became a thing, things got more complicated because now if you are building components you need some kind of styleguide and Design System to showcase and maintain those components.

I have used Patternlab for almost 10 years as the design system of choice for my Drupal projects. Patternlab has served me well and allowed me to build Drupal projects of every size with a living styleguide as the single source of truth for markup, styles and JavaScript, but recently I started to see Patternlab compatability issues with Github actions as well as with other node packages. This made it clear to me that it was time to start looking at alternatives for a new design system.

## Enter Storybook

[Storybook](https://storybook.js.org/) is a JavaScript-based design system which was originally released in 2014.  Since then it has gotten better and better and its most recent release, version 8, comes packed with great features.  In addition, Storybook has a pretty active community and a very healthy ecosystem which provides many plugins to extend its core functionality.

Storybook has been very popular in JavaScript world for many years and during this time, the Drupal community has been trying to successfully and seamenlessly integrate it as part of a Drupal theme but we still have a lot of work to do to successfully integrate it with Drupal in a way that follows standards and best practices. Storybook uses TwigJS to simulate the functionalitty of Drupal's Twig PHP, but some times there are compatability issues as TwigJS is not in sync with the capabilities of Twig PHP.  Luckily for us, TwigJS' rich library of plugins and extensions allow us to close the compatability gap.

## Chosing a new Design System

In choosing Storybook, I went thorugh a rigurous testing and research process to ensure it will not only solve the problems with my current design system today, but it will be around as a long term solution.
As part of the extensive testing process, I tried both, [Single Directory Components (SDC)](https://www.drupal.org/project/sdc) and the [Storybook Drupal module](https://www.drupal.org/project/storybook), and although I am completely sold on using SDC, a technical issue between Storybook and SDC prevented me from using SDC, but I am hopeful that this issue will be resolved in the future and I'll be able to use SDC then.  As for the Storybook module, I did not think at this point in time it was the right fit for my project.

## My requirements

### 1. No components refactoring

The first and non-negotiable requirement for me was to be able to migrate components from Patternlab to a new design system with the least amount of refactoring as possible.  After testing [Emulsify](https://www.emulsify.info/), [Gesso](https://github.com/forumone/gesso), and other stand-alone implementations of Storybook I realized they all provided a lot of great features and potential, but ultimately I opted to build my own solution from scratch by using the best parts of all the systems I had tried.

### 2. A new Front-end build workflow

I am not the kind of developer who jumps on the latest technology that comes around just because.  As tempting as this may be, I first ask myself, will this new tool do something my current tools are not able to do?  Or, will this improve the way I am doing things?  I have been faithful to Gulp and its ecosystem for as long as I can remember because it did everything I needed done in a very efficient manner.  However, given that it has been so long since using Gulp, I thought I would look into what the next tooling looks like for a front-end project. The obvious choice seemed to be Webpack, but as I looked closer into this I discovered [Vite](https://vitejs.dev/), "_The Next Genration Frontend Tooling_".  Vite delivers on its premise of being "blazing fast" and its ecosystem is great and growing. It was quite the shift going from Gulp to a system like Vite, but after learning more about it the choice was clear.

### 3. No more Sass in favor of PostCSS

CSS has drastically improved in recent years.  It is now possible to do many of the things you used to only be able to with Sass or similar CSS Preprocessor, with plain CSS.  Eliminaring Sass from my workflow meant I would also be able to get rid off many of the dependencies of Sass and that meant a leaner project with less dependencies. The goal for this project was to use plain CSS in combination with PostCSS and one bonus of going in this direction is that Vite offers PostCSS processing out of the box without additional plugins or dependencies. Obviously if you want to do more advance PostCSS processing you will probably need some external dependencies/packages. CSS has advanced so much in recent years that I don't see myself ever using Sass again.

## The new Storybook Drupal environment

As I mentioned before, I already had a catalog of components I needed to migrate from Patternlab to Storybook. I wanted to switch design systems but not have to rebuild or refactor the components.  The main challenge was, how do I use all the markup and logic written in Twig in Storybook? Let's go over how this was accomplished. This will be a high-level overview only to callout only the most important and Drupal-related pieces.

### Tooling

* **Storybook, react edition**
Originally I selected Storybook HTML edition but as I worked with it and referenced its documents for assistance, I started to see messages like "This feature is not yet available in React html".  For this reason I switched to Storybook React as this is the edition that is supported the best.
* **Vite, react edition**
This too was something I originally selected the Vanilla version for more simplicity but I figured using the react edition would work best with Storybook's react edition.
* **NodeJS v20+**
The beauty of building a new system from scratch is that I can use the latest LTS version of NodeJS.  This will make things easier when installing other node dependencies.
* **CSS & PostCSS**
The advancements of CSS in recent years and the browser support for advanced CSS properties made it possible to discontinue Sass and many of its node dependencies I had relied on for years. This automatically aleviates many of the issues I've faced lately with packages compatability with Github actions and other CI/CD tools.
* **Plugins and extensions**
I'm not going to mention all of them but some of the key plugins and extensions I've used include:
  * [Twig](https://www.npmjs.com/package/twig): This is the JavaScript implementation (TwigJS) of the Twig PHP templating language.  This allows Storybook to understand Twig. Note: TwigJS may not always be in sync with the version of Twig PHP in Drupal, but so far it has worked well.
  * [twig-drupal-filters](https://www.npmjs.com/package/twig-drupal-filters): TwigJS implementation of Twig functions and filters.
  * [html-react-parser](https://www.npmjs.com/package/html-react-parser): This extension is key for Storybook to parse HTML code into react elements.
  * [vite-plugin-twig-drupal](https://github.com/larowlan/vite-plugin-twig-drupal): If you are using Vite like I am, this is a Vite plugin that handles transforming twig files into a Javascript function that can be used with Storybook.
  - [@modifi/vite-plugin-yaml](https://github.com/Modyfi/vite-plugin-yaml): Transforms a YAML file into a JS object.  This is useful for passing the component's data to Twig as args.

There are several other packages but those will depend on the functionality and automation you wish to implement.

### Anatomy of a typical component

Following the Atomic Web Design methodology, a typical component for me looks like this:

```php
- card/
    - card.css
    - card.js
    - card.twig
    - card.yml
```

See the content of each of these files in the [attached repository below](https://github.com/mariohernandez/storybook).

The above structure of a Card component works perfectly in Drupal, but how do we make this work in Storybook since the component's markup and logic is written in Twig?  Thanks to the extensions listed above, all we need is to create a `card.stories.jsx` file which is what Storybook uses for rendering its stories.

```php
- card/
  | - card.css
    - card.js
    - card.stories.jsx
    - card.twig
    - card.yml
```

### Writing React for the Card component

I have to admit, I don't know react that well and this was somethign that worried me when I decided to use Storybook.  In my mind I thought I would have to write a lot of react from scratch but luckily the extensions I outlined above eliminate the need of custom react code, instead I just write a small amount of react that can be reused over and over on each component.  Lets take a look at the react code needed for the Card.

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

I'd like to mention that there are different ways in which the code above can be written and still have the same result.  I tried a couple of other formats in an effort to make the code easier to read and ultimately landed on the above.

For a more complete example of the Card component, I've created a simple demo project.

[Grab the code](https://github.com/mariohernandez/storybook){.button}

## In closing

I hope this was helpful and if there is anything I can help you with in your journey of a Storybook-friendly Drupal theme, feel free to reach out.
