/**
  * Creates click event for mobile navigation.
  *
  * @param {object} navToggle The hamburger button.
  * @param {string} siteHeader The site's header component to which we will toggle a css class.
  */

const navToggle = document.querySelector('.mobile-nav-toggle');
const siteHeader = document.querySelector('.header');

navToggle.addEventListener('click', () => {
  siteHeader.classList.toggle('nav-is-open');

  // Toggle the aria-expanded attribute based on menu open/close state..
  if (navToggle.getAttribute('aria-expanded') === 'false') {
    navToggle.setAttribute('aria-expanded', 'true');
  } else {
    navToggle.setAttribute('aria-expanded', 'false');
  }

  // Change aria-label text based on menu open/close state.
  if (navToggle.getAttribute('aria-label') === 'Open menu') {
    navToggle.setAttribute('aria-label', 'Close menu');
  } else {
    navToggle.setAttribute('aria-label', 'Open menu');
  }
});

// Initialize Splide.
document.addEventListener( 'DOMContentLoaded', function () {
  new Splide( '#image-carousel', {
    type   : 'loop',
    isNavigation: true,
    pagination: true,
    focus: 'center',
    start: 1,
    // perPage: 2,
    fixedWidth : '30rem',
    gap        : '2rem',
    // autoWidth  : true,
    width: 960,
  } ).mount();
} );
