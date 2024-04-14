---
date: "2024-04-22"
title: "Integrating Storybook components with Drupal"
tags: ['drupal','storybook','components']
draft: false
featured: true
featuredImage: "/images/wall.webp"
featuredImageAlt: "A brick wall"
imageThumb: "/images/thumbs/wall-thumb.webp"
featuredImageCredit: "Gustavo"
featuredImageCreditUrl: "https://unsplash.com/@natura_photos"
summary: "In this post we'll go over the process of making Drupal aware of the components you have built in Storybook."
---
Hey you're back! 🙂 In the [previous post](../building-a-modern-drupal-theme-with-storybook), we talked about how to build a custom Drupal theme using Storybook as its design system.  We also built a simple component to demonstrate how Storybook, through the use of custom extensions, is able to understand Twig.  In this post, the focus will be on making Drupal aware of those components by connecting Drupal to Storybook.

## What is Drupal integration?

In the context of Drupal development using the component-driven methodology, Drupal integration means connecting Drupal presenter templates such as node.html.twig, block.html.twig, paragraph.html.twig, etc. to Storybook by mapping Drupal fields to component fields in Storybook. This in turn allows for your Drupal content to be rendered wrapped in the Storybook components.

The advantage of using a design system like Storybook is that you are in full control of the markup for each component. As a result your website is more semantic, accessible and easier to work with.

## Getting the Drupal environment ready

To start let's get the Drupal environment ready so we can start interacting with Drupal and Storybook more easily.

