/* =========================================================
   Mayank Sharma — Portfolio | script.js
   Navbar scroll, mobile menu, hero terminal,
   project filter, contact form, toast, icons, year.
   ========================================================= */

(function () {
  // Initialize Lucide icons once loaded
  const initIcons = () => { if (window.lucide && window.lucide.createIcons) window.lucide.createIcons(); };
  if (document.readyState !== 'loading') initIcons();
  else document.addEventListener('DOMContentLoaded', initIcons);

  // Navbar scroll state
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 20) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    mobileMenu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
  }

  // Hero terminal typing
  const terminal = document.getElementById('terminal');
  if (terminal) {
    const lines = Array.from(terminal.querySelectorAll('.tline'));
    let li = 0;
    const typeLine = () => {
      if (li >= lines.length) return;
      const el = lines[li];
      const full = el.dataset.line || '';
      let ci = 0;
      el.classList.add('active');
      const span = document.createElement('span');
      span.className = 'cursor';
      el.textContent = '';
      el.appendChild(span);
      const tick = setInterval(() => {
        ci++;
        span.textContent = full.slice(0, ci);
        if (ci >= full.length) {
          clearInterval(tick);
          span.classList.remove('cursor');
          li++;
          setTimeout(typeLine, 380);
        }
      }, 35);
    };
    setTimeout(typeLine, 300);
  }

  // Project filter
  const chipWrap = document.getElementById('filterChips');
  const grid = document.getElementById('projectsGrid');
  if (chipWrap && grid) {
    chipWrap.addEventListener('click', (e) => {
      const btn = e.target.closest('button.chip');
      if (!btn) return;
      chipWrap.querySelectorAll('.chip').forEach((c) => c.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      grid.querySelectorAll('.project').forEach((card) => {
        if (filter === 'All' || card.dataset.category === filter) card.classList.remove('hide');
        else card.classList.add('hide');
      });
    });
  }

  // Toast helper
  const toastEl = document.getElementById('toast');
  const showToast = (title, desc) => {
    if (!toastEl) return;
    toastEl.innerHTML = '<div class="t-title"></div><div class="t-desc"></div>';
    toastEl.querySelector('.t-title').textContent = title;
    toastEl.querySelector('.t-desc').textContent = desc || '';
    toastEl.classList.add('show');
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(() => toastEl.classList.remove('show'), 3500);
  };

  // Contact form (local storage)
  const form = document.getElementById('contactForm');
  const hint = document.getElementById('formHint');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      if (!data.name || !data.email || !data.message) {
        showToast('Please fill in all fields', 'Name, email and a short message.');
        return;
      }
      const saved = JSON.parse(localStorage.getItem('mayank_messages') || '[]');
      saved.push({ ...data, at: new Date().toISOString() });
      localStorage.setItem('mayank_messages', JSON.stringify(saved));
      form.reset();
      if (hint) { hint.textContent = '✓ Delivered locally. Saved in your browser.'; hint.classList.add('success'); }
      showToast('Message received ✨', "I'll get back to you soon, " + data.name + '.');
      setTimeout(() => {
        if (hint) { hint.textContent = 'End-to-end encrypted via — well, your browser for now.'; hint.classList.remove('success'); }
      }, 5000);
    });
  }

  // Dynamic footer year
  const footYear = document.getElementById('footYear');
  if (footYear) footYear.textContent = 'Built with care · ' + new Date().getFullYear() + ' · New Delhi, India';
})();