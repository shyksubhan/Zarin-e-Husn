const fs = require('fs');
const path = require('path');

const cssPath = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\css\\style.css';
let css = fs.readFileSync(cssPath, 'utf8');

css = css.replace(/\.cat-circle \{.*?\}/, '.cat-circle { text-decoration: none; text-align: center; flex: 0 0 auto; width: 150px; transition: transform 0.3s; }');
css = css.replace(/\.cat-circle-img \{.*?\}/, '.cat-circle-img { width: 140px; height: 140px; border-radius: 50%; overflow: hidden; margin: 0 auto 15px; border: 3px solid #f0ebe3; box-shadow: 0 4px 15px rgba(0,0,0,0.08); }');

// Also fix mobile sizing which is right after
css = css.replace(/\.cat-circle \{ width: 90px; \}/, '.cat-circle { width: 110px; }');
css = css.replace(/\.cat-circle-img \{ width: 80px; height: 80px; \}/, '.cat-circle-img { width: 100px; height: 100px; margin: 0 auto 10px; }');

// Instagram button fix - make it elegant, remove the gradient
css = css.replace(/background: linear-gradient.*?color: #fff;/, 'background: #111; color: #fff;');
// I will also fix it in index.html directly later.

fs.writeFileSync(cssPath, css);
console.log('CSS Fixed');
