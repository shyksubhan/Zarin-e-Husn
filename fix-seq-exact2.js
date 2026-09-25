const fs = require('fs');
let file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\js\\products-render.js';
let content = fs.readFileSync(file, 'utf8');

// Normalize newlines to \n
content = content.replace(/\r\n/g, '\n');

const targetBlock = `                  <div class="hero-video-card" style="position: relative; background: #f9f9f9; overflow: hidden; min-height: 200px;">
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

const newBlock = `                  <div class="hero-video-card" style="position: relative; background: #f9f9f9; overflow: hidden; min-height: 200px;">
                    <!-- Loading Spinner behind video -->
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 30px; height: 30px; border: 3px solid #ddd; border-top-color: var(--gold); border-radius: 50%; animation: spin 1s linear infinite; z-index: 0;"></div>
                    
                    <video 
                        data-src="\${v.url}" 
                        loop muted playsinline 
                        preload="metadata" 
                        class="hero-lazy-video"
                        style="position: relative; z-index: 1; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.5s ease;"
                    ></video>
                  </div>
                \`).join('');

          // --- Sequential Video Loading & Optimization ---
          setTimeout(() => {
            const videoEls = document.querySelectorAll('.hero-lazy-video');
            if(videoEls.length === 0) return;
            
            const loadVideo = (vid) => {
              return new Promise((resolve) => {
                if (vid.src === vid.dataset.src) return resolve();
                vid.src = vid.dataset.src;
                vid.load();
                const onCanPlay = () => {
                  vid.style.opacity = '1';
                  vid.play().catch(() => {});
                  resolve();
                };
                vid.addEventListener('canplay', onCanPlay, { once: true });
                vid.addEventListener('loadeddata', onCanPlay, { once: true });
                // Max wait to prevent blocking next video if one is too slow
                setTimeout(resolve, 1000); 
              });
            };

            (async () => {
              for (let i = 0; i < videoEls.length; i++) {
                await loadVideo(videoEls[i]);
              }
            })();
          }, 100);`;

if (content.includes(targetBlock)) {
  content = content.replace(targetBlock, newBlock);
  fs.writeFileSync(file, content);
  console.log('Successfully replaced EXACT block with normalized newlines');
} else {
  console.log('Target block still not found!');
}
