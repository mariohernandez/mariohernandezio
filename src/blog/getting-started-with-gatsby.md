---
date: "2018-06-08"
title: "Getting started with Gatsby"
tags: ['gatsby', 'react']
featured: false
featuredImage: "/images/gatsby-intro.webp"
featuredImageAlt: "Cyclist going very fast producing blur"
imageThumb: "/images/thumbs/gatsby-intro.webp"
featuredImageCredit: "Unsplash.com"
featuredImageCreditUrl: "https://unsplash.com/"
summary: "Your next website could very well be a static website with the power of React and the latest technologies.  Read on..."
---
As many developers, when I hear the words "static website" I immediate think of creating flat HTML pages and editing them by hand.  Times have changed.  As you will see, Static Site Generators (SSG), offer some of the most advanced features and make use of latest technologies available on the web.

Static Site Generators are nothing new.  If you search for SSG you will find many.  One of the most popular ones is [Jekyll](https://jekyllrb.com/), which I have personally worked with and it's a really good one.  However, this post focusing on [Gatsby](https://www.gatsbyjs.org/).  Probably one of the hottest system for creating static sites.

## What is Gatsby?

Gatsby's primarily objective is to build static sites, but as you will learn, that's just the tip of the iceberg.

> Gatsby is a blazing-fast static site generator for React.

## How does Gatsby work?

While other SSGs use templating languages like Mustache, Handlebars, among others, Gatsby uses React.  This not only allows for building modern component-driven websites, it also provides an incredible fast page rendering.  Like mind-blowing fast.

## Extending Gatsby

One of the most powerful features of Gatsby is its growing number of "Plugins".  Plugins are the building blocks of Gatsby.  They allow you to implement new features and functionality by running a couple of commands and making some configuration changes.  Anything from adding Sass to your React project, creating a blog, configuring Google Anaylitics and many many more.

Plugins are contributed code kindly provided by the generous Open Source community which totally rocks.  Anyone is able to write plugins and make them available to the world to consume and use.

Check out their [Plugins page](https://www.gatsbyjs.org/plugins/) for a full list of ways you can take your static site to the next level.

## Editorial Process

So we are building static sites and you may be wondering How do I create content for my site?  There are several ways in which you can create a content editign workflow for your site.  Probably the easiest way is to use static **Markdown** files.  Markdown is a lightweight markup language with plain text formatting syntax. It is designed so that it can be converted to HTML and many other formats. Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor. This blog is using markdown.  Since I am the only creating content I don't need a fancy administrative interface to crate content.

Markdown is only one of the ways you can create content for your static sites.  Others include more advanced methods such as plugging in Gatsby with your Content Management System (CMS) of choice.  This includes Wordpress, Drupal, Netlify, ContentaCMS, Contenful, and others.  This means if you currently use any of those CMSs, you can continue to use them to retain a familiar workflow while moving your front-end workflow to a simpler and easier to manage process.  This method is usually referred to as [decoupled or headless](https://pantheon.io/decoupled-cms), as your back-end is independent of your front-end.

## Quering Data

As previously mentioned, Gatsby with the power of React create the perfect system for building robust, flexible and super fast static sites.  However, there is a third component that takes that power to a whole new level, and that is [GraphQL](https://graphql.org/).

GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.


## Deploying Gatsby

Hosting for a Gatsby site can be done anywhere where React apps can run.  Nowadays that's pretty much anywhere.  However, before investing in an expensive and highly complicated hosting environment, take a look at some of the simpler and less expensive options on [this page](https://www.gatsbyjs.org/docs/deploy-gatsby/).
You will see that for a basic website, you can use several of the free options such as github pages, netlify and others which already include advanced continuous integration workflows.  For more advanced sites where a CMS may be involved, you can also find options for deployment that will simplify your DevOps process.

My own blog is running out of a github repo that automatically get deployed when I push new updates.  This is happening via Netlify which to me is probably the easiest way I have ever deployed a website.

## In closing

Don't worry if you are a little skeptical about static site generators.  I was too.  However, I gave Gatsby a try and I see myself building more gatsby sites in the future.  Before Gatsby I worked with Jekyll which is also a great static site generator, but what sets Gatsby apart is its seamless integration with React and GraphQL.  The combination of those 3 provides endless posibilities in your web building process.  Check it out.
