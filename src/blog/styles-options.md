---
date: "2025-10-13"
title: "Adding customizations to your Drupal paragraph types through style options"
subtitle: "A light weight approach to adding dynamic customization options to your paragraph types."
tags: ['theming', 'drupal']
# series:
#   slug: "css"
#   order: 1
draft: false
featured: true
featuredImage: "/images/heroes/frame.webp"
featuredImageAlt: "Black metal frame on beach sand"
imageThumb: "/images/thumbs/frame-thumb.webp"
featuredImageCredit: "Mooz L."
featuredImageCreditUrl: "https://unsplash.com/@ml335"
summary: "Turning your website components into more flexible building blocks by adding customization options."
eleventyExcludeFromCollections: false
---

Building solid and reusable Front-end components is a big part of building robust and escalable websites. When done right, components can be more dynamic and provide more value if they are able to be customized on demand. In most cases this can be accomplished by passing a modifier CSS class to the component to change its look and behavior, but how do you provide your content creators the ability or UI to make these customization? This depends heavily in the architecture of your website and the tools you have chosen to build your Drupal entities.

## Paragraph module

Yes, this blog focuses in the use of the amazing [Paragraphs](https://www.drupal.org/project/paragraphs){target="_blank" rel="noopener noreferrer"} Drupal module in combination with with [Layouts paragraphs](https://www.drupal.org/project/layout_paragraphs){target="_blank" rel="noopener noreferrer"} and [Style options](https://www.drupal.org/project/style_options){target="_blank" rel="noopener noreferrer"} modules.

As of the date of this post, the Drupal Experience Builder or Canvas initiative is still a moving target and it's hard to know where that will end up. One thing that seems promising is that back in [2024 Dries announced](https://dri.es/evolving-drupal-layout-builder-to-an-experience-builder){target="_blank" rel="noopener noreferrer"} they would be adopting the Paragraphs system as part of the new Drupal presentation initiative. I have not kept up with all the latest developments in this initiative, but I hope Paragraphs ends up being part of the mix because it's a great alternative to Drupal blocks and its ecosystem has matured at a great pace.

## Example of a flexible component

Consider the component below which it's pretty straight forward by nature but can be customized in several ways to create various interesting content displays.

![Card with with image and text side by side](/images/blog-images/style1.webp){.body-image .body-image--left}

Card with image and text side by side with white background{.caption}

![Card with with image and text side by side with dark background](/images/blog-images/style3.webp){.body-image .body-image--left}

Card with image and text side by side in reversed order with dark background{.caption}

![Card with with image and text side by side](/images/blog-images/style2.webp){.body-image .body-image--left}

Card with image and text side by side in reversed order with white background{.caption}

To achieve the various displays shown above on the Front-end we simply pass a CSS modifier class to the component and write the corresponding CSS for each, but how do content creators select the display they wish to use during content creation?

## Style options

In Drupal, like in most platforms, there are multiple ways to accomplish the same outcome. There are deciding factors for choosing one approach over the other. Providing customization options to content editors via an UI usually requires storing data in the database in the way of new fields, data options and conditional logic.

What makes the Style options module an appealing choice is that there are no new fields or entity view modes to be created in your entities thus reducing the need of data storage. Instead, the Style options module stores all configuration options in a YAML file. An example of this file is provided by the module, `example.style_options.yml`, which provides great examples for customizations with helpful comments.

### Configure and Install Style Options

![Enable the style options functionality in Card paragraph type](/images/blog-images/styles.webp){.body-image .body-image--left}

Enable the style options functionality in a paragraph type{.caption}

### Creating custom style options

#### Available plugins

The Style options module provides three plugins:

* The **CSS Class** plugin, for attaching custom CSS classes to components.
* The **Background Color** plugin, for attaching background colors to components.
* The **Background Image** plugin, for attaching background images to components.

In this post we will only focus in the **CSS class** plugin for simplicity.

Here's an example of customizing options to change the orientation of the card's content to switch the image/text to the oposite side:

{% raw %}

```yaml
options:
  content_direction:
    plugin: css_class
    label: 'Select the content direction'
    multiple: true
    options:
      -
        label: Default
      -
        label: Reversed
        class: is-reversed
```

{% endraw %}

Example of a Styles options configuration allowing Editors to change the direction of text/image as Default or Reversed.{.caption}

#### Breaking it all down

* The `options:` key defines all the available options. Think of this as the wrapper of all the options.

* `content_direction` is arbitrary and can be anything that makes sense to you bsed on the style/behavior you are trying to achieve (i.e. `is-wide`, `has-image`, `spacing`, `text_size`, etc.)

* `plugin` is one of the three available plugins described above.

* `label` is the label Editors see followed by a set of options. For example, "_Select the content direction_"

* `multiple` is a boolean type key which determines if users can select multiple options from the available options.

* `options` is an array of available options for Editors to choose from. Each option uses a **label** and **class**.
  * `label` is title or label of the options

  * `class` is the actual CSS class you want to pass to the component. In the example above, the class will be `is-reversed`.

  **Note**: Omitting a class key as shown in the **Default** option above, simply means no class is needed to style the component. It is still helpful to provide a label for more clarity to Editors.{.callout}

### How are options selections tracked by Drupal?

Earlier I mentioned that one advantage of using something like Styles options to manage components behavior options as opposed to traditional methods such as creating new fields or view modes in Drupal's entities, is that there is less interaction with Drupal's configuration and database storage. While this is true, Drupal still needs to track the selected options by users by storing them as content along with the component's content when they are created/edited.

Let's do a more detailed review of the `options` array Editors choose from. I've suppresed a couple of lines for clarity.

{% raw %}

```yaml
options:
  content_direction:
    ...
    options:
      - # index value = 0
        label: Default
      - # index value = 1
        label: Reversed
        class: is-reversed
      - # index value = 2
        label: Another option
        class: demo-class
```

{% endraw %}

The second `options:` key (line 4 above), is a **zero-based** indexing array. This means their index value in the database is based solely in the order they are declared within the options array. See commented lines above.

### Why is this important?

I have learned this the hard way.

Since Drupal uses the options index value to track options selected by users, altering this order after it has been in used, will result in components styles and/or behavior not working as expected.{.callout .callout--warning}

Adding new options to an active array may change the value of existing items causing your component to react to a different CSS class, not the one inteneded for it. For example, if index `1` used to have a CSS class value of `is-reversed`, then a new option is added to the array in the same order of index 1 with a CSS class of `is-stacked`, the new data structure for the options array will be as follows:

{% raw %}

```yaml
options:
  content_direction:
    ...
    options:
      - # index value = 0
        label: Default
      - # index value = 1
        label: Stacked
        class: is-stacked
      - # index value = 2
        label: Reversed
        class: is-reversed
```

{% endraw %}

Now index `1` nas a new value of `is-stacked`, while `is-reversed` has an index value of `2`. The Card component will behave differently because the values being passed as CSS classes don't match the expected values from the options array.

### How to solve this issue?

There are times when altering users options for a component is needed or required. When this happens, Drupal's database needs to be updated to reflect the correct values. The way you do this is totally up to you. In some cases writing a preprocessor will do while others you may need a more elaborate data migration script.

Keep in mind, this is not a Styles options issue, this is just the way it works if the fields or options you had available are changed or removed.






## The solution

Let's start with the standard and semantic markup for an image and its caption.

### The markup

{% raw %}

```html
<figure>
  <img src="image-path/image.webp" alt="Image alt text" />
  <figcaption>Image caption text.</figcaption>
</figure>
```

{% endraw %}

The `<figcaption>` is the element which provides the accessible name for the parent `<figure>`. So not only is the markup above semantic, but it is also important for accessibility as well as SEO.

### The CSS

```css
figure {
  inline-size: fit-content;

  figcaption {
    contain: inline-size;
  }
}
```

That's it! 🌈

Adding the CSS rule above to your global or reset stylesheets ensures the caption text will always be in harmony with the parent image.

### The result

![Building walls image with caption text that aligns with the image width](/images/blog-images/fixed-caption.webp){.body-image .body-image--left .body-image--wide}

I added a couple of extra lines of CSs to make the text look smaller and italic as well as some padding around the text.

```css
figure {
  inline-size: fit-content;

  figcaption {
    contain: inline-size;
    font-size: 90%;
    font-style: italic;
    padding: 2rem;
  }
}
```

## How does this work?

`inline-size` is a CSS logical property, meaning its direction depends on the writing mode of the document. In this example, you could also write `width: fit-content` with the same effect.

`fit-content` ensures the element is never smaller than its min-content size and never larger than its max-content size, while also respecting the available space. Similar to min-width or max-width. As a result, this lays the ground for the figcaption element. It creates the width context the figcaption element should adhere to.

`contain` tells the browser that an element and its subtree are independent of the rest of the page. This allows the browser to limit layout, style, and paint calculations only to that element when changes happen.

Using `inline-size` effectively “cages” the content horizontally: the content inside the element can’t force it to grow wider. Any overflow will be clipped, wrapped, or otherwise constrained.

In the case of the image caption, the `inline-size` value ensures the text width will never exceed the width of the image which was previously defined by using `fit-content`.

### Bonus

This technique not only solves the caption width issue—it also improves performance. By using modern logical properties, the browser does less processing to render your elements.

## In closing

Although this is technically still a hack, it feels much cleaner than previous approaches. And with the added performance benefits, I’d call this a win. I hope you find it useful.

Happy Coding! 🧑🏽‍💻
