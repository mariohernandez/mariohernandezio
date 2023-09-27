---
date: '2021-09-04'
title: 'Five principles for building better components'
tags: ['patterns', 'components']
featured: true
featuredImage: '/images/wireframes.jpg'
featuredImageAlt: 'Hand drawing website wireframes'
featuredImageCredit: 'Sigmund'
featuredImageCreditUrl: 'https://unsplash.com/@sigmund'
summary: 'With great power comes great responsibility.'
---

When working on a component-based project, building components or patterns, can be a liberating experience because we are able to draft the best markup possible to build the most flexible, scalable and reusable components.  If you work with third party platforms such as SharePoint, WordPress, Drupal, or others, this becomes even more rewarding as in most cases content management systems are not known for producing the best markup possible.  However, this liberating experience can come a a price if you are not taking the appropriate measures and checks when building your library of patterns.
In this post I am going to discuss five critical principles I follow when building components.  My goal is always to achieve first and foremost, semantic markup that works in all devices including assistive technologies, reusability, scalability, and finally, ease of use.  In some cases it is hard to achieve all of these goals so it is important to understand where you draw the line and what is more important in the long term.

**Disclaimer**: _Components and Paterns are used interchangeably_.

## Find patterns in your patterns

Ideally, before you begin building patterns, or components, you want to fully understand how and when these patterns will be used.  Certainly there are times when we don’t have all this information when we first start working on a project, but if you do, take a detailed inventory of your patterns. Doing this will help you build better and more reusable patterns.
Failing to identify the patterns in your patterns can lead to bad decisions when building them.  For example, let’s say we have a card component for displaying latest news articles, if we don’t know that there are cards for events that look similar to news articles, we may miss an opportunity to turn the card component into one we can use for multiple purposes in our website.  But don’t let this get you down, building a website is an iteration process.  If you later discover that the news card component can be leveraged for events, it’s perfectly okay to update the card component so it can be used with events as well.  My point is that it is preferred if you can catch these patterns early on, but we all know that sometimes designs are not always available in full when a project is started and when they become available we may need to re-think our process of component-building.

## Don't sacrifice simplicity over reusability

Reusability when working with components is important and should be at the forefront when building components, however, don’t paint yourself in a corner by over-engineering your components because you found a way to turn a component into a multi-level reusable machine.  Trying to make your components do too much can lead to over complex development and in the long run, very hard to maintain.  It is better to have components that are simple and easy to maintain even if it means you may have some components that are similar.  It is hard to find the balance between simplicity and reusability and this discovery will only come as you work on your components.  If you have to choose between simple and reusable, simple may be the way to go.

## One set of markup for all devices

Earlier I mentioned that before you start building components you should have a full picture of how and when those components will be used by looking at the design comps.  Of course this is not always possible, but in an ideally designs comps give us opportunities to identify areas of improvement or areas that could lead to potential problems.  An example of a problem would be if you are provided the designs for mobile, tablet, and desktop.  This is great, but let’s say the information displayed at each device type changes in such a way that you don’t know how to best write the markup so it works on all devices.  In a perfect world, you should not have to alter the markup of your components per breakpoint.  Doing so could lead to confusion on how content is rendered, not to mention problems with accessibility or even SEO.  If you find that markup may be a challenge from breakpoint to breakpoint, it is perfectly okay to go back to the designer and propose updates to the design so a unified markup structure could serve all devices.  In my experience, the designer would be okay with your recommendations as long as you are not completely changing the layout of the website but instead are simply proposing minor adjustments that don’t change the overall look and feel of the website.
In some cases a designer may not be fully aware that the designs they are proposing could lead to issue when the site is rendered in different device sizes, so it’s okay to bring these issues to their attention and you may find that they are onboard with your suggestions.

## Find the right names for your patterns

Another way to paint yourself in a corner is by the name you choose for your components. Component names should be generic and yet descriptive so they can be used on different scenarios.  Conversely, names that are too specific will limit when and how you can use those components.  Let’s take a look at some bad component names and propose a better name:

- News Card:  If we think back of how we can reuse components, naming a component News Card will limit us on what kind of content we can use this component on.  What if Events use a similar card with minor differences?  A better name for this component may be Card or Content Card.  This allows us to use on any type of content.

- FAQ Accordion:  We have seen this before, we want to build a collapsible list of Frequently Asked Questions so the name makes sense.  However, what if we want the same functionality for other type of content such as Forums or Knowledge base content?  A better name would simply be Accordion which describes the functionality of the component, not the content that it can hold.

- Latest News List:  Again, we are limiting ourselves to only showing content of type news.  A list of content should be generic so we can use them for any kind of content (i.e. Blog posts, events, popular content etc.).  A more appropriate name would be Content List.

- Finally, Homepage Hero:  It is not uncommon for Hero sections to be in multiple pages other than the homepage.  By naming this component simply Hero, we can leverage it and use it in more than just the homepage.  You may wonder, what if I have other types of heroes in non-homepage pages?  Well, perhaps we can find alternative names for those, things like Hero Short, or Page Breaker, something that is descriptive and yet provides the ability to be used in multiple pages.

The above are only some examples of how a bad name can not only limit where or what type of content you can use your components with, but it can also lead to building unnecessary components.

## Document your components

One of the great things about design systems like Pattern Lab, Storybook and others, is that they provide a way to document the details of your components.  Documenting components can go a long way to ensure your entire team is fully aware of the why and how of your components.
I practice that I follow when building components is documenting the technical aspects of the component such as its name, where it is used, and details about any variants of the components.  Just as important, I like to define the components fields, their data type and values they accept.  This architectural information ensures gives your team and your stakeholders a detailed view of a components role in your project.

In closing, before you begin building components, take the time to study your design comps and take notes of how you feel you can make the most out of your components library.  You will not get it right the first time, that’s okay.  As long as you are giving yourself the room to iterate through the process, you can always go back and update a component if it will give you more flexibility and will turn your project into a solid component-based system.

### In closing

You may not always get it righ the first time, but keeping these principles in mind will help you achieve better implementation of your website's patterns.
