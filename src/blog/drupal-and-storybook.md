---
date: "2024-03-30"
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
Building a custom Drupal theme nowadays is more complicated than it used to be.  Most themes now require some kind of build tool such as Gulp or Webpack in addition to other nodeJS dependencies to automate many of the repeatitive tasks we perform when working on the front-end.  Tasks like compiling and minifying compressing images, linting code, and many other tasks.  As Atomic Web Design became a thing, things got more complicated because now if you are building components you need some kind of styleguide to showcase those components. The days when you used to theme your website directly in Drupal are gone. With the evolution of Atomic Web Design and Component-based Development, a Design System becomes the single source of truth for your component's makup, styles and JavaScript.

For almost ten years now the design system of choice for many developers has been Patternlab. Now we're getting to a point in time when website requirements, browser capabilities, and advancements of essential tools call for the next generation design system. There are many options for design systems but within the Drupal ecosystem one that is getting a lot of traction is Storybook.

## Enter Storybook

Storybook is a JavaScript-based design system which was originally released in 2014.  Since then it has been continuously improved and with its most recent release, version 8, it comes packed with great features.  In addition, it has a pretty active community and a very healthy ecosystem which provides many plugins to extend its core functionality.

Storybook has been very popular in JavaScript and in particular React, Vue, and NextJS projects.  However, the Drupal community has been trying for many years to successfully and seamenlessly integrate it as part of a Drupal theme but there has never been a standard or best practices for imtegrating with Drupal.  Storybook uses TwigJS which could potentially present compatability issues with Drupal's Twig but its rich library of plugins and extensions allow us to close the compatability gap. The community has been more active making Storybook work with Drupal and great progress has been made. Systems like Emulsify and Gesso have successfully integrated Storybook with Drupal and they use it as their default solution for their projects.

## Our requirements and decision for a Design System

We maintain a multi-site Drupal system with over one hundred individual sites and we used Patternlab for a few years.  Patternlab served us well for a while but recently we are starting to see Patternlab compatability issues with Github actions as well as with other node packages.  This made it clear to us that it was time to switch design systems. We went through an extensive research and testing process to ensure what we picked was going to provide the results we wanted as a long term solution.  We opted for Storybook as a stand-alone part of our Drupal theme.

