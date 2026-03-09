/**
 * Mobile navigation toggle functionality
 * Handles opening/closing mobile navigation menu with button clicks and ESC key
 */
(() => {
  // Find the mobile navigation toggle button and site header elements
  const navToggle = document.querySelector('.mobile-nav-toggle');
  const siteHeader = document.querySelector('.header');

  // Exit early if required elements are not found (prevents errors)
  if (!navToggle || !siteHeader) return;

  // Function to toggle navigation state (open/close)
  const toggleNav = () => {
    // Toggle the 'nav-is-open' class on header and get the new state (true = open, false = closed)
    const isOpen = siteHeader.classList.toggle('nav-is-open');

    // Set aria-expanded attribute based on navigation state for accessibility
    const expanded = isOpen ? 'true' : 'false';
    navToggle.setAttribute('aria-expanded', expanded);

    // Change aria-label text based on menu open/close state.
    if (navToggle.getAttribute('aria-label') === 'Open menu') {
      navToggle.setAttribute('aria-label', 'Close menu');
    } else {
      navToggle.setAttribute('aria-label', 'Open menu');
    }
  }
});

// Initialize Splide.
document.addEventListener( 'DOMContentLoaded', () => {
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
});
