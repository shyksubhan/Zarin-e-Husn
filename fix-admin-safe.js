const fs = require('fs');

let adminFile = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\backend\\admin\\index.html';
let adminContent = fs.readFileSync(adminFile, 'utf8');

// The line for rendering orders on the web UI
adminContent = adminContent.replace(
  /<span>dY>\?,\? \$\{esc\(i\.name\)\} \(A-\$\{i\.qty\}\)<\/span>/g,
  "<span>📦 ${esc(i.name)} ${i.variant && i.variant !== 'Standard' ? `<span style=\\\"color:var(--gold);font-size:0.75rem;margin-left:4px;\\\">(${i.variant})</span>` : ''} (x${i.qty})</span>"
);

// Fallback if it was already somewhat replaced or had different emoji
adminContent = adminContent.replace(
  /<span>(.*?)\s*\$\{esc\(i\.name\)\}\s*\(A-\$\{i\.qty\}\)<\/span>/g,
  "<span>$1 ${esc(i.name)} ${i.variant && i.variant !== 'Standard' ? `<span style=\\\"color:var(--gold);font-size:0.75rem;margin-left:4px;\\\">(${i.variant})</span>` : ''} (x${i.qty})</span>"
);

// Second place (dashboard recent orders)
adminContent = adminContent.replace(
  /<span>\$\{i\.emoji\|\|'.*?'\} \$\{i\.name\}\s*\(A-\$\{i\.qty\}\)<\/span>/g,
  "<span>${i.emoji||'📦'} ${i.name} ${i.variant && i.variant !== 'Standard' ? `<span style=\\\"color:var(--gold);font-size:0.75rem;margin-left:4px;\\\">(${i.variant})</span>` : ''} (x${i.qty})</span>"
);


// The Excel export for Orders
adminContent = adminContent.replace(
  /Items:\s*\(o\.items\|\|\[\]\)\.map\(i => `\$\{i\.name\}A-\$\{i\.qty\}`\)\.join\((.*?)\)/g,
  "Items: (o.items||[]).map(i => `${i.name} ${i.variant && i.variant !== 'Standard' ? `(${i.variant}) ` : ''}x${i.qty}`).join($1)"
);

// The Excel export for Abandoned Checkouts
adminContent = adminContent.replace(
  /Items:\s*\(a\.items\|\|\[\]\)\.map\(i => `\$\{i\.name\} x\$\{i\.qty\}`\)\.join\((.*?)\)/g,
  "Items: (a.items||[]).map(i => `${i.name} ${i.variant && i.variant !== 'Standard' ? `(${i.variant}) ` : ''}x${i.qty}`).join($1)"
);

fs.writeFileSync(adminFile, adminContent);
console.log('Fixed admin variants correctly this time');
