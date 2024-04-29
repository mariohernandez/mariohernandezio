---
date: "2024-05-01"
title: "Integrating Drupal with Storybook components"
tags: ['drupal','storybook','components']
draft: false
featured: true
featuredImage: "/images/mountains.webp"
featuredImageAlt: "Overlapped mountains painted with water colors"
imageThumb: "/images/thumbs/mountains-thumb.webp"
featuredImageCredit: "Alex Shutin"
featuredImageCreditUrl: "https://unsplash.com/@fiveamstories"
summary: "In this post we'll go over the process of making Drupal aware of the components we have built in Storybook."
---
Hey you're back! 🙂 In the [previous post](../building-a-modern-drupal-theme-with-storybook) we talked about how to build a custom Drupal theme using Storybook as the design system.  We also built a simple component to demonstrate how Storybook, through the use of custom extensions, is able to understand Twig.  In this post, the focus will be on making Drupal aware of those components by connecting Drupal to Storybook.
If you are following along, we will continue where we left off to take advantage of all the prep work we did in the previous post. Topics we will cover in this post include:

1. What is Drupal integration
1. Installing and preparing Drupal for integration
1. Building components in Storybook
1. Building a basic front-end workflow
1. Integrating Drupal with Storybook components

## What is Drupal integration?

In the context of Drupal development using the component-driven methodology, Drupal integration means connecting Drupal presenter templates such as node.html.twig, block.html.twig, paragraph.html.twig, etc. to Storybook by mapping Drupal fields to component fields in Storybook. This in turn allows for your Drupal content to be rendered wrapped in the Storybook components.

The advantage of using a design system like Storybook is that you are in full control of the markup when building components, as a result your website is more semantic, accessible and easier to maintain.

## Getting a Drupal site ready

In the previous post all the work we did was in a standalone project which did not require Drupal to run, In this post, we get to interact with Drupal so we need at the very least a basic Drupal site up and running. If you are following along and already have a Drupal 10 site ready, you can skip the first step below;

