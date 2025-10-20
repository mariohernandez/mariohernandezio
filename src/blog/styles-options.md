---
date: "2025-10-20"
title: "Customizing Drupal Paragraph types with Style Options"
subtitle: "A light weight approach to adding dynamic customization options to your paragraph types using the style_options module."
tags: ['drupal', 'theming']
draft: false
featured: true
featuredImage: "/images/heroes/styles-options.webp"
featuredImageAlt: "Multiple individuals building a web page as if they are building a house"
imageThumb: "/images/thumbs/styles-options-thumb.webp"
featuredImageCredit: "Microsoft Copilot"
featuredImageCreditUrl: "https://copilot.microsoft.com/"
summary: "Making your paragraph types more flexible and scalable by adding customization options your content editors will love."
eleventyExcludeFromCollections: false
---
To build scalable websites, build solid, reusable, and customizable frontend components. Flexible and dynamic components not only benefit developers by reducing code duplication or complexity, but they also improve the Editor's user experience by providing them with option to enhance how content is displayed. The method for exposing these options to content creators depends on your site's architecture and Drupal setup.

In this post I'll be using the amazing [Paragraphs](https://www.drupal.org/project/paragraphs){target="_blank" rel="noopener noreferrer"} Drupal module in combination with the [Style options](https://www.drupal.org/project/style_options){target="_blank" rel="noopener noreferrer"} modules. Paragraphs has a solid ecosystem and its key features are being considered for the new Drupal Experience Builder or Canvas.

>Dries: Our main goal is to create a tool that site builders love, with an amazing out-of-the-box experience. By integrating key features from Paragraphs, we also aim to create a unified solution that reduces fragmentation, accelerates innovation, and ensures Drupal remains at the forefront of site building.[^1]

## Example of a flexible component

Consider the component below which it's pretty straight forward by nature but can be customized in several ways to create interesting content displays.

![Card with with image and text side by side](/images/blog-images/style1.webp){.body-image .body-image--left}

Card with image and text side by side with white background{.caption}

![Card with with image and text side by side with dark background](/images/blog-images/style3.webp){.body-image .body-image--left}

Card with image and text side by side in reversed order with dark background{.caption}

![Card with with image and text side by side](/images/blog-images/style2.webp){.body-image .body-image--left}

Card with image and text side by side in reversed order with white background{.caption}

To achieve the various displays shown above on the Front-end we simply pass a CSS modifier class to the component and write the corresponding CSS, but how do content creators select the display they wish to use during content creation?

## The Style Options module

Providing customization options to content editors via a UI usually requires storing data in the database in the way of new fields, new entities view modes, entity references and more.

The Style options module is an appealing choice because there are no new fields or entity view modes to be created. Instead, the Style options module stores all configuration options in a YAML file in the root of your theme or module. An example of this file is provided by the module, `example.style_options.yml`, which includes great examples for customizations options. The module is considered a "Developer Module" as it does not provide a UI to work with.

### Install and Configure Style Options

Install and enable the style_options module as you normally do other modules.

Either create a new paragraph type or edit an existing one you wish to provide styles options to and enable the **Style Options** behavior as shown in the screenshot below.

![Enable the style options functionality in Card paragraph type](/images/blog-images/styles.webp){.body-image .body-image--left}

Enable the style options functionality in a paragraph type{.caption}

Lastly, be sure your paragraph types templates make use of the `attributes` variable as this is how Style options passes the CSS class to your templates.

### Styles_options configuration example

The Style options module provides three plugins:

* The **CSS Class** plugin, for attaching custom CSS classes to components.
* The **Background Color** plugin, for attaching background colors to components.
* The **Background Image** plugin, for attaching background images to components.

Let's take a look at a simple example of providing Editors with options to change the side the image is displayed in the Card component example we saw earlier. For simplicity, I'll only configure the _CSS Class_ plugin as this is the one I used the most.

Create the styles option configuration file in the root of your module or theme directory with the naming convention `[module name].style_options.yml` or
   `[theme name].style_options.yml`.

