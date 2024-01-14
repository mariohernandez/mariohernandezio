'use strict';

/**
  * Creates click event for mobile navigation.
  *
  * @param {object} navToggle The hamburger button.
  * @param {string} siteHeader The site's header component to which we will toggle a css class.
  */

const navToggle = document.querySelector('.mobile-nav-toggle');
const siteHeader = document.querySelector('.header');

navToggle.addEventListener('click', function() {
  siteHeader.classList.toggle('nav-is-open');
});
