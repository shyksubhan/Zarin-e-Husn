const fs = require('fs');

let file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\js\\products-render.js';
let content = fs.readFileSync(file, 'utf8');

// We will replace the hero video map function
content = content.replace(
  /<video\s*src="\$\{v\.url\}"\s*autoplay loop muted playsinline\s*preload="auto"\s*style="position: relative; z-index: 1; width: 100%; height: 100%; object-fit: cover;"\s*><\/video>/g,
  `<video 
                      data-src="\${v.url}" 
                      loop muted playsinline 
                      preload="metadata" 
                      class="hero-lazy-video"
                      style="position: relative; z-index: 1; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.5s ease;"
                  ></video>`
);

// We need to add the script to sequentially load and play them
const seqScript = `
          heroGrid.innerHTML = videos.map(v => \`... (replaced above)\`).join('');
          
          // --- Sequential Video Loading & Optimization ---
          setTimeout(() => {
            const videoEls = document.querySelectorAll('.hero-lazy-video');
            if(videoEls.length === 0) return;
            
            // Function to load and play a video
            const loadVideo = (vid) => {
              return new Promise((resolve) => {
                vid.src = vid.dataset.src;
                vid.load();
                
                vid.addEventListener('canplay', () => {
                  vid.style.opacity = '1';
                  vid.play().catch(() => {});
                  resolve();
                }, { once: true });
                
                // Fallback resolve if it stalls
                setTimeout(resolve, 2000);
              });
            };

            // Load first video immediately, then sequence the rest
            (async () => {
              for (let i = 0; i < videoEls.length; i++) {
                await loadVideo(videoEls[i]);
              }
            })();
          }, 100);
`;

// Replace the end of the hero grid innerHTML assignment
content = content.replace(
  /heroGrid\.innerHTML = videos\.map\(v => `([\s\S]*?)`\)\.join\(''\);\n          \} else \{/g,
  `heroGrid.innerHTML = videos.map(v => \`$1\`).join('');

          setTimeout(() => {
            const videoEls = document.querySelectorAll('.hero-lazy-video');
            if(videoEls.length === 0) return;
            
            const loadVideo = (vid) => {
              return new Promise((resolve) => {
                vid.src = vid.dataset.src;
                vid.load();
                vid.addEventListener('loadeddata', () => {
                  vid.style.opacity = '1';
                  vid.play().catch(() => {});
                  resolve();
                }, { once: true });
                setTimeout(resolve, 1500); // Wait max 1.5s before starting next download
              });
            };

            (async () => {
              for (let i = 0; i < videoEls.length; i++) {
                await loadVideo(videoEls[i]);
              }
            })();
          }, 500);
          } else {`
);

fs.writeFileSync(file, content);
console.log('Fixed video loading');