{% raw %}

```yaml
# [my-theme].style_options.yml
options:
  content_order:
    plugin: css_class
    label: 'Select a Border Style'
    multiple: false
    options:
      -
        label: Select
      -
        label: Image on Left
        class: image-left
      -
        label: Image on Right
        class: image-right
contexts:
  paragraphs:
    _defaults:
      options:
        ...
    my_paragraph:
      options:
        content_order: true
```

{% endraw %}

Example of styles to customize a component's border style.{.caption}

### Breaking it all down

`options` defines the section for all available style options.

`content_order` is an arbitrary name related to the style you wish to implement.

`plugin` is one of the three available plugins (css_class, background_color, background_image).

`label` is the label Editors see followed by a set of options.

`multiple` is a boolean type key which determines if multiple options selection is allowed.

`options` is an array of available options for Editors to choose from.

* `label` is the label of an individual option
* `class` is the actual CSS class you want to pass to the component.

  **Note**: Omitting a class key as shown as the first option with label of **None**, simply means no class will be pass. It is still helpful to provide a label for more clarity to Editors.{.callout}

`contexts` section defines which options should be available for specific contexts (i.e. specific Layout Plugins, Paragraph Types, etc.)

`paragraphs` defines a section for paragraph types to make use of the options defined within the **options** section (i.e. content_order).
Another context that can be added is **layout**.
`_defaults` allows to define as many style options as possible as defaults for all paragraphs. This avoids repeating the same configuration for each paragraph type individually.
`my_paragraph` is the ID for the paragraphs I want to configure with specific options (i.e. content_order).

### How are options selections tracked by Drupal?

Earlier I mentioned that one advantage of using something like Styles options to manage components behavior options as opposed to traditional methods like new fields or view modes, is the minimal interaction with Drupal's configuration and database storage. While this is true, Drupal still needs to track the options content editors select.

Let's do a more detailed review of the `options` array Editors choose from. I've suppresed a couple of lines for clarity.

The second `options:` key (line 7 from code snippet above), is a **zero-based** indexing array. This means their index value in the database is based solely in the order they are declared within the options array.

### Why is this important?

**Warning**: Since Drupal uses the options index value to track options selected by users, altering this order by rearranging, adding or removing options after it has been in use, will result in components styles and/or behavior not working as expected.{.callout .callout--danger}

Let's see a quick example using the original configuration we created earlier. I'm omitting all but the necessary code for simplicity.

{% raw %}

```yaml
options:
  - # Index value = 0
    label: Select
  - # Index value = 1
    label: Image on Left
    class: image-left
  - # Index value = 2
    label: Image on Right
    class: image-right
```

{% endraw %}

Let's say we want to remove the **Image on Left** options as it seems redundant because the Card's default state (Image on the left), should require no CSS class.

{% raw %}

```yaml
options:
  - # Index value = 0
    label: Select
  - # Index value = 1
    label: Image on Right
    class: image-right
```

{% endraw %}

Now index `1` has a new value of `image-right`, and index value `2` no longer exists.
With this change, Editors will see **Image on Right** as the only option to choose. However, any Cards that were configured with the original two options may experience unexpected bahavior because the `image-left` CSS class no longer is passed to the component, instead, they will get the class `image-right` since the former index `2` has been moved up to index `1`.

### How to solve this issue?

There are times when altering options for a component after its original configuration is needed or required. When this happens, Drupal's database needs to be updated to reflect the correct values. The way you do this is totally up to you. In some cases writing a preprocessor will do while others you may need a more elaborate data migration script.

Keep in mind, this is not a Styles options issue, this is just the way it works if the fields or options you had available are changed or removed.

#### Footnotes{.footnotes__heading}

[^1]: Dries Buytaert. “Evolving Drupal's Layout Builder to an Experience Builder.” [dri.es](https://dri.es/evolving-drupal-layout-builder-to-an-experience-builder){target="_blank" rel="noopener noreferrer"}, April 23, 2024.
