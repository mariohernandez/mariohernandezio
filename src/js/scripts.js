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
  // Create a single tooltip element once when the page loads
  const tooltip = document.createElement("div");
  tooltip.classList.add("anchor-tooltip");
  tooltip.textContent = "Link copied!";
  document.body.appendChild(tooltip);

  document.querySelectorAll(".heading-anchor").forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default anchor behavior
      const url = window.location.origin + window.location.pathname + anchor.getAttribute("href");

      navigator.clipboard.writeText(url).then(() => {
        // Position the tooltip near the clicked anchor
        const rect = anchor.getBoundingClientRect();

        // Use fixed positioning relative to the viewport
        tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2}px`;
        tooltip.style.top = `${rect.top + window.scrollY - 40}px`; /* Adjust the 10px offset as needed */

        // Display the tooltip
        tooltip.classList.add("show");

        // Hide the tooltip after a delay
        setTimeout(() => {
          tooltip.classList.remove("show");
        }, 1500); // Display for 1.5 seconds

        // console.log("Copied:", url);

      }).catch((err) => {
        console.error("Failed to copy anchor link:", err);
      });
    });
  });
});