1. Build a basic Drupal 10 website ([I recommend using DDEV](https://ddev.readthedocs.io/en/stable/users/quickstart/#drupal){target=_blank rel=noopener}).
1. Add the **storybook** theme to your website. If you completed the excercise in the previous post, you can copy the theme you built into your site's **/themes/custom/** directory, Otherwise, you can clone [the previous post repo](https://github.com/mariohernandez/storybook){target=_blank rel=nooperner} into the same location so it becomes your theme. After this your theme's path should be **themes/custom/storybook**.
1. No need to enable the theme just yet, we'll comeback to the theme shortly.
1. Finally, create a new Article post that includes a title, body content and an image of your choice. We'll use this article later in the process.

## Back to Storybook

The title component we built in the previous post may not be enough to demonstrate some of the advanced techniques when integrating components. We will build a larger component to put these techniques in practice. The component we will build is called **Card** and it looks like this:

![Palm trees in front of city buildings](/images/storybook-card.webp){.body-image .body-image--narrow}

When building components, I like to take inventory of the different parts that make up the components I'm building. The card image above shows three parts: the image, the title, and the teaser text. Each of these parts translates into fields when I am defining the data structurefor the component or building the entity in Drupal.

## Building the Card component

* Open the Drupal site in your code editor and within your code editor navigate to the **storybook** theme (`web/themes/custom/storybook`)
* Create two new directories inside _components_ called **01-atoms** and **02-molecules**
* Inside **02-molecules** create a new directory called **card**
* Inside the **card** directory add the following four files:
  * **card.css**: component's styles
  * **card.twig**: component's markup and logic
  * **card.stories.jsx**: Storybook's story
  * **card.yml**: component's demo data
* Add the following code snippet to **card.yml**:
{% raw %}

```yml
---
modifier: ''
image: <img src="https://source.unsplash.com/cHRDevKFDBw/640x360" alt="Palm trees near city buildings" />
title:
  level: 2
  modifier: ''
  text: 'Tours & Experiences'
  url: 'https://mariohernandez.io'
teaser: 'Step inside for a tour. We offer a variety of tours and experiences to explore the building’s architecture, take you backstage, and uncover the best food and drink. Tours are offered in different languages and for different levels of mobility.'
```

{% endraw %}

* Add the following to **card.twig** to provide the markup and logic for the card:
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
      {% include "@atoms/title/title.twig" with {
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

* Copy [these styles](https://raw.githubusercontent.com/mariohernandez/storybook/card/src/components/02-molecules/card/card.css){target=_blank rel=noopener} into **card.css**.

* Finally, let's create the Storybook card story by adding the following to **card.stories.jsx**:
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
  render: (args) => parse(card(args)),
  args: { ...data },
};

export default component;
```

{% endraw %}

Let's go over a few things regarding the code above:

* The data structure in **card.yml** reflects the data structure and type we will use in Drupal.
  * The image field uses the entire `<img>` element rather than just using the image **src** and **alt** attributes.  The reason for this is so when we get to Drupal, we can use Drupal's full image entity. This is recommended for caching purposes.
* **card.twig** reuses the title component we created in the previous post. This is Atomic Design in action. Because we built a flexible title component, we can use it on anything where a title is needed.
* **card.stories.jsx** in the Storybook story for the Card, notice how the code in this file is very similar to the code in the **title.stories.jsx**. Even with complex components, when we port them into Storybook as stories, most times the code will be similar as what you see above because Storybook is simply rendering whatever is in **.twig** and **.yml** files. There are exceptions when the React code may have extra parameters or logic which typically happens when we're building stories variations.

### Before we preview the Card, some updates are needed

You may have noticed in **card.twig** we used the namespace **@atoms** when nesting the **title** component. The namespace above does not exist and we need to create it now. In addition, we need to move the **title** component into the **01-atoms** directory:

* In your code editor or command line (whichever is easier), move the **title** directory into the **01-atoms** directory
* In your editor, open **title.stories.jsx** and change the line **title: 'Components/Title'** to **title: 'Atoms/Title'**. This will display the title component within the Atoms category in Storybook's sidebar.
* Rather than have you make individual changes to **vite.config.js**, let's replace/overwrite all of its content with the following:

{% raw %}

```js
/* eslint-disable */
import { defineConfig } from 'vite'
import yml from '@modyfi/vite-plugin-yaml';
import twig from 'vite-plugin-twig-drupal';
import { join } from 'node:path'
export default defineConfig({
  root: 'src',
  publicDir: 'public',
  build: {
    emptyOutDir: true,
    outDir: '../dist',
    rollupOptions: {
      input: {
        'reset': './src/css/reset.css',
        'styles': './src/css/styles.css',
        'card': './src/components/02-molecules/card/card.css',
      },
      output: {
        assetFileNames: 'css/[name].css',
      },
    },
    sourcemap: true,
  },
  plugins: [
    twig({
      namespaces: {
        atoms: join(__dirname, './src/components/01-atoms'),
        molecules: join(__dirname, './src/components/02-molecules'),
      },
    }),
    // Allows Storybook to read data from YAML files.
    yml(),
  ],
})
```

{% endraw %}

Let's go over some of the most noticeable updates inside **vite.config.js**:

* We have defined a few things to improve the functionality of our Vite project, starting with using **src** as our app root directory and **public** for publicDir. This helps the app understand the project structure in a relative manner.
* Next we defined a Build task which provides the app with defaults for things like where should it compiled code to (i.e. **/dist**), and rollupOptions for instructing the app which stylesheets to compile and what to call them.
* As part of the rollupOptions we also defined two stylesheets for global styles (**reset.css** and **styles.css**). We'll create these next.
**IMPORTANT** This is as basic as it gets for a build workflow and in no way would I recommend this be your front-end build workflow. When working on bigger projects with more components, it is best to define a more robust and dynamic workflow that provides automation for all the repeatitive tasks performed on a typical front-end project.
* Under the Plugins section, we have defined two new namespaces, **@atoms** and **@molecules**, each of which points to specific path within our components directory. These are the namespaces Storybook understands when incuding/nesting components. You can have as many namespaces as needed.

### Adding global styles

* Inside the **src** directory, create a new directory called **css**
* Inside the **css** directory, add two new files, **reset.css** and **styles.css**
* Copy and paste the styles for [reset.css](https://raw.githubusercontent.com/mariohernandez/storybook/card/src/css/reset.css){target=_blank rel=noopener} and [styles.css](https://raw.githubusercontent.com/mariohernandez/storybook/card/src/css/styles.css){target=_blank rel=noopener}
* Now in order for Storybook to use _reset.css_ and _styles.css_, we need to update **/.storybook/preview.js** by adding these two imports directly after the current imports, around line 4.

{% raw %}

```js
import '../dist/css/reset.css';
import '../dist/css/styles.css';
```

{% endraw %}

### Previewing the Card in Storybook


* In your command line, navigate to the **storybook** directory and run:

{% raw %}

```shell
nvm install
npm install
npm run build
npm run storybook
```

{% endraw %}
_Remember, you need NodeJS v20 or higher as well as NVM installed on your machine_.

**NOTE**: The command `npm run build` is required the first time you are building your Storybook app and whenever major changes are made to the app's configuration. After that, you can simply run `npm run storybook`.

After Storybook launches, you should see two story categories in Storybook's sidebar, **Atoms** and **Molecules**. The title component should be under Atoms and the Card under Molecules. See below:

![Palm trees near city buildings](/images/card-shot.webp){.body-image}

## Prepping Drupal for integration

With the Card component now in place, let's change our attention back to Drupal. If you are following along, go ahead and complete the following tasks:

* Install and enable the [Components libraries](https://www.drupal.org/project/components){target=_blank rel=noopener} module
* Add the following at the end of **storybook.info.yml** (mind your indentation):

{% raw %}

```yml
components:
  namespaces:
    atoms: src/components/01-atoms
    molecules: src/components/02-molecules
```

{% endraw %}
_These are the same namespaces we created earlier for Storybook, but this time we are creating them for Drupal_.

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

* Let's go over the changes to both, **storybook.info.yml** and **storybook.libraries.yml** files:

  * The block of code we added in **storybook.info.yml** is critical for Drupal to find our components in Storybook.  Using the Components libraries module allows us to create namespaces. Namespaces make it easier for us to tell Drupal where to look for our components since each namespace (`@atoms`, `@molecules`, etc.), is associated with a specific path to the corresponding components. This is important because Drupal by default only looks for Twig templates inside the **/templates** directory.
  * We added two CSS stylesheets (reset.css and styles.css), that handle base styles in our theme. Those stylesheets are included in the Global library.  In addition, if you recall when we created the Card component, the first line inside **card.twig** is a Twig attach library statement. Using libraries is the recommended way for adding CSS and JS to pages/components.  The library does not exist so in the second part of the code snippet in **storybook.libraries.yml** we add the library so Drupal can make use of the card's CSS and JS (if available).

* Enable the Storybook theme and make it the default theme.

## Integrating the Card component

### Template suggestions

All the pieces are in place to Integrate the Card component so Drupal can use it to render article nodes when viewed in teaser view mode.

* The first thing we need to do to begin the integration process is to determine which Twig template Drupal uses to render article nodes in teaser view mode. One easy way to do this is by turning Twig debugging on. This used to be a complex configuration but starting with Drupal 10.1 you can now do it directly in Drupal's UI:

  * While logged in with admin access, navigate to `/admin/config/development/settings` on your browser. This will bring up the Development settings page.
  * Check all the boxes on this page and click **Save settings**.  This will enable Twig debugging and disable caching.

* With Twig debugging on, go to the homepage where the Article we created should be displayed in teaser mode. If you right-click on any part of the article and select **inspect** from the context menu, you will see in detail all the templates Drupal is using to render the content on the current page.
**NOTE**: If your homepage does not display Article nodes in teaser view mode, you could create a simple Drupal view to list Article nodes in teaser view mode to follow along.

![Code inspector showing Drupal debugging](/images/storybook-debug.webp)
_Example of code inspector showing Drupal templates_

There are a lot of templates to see here but the ones we are interested in are the ones with the name **node...***. These are the templates used to display any type of node in Drupal. In addition to template names, Twig debugging also tells us where the template being used is located (Drupal core, a module, our theme, etc.).
I have marked with an arrow the template **node.html.twig**, which is the one Drupal is currently using to render the Article node. The template with an **X** before its name is the one currently being used to render the article.
Just above the active template see a list of more templates that start with **node...**. These are known as template suggestions. Drupal is basically telling us that if we want to override the way a node is rendered, we can create a template inside our theme with any of the names being suggested.  The higher the template appears on the list, the more specific it is to the piece of content being rendered. For example, changes made to **_**node.html.twig**_** would affect ALL nodes throughout the site, whereas changes made to **node--article--teaser.html.twig** will only affect nodes of type **article** when displayed in **teaser** view mode.
With this information on hand, it is clear to us the template suggestion we need to create is **node--article--teaser.html.twig**.

#### Copy the template

By looking at the path of the template in the code inspector, we can see that the original template being used is located inside the Olivero core theme. It's best to create our template suggestion by copying a similar template to the one we want to create.

* Copy **/core/themes/olivero/templates/content/node--teaser.html.twig** into your theme's **/storybook/templates/content/**. Create the directory if it does not exist.

The template we just copied has a lot of information that may or may not be needed when integrating it with Storybook. If you recall, the Card component we built was made up of three parts: an image, a title, and teaser text.  Each of those are Drupal fields and these are the only fields we care about when integrating. Whenever I copy a template from Drupal core or a module into my theme, I like to leave the comments on the template untouched. This is helpful because this way you can reference all the details about the template as you override it.

### The actual integration

1. Delete everything from the newly copied template except the comments and the **classes** array variable
1. At the bottom of what is left in the template add the following code snippet:

{% raw %}

```php
{% set render_content = content|render %}

{% set article_title = {
    'level': 2,
    'modifier': 'card__title',
    'text': label,
    'url': url,
  }
%}

{% include '@molecules/card/card.twig' with {
  'attributes': attributes.addClass(classes),
  'image': content.field_image,
  'title': article_title,
  'teaser': content.body,
} only %}
```

{% endraw %}

* We set a variable with `content|render` as its value. The only purpose for this variable is to make Drupal aware of the entire content array for caching purposes.
* Next we setup a variable called **article_title** which we structured the same way as the title component:
  * Notice how for the **text** and **url** properties we are using Drupal specific variables (**label** and **url**), accordingly. If you look in the comments in _node--article--teaser.html.twig_ you will see these two variables.
* We are using a Twig **include** statement with the **@molecules** namespace to nest the Card component into the node template. The same way we nested the Title component into the Card.
* We mapped Drupal's attributes into the component's attributes placeholder so Drupal can inject any attributes such as CSS classes, IDs, Data attributes, etc. into the component.  This is important because we want to make sure that although our markup is custom, our components still take advantage of everything Drupal has to offer.
* Finally we mapped the image, title and teaser fields from Drupal to the component's equivalent fields.
* Save the changes to the template and clear Drupal's cache
* Reload the homepage and you should see the article node being rendered using the Card component. See below:
![Example of twig debugging](/images/integrated-card.webp){.body-image .body-image--narrow}
* If you right-click on the article and select **Inspect**, you will notice the following:
  * Drupal is now using our **node--article--teaser.html.twig**, we can tell because the filename with an **X** before its name is **node--article--teaser.html.twig** but if we look a little lower we will see **BEGIN OUTPUT From 'themes/custom/storybook/src/templates/content/node--article--teaser.html.twig'**.
  * You will also noticed that the article is using the custom markup we wrote for the Card component which is more semantic, accessible, but in addition to this, the **`<article>`** tag is also inheriting several other attributes that were provided by Drupal through its Attributes variable. See below:

![Drupal template suggestions in code inspector](/images/attr.webp){.body-image .body-image--wide}


## In closing

This is only a small example of how to build a simple component in Storybook using Twig and then integrate it with Drupal so content is rendered in a more semantic and accessible manner. There are many more advantages of implementing a system like this. I hope this was helpful and see the potential of a component-driven environment using Storybook. Thanks for visiting.
