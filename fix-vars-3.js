const fs = require('fs');

let file2 = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\backend\\admin\\index.html';
let lines = fs.readFileSync(file2, 'utf8').split('\\n');

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  if (line.includes('var(--border);font-size:0.85rem"><span>${i.emoji')) {
    lines[i] = '    ${(o.items || []).map(i => `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:0.85rem"><span>${i.emoji||\'📦\'} ${i.name} ${i.variant && i.variant !== \'Standard\' ? \`<span style="color:var(--gold);font-size:0.75rem;margin-left:4px;">(\${i.variant})</span>\` : \'\'} (x${i.qty})</span><span>PKR ${(i.price * i.qty).toLocaleString()}</span></div>`).join(\'\')}';
  }
  
  if (line.includes('var(--border);font-size:0.85rem"><span>📦 ${esc(i.name)}')) {
    lines[i] = '    ${(o.items||[]).map(i => `<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:0.85rem"><span>📦 ${esc(i.name)} ${i.variant && i.variant !== \'Standard\' ? \`<span style="color:var(--gold);font-size:0.75rem;margin-left:4px;">(\${i.variant})</span>\` : \'\'} (x${i.qty})</span><span>PKR ${(i.price*i.qty).toLocaleString()}</span></div>`).join(\'\')}';
  }

  if (line.includes('Items:          (o.items||[]).map(i =>')) {
    lines[i] = '        Items:          (o.items||[]).map(i => `${i.name} ${i.variant && i.variant !== \'Standard\' ? `(${i.variant}) ` : \'\'}x${i.qty}`).join(\', \'),';
  }

  if (line.includes('Items:   (a.items||[]).map(i =>')) {
    lines[i] = '        Items:   (a.items||[]).map(i => `${i.name} ${i.variant && i.variant !== \'Standard\' ? `(${i.variant}) ` : \'\'}x${i.qty}`).join(\' | \'),';
  }
}

fs.writeFileSync(file2, lines.join('\\n'));
console.log('done 3');
