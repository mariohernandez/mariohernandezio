---
date: "2024-06-02"
title: "Components variations in Storybook"
tags: ['components','variations','storybook']
draft: true
featured: false
featuredImage: "/images/variations-featured.webp"
featuredImageAlt: "Colourful cacti in a row against a white background"
imageThumb: "/images/thumbs/variations-thumb.webp"
featuredImageCredit: "Scott Webb"
featuredImageCreditUrl: "https://unsplash.com/@scottwebb"
summary: "Component variations inherit the attributes of a component and "
---

One great way to enhance your catalog of components is by creating components variations. Variations, in the context of component-driven development, refers to creating alternative displays of existing components in an effort to enhance your site's UI/UX, as well as to find creative ways to display the same content. Variations of a component reduce the need of building new components.

The image below shows how a card component can be displayed in so many ways.

![Card with multiple variations](/images/variations.webp)

## Principles of building components

Sometimes when building a new component, we are not able to see beyond the use case of the component we are tasked with building. Some time ago I wrote about [principles for building components](../five-principles-for-building-better-components/). Rather than repeating myself, take a quick look at the article and comeback when you are done. You will find those principles not only apply to building new components, but also to building variations of components.

## Building component variations in Storybook

In Storybook, all variations of a component are referred to as "Stories", hence the name Storybook. A story captures the rendered state of a UI component. Developers write multiple stories per component that describe all the “interesting” states/variations a component can support. Here's a visual that describes the official naming and hirarchy Storybook uses.

