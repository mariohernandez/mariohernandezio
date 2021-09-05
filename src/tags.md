---
title: 'Blog tags'
layout: 'layouts/feed.html'
pagination:
  data: collections
  size: 1
  alias: tag
  filter: ['all', 'nav', 'blog', 'featuredPost', 'rss']
permalink: '/tag/{{ tag | slug }}/'
---
