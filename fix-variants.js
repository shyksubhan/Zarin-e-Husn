const fs = require('fs');

// 1. UPDATE backend/utils/email.js
let emailFile = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\backend\\utils\\email.js';
let emailContent = fs.readFileSync(emailFile, 'utf8');

// For Order Confirmation Email
emailContent = emailContent.replace(
  /\$\{i\.emoji \|\| '.*?'\} \$\{i\.name\} x \$\{i\.qty\}/g,
  "${i.emoji || '📦'} ${i.name} ${i.variant && i.variant !== 'Standard' ? `<br/><small style=\"color:#888;\">`+i.variant+`</small>` : ''} x ${i.qty}"
);

// For New Order Notification (to admin)
emailContent = emailContent.replace(
  /\$\{i\.name\} x \$\{i\.qty\} — PKR/g,
  "${i.name} ${i.variant && i.variant !== 'Standard' ? `(${i.variant})` : ''} x ${i.qty} — PKR"
);
fs.writeFileSync(emailFile, emailContent);


// 2. UPDATE backend/admin/index.html
let adminFile = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\backend\\admin\\index.html';
let adminContent = fs.readFileSync(adminFile, 'utf8');

adminContent = adminContent.replace(
  /<span>\$\{i\.emoji\|\|'.*?'\} \$\{i\.name\} \(x\$\{i\.qty\}\)<\/span>/g,
  "<span>${i.emoji||'📦'} ${i.name} ${i.variant && i.variant !== 'Standard' ? `<span style=\"color:var(--gold);font-size:0.75rem;margin-left:4px;\">(${i.variant})</span>` : ''} (x${i.qty})</span>"
);

// For Excel export
adminContent = adminContent.replace(
  /Items:\s*\(o\.items\|\|\[\]\)\.map\(i => `\$\{i\.name\}x\$\{i\.qty\}`\)\.join\(', '\)/g,
  "Items: (o.items||[]).map(i => `${i.name} ${i.variant && i.variant !== 'Standard' ? `(${i.variant}) ` : ''}x${i.qty}`).join(', ')"
);
adminContent = adminContent.replace(
  /Items:\s*\(a\.items\|\|\[\]\)\.map\(i => `\$\{i\.name\} x\$\{i\.qty\}`\)\.join\(' \| '\)/g,
  "Items: (a.items||[]).map(i => `${i.name} ${i.variant && i.variant !== 'Standard' ? `(${i.variant}) ` : ''}x${i.qty}`).join(' | ')"
);

fs.writeFileSync(adminFile, adminContent);


// 3. UPDATE js/checkout.js
let ckFile = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\js\\checkout.js';
let ckContent = fs.readFileSync(ckFile, 'utf8');

ckContent = ckContent.replace(
  /<span class="ck-item-name">\$\{item\.name\}<\/span>/g,
  `<span class="ck-item-name">\${item.name}</span>
            \${item.variant && item.variant !== 'Standard' ? \`<span class="ck-item-qty" style="font-size: 0.75rem; color: #888; margin-bottom:2px;">\${item.variant}</span>\` : ''}`
);
fs.writeFileSync(ckFile, ckContent);


// 4. UPDATE backend/utils/pdfGenerator.js (Invoices)
let pdfFile = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\backend\\utils\\pdfGenerator.js';
let pdfContent = fs.readFileSync(pdfFile, 'utf8');

pdfContent = pdfContent.replace(
  /const nameHeight = doc\.heightOfString\(item\.name, \{ width: 230 \}\);/g,
  `const itemNameVar = item.name + (item.variant && item.variant !== 'Standard' ? \` - \${item.variant}\` : '');\n        const nameHeight = doc.heightOfString(itemNameVar, { width: 230 });`
);
pdfContent = pdfContent.replace(
  /doc\.fillColor\(C_TEXT\)\.fontSize\(9\)\.text\(item\.name, 60, y \+ 10, \{ width: 230 \}\);/g,
  `doc.fillColor(C_TEXT).fontSize(9).text(itemNameVar, 60, y + 10, { width: 230 });`
);
fs.writeFileSync(pdfFile, pdfContent);

console.log('Fixed variant visibility everywhere');
