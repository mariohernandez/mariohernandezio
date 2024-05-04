---
date: "2024-06-02"
title: "Components variations in Storybook"
tags: ['components','variations','storybook']
draft: false
featured: true
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

Sometimes when building a new component, we are not able to see beyond the use case of the component we are tasked with building. A few years ago I wrote a blog post about [principles for building components](../five-principles-for-building-better-components/). Rather than repeating myself, take a quick look at the article and comeback here when you are done. You will find those principles not only apply to building new components, but also to building variations of components.

## Building component variations in Storybook

Depending on the design system you are using or the platform you work with, creating components variations may vary. When I used Patternlab, a variation was created by adding a new file to your component's directory with the following naming convention: **componentName~variationName.json**. If the case of a Card component, my variations would be something like **card~horizontal.json**.

In Storybook this is different. We don't need to create additional files for variations (well, maybe sometimes), instead, we add the variations inside the same ***.stories.jsx** file.  Each variation in Storybook is called a **Story**, hence the name Storybook.  Let's take a look how we can build a couple of variations for a Card similar to the image above.

First off, I am going with the assumption that you already know how Storybook stories are created and that you have a Storybook project running.  If that's not the case, [read my blog post](../building-a-modern-drupal-theme-with-storybook/) on how to get everything setup so you can follow along here.. Ignore the fact that it says Drupal theme.

## The Card component

Another assumption I am making is that we will build the new component and variations for a Drupal site. For this reason, we will build the component in Twig then make it available to Storybook.

In the interest of time, I have a repo that already includes the base of the Card component so we can focus only on building the variations.

1. [Clone the repo](https://github.com/mariohernandez/storybook){target=_blank rel=noopener} where the base of the card is already in place
1. Switch to the **variations** branch by running `git checkout variations`
1. Run the project as instructed in the **README** of the repo

## Variations time

With the Storybook project up and running and the card component in place, it's time to begin building variations. Here are the variations we will be building:

* Horizontal
* With CTA
* Minimal


Ideally, you want to keep your catalog of components to a minimum but when the boss asks for a new component or functionality on the site, try to avoid your impulse to start creating a new component, instead, look around and determine if maybe just tweaking an existing component may get you the results you want.

I have seen projects where there are so many components that is hard to maintain them. In addition, I have also seen developers creating a number of components that essentially do the same thing. Coming into a project like that I was able to consolidate 8-10 components into 2 or 3 without loosing the current functionality or content editing flexibility. This was done by creating variations of existing components and removing duplicate components.

## Ways to create components variations

There are different ways for creating variations of a component. Sometimes adding a simple CSS class to a component will allow you to change the look and feel of the component. Other times it may be necessary to change the data fields for each variation. The method you use for your variations depends on your requirements as well as how the original component was built.

## When is better to build an entirely new component than a variation

In some instances, the component you wish to create variations for may not be as flexible markup-wise or its logic may become too complex as a result of making the component look or behave differently as a variation. In cases like this, it is not worth the trouble to over complicate how a component is built or try to make the component do too much just to keep your components count low. When you are faced with this dilemma, it is important to stop and determine whether a better way to go is to build a new component altogether in order to simplify not only the building of the component but also its maintenance long term.

## Important points when building variations

1. Semantic markup is key. Your components markup not only needs to be semantic and accessible, but it should also be drafted in such a way that when a component changes visually due to viewport sizes for example, its change is natural and not forced by shifting content around through CSS or JavaScript.
1.
