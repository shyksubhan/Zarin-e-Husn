const fs = require('fs');
const path = require('path');

const baseDir = __dirname;

const sharedHead = (title, desc, bodyClass) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} — Zarin-e-Husn</title>
  <meta name="description" content="${desc}" />
  <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
  <link rel="stylesheet" href="css/style.css" />
  <link rel="stylesheet" href="css/pages.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
</head>
<body class="${bodyClass}">
`;

const announcementBar = `
<div class="announcement-bar">
  <p>Free shipping on orders over PKR 5000</p>
</div>
`;

const header = `
<header class="luxury-header">
  <div class="header-left">
    <button class="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
    <ul class="nav-links nav-links-left">
      <li><a href="/">Home</a></li>
      <li class="nav-dropdown">
        <a href="shop.html">Shop <i class="fa-solid fa-chevron-down" style="font-size:0.7em;margin-left:4px;"></i></a>
        <ul class="dropdown-menu">
          <li><a href="shop.html">All Collections</a></li>
          <li><a href="jewelry.html">Jewelry</a></li>
          <li><a href="cosmetics.html">Cosmetics</a></li>
        </ul>
      </li>
    </ul>
  </div>
  <div class="header-center">
    <a href="/" class="nav-logo nav-logo-link" style="display:inline-flex;align-items:center;text-decoration:none;">
      <img src="images/logo-light.png" alt="Zarin-e-Husn" class="nav-logo-img" style="height:52px;width:auto;" />
    </a>
  </div>
  <div class="header-right">
    <ul class="nav-links nav-links-right">
      <li><a href="about.html">Our Story</a></li>
      <li><a href="contact.html">Contact</a></li>
    </ul>
    <div class="nav-icons">
      <button id="search-toggle" aria-label="Search"><i class="fa-solid fa-magnifying-glass"></i></button>
      <a href="account.html" aria-label="Account"><i class="fa-regular fa-user"></i></a>
      <button data-open-cart aria-label="Bag">
        <i class="fa-solid fa-bag-shopping"></i>
        <span class="cart-count" style="display:none">0</span>
      </button>
    </div>
  </div>
</header>
`;

const sharedOverlays = `
<!-- SEARCH OVERLAY -->
<div id="search-overlay">
  <div class="search-box">
    <div class="search-inner">
      <span class="search-icon-big"><i class="fa-solid fa-magnifying-glass"></i></span>
      <input type="text" id="search-input" placeholder="Search cosmetics, jewelry, beauty products…" autocomplete="off" />
      <button id="search-close">&#10005;</button>
    </div>
    <div id="search-results"></div>
  </div>
</div>

<!-- CART DRAWER -->
<div id="cart-drawer">
  <div class="cart-header">
    <h3>Your Bag</h3>
    <button id="cart-close" class="cart-close">&#10005;</button>
  </div>
  <div class="cart-items" id="cart-items">
    <div class="cart-empty">Your bag is empty.</div>
  </div>
  <div class="cart-footer">
    <div class="cart-total">
      <span>Total</span>
      <span id="cart-total-val">PKR 0</span>
    </div>
    <button onclick="proceedToCheckout()" class="btn-primary cart-checkout" style="width:100%;cursor:pointer;">Proceed to Checkout</button>
  </div>
</div>
<!-- OVERLAY -->
<div id="overlay"></div>
<!-- TOAST -->
<div id="toast"></div>

<!-- WHATSAPP BUTTON -->
<div id="whatsapp-btn-wrap">
  <a id="whatsapp-float" href="https://wa.me/923150727131" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
    <span class="wa-tooltip">Chat with us</span>
  </a>
