const fs = require('fs');
const file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\js\\products-render.js';
let content = fs.readFileSync(file, 'utf8');

const regex = /heroGrid\.innerHTML = videos\.map\(v => \{[\s\S]*?return \`[\s\S]*?<\/div>\s*\`\}\)\.join\(''\);/g;

const replacement = `heroGrid.innerHTML = videos.map(v => \`
                <div class="hero-video-card" style="position: relative; background: #f9f9f9; overflow: hidden; min-height: 200px;">
                  <!-- Loading Spinner behind video -->
                  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 30px; height: 30px; border: 3px solid #ddd; border-top-color: var(--gold); border-radius: 50%; animation: spin 1s linear infinite; z-index: 0;"></div>
                  
                  <video 
                    src="\${v.url}" 
                    autoplay loop muted playsinline 
                    preload="auto" 
                    style="position: relative; z-index: 1; width: 100%; height: 100%; object-fit: cover;"
                  ></video>
                </div>
              \`).join('');`;

content = content.replace(regex, replacement);
fs.writeFileSync(file, content);
console.log('Reverted cloudinary optimization, kept spinner.');
