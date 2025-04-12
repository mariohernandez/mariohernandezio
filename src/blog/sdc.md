---
date: "2024-07-01"
title: "Single Directory Components and Storybook"
tags: ['single directory components', 'components','sdc','storybook']
draft: true
featured: false
featuredImage: "/images/paper-boat.webp"
featuredImageAlt: "Closeup photo of yellow paper boat"
imageThumb: "/images/thumbs/paper-boat-thumb.webp"
featuredImageCredit: "Alex Padurariu"
featuredImageCreditUrl: "https://unsplash.com/@alexpadurariu"
summary: "If you are thinking about implementing Single Directory Components, or SDC, in a custom Storybook environment, read on."
eleventyExcludeFromCollections: true
---

For the past few months I've been writing a lot about Integrating Storybook with Drupal, and how to build a Drupal theme using Storybook as its design system. One thing I have not written about, until now, is how to use Single Directory Components or SDC, in a stand-alone Storybook environment. I realize there is a [Storybook module](https://drupal.org/project/sdc){target="_blank" rel="noopener noreferrer"} but in my case, a custom Storybook implementation proved more successful than using the module. Of course, your experience with the module may be different.

In this post I'm going to setup the use of SDC along the type of custom Storybook environment I've been writing about. Basically a custom installation of Storybook with [ViteJS](https://vitejs.dev/){target="_blank" rel="noopener noreferrer"}.
