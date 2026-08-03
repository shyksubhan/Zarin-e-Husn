const fs = require('fs');
let html = fs.readFileSync('backend/admin/index.html', 'utf8');

html = html.replace(/family=Cormorant\+Garamond.*?&family=Jost.*?&display=swap/g, 'family=Playfair+Display:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Lato:wght@300;400;700&display=swap');
html = html.replace(/:root \{/, ':root {\n  --font-display: "Playfair Display", serif;\n  --font-body: "Lato", sans-serif;');
html = html.replace(/body\{background:var\(--bg\);color:var\(--text\);font-family:'Lato','Segoe UI',sans-serif;/, 'body{background:var(--bg);color:var(--text);font-family:var(--font-body);');
html = html.replace(/\*\{margin:0;padding:0;box-sizing:border-box;\}/, '* { margin: 0; padding: 0; box-sizing: border-box; }\nh1, h2, h3, h4, h5, h6 { font-family: var(--font-display); font-weight: 600; }');
html = html.replace(/mix-blend-mode:multiply;/g, 'filter:brightness(0);');

fs.writeFileSync('backend/admin/index.html', html);
console.log('Fixed fonts and logo styling');
