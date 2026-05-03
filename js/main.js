/* ====================================================
   Venkata.Info / ArchitectZero – Main JavaScript
   ==================================================== */

(function () {
  'use strict';

  /* ---- Navbar scroll effect ---- */
  const navbar = document.getElementById('navbar');
  function handleScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');

  navToggle.addEventListener('click', function () {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  /* Close mobile nav when a link is clicked */
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---- Footer year ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---- Intersection Observer – fade-in sections ---- */
  const observerOptions = { threshold: 0.12 };
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(
    '.card--expertise, .service-item, .cert-card, .about__text p'
  ).forEach(function (el) {
    el.style.opacity = '0';
    observer.observe(el);
  });

  /* ---- Contact form (front-end validation + simulated send) ---- */
  const form       = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const name    = form.elements['name'].value.trim();
      const email   = form.elements['email'].value.trim();
      const message = form.elements['message'].value.trim();

      if (!name || !email || !message) {
        return;
      }

      /* Basic email format check */
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        form.elements['email'].focus();
        return;
      }

      /* Simulate successful send */
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      setTimeout(function () {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        successMsg.hidden = false;

        setTimeout(function () {
          successMsg.hidden = true;
        }, 5000);
      }, 800);
    });
  }

  /* ---- Smooth active link highlighting ---- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.navbar__links a');

  function highlightNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(function (section) {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach(function (a) { a.removeAttribute('data-active'); });
        const active = document.querySelector(
          '.navbar__links a[href="#' + section.id + '"]'
        );
        if (active) { active.setAttribute('data-active', 'true'); }
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });

}());
