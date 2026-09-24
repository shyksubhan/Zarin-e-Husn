const fs = require('fs');
const path = require('path');
const file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\backend\\admin\\index.html';
let content = fs.readFileSync(file, 'utf8');

const target = `<div class="nav-item" onclick="showPage('settings')" id="nav-settings">
        <i class="fa-solid fa-gear"></i><span>Settings</span>
      </div>`;
const replacement = target + `
      <div class="nav-item" onclick="showPage('hero-videos')" id="nav-hero-videos">
        <i class="fa-solid fa-video"></i><span>Hero Videos</span>
      </div>
      <div class="nav-item" onclick="showPage('review-images')" id="nav-review-images">
        <i class="fa-solid fa-image"></i><span>Reviews</span>
      </div>`;

content = content.replace(target, replacement);

fs.writeFileSync(file, content);
console.log('Fixed admin panel tabs');
