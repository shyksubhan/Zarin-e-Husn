/* ============================================================
   ZARINEHUSN — Dynamic Product Rendering
   ============================================================ */

const ZARINEHUSN_CAT_LABELS = {
  // Cosmetics
  'face-cosmetics': 'Face Cosmetics',
  'eye-makeup': 'Eye Makeup',
  'lip-makeup': 'Lip Makeup',
  'nail-cosmetics': 'Nail Cosmetics',
  'skin-care': 'Skin Care',
  'hand-foot-care': 'Hand & Foot Care',
  'makeup-tools': 'Makeup Tools & Brushes',
  'makeup-accessories': 'Makeup Accessories',
  
  // Jewelry
  'bracelets':   'Bracelets',
  'rings':       'Rings',
  'earrings':    'Earrings',
  'necklace':    'Necklaces',
  'bangles':     'Bangles',
  'jewelry-sets': 'Jewelry Sets',
  
  // Deals
  'deals': 'Deals',
  
  // Addon Boxes
  'addon-boxes': 'Add-on Boxes',
  'ring-boxes': 'Ring Boxes',
  'jewelry-boxes': 'Jewelry Boxes'
};

window.CATEGORY_HIERARCHY = { 
  // assigned to window so product.html can use it

  'jewelry': ['bracelets', 'rings', 'earrings', 'necklace', 'bangles', 'jewelry-sets'],
  'cosmetics': ['face-cosmetics', 'eye-makeup', 'lip-makeup', 'nail-cosmetics', 'skin-care', 'hand-foot-care', 'makeup-tools', 'makeup-accessories'],
  'deals': ['deals'],
  'addon-boxes': ['ring-boxes', 'jewelry-boxes']
};

function velorCatLabel(cat) {
  if (!cat) return '';
  return ZARINEHUSN_CAT_LABELS[cat.toLowerCase()] || cat;
}

function zarinehusnProductCardHTML(p) {
  const badge = p.badge ? `<span class="product-badge${p.badge === 'New' ? ' new' : ''}">${p.badge}</span>` : '';
  const oldPrice = p.priceOld
    ? `<span class="product-price-old">PKR ${Number(p.priceOld).toLocaleString()}</span>`
    : '';
  const emoji = p.emoji || '🛍️';
  const variant = ((p.colors && p.colors[0]) || (p.sizes && p.sizes[0]) || 'Standard').replace(/\\/g, '\\\\').replace(/'/g, "\\''").replace(/"/g, '&quot;');
  const safeName = p.name.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '&quot;');
  const mainImage = (p.images && p.images.length) ? p.images[0] : null;
  const hasVideo  = !!p.video;

  const cat = p.category === 'catchers' ? 'clips' : p.category;
  const subcat = p.subcategory === 'catchers' ? 'clips' : p.subcategory;
  const resolvedCat = subcat || cat;

  let mainCat = 'unknown';
  for (const [mc, subs] of Object.entries(CATEGORY_HIERARCHY)) {
    if (subs.includes(resolvedCat)) {
      mainCat = mc;
      break;
    }
  }

  const mediaHTML = mainImage
    ? `<img src="${mainImage}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;" loading="lazy"/>`
    : hasVideo
      ? `<video src="${p.video}#t=0.1" muted preload="metadata" playsinline style="width:100%;height:100%;object-fit:cover;"></video>`
      : `<div style="width:100%;height:100%;background:var(--gold-light);display:flex;align-items:center;justify-content:center;font-size:2rem;color:var(--gold);">${emoji}</div>`;

  // Encode data safely for data-attributes (JSON encoded)
  const cardData = encodeURIComponent(JSON.stringify({
    name: p.name,
    price: p.price,
    emoji: emoji,
    variant: variant,
    image: mainImage || ''
  }));

  return `
    <div class="product-card" data-cat="${resolvedCat}" data-main-cat="${mainCat}" data-additional-cats="${(p.additionalCategories || []).join(',')}">
      <div class="product-img-wrap">
        ${badge}
        <a href="product.html?id=${p.id}">${mediaHTML}</a>
      </div>
      <div class="product-info">
        <p class="product-cat">${velorCatLabel(subcat || cat)}</p>
        <h3 class="product-name"><a href="product.html?id=${p.id}">${p.name}</a></h3>
        <div class="product-price">PKR ${Number(p.price).toLocaleString()} ${oldPrice}</div>
        <div class="product-action-row" style="display:flex;gap:8px;margin-top:12px;">
          <button class="btn-primary product-add" style="flex:1;font-size:0.8rem;padding:8px;" data-card="${cardData}" data-action="add">Add to Bag</button>
          <button class="btn-outline product-buy" style="flex:1;font-size:0.8rem;padding:8px;" data-card="${cardData}" data-action="buy">Buy it Now</button>
        </div>
      </div>
    </div>
  `;
}

