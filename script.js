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

  /* ---------- Sticky header + scroll progress ----------- */
  const header = $('#header');
  const progress = $('#progress');
  const onScroll = () => {
    header.classList.toggle('is-stuck', window.scrollY > 40);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  };
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

  /* ============================================================
     Motion
     Classes are attached here rather than in the markup so the HTML
     stays readable and the whole system can be disabled in one place.
     ============================================================ */
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduced) {

    /* ---- split headings into words for staggered reveals ---- */
    const splitWords = (el) => {
      let i = 0;
      const walk = (node) => {
        Array.from(node.childNodes).forEach((child) => {
          if (child.nodeType === 3) {
            const words = child.textContent.split(/(\s+)/);
            if (!child.textContent.trim()) return;
            const frag = document.createDocumentFragment();
            words.forEach((word) => {
              if (!word.trim()) { frag.appendChild(document.createTextNode(word)); return; }
              const outer = document.createElement('span');
              outer.className = 'w';
              const inner = document.createElement('span');
              inner.className = 'w__i';
              inner.style.setProperty('--i', i++);
              inner.textContent = word;
              outer.appendChild(inner);
              frag.appendChild(outer);
            });
            child.replaceWith(frag);
          } else if (child.nodeType === 1 && child.tagName !== 'BR') {
            walk(child);
          }
        });
      };
      walk(el);
      el.classList.add('split');
    };

    $$('h1, h2.display').forEach(splitWords);

    /* headings observe themselves, so they don't depend on a .reveal parent */
    const splitIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        splitIO.unobserve(e.target);
      });
    }, { threshold: 0.2 });
    $$('.split').forEach((el) => {
      // hero headings fire with their slide instead of on scroll
      if (el.closest('.hero__slide')) el.classList.add('is-in');
      else splitIO.observe(el);
    });

    /* ---- the three story bottles fade in one after another ----
       Opacity only: each float carries its own rotate() and a transform-based
       reveal would overwrite it. */
    $$('.intro__art .float').forEach((el, i) => el.style.setProperty('--i', i));

    /* ---- staggered groups ---- */
    $$('.clients__logos, .badges, .intro__specs, .ritual__accents').forEach((list) => {
      list.classList.add('reveal', 'stagger');
      Array.from(list.children).forEach((c, i) => c.style.setProperty('--i', i));
    });

    /* re-observe anything we just marked as revealable */
    $$('.reveal:not(.is-in)').forEach((el) => io.observe(el));

    /* ---- count the spec numbers up ---- */
    const countIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        countIO.unobserve(el);
        const raw = el.textContent.trim();
        const match = raw.match(/^([\d.,]+)(.*)$/);
        if (!match) return;
        const target = parseFloat(match[1].replace(/,/g, ''));
        const suffix = match[2];
        const decimals = (match[1].split('.')[1] || '').length;
        const started = performance.now();
        const dur = 1400;
        const tick = (now) => {
          const p = Math.min((now - started) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = (target * eased).toFixed(decimals);
          // no thousands grouping — one of these is a NOM number, not a quantity
          el.textContent = (decimals ? val : String(Math.round(val))) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });
    $$('.intro__specs strong').forEach((el) => countIO.observe(el));

    /* ---- cursor spotlight on the dark sections ---- */
    $$('.collection, .newsletter, .site-footer').forEach((sec) => {
      sec.classList.add('spot');
      sec.addEventListener('pointermove', (e) => {
        const r = sec.getBoundingClientRect();
        sec.style.setProperty('--mx', `${e.clientX - r.left}px`);
        sec.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });

    /* ---- 3D tilt on the cocktail cards ---- */
    $$('.ritual__card:not(.ritual__card--feature)').forEach((card) => {
      card.classList.add('tilt');
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--ry', `${px * 7}deg`);
        card.style.setProperty('--rx', `${-py * 7}deg`);
        card.style.setProperty('--lift', '-6px');
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--ry', '0deg');
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--lift', '0px');
      });
    });

    /* ---- magnetic gold buttons ---- */
    $$('.btn--gold').forEach((btn) => {
      btn.classList.add('magnetic');
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        btn.style.setProperty('--mx', `${((e.clientX - r.left) / r.width - 0.5) * 14}px`);
        btn.style.setProperty('--my', `${((e.clientY - r.top) / r.height - 0.5) * 10}px`);
      });
      btn.addEventListener('pointerleave', () => {
        btn.style.setProperty('--mx', '0px');
        btn.style.setProperty('--my', '0px');
      });
    });

    /* ---- parallax on the full-bleed band ---- */
    const bandImg = $('.band__img');
    if (bandImg) {
      bandImg.style.willChange = 'transform';
      let ticking = false;
      const parallax = () => {
        const r = bandImg.parentElement.getBoundingClientRect();
        if (r.bottom > 0 && r.top < window.innerHeight) {
          const progress = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
          bandImg.style.transform = `translate3d(0, ${progress * -60}px, 0) scale(1.14)`;
        }
        ticking = false;
      };
      window.addEventListener('scroll', () => {
        if (!ticking) { ticking = true; requestAnimationFrame(parallax); }
      }, { passive: true });
      parallax();
    }
  }

  /* ---------- Footer year ------------------------------- */
  $('#year').textContent = new Date().getFullYear();
})();
