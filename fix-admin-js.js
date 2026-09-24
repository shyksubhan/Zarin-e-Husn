const fs = require('fs');
const file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\backend\\admin\\index.html';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/showToast\(/g, 'toast(');
content = content.replace(/fetch\(\`\$\{API\}\/admin\/hero-videos\`, \{ headers: \{ 'Authorization': \`Bearer \$\{getCookie\('admin_token'\)\}\` \} \}\)/g, "apiFetch('/admin/hero-videos')");
content = content.replace(/fetch\(\`\$\{API\}\/upload\`, \{\s*method: 'POST',\s*headers: \{ 'Authorization': \`Bearer \$\{getCookie\('admin_token'\)\}\` \},\s*body: fd\s*\}\)/g, "apiFetch('/upload', { method: 'POST', body: fd, headers: {} })");
content = content.replace(/fetch\(\`\$\{API\}\/admin\/hero-videos\`, \{\s*method: 'POST',\s*headers: \{ 'Content-Type': 'application\/json', 'Authorization': \`Bearer \$\{getCookie\('admin_token'\)\}\` \},\s*body: JSON\.stringify\(\{ url, order \}\)\s*\}\)/g, "apiFetch('/admin/hero-videos', { method: 'POST', body: JSON.stringify({ url, order }) })");
content = content.replace(/fetch\(\`\$\{API\}\/admin\/hero-videos\/\$\{id\}\`, \{\s*method: 'DELETE',\s*headers: \{ 'Authorization': \`Bearer \$\{getCookie\('admin_token'\)\}\` \}\s*\}\)/g, "apiFetch(`/admin/hero-videos/${id}`, { method: 'DELETE' })");

content = content.replace(/fetch\(\`\$\{API\}\/admin\/review-images\`, \{ headers: \{ 'Authorization': \`Bearer \$\{getCookie\('admin_token'\)\}\` \} \}\)/g, "apiFetch('/admin/review-images')");
content = content.replace(/fetch\(\`\$\{API\}\/admin\/review-images\`, \{\s*method: 'POST',\s*headers: \{ 'Content-Type': 'application\/json', 'Authorization': \`Bearer \$\{getCookie\('admin_token'\)\}\` \},\s*body: JSON\.stringify\(\{ url, label, order \}\)\s*\}\)/g, "apiFetch('/admin/review-images', { method: 'POST', body: JSON.stringify({ url, label, order }) })");
content = content.replace(/fetch\(\`\$\{API\}\/admin\/review-images\/\$\{id\}\`, \{\s*method: 'DELETE',\s*headers: \{ 'Authorization': \`Bearer \$\{getCookie\('admin_token'\)\}\` \}\s*\}\)/g, "apiFetch(`/admin/review-images/${id}`, { method: 'DELETE' })");

// Ensure the upload call correctly overrides Content-Type for FormData
content = content.replace(/apiFetch\('\/upload', \{ method: 'POST', body: fd, headers: \{\} \}\)/g, 
  "fetch(`${API}/upload`, { method: 'POST', headers: { 'Authorization': `Bearer ${adminToken}` }, body: fd })");

fs.writeFileSync(file, content);
console.log('Fixed admin JS');
