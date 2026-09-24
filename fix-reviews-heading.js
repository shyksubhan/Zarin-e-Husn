const fs = require('fs');
const file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\index.html';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /<h2 class="section-title-simple" style="font-family: 'Playfair Display', serif; font-size: 2.5rem; text-align: left; padding-left: 20px;">Our Happy <span style="border-bottom: 2px solid #c4996c;">Customers<\/span><\/h2>/g,
  `<h2 class="section-title-simple" style="font-family: 'Playfair Display', serif; font-size: 2.5rem; text-align: center; margin-bottom: 40px;">Our Happy <span style="color: #c4996c; font-style: italic;">Customers</span></h2>`
);

fs.writeFileSync(file, content);
console.log('Fixed reviews heading');
