const fs = require('fs');
const file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\index.html';
let content = fs.readFileSync(file, 'utf8');

// Replace the instagram gradient button with a luxury black button
content = content.replace(/background: linear-gradient\(.*?\);/, 'background: #111;');
content = content.replace(/border-radius: 25px;/, 'border-radius: 4px; letter-spacing: 1px;');

fs.writeFileSync(file, content);
console.log('Instagram HTML Fixed');
