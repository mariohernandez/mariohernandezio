---
title: 'Blog tags'
layout: 'layouts/post-list.html'
pagination:
  data: collections
  size: 1
  alias: tag
  filter: ['all', 'nav', 'blog', 'featuredPost', 'rss', 'series']
permalink: '/tag/{{ tag | slug }}/'
---
