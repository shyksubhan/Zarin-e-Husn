const fs = require('fs');
const file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\js\\products-render.js';
let content = fs.readFileSync(file, 'utf8');

// The replacement logic for optimizing hero videos
const targetVideoBlock = /heroGrid\.innerHTML = videos\.map\(v => \`\s*<div class="hero-video-card">\s*<video src="\$\{v\.url\}" autoplay loop muted playsinline preload="metadata"><\/video>\s*<\/div>\s*\`\)\.join\(''\);/g;

const replacementVideoBlock = `heroGrid.innerHTML = videos.map(v => {
              // Auto-optimize Cloudinary videos (massive speedup, keeps HD)
              let optimizedUrl = v.url;
              let posterUrl = '';
              if (optimizedUrl && optimizedUrl.includes('res.cloudinary.com')) {
                if (!optimizedUrl.includes('q_auto')) {
                  optimizedUrl = optimizedUrl.replace('/upload/', '/upload/f_auto,q_auto,w_800,vc_auto/');
                }
                // Generate a lightweight poster image from the first frame of the video
                posterUrl = optimizedUrl.replace(/\\.(mp4|mov|webm)$/i, '.jpg').replace('/upload/', '/upload/f_auto,q_auto,w_800/');
              }
              
              return \`
              <div class="hero-video-card" style="position: relative; background: #f9f9f9; overflow: hidden; min-height: 200px;">
                <!-- Loading Spinner behind video -->
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 30px; height: 30px; border: 3px solid #ddd; border-top-color: var(--gold); border-radius: 50%; animation: spin 1s linear infinite; z-index: 0;"></div>
                
                <video 
                  src="\${optimizedUrl}" 
                  poster="\${posterUrl}"
                  autoplay loop muted playsinline 
                  preload="auto" 
                  style="position: relative; z-index: 1; width: 100%; height: 100%; object-fit: cover;"
                  onloadeddata="this.style.opacity=1"
                ></video>
              </div>
            \`}).join('');`;

content = content.replace(targetVideoBlock, replacementVideoBlock);
fs.writeFileSync(file, content);
console.log('Fixed video rendering in products-render.js');
