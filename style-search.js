const fs = require('fs');
const file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\js\\search.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /<div class="search-section-title">Products<\/div>/g, 
  `<div class="search-section-title" style="padding: 8px 12px; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; color: #888; font-weight: 700; background: #faf8f5; border-bottom: 1px solid #eee;">Products</div>`
);

content = content.replace(
  /<div class="search-section-title" style="margin-top:15px;">Pages & Categories<\/div>/g, 
  `<div class="search-section-title" style="padding: 8px 12px; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 2px; color: #888; font-weight: 700; background: #faf8f5; border-bottom: 1px solid #eee; border-top: 1px solid #eee; margin-top: 10px;">Pages & Categories</div>`
);

fs.writeFileSync(file, content);
console.log('Added styles to search sections');