</div>
`;

const scripts = `
<script src="js/whatsapp-config.js"></script>
<script src="js/api.js"></script>
<script src="js/main.js"></script>
<script src="js/products-render.js"></script>
<script src="js/search.js"></script>
`;

const footer = `
<footer class="luxury-footer">
  <div class="container">
    <div class="footer-layout">
      <div class="footer-brand-section">
        <a href="/" class="nav-logo nav-logo-link" style="display:inline-flex;align-items:center;text-decoration:none;">
          <img src="images/logo-dark.png" alt="Zarin-e-Husn" style="height:60px;width:auto;margin-bottom:20px;" />
        </a>
        <p class="footer-tagline">Elevating everyday elegance. Premium cosmetics and fine jewelry for the modern woman in Pakistan.</p>
        <div class="footer-social" id="footer-social-links">
          <a href="https://www.instagram.com/zarin_e_husn/" target="_blank" rel="noopener" aria-label="Instagram" class="footer-social-item"><i class="fa-brands fa-instagram"></i></a>
          <a href="https://www.facebook.com/profile.php?id=61592598563035" target="_blank" rel="noopener" aria-label="Facebook" class="footer-social-item"><i class="fa-brands fa-facebook-f"></i></a>
          <a href="https://wa.me/923150727131" target="_blank" rel="noopener" aria-label="WhatsApp" class="footer-social-item"><i class="fa-brands fa-whatsapp"></i></a>
        </div>
      </div>
      <div class="footer-links-section">
        <div class="footer-col">
          <h4 class="footer-heading">Collections</h4>
          <ul>
            <li><a href="shop.html">All Products</a></li>
            <li><a href="jewelry.html">Jewelry</a></li>
            <li><a href="cosmetics.html">Cosmetics</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 class="footer-heading">Customer Care</h4>
          <ul>
            <li><a href="contact.html">Contact Us</a></li>
            <li><a href="policy.html?page=shipping">Shipping & Returns</a></li>
            <li><a href="policy.html?page=faqs">FAQs</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4 class="footer-heading">Contact</h4>
          <p>&#9993; <a href="mailto:zarinehusn@gmail.com">zarinehusn@gmail.com</a></p>
          <p><i class="fa-brands fa-whatsapp" style="color:#25D366;"></i> <a href="https://wa.me/923150727131">+92 315 0727131</a></p>
          <p>&#128205; Lahore, Pakistan</p>
        </div>
      </div>
    </div>
    <div class="footer-bottom-bar">
      <p>&copy; 2026 Zarin-e-Husn. All rights reserved.</p>
      <div class="footer-payment-methods">
        <span class="pay-method">Cash on Delivery</span>
        <span class="pay-method">Bank Transfer</span>
      </div>
    </div>
  </div>
</footer>
</body>
</html>
`;

const pages = {
    "index.html": {
        title: "Premium Cosmetics & Luxury Jewelry | Pakistan",
        desc: "Shop Pakistan's finest cosmetics & luxury jewelry online.",
        bodyClass: "page-home page-luxury",
        content: `
<!-- HERO -->
<section id="luxury-hero" class="luxury-hero-slider">
  <div class="hero-carousel">
    <div class="carousel-slide active" style="background-image: url('images/hero-1.jpg');"></div>
    <div class="carousel-slide" style="background-image: url('images/hero-2.jpg');"></div>
    <div class="carousel-slide" style="background-image: url('images/hero-3.jpg');"></div>
  </div>
  <div class="hero-video-overlay" aria-hidden="true"></div>
  <div class="hero-content luxury-hero-content">
    <img src="images/logo-light.png" alt="Zarin-e-Husn" class="hero-logo" />
    <h1 class="hero-title-sub">The Art of Pure Elegance</h1>
    <p class="hero-desc">Premium Cosmetics & Luxury Jewelry — Crafted for the Modern Woman</p>
    <div class="hero-actions">
      <a href="jewelry.html" class="btn-luxury-primary">Explore Jewelry</a>
      <a href="cosmetics.html" class="btn-luxury-outline">Shop Cosmetics</a>
    </div>
  </div>
  <div class="hero-dots">
    <span class="hero-dot active" data-slide="0"></span>
    <span class="hero-dot" data-slide="1"></span>
    <span class="hero-dot" data-slide="2"></span>
  </div>
</section>

<!-- CATEGORIES -->
<section class="luxury-section categories-section">
  <div class="container">
    <div class="section-header-centered">
      <span class="luxury-subtitle">Discover</span>
      <h2 class="luxury-title">Our Collections</h2>
      <div class="luxury-divider"></div>
    </div>
    <div class="luxury-category-grid">
      <a href="jewelry.html" class="luxury-category-card">
        <div class="card-img-wrap">
          <img src="images/categories/jewelry.jpg" alt="Jewelry" loading="lazy"/>
          <div class="card-overlay"></div>
        </div>
        <div class="card-info">
          <h3>Fine Jewelry</h3>
        </div>
      </a>
      <a href="cosmetics.html" class="luxury-category-card">
        <div class="card-img-wrap" style="background:#f5f0ea;">
          <img src="images/categories/cosmetics.jpg" alt="Cosmetics" loading="lazy"/>
          <div class="card-overlay"></div>
        </div>
        <div class="card-info">
          <h3>Premium Cosmetics</h3>
        </div>
      </a>
    </div>
  </div>
