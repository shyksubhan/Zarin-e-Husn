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

  const fallbackEmoji = `<div style="width:100%;height:100%;background:var(--gold-light);display:flex;align-items:center;justify-content:center;font-size:2rem;color:var(--gold);">${emoji}</div>`;
  const mediaHTML = mainImage
    ? `<img src="${mainImage}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;" loading="lazy" onerror="window.zhHandleImageError(this, '${emoji}', 'grid')" />`
    : hasVideo
      ? `<video src="${p.video}#t=0.1" muted preload="metadata" playsinline style="width:100%;height:100%;object-fit:cover;" onerror="window.zhHandleImageError(this, '${emoji}', 'grid')"></video>`
      : fallbackEmoji;

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
  try {
    const data = await apiGet('/products');
    let allProducts = data.products || [];

    // Filter to valid categories only
    allProducts = allProducts.filter(p => {
      const c = p.category === 'catchers' ? 'clips' : p.category;
      const s = p.subcategory === 'catchers' ? 'clips' : p.subcategory;
      const resolvedCat = s || c;
      return CATEGORY_HIERARCHY['jewelry'].includes(resolvedCat) || 
             CATEGORY_HIERARCHY['cosmetics'].includes(resolvedCat) || 
             (CATEGORY_HIERARCHY['deals'] && CATEGORY_HIERARCHY['deals'].includes(resolvedCat)) ||
             (CATEGORY_HIERARCHY['addon-boxes'] && CATEGORY_HIERARCHY['addon-boxes'].includes(resolvedCat));
    });

    // --- 0. Render Hero Videos ---
    const heroGrid = document.getElementById('hero-video-grid');
    if (heroGrid) {
      try {
        const heroData = await apiGet('/admin/hero-videos').catch(() => null);
        const videos = heroData?.videos || [];
        if (videos.length > 0) {
          heroGrid.innerHTML = videos.map(v => {
              // Auto-optimize Cloudinary videos (massive speedup, keeps HD)
              let optimizedUrl = v.url;
              let posterUrl = '';
              if (optimizedUrl && optimizedUrl.includes('res.cloudinary.com')) {
                if (!optimizedUrl.includes('q_auto')) {
                  optimizedUrl = optimizedUrl.replace('/upload/', '/upload/f_auto,q_auto,w_800,vc_auto/');
                }
                // Generate a lightweight poster image from the first frame of the video
                posterUrl = optimizedUrl.replace(/\.(mp4|mov|webm)$/i, '.jpg').replace('/upload/', '/upload/f_auto,q_auto,w_800/');
              }
              
              return `
              <div class="hero-video-card" style="position: relative; background: #f9f9f9; overflow: hidden; min-height: 200px;">
                <!-- Loading Spinner behind video -->
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 30px; height: 30px; border: 3px solid #ddd; border-top-color: var(--gold); border-radius: 50%; animation: spin 1s linear infinite; z-index: 0;"></div>
                
                <video 
                  src="${optimizedUrl}" 
                  poster="${posterUrl}"
                  autoplay loop muted playsinline 
                  preload="auto" 
                  style="position: relative; z-index: 1; width: 100%; height: 100%; object-fit: cover;"
                  onloadeddata="this.style.opacity=1"
                ></video>
              </div>
            `}).join('');
        } else {
          // Fallback: hide if no videos
          heroGrid.innerHTML = '<p class="loading-text">Coming soon...</p>';
        }
      } catch(e) {
        heroGrid.innerHTML = '<p class="loading-text">Coming soon...</p>';
      }
    }

    // --- 1. Render Category Circles ---
    const catContainer = document.getElementById('category-circles');
    if (catContainer) {
      const subcats = [
        // Jewelry
        { id: 'necklace', name: 'Necklaces', img: 'images/categories/necklace.jpg', href: 'jewelry.html?cat=necklace' },
        { id: 'earrings', name: 'Earrings', img: 'images/categories/earrings.jpg', href: 'jewelry.html?cat=earrings' },
        { id: 'rings', name: 'Rings', img: 'images/categories/rings.jpg', href: 'jewelry.html?cat=rings' },
        { id: 'bracelets', name: 'Bracelets', img: 'images/categories/bracelets.jpg', href: 'jewelry.html?cat=bracelets' },
        { id: 'bangles', name: 'Bangles', img: 'images/categories/bangles.jpg', href: 'jewelry.html?cat=bangles' },
        { id: 'jewelry-sets', name: 'Jewelry Sets', img: 'images/categories/sets.jpg', href: 'jewelry.html?cat=jewelry-sets' },
        // Cosmetics
        { id: 'face-cosmetics', name: 'Face Makeup', img: 'images/categories/face.jpg', href: 'cosmetics.html?cat=face-cosmetics' },
        { id: 'eye-makeup', name: 'Eye Makeup', img: 'images/categories/eyes.jpg', href: 'cosmetics.html?cat=eye-makeup' },
        { id: 'lip-makeup', name: 'Lip Makeup', img: 'images/categories/lips.jpg', href: 'cosmetics.html?cat=lip-makeup' },
        { id: 'skin-care', name: 'Skin Care', img: 'images/categories/skincare.jpg', href: 'cosmetics.html?cat=skin-care' },
        { id: 'nail-cosmetics', name: 'False Nails', img: 'images/categories/nails.jpg', href: 'cosmetics.html?cat=nail-cosmetics' },
        // Deals
        { id: 'deals', name: 'Deals', img: 'images/categories/deals.jpg', href: 'shop.html?cat=deals' },
        // Shop All
        { id: 'all', name: 'Shop All', img: '', href: 'shop.html', isShopAll: true },
      ];

      catContainer.innerHTML = subcats.map(c => {
        if (c.isShopAll) {
          return `<a href="${c.href}" class="cat-circle">
            <div class="cat-circle-img" style="display:flex;align-items:center;justify-content:center;background:#f5f5f5;">
              <i class="fa-solid fa-arrow-right" style="font-size:1.5rem;color:#999;"></i>
            </div>
            <p>${c.name}</p>
          </a>`;
        }
        return `<a href="${c.href}" class="cat-circle">
          <div class="cat-circle-img"><img src="${c.img}" alt="${c.name}" loading="lazy"/></div>
          <p>${c.name}</p>
        </a>`;
      }).join('');
    }

    // --- 2. Render New Arrivals ---
    const newArrivalsGrid = document.getElementById('new-arrivals-grid');
    if (newArrivalsGrid) {
      const newProducts = allProducts.filter(p => p.newArrival === true || p.badge === 'New');
      if (newProducts.length > 0) {
        const limited = newProducts.slice(0, 24);
        newArrivalsGrid.innerHTML = limited.map(p => zarinehusnProductCardHTML(p)).join('');
        zarinehusnReInitCards(newArrivalsGrid);
        document.getElementById('new-arrivals').style.display = 'block';
      } else {
        document.getElementById('new-arrivals').style.display = 'none';
      }
    }

    // --- 3. Render Trending Now ---
    const trendingGrid = document.getElementById('trending-now-grid');
    if (trendingGrid) {
      const trendingProducts = allProducts.filter(p => p.trending === true || p.hotSelling === true);
      if (trendingProducts.length > 0) {
        const limited = trendingProducts.slice(0, 24);
        trendingGrid.innerHTML = limited.map(p => zarinehusnProductCardHTML(p)).join('');
        zarinehusnReInitCards(trendingGrid);
        document.getElementById('trending-now').style.display = 'block';
      } else {
        document.getElementById('trending-now').style.display = 'none';
      }
    }

    // --- 4. Render Pinned Collections ---
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
          section.className = 'collection-section product-section';
          const catUrl = (() => {
            if (CATEGORY_HIERARCHY['jewelry'].includes(pin.id)) return `jewelry.html?cat=${pin.id}`;
            if (CATEGORY_HIERARCHY['cosmetics'].includes(pin.id)) return `cosmetics.html?cat=${pin.id}`;
            return `shop.html?cat=${pin.id}`;
          })();
          const rowId = `pinrow-${pin.id}`;
          section.innerHTML = `
            <div class="container">
              <div class="section-header-row">
                <h2>${pin.name}</h2>
                <a href="${catUrl}" class="see-all-link">View All →</a>
              </div>
              <div class="product-grid-4" id="${rowId}">
                ${pinProducts.map(p => zarinehusnProductCardHTML(p)).join('')}
              </div>
            </div>
          `;
          pinnedContainer.appendChild(section);
          zarinehusnReInitCards(section);
        }
      });
    }

    // --- 5. Render Featured Spotlight ---
      const spotlightRes = await apiGet('/admin/spotlight').catch(e => null);
      const spotlightIds = spotlightRes && spotlightRes.spotlight ? spotlightRes.spotlight : [];
      
      const spotlightSection = document.getElementById('featured-spotlight');
      
      if (spotlightSection && spotlightIds.length > 0) {
        const spotlightProducts = spotlightIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
        
        if (spotlightProducts.length > 0) {
          spotlightSection.className = 'collection-section product-section';
          spotlightSection.innerHTML = `
            <div class="container">
              <div class="section-header-row" style="justify-content:center; text-align:center;">
                <h2 style="font-family: 'Amiri', 'Playfair Display', serif; font-size: 2.5rem; text-align: center; border-bottom: 2px solid var(--gold); padding-bottom: 5px; display: inline-block;">Spotlight</h2>
              </div>
              <div class="product-grid-4">
                ${spotlightProducts.map(p => zarinehusnCreateProductCard(p)).join('')}
              </div>
            </div>
          `;
          zarinehusnReInitCards(spotlightSection);
          spotlightSection.style.display = 'block';
        } else {
          spotlightSection.style.display = 'none';
        }
      } else if (spotlightSection) {
        spotlightSection.style.display = 'none';
      }
      
      // --- 6. Render Reviews Highlights ---
    const reviewsContainer = document.getElementById('reviews-highlights');
    if (reviewsContainer) {
      try {
        const revData = await apiGet('/admin/review-images').catch(() => null);
        const reviewImages = revData?.images || [];
        if (reviewImages.length > 0) {
          reviewsContainer.innerHTML = reviewImages.map((img, i) => `
            <div class="review-highlight" onclick="openReviewLightbox('${img.url}')">
              <div class="review-highlight-img"><img src="${img.url}" alt="Review ${i+1}" loading="lazy"/></div>
              <p>${img.label || 'Review'}</p>
            </div>
          `).join('');
        } else {
          // Fallback: try text reviews
          const textRevs = await apiGetReviews().catch(() => ({reviews:[]}) );
          const reviews = textRevs.reviews || [];
          if (reviews.length > 0) {
            reviewsContainer.innerHTML = reviews.map((r, i) => `
              <div class="review-highlight" style="width:200px;flex:0 0 200px;padding:16px;background:#faf8f5;border-radius:12px;text-align:left;">
                <div class="t-stars" style="color:var(--gold);margin-bottom:8px;">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</div>
                <p style="font-size:0.85rem;color:#333;line-height:1.5;margin:0 0 8px;">&ldquo;${r.text}&rdquo;</p>
                <p style="font-size:0.75rem;font-weight:600;color:#111;margin:0;">${r.customerName}</p>
              </div>
            `).join('');
          } else {
            document.getElementById('reviews-section').style.display = 'none';
          }
        }
      } catch(e) {
        document.getElementById('reviews-section')?.style && (document.getElementById('reviews-section').style.display = 'none');
      }
    }

  } catch (err) {
    console.error('Failed to load homepage products:', err);
  }
}

/* Review lightbox */
function openReviewLightbox(url) {
  let lb = document.querySelector('.review-lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.className = 'review-lightbox';
    lb.innerHTML = `<button class="review-lightbox-close">&times;</button><img src="" />`;
    lb.addEventListener('click', (e) => { if (e.target === lb || e.target.classList.contains('review-lightbox-close')) lb.classList.remove('active'); });
    document.body.appendChild(lb);
  }
  lb.querySelector('img').src = url;
  lb.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('shop-products-grid') || document.querySelector('.shop-layout')) {
    zarinehusnRenderShopGrid();
  }
  if (document.getElementById('hero-video-grid') || document.getElementById('new-arrivals-grid')) {
    zarinehusnRenderHomepageGrids();
  }
});
