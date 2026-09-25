const fs = require('fs');

let adminFile = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\backend\\admin\\index.html';
let content = fs.readFileSync(adminFile, 'utf8');

// The Orders web UI (has dY>?,? which is 📦 or something)
content = content.replace(
  /<span>(.[^\$]*?)\s*\$\{esc\(i\.name\)\}\s*\((.*?)\$\{i\.qty\}\)<\/span>/g,
  "<span>$1 ${esc(i.name)} ${i.variant && i.variant !== 'Standard' ? `<span style=\\\"color:var(--gold);font-size:0.75rem;margin-left:4px;\\\">(${i.variant})</span>` : ''} (x${i.qty})</span>"
);

content = content.replace(
  /<span>\$\{i\.emoji\|\|'.*?'\} \$\{i\.name\}\s*\((.*?)\$\{i\.qty\}\)<\/span>/g,
  "<span>${i.emoji||'📦'} ${i.name} ${i.variant && i.variant !== 'Standard' ? `<span style=\\\"color:var(--gold);font-size:0.75rem;margin-left:4px;\\\">(${i.variant})</span>` : ''} (x${i.qty})</span>"
);

// The Orders Excel Export
content = content.replace(
  /Items:\s*\(o\.items\|\|\[\]\)\.map\(i => `\$\{i\.name\}(.*?)\$\{i\.qty\}`\)\.join\((.*?)\)/g,
  "Items: (o.items||[]).map(i => `${i.name} ${i.variant && i.variant !== 'Standard' ? `(${i.variant}) ` : ''}x${i.qty}`).join($2)"
);

// The Abandoned Checkout Excel Export
content = content.replace(
  /Items:\s*\(a\.items\|\|\[\]\)\.map\(i => `\$\{i\.name\}(.*?)\$\{i\.qty\}`\)\.join\((.*?)\)/g,
  "Items: (a.items||[]).map(i => `${i.name} ${i.variant && i.variant !== 'Standard' ? `(${i.variant}) ` : ''}x${i.qty}`).join($2)"
);

fs.writeFileSync(adminFile, content);
console.log('Fixed using loose regexes');
