const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn';
const files = ['index.html', 'about.html', 'shop.html', 'contact.html', 'jewelry.html', 'cosmetics.html', 'product.html', 'policy.html'];

files.forEach(file => {
  const filepath = path.join(dir, file);
  if (fs.existsSync(filepath)) {
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Add Noto Nastaliq Urdu to head
    if (!content.includes('family=Noto+Nastaliq+Urdu')) {
      content = content.replace(
        /<link href="https:\/\/fonts.googleapis.com\/css2\?family=Amiri.*?>/,
        `$&
  <link href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap" rel="stylesheet">`
      );
    }
    
    // Update Logo tag
    // Remove pesh, change color to #c4996c, change font-family to Noto Nastaliq Urdu
    content = content.replace(
      /<a href="\/" style="text-decoration: none; color: #111; font-family: 'Amiri', serif; font-size: 3\.5rem; font-weight: 700; line-height: 1; display: inline-block; white-space: nowrap;">\s*&#1586;&#1585;&#1740;&#1606; &#1581;&#1615;&#1587;&#1606;\s*<\/a>/,
      `<a href="/" style="text-decoration: none; color: #c4996c; font-family: 'Noto Nastaliq Urdu', 'Amiri', serif; font-size: 3.5rem; font-weight: 700; line-height: 1; display: inline-block; white-space: nowrap; margin-top: -15px;">
          &#1586;&#1585;&#1740;&#1606; &#1581;&#1587;&#1606;
        </a>`
    );

    // Also update any other files where the spacing/indentation might be slightly different
    content = content.replace(/&#1581;&#1615;&#1587;&#1606;/g, '&#1581;&#1587;&#1606;');
    content = content.replace(/color: #111; font-family: 'Amiri', serif;/g, "color: #c4996c; font-family: 'Noto Nastaliq Urdu', 'Amiri', serif; margin-top: -15px;");
    
    fs.writeFileSync(filepath, content);
  }
});
console.log('Fixed Logo details');
