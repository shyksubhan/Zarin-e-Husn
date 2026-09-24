const fs = require('fs');
const file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\backend\\admin\\index.html';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('family=Cairo')) {
  content = content.replace('</head>', '  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@700;900&display=swap" rel="stylesheet">\n</head>');
}

// Ensure we find the exact sidebar-logo section to replace
const newLogo = `<div class="sidebar-logo">
      <a href="/" target="_blank" style="text-decoration: none; color: #111; font-family: 'Cairo', sans-serif; font-size: 2.5rem; font-weight: 900; line-height: 1; display: inline-block; white-space: nowrap; letter-spacing: 2px;">
        &#1586;&#1614;&#1585;&#1616;&#1740;&#1606; &#1581;&#1587;&#1606;
      </a>
      <small style="margin-top: 5px;">Admin Panel</small>
    </div>`;

// Replace the block
content = content.replace(/<div class="sidebar-logo">\s*<img src="\.\.\/\.\.\/images\/logo-light\.png".*?>\s*<small>Admin Panel<\/small>\s*<\/div>/, newLogo);

fs.writeFileSync(file, content);
console.log('Fixed admin logo');