![Example of Storybook's sidebar and its elements](/images/storybook-sidebar.png)

## The Card component

First off, I am going with the assumption that you already know how Storybook stories are created and that you have a Storybook instance running. If that's not the case, [read my post](../building-a-modern-drupal-theme-with-storybook/) on how to get everything setup so you can follow along. Ignore the fact that it says Drupal theme.

Next, let's take a look at the variations/stories we will be creating in this post.

![Example of component variations](/images/stories.webp){.body-image .body-image--wide}

The image above shows the stories or variations we will build. From top-left to right:

* Default or Stacked
* Light CTA
* Small
* No image
* Horizontal

In the interest of time, I have a repo that already includes the base of the Card component so we can focus only on building the variations.

1. [Clone the repo](https://github.com/mariohernandez/storybook){target=_blank rel=noopener} which already contains a project to work with and the Card component
1. Switch to the **variations** branch by running `git checkout variations`
1. Run the project as instructed in the **README** of the repo

## Variations time

The original Card component was built with Twig, but for the variations we will be working exclusively in `card.stories.jsx`. The current version of the card story looks like this:

{% raw %}

```js
import parse from 'html-react-parser';

import card from './card.twig';
import data from './card.yml';
import './card.css';

const component = {
  title: 'Molecules/Card',
};

export const Card = {
  name: 'Card stacked',
  render: (args) => parse(card(args)),
  args: { ...data },
};

export default component;
```

{% endraw %}

In this tutorial, we will use two ways for creating variations in Storybook:

1. Doing all the work directly in `card.stories.jsx`
1. Using alternative `*.yml` files to assist with fields updates

## Card with light CTA

We will start with the first method for creating variations, doing all the work in `card.stories.jsx`. The variations that lends itself well to this approach is the **Card with light CTA**.

* Inside `card.stories.jsx`, directly after the closing of the **Card** object (around line 16), add the following to create a new story:

{% raw %}

```js
export const CardLightCta = {
  ...Card,
  name: 'Card light CTA',
  render: (args) => parse(card(args)),
  args: {
    ...data,
    cta: {
      modifier: 'button--light',
      text: 'Try it now',
      url: 'https://mariohernandez.io',
    }
  },
};
```

{% endraw %}

Let's describe what we are doing:

* We start by creating and exporting a new object called **CardLightCta**. This is an arbitrary name we chose which should be unique within each story.
* Next, we pass the default Card story (`...Card`), so the new story can inherit all of the default Card attributes.
* The **name** property allows for each story to have a unique name which will appear directly under the component name in Storybook's sidebar (see image at top for details).
* The **render** property parses the markup and logic from `card.twig`, and the data from `card.yml` as arguments. Each key in `card.yml` is translated into an argument.
* Finally, we open the **args** object where we will update some of the fields in order to achieve the desired variation:
  * We pass the `...data` object as a spread operator to individually update the properties/fields that need updating.
  * Since the only difference between this variation and the original card is that the CTA is light, we need to define the `cta` field with the desired values for each of its properties:
    * First as a modifier class will will pass `button--light`
    * Next we type the text that will become the CTA's label, **Try it now**
    * And finally, we set a URL to be passed to the CTA as its href value.

### Preview the new variation

If Storybook is running, you should be able to see the new variation which will display the card with a light CTA. If Storybook is not yet running, in your command line navigate to the **storybook** directory and run these commands:

{% raw %}

```bash
nvm install
npm install
npm run build
npm run storybook
```

{% raw %}

## Card small

This next story or variation is the small version of the card. The difference between this card and the original one is that this one has no CTA and its size is ...well, small 🙂

Same as before, add the following snippet to `card.stories.jsx` directly after the closing of the card with light CTA story:

{% raw %}

```js
export const CardSmall = {
  ...Card,
  name: 'Card small',
  render: (args) => parse(card(args)),
  args: {
    ...data,
    modifier: 'card--small',
    cta: '',
  },
};
```

{% endraw %}

This story is very similar to the previous one from the updates needed point of view. As you can see, the only thing we are doing is passing `card--small` as a modifier class to the entire component, and since we don't need a button or CTA, we are defining the `cta` object but its value is empty which will supress it from printing on the page. If you notice in `card.twig`, we use a conditional that checks if the `cta` object exists, otherwise don't print any of the markup starting with the `footer` tag.

## Card with no image

* You know the drill, inside `card.stories.jsx`, directly after the closing of the previous story, add the following snippet:

{% raw %}

```js
export const CardNoImage = {
  ...Card,
  name: 'Card no image',
  render: (args) => parse(card(args)),
  args: {
    ...data,
    modifier: 'card--no-image',
    image: '',
  },
};
```

{% endraw %}

Even more similar to the previous story, this variation only varies from the original story as follows:

* We are passing a modifier class to the component, `card--no-image`.
* Finally, since we want no image, we define the `image` object but leave its value empty.

## Card horizontal

The final variation is the Card horizontal. For all previous variations we have done all the changes inside `card.stories.jsx`, but for this one, we will resource to using an alternative `*.yml` file. Why you may ask, well, this variations requires a bit more changes and making all those changes inside the stories.jsx file may look a little too busy and not as easy to read the code. That's pretty much the only reason for me to use this method, to keep the code in my stories clean and more readable.

You may have noticed in the project you cloned, inside the **card** directory we have a file called **card-horizontal.yml**. This file is almost identical to the original **card.yml** as far as the fields in it. The only difference is that some of the fields have unique content or no content at all.  Let's take a look at the file before starting.

{% raw %}

```yml
---
modifier: 'card--horizontal'
image: <img src="/card-square.jpg" alt="Palm trees near city buildings" />
title:
  level: 2
  modifier: 'card__title'
  text: 'Step outside to the outdoors'
  url: 'https://mariohernandez.io'
teaser: 'With spring in full bloom, the weather could not be better to take a walk outside and enjoy the beauty of nature.'
cta: ''
```

{% endraw %}

* The **modifier** field has a specific CSS class we will pass: `card--horizontal`. This class will allow us to change the layout of the card to be in horizontal direction.
* The **image** field has a different version of our image. The image has been cropped in square aspect ratio for better fitting of this variation.
* Finally, the **cta** field is empty, meaning we don't want to print a button on this variation.

Maybe I exagerated when I said that this variation has too many changes, but my point is that in cases when your stories do require a lot of changes, using a different yml file may help you keep your stories.jsx file a lot neater and clean.

* The first step is one we haven't done before. Inside `card.stories.jsx` somewhere around line 5 (after the last import in the file), add the following import:

{% raw %}

```js
import dataHorizontal from './card-horizontal.yml';
```

{% endraw %}

* Next, the way we've done before, inside `card.stories.jsx` add the following snippet directly after the closing of the last story you added:

{% raw %}

```js
export const CardHorizontal = {
  ...Card,
  name: 'Card horizontal',
  render: (args) => parse(card(args)),
  args: {
    ...dataHorizontal,
  },
};
```

{% endraw %}

* First we imported a new data file called `card-horizontal.yml` and assigned the object name of `dataHorizontal`. By doing this, we can manipulate the fields needed for this variation inside this data file, rather than in the story file.
* Next we repeat the same process as the previous variations but this time, inside the **args** object, we pass the new object we created in the previous step (`...dataHorizontal`), rather than `...data`.
* That's it. Our story file is nice and clean.

Now that we have covered both methods for creating variations, know that neither method is better than the other. The decision to use one over the other boils down to personal preferences and sometimes which makes the most sense to simplify the process.

## Final result

At the end of this process, your `card.stories.yml` should look like this:

{% raw %}

```js
import parse from 'html-react-parser';

import card from './card.twig';
import data from './card.yml';
import dataHorizontal from './card-horizontal.yml';
import './card.css';

const component = {
  title: 'Molecules/Card',
};

export const Card = {
  name: 'Card stacked',
  render: (args) => parse(card(args)),
  args: { ...data },
};

export const CardLightCta = {
  ...Card,
  name: 'Card light CTA',
  render: (args) => parse(card(args)),
  args: {
    ...data,
    cta: {
      modifier: 'button--light',
      text: 'Try it now',
      url: 'https://mariohernandez.io',
    }
  },
};

export const CardSmall = {
  ...Card,
  name: 'Card small',
  render: (args) => parse(card(args)),
  args: {
    ...data,
    modifier: 'card--small',
    cta: '',
  },
};

export const CardNoImage = {
  ...Card,
  name: 'Card no image',
  render: (args) => parse(card(args)),
  args: {
    ...data,
    modifier: 'card--no-image',
    image: '',
  },
};

export const CardHorizontal = {
  ...Card,
  name: 'Card horizontal',
  render: (args) => parse(card(args)),
  args: {
    ...dataHorizontal,
  },
};

export default component;
```

{% endraw %}

...and Storybook should list all your variations or stories in the order they were added:

![Storybook displaying several stories in sidebar](/images/sb-variations.png)

## In closing

This only touches the surface of creating stories, but it is refreshing to know that no matter how complex your components may be, when it comes to having Storybook parse them, the React code in your stories is very minimum. Certainly there are exceptions, but as I complete the migration of our large Drupal project with many components, some of which are pretty large and complex, we still were surprised how little React code was required of us to write because all the heavy lifting is being done by Storybook, with its contrib extensions, as well as Twig itself.

I hope this was helpful and stay tuned for more cool stuff regarding Drupal and Storybook.
