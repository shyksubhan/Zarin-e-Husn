const fs = require('fs');
let file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\js\\products-render.js';
let content = fs.readFileSync(file, 'utf8');

let startIndex = content.indexOf('heroGrid.innerHTML = videos.map(v => `');
if (startIndex !== -1) {
  let endIndexString = "`).join('');";
  let endIndex = content.indexOf(endIndexString, startIndex);
  if (endIndex !== -1) {
    let before = content.substring(0, startIndex);
    let after = content.substring(endIndex + endIndexString.length);
    
    let replacement = `heroGrid.innerHTML = videos.map(v => \`
                  <div class="hero-video-card" style="position: relative; background: #f9f9f9; overflow: hidden; min-height: 200px;">
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
                setTimeout(resolve, 1000); // Max wait to prevent blocking next video if one is too slow
              });
            };

            (async () => {
              for (let i = 0; i < videoEls.length; i++) {
                await loadVideo(videoEls[i]);
              }
            })();
          }, 100);`;
          
    content = before + replacement + after;
    fs.writeFileSync(file, content);
    console.log('Successfully replaced block with indexOf and substring');
  }
}
