---
title: 'Blog'
layout: 'layouts/post-list.html'
pagination:
  data: collections.blog
  size: 6
permalink: 'blog{% if pagination.pageNumber > 0 %}/page/{{ pagination.pageNumber }}{% endif %}/index.html'
paginationPrevText: 'Previous posts'
paginationNextText: 'Next posts'
paginationAnchor: '#post-list'
---
