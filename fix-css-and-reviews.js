const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn';

// 1. Fix CSS
const cssPath = path.join(dir, 'css', 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

// Category circles left-alignment fix
css = css.replace(/\.category-circles-scroll \{[\s\S]*?\}/, `.category-circles-scroll {
  display: flex !important;
  flex-wrap: nowrap !important;
  overflow-x: auto !important;
  gap: 30px !important;
  padding: 20px 10px 30px !important;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  justify-content: flex-start !important;
}`);

// Review story border fix
css += `\n
/* Review Highlight Enhancements */
.review-highlight-img {
  width: 90px !important;
  height: 90px !important;
  border-radius: 50% !important;
  border: 3px solid transparent !important;
  background: linear-gradient(white, white) padding-box,
              linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888) border-box !important;
  padding: 3px !important;
  margin: 0 auto 10px !important;
}
.review-highlight-img img {
  border-radius: 50% !important;
}
`;
fs.writeFileSync(cssPath, css);


// 2. Fix index.html reviews title
const htmlPath = path.join(dir, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

html = html.replace(/<h2 class="section-title-simple">Our Happy Customers<\/h2>/, `<h2 class="section-title-simple" style="font-family: 'Playfair Display', serif; font-size: 2.5rem; text-align: left; padding-left: 20px;">Our Happy <span style="border-bottom: 2px solid #c4996c;">Customers</span></h2>`);

fs.writeFileSync(htmlPath, html);

console.log('CSS and HTML fixes applied.');
