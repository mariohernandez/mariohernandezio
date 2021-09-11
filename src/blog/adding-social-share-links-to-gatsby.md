---
path: "/blog/adding-social-share-links-to-gatsby"
date: "2018-09-10"
title: "Adding Social Share Links to Gatsby"
tags: ['gatsby', 'social share']
featured: false
featuredImage: "/images/beach.jpg"
featuredImageAlt: "Beach waves coming to shore"
featuredCredit: "Unsplash.com"
featuredCreditUrl: "https://unsplash.com/"
summary: "Don't know about you but one of the first things I look for after reading a great article online is how to share it with others."
---
<blockquote>Sharing is caring.</blockquote>

I've been working on my personal blog (this site), for a while.  I built it with [Gatsby](https://www.gatsbyjs.org/) and little by little I have been adding extra functionality.  Today I'm going to show you how I added social sharing links to allow visitors to share my posts with others using Twitter, Facebook, LinkedIn, and other channels.

For an example of the Sharing links, look at the icons above the hero image on this and every post on this site.


There are many ways to accomplish this but from the begining I wanted to use something that was simple and did not require too much overhead to run.  There are solutions out there that require third libraries and scripts and I wanted to avoid that.  A while back I was introduced to [Responsible Social Share Links](https://jonsuh.com/blog/social-share-links/).  The beauty of Responsible Social Links is that they do not need any Javascript to work.  They use the sharing links available for most social media channels.

Let's take a look at some examples of what these links look like:

**Facebook**
```html
https://www.facebook.com/sharer/sharer.php?u=URL_TO_SHARE
```

**Twitter**
```html
<a href="https://twitter.com/intent/tweet/
     ?text=Check this out
     &url=https://mariohernandez.io
     &via=imariohernandez"
   target="_blank">Share on Twitter</a>
```

Most of these links accepts several parameters. You can see these parameters in more details at the Responsible Social Share Links page for additional information.  In addtion, some systems may require you to encode the links but luckily for us Reacts does this for us automatically.


## Using the links in a Gatsby site (or React for that matter)

You may think, that's so easy, just modify each of the links with my personal information and done.  That's true to an extend.  However, the tricky part is dynamically passing the current page's URL and post title to your sharing link.  So here's how I did it:

1. Edit your blog post template.  In my case my blog post template is `/src/templates/blog-post.js`  This is based on the Gatsby starter I used.  Your mileage may vary.

2. Add the following code where you wish to display the sharing links to generate a twitter share link:
```javascript
<Share>
    <ShareLink
      href={`https://twitter.com/intent/tweet/?text=${post.frontmatter.title}
      &url=https://mariohernandez.io${post.frontmatter.path}%2F&via=imariohernandez`}>
      // Optional icon
      <LinkLabel>Share on Twitter</LinkLabel>
    </ShareLink>
</Share>
```

The example above creates a twitter share link and uses the data variables I am already using to print the blog post content.  As you know, Gatsby uses GraphQL to query the posts and by doing this you have access to each of the fields in your post (i.e. title, path, tags, date, etc.).

In the example above, I am passing `${post.frontmatter.title}` so when the post is shared the title of the post is included as your tweet text.  In addition, I am linking to the current post by passing `${post.frontmatter.path}`.  Finally I am passing my twitter handle.

There are other parameters  you can pass to your share links.  Things like hashtags, mentions, and more.  Following the same pattern you can do the same for Facebook, LinkedIn and others.


## A much cleaner approach

You may have noticed that I created the sharing snippet directly in the blog-post.js template.  A much cleaner approach would be to create a new React component for all yoru sharing links and include the component in your blog-post.js.


Here's the full snippet for all the social channels I am using:
```javascript
<Share>
  <ShareLabel>Share this post</ShareLabel>
  <ShareSocial>
    <ShareItem>
      <ShareLink
        href={`https://twitter.com/intent/tweet/?text=${
          post.frontmatter.title
        }&url=https://mariohernandez.io${post.frontmatter.path}%2F&via=imariohernandez`}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-twitter"
          >
            <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
          </svg>
        </span>
        <LinkLabel>Share on Twitter</LinkLabel>
      </ShareLink>
    </ShareItem>
    <ShareItem>
      <ShareLink
        href={`https://www.facebook.com/sharer/sharer.php?u=https://mariohernandez.io${
          post.frontmatter.path
        }`}
        target="_blank"
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-facebook"
          >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
          </svg>
        </span>
        <LinkLabel>Share on Facebook</LinkLabel>
      </ShareLink>
    </ShareItem>
    <ShareItem>
      <ShareLink
        href={`https://www.linkedin.com/shareArticle?mini=true&url=https://mariohernandez.io${
          post.frontmatter.path
        }&title=${post.frontmatter.title}&source=${post.frontmatter.title}`}
        target="_blank"
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-linkedin"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </span>
        <LinkLabel>Share on LinkedIn</LinkLabel>
      </ShareLink>
    </ShareItem>
  </ShareSocial>
</Share>
```

---

## In Closing

If you want to have a clean and light weight way to share your content with others, the Responsible Sharing Links may just be what you need.
