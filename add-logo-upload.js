const fs = require('fs');
const file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\backend\\admin\\index.html';
let content = fs.readFileSync(file, 'utf8');

// Replace the Company Logo URL input with an upload group
const oldLogoField = `<div class="form-group"><label>Company Logo URL</label><input type="text" id="cs-logo" placeholder="https://..."/></div>`;
const newLogoField = `<div class="form-group">
          <label>Company Logo</label>
          <div style="display:flex; gap:10px;">
            <input type="text" id="cs-logo" placeholder="https://..." style="flex:1;" />
            <input type="file" id="cs-logo-file" accept="image/*" style="display:none;" onchange="uploadCompanyLogo()" />
            <button class="btn btn-outline" onclick="document.getElementById('cs-logo-file').click()" type="button"><i class="fa-solid fa-upload"></i> Upload</button>
          </div>
        </div>`;

content = content.replace(oldLogoField, newLogoField);

// Add the upload function
const uploadFn = `
  async function uploadCompanyLogo() {
    const fileInput = document.getElementById('cs-logo-file');
    if(!fileInput.files[0]) return;
    
    const toastId = toast('Uploading logo...', 'info');
    const fd = new FormData();
    fd.append('file', fileInput.files[0]);
    try {
      const res = await fetch(\`\${API}/upload\`, { method: 'POST', headers: { 'Authorization': \`Bearer \${adminToken}\` }, body: fd });
      const data = await res.json();
      if(data.url) {
        document.getElementById('cs-logo').value = data.url;
        toast('Logo uploaded successfully! Click Save to apply.', 'success');
      } else {
        toast(data.error || 'Upload failed', 'error');
      }
    } catch(e) {
      toast('Network error during upload', 'error');
    }
  }
`;

content = content.replace('// INIT LOAD', uploadFn + '\n  // INIT LOAD');

fs.writeFileSync(file, content);
console.log('Added logo upload feature to settings');
