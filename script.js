/* ==========================================================================
   A.B.H Dienstleistungen – Interaktivität
   ========================================================================== */

const ICONS = {
  check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 12.5l5.5 5.5L20 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  house: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 11 12 4l8 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 10v9h12v-9" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M10 19v-5h4v5" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`,
  mower: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="6.5" cy="18" r="2.2" stroke="currentColor" stroke-width="1.7"/><circle cx="16.5" cy="18" r="2.2" stroke="currentColor" stroke-width="1.7"/><path d="M6.5 18h6l3-8h4M12.5 18h4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 10h4l-1.5-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  tree: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3 6 12h3l-4 6h5v3M12 3l6 9h-3l4 6h-5" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
  bin: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 7h14M9 7V4h6v3M6.5 7l1 13h9l1-13" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/><path d="M10 11v6M14 11v6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  wrench: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M14.7 6.3a4 4 0 0 0-5.4 4.9L3 17.5 6.5 21l6.3-6.3a4 4 0 0 0 4.9-5.4l-2.8 2.8-2.4-2.4 2.2-2.4Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
  box: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 8l9-5 9 5-9 5-9-5Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M3 8v9l9 5 9-5V8M12 13v9" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
  hammer: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M14 6l4 4-2.2 2.2-4-4L14 6Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><path d="M11.5 8.5 4 16v3.5H7.5L15 12" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/></svg>`,
  drop: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3c3.5 4.5 6 7.8 6 11a6 6 0 0 1-12 0c0-3.2 2.5-6.5 6-11Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`,
  plus: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>`,
  phone: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.7 21 3 12.3 3 1.9c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8Z" fill="currentColor"/></svg>`,
  mail: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2.5" y="5" width="19" height="14" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M3.5 6.5 12 13l8.5-6.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  pin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/><circle cx="12" cy="9" r="2.4" stroke="currentColor" stroke-width="1.7"/></svg>`,
  area: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="3.4" stroke="currentColor" stroke-width="1.7"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`
};

async function loadData(){
  try{
    const res = await fetch('data.json');
    if(!res.ok) throw new Error('data.json nicht erreichbar');
    return await res.json();
  }catch(err){
    console.error('Konnte data.json nicht laden:', err);
    return null;
  }
}

function renderValues(data){
  const wrap = document.getElementById('valuesList');
  wrap.innerHTML = data.business.values.map(v => `
    <div class="value-chip">${ICONS.check}<span>${v}</span></div>
  `).join('');
}

function renderServices(data){
  const wrap = document.getElementById('serviceGrid');
  wrap.innerHTML = data.services.map(s => `
    <article class="marker-card">
      <div class="marker-icon">${ICONS[s.icon] || ''}</div>
      <h3>${s.title}</h3>
      <p>${s.text}</p>
    </article>
  `).join('');
}

function renderReviews(data){
  const wrap = document.getElementById('reviewGrid');
  wrap.innerHTML = data.reviews.map(r => `
    <article class="review-card">
      <div class="review-stars" aria-hidden="true">${'★'.repeat(r.rating)}</div>
      <p class="review-text">„${r.text}"</p>
      <div class="review-meta">
        <span class="review-author">${r.author}</span>
        <span>${r.timeAgo}</span>
      </div>
    </article>
  `).join('');
}

function renderContactInfo(data){
  const b = data.business;
  const wrap = document.getElementById('contactInfo');
  wrap.innerHTML = `
    <div class="contact-info-item">
      <span class="contact-info-icon">${ICONS.phone}</span>
      <a href="tel:+${b.phoneHref}">${b.phone}</a>
    </div>
    <div class="contact-info-item">
      <span class="contact-info-icon">${ICONS.mail}</span>
      <a href="mailto:${b.email}">${b.email}</a>
    </div>
    <div class="contact-info-item">
      <span class="contact-info-icon">${ICONS.pin}</span>
      <span>${b.area.place}</span>
    </div>
  `;

  const badge = document.getElementById('areaBadge');
  badge.innerHTML = `
    ${ICONS.area}
    <div>
      <h4>Einsatzgebiet</h4>
      <p>${b.area.region}</p>
    </div>
  `;
}

function wireContactForm(data){
  const form = document.querySelector('.contact-form');
  if(!form) return;
  form.addEventListener('submit', () => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    const subject = encodeURIComponent(`Anfrage über die Webseite von ${name || 'Interessent'}`);
    const bodyLines = [
      `Name: ${name}`,
      `E-Mail: ${email}`,
      phone ? `Telefon: ${phone}` : null,
      '',
      message
    ].filter(Boolean);
    const body = encodeURIComponent(bodyLines.join('\n'));
    window.location.href = `mailto:${data.business.email}?subject=${subject}&body=${body}`;
  });
}

function setupReveal(){
  const items = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(i => io.observe(i));
}

function setupHeaderScroll(){
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if(window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();
}

function setupNavToggle(){
  const toggle = document.getElementById('navToggle');
  const nav = document.querySelector('.main-nav');
  if(!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

(async function init(){
  document.getElementById('year').textContent = new Date().getFullYear();
  setupHeaderScroll();
  setupNavToggle();

  const data = await loadData();
  if(data){
    renderValues(data);
    renderServices(data);
    renderReviews(data);
    renderContactInfo(data);
    wireContactForm(data);
  }
  setupReveal();
})();
