/* =========================================
   VELOUR Studio — app.js
   Salón de Belleza & Bienestar · Bogotá
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════
     1. LOADER
  ══════════════════════════════════════ */
  const loader = document.getElementById('loader');

  function hideLoader() {
    if (!loader) return;
    loader.classList.add('out');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 800);
  }

  // Ocultar cuando la página esté lista
  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 1800);
  } else {
    window.addEventListener('load', () => setTimeout(hideLoader, 1800));
    // Fallback: ocultar sí o sí después de 3.5s
    setTimeout(hideLoader, 3500);
  }

  /* ══════════════════════════════════════
     2. CURSOR PERSONALIZADO
  ══════════════════════════════════════ */
  const cur = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');

  document.addEventListener('mousemove', e => {
    cur.style.left = e.clientX + 'px';
    cur.style.top  = e.clientY + 'px';
    requestAnimationFrame(() => {
      trail.style.left = e.clientX + 'px';
      trail.style.top  = e.clientY + 'px';
    });
  });

  const hoverEls = document.querySelectorAll('a, button, .gi, .gf, .stab, .btab, .add-cart, .wa-fab, .sc, .pc, .bc, .rit-card');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cur.style.transform = 'translate(-50%,-50%) scale(2.2)';
      trail.style.transform = 'translate(-50%,-50%) scale(1.6)';
      trail.style.opacity = '.25';
    });
    el.addEventListener('mouseleave', () => {
      cur.style.transform = 'translate(-50%,-50%) scale(1)';
      trail.style.transform = 'translate(-50%,-50%) scale(1)';
      trail.style.opacity = '.5';
    });
  });

  /* ══════════════════════════════════════
     3. PROMO BAR CLOSE
  ══════════════════════════════════════ */
  const promoBar  = document.getElementById('promoBar');
  const promoClose = document.getElementById('promoClose');
  const header    = document.getElementById('header');

  promoClose?.addEventListener('click', () => {
    promoBar.classList.add('gone');
    header.classList.add('nopromo');
    header.style.top = '0';
  });

  /* ══════════════════════════════════════
     4. HEADER SCROLL
  ══════════════════════════════════════ */
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ══════════════════════════════════════
     5. MENÚ MÓVIL
  ══════════════════════════════════════ */
  const ham     = document.getElementById('ham');
  const mobMenu = document.getElementById('mobMenu');

  ham?.addEventListener('click', () => {
    mobMenu.classList.toggle('open');
    const spans = ham.querySelectorAll('span');
    if (mobMenu.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.transform = '';
    }
  });
  mobMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobMenu.classList.remove('open');
    ham?.querySelectorAll('span').forEach(s => s.style.transform = '');
  }));

  /* ══════════════════════════════════════
     6. SMOOTH SCROLL
  ══════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    });
  });

  /* ══════════════════════════════════════
     7. SCROLL REVEAL
  ══════════════════════════════════════ */
  const revealEls = document.querySelectorAll(
    '.sc, .pc, .eq-card, .bc, .rit-card, .ba-card, .sec-intro, .about-wrap, .res-wrap, .ci, .abst, .av'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const revObs = new IntersectionObserver((entries) => {
    entries.forEach((en, i) => {
      if (en.isIntersecting) {
        const sibs = [...en.target.parentElement.children];
        const idx = sibs.indexOf(en.target);
        setTimeout(() => en.target.classList.add('in'), idx * 90);
        revObs.unobserve(en.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revObs.observe(el));

  /* ══════════════════════════════════════
     8. CONTADORES ANIMADOS
  ══════════════════════════════════════ */
  const counters = document.querySelectorAll('.hstat-n, .abst-n');
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        animCount(en.target, +en.target.dataset.t);
        countObs.unobserve(en.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => countObs.observe(c));

  function animCount(el, target) {
    const dur = 1600, start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(ease * target) + (target >= 50 ? '+' : '');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ══════════════════════════════════════
     9. PARALLAX HERO
  ══════════════════════════════════════ */
  const heroBg = document.getElementById('heroBgImg');
  window.addEventListener('scroll', () => {
    if (heroBg && window.scrollY < window.innerHeight) {
      heroBg.style.transform = `scale(1.03) translateY(${window.scrollY * 0.25}px)`;
    }
  });

  /* ══════════════════════════════════════
     10. FILTRO SERVICIOS
  ══════════════════════════════════════ */
  const stabs   = document.querySelectorAll('.stab');
  const scCards = document.querySelectorAll('.sc');

  stabs.forEach(tab => {
    tab.addEventListener('click', () => {
      stabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      scCards.forEach((c, i) => {
        const show = cat === 'all' || c.dataset.cat === cat;
        c.classList.toggle('hidden', !show);
        if (show) { c.style.animation = `none`; setTimeout(() => { c.style.animation = `fadeUp .4s ${i * 60}ms both`; }, 10); }
      });
    });
  });

  /* ══════════════════════════════════════
     11. FILTRO GALERÍA
  ══════════════════════════════════════ */
  const gfBtns  = document.querySelectorAll('.gf');
  const galItems = document.querySelectorAll('.gi');

  gfBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      gfBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const gc = btn.dataset.gc;
      galItems.forEach(gi => gi.classList.toggle('hidden', gc !== 'all' && gi.dataset.gc !== gc));
    });
  });

  /* ══════════════════════════════════════
     12. LIGHTBOX GALERÍA
  ══════════════════════════════════════ */
  const lb     = document.getElementById('lb');
  const lbBg   = document.getElementById('lbBg');
  const lbImg  = document.getElementById('lbImg');
  const lbCap  = document.getElementById('lbCap');
  const lbNum  = document.getElementById('lbNum');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  const lbClose = document.getElementById('lbClose');
  let lbIndex = 0;
  const lbData = [];

  galItems.forEach((gi, i) => {
    const img = gi.querySelector('img');
    const cap = gi.querySelector('.gi-ov span')?.textContent || '';
    lbData.push({ src: img.src, cap });
    gi.addEventListener('click', () => openLB(i));
  });

  function openLB(i) {
    lbIndex = i;
    lbImg.src = lbData[i].src;
    lbCap.textContent = lbData[i].cap;
    lbNum.textContent = `${i + 1} / ${lbData.length}`;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLB() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
  lbClose.addEventListener('click', closeLB);
  lbBg.addEventListener('click', closeLB);
  lbPrev.addEventListener('click', () => openLB((lbIndex - 1 + lbData.length) % lbData.length));
  lbNext.addEventListener('click', () => openLB((lbIndex + 1) % lbData.length));
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLB();
    if (e.key === 'ArrowLeft') lbPrev.click();
    if (e.key === 'ArrowRight') lbNext.click();
  });

  /* ══════════════════════════════════════
     13. FILTRO BOUTIQUE
  ══════════════════════════════════════ */
  const btabs   = document.querySelectorAll('.btab');
  const pcCards = document.querySelectorAll('.pc');

  btabs.forEach(tab => {
    tab.addEventListener('click', () => {
      btabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const bc = tab.dataset.bc;
      pcCards.forEach(c => c.classList.toggle('hidden', bc !== 'all' && c.dataset.bc !== bc));
    });
  });

  /* ══════════════════════════════════════
     14. WISHLIST (corazones)
  ══════════════════════════════════════ */
  document.querySelectorAll('.wl-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('liked');
      const icon = btn.querySelector('i');
      icon.classList.toggle('far');
      icon.classList.toggle('fas');
    });
  });

  /* ══════════════════════════════════════
     15. CARRITO DE COMPRAS
  ══════════════════════════════════════ */
  let cart = [];
  const cartBtn  = document.getElementById('cartBtn');
  const cartDot  = document.getElementById('cartDot');
  const cdCount  = document.getElementById('cdCount');
  const cdItems  = document.getElementById('cdItems');
  const cdTotal  = document.getElementById('cdTotal');
  const drawer   = document.getElementById('cartDrawer');
  const cdOverlay= document.getElementById('cdOverlay');
  const cdClose  = document.getElementById('cdClose');
  const btnClear = document.getElementById('btnClear');

  function openCart()  { drawer.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeCart() { drawer.classList.remove('open'); document.body.style.overflow = ''; }
  cartBtn?.addEventListener('click', openCart);
  cdClose?.addEventListener('click', closeCart);
  cdOverlay?.addEventListener('click', closeCart);
  btnClear?.addEventListener('click', () => { cart = []; renderCart(); });

  document.querySelectorAll('.add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const name  = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);
      const found = cart.find(i => i.name === name);
      if (found) { found.qty++; } else { cart.push({ name, price, qty: 1 }); }
      renderCart();
      showToast(`✓ ${name} agregado al carrito`);
      openCart();
    });
  });

  function renderCart() {
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const count = cart.reduce((s, i) => s + i.qty, 0);
    cartDot.textContent = count;
    cdCount.textContent = count;
    cdTotal.textContent = 'S/. ' + total.toFixed(2);

    if (cart.length === 0) {
      cdItems.innerHTML = '<div class="cd-empty"><i class="fas fa-shopping-bag"></i><p>Tu carrito está vacío</p></div>';
      return;
    }
    cdItems.innerHTML = cart.map((item, idx) => `
      <div class="cd-item">
        <div class="cd-item-info">
          <div class="cd-item-name">${item.name}</div>
          <div class="cd-item-price">$${(item.price * item.qty).toFixed(2)}</div>
          <div class="cd-item-qty">
            <button class="qty-btn" data-action="dec" data-idx="${idx}">−</button>
            <span class="qty-n">${item.qty}</span>
            <button class="qty-btn" data-action="inc" data-idx="${idx}">+</button>
          </div>
        </div>
        <button class="cd-item-rm" data-idx="${idx}"><i class="fas fa-times"></i></button>
      </div>`).join('');

    cdItems.querySelectorAll('.qty-btn').forEach(b => {
      b.addEventListener('click', () => {
        const i = parseInt(b.dataset.idx);
        if (b.dataset.action === 'inc') { cart[i].qty++; }
        else { cart[i].qty--; if (cart[i].qty <= 0) cart.splice(i, 1); }
        renderCart();
      });
    });
    cdItems.querySelectorAll('.cd-item-rm').forEach(b => {
      b.addEventListener('click', () => { cart.splice(parseInt(b.dataset.idx), 1); renderCart(); });
    });
  }
  renderCart();

  /* ══════════════════════════════════════
     16. CARRUSEL DE RESEÑAS
  ══════════════════════════════════════ */
  const rcs      = document.querySelectorAll('.rc');
  const rcDotsEl = document.getElementById('rcDots');
  const resPrev  = document.getElementById('resPrev');
  const resNext  = document.getElementById('resNext');
  let rcIdx = 0, autoRC;

  rcs.forEach((_, i) => {
    const d = document.createElement('div');
    d.classList.add('rd');
    if (i === 0) d.classList.add('active');
    d.addEventListener('click', () => goRC(i));
    rcDotsEl?.appendChild(d);
  });

  function goRC(i) {
    rcs[rcIdx].classList.remove('active');
    rcDotsEl?.querySelectorAll('.rd')[rcIdx].classList.remove('active');
    rcIdx = i;
    rcs[rcIdx].classList.add('active');
    rcDotsEl?.querySelectorAll('.rd')[rcIdx].classList.add('active');
  }

  const nextRC = () => goRC((rcIdx + 1) % rcs.length);
  const prevRC = () => goRC((rcIdx - 1 + rcs.length) % rcs.length);
  resNext?.addEventListener('click', nextRC);
  resPrev?.addEventListener('click', prevRC);
  autoRC = setInterval(nextRC, 5200);

  // Pausa al hover
  document.getElementById('resCarousel')?.addEventListener('mouseenter', () => clearInterval(autoRC));
  document.getElementById('resCarousel')?.addEventListener('mouseleave', () => { autoRC = setInterval(nextRC, 5200); });

  // Swipe táctil
  let tx = 0;
  document.getElementById('resCarousel')?.addEventListener('touchstart', e => { tx = e.changedTouches[0].screenX; });
  document.getElementById('resCarousel')?.addEventListener('touchend', e => {
    const dx = tx - e.changedTouches[0].screenX;
    if (Math.abs(dx) > 50) { dx > 0 ? nextRC() : prevRC(); }
  });

  /* ══════════════════════════════════════
     17. FORM TABS (Reserva)
  ══════════════════════════════════════ */
  const ftabs = document.querySelectorAll('.ftab');
  ftabs.forEach(t => {
    t.addEventListener('click', () => {
      ftabs.forEach(x => x.classList.remove('active'));
      t.classList.add('active');
    });
  });

  /* ══════════════════════════════════════
     18. FORMULARIO DE RESERVA
  ══════════════════════════════════════ */
  const form   = document.getElementById('reservaForm');
  const formOk = document.getElementById('formOk');

  form?.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    setTimeout(() => {
      form.style.display = 'none';
      formOk.style.display = 'block';
    }, 1600);
  });

  /* ══════════════════════════════════════
     19. TOAST NOTIFICATIONS
  ══════════════════════════════════════ */
  const toast = document.getElementById('toast');
  let toastTimer;

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
  }

  /* ══════════════════════════════════════
     20. LAZY LOAD IMÁGENES
  ══════════════════════════════════════ */
  const imgs = document.querySelectorAll('img[src]');
  if ('IntersectionObserver' in window) {
    const imgObs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          const img = en.target;
          if (img.dataset.src) { img.src = img.dataset.src; }
          imgObs.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });
    imgs.forEach(img => imgObs.observe(img));
  }

  /* ══════════════════════════════════════
     21. NEWSLETTER FOOTER
  ══════════════════════════════════════ */
  const nlForm = document.querySelector('.nl-form');
  nlForm?.addEventListener('submit', e => {
    e.preventDefault();
    showToast('✓ ¡Bienvenida al Club VELOUR!');
    nlForm.querySelector('input').value = '';
  });
  nlForm?.querySelector('button')?.addEventListener('click', () => {
    const val = nlForm.querySelector('input').value;
    if (val && val.includes('@')) {
      showToast('✓ ¡Bienvenida al Club VELOUR! 🌸');
      nlForm.querySelector('input').value = '';
    } else {
      showToast('Por favor ingresa un email válido.');
    }
  });

  /* ══════════════════════════════════════
     22. BARRA DE PROGRESO AL SCROLL
  ══════════════════════════════════════ */
  const prog = document.createElement('div');
  prog.id = 'progress-bar';
  prog.style.cssText = `position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,var(--rose),var(--gold));z-index:9999;width:0%;transition:width .1s;pointer-events:none`;
  document.body.appendChild(prog);
  window.addEventListener('scroll', () => {
    const total  = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (window.scrollY / total * 100) + '%';
  });

  /* ══════════════════════════════════════
     23. ANIMAR BARRAS RESEÑAS
  ══════════════════════════════════════ */
  const rbFills = document.querySelectorAll('.rb-fill');
  const rbObs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        const target = en.target.style.width;
        en.target.style.width = '0';
        setTimeout(() => { en.target.style.transition = 'width 1s ease'; en.target.style.width = target; }, 100);
        rbObs.unobserve(en.target);
      }
    });
  }, { threshold: 0.5 });
  rbFills.forEach(f => rbObs.observe(f));

  /* ══════════════════════════════════════
     24. HEADER: TOP DINÁMICO CON PROMO
  ══════════════════════════════════════ */
  function updateHeaderTop() {
    if (!promoBar.classList.contains('gone')) {
      header.style.top = promoBar.offsetHeight + 'px';
    }
  }
  updateHeaderTop();
  window.addEventListener('resize', updateHeaderTop);

  console.log('✦ VELOUR Studio — Bienvenida! ✦');
});

/* ══════════════════════════════════════
   KEYFRAMES GLOBALES VÍA JS (soporte)
══════════════════════════════════════ */
const styleEl = document.createElement('style');
styleEl.textContent = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`;
document.head.appendChild(styleEl);