---
date: "2025-09-15"
title: "Code reviews using AI"
slug: code-reviews-using-ai
tags: ['ai', 'coding']
draft: false
featured: true
featuredImage: "/images/heroes/ai.webp"
featuredImageAlt: "Illustration of person using a laptop with coding-related graphics around him."
imageThumb: "/images/thumbs/ai.webp"
featuredImageCredit: "Microsoft Copilot"
featuredImageCreditUrl: "https://copilot.microsoft.com/"
summary: "I've always thought of peer code review as a way to learn from others. Now you can use AI to not only review your code but also learn how your code can be improved."
---
Peer code reviews is a critical part of any web development tool. If you are fortunate to have colleagues who are smarter than you and have more experience than you, code reviews can help you learn from them. On the other hand, if you have colleagues who are just getting started, you can use the code review process as a way to help them improve their coding skills.

## Why should I use AI to reviw my code?

The concept of automating tasks to be more productive and efficient when writing code is nothing new. We do it all the time to lint, format, and test our code. Code review is a critical part of a development workflow and in many cases is done by humans and for good reasons. Introducing AI into this process is not to replace human interaction, but to add another layer of code validation and integrity.

If you are like me and are a one-developer team for personal or freelance projects, you may not have colleagues to review your code. AI can be a big help to ensure your code, as good as you may think it is, is actually free of bugs and follows standards.

## Should AI replace peer code reviews?

No. There are factors sometimes when your code may need to be written a specific way. AI may flag your code as needing improvements because it does not have the full context of why the code was written your way. A peer on the other hand, may be fully aware of why it needs to be done this way and can focus on ensuring your code will not create regressions of any kind.

## Which AI tool is the best for code reviews?

Short answer: The one that works for you. Choosing an AI tool is no different than selecting a framework for your project or the plugin/packages you will need to get the job done. The best thing to do is to test the tools you are aware of and see for yourself which gives you the best outcome.

Some of these tools include but are not limited to:

* Github Copilot
* Google Gemini Code Assistant
* CodeRabbit.ai
* Others

## Should I trust AI to make the right choices?

I think you should still be skeptical about any code changes or recommendations by AI. The best way to determine if AI is providing the right suggestions is to test, test, and test. Additionally, research and ask the community if you find yourself in doubt about the changes being recommended.

## My experience with AI

I have not invested too much time into this but have tried at least the top 3 options above and I did find value on all of them. Sometimes it boils down to cost or ease of integration with your workflow.

My latest test involved Google Gimini Code Assistant and I have to say it was simple test but provided great value. The integration with my Github personal repo was pretty straight forward and I was up and running in minutes.

I created a demo PR with legacy Twig code which honestly could be improved just by looking at it, but you know how it goes. The code does the following:

* Uses a media embed component to add images to pages with specific aspect ratio and size based on Editors choices
* In the component's Twig, we check whether a specific CSS class exists in Drupal's attributes. The class is passed from the options provided to editos (i.e. Medium Landscape = `medium-landscape`).
* Based on the CSS class, we set a variable to render a media entity (image) using a preconfigured media view mode which is associated with the proper image style or responsive image style.
* We also provide a default media view mode if the editor does not make a image size selection.
* Finally, if the editor fails to add an image, a validation message is presented (the image may not always be required).



### Resources

* [Lullabot's post](https://www.lullabot.com/articles/how-automated-code-review-tools-reduce-pull-request-bottlenecks)
