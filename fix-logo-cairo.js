const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn';
const files = ['index.html', 'about.html', 'shop.html', 'contact.html', 'jewelry.html', 'cosmetics.html', 'product.html', 'policy.html'];

const newText = '&#1586;&#1614;&#1585;&#1616;&#1740;&#1606; &#1581;&#1587;&#1606;';

files.forEach(file => {
  const filepath = path.join(dir, file);
  if (fs.existsSync(filepath)) {
    let content = fs.readFileSync(filepath, 'utf8');
    
    // Replace the Noto Nastaliq font link if it exists
    if (content.includes('family=Noto+Nastaliq+Urdu')) {
      content = content.replace(
        /<link href="https:\/\/fonts.googleapis.com\/css2\?family=Noto\+Nastaliq\+Urdu.*?rel="stylesheet">/,
        `<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700;900&display=swap" rel="stylesheet">`
      );
    } else if (!content.includes('family=Cairo')) {
      // Append if it doesn't exist
      content = content.replace(
        /<\/head>/,
        `  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700;900&display=swap" rel="stylesheet">\n</head>`
      );
    }
    
    // Update Logo tag
    // We are replacing the whole <a> tag to be safe
    const targetAnchorRegex = /<a href="\/" style="text-decoration: none; color:.*?>\s*.*?\s*<\/a>/s;
    const replacementAnchor = `<a href="/" style="text-decoration: none; color: #111; font-family: 'Cairo', sans-serif; font-size: 3.2rem; font-weight: 900; line-height: 1; display: inline-block; white-space: nowrap; letter-spacing: 2px;">
          ${newText}
        </a>`;
    
    content = content.replace(targetAnchorRegex, replacementAnchor);
    
    fs.writeFileSync(filepath, content);
  }
});
console.log('Fixed Logo to Cairo Kufi geometric style');
