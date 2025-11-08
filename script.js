// Origami Linux Single Page Interactions
(function() {
  const html = document.documentElement;
  const themeBtn = document.getElementById('themeBtn');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const yearEl = document.getElementById('year');
  yearEl.textContent = new Date().getFullYear();

  // Theme toggle with localStorage persistence
  const stored = localStorage.getItem('origami-theme');
  if (stored) html.setAttribute('data-theme', stored);
  function updateThemeIcon() {
    themeBtn.textContent = html.getAttribute('data-theme') === 'dark' ? '🌙' : '☀️';
  }
  updateThemeIcon();
  themeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('origami-theme', next);
    updateThemeIcon();
  });

  // Mobile nav
  navToggle?.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open');
  });
  navLinks?.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', '#' + id);
      }
    });
  });

  // Back to top button
  document.querySelectorAll('[data-scroll="#top"], .back-top').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Scroll reveal for cards & principles
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });

  document.querySelectorAll('.card, .principles article, .panel h3').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  // Reduce motion respect
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
      el.style.animationDuration = '0ms';
      el.style.animationIterationCount = '1';
    });
  }

  // Subtle hero ASCII shimmer
  const ascii = document.querySelector('.ascii');
  if (ascii) {
    let tick = 0;
    setInterval(() => {
      tick += 1;
      ascii.style.filter = `drop-shadow(0 0 ${3 + (Math.sin(tick/15)+1)*2}px rgba(63,220,151,0.45))`;
    }, 180);
  }
})();