</section>

<div id="pinned-collections-wrapper"></div>

<!-- Featured Jewelry -->
<section id="featured-jewelry" class="luxury-section">
  <div class="container">
    <div class="section-header-left">
      <span class="luxury-subtitle">Curated For You</span>
      <h2 class="luxury-title">Featured Jewelry</h2>
    </div>
    <div class="luxury-product-scroll" id="featured-jewelry-grid">
      <div style="grid-column:1/-1;text-align:center;padding:40px;opacity:0.5;">Loading products...</div>
    </div>
  </div>
</section>

<!-- Featured Cosmetics -->
<section id="featured-cosmetics" class="luxury-section">
  <div class="container">
    <div class="section-header-left">
      <span class="luxury-subtitle">Beauty Essentials</span>
      <h2 class="luxury-title">Featured Cosmetics</h2>
    </div>
    <div class="luxury-product-scroll" id="featured-cosmetics-grid">
      <div style="grid-column:1/-1;text-align:center;padding:40px;opacity:0.5;">Loading products...</div>
    </div>
  </div>
</section>

<!-- REVIEWS -->
<section id="testimonials" class="luxury-section luxury-bg-light">
  <div class="container">
    <div class="section-header-centered">
      <span class="luxury-subtitle">Client Stories</span>
      <h2 class="luxury-title">Voices of Elegance</h2>
      <div class="luxury-divider"></div>
    </div>
    <div class="testimonial-slider" id="reviews-container">
      <p style="text-align:center;color:var(--muted);padding:40px 0;">Loading reviews…</p>
    </div>
  </div>
</section>

<script>
  (function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.hero-dot');
    if (slides.length === 0) return;
    let currentSlide = 0;
    function goToSlide(n) {
      slides[currentSlide].classList.remove('active');
      if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
      currentSlide = n % slides.length;
      slides[currentSlide].classList.add('active');
      if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }
    let timer = setInterval(() => goToSlide(currentSlide + 1), 4000);
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        clearInterval(timer);
        goToSlide(parseInt(dot.dataset.slide));
        timer = setInterval(() => goToSlide(currentSlide + 1), 4000);
      });
    });
  })();
</script>
`
    },
    "shop.html": {
        title: "Shop Collections",
        desc: "Browse all collections.",
        bodyClass: "page-shop page-luxury",
        content: `
<div class="luxury-page-hero">
  <div class="container">
    <span class="luxury-subtitle">Premium Collections</span>
    <h1 class="luxury-title" id="shop-hero-title">Shop All</h1>
    <p id="shop-hero-desc" class="luxury-hero-desc">Discover Pakistan's finest online selection.</p>
  </div>
</div>
<section class="luxury-section">
  <div class="container">
    <div class="luxury-filter-bar primary-filter-bar">
      <button class="shop-filter-btn top-tier active" data-main-filter="all">All</button>
      <button class="shop-filter-btn top-tier" data-main-filter="jewelry">Jewelry</button>
      <button class="shop-filter-btn top-tier" data-main-filter="cosmetics">Cosmetics</button>
    </div>
    <div class="luxury-filter-bar secondary-filter-bar" id="sub-filter-bar" style="display:none;margin-top:20px;"></div>
    <div class="luxury-product-grid" id="shop-products-grid">
      <p style="grid-column:1/-1;text-align:center;padding:60px 0;opacity:0.5;">Loading products…</p>
    </div>
  </div>