function zarinehusnEmptyState(msg) {
  return `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;background:#fcfbf9;border-radius:12px;border:1px dashed #e5d5c5;color:var(--muted);"><i class="fa-solid fa-box-open" style="font-size:2rem;color:var(--gold);margin-bottom:16px;"></i><p>${msg}</p></div>`;
}

function zarinehusnReInitCards(container) {
  // Video hover
  container.querySelectorAll('.product-img-wrap').forEach(wrap => {
    const vid = wrap.querySelector('video');
    if (vid) {
      wrap.addEventListener('mouseenter', () => vid.play().catch(e=>e));
      wrap.addEventListener('mouseleave', () => { vid.pause(); vid.currentTime=0; });
    }
  });

  // Button clicks via data attributes — avoids all inline onclick quoting issues
  container.querySelectorAll('button[data-card]').forEach(btn => {
    // Remove old listeners by cloning
    const fresh = btn.cloneNode(true);
    btn.parentNode.replaceChild(fresh, btn);
    fresh.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        const d = JSON.parse(decodeURIComponent(fresh.dataset.card));
        const action = fresh.dataset.action;
        const tryAction = () => {
          if (action === 'add' && typeof window.addToCart === 'function') {
            window.addToCart(d.name, d.price, d.emoji, d.variant, d.image);
          } else if (action === 'buy' && typeof window.buyNow === 'function') {
            window.buyNow(d.name, d.price, d.emoji, d.variant, d.image);
          } else {
            /* addToCart not ready yet — wait for DOMContentLoaded */
            window.addEventListener('DOMContentLoaded', tryAction, { once: true });
          }
        };
        tryAction();
      } catch(err) {
        console.error('Button action error:', err);
      }
    });
  });
}

