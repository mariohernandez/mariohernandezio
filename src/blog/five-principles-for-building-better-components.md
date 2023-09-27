---
date: '2021-09-04'
title: 'Five principles for building better components'
tags: ['patterns', 'components']
featured: false
featuredImage: '/images/paths.jpg'
featuredImageAlt: 'Person confronted with two paths to choose from'
featuredImageCredit: 'Caleb Jones'
featuredImageCreditUrl: 'https://unsplash.com/@gcalebjones'
summary: 'There are times when building a Drupal site you need to dynamically point to an asset or resource that may not be saved in the database but instead is located somewhere in your site or theme.  I recently learned about two very handy Twig variables that can help you achieve this.  Read on...'
---

I was recently building a component that required a static image which did not exist in the database but instead needed to be stored somewhere in the file system of the site.  There are several ways for achieving this for example we could have stored the image in the `sites/default/files/images/` directory and then reference it using Twig's handy `{{ file_url('public://image.jpg') }}` statement.  Nothing wrong with this approach, but in my case, I was building a component and I wanted for the component image to be located within the same component directory.  This makes sense because if I wanted to reuse or share this component, I simply grab the component's directory and everything about the component, including its image, would come in a single directory.

Although this may seem like a simple challenge, my goals was to dynamically point to the image regardless the site this component was running on.  Did I forget to mention we are running a multi-site architecture with hundreds of sites and a single code base? yeah, so this component needed to work in all of these hundreds of sites.  Now the challenge seems a little more... "challenging".

I started doing some research to determine the best way possible to achieve this.  I read about creating a pre-process function that would generate a dynamic path of the site's base path and also the theme's path where the image is located, but I was hoping I coudld achieve this in Twig since after all I was bulding the component in Twig.  After some research and trying different things, I ran across two little gems that were a game-charger.  In most twig templates, you can get your site's base path by using `{{ url('<front>') }}`.  This however is not good enough because if used as it was declared here, what would print on the page would be **<front>**, a string.  Before we can make use of the actual outcome of the statement above, we needed to render it so we can obtain the actual value of the homepage/base path.  So the statement above needed to change to `{{ url('<front>')|render }}`. Now the output of the statement will actuall be our site's base path (`http://my-site.com/`).  Don't underestimate the trailing slash ("/") because that makes things easier when creating a path.

So the first part is done, now we need to find a way to dynamically create a path to our theme.  Some may think, well, how about `/themes/custom/theme-name`?  Sure.  As long as all the sites are using the same theme.  In my case they are not.  So our theme path needs to work regardless of the theme each site is using.  Back to research and trying things.  This is when I found a little variable I never knew about in my over 15 years as a Drupal Front-end developer.  The `{{ directory }}` variable in a Twig template within your theme will output ... the current's theme path.  How cool is that?

So now with these two weapons in hand, I could actually compose a dynamic path to my theme by concatenating the two Twig statements above like this: `{{ url('<front>')|render ~ directory ~ '/images/my-image.jpg' }}`.  Now no matter the site or the theme in the site, we have a dynamic path to our component's image.

I realized some people reading this already knew all of this but I didn't.  So I figured I would share it because I bet there are others out there that also do not know about the `{{ url('<front>') }}` or `{{ directory }}` Twig statements statements.  As I said before, there are many ways in which this challenged could be addressed, but in my case this is exactly how I wanted to approachh it.  I hope</front>)`

</front> the first part is don

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
