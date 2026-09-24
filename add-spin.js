const fs = require('fs');
const file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\css\\style.css';
let css = fs.readFileSync(file, 'utf8');

if (!css.includes('@keyframes spin')) {
  css += `\n@keyframes spin { 0% { transform: translate(-50%, -50%) rotate(0deg); } 100% { transform: translate(-50%, -50%) rotate(360deg); } }\n`;
  fs.writeFileSync(file, css);
  console.log('Added spin keyframes');
}
