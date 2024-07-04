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


  // Configuration of hCaptcha for contact form.
  // https://docs.web3forms.com/getting-started/customizations/spam-protection/hcaptcha
  const form = document.getElementById('mhcontact');
  form.addEventListener('submit', function(e) {
    const hCaptcha = form.querySelector('textarea[name=h-captcha-response]').value;
    if (!hCaptcha) {
      e.preventDefault();
      alert("Please fill out captcha field")
      return
    }
  });
});
