const fs = require('fs');
const file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\backend\\admin\\index.html';
let content = fs.readFileSync(file, 'utf8');

// 1. Add Button
content = content.replace(
  /<button class="btn btn-outline" onclick="openPinnedModal\(\)"><i class="fa-solid fa-thumbtack"><\/i> Pinned Collections<\/button>/,
  `<button class="btn btn-outline" onclick="openPinnedModal()"><i class="fa-solid fa-thumbtack"></i> Pinned Collections</button>
        <button class="btn btn-outline" onclick="openSpotlightModal()"><i class="fa-solid fa-star"></i> Spotlight Products</button>`
);

// 2. Add Modal HTML (place it after modal-pinned)
const spotlightModalHtml = `
  <!-- Spotlight Products Modal -->
  <div class="modal-overlay" id="modal-spotlight">
    <div class="modal" style="max-width:520px;">
      <div class="modal-header">
        <h2>Spotlight Products</h2>
        <button class="btn btn-outline btn-sm" onclick="closeSpotlightModal()">✕</button>
      </div>
      <div class="modal-body">
        <p style="margin-bottom:15px;color:var(--muted);font-size:0.9rem;">Select specific products to showcase in the Featured Spotlight section on the homepage. Reorder them below.</p>
        
        <div style="display:flex;gap:10px;margin-bottom:20px;">
          <select id="spotlight-sel" class="form-control" style="flex:1;">
            <option value="">-- Loading Products... --</option>
          </select>
          <button class="btn btn-gold" onclick="addSpotlightProduct()">Add</button>
        </div>

        <div style="max-height:300px;overflow-y:auto;border:1px solid var(--border);border-radius:6px;">
          <table style="width:100%;border-collapse:collapse;font-size:0.85rem;">
            <tbody id="spotlight-list-body"></tbody>
          </table>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-outline" onclick="closeSpotlightModal()">Cancel</button>
        <button class="btn btn-primary" onclick="saveSpotlightProducts()">Save Settings</button>
      </div>
    </div>
  </div>
`;
content = content.replace(/<!-- Product Modal -->/, spotlightModalHtml + '\n  <!-- Product Modal -->');

// 3. Add JS functions
const spotlightJs = `
  /* ====================================================
     SPOTLIGHT PRODUCTS MANAGEMENT
     ==================================================== */
  let adminSpotlightProducts = [];
  let allProductsList = [];

  async function openSpotlightModal() {
    document.getElementById('modal-spotlight').classList.add('open');
    document.body.style.overflow = 'hidden';
    try {
      const pRes = await apiFetch('/products');
      const pData = await pRes.json();
      allProductsList = pData.products || [];
      
      const sel = document.getElementById('spotlight-sel');
      sel.innerHTML = '<option value="">-- Select Product --</option>';
      allProductsList.forEach(p => {
        sel.innerHTML += \`<option value="\${p.id}">\${p.title} (\${p.price} PKR)</option>\`;
      });

      const res = await apiFetch('/admin/spotlight');
      const data = await res.json();
      adminSpotlightProducts = Array.isArray(data.spotlight) ? data.spotlight : [];
    } catch (err) {
      adminSpotlightProducts = [];
    }
    renderSpotlightList();
  }

  function closeSpotlightModal() {
    document.getElementById('modal-spotlight').classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderSpotlightList() {
    const tbody = document.getElementById('spotlight-list-body');
    if (adminSpotlightProducts.length === 0) {
      tbody.innerHTML = '<tr><td colspan="2" style="color:var(--muted);text-align:center;padding:20px;">No spotlight products yet. Add one above.</td></tr>';
      return;
    }
    tbody.innerHTML = adminSpotlightProducts.map((pId, i) => {
      const p = allProductsList.find(x => x.id === pId) || { title: 'Unknown Product', id: pId };
      return \`
      <tr style="border-bottom:1px solid var(--border);">
        <td style="padding:10px 8px;vertical-align:middle;">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:var(--gold);color:#000;font-size:0.7rem;font-weight:700;margin-right:10px;">\${i + 1}</span>
          <strong style="font-size:0.9rem;">\${p.title}</strong>
          <span style="margin-left:8px;font-size:0.7rem;color:var(--muted);font-family:monospace;">\${p.id}</span>
        </td>
        <td style="text-align:right;padding:10px 8px;white-space:nowrap;">
          <button class="btn btn-outline btn-sm" onclick="moveSpotlight(\${i}, -1)" \${i===0?'disabled':''} title="Move Up"><i class="fa-solid fa-arrow-up"></i></button>
          <button class="btn btn-outline btn-sm" onclick="moveSpotlight(\${i}, 1)" \${i===adminSpotlightProducts.length-1?'disabled':''} title="Move Down"><i class="fa-solid fa-arrow-down"></i></button>
          <button class="btn btn-sm" onclick="removeSpotlight(\${i})" title="Remove" style="background:rgba(217,106,106,0.15);color:#d96a6a;border:1px solid rgba(217,106,106,0.3);margin-left:4px;"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    \`}).join('');
  }

  function addSpotlightProduct() {
    const sel = document.getElementById('spotlight-sel');
    const pId = sel.value;
    if (!pId) return toast('Please select a product first', 'error');
    if (adminSpotlightProducts.includes(pId)) return toast('Product already added', 'error');
    adminSpotlightProducts.push(pId);
    renderSpotlightList();
  }

  function moveSpotlight(idx, dir) {
    if (idx + dir < 0 || idx + dir >= adminSpotlightProducts.length) return;
    const temp = adminSpotlightProducts[idx];
    adminSpotlightProducts[idx] = adminSpotlightProducts[idx + dir];
    adminSpotlightProducts[idx + dir] = temp;
    renderSpotlightList();
  }

  function removeSpotlight(idx) {
    adminSpotlightProducts.splice(idx, 1);
    renderSpotlightList();
  }

  async function saveSpotlightProducts() {
    const btn = document.querySelector('#modal-spotlight .btn-primary');
    const orig = btn.innerText;
    btn.innerText = 'Saving...';
    try {
      const res = await apiFetch('/admin/spotlight', {
        method: 'POST',
        body: JSON.stringify({ spotlight: adminSpotlightProducts })
      });
      const data = await res.json();
      if (res.ok) {
        toast('Spotlight products saved', 'success');
        closeSpotlightModal();
      } else {
        toast(data?.error || 'Failed to save', 'error');
      }
    } catch (err) {
      toast('Error saving spotlight products', 'error');
    }
    btn.innerText = orig;
  }
`;
content = content.replace(/<\/script>\s*<\/body>/, spotlightJs + '\n</script>\n</body>');

fs.writeFileSync(file, content);
console.log('Added Spotlight Admin UI');
