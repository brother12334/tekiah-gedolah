/* ============================================================
   Teki'ah Gedolah — site behaviour
   ============================================================ */
(function () {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Age gate ---------------------------------- */
  const gate = $('#ageGate');
  if (gate) {
    const passed = (() => { try { return sessionStorage.getItem('age-ok') === '1'; } catch (e) { return false; } })();
    if (!passed) {
      gate.hidden = false;
      document.body.classList.add('is-locked');
    }
    gate.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-age]');
      if (!btn) return;
      if (btn.dataset.age === 'yes') {
        try { sessionStorage.setItem('age-ok', '1'); } catch (e) {}
        gate.hidden = true;
        document.body.classList.remove('is-locked');
      } else {
        $('.age-gate__deny', gate).hidden = false;
      }
    });
  }

  /* ---------- Sticky header ----------------------------- */
  const header = $('#header');
  const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Drawer ------------------------------------ */
  const drawer = $('#drawer');
  const openDrawer = () => {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    $('#menuBtn').setAttribute('aria-expanded', 'true');
    document.body.classList.add('is-locked');
  };
  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    $('#menuBtn').setAttribute('aria-expanded', 'false');
    document.body.classList.remove('is-locked');
  };
  $('#menuBtn').addEventListener('click', openDrawer);
  $('#drawerClose').addEventListener('click', closeDrawer);
  $$('[data-close-drawer]').forEach(el => el.addEventListener('click', closeDrawer));
  $$('.drawer__nav a').forEach(a => a.addEventListener('click', closeDrawer));

  /* ---------- Search overlay ---------------------------- */
  const overlay = $('#searchOverlay');
  const input   = $('#searchInput');
  const results = $('#searchResults');

  const INDEX = [
    { name: 'Reposado Cristalino — 100% agave azul', tag: 'Bottle', href: '#bottle' },
    { name: "Teki'ah Gedolah — what the name means", tag: 'Page', href: '#story' },
    { name: 'Tasting notes — nose, palate, finish', tag: 'Bottle', href: '#bottle' },
    { name: 'Kosher certification',        tag: 'Bottle', href: '#bottle' },
    { name: 'NOM 1438 · Tequila, Jalisco', tag: 'Bottle', href: '#bottle' },
    { name: 'The shofar on the label',     tag: 'Page',   href: '#story' },
    { name: "Hava TeKI'lah — pitcher for six", tag: 'Ritual', href: '#ritual' },
    { name: 'The Tishrei — pomegranate cocktail', tag: 'Ritual', href: '#ritual' },
    { name: 'Apples & Honey — cocktail',   tag: 'Ritual', href: '#ritual' },
    { name: 'Honey-pomegranate syrup',     tag: 'Ritual', href: '#ritual' },
    { name: 'How to serve it neat',        tag: 'Ritual', href: '#ritual' },
    { name: 'Our story — one batch a year', tag: 'Page',  href: '#story' },
    { name: 'The Rosh Hashanah table',     tag: 'Page',   href: '#table' },
    { name: 'Where to buy / stockists',    tag: 'Page',   href: '#locator' },
    { name: 'Shipping & wholesale',        tag: 'Page',   href: '#contact' }
  ];

  const openSearch = () => {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('is-locked');
    renderResults('');
    setTimeout(() => input.focus(), 120);
  };
  const closeSearch = () => {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-locked');
  };
  function renderResults(q) {
    const term = q.trim().toLowerCase();
    const hits = term
      ? INDEX.filter(i => i.name.toLowerCase().includes(term))
      : INDEX.slice(0, 5);
    results.innerHTML = hits.length
      ? hits.map(i => `<li><a href="${i.href}">${i.name}<span class="muted">${i.tag}</span></a></li>`).join('')
      : '<li><a href="#bottle">No matches — see the bottle<span class="muted">All</span></a></li>';
  }
  $('#searchBtn').addEventListener('click', openSearch);
  $$('[data-close-search]').forEach(el => el.addEventListener('click', closeSearch));
  input.addEventListener('input', () => renderResults(input.value));
  results.addEventListener('click', (e) => { if (e.target.closest('a')) closeSearch(); });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeSearch(); closeDrawer(); }
  });

  /* ---------- Hero slider ------------------------------- */
  const slides = $$('.hero__slide');
  const dots   = $('#heroDots');
  let heroIdx  = 0;
  let heroTimer;

  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', `Slide ${i + 1}`);
    if (i === 0) b.classList.add('is-active');
    b.addEventListener('click', () => goHero(i));
    dots.appendChild(b);
  });

  function goHero(i) {
    heroIdx = (i + slides.length) % slides.length;
    slides.forEach((s, n) => s.classList.toggle('is-active', n === heroIdx));
    $$('button', dots).forEach((d, n) => d.classList.toggle('is-active', n === heroIdx));
    restartHero();
  }
  function restartHero() {
    clearInterval(heroTimer);
    heroTimer = setInterval(() => goHero(heroIdx + 1), 7000);
  }
  $$('[data-slide]').forEach(btn =>
    btn.addEventListener('click', () => goHero(heroIdx + (btn.dataset.slide === 'next' ? 1 : -1)))
  );
  restartHero();

  /* ---------- Product carousel -------------------------- */
  const products = $$('.product');
  const pDots    = $('#productDots');
  let pIdx = 0;

  products.forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', `Panel ${i + 1}`);
    if (i === 0) b.classList.add('is-active');
    b.addEventListener('click', () => goProduct(i));
    pDots.appendChild(b);
  });
  function goProduct(i) {
    pIdx = (i + products.length) % products.length;
    products.forEach((p, n) => p.classList.toggle('is-active', n === pIdx));
    $$('button', pDots).forEach((d, n) => d.classList.toggle('is-active', n === pIdx));
  }
  $$('[data-product]').forEach(btn =>
    btn.addEventListener('click', () => goProduct(pIdx + (btn.dataset.product === 'next' ? 1 : -1)))
  );

  /* Swipe support for the carousel */
  const track = $('#productTrack');
  let touchX = null;
  track.addEventListener('touchstart', e => { touchX = e.changedTouches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) goProduct(pIdx + (dx < 0 ? 1 : -1));
    touchX = null;
  }, { passive: true });

  /* ---------- Cart toast -------------------------------- */
  const toast = $('#toast');
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
  }
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-add]');
    if (btn) showToast(`${btn.dataset.add} added to cart`);
  });

  /* ---------- Forms ------------------------------------- */
  $('#newsletterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    $('#newsletterNote').hidden = false;
    e.target.reset();
  });

  $('#locatorForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const q = e.target.zip.value.trim();
    if (q) showToast(`Showing stockists near ${q}`);
  });

  /* ---------- Scroll reveal ----------------------------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  $$('.reveal').forEach(el => io.observe(el));

  /* ---------- Active nav link on scroll ----------------- */
  const sections = $$('main section[id]');
  const navLinks = $$('.nav a');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(a =>
        a.classList.toggle('is-active', a.getAttribute('href') === `#${entry.target.id}`)
      );
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));

  /* ---------- Graceful missing-image placeholders -------
     Until real tequila photos are dropped into /assets, any
     broken <img> gets a subtle patterned block instead of a
     browser "broken image" icon.
  -------------------------------------------------------- */
  $$('img').forEach(img => {
    const flag = () => img.classList.add('img-missing');
    if (img.complete && img.naturalWidth === 0) flag();
    img.addEventListener('error', flag);
  });

  /* ---------- Footer year ------------------------------- */
  $('#year').textContent = new Date().getFullYear();
})();
