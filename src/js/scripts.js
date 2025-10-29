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

/**
  * Add ability to copy heading anchor url to clipboard.
  */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".heading-anchor").forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default anchor behavior
      const url = window.location.origin + window.location.pathname + anchor.getAttribute("href");
      navigator.clipboard.writeText(url).then(() => {
        // Optional: Provide visual feedback (e.g., a "Copied!" tooltip)
        console.log("Anchor link copied to clipboard:", url);
      }).catch((err) => {
        console.error("Failed to copy anchor link:", err);
      });
    });
  });
});
