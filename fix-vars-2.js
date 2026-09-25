const fs = require('fs');
let file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\backend\\utils\\email.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /\$\{i\.name\}\s*([^\$]*)\s*\$\{i\.qty\}/g,
  "${i.name} ${i.variant && i.variant !== 'Standard' ? `(${i.variant}) ` : ''} $1 ${i.qty}"
);
fs.writeFileSync(file, content);

let file2 = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\backend\\admin\\index.html';
let content2 = fs.readFileSync(file2, 'utf8');
content2 = content2.replace(
  /\$\{esc\(i\.name\)\}\s*([^\$]*)\s*\$\{i\.qty\}/g,
  "${esc(i.name)} ${i.variant && i.variant !== 'Standard' ? `<span style=\\\"color:var(--gold);font-size:0.75rem;margin-left:4px;\\\">(${i.variant})</span>` : ''} $1 ${i.qty}"
);
content2 = content2.replace(
  /Items:\s*\(o\.items\|\|\[\]\)\.map\(i => `\$\{i\.name\}(.*?)x\$\{i\.qty\}`\)\.join\((.*?)\)/g,
  "Items: (o.items||[]).map(i => `${i.name} ${i.variant && i.variant !== 'Standard' ? `(${i.variant}) ` : ''}$1x${i.qty}`).join($2)"
);
content2 = content2.replace(
  /Items:\s*\(a\.items\|\|\[\]\)\.map\(i => `\$\{i\.name\}(.*?)x\$\{i\.qty\}`\)\.join\((.*?)\)/g,
  "Items: (a.items||[]).map(i => `${i.name} ${i.variant && i.variant !== 'Standard' ? `(${i.variant}) ` : ''}$1x${i.qty}`).join($2)"
);
fs.writeFileSync(file2, content2);
console.log('done 2');
