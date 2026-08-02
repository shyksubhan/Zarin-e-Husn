const fs = require('fs');
const path = require('path');

const cssDir = path.join(__dirname, 'css');

const styleCss = `
/* ============================================================
   Zarin-e-Husn - Global Luxury Styles
   Theme: Sleek Dark Mode with Gold Accents
   Fonts: 'Outfit' for UI, 'Playfair Display' for Headings
   ============================================================ */

@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap');

:root {
  --bg-dark: #0f1115;
  --bg-surface: #181b21;
  --bg-surface-light: #21252d;
  --text-main: #e2e4e9;
  --text-muted: #9ba1ad;
  --gold: #d4af37;
  --gold-hover: #f3d56a;
  --gold-dim: rgba(212, 175, 55, 0.15);
  
  --font-heading: 'Playfair Display', serif;
  --font-ui: 'Outfit', sans-serif;
  
  --transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  --glass-bg: rgba(24, 27, 33, 0.7);
  --glass-border: rgba(255, 255, 255, 0.05);
  --shadow: 0 10px 40px rgba(0,0,0,0.5);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-dark);
  color: var(--text-main);
  font-family: var(--font-ui);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

.container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 5%;
}

a {
  color: inherit;
  text-decoration: none;
  transition: var(--transition);
}

/* ============================================================
   ANNOUNCEMENT BAR & HEADER
   ============================================================ */
.announcement-bar {
  background: var(--gold);
  color: #000;
  text-align: center;
  padding: 8px 15px;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.luxury-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 5%;
  transition: var(--transition);
}

.luxury-header.scrolled {
  padding: 10px 5%;
  box-shadow: 0 4px 30px rgba(0,0,0,0.3);
}

.header-left, .header-right {
  display: flex;
  align-items: center;
  gap: 30px;
  flex: 1;
}

.header-right {
  justify-content: flex-end;
}

.header-center {
  flex: 0 0 auto;
  text-align: center;
}

.nav-logo-img {
  height: 50px;
  width: auto;
  transition: var(--transition);
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 30px;
}

.nav-links a {
  font-size: 0.95rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-main);
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0%;
  height: 1px;
  background: var(--gold);
  transition: var(--transition);
}

.nav-links a:hover::after, .nav-links a.active::after {
  width: 100%;
}

.nav-icons {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-icons button, .nav-icons a {
  background: none;
  border: none;
  color: var(--text-main);
  font-size: 1.2rem;
  cursor: pointer;
  position: relative;
  transition: var(--transition);
}

.nav-icons button:hover, .nav-icons a:hover {
  color: var(--gold);
}

.cart-count {
  position: absolute;
  top: -6px;
  right: -8px;
  background: var(--gold);
  color: #000;
  font-size: 0.65rem;
  font-weight: 700;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ============================================================
   HERO SLIDER
   ============================================================ */
.luxury-hero-slider {
  position: relative;
  height: calc(100vh - 120px);
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-carousel {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.carousel-slide {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1.5s ease-in-out;
}

.carousel-slide.active {
  opacity: 1;
}

.hero-video-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(15,17,21,1) 0%, rgba(15,17,21,0.4) 50%, rgba(15,17,21,0.7) 100%);
  z-index: 2;
}

.luxury-hero-content {
  position: relative;
  z-index: 3;
  text-align: center;
  max-width: 800px;
  padding: 0 20px;
}

.hero-logo {
  height: 90px;
  margin-bottom: 30px;
  filter: drop-shadow(0 0 20px rgba(212,175,55,0.4));
  animation: fadeUp 1s forwards;
}

.hero-title-sub {
  font-family: var(--font-heading);
  font-size: 4rem;
  line-height: 1.1;
  font-weight: 500;
  color: #fff;
  margin-bottom: 20px;
  animation: fadeUp 1s 0.2s forwards;
  opacity: 0;
}

.hero-desc {
  font-size: 1.2rem;
  color: var(--text-muted);
  margin-bottom: 40px;
  animation: fadeUp 1s 0.4s forwards;
  opacity: 0;
}

.hero-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  animation: fadeUp 1s 0.6s forwards;
  opacity: 0;
}

/* ============================================================
   BUTTONS
   ============================================================ */
.btn-luxury-primary, .btn-luxury-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 15px 35px;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border-radius: 4px;
  cursor: pointer;
  transition: var(--transition);
  border: 1px solid var(--gold);
}

.btn-luxury-primary {
  background: var(--gold);
  color: #000;
}

.btn-luxury-primary:hover {
  background: var(--gold-hover);
  border-color: var(--gold-hover);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(212,175,55,0.2);
}

.btn-luxury-outline {
  background: transparent;
  color: var(--gold);
}

.btn-luxury-outline:hover {
  background: var(--gold-dim);
  transform: translateY(-2px);
}

/* ============================================================
   GLOBAL SECTIONS & TYPOGRAPHY
   ============================================================ */
.luxury-section {
  padding: 100px 0;
}

.luxury-bg-light {
  background: var(--bg-surface);
}

.section-header-centered {
  text-align: center;
  margin-bottom: 60px;
}

.section-header-left {
  text-align: left;
  margin-bottom: 40px;
}

.luxury-subtitle {
  display: block;
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 15px;
}

.luxury-title {
  font-family: var(--font-heading);
  font-size: 2.8rem;
  font-weight: 400;
  color: #fff;
}

.luxury-divider {
  width: 60px;
  height: 1px;
  background: var(--gold);
  margin: 25px auto;
}

.luxury-text {
  font-size: 1.1rem;
  color: var(--text-muted);
  line-height: 1.8;
}

/* ============================================================
   PRODUCT CARDS & GRIDS
   ============================================================ */
.luxury-product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 40px 30px;
}

.luxury-product-scroll {
  display: flex;
  overflow-x: auto;
  gap: 30px;
  padding-bottom: 30px;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
  scrollbar-color: var(--gold) var(--bg-surface);
}

.luxury-product-scroll::-webkit-scrollbar {
  height: 6px;
}
.luxury-product-scroll::-webkit-scrollbar-track {
  background: var(--bg-surface);
}
.luxury-product-scroll::-webkit-scrollbar-thumb {
  background-color: var(--gold);
  border-radius: 10px;
}

.luxury-product-card {
  background: var(--bg-surface);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  overflow: hidden;
  transition: var(--transition);
  position: relative;
  display: flex;
  flex-direction: column;
}

.luxury-product-card:hover {
  transform: translateY(-5px);
  border-color: rgba(212,175,55,0.3);
  box-shadow: 0 15px 30px rgba(0,0,0,0.6);
}

.card-img-wrap {
  position: relative;
  aspect-ratio: 4/5;
  overflow: hidden;
  background: var(--bg-surface-light);
}

.card-img-wrap img, .card-img-wrap video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}

.luxury-product-card:hover .card-img-wrap img {
  transform: scale(1.05);
}

.product-action-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--glass-bg);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255,255,255,0.1);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(-10px);
  transition: var(--transition);
  cursor: pointer;
}

.luxury-product-card:hover .product-action-btn {
  opacity: 1;
  transform: translateY(0);
}

.product-action-btn:hover {
  background: var(--gold);
  color: #000;
  border-color: var(--gold);
}

.card-info {
  padding: 25px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-cat {
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 8px;
}

.product-name {
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 12px;
}

.product-name a {
  color: #fff;
}

.product-name a:hover {
  color: var(--gold);
}

.product-price {
  font-size: 1.1rem;
  color: var(--text-muted);
  margin-top: auto;
}

.product-action-row {
  opacity: 0;
  transform: translateY(10px);
  transition: var(--transition);
  height: 0;
  overflow: hidden;
}

.luxury-product-card:hover .product-action-row {
  opacity: 1;
  transform: translateY(0);
  height: 42px;
  margin-top: 20px;
}

/* ============================================================
   CATEGORIES GRID
   ============================================================ */
.luxury-category-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.luxury-category-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 16/9;
}

.luxury-category-card .card-img-wrap {
  position: absolute;
  inset: 0;
}

.luxury-category-card .card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(15,17,21,0.9) 0%, rgba(15,17,21,0.2) 100%);
  transition: var(--transition);
}

.luxury-category-card:hover .card-overlay {
  background: linear-gradient(to top, rgba(15,17,21,0.95) 0%, rgba(15,17,21,0.4) 100%);
}

.luxury-category-card .card-info {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 40px;
  z-index: 2;
}

.luxury-category-card h3 {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  color: #fff;
  transition: var(--transition);
}

.luxury-category-card:hover h3 {
  color: var(--gold);
  transform: translateX(10px);
}

/* ============================================================
   FOOTER
   ============================================================ */
.luxury-footer {
  background: #0a0b0e;
  padding: 80px 0 30px;
  border-top: 1px solid var(--glass-border);
}

.footer-layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 60px;
  margin-bottom: 60px;
}

.footer-brand-section {
  max-width: 350px;
}

.footer-tagline {
  color: var(--text-muted);
  font-size: 1rem;
  margin-bottom: 30px;
}

.footer-social {
  display: flex;
  gap: 15px;
}

.footer-social-item {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  border: 1px solid var(--glass-border);
}

.footer-social-item:hover {
  background: var(--gold);
  color: #000;
  border-color: var(--gold);
  transform: translateY(-3px);
}

.footer-links-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.footer-heading {
  font-family: var(--font-heading);
  font-size: 1.3rem;
  color: #fff;
  margin-bottom: 25px;
}

.footer-col ul {
  list-style: none;
}

.footer-col li {
  margin-bottom: 12px;
}

.footer-col a, .footer-col p {
  color: var(--text-muted);
  font-size: 0.95rem;
  transition: var(--transition);
}

.footer-col a:hover {
  color: var(--gold);
}

.footer-col p {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.footer-bottom-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255,255,255,0.05);
  color: var(--text-muted);
  font-size: 0.9rem;
}

.footer-payment-methods {
  display: flex;
  gap: 15px;
}

.pay-method {
  padding: 5px 12px;
  border: 1px solid var(--glass-border);
  border-radius: 4px;
  font-size: 0.8rem;
  background: var(--bg-surface);
}

/* ============================================================
   ANIMATIONS & MISC
   ============================================================ */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

#whatsapp-btn-wrap {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999;
}

#whatsapp-float {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: #25D366;
  color: #fff;
  border-radius: 50%;
  box-shadow: 0 10px 30px rgba(37,211,102,0.3);
  transition: var(--transition);
}

#whatsapp-float:hover {
  transform: scale(1.1);
  box-shadow: 0 15px 40px rgba(37,211,102,0.5);
}

.wa-tooltip {
  display: none;
}

/* OVERLAYS & SEARCH */
#search-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(15,17,21,0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
}
#search-overlay.active {
  display: flex;
  align-items: center;
  justify-content: center;
}
.search-box {
  width: 100%;
  max-width: 800px;
  padding: 40px;
}
.search-inner {
  display: flex;
  align-items: center;
  border-bottom: 2px solid var(--gold);
  padding-bottom: 10px;
}
#search-input {
  flex: 1;
  background: none;
  border: none;
  color: #fff;
  font-size: 2rem;
  padding: 0 20px;
  outline: none;
  font-family: var(--font-heading);
}

#cart-drawer {
  position: fixed;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100vh;
  background: var(--bg-surface);
  z-index: 1000;
  transition: right 0.4s ease;
  display: flex;
  flex-direction: column;
  border-left: 1px solid var(--glass-border);
}

#cart-drawer.open {
  right: 0;
}

.cart-header {
  padding: 25px;
  border-bottom: 1px solid var(--glass-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-header h3 {
  font-family: var(--font-heading);
  color: #fff;
  font-size: 1.5rem;
}

.cart-close {
  background: none;
  border: none;
  color: var(--text-main);
  font-size: 1.5rem;
  cursor: pointer;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 25px;
}

.cart-footer {
  padding: 25px;
  border-top: 1px solid var(--glass-border);
  background: var(--bg-surface-light);
}

.cart-total {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: #fff;
  font-weight: 600;
}

/* RESPONSIVE */
@media (max-width: 900px) {
  .nav-links-left, .nav-links-right {
    display: none;
  }
  .luxury-hero-slider {
    height: 70vh;
  }
  .hero-title-sub {
    font-size: 2.5rem;
  }
  .luxury-category-grid {
    grid-template-columns: 1fr;
  }
  .footer-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .footer-links-section {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .footer-bottom-bar {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
}
`;