function zarinehusnSetupShopFilters(products, grid, mainCat) {
  const urlParams = new URLSearchParams(window.location.search);
  let activeMain = mainCat || 'all';
  let activeSub = urlParams.get('cat');
  let activeBrand = urlParams.get('brand');

  if (activeSub === 'catchers') activeSub = 'clips';

  // If initial URL param is actually a main category
  if (activeSub === 'jewelry' || activeSub === 'cosmetics') {
    activeMain = activeSub;
    activeSub = null;
  }
  // Check if initial URL param is actually a subcategory
  if (activeSub) {
    for (const [mc, subs] of Object.entries(CATEGORY_HIERARCHY)) {
      if (subs.includes(activeSub)) {
        activeMain = mc;
        break;
      }
    }
  }

  const collectionsBtns = document.querySelectorAll('#sidebar-collections .sidebar-link');
  const subContainer = document.getElementById('sub-filter-container');
  const subList = document.getElementById('sidebar-sub-collections');
  const sortBtns = document.querySelectorAll('#sidebar-sort .sidebar-link');
  const mobileToggle = document.getElementById('mobile-sidebar-toggle');
  
  // Hide Collections sidebar block if a brand is selected
  const collectionsBlock = document.getElementById('sidebar-collections')?.closest('.sidebar-block');
  if (collectionsBlock) {
    if (activeBrand) {
      collectionsBlock.style.display = 'none';
      subContainer.style.display = 'none';
    } else {
      collectionsBlock.style.display = 'block';
    }
  }
  const sidebar = document.querySelector('.shop-sidebar');

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
    // close on clicking outside
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('active') && !sidebar.contains(e.target) && e.target !== mobileToggle && !mobileToggle.contains(e.target)) {
        sidebar.classList.remove('active');
      }
    });
  }

  function renderSubFilters(mc) {
    if (mc === 'all' || mc === 'deals' || !CATEGORY_HIERARCHY[mc]) {
      if (subContainer) subContainer.style.display = 'none';
      if (subList) subList.innerHTML = '';
      return;
    }
    const subs = CATEGORY_HIERARCHY[mc];
    if (subList) {
      subList.innerHTML = `<li><button class="sidebar-link ${!activeSub ? 'active' : ''}" data-sub-filter="all-${mc}">All ${mc.charAt(0).toUpperCase() + mc.slice(1)}</button></li>` + 
      subs.map(s => {
        const isActive = activeSub === s ? 'active' : '';
        return `<li><button class="sidebar-link ${isActive}" data-sub-filter="${s}">${ZARINEHUSN_CAT_LABELS[s.toLowerCase()] || s}</button></li>`;
      }).join('');
      
      subContainer.style.display = 'block';

      // Bind sub buttons
      subList.querySelectorAll('.sidebar-link').forEach(btn => {
        btn.addEventListener('click', () => {
          subList.querySelectorAll('.sidebar-link').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          activeSub = btn.dataset.subFilter;
          if (activeSub.startsWith('all-')) activeSub = null;
          applyFiltersAndSort();
          if (window.innerWidth <= 991 && sidebar) sidebar.classList.remove('active'); // auto-close on mobile
        });
      });
    }
  }

  let activeSort = 'featured';

  function applyFiltersAndSort() {
    let filtered = products.filter(p => {
      const c = p.category === 'catchers' ? 'clips' : p.category;
      const s = p.subcategory === 'catchers' ? 'clips' : p.subcategory;
      const additional = p.additionalCategories || [];
      
      let show = false;
      if (activeMain === 'all') {
        show = true;
      } else {
        const inMain = CATEGORY_HIERARCHY[activeMain]?.includes(s) || CATEGORY_HIERARCHY[activeMain]?.includes(c) || additional.some(a => CATEGORY_HIERARCHY[activeMain]?.includes(a));
        if (inMain) {
          if (!activeSub) show = true;
          else show = (s === activeSub || c === activeSub || additional.includes(activeSub));
        }
      }
      
      if (show && activeBrand) {
        show = (p.brand && p.brand.toLowerCase() === activeBrand.toLowerCase());
      }
      
      return show;
    });

    if (activeSort === 'price-asc') {
      filtered.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (activeSort === 'price-desc') {
      filtered.sort((a, b) => Number(b.price) - Number(a.price));
    }

    if (filtered.length === 0) {
      grid.innerHTML = zarinehusnEmptyState('No products found in this category.');
    } else {
      grid.innerHTML = filtered.map(zarinehusnProductCardHTML).join('');
      zarinehusnReInitCards(grid);
    }

    // Update Hero Text if function exists
    if (window.updateShopHero) {
      window.updateShopHero(activeSub || activeMain, activeBrand);
    }
    
    // Update URL
    let urlStr = window.location.pathname;
    const newCat = activeSub || activeMain;
    let params = new URLSearchParams();
    
    if (newCat && newCat !== 'all' && newCat !== mainCat) {
      params.set('cat', newCat);
    }
    if (activeBrand) {
      params.set('brand', activeBrand);
    }
    
    const qs = params.toString();
    if (qs) urlStr += '?' + qs;
    
    window.history.replaceState(null, '', urlStr);
  }

  if (collectionsBtns.length > 0) {
    // Bind Main buttons
    collectionsBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetMain = btn.dataset.mainFilter;
        const isJewelryPage = window.location.pathname.includes('jewelry.html');
        const isCosmeticsPage = window.location.pathname.includes('cosmetics.html');

        if (targetMain === 'jewelry' && !isJewelryPage) { window.location.href = 'jewelry.html'; return; }
        if (targetMain === 'cosmetics' && !isCosmeticsPage) { window.location.href = 'cosmetics.html'; return; }
        if (targetMain === 'all' && (isJewelryPage || isCosmeticsPage)) { window.location.href = 'shop.html'; return; }

        collectionsBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeMain = targetMain;
        activeSub = null;
        renderSubFilters(activeMain);
        applyFiltersAndSort();
        if (window.innerWidth <= 991 && sidebar) sidebar.classList.remove('active');
      });
    });

    // Bind Sort buttons
    sortBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sortBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeSort = btn.dataset.sort;
        applyFiltersAndSort();
        if (window.innerWidth <= 991 && sidebar) sidebar.classList.remove('active');
      });
    });

    // Init
    if (activeMain) {
      collectionsBtns.forEach(b => b.classList.remove('active'));
      const b = Array.from(collectionsBtns).find(x => x.dataset.mainFilter === activeMain);
      if (b) b.classList.add('active');
    }
    renderSubFilters(activeMain);
    applyFiltersAndSort();
  } else {
    // Fallback if no sidebar is found (just render all)
    applyFiltersAndSort();
  }
}

