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

    // Update aria-label for screen readers (changes button text description)
    const label = isOpen ? 'Close menu' : 'Open menu';
    navToggle.setAttribute('aria-label', label);
  };

  // Add click event listener to toggle button
  navToggle.addEventListener('click', toggleNav);

  // Add keyboard event listener for ESC key to close navigation
  document.addEventListener('keydown', (e) => {
    // Check if ESC key was pressed AND navigation is currently open
    if (e.key === 'Escape' && siteHeader.classList.contains('nav-is-open')) {
      // Close the navigation using the same toggle function
      toggleNav();
    }
  });
})();

/**
 * Heading anchor copy to clipboard with tooltip
 * Adds click-to-copy functionality to heading anchor links with visual feedback
 */
(() => {
  // Variables to store the tooltip element (created once and reused) and its hide timeout.
  let tooltip, tooltipTimeout;

  // Function to create and return the tooltip element (lazy initialization)
  const createTooltip = () => {
    // Return existing tooltip if already created
    if (tooltip) return tooltip;

    // Create new tooltip element
    tooltip = document.createElement('div');
    tooltip.className = 'anchor-tooltip';
    tooltip.textContent = 'Link copied!';

    // Add tooltip to the page body
    document.body.appendChild(tooltip);
    return tooltip;
  };

  // Function to position and show tooltip near clicked anchor
  const showTooltip = (anchor) => {
    // Get or create the tooltip element
    const tip = createTooltip();

    // Get anchor element's position relative to viewport
    const rect = anchor.getBoundingClientRect();

    // Calculate scroll offsets (with fallbacks for older browsers)
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    // Position tooltip centered above the anchor (40px offset)
    tip.style.left = `${rect.left + scrollX + rect.width / 2}px`;
    tip.style.top = `${rect.top + scrollY - 40}px`;

    // Show the tooltip by adding 'show' class
    tip.classList.add('show');

    // Hide tooltip after 1.5 seconds
    clearTimeout(tooltipTimeout);
    tooltipTimeout = setTimeout(() => tip.classList.remove('show'), 1500);
  };

  // Function to copy URL to clipboard using modern Clipboard API
  const copyToClipboard = async (url) => {
    try {
      // Attempt to write URL to clipboard
      await navigator.clipboard.writeText(url);
      return true; // Success
    } catch (err) {
      // Log error if clipboard access fails
      console.error('Failed to copy anchor link:', err);
      return false; // Failure
    }
  };

  // Wait for DOM to be fully loaded before setting up anchor click handlers
  document.addEventListener('DOMContentLoaded', () => {
    // Find all heading anchor elements on the page
    document.querySelectorAll('.heading-anchor').forEach(anchor => {
      // Add click event listener to each anchor
      anchor.addEventListener('click', async (e) => {
        // Prevent default anchor link behavior (page jumping)
        e.preventDefault();

        // Build full URL from current page + anchor href
        const url = anchor.href;

        // Attempt to copy URL to clipboard
        if (await copyToClipboard(url)) {
          // Show success tooltip if copy was successful
          showTooltip(anchor);
        }
      });
    });
  });
})();
