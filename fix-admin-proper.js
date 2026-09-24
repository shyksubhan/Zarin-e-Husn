const fs = require('fs');
const file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\backend\\admin\\index.html';
let content = fs.readFileSync(file, 'utf8');

// Insert after settings nav item
content = content.replace(
  /<div class="nav-item" onclick="showPage\('settings'\)" id="nav-settings">\s*<i class="fa-solid fa-gear"><\/i><span>Settings<\/span>\s*<\/div>/g,
  `<div class="nav-item" onclick="showPage('settings')" id="nav-settings">
        <i class="fa-solid fa-gear"></i><span>Settings</span>
      </div>
      <div class="nav-item" onclick="showPage('hero-videos')" id="nav-hero-videos">
        <i class="fa-solid fa-video"></i><span>Hero Videos</span>
      </div>
      <div class="nav-item" onclick="showPage('review-images')" id="nav-review-images">
        <i class="fa-solid fa-image"></i><span>Review Images</span>
      </div>`
);

fs.writeFileSync(file, content);
console.log('Fixed admin panel tabs properly');