async function zarinehusnRenderShopGrid() {
  const grid = document.querySelector('#shop-products-grid, .products-grid');
  if (!grid) return;

  const mainCat = grid.getAttribute('data-main-cat');

  try {
    const data = await apiGet('/products');
    let products = data.products || [];
    
    // STRICTLY FILTER OUT ANYTHING THAT IS NOT JEWELRY OR COSMETICS
    products = products.filter(p => {
      const c = p.category === 'catchers' ? 'clips' : p.category;
      const s = p.subcategory === 'catchers' ? 'clips' : p.subcategory;
      const resolvedCat = s || c;
      return CATEGORY_HIERARCHY['jewelry'].includes(resolvedCat) || CATEGORY_HIERARCHY['cosmetics'].includes(resolvedCat) || (CATEGORY_HIERARCHY['deals'] && CATEGORY_HIERARCHY['deals'].includes(resolvedCat));
    });

    // We do NOT pre-filter products here anymore, so that the sidebar "All Collections" works correctly on any page!
    // The sorting/filtering logic inside zarinehusnSetupShopFilters will handle all filtering!

    if (!products.length) {
      grid.innerHTML = zarinehusnEmptyState('No products available right now. Please check back soon.');
      return;
    }

    zarinehusnSetupShopFilters(products, grid, mainCat);
  } catch (err) {
    console.error('Failed to load products:', err);
    grid.innerHTML = zarinehusnEmptyState('No products available');
  }
}

