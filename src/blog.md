---
title: 'Mario Hernandez Personal Blog'
layout: 'layouts/feed.html'
pagination:
  data: collections.blog
  size: 5
permalink: 'blog{% if pagination.pageNumber > 0 %}/page/{{ pagination.pageNumber }}{% endif %}/index.html'
paginationPrevText: 'Previous posts'
paginationNextText: 'Next posts'
paginationAnchor: '#post-list'
---

These are Mario Hernandez' blog post.
