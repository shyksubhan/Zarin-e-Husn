const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn';
const files = ['index.html', 'about.html', 'shop.html', 'contact.html', 'jewelry.html', 'cosmetics.html', 'product.html', 'policy.html'];

const newNav = `<nav style="background: #fff; padding: 25px 0 15px 0;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; padding: 0 40px; width: 100%; box-sizing: border-box;">
      
      <!-- LEFT: Search -->
      <div class="nav-left" style="width: 33.33%; display: flex; justify-content: flex-start; align-items: center;">
        <button id="search-toggle" aria-label="Search" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #111; padding: 0;">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
        <button class="hamburger" aria-label="Menu" style="background: none; border: none; cursor: pointer; display: none;">
          <span style="background: #111;"></span><span style="background: #111;"></span><span style="background: #111;"></span>
        </button>
      </div>

      <!-- CENTER: Urdu Text Logo -->
      <div class="nav-center" style="width: 33.33%; text-align: center;">
        <a href="/" style="text-decoration: none; color: #111; font-family: 'Cairo', sans-serif; font-size: 3.2rem; font-weight: 900; line-height: 1; display: inline-block; white-space: nowrap; letter-spacing: 2px;">
          &#1586;&#1614;&#1585;&#1616;&#1740;&#1606; &#1581;&#1587;&#1606;
        </a>
      </div>

      <!-- RIGHT: User & Cart -->
      <div class="nav-right" style="width: 33.33%; display: flex; justify-content: flex-end; align-items: center; gap: 25px;">
        <a href="account" aria-label="Account" style="color: #111; font-size: 1.5rem;"><i class="fa-regular fa-user"></i></a>
        <button data-open-cart aria-label="Bag" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #111; position: relative; padding: 0;">
          <i class="fa-solid fa-bag-shopping"></i>
          <span class="cart-count" style="display:none">0</span>
        </button>
      </div>
    </div>
    
    <!-- BOTTOM LINKS -->
    <ul class="nav-links" style="display: flex; justify-content: center; gap: 40px; list-style: none; margin: 0; padding: 0; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 2px;">
      <li><a href="jewelry.html" style="text-decoration: none; color: #111; font-weight: 600;">JEWELRY</a></li>
      <li style="color: #ddd; user-select: none;">&#183;</li>
      <li><a href="cosmetics.html" style="text-decoration: none; color: #111; font-weight: 600;">COSMETICS</a></li>
      <li style="color: #ddd; user-select: none;">&#183;</li>
      <li><a href="shop.html?cat=deals" style="text-decoration: none; color: #111; font-weight: 600;">DEALS</a></li>
    </ul>
  </nav>`;

files.forEach(file => {
  const filepath = path.join(dir, file);
  if (fs.existsSync(filepath)) {
    let content = fs.readFileSync(filepath, 'utf8');
    
    if (!content.includes('family=Cairo')) {
      content = content.replace('</head>', '  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700;900&display=swap" rel="stylesheet">\n</head>');
    }
    
    content = content.replace(/<nav style=[^>]*>[\s\S]*?<\/nav>/, newNav);
    
    fs.writeFileSync(filepath, content);
  }
});
console.log('Updated frontend navbars');