/* ── Load & render featured and pinned grids (index.html homepage) ── */
async function zarinehusnRenderHomepageGrids() {
  const isHome = document.getElementById('featured-jewelry');
  if (!isHome) return;

  try {
    const data = await apiGet('/products');
    let allProducts = data.products || [];

    // STRICTLY FILTER OUT ANYTHING THAT IS NOT JEWELRY OR COSMETICS
    allProducts = allProducts.filter(p => {
      const c = p.category === 'catchers' ? 'clips' : p.category;
      const s = p.subcategory === 'catchers' ? 'clips' : p.subcategory;
      const resolvedCat = s || c;
      return CATEGORY_HIERARCHY['jewelry'].includes(resolvedCat) || CATEGORY_HIERARCHY['cosmetics'].includes(resolvedCat) || (CATEGORY_HIERARCHY['deals'] && CATEGORY_HIERARCHY['deals'].includes(resolvedCat));
    });

    
    // --- 0. Render Hot Selling Ads ---
    const hotAds = data.products.filter(p => p.hotSelling === true);
    const hotSection = document.getElementById('hot-selling-ads');
    if (hotSection && hotAds.length > 0) {
      hotSection.style.display = 'block';
      hotSection.style.padding = '40px 0';
      
      let slidesHTML = hotAds.map((p, idx) => {
        const productUrl = 'product.html?id=' + (p.id || p.name);
        const media = (p.video) 
          ? `<video src="${p.video}" autoplay loop muted playsinline preload="metadata" poster="${(p.images && p.images[0]) || 'images/placeholder.jpg'}" style="width:100%;height:100%;object-fit:cover;cursor:pointer;" onerror="this.style.display='none'" onclick="window.location.href='${productUrl}'"></video>`
          : `<img src="${(p.images && p.images[0]) || 'images/placeholder.jpg'}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;cursor:pointer;" onerror="this.style.display='none'" onclick="window.location.href='${productUrl}'"/>`;
          
        return `<div class="hot-slide" style="grid-area: 1 / 1; opacity:${idx===0?1:0}; pointer-events:${idx===0?'auto':'none'}; transition: opacity 0.6s ease-in-out; width:100%; max-width:1200px; margin:0 auto;">
          <div style="display:flex; flex-direction:column; background:var(--bg); border-radius:24px; overflow:hidden; box-shadow:0 20px 50px rgba(0,0,0,0.08); border:1px solid rgba(184,136,58,0.2);">
            
            <style>
              @media (min-width: 768px) {
                .hot-selling-split-${idx} { flex-direction: row !important; min-height: 500px; }
                .hot-selling-media-${idx} { flex: 1.2 !important; min-height: 500px; }
                .hot-selling-content-${idx} { flex: 1 !important; padding: 60px !important; justify-content: center !important; text-align: left !important; }
                .hot-selling-btns-${idx} { justify-content: flex-start !important; }
              }
              @keyframes pulseBadge { 0% { box-shadow: 0 0 0 0 rgba(225,48,108,0.4); } 70% { box-shadow: 0 0 0 10px rgba(225,48,108,0); } 100% { box-shadow: 0 0 0 0 rgba(225,48,108,0); } }
            </style>

            <div class="hot-selling-split-${idx}" style="display:flex; flex-direction:column-reverse; width:100%;">
              <!-- Content Side -->
              <div class="hot-selling-content-${idx}" style="flex:1; padding:30px 20px; display:flex; flex-direction:column; justify-content:center; text-align:center; background:linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(250,247,242,1) 100%); position:relative;">
                
                <div style="margin-bottom:20px;">
                  <span style="display:inline-block; background:linear-gradient(45deg, #ff416c, #ff4b2b); color:white; padding:6px 16px; border-radius:30px; font-size:0.75rem; font-weight:800; letter-spacing:2px; text-transform:uppercase; animation: pulseBadge 2s infinite;">🔥 Trending Now</span>
                </div>
                
                <h3 style="font-size:clamp(1.8rem, 5vw, 3rem); line-height:1.2; margin:0 0 15px 0; font-family:var(--font-heading); color:#111; cursor:pointer;" onclick="window.location.href='${productUrl}'">${p.name}</h3>
                <div style="width:60px; height:3px; background:var(--gold); margin: 0 auto 20px auto; border-radius:2px;" class="hot-selling-btns-${idx}"></div>
                <p style="font-size:1.5rem; margin:0 0 30px 0; font-weight:700; color:var(--gold);">PKR ${Number(p.price).toLocaleString()}</p>
                
                <div class="hot-selling-btns-${idx}" style="display:flex; flex-wrap:wrap; gap:12px; justify-content:center; width:100%;">
                  <button onclick="window.buyNow('${p.name.replace(/'/g, "\'")}', ${Number(p.price)}, '${p.emoji||''}', 'Standard', '${(p.images&&p.images[0])||''}')" class="btn-primary" style="flex:1; min-width:200px; padding:16px 24px; font-size:1rem; background:var(--gold); border:1px solid var(--gold); color:#000; font-weight:700; border-radius:12px; transition:transform 0.2s, box-shadow 0.2s; box-shadow:0 8px 20px rgba(184,136,58,0.3);"><i class="fa-solid fa-bolt" style="margin-right:6px"></i> Buy it Now</button>
                  <button onclick="window.addToCart('${p.name.replace(/'/g, "\'")}', ${Number(p.price)}, '${p.emoji||''}', 'Standard', '${(p.images&&p.images[0])||''}')" class="btn-primary" style="flex:1; min-width:200px; padding:16px 24px; font-size:1rem; background:transparent; border:2px solid var(--gold); color:var(--gold); font-weight:700; border-radius:12px; transition:all 0.2s;"><i class="fa-solid fa-cart-plus" style="margin-right:6px"></i> Add to Cart</button>
                </div>
                <button onclick="window.open('https://wa.me/${(window.ZARINEHUSN_CONFIG?.whatsapp?.number || '923150727131').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello, I would like to buy this product: ' + p.name + ' ' + window.location.origin + '/product.html?id=' + (p.id||p.name))}', '_blank')" class="btn-primary" style="margin-top:12px; padding:16px 24px; font-size:1rem; background:#25D366; border:none; color:#fff; width:100%; border-radius:12px; font-weight:700; box-shadow:0 8px 20px rgba(37,211,102,0.3); transition:transform 0.2s;"><i class="fa-brands fa-whatsapp" style="font-size:1.2rem; margin-right:8px"></i> Order on WhatsApp</button>
              
              </div>

              <!-- Media Side -->
              <div class="hot-selling-media-${idx}" style="flex:1; position:relative; aspect-ratio:4/3;">
                ${media}
              </div>
            </div>

          </div>
        </div>`;
      }).join('');
      
      hotSection.innerHTML = `
        <div class="container" style="max-width:1250px; padding:0 20px;">
          <div style="text-align:center; margin-bottom:40px;">
            <h2 style="font-family:var(--font-heading); font-size:2.8rem; margin-bottom:10px; color:#111;">Our Hot Selling Products</h2>
            <p style="color:var(--muted); font-size:1.15rem; max-width:600px; margin:0 auto;">Discover the absolute favorites trending right now. Grab them before they're gone!</p>
          </div>
          <div style="display:grid; width:100%; position:relative;">${slidesHTML}</div>
        </div>
      `;
      
      // Auto-play logic
      if (hotAds.length > 1) {
        let currentSlide = 0;
        const slides = hotSection.querySelectorAll('.hot-slide');
        setInterval(() => {
          
          slides[currentSlide].style.opacity = '0';
          slides[currentSlide].style.pointerEvents = 'none';
          currentSlide = (currentSlide + 1) % slides.length;
          slides[currentSlide].style.opacity = '1';
          slides[currentSlide].style.pointerEvents = 'auto';
        }, 4000);
      }
    }

    // --- 1. Render Pinned Collections ---
    const pinnedRes = await apiGet('/admin/pinned').catch(e => null);
    const pinnedData = pinnedRes && pinnedRes.pinned ? pinnedRes.pinned : [];
    const pinnedContainer = document.getElementById('pinned-collections-wrapper');
    if (pinnedContainer && pinnedData.length > 0) {
      pinnedContainer.innerHTML = '';
      pinnedData.forEach(pin => {
        const pinProducts = allProducts.filter(p => {
          const c = p.category === 'catchers' ? 'clips' : p.category;
          const s = p.subcategory === 'catchers' ? 'clips' : p.subcategory;
          const additional = p.additionalCategories || [];
          return (c === pin.id || s === pin.id || additional.includes(pin.id));
        });
        if (pinProducts.length > 0) {
          const section = document.createElement('section');
          section.className = 'collection-section';
          section.style.padding = '40px 0 0 0';

          const catUrl = (() => {
            if (CATEGORY_HIERARCHY['jewelry'].includes(pin.id)) return `jewelry.html?cat=${pin.id}`;
            if (CATEGORY_HIERARCHY['cosmetics'].includes(pin.id)) return `cosmetics.html?cat=${pin.id}`;
            return `shop.html?cat=${pin.id}`;
          })();

          const rowId = `pinrow-${pin.id}`;
          section.innerHTML = `
            <div class="container">
              <div class="section-header" style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
                <h2 style="font-size:1.6rem;margin:0;">${pin.name}</h2>
                <div style="display:flex; gap: 8px; align-items:center;">
                  <a href="${catUrl}" style="font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;color:var(--gold);text-decoration:none;font-family:var(--font-ui); margin-left: 12px;">View All →</a>
                </div>
              </div>
              <div class="pinned-scroll-track" id="${rowId}" style="display:flex;overflow-x:auto;gap:12px;padding-bottom:20px;scroll-snap-type:x mandatory;cursor:grab;-webkit-overflow-scrolling:touch;scrollbar-width:none;-ms-overflow-style:none;">
                ${pinProducts.map(p => {
                  let html = zarinehusnProductCardHTML(p);
                  return html.replace('class="product-card"', 'class="product-card pin-card" style="flex:0 0 220px;min-width:220px;scroll-snap-align:start;"');
                }).join('')}
              </div>
            </div>
          `;
          pinnedContainer.appendChild(section);
          zarinehusnReInitCards(section);

          /* ── Mouse drag-to-scroll ── */
          const track = section.querySelector(`#${rowId}`);
          if (track) {
            let isDown = false, startX, scrollLeft;
            track.addEventListener('mousedown', e => {
              isDown = true; track.style.cursor = 'grabbing';
              startX = e.pageX - track.offsetLeft;
              scrollLeft = track.scrollLeft;
            });
            track.addEventListener('mouseleave', () => { isDown = false; track.style.cursor = 'grab'; });
            track.addEventListener('mouseup',    () => { isDown = false; track.style.cursor = 'grab'; });
            track.addEventListener('mousemove',  e => {
              if (!isDown) return;
              e.preventDefault();
              const x = e.pageX - track.offsetLeft;
              track.scrollLeft = scrollLeft - (x - startX) * 1.5;
            });
          }
        }
      });
    }

    // --- 2. Render Featured Rows (grouped by Main Category) ---
    const featuredProducts = allProducts.filter(p => p.featured);
    
    // Jewelry
    const jewGrid = document.getElementById('featured-jewelry-grid');
    if (jewGrid) {
      const jProds = featuredProducts.filter(p => CATEGORY_HIERARCHY['jewelry'].includes(p.subcategory || p.category));
      
      if (jProds.length) {
        jewGrid.innerHTML = jProds.map(p => zarinehusnProductCardHTML(p).replace('class="product-card"', 'class="product-card" style="flex: 0 0 280px; scroll-snap-align: start;"')).join('');
        document.getElementById('featured-jewelry').style.display = 'block';
      } else {
        document.getElementById('featured-jewelry').style.display = 'none';
      }
      zarinehusnReInitCards(jewGrid);
    }

    // Cosmetics
    const cosGrid = document.getElementById('featured-cosmetics-grid');
    if (cosGrid) {
      const cProds = featuredProducts.filter(p => {
        const additional = p.additionalCategories || [];
        return CATEGORY_HIERARCHY['cosmetics'].includes(p.subcategory || p.category) || additional.some(a => CATEGORY_HIERARCHY['cosmetics'].includes(a));
      });
      
      if (cProds.length) {
        cosGrid.innerHTML = cProds.map(p => zarinehusnProductCardHTML(p).replace('class="product-card"', 'class="product-card" style="flex: 0 0 280px; scroll-snap-align: start;"')).join('');
        document.getElementById('featured-cosmetics').style.display = 'block';
      } else {
        document.getElementById('featured-cosmetics').style.display = 'none';
      }
      zarinehusnReInitCards(cosGrid);
    }

  } catch (err) {
    console.error('Failed to load homepage products:', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('shop-products-grid') || document.querySelector('.shop-layout')) {
    zarinehusnRenderShopGrid();
  }
  if (document.getElementById('featured-jewelry')) {
    zarinehusnRenderHomepageGrids();
  }
});
