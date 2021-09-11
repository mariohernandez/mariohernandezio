---
date: "2018-07-21"
title: "Flexible Headings with Twig"
tags: ['components', 'twig']
featured: false
featuredImage: "/images/flexible-headings-hero.jpg"
featuredImageAlt: "Stacked rocks"
featuredCredit: "Unsplash.com"
featuredCreditUrl: "https://unsplash.com/"
summary: "Headings are normally used for page or section titles and are a big part of making your website SEO friendly and more accessible. For these reasons, headings need to be carefully planned."
---

<blockquote>
  Proper use of headings h1-h6 in your project presents many advantages incuding semantic markup, better SEO ranking and better accesibility.
</blockquote>


**_Updated April 3, 2020_**


Building websites using the component based approach presents all kinds of advantages over the traditional page building approach. Today I’m going to show how to create what would normally be an Atom if we use the atomic design approach for building components. We are going to take this simple component to a whole new level by providing a way to dynamically controlling how it is rendered.



## The heading component
Headings are normally used for page or section titles and are a big part of making your website SEO friendly.  As simple as this may sound, headings need to be carefully planned.  A typical heading would look like this:

```html
<h1>This is a Heading 1</h1>
```

The idea of components is that they are reusable, but how can we possibly turn what already looks like a bare bones component into one that provides options and flexibility? What if we wanted to use a h2 or h3? or what if the title field is a link to another page? Then the heading component would probably not work because we have no way of changing the heading level from h1 to any other level or add a URL. Let's improve the heading component so we make it more dynamic.


## Enter Twig and JSON
Twig offers many advantages over plain HTML and today we will use some logic to transform the static heading component into a more dynamic one.

Let’s start by creating a simple JSON object which we will use as data for Twig to consume.  We will build some logic around this data to make the heading component more dynamic.  This is typically how I build components on projects I work on.

1. In your project, typically within the components/patterns directory create a new folder called **heading**
2. Inside the heading folder create a new file called **heading.json**
3. Inside the new file paste the code snippet below

```json
{% raw %}
{
  "heading": {
    "heading_level": "",
    "modifier": "",
    "title": "This is the best heading I've seen!",
    "url": ""
  }
}
{% endraw %}
```

So we created a simple JSON object with 4 keys: **heading_level**, **modifier**, **title**, and **url**.

* The `heading_level` is something we can use to change the headings from say, h1 to h2 or h3 if we need to.
* The `modifier` key allows us to pass a modifier CSS class when we make use of this component. The modifier class will make it possible for us to style the heading differently than other headings, if needed.
* The `title` key is the title's string of text that will become the title of a page or a component.
* ... and finally, the `url` key, if present, will allow us to wrap the title in an `<a>` tag, to make it a link.

4. Inside the heading folder create a new file called **heading.twig**
5. Inside the new file paste the code snippet below

```php
{% raw %}
<h{{ heading.heading_level|default('2') }} class="heading{{ heading.modifier ? ' ' ~ heading.modifier }}">
  {% if heading.url %}
    <a href="{{ heading.url }}" class="heading__link">
      {{ heading.title }}
    </a>
  {% else %}
    {{ heading.title }}
  {% endif %}
</h{{ heading.heading_level|default('2') }}>
{% endraw %}
```

---

Wow! What's all this? 😮

Let's break things down to explain what's happening here since the twig code has changed significantly:

* First we make use of `heading.heading_level` to complete the number part of the heading.  If a value is not provided for _heading_level_ in the JSON file, we are setting a default of 2.  This will ensue that by default we will have a `<h2>` as the title, much better than `<h1>` as we saw before.  This value can be changed every time the heading isused.  The same approach is taken to close the heading tag at the last line of code.
* Also,  in addition to adding a class of `heading`, we check whether there is a value for the `modifier` key in JSON.  If there is, we pass it to the heading as a CSS class.  If no value is provided nothing will be added.
* In the next line line, we check whether a URL was provided in the JSON file, and if so, we wrap the `{{ title }}` variable in a `<a>` tag to turn the title into a link.  The `href` value for the link is `{{ heading.url }}`.  If no URL is provided in the JSON file, we simply print the value of `{{ title }}` as plain text.

## Now what?
Well, our heading component is ready but unfortunately the component on its own does not do any good.  The best way to take advantage of our super smart component is to start using it within other components.


## Putting the heading component to use
As previously indicated, the idea of components is so they can be reusable which eliminates code duplication.  Now that we have the heading component ready, we can reuse it in other templates by taking advantage of twig’s `include` statements.  That will look like this:

```php
{% raw %}
<article class="card">
  {%
    include '@components/heading/heading.twig' with {
      "heading": heading
    } only
  %}
</article>
{% endraw %}
```

The example above shows how we can reuse the heading component in the `card` component by using a Twig’s `include` statement.

**NOTE**:  For this to work, the same data structure for the heading needs to exist in the card’s JSON file.  Or, you could also alter the heading's values in twig, like this:

```php
{% raw %}
<article class="card">
  {%
    include '@components/heading/heading.twig' with {
      "heading": {
        "heading_level": 3,
        "modifier": 'card__title',
        "title": "This is a super flexible and smart heading",
        "url": "https://mariohernandez.io"
      }
    } only
  %}
</article>
{% endraw %}
```

You noticed the part `@components`? this is only an example of a namespace.  If you are not familiar with the [component libraries](https://www.drupal.org/project/components) Drupal module, it allows you to create namespaces for your theme which you can use to nest or include components as we see above.


### End result

The heading component we built above would look like this when it is rendered:

```html
<h3 class="heading card__title">
  <a href="https://mariohernandez.io" class="heading__link">
    This is a super flexible and smart heading
  </a>
</h3>
```

## In closing

The main goal of this post is to bring light on how important it is to build components that are not restricted and can be used throughout the site in a way that does not feel like you are repeating yourself.

***

#### Additional Resources:
[Managing heading levels in design systems](https://medium.com/@Heydon/managing-heading-levels-in-design-systems-18be9a746fa3).
