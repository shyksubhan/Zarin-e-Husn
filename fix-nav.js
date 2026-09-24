const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn';
const files = ['index.html', 'about.html', 'shop.html', 'contact.html', 'jewelry.html', 'cosmetics.html', 'product.html', 'policy.html'];

files.forEach(file => {
  const filepath = path.join(dir, file);
  if (fs.existsSync(filepath)) {
    let content = fs.readFileSync(filepath, 'utf8');
    
    // 1. Move search button from flex:1 (left) to nav-icons (right)
    const searchBtn = `<button id="search-toggle" aria-label="Search" style="background: none; border: none; font-size: 1.2rem; cursor: pointer; color: #333;">
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>`;
        
    // First remove it from the left
    content = content.replace(/<div style="flex: 1;">[\s\n]*<button id="search-toggle"[\s\S]*?<\/button>[\s\n]*<\/div>/m, '<div style="flex: 1;"></div>');
    
    // Then add it to the right before account
    content = content.replace(/<div class="nav-icons"([^>]*?)>[\s\n]*<a href="account"/, `<div class="nav-icons"$1>\n        ${searchBtn}\n        <a href="account"`);
    
    // 2. Increase logo size
    content = content.replace(/height: 60px; width: auto;/g, 'height: 95px; width: auto;');
    
    // 3. Make icons larger in nav-icons
    content = content.replace(/font-size: 1\.2rem;/g, 'font-size: 1.45rem;');
    
    fs.writeFileSync(filepath, content);
  }
});
console.log('Navbar updated on all pages!');
