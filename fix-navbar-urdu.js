const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn';
const files = ['index.html', 'about.html', 'shop.html', 'contact.html', 'jewelry.html', 'cosmetics.html', 'product.html', 'policy.html'];

const newNav = `<nav style="background: #fff; padding: 15px 0;">
    <div class="container" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
      
      <!-- LEFT: Search & Mobile Menu -->
      <div class="nav-left" style="flex: 1; display: flex; justify-content: flex-start; align-items: center; gap: 15px;">
        <button id="search-toggle" aria-label="Search" style="background: none; border: none; font-size: 1.4rem; cursor: pointer; color: #111;">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
        <button class="hamburger" aria-label="Menu" style="background: none; border: none; cursor: pointer; display: none;">
          <span style="background: #111;"></span><span style="background: #111;"></span><span style="background: #111;"></span>
        </button>
      </div>

      <!-- CENTER: Urdu Text Logo -->
      <div class="nav-center" style="flex: 2; text-align: center;">
        <a href="/" style="text-decoration: none; color: #111; font-family: 'Amiri', 'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif; font-size: 3rem; font-weight: 700; display: inline-block;">
          زرین حُسن
        </a>
      </div>

      <!-- RIGHT: User & Cart -->
      <div class="nav-right" style="flex: 1; display: flex; justify-content: flex-end; align-items: center; gap: 20px;">
        <a href="account" aria-label="Account" style="color: #111; font-size: 1.4rem;"><i class="fa-regular fa-user"></i></a>
        <button data-open-cart aria-label="Bag" style="background: none; border: none; font-size: 1.4rem; cursor: pointer; color: #111; position: relative;">
          <i class="fa-solid fa-bag-shopping"></i>
          <span class="cart-count" style="display:none">0</span>
        </button>
      </div>
    </div>
    
    <!-- BOTTOM LINKS -->
    <ul class="nav-links" style="display: flex; justify-content: center; gap: 30px; list-style: none; margin: 0; padding: 0; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 2px;">
      <li><a href="jewelry.html" style="text-decoration: none; color: #111; font-weight: 600;">JEWELRY</a></li>
      <li style="color: #ddd; user-select: none;">·</li>
      <li><a href="cosmetics.html" style="text-decoration: none; color: #111; font-weight: 600;">COSMETICS</a></li>
      <li style="color: #ddd; user-select: none;">·</li>
      <li><a href="shop.html?cat=deals" style="text-decoration: none; color: #111; font-weight: 600;">DEALS</a></li>
    </ul>
  </nav>`;

files.forEach(file => {
  const filepath = path.join(dir, file);
  if (fs.existsSync(filepath)) {
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Replace existing nav
    content = content.replace(/<nav style="background: #fff; padding: 10px 0;">[\s\S]*?<\/nav>/, newNav);
    
    fs.writeFileSync(filepath, content);
  }
});
console.log('Navbar redesigned with Urdu text logo');
