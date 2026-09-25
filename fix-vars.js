const fs = require('fs');

// 1. UPDATE backend/utils/email.js
let emailFile = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\backend\\utils\\email.js';
let emailContent = fs.readFileSync(emailFile, 'utf8');

emailContent = emailContent.replace(
  /\$\{i\.name\} A- \$\{i\.qty\}/g,
  "${i.name} ${i.variant && i.variant !== 'Standard' ? `(${i.variant}) ` : ''}A- ${i.qty}"
);
fs.writeFileSync(emailFile, emailContent);


// 2. UPDATE backend/admin/index.html
let adminFile = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\backend\\admin\\index.html';
let adminContent = fs.readFileSync(adminFile, 'utf8');

adminContent = adminContent.replace(
  /\$\{esc\(i\.name\)\} \(A-\$\{i\.qty\}\)/g,
  "${esc(i.name)} ${i.variant && i.variant !== 'Standard' ? `<span style=\\\"color:var(--gold);font-size:0.75rem;margin-left:4px;\\\">(${i.variant})</span>` : ''} (x${i.qty})"
);

adminContent = adminContent.replace(
  /\$\{i\.name\} \(A-\$\{i\.qty\}\)/g,
  "${i.name} ${i.variant && i.variant !== 'Standard' ? `<span style=\\\"color:var(--gold);font-size:0.75rem;margin-left:4px;\\\">(${i.variant})</span>` : ''} (x${i.qty})"
);

adminContent = adminContent.replace(
  /\$\{i\.name\}A-\$\{i\.qty\}/g,
  "${i.name} ${i.variant && i.variant !== 'Standard' ? `(${i.variant}) ` : ''}x${i.qty}"
);

adminContent = adminContent.replace(
  /\$\{i\.name\} x\$\{i\.qty\}/g,
  "${i.name} ${i.variant && i.variant !== 'Standard' ? `(${i.variant}) ` : ''}x${i.qty}"
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

if (!pdfContent.includes('itemNameVar')) {
  pdfContent = pdfContent.replace(
    /const nameHeight = doc\.heightOfString\(item\.name, \{ width: 230 \}\);/g,
    `const itemNameVar = item.name + (item.variant && item.variant !== 'Standard' ? \` - \${item.variant}\` : '');\n        const nameHeight = doc.heightOfString(itemNameVar, { width: 230 });`
  );
  pdfContent = pdfContent.replace(
    /doc\.fillColor\(C_TEXT\)\.fontSize\(9\)\.text\(item\.name, 60, y \+ 10, \{ width: 230 \}\);/g,
    `doc.fillColor(C_TEXT).fontSize(9).text(itemNameVar, 60, y + 10, { width: 230 });`
  );
  fs.writeFileSync(pdfFile, pdfContent);
}

console.log('Done!');