</section>
<script>
window.updateShopHero = function(cat) {
  const titleEl = document.getElementById('shop-hero-title');
  const descEl = document.getElementById('shop-hero-desc');
  if (!titleEl || !descEl) return;
  const data = {
    'all': { title: 'Zarin-e-Husn Collections', desc: "Discover Pakistan's finest online selection of premium cosmetics, and beautifully crafted jewelry pieces for every occasion." },
    'jewelry': { title: 'Fine Jewelry Collection', desc: 'Explore our complete range of premium rings, necklaces, earrings, bracelets, bangles, and sets.' },
    'cosmetics': { title: 'Premium Cosmetics', desc: 'Explore our complete range of cosmetics.' }
  };
  const info = data[cat] || data['all'];
  titleEl.innerHTML = info.title;
  descEl.innerHTML = info.desc;
  if (cat === 'all') window.history.replaceState(null, '', 'shop.html');
  else window.history.replaceState(null, '', 'shop.html?cat=' + cat);
};
const HIERARCHY = {
  'jewelry': [
    { label: 'All Jewelry', filter: 'all-jewelry' },
    { label: 'Bracelets', filter: 'bracelets' },
    { label: 'Rings', filter: 'rings' },
    { label: 'Earrings', filter: 'earrings' },
    { label: 'Necklace', filter: 'necklace' },
    { label: 'Bangles', filter: 'bangles' },
    { label: 'Jewelry Sets', filter: 'jewelry-sets' }
  ],
  'cosmetics': [
    { label: 'All Cosmetics', filter: 'all-cosmetics' },
    { label: 'Face Cosmetics', filter: 'face-cosmetics' },
    { label: 'Eye Makeup', filter: 'eye-makeup' },
    { label: 'Lip Makeup', filter: 'lip-makeup' },
    { label: 'Nail Cosmetics', filter: 'nail-cosmetics' },
    { label: 'Skin Care', filter: 'skin-care' },
    { label: 'Hand & Foot Care', filter: 'hand-foot-care' },
    { label: 'Makeup Tools & Brushes', filter: 'makeup-tools' },
    { label: 'Makeup Accessories', filter: 'makeup-accessories' }
  ]
};
document.addEventListener('DOMContentLoaded', () => {
  const primaryBtns = document.querySelectorAll('.shop-filter-btn.top-tier');
  const subFilterBar = document.getElementById('sub-filter-bar');
  function renderSubFilters(mainCat) {
    if (mainCat === 'all' || !HIERARCHY[mainCat]) {
      subFilterBar.style.display = 'none';
      subFilterBar.innerHTML = '';
      return;
    }
    subFilterBar.innerHTML = HIERARCHY[mainCat].map((sub, idx) => 
      \`<button class="shop-filter-btn sub-tier \${idx === 0 ? 'active' : ''}" data-sub-filter="\${sub.filter}" data-parent="\${mainCat}">\${sub.label}</button>\`
    ).join('');
    subFilterBar.style.display = 'flex';
    document.querySelectorAll('.shop-filter-btn.sub-tier').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.shop-filter-btn.sub-tier').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterProducts();
      });
    });
  }
  function filterProducts() {
    const activeMain = document.querySelector('.shop-filter-btn.top-tier.active')?.dataset.mainFilter || 'all';
    const activeSub = document.querySelector('.shop-filter-btn.sub-tier.active')?.dataset.subFilter;
    document.querySelectorAll('.luxury-product-card').forEach(card => {
      const cardMain = card.dataset.mainCat;
      const cardSub = card.dataset.cat;
      let show = false;
      if (activeMain === 'all') show = true;
      else if (cardMain === activeMain) {
        if (!activeSub || activeSub.startsWith('all-')) show = true;
        else show = (cardSub === activeSub);
      }
      card.style.display = show ? '' : 'none';
    });
    let logicalCat = activeMain;
    if (activeSub && !activeSub.startsWith('all-')) logicalCat = activeSub;
    window.updateShopHero(logicalCat);
  }
  primaryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      primaryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSubFilters(btn.dataset.mainFilter);
      filterProducts();
    });
  });
});
</script>
`
    },
    "jewelry.html": {
        title: "Fine Jewelry",
        desc: "Shop luxury jewelry.",
        bodyClass: "page-jewelry page-luxury",
        content: `
<div class="luxury-page-hero">
  <div class="container">
    <span class="luxury-subtitle">Exquisite</span>
    <h1 class="luxury-title" id="shop-hero-title">Fine Jewelry</h1>
    <p id="shop-hero-desc" class="luxury-hero-desc">Discover our beautiful collection of jewelry.</p>
  </div>
</div>
<section class="luxury-section">
  <div class="container">
    <div class="luxury-filter-bar">
      <button class="filter-btn active" data-filter="all">All Jewelry</button>
      <button class="filter-btn" data-filter="bracelets">Bracelets</button>
      <button class="filter-btn" data-filter="rings">Rings</button>
      <button class="filter-btn" data-filter="earrings">Earrings</button>
      <button class="filter-btn" data-filter="necklace">Necklaces</button>
      <button class="filter-btn" data-filter="bangles">Bangles</button>
      <button class="filter-btn" data-filter="jewelry-sets">Jewelry Sets</button>
    </div>
    <div class="luxury-product-grid" id="shop-products-grid" data-main-cat="jewelry">
      <p style="grid-column:1/-1;text-align:center;padding:60px 0;opacity:0.5;">Loading products…</p>
    </div>
  </div>
</section>
<script>
window.updateShopHero = function(cat) {
  const titleEl = document.getElementById('shop-hero-title');
  const descEl = document.getElementById('shop-hero-desc');
  if (!titleEl || !descEl) return;
  const data = {
    'all': { title: 'Fine Jewelry', desc: "Discover Pakistan's finest online selection of beautifully crafted jewelry pieces for every occasion." },
    'bracelets': { title: 'Bracelets', desc: 'Adorn your wrists with beautifully crafted bracelets and bangles.' },
    'rings': { title: 'Fashion Rings', desc: 'Discover trendy and classic fashion rings for women.' },
    'earrings': { title: 'Statement Earrings', desc: 'Elevate your style with our collection of statement earrings.' },
    'necklace': { title: 'Elegant Necklaces', desc: 'Shop gorgeous necklaces, chains, and pendants.' },
    'bangles': { title: 'Elegant Bangles', desc: 'Discover our beautifully crafted traditional and modern bangles.' },
    'jewelry-sets': { title: 'Jewelry Sets', desc: 'Perfectly matched jewelry sets for weddings and formal wear.' }
  };
  const info = data[cat] || data['all'];
  titleEl.innerHTML = info.title;
  descEl.innerHTML = info.desc;
  if (cat === 'all') window.history.replaceState(null, '', 'jewelry.html');
  else window.history.replaceState(null, '', 'jewelry.html?cat=' + cat);
};
</script>
`
    },
    "cosmetics.html": {
        title: "Cosmetics",
        desc: "Shop luxury cosmetics.",
        bodyClass: "page-cosmetics page-luxury",
        content: `
<div class="luxury-page-hero">
  <div class="container">
    <span class="luxury-subtitle">Flawless</span>
    <h1 class="luxury-title" id="shop-hero-title">Cosmetics</h1>
    <p id="shop-hero-desc" class="luxury-hero-desc">Discover our beautiful collection of cosmetics.</p>
  </div>
</div>
<section class="luxury-section">
  <div class="container">
    <div class="luxury-filter-bar">
      <button class="filter-btn active" data-filter="all">All Cosmetics</button>
      <button class="filter-btn" data-filter="face-cosmetics">Face Cosmetics</button>
      <button class="filter-btn" data-filter="eye-makeup">Eye Makeup</button>
      <button class="filter-btn" data-filter="lip-makeup">Lip Makeup</button>
      <button class="filter-btn" data-filter="nail-cosmetics">Nail Cosmetics</button>
      <button class="filter-btn" data-filter="skin-care">Skin Care</button>
      <button class="filter-btn" data-filter="hand-foot-care">Hand & Foot Care</button>
      <button class="filter-btn" data-filter="makeup-tools">Makeup Tools</button>
      <button class="filter-btn" data-filter="makeup-accessories">Makeup Accessories</button>
    </div>
    <div class="luxury-product-grid" id="shop-products-grid" data-main-cat="cosmetics">
      <p style="grid-column:1/-1;text-align:center;padding:60px 0;opacity:0.5;">Loading products…</p>
    </div>
  </div>
</section>
<script>
window.updateShopHero = function(cat) {
  const titleEl = document.getElementById('shop-hero-title');
  const descEl = document.getElementById('shop-hero-desc');
  if (!titleEl || !descEl) return;
  const data = {
    'all': { title: 'Cosmetics', desc: "Discover Pakistan's finest online selection of premium cosmetics — from face makeup to skincare, nail art to professional brushes." },
    'face-cosmetics': { title: 'Face Cosmetics', desc: 'Discover premium foundations, powders, blush & highlighters for a flawless complexion.' },
    'eye-makeup': { title: 'Eye Makeup', desc: 'Define your eyes with premium mascaras, eyeliners, eyeshadows & brow kits.' },
    'lip-makeup': { title: 'Lip Makeup', desc: 'From matte lipsticks to glossy lip balms — find your perfect lip shade.' },
    'nail-cosmetics': { title: 'Nail Cosmetics', desc: 'Explore nail polishes, nail art kits & nail care essentials.' },
    'skin-care': { title: 'Skin Care', desc: 'Nourish your skin with premium cleansers, serums, moisturizers & sunscreens.' },
    'hand-foot-care': { title: 'Hand & Foot Care', desc: 'Pamper your hands and feet with premium creams, scrubs & care essentials.' },
    'makeup-tools': { title: 'Makeup Tools', desc: 'Shop premium makeup brushes, sponges, applicators & blending tools.' },
    'makeup-accessories': { title: 'Makeup Accessories', desc: 'From makeup bags to mirrors and organizers — find all your makeup essentials.' }
  };
  const info = data[cat] || data['all'];
  titleEl.innerHTML = info.title;
  descEl.innerHTML = info.desc;
  if (cat === 'all') window.history.replaceState(null, '', 'cosmetics.html');
  else window.history.replaceState(null, '', 'cosmetics.html?cat=' + cat);
};
</script>
`
    },
    "about.html": {
        title: "Our Story",
        desc: "About Zarin-e-Husn.",
        bodyClass: "page-about page-luxury",
        content: `
<div class="luxury-page-hero">
  <div class="container">
    <span class="luxury-subtitle">Our Heritage</span>
    <h1 class="luxury-title">The Zarin-e-Husn Story</h1>
  </div>
</div>
<section class="luxury-section">
  <div class="container" style="max-width: 800px; text-align: center;">
    <p class="luxury-text">Zarin-e-Husn was founded on a simple belief — that every woman deserves cosmetics and jewelry that are as beautiful as she is. Every product is curated with intention, so you don't just dress up — you express your soul.</p>
    <div class="luxury-divider" style="margin: 40px auto;"></div>
    <p class="luxury-text">From the heart of Lahore to doorsteps across Pakistan, we bring you premium cosmetics, fine jewelry, and beauty essentials that transcend trends and celebrate timeless femininity.</p>
  </div>
</section>
`
    },
    "contact.html": {
        title: "Contact Us",
        desc: "Get in touch with Zarin-e-Husn.",
        bodyClass: "page-contact page-luxury",
        content: `
<div class="luxury-page-hero">
  <div class="container">
    <span class="luxury-subtitle">Reach Out</span>
    <h1 class="luxury-title">Contact Us</h1>
  </div>
</div>
<section class="luxury-section">
  <div class="container" style="max-width: 600px; text-align: center;">
    <div class="luxury-contact-box">
      <h3>Customer Support</h3>
      <p class="luxury-text" style="margin-top:20px;">
        <i class="fa-brands fa-whatsapp" style="color:#25D366;font-size:1.2rem;margin-right:10px;"></i>
        <a href="https://wa.me/923150727131" style="color:var(--text-color);text-decoration:none;">+92 315 0727131</a>
      </p>
      <p class="luxury-text" style="margin-top:10px;">
        <i class="fa-solid fa-envelope" style="color:var(--gold);font-size:1.2rem;margin-right:10px;"></i>
        <a href="mailto:zarinehusn@gmail.com" style="color:var(--text-color);text-decoration:none;">zarinehusn@gmail.com</a>
      </p>
      <p class="luxury-text" style="margin-top:10px;">
        <i class="fa-solid fa-location-dot" style="color:var(--gold);font-size:1.2rem;margin-right:10px;"></i>
        Lahore, Pakistan
      </p>
    </div>
  </div>
</section>
`
    }
};

for (const [filename, data] of Object.entries(pages)) {
    const filepath = path.join(baseDir, filename);
    let fullHtml = sharedHead(data.title, data.desc, data.bodyClass);
    fullHtml += announcementBar + header + data.content + sharedOverlays + scripts + footer;
    fs.writeFileSync(filepath, fullHtml, 'utf8');
    console.log(`Wrote ${filename}`);
}