Storybook was the natural design system to use with our Drupal system and we are happy to see all the movement happening within the Drupal ecosystem with the introduction of [Single Directory Components (SDC)](https://www.drupal.org/project/sdc) and the newly released [Storybook Drupal module](https://www.drupal.org/project/storybook). As part of our extensive testing process, we tried both, SDC and the Storybook module and although we were completely sold on using SDC, a technical roadblock between Storybook and SDC did not allow us to use SDC in our project but we are hopeful that this issue will be resolved in the future and we'll be able to use SDC then.  As for the Storybook module, we did not think it was the right fit for us at this point in time.

## Our requirements

### No components refactoring

As previously mentioned, we maintain a large Drupal multi-site project and we have a large catalog of components that make up all of our sites so the first and non-negotiable requirement was to migrate our components from Patternlab to a new design system with the least amount of refactoring as possible.  After testing [Emulsify](https://www.emulsify.info/), [Gesso](https://github.com/forumone/gesso), and other stand-alone implementations of Storybook we saw they all provided a lot of great features, but ultimately we opted to build our own solution from scratch by using the best parts of all the systems we tried.  We are extremely thankful to the Emulsify and Gesso teams for meeting with us and discussing in details the specifics of their respective systems. Either of these system would be great for most Drupal sites but in our case we had very specific requirements.

### A new Front-end build workflow

Moving away from Gulp which we have used for many years to a more modern build tool was also very important to us.  The obvious choice seemed to be Webpack, but as we looked closer into this area we discovered [Vite](https://vitejs.dev/), which is considered the Next Genration Frontend Tooling.  We were extremely impressed with Vite's performance and ecosystem of plugins and extensions.  We knew it was going to be challenging to implement a Vite-based system because it is all new to us, but we were up for the challenge and looking back, we are very pleased with this choice as it has allowed us to fully customize our envronment and provide a lighting fast front-end project build.

### No more Sass in favor of PostCSS

Something we did early on was to move away from Sass to plain CSS in combinationw with PostCSS.  This has been very rewarding as it has allowed us to discontinue several other node dependencies.  CSS has advanced so much in recent years that I don't see us ever using Sass again.

## Building components in a Storybook environment

As I mentioned before, all of our components have already been built and we are very happy with them.  We wanted to switch design systems but not have to rebuild or refactor our components.  The custom system we built allowed us to do just that.  The main challenge was, how do we use all the markup, styles, and javascript intended for Drupal, in Storybook?  I'll try to describe our workflow with some code example.

## High level overview of our Front-end project

### Tooling

* **Storybook react edition**
We originally picked Storybook html edition but as we worked with it and referenced its documents page, we started to see messages like "This feature is not yet available in React html".  For this reason we switched to Storybook react as we figured this is the edition that is supported the best.
* **Vite react edition**
This too was something we originally selected the html version but we figured using the react edition would work best with Storybook's react edition.
* **CSS & PostCSS**
The advancements of CSS in recent years and the browser support for advanced CSS properties allowed us to discontinue Sass and many of its node dependencies we had relied on for years. This automatically aleviates many of the issues we've faced lately with packages compatability with Github actions and other CI/CD tools.
* **Plugins and extensions**
I'm not going to mention all of them but some of the key plugins and extensions we've used include:
  - [Twig](https://www.npmjs.com/package/twig): This is the JavaScript implementation (TwigJS) of the Twig PHP templating language.  This allows Storybook to understand Twig. Note: TwigJS may not always be in sync with the version of Twig PHP in Drupal, but so far it has worked well for us.
  - [twig-drupal-filters](https://www.npmjs.com/package/twig-drupal-filters): TwigJS implementation of Twig functions and filters.
  - [html-react-parser](https://www.npmjs.com/package/html-react-parser): This extension is key for Storybook to render our components using the markup and logic in our Twig templates. You won't believe how easy and awesome this works.
  - [vite-plugin-twig-drupal](https://github.com/larowlan/vite-plugin-twig-drupal): If you are using Vite like we are, this is a Vite plugin that handles transforming twig files into a Javascript function that can be used with Storybook.
  - [@modifi/vite-plugin-yaml](https://github.com/Modyfi/vite-plugin-yaml): Transforms a YAML file into a JS object.  This is useful for passing the component's data to Twig.

There are several other packages but those will depend on the functionality and automation you wish to implement.

### Anatomy of a typical component

Following the Atomic Web Design methodology, a typical component for us looks like this:

```php
-- card/
  | -- card.css
    -- card.js
    -- card.twig
    -- card.yml
```

[See each file in detail from this Github Gist](https://gist.github.com/mariohernandez/6a29e3942f9ec22a7849cd865dc62484).

The above structure of a Card component works perfectly in Drupal, but how do we make this work in Storybook since all the code we have is Twig?  Thanks to the extensions we added above, we simply need to create a `.jsx` file whch is what Storybook uses for rendering its stories.  The file name is as follows: `component-name.stories.jsx` so for our example above, our Card component structure would look like this now:

```php
-- card/
  | -- card.css
    -- card.js
    -- card.stories.jsx
    -- card.twig
    -- card.yml
```

### Writing React for our components

I have to admit, I don't know react that well and this was somethign that worried me when we decided to use Storybook.  In my mind I thought I would have to write a lot of react code from scratch.  Luckily for us, the extensions I outlined above eliminate the need to write a lot of react and instead you end up writing just a small amount of React that can use over and over on each component.  Lets take a look what it looks like for the card component above.

```js
// First we import the `html-react-parser` extension to be able to
// parse Twig code into Storybook-friendly code.
import parse from 'html-react-parser';

// Next we import the component's twig template as well as the yml file
// that contains the component's data structure.
import card from './card.twig';
import data from './card.yml';

// Next we define default configuration for the component to use.
// These settings will be inherited by all stories shall the component have multiple variations.
// See an example of this in the Twig file attached to this post.
const component = {
  title: 'Components/Card',
};

// Export the Card and render it in Storybook as a Story.
export const Card = {
  name: 'Card',
  render: (args) => parse(card(args)),
  args: { ...data },
};

// Finally export the default object, `component`.
// This name is optional, but Storybook requires this step.
export default component;;
```

That's it! Notice that all we are doing is consuming the code we've written in each of the files inside the Card directory.  Storybook in combination with the extensions we've installed are doing all the heavy lifting.

I'd like to mention that there are different ways in which the code above can be written and still have the same result.  We tried a couple of other formats in an effort to make our code easier to read and ultimately we landed on the above.

For a more complete example of the Card component, take a look at the code examples found in this static instance of Storybook.

## In closing

We experience many challenges in our effort to build a custom environment but we feel we took the right approach after exausting all other options.  We have built a good foundation and expect our environment will continue to iterate and improve as requirements change.  I hope this was helpful and if there is anything I can help you with in your journey of a Storybook-friendly Drupal theme, feel free to reach out.
