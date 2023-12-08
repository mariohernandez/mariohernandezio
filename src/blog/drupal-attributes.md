---
date: '2019-01-10'
title: 'Handling Drupal attributes in components'
tags: ['twig', 'drupal',]
featured: false
featuredImage: '/images/attributes.webp'
featuredImageAlt: 'Train tracks surrounded by tree lines'
imageThumb: '/images/thumbs/attributes.webp'
featuredImageCredit: 'Antoine Beauvillain'
featuredImageCreditUrl: 'https://unsplash.com/@antoinebeauvillain'
summary: 'As a Front-End developer, working with Twig and Drupal is a pretty liberating thing which presents all kinds of posibilies, but it can also open the doors to breaking things Drupal counts on.'
---

In Drupal's twig templates you'll often see an attributes variable being output within the template. This variable is how core and contrib modules inject their CSS classes, an ID, or data attributes onto template markup. You'll also find `title_prefix` and `title_suffix` variables. These are used by core and contrib modules to inject markup into twig templates. A good example of this is the core Contextual Links module. If you were to remove the attributes , title_prefix , and title_suffix variables from a node template, for example, then the Contextual Links module would no longer have a way to add its drop-down to the display of nodes.

In some cases this may not be an issue for you, but in general it's best to plan to accommodate those Drupal-specific variables in your component markup so that when you integrate Drupal content into your components, other features can be available too.

Since the attributes variable can include class, id, and data attributes in one variable, we need to make sure we only combine Drupal’s classes with ours, and let the other attributes render without Drupal classes. This can be accomplished on the main wrapper of the component template.

```php
{% raw %}
<article class="card{{ attributes ? ' ' ~ attributes.class }}"
  {{ attributes ? attributes|without(class) }}>
  {{ title_prefix }}
  {{ title_suffix }}
  {% if image %}
    <div class="card__image">
      {{ image }}
    </div>
  {% endif %}
  <div class="card__content">
    {% if heading %}
      {%
        include '@components/heading/heading.twig' with {
          "heading": {
            "title": heading.title,
            "url": heading.url,
            "heading_level": heading.heading_level,
            "classes": 'card__heading'
          }
        } only
      %}
    {% endif %}
  </div>
</article>
{% endraw %}
```

Note that the `without` twig filter in this example is a Drupal-specific filter, so for the component we'll want to make sure we’re using one that supports Drupal’s custom filters (most design systems such as KSS node, and Pattern Lab have configuration options that support Drupal twig filters).

Now if we integrate our card component with Drupal (i.e. `node--card.html.twig`), we can ensure Drupal's attributes and contextual links will be available when the component is rendered.  The node template, also known as presenter template, would look something like this:

```php
{% raw %}
{% set rendered_content = content|render %}
{%
   set heading = {
     title: label,
     url: url,
     heading_level: '4',
     attributes: title_attributes
 }
%}
{%
  embed '@components/card/card.twig' with {
    attributes: attributes,
    title_prefix: title_prefix,
    title_suffix: title_suffix,
    heading: heading,
    image: content.field_image is not empty ? content.field_image,
  } only
%}
{% endraw %}
```

* First we're triggering a full render of the content variable.
* Then we set up a variable for the Heading field,
* Finally we are using an `embed` twig statement to integrate the Card component. In the embed we are mapping all the Card fields with Drupal's data. We also pass in Drupal-specific items such as `title_prefix`, `title_suffix`, `attributes`, etc.


Our card component will be rendered with all Drupal's attributes and the ability to be edited inline thanks to the contextual links.

Hope this helps you in your component development journey.
