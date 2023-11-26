---
date: "2020-12-13"
title: "Styling Forms Elements"
tags: ['css', 'forms']
featured: false
featuredImage: "/images/frames.webp"
featuredImageAlt: "Four black wall arts on brown wall"
featuredImageCredit: "Leonardo Yip"
featuredImageCreditUrl: "https://unsplash.com/@yipleonardo"
summary: "Styling web forms is not the most exciting thing when working on a project but they are essensial to most websites and is important to give them the attention they deserve."
---
Whether you are a veteran or just getting started with web development, working with web forms is not the sexiest thing but there is no avoiding them.  Forms on a website are critical to the website's mission and the visitors using them.  In this post I am going to show you how to properly style webforms and form elements so you can ensure they are consistent with your brand and provide a pleasant user experience.

#### Resources:
I have recording video tutorials on some of the concepts covered in this post.  Scroll to the bottom if you are the kind of person who learns better watching tutorials.

## Where to start
One thing about forms you can count on is that they are not consistent.  In today's API era forms can be generated from any source and you don't always have control of their HTML.  I personally work with [Drupal](https://drupal.org) a lot and even within it forms can originate from Views, Blocks, Nodes, Paragraphs, Modules, and more.  I imagine this is the case with most Content Management Systems.  So how do you address something where you can't always predict source or markup of forms?

### If you can't beat them, join them
Whether is Drupal or other system, it is best to let that system dictate the markup of forms.  Try to bend a system to your needs can prove challenging and not worth the trouble.  This is the approach I take and so far this has worked very well for me.

## Attributes are your friends
As a Front-End developer for many years, I love a good css class.  They make my job a lot easier than not having a class.  When it comes to form elements however, it is best to ignore classes and rely solely in attributes.  What attributes you may be asking yourself?  Let's take a look

### From element types
The **type** attribute in form elements make it easy to style them in a global manner.  Rather than styling form elements based on their css class or ID, the type attribute is the best approach.  Each form field has a type attribute which makes it possible for browsers to render the element as expected.  The type attribute can also play a factor in Javascript and form handling, but for now we are going to focus on styling.

* **Input fields**:  Input fields such as text fields, are probably the most common form elements in a form.  But don't let its simplicity fool you because text fields come in many types; the most common being `text`.  this is the type for a typical text box where you can type just about any kind of information.  This sometimes leads to developers using it for anything including for data that should be in a different form type.  Let's take a look at the various types a text field can be:

  * **text**:  Used for most text fields and accept any string of text
  * **email**: Used to capture email address.  Using this type is recommended for email addresses as it provides _regular expressions_ to validate the data entered in the field meets the patterns of an email addresses.  In addition, using this type of field makes it possible for your mobile devices to show a custom keyboard where the "@" sign is available without having to toggle your keyborad characters to find it.
  * **password**: As you can imagine, this makes it possible to hide passwords from view as you type them.
  * **search**:  Elements of type search are text fields designed for the user to enter search queries into. These are functionally identical to text inputs, but may be styled differently by the user agent.
  * **tel**:  Similarly to the email address, using this type allows for the keyboard on mobile devices to display numbers by default rather than alpha characters.
  * **url**: Similarly to `email`, this provides you with a custom keyboard on mobile devices that make it easier to type a common url.

As you can see from the examples above, text fields may seem simple but they come in all flavors.  In most cases, the goal of form elements is to be styled the same across an entire site.  So it is recommended you style these elements globally so no matter where they are used they automatically inherit the intended styles.  So how do you style them globally?  Let's take a look:

Here are a couple of examples of differnt input fields which we will style to ensure they all look similarly everywhere.

```html
<input type="text" name="firstname">

<input type="password" name="password">

<input type="email" name="email">
```

### Styling
```css
  input[type='text'],
  input[type='password'],
  input[type='email'],
  input[type='tel'],
  input[type='search'],
  textarea {
    background-color: #ffffff;
    border: 1px solid #000000;
    height: 40px;
    padding: 10px;
    width: 100%;
  }

  textarea {
    height: initial;
  }
```
By using the element's `type` attribute we can collectively style them with a single set of rules.  As you may have noticed I included `textarea` as on of the elements because I want textareas boxes (multi-row textbox), to inherit all of the styles from text boxes with the exception of the height property; thus we override the height property while keeping all other styles the same as text boxes.

## Button elements
Buttons are elements you typically want to display with consistent styles across your entire website.  This includes buttons you may create yourself and those provided by the content management system you may be working with.  So similarly to input fields above, we can't always rely on IDs or classes to style them.  However, similarly to the input fields above, we can rely on the `type` attribute to style the different type of buttons in our site.  Different type of buttons?  yes, there are different types.  Let's tae a look.

### Markup
```html
<a class='button'>I want to look like a button</a>

<button>I'm an actual button</button>

<input type='submit' value='Yo tambien'>

<input type='reset' value='Me too'>
```
* All elements above will have the same look and feel.
* The first 3 elements should look identical, but the last one (`type=['reset']`) should look slightly different because it's not a primary button, it's more of a secondary button.
* Sometimes this secondary button will be used to cancel or to reset someting on a page.  While the top 3 will be used for important actions such as submit, save, etc.
* Let's style them now

### Styles
```css
.button,
button,
input[type='submit'],
input[type='reset'] {
  background-color: rebeccapurple;
  border-radius: 2px;
  border: 2px solid rebeccapurple;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-size: 18px;
  line-height: 1;
  padding: 20px 40px;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  margin-bottom: 20px;
}

.button:hover,
.button:focus,
button:hover,
button:focus,
input[type='submit']:hover,
input[type='submit']:focus {
  background-color: rgb(126, 63, 189); /* lighter purple */
  color: #ffffff;
  text-decoration: none;
}
```
* We are including all the button elements in our initial set of styles.  The reason for this is that we want all the buttons (regardless of their type of function), to share the same shape, font size, font-weight, border width, hover behavior, and other properties.

```css
input[type='reset'] {
  background-color: #ffffff;
  border-color: rebeccapurple;
  color: rebeccapurple;
}

input[type='reset']:hover,
input[type='reset']:focus {
  background-color: #ffffff;
  border-color: #444444;
  color: #444444;
}
```
* Then for the reset type only, we are styling this button with white background and purple text.  This will ensure this button will not stand out as much as the other buttons.


## Radio buttons and Check boxes
Probably the hardest elements to style due to their dynamic nature, they have a hard time fitting in with the rest of HTML elements. Rather than link you to another blog post where you can copy and paste the necessary CSS to style these elements, I am walk you through the process of styling them.

Checkout the <a href="https://codepen.io/mariohernandez/pen/dyMGoyO?editors=1100" target="_blank">Codepen</a> for these elements.
### Markup
The typical markup for a checkbox or radio button looks like this:

```html
<div class="checkbox__item">
  <input type="checkbox" id="checkbox1" name="checkboxname" value="Item 2">
  <label for="checkbox1">Item 2</label>
</div>
<div class="checkbox__item">
  <input type="checkbox" id="checkbox2" name="checkboxname" value="Item 2">
  <label for="checkbox2">Item 2</label>
</div>
```

```html
<div class="radio__item">
  <input type="radio" id="radio1" name="radioname" value="Item 2">
  <label for="radio1">Item 1</label>
</div>
<div class="radio__item">
  <input type="radio" id="radio2" name="radioname" value="Item 2">
  <label for="radio2">Item 2</label>
</div>
```

### Styles
Out of the box, you can not style the native checkbox nor radio button elements.  To be able to apply custom styles we need to do it in a hacky way.  This is my favorite way to style these elements.


#### Drawing the checkbox
```css
/* visually hide the native checkbox and radio buttons. */
input[type='checkbox'],
input[type='radio'] {
  position: absolute;
  opacity: 0;
}
```
* By setting absolute position and opacity to zero, we are hiding the native radio and checkbox elements from view.  However, we need the elements to still function as expected so using `visibility-hidden` or `display: none` are not viable options.
* Although we are visually hiding the elements, they are still available in the DOM so we can interact with them and also so they can be available to assistive technologies such as screen readers.

```css
/* Add space to the left of the label for later use. */
label {
  position: relative;
  padding-left: 35px;
}
```
* We set `relative` position on the label as we prepare to add pseudo elements in the next steps.
* The left padding here will allow us to draw a box or a circle for the checkbox/radio button.  More on this later.

```css
/* Draw a square box with border  using a pseudo element (`::before`). */
input[type='checkbox'] + label::before {
  border: 2px solid #e15b00;
  content: '';
  display: inline-block;
  height: 24px;
  left: 0;
  position: absolute;
  top: -2px;
  width: 24px;
}
```
* First we define a sibling element of the checkbox with the `+` sign.  The sibling element being the `label` element.  If you look at the markup we wrote above, you will notice that the checkbox and the label are siblings.  This is also true for the radio button and its label.
* Using a `::before` pseudo element on the label, we are drawing a `24px` square box.
* For any pesudo element to be visible on the page, we need to assign the property of `content:`, even if it's value is empty as shown above.
* We then add a `2px` border on the box.  This box is what will be presented as the actual checkbox for the user to interact with (check/uncheck).
* By setting the box with `absolute` position, we are positioning just to the left of the label.  The position of the box is in relation to the label's position (hence `relative` position on the label).

```css
/* Draw checkmark using a ::after pseudo elment on the label */
input[type='checkbox'] + label::after {
  border-bottom: 3px solid #fff;
  border-left: 3px solid #fff;
  content: '';
  display: inline-block;
  height: 10px;
  left: 4px;
  position: absolute;
  top: 2px;
  transform: rotate(-45deg);
  width: 18px;
}
```
* The same way we drew the box previously, now we draw a checkmark symbol using a `::after` pseudo element on the label.  This means we are drawing the checkmark symbol after the `label` element.
* In reality, we are drawing a rectangular box with left and bottom borders of `3px`.  By rotating the box negative 45 degrees, this makes it look like a checkmark.
* We then use `absolute` position on the checkmark so we can position it right in the middle of the box we drew before.

#### Drawing the radio button
Before proceeding with the styles, let's repeat the steps above but this time for the radio buttons.  These styles are extremely similar with the exception of in stead of drawing a square box, we will be drawing a circle with an outline, and instead of a checkmark, we will be drawing a filled circle in the middle of the outlined circle.


```css
/* Draw a circle and add borders to it */
input[type='radio'] + label::before {
  border-radius: 50%;
  border: 2px solid #e15b00;
  content: '';
  display: inline-block;
  height: 24px;
  left: 2px;
  position: absolute;
  top: -4px;
  width: 24px;
}

/* Draw an inner circle */
input[type='radio'] + label::after {
  background-color: #e15b00;
  border-radius: 50%;
  content: '';
  display: inline-block;
  height: 20px;
  left: 6px;
  position: absolute;
  top: 0;
  width: 20px;
}
```
* This time we are targeting the input type of `radio` and we are using `border-radius` to draw a perfect circle.

```css
/* Hide checkmark and inner circle by default */
.radio input[type='radio'] + label::after,
.checkbox input[type='checkbox'] + label::after {
  content: none;
}
```
* By default, we don't want either the checkboxes or radio buttons to be checked.  So we set the value of `content:` to `none`.  This will present the checkboxes and radio buttons unchecked.

```css
/* Show checkmark and inner circle when input is checked */
input[type='radio']:checked + label::after,
input[type='checkbox']:checked + label::after {
  content: '';
}
```
* Using the `:checked` pseudo class (`input[type='radio']:checked`, `input[type='checkbox']:checked`), we then show the checkmark or inner circle by setting the `content:` property's value to empty (`''` i.e. removing `none`).  The `:checked` pseudo class becomes available when the checkbox or radio buttons are click-checked and when that happens, then we show the checkmark or inner circle.

```css
/* When box is checked, add background color. */
input[type='checkbox']:checked + label::before {
  content: '';
  background-color: #e15b00;
}
```
* Since the checkmark we drew is white, we are adding a background color inside the checkbox to display the checkmark.  We are doing this only when the `:checked` pseudo class is present.

```css
/* Add focus styles when elements are in focus */
input[type='radio']:focus + label::before,
input[type='checkbox']:focus + label::before {
  outline: rgb(59, 153, 252) auto 5px;
}
```
* Finally, using the `:focus` pseudo class, we are adding basic outline styles to show the "on focus" state of the inputs.  We need to do this since we are not using the native input elements.  If we were, the browser would automatically add these styles to our inputs.

## Resources
I have recorded tutorials on severalof these things.  Check them out if you are the kind of person who learns better through video tutorials.

* [Styling Checkboxes and Radio Buttons](https://youtu.be/6KsCwVacfLs)
* [CSS Pseudo Elements](https://youtu.be/KNsEpsCui8c)
* [Styling Checkboxes and Radio Buttons (Codepen)](https://codepen.io/mariohernandez/pen/dyMGoyO?editors=1100)
