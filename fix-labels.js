const fs = require('fs');
const path = require('path');
const file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\js\\products-render.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/name: 'Sets'/g, "name: 'Jewelry Sets'");
content = content.replace(/name: 'Face'/g, "name: 'Face Makeup'");
content = content.replace(/name: 'Eyes'/g, "name: 'Eye Makeup'");
content = content.replace(/name: 'Lips'/g, "name: 'Lip Makeup'");
content = content.replace(/name: 'Nails'/g, "name: 'False Nails'");

fs.writeFileSync(file, content);
console.log('Fixed labels');
