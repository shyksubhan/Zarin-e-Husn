const fs = require('fs');
const glob = require('glob');

const files = glob.sync('c:/Users/Muhammad Subhan/Desktop/Me/Zarin-e-Husn/*.html');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Replace various forms of footer logo with the Urdu text
  content = content.replace(
    /<a href="(\/|index\.html)"[^>]*>\s*<img src="images\/logo(-light)?\.png"[^>]*>\s*<\/a>/gi,
    `<a href="/" style="text-decoration: none; color: inherit; font-family: 'Cairo', sans-serif; font-size: 2.2rem; font-weight: 900; line-height: 1; display: inline-block; white-space: nowrap; letter-spacing: 2px;">&#1586;&#1614;&#1585;&#1616;&#1740;&#1606; &#1581;&#1587;&#1606;</a>`
  );
  
  content = content.replace(
    /<a href="(\/|index\.html)"[^>]*class="logo"[^>]*>\s*<img src="images\/logo(-light)?\.png"[^>]*>\s*<\/a>/gi,
    `<a href="/" style="text-decoration: none; color: inherit; font-family: 'Cairo', sans-serif; font-size: 2.2rem; font-weight: 900; line-height: 1; display: inline-block; white-space: nowrap; letter-spacing: 2px;">&#1586;&#1614;&#1585;&#1616;&#1740;&#1606; &#1581;&#1587;&#1606;</a>`
  );

  // Also catch the specific one found in index.html
  content = content.replace(
    /<a href="\/" class="nav-logo nav-logo-link" style="display:inline-flex;align-items:center;text-decoration:none;"><img src="images\/logo.png" alt="Zarin-e-Husn" class="nav-logo-img" \/><\/a>/gi,
    `<a href="/" style="text-decoration: none; color: inherit; font-family: 'Cairo', sans-serif; font-size: 2.2rem; font-weight: 900; line-height: 1; display: inline-block; white-space: nowrap; letter-spacing: 2px;">&#1586;&#1614;&#1585;&#1616;&#1740;&#1606; &#1581;&#1587;&#1606;</a>`
  );

  // Add About Us link to the footer if not exists
  if (!content.includes('about.html') && !content.includes('>About Us<')) {
    // Look for Contact Us to insert before or after
    content = content.replace(
      /<li><a href="contact(\.html)?">Contact Us<\/a><\/li>/gi,
      `<li><a href="about.html">About Us</a></li>\n              <li><a href="contact$1">Contact Us</a></li>`
    );
  }

  fs.writeFileSync(file, content);
});

console.log('Fixed footer logo and added About Us in all HTML files');
