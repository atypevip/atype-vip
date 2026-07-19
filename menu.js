/* A-TYPE VIP — shared navigation: smoked-glass MENU button + full-screen overlay */
(function () {
  const WA_NUM = '447386538896';
  const wa = (msg) => 'https://wa.me/' + WA_NUM + '?text=' + encodeURIComponent(msg);
  window.ATV_WA = wa;

  const css = `
  #atv-menu-btn {
    position: fixed; top: 30px; right: 44px; z-index: 210;
    display: flex; align-items: center; gap: 12px;
    padding: 13px 22px 12px 24px;
    background: rgba(12, 10, 7, 0.55);
    border: 1px solid rgba(212, 175, 106, 0.45);
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
    color: #F2EDE3; cursor: pointer;
    font-family: 'Jost', sans-serif; font-size: 10px; font-weight: 400;
    letter-spacing: 0.44em; text-transform: uppercase;
    transition: background .35s ease, border-color .35s ease, box-shadow .35s ease;
  }
  #atv-menu-btn:hover {
    background: rgba(20, 16, 10, 0.75);
    border-color: #D4AF6A;
    box-shadow: 0 6px 30px rgba(212, 175, 106, 0.25);
  }
  #atv-menu-btn .bars { display: inline-block; width: 18px; }
  #atv-menu-btn .bars span {
    display: block; height: 1px; background: #D4AF6A; margin: 4px 0;
    transition: transform .3s ease, opacity .3s ease;
  }
  #atv-menu-overlay {
    position: fixed; inset: 0; z-index: 220;
    background:
      radial-gradient(ellipse at 20% 10%, rgba(176,141,62,0.07), transparent 55%),
      linear-gradient(160deg, #0D0B08 0%, #070605 60%, #0B0906 100%);
    opacity: 0; visibility: hidden;
    transition: opacity .55s ease, visibility .55s;
    overflow-y: auto;
  }
  #atv-menu-overlay.open { opacity: 1; visibility: visible; }
  #atv-menu-grain {
    position: fixed; inset: 0; pointer-events: none; opacity: 0.05;
  }
  #atv-menu-inner {
    position: relative; min-height: 100%;
    display: grid; grid-template-columns: minmax(260px, 420px) 1fr;
    gap: 6vw; padding: 9vh 8vw 8vh;
    box-sizing: border-box;
  }
  #atv-menu-close {
    position: fixed; top: 30px; right: 44px; z-index: 230;
    display: flex; align-items: center; gap: 12px;
    padding: 13px 22px 12px 24px;
    background: rgba(12,10,7,0.55);
    border: 1px solid rgba(212,175,106,0.45);
    backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
    color: #F2EDE3; cursor: pointer;
    font-family: 'Jost', sans-serif; font-size: 10px; letter-spacing: 0.44em;
    text-transform: uppercase; font-weight: 400;
    transition: border-color .3s ease, color .3s ease;
  }
  #atv-menu-close:hover { border-color: #F2EDE3; color: #D4AF6A; }
  .atv-menu-brand { padding-top: 2vh; }
  .atv-menu-brand img { width: clamp(90px, 9vw, 140px); height: auto; display: block; }
  .atv-menu-brand .line {
    width: 44px; height: 1px; background: #B08D3E; margin: 34px 0 26px;
  }
  .atv-menu-brand p {
    font-family: 'Playfair Display', serif; font-style: italic;
    color: #D4AF6A; font-size: clamp(16px, 1.4vw, 20px); line-height: 1.7; margin: 0 0 34px;
  }
  .atv-menu-brand .contact {
    font-family: 'Jost', sans-serif; font-weight: 300;
    font-size: 10px; letter-spacing: 0.34em; text-transform: uppercase;
    color: rgba(242,237,227,0.6); line-height: 2.6;
  }
  .atv-menu-brand .contact a { color: #D4AF6A; text-decoration: none; }
  nav.atv-nav { display: flex; flex-direction: column; justify-content: center; }
  nav.atv-nav .item { border-bottom: 1px solid rgba(176,141,62,0.22); }
  nav.atv-nav a.main, nav.atv-nav button.main {
    display: flex; align-items: baseline; gap: 22px; width: 100%;
    background: none; border: none; cursor: pointer; text-align: left;
    text-decoration: none; padding: 3.1vh 0;
    font-family: 'Playfair Display', serif; font-weight: 400;
    font-size: clamp(28px, 3.4vw, 52px); color: #F2EDE3;
    transition: color .3s ease, padding-left .35s ease;
  }
  nav.atv-nav .num {
    font-family: 'Jost', sans-serif; font-size: 10px; letter-spacing: 0.3em;
    color: rgba(212,175,106,0.7);
  }
  nav.atv-nav a.main:hover, nav.atv-nav button.main:hover { color: #D4AF6A; padding-left: 14px; }
  nav.atv-nav .sub {
    max-height: 0; overflow: hidden; transition: max-height .6s cubic-bezier(.4,0,.2,1);
    display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    column-gap: 30px;
  }
  nav.atv-nav .item.expanded .sub { max-height: 460px; padding-bottom: 2.4vh; }
  nav.atv-nav .sub a {
    display: block; padding: 9px 0; text-decoration: none;
    font-family: 'Jost', sans-serif; font-weight: 300;
    font-size: 12.5px; letter-spacing: 0.24em; text-transform: uppercase;
    color: rgba(242,237,227,0.72);
    transition: color .25s ease, padding-left .25s ease;
  }
  nav.atv-nav .sub a:hover { color: #D4AF6A; padding-left: 8px; }
  nav.atv-nav .caret {
    margin-left: auto; font-family: 'Jost', sans-serif; font-size: 18px;
    color: #B08D3E; transition: transform .4s ease;
  }
  nav.atv-nav .item.expanded .caret { transform: rotate(45deg); }
  @media (max-width: 900px) {
    #atv-menu-btn, #atv-menu-close { top: 18px; right: 18px; padding: 11px 16px 10px 18px; }
    #atv-menu-inner { grid-template-columns: 1fr; gap: 5vh; padding: 12vh 8vw 10vh; }
    .atv-menu-brand { order: 2; }
    nav.atv-nav a.main, nav.atv-nav button.main { font-size: 30px; padding: 2.2vh 0; }
    nav.atv-nav .sub { grid-template-columns: 1fr; }
  }`;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  const services = [
    ['Dining & Reservations', 'dining'],
    ['Nightlife & Beach Clubs', 'nightlife'],
    ['Luxury Travel', 'travel'],
    ['Hotels & Resorts', 'hotels'],
    ['Villas & Private Stays', 'villas'],
    ['Private Aviation', 'aviation'],
    ['Chauffeur & Luxury Transport', 'chauffeur'],
    ['Yacht Charter', 'yacht'],
    ['Lifestyle Requests', 'lifestyle'],
  ];

  const btn = document.createElement('button');
  btn.id = 'atv-menu-btn';
  btn.setAttribute('aria-label', 'Open menu');
  btn.innerHTML = '<span class="bars"><span></span><span></span><span></span></span> Menu';

  const overlay = document.createElement('div');
  overlay.id = 'atv-menu-overlay';
  overlay.innerHTML = `
    <canvas id="atv-menu-grain"></canvas>
    <button id="atv-menu-close" aria-label="Close menu">Close &nbsp;✕</button>
    <div id="atv-menu-inner">
      <div class="atv-menu-brand">
        <img src="logo.svg" alt="A-TYPE VIP">
        <div class="line"></div>
        <p>Time is life's greatest luxury.<br>We exist to protect it.</p>
        <div class="contact">
          <a href="${wa('Hello A-TYPE VIP, I would like to start the conversation.')}" target="_blank" rel="noopener">WhatsApp — 07386 538 896</a><br>
          <a href="mailto:info@atypevip.com">info@atypevip.com</a><br>
          <a href="https://instagram.com/atypevip" target="_blank" rel="noopener">@atypevip</a>
        </div>
      </div>
      <nav class="atv-nav">
        <div class="item"><a class="main" href="index.html"><span class="num">01</span>Home</a></div>
        <div class="item"><a class="main" href="about.html"><span class="num">02</span>About A-TYPE VIP</a></div>
        <div class="item" id="atv-wwd-item">
          <button class="main" id="atv-wwd-toggle"><span class="num">03</span>What We Do<span class="caret">+</span></button>
          <div class="sub">
            <a href="what-we-do.html">All Services — Overview</a>
            ${services.map(s => `<a href="what-we-do.html#${s[1]}">${s[0]}</a>`).join('')}
          </div>
        </div>
        <div class="item"><a class="main" href="hospitality.html"><span class="num">04</span>Hospitality</a></div>
        <div class="item"><a class="main" href="index.html?to=membership"><span class="num">05</span>Membership</a></div>
        <div class="item"><a class="main" href="${wa('Hello A-TYPE VIP, I would like to start the conversation.')}" target="_blank" rel="noopener"><span class="num">06</span>Contact</a></div>
      </nav>
    </div>`;

  function mount() {
    document.body.appendChild(btn);
    document.body.appendChild(overlay);
    const close = overlay.querySelector('#atv-menu-close');
    const open = () => { overlay.classList.add('open'); document.body.style.overflow = 'hidden'; };
    const shut = () => { overlay.classList.remove('open'); document.body.style.overflow = ''; };
    btn.addEventListener('click', open);
    close.addEventListener('click', shut);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') shut(); });
    overlay.querySelector('#atv-wwd-toggle').addEventListener('click', () =>
      overlay.querySelector('#atv-wwd-item').classList.toggle('expanded'));
    overlay.querySelectorAll('nav a').forEach(a => a.addEventListener('click', shut));

    const g = overlay.querySelector('#atv-menu-grain');
    const gc = g.getContext('2d');
    g.width = 240; g.height = 240;
    setInterval(() => {
      if (!overlay.classList.contains('open')) return;
      const d = gc.createImageData(240, 240);
      for (let i = 0; i < d.data.length; i += 4) {
        const v = Math.random() * 255;
        d.data[i] = d.data[i+1] = d.data[i+2] = v; d.data[i+3] = 34;
      }
      gc.putImageData(d, 0, 0);
    }, 140);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