const pagesCss = `
/* ============================================================
   PAGES SPECIFIC LUXURY STYLES
   ============================================================ */

.luxury-page-hero {
  padding: 120px 0 80px;
  text-align: center;
  background: linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-dark) 100%);
  border-bottom: 1px solid var(--glass-border);
}

.luxury-page-hero .luxury-subtitle {
  font-size: 1rem;
  margin-bottom: 20px;
}

.luxury-page-hero .luxury-title {
  font-size: 3.5rem;
  margin-bottom: 20px;
}

.luxury-hero-desc {
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.2rem;
  color: var(--text-muted);
}

.luxury-filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 40px;
  justify-content: center;
}

.filter-btn, .shop-filter-btn {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.1);
  color: var(--text-muted);
  padding: 10px 25px;
  border-radius: 30px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: var(--transition);
}

.filter-btn:hover, .shop-filter-btn:hover {
  border-color: var(--gold);
  color: var(--gold);
}

.filter-btn.active, .shop-filter-btn.active {
  background: var(--gold);
  color: #000;
  border-color: var(--gold);
  font-weight: 500;
}

.luxury-contact-box {
  background: var(--bg-surface);
  padding: 50px;
  border-radius: 12px;
  border: 1px solid var(--glass-border);
  box-shadow: var(--shadow);
}

.luxury-contact-box h3 {
  font-family: var(--font-heading);
  font-size: 2rem;
  color: var(--gold);
  margin-bottom: 30px;
}
`;

fs.writeFileSync(path.join(cssDir, 'style.css'), styleCss, 'utf8');
fs.writeFileSync(path.join(cssDir, 'pages.css'), pagesCss, 'utf8');
console.log('Wrote luxury styles to style.css and pages.css');