1. Build a basic Drupal 10 website ([Some instructions](https://ddev.readthedocs.io/en/stable/users/quickstart/#drupal){target=_blank rel=noopener}). If you already have a site ready you can use it.
1. Add the **storybook** theme to your website. If you completed the excercise in the previous post, you can copy the theme you built into your site's **/themes/custom/**. Otherwise, you can clone [this repo](https://github.com/mariohernandez/storybook){target=_blank rel=nooperner} into the same location so it becomes your theme.
1. No need to enable the theme just yet. We'll comeback to the theme shortly.

## Back to Storybook

The title component we built in the previous post may not be enough to demonstrate some of the advanced techniques when integrating components. We will build a larger component to put these techniques into practice. The component we will build is called **Card** but before we start, let's take a look at what the Card component looks like.

![People standing on lobby of large building](/images/storybook-card.webp){.body-image .body-image--narrow}

I like to take inventory of the different parts that make up the components I'm building. The card image above shows three parts: the image, the title, and the teaser text. Each of these parts translate into fields when I am structuring the data for the component as well as building the entity in Drupal.

### Building the Card component

1. In your command line, navigate inside the **storybook** theme
1. Inside the **components** directory create a new directory called **card**
1. Inside the **card** directory add the following four files:
    * **card.css**: for the component's styles
    * **card.twig**: for the component's markup and logic
    * **card.stories.jsx**: for Storybook's story
    * **card.yml**: for the component's demo data
1. Update **card.yml** as follows:
{% raw %}

```yml
---
modifier: ''
image: <img src="images/3-2.svg" alt="placeholder text" />
title:
  level: 2
  modifier: ''
  text: 'Tours & Experiences'
  url: 'https://mariohernandez.io'
teaser: 'Step inside for a tour. We offer a variety of tours and experiences to explore the building’s architecture, take you backstage, and uncover the best food and drink. Tours are offered in different languages and for different levels of mobility.'
```

{% endraw %}

1. Update **card.twig** as follows:
{% raw %}

```php
{{ attach_library('storybook/card') }}

<article class="card{{ modifier ? ' ' ~ modifier }}{{- attributes ? ' ' ~ attributes.class -}}" {{- attributes ? attributes|without(class) -}}>
  {% if image %}
    <div class="card__image">
      <figure>
        {{ image }}
      </figure>
    </div>
  {% endif %}

  <div class="card__content">
    {% if title %}
      {% include "@components/title/title.twig" with {
        'title': title
      } only %}
    {% endif %}

    {% if teaser %}
      <p class="card__teaser">{{ teaser }}</p>
    {% endif %}
  </div>
</article>
```

{% endraw %}

1. Update **card.css** as follows:
{% raw %}

```css
/**
* @file
* Card component which includes title components.
*/

.card {
  display: flex;
  flex: 1 1 var(--size-44);
  flex-direction: column;
  height: auto;
  max-width: var(--size-80);
  overflow: hidden;
}

/* Using flex-grow to allow date to be positioned at the bottom of the card by
using margin-top: auto in the date wrapper field below. */
.card__content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: var(--size-4);

  /* For consistent top/bottom spacing for all fields in the card. */
  > *:not(.date) {
    margin-block-end: var(--size-3);
  }
}

.card__title {
  color: var(--ucla-blue);
  font-family: var(--font-heading);
  font-size: var(--font-size-2);
  line-height: var(--leading-normal);

  &:hover {
    color: var(--gray-900);
  }
}

.card__date {
  align-items: center;
  display: flex;
  font-weight: var(--font-weight-600);

  .date {
    font-weight: var(--font-weight-600);

    svg {
      margin-inline-end: var(--size-2);
    }
  }
}
```

{% endraw %}

1. Update **card.stories.jsx** as follows:
{% raw %}

```js
import parse from 'html-react-parser';

import card from './card.twig';
import data from './card.yml';
import './card.css';

const settings = {
  title: 'Components/Card',
};

export const Card = {
  render: (args) => parse(card(args)),
  args: { ...data },
};

export default settings;
```

{% endraw %}

Let's go over a few things regarding the code above:

* The data structure in **card.yml** reflects the data structure and type we will use in Drupal later. The image field uses the entire `<img>` element rather than just using the image **src** and **alt** attributes.  The reason for this is when we get to Drupal, we can use Drupal's full image entity.
* **card.twig** reuses the title component we created in the previous post. This is Atomic Design in action. Because we built a flexible title component, we can use it on anything where a title is needed.
* **card.stories.jsx** is the Storybook story for the Card.  Notice how the code in this file is very similar to the one in the title.stories.jsx.

Next let's take a look at the Card component in Storybook:

* While in the **storybook** directory, run:
{% raw %}

```shell
nvm install
npm install
npm run storybook
```

{% endraw %}

_The Card component should be available in Storybook now._

## Prepping Drupal for integration

With the Card component now in place, let's change our attention back to Drupal. Go ahead and complete the following tasks:

* Install and enable the [Components libraries](https://www.drupal.org/project/components){target=_blank rel=noopener} module
* Create a new node of type Article (be sure to include body content).
* Add the following at the end of **storybook.info.yml** (mind indentation):

{% raw %}

```yml
components:
  namespaces:
    components:
      - src/components
```

{% endraw %}

* Override all content in **storybook.libraries.yml** with the following:

{% raw %}

```yml
global:
  version: VERSION
  css:
    base:
      dist/css/reset.css: {}
      dist/css/styles.css: {}

card:
  css:
    component:
      dist/css/card.css: {}

```

{% endraw %}

* Enable the Storybook theme and make it the default theme.

Let's go over the changes to both, **storybook.info.yml** and **storybook.libraries.yml** files:

* The block of code we added in **storybook.info.yml** is critical for components nesting.  Using the Components libraries module allows us to create namespaces. Namespaces make it easier to nest components by simply using the namespace rather than using the absolute path. You can have as many namespaces as needed.
* I have added two CSS stylesheets that handle base styles in our theme. Those stylesheets are referenced in the Global library inside **storybook.libraries.yml**.  In addition, if you recall when we created the Card component, the first line inside **card.twig** is a Twig attach library statement. Using libraries is the recommended way for adding CSS and JS to pages/components.  The library does not exist so in the second part of the code snippet in **storybook.libraries.yml** we add the library so Drupal can make use of its assets.

## Integrating the Card component

### Template suggestions

All the pieces are in place to Integrate the Card component so Drupal can use it to render each news article when viewed in Teaser mode. Let's do this!

* We need to find the Twig template Drupal uses to render news articles in teaser view mode. One easy way to do this is to turn on Twig debugging. This used to be a complex configuration but starting with Drupal 10.1 you can now do it directly in Drupal's UI:

  * While logged in with admin access, navigate to `/admin/config/development/settings` on your browser. This will bring up the Development settings page.
  * Check all the boxes on this page and click **Save settings**.  This will enable Twig debugging and disable caching.

With Twig debugging on, go to the homepage where the Article we created should be displayed in teaser mode. If you right-click on any part of the news article and select **inspect** from the context menu you will see in detail all the templates Drupal is using to render the content on the current page. See example of debugging info below:

![Code inspector showing Drupal debugging](/images/storybook-debug.webp)

There are a lot of templates to see here but the ones we are interested in is the one with the name **node...***. These are the templates used to display any type of node in Drupal. In addition to template names, Twig debugging also tells us where the template being used is located (Drupal core, a module, our theme, etc.).
I have marked with an arrow the template **node.html.twig**, which is the one Drupal is currently using to render the Article node. The way we know this is true is because there is an **X** before the template name. This indicates this is the template currently being used to render the article.
Just above the active template see a list of more templates that start with **node...**. These are known as template suggestions. Drupal is basically telling us that if we want to override the way a node is rendered, we can create a template inside our theme with any of the names being suggested.  The higher the template appears on that list, the more specific it is to the piece of content being rendered. For example, changes made to **_**node.html.twig**_** would affect ALL nodes throughout the site, whereas changes made to **node--1--teaser.html.twig** will only affect the very first node created on the site regardless what type it is.
With this information in hand, we need to decide, what name should our template suggestion have so only news articles in teaser view mode are affected. The answer is **node--article--teaser.html.twig**. We want any news article to use our Card component but only if they are displayed in teaser view mode.

#### Copy the template

* Copy **/core/themes/olivero/templates/content/node--teaser.html.twig** into your theme's **/storybook/templates/content/**.

The template we just copied has a lot of information that may or may not be needed when integrating it with Storybook. If you recall, the Card component we built was made up of three parts: an image, a title, and teaser text.  Each of those are Drupal fields and these are the only fields we care about when integrating. Whenever I copy a template from Drupal core or a module into my theme, I like to leave the comments on the template untouched. This is helpful because this way you can reference all the details about the template as you override it.

### The actual integration

Since the template we just copied is using all three fields we need, I would take a closer look at how those fields are being declared in the template so when we map Drupal fields with the Card's fields, we know exactly how to use the right field name.

1. Delete everything from the template except the comments and the **classes** array variable
1. At the bottom of what is left in the template add the following code snippet:

{% raw %}

```php
{% include '@components/card/card.twig' with {
  'attributes': attributes.addClass(classes),
  'image': content.field_image,
  'title': article_title,
  'teaser': content.body,
} only %}
```

{% endraw %}

* We are using a Twig **include** statement to nest the Card component into the node template. The same way we nested the Title component into the Card.
* In the Twig include we are also making use of the namespace we created earlier inside **storybook.info.yml**. The name space is **@components**.
* We map Drupal's attributes into the component's attributes placeholder so Drupal can inject any attributes such as CSS classes, IDs, Data attributes, etc. into the component.  This is important because we want to make sure our components still take advantage of everything Drupal has to offer.
* Finally we map the image, title and teaser fields from Drupal to the component's equivalent fields.

1. Save the changes to the template and clear Drupal's cache
1. Reload the homepage and you should see the news article being rendered using the Card component. See below:
![Example of twig debugging](/images/integrated-card.webp){.body-image .body-image--narrow}
1. If you right-click on the article and select **Inspect**, you will notice that Drupal is now using **node--article--teaser.html.twig** to render the article. We know this because now there is an **X** before the template name. You will also noticed that the article is using the custom markup we wrote for the Card component which is more semantic, accessible and easier to maintain.


## In closing

This is only a small example of how to build a simple component in Storybook using Twig and then integrate it with Drupal so content is rendered in a more semantic and accessible manner. There are many more advantages of implementing a system like this, Storybook becomes the single source of truth for markup, styles, and JavaScript. Storybook also becomes the Styleguide where standards and best practices are implemented and Drupal adheres to them.
I hope this was helpful and see the potential of a component-driven environment using Storybook. Thanks for visiting.
