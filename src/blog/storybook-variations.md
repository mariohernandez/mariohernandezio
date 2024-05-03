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

One great way to enhance your components catalog is by creating components variations. Variations of a component reduce the need to building more components while still providing alternative ways for displaying a component. A component can be displayed in one way on a full page and in a different way when placed on the sidebar of page.
The screenshot below shows how a simple card component can be built and displayed in so many ways.

![Card with multiple variations](/images/variations.webp)

## Ways to create components variations

There are different ways for creating variations of a component. Sometimes adding a simple CSS class to a component will allow you to change the look and feel of the component. Other times it may be necessary to change the data fields for each variation. The method you use for your variations depends on your requirements as well as how the original component was built.

## When is better to build an entirely new component than a variation

In some instances, the component you wish to create variations for may not be as flexible markup-wise or its logic may become too complex as a result of making the component look or behave differently as a variation. In cases like this, it is not worth the trouble to over complicate how a component is built or try to make the component do too much just to keep your components count low. When you are faced with this dilemma, it is important to stop and determine whether a better way to go is to build a new component altogether in order to simplify not only the building of the component but also its maintenance long term.

## Important points when building variations

1. Semantic markup is key. Your components markup not only needs to be semantic and accessible, but it should also be drafted in such a way that when a component changes visually due to viewport sizes for example, its change is natural and not forced by shifting content around through CSS or JavaScript.
1.
