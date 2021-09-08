---
date: "2021-06-17"
title: "Demystifying components integration with Drupal"
tags: ['components', 'integration', 'drupal']
featured: false
featuredImage: "/images/integrate.jpg"
featuredImageAlt: "Image of a net showing interlaced mesh"
featuredImageCredit: "JJ ying"
featuredImageCreditUrl: "https://unsplash.com/@jjying"
summary: "Components integration with Drupal can be a complicated task, but there are also ways in which this task can be simplified.  This post shows you how."
---
Component-based development is something I have been doing for at least five years and it is incredible that I still find myself learning something new every time I work on a new project.  In addition to development, I write training curriculums on the topic and this gives me more exposure to this topic than most people.  You’d think by now I should have learned all there is to learn about components and integrating them with Drupal, but that’s not the case, and I love it because I alway look forward to learning something new.

## The inspiration for this post

I came across an outstanding blog series about _Building with Emulsify Part 3: Component Complexity_ by [Evan Willhite of Four Kitchens](https://www.fourkitchens.com/blog/development/building-emulsify-part-3-component-complexity/).

## It's not you, it's me

I’d say I’m about 90% onboard with how Evan approaches component integration, but the part I am not a fan of is writing preprocess functions to achieve full integration, mainly because I am not well-versed in preprocess functions or PHP in general. There is absolutely nothing wrong with this, but what if you are someone like me who is not comfortable with preprocess functions or custom modules?  So I decided to use most of the work Evan put together, but will perform the integration slightly differently so we only work with Twig and not PHP.

Both instances for which PHP code was required in Evan’s post were the result of using a Paragraph type to reference nodes.  My approach will be to eliminate the paragraph type and work directly with the node entity.

Let’s start.  I will pick up from **Architecture** since everything prior to this is typically the approach I take as well.

## Architecture

We want administrators to create Nodes of any type and using a Display View Mode we can automatically display them using the card component.  The one difference for me is that I don’t have a card variation.

## Passing data between entities

Following Evan’s instructions, create a new Display view mode called Card.  Here's another minor difference in that my Card uses an image field and date field in addition to title, body, and link fields.  Here’s what the card looks like.

<img style="display:inline" src="/images/card.png" alt="Woman smiling while looking up" />

In the Card display view mode of an Article content type, ensure Body and Image are available.  All other fields should be placed under Disabled.  The Title and Date fields don’t display in the Manage Display screens, but they are always available in all Entity templates.

## Integrating the Card component within a Node template

Just like in Evan’s post, we still need to associate a Node template with our Card.  For this we will use the same template suggestion as Evan, `node--card.html.twig`.  This is a summarized version of the integration code, see a full template at the end of this post.


## Displaying a list of cards with Views

Now that the Card component has been integrated with Drupal, let’s create a simple view to display a collection of nodes displayed as Cards.

The views' settings can be seen below with description of the important configurations to note.

<img style="display:inline" src="/images/view.png" alt="Screenshot of settings for Latest Articles view" />

A few things about the view:

* It’s called Latest Articles
* The page built by the view can be viewed at /blog
* Rather than using fields it uses the Card view mode we created earlier.  This is the biggest advantage of integrating the Card component with the Entity, any time a node is displayed using the Card Display View Mode, the node will be displayed automatically as a Card.
* It only pulls nodes of type Article

With some minor CSS the articles would look like this:

<img style="display:inline" src="./latestarticles.png" alt="List of latest articles shown as cards" />

### In closing

There will be times when writing a preprocess will be required based on the requirements, but whenever possible I’d like to avoid it.
