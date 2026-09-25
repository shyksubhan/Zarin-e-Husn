const fs = require('fs');

let file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\js\\products-render.js';
let content = fs.readFileSync(file, 'utf8');

// Replace the <video> tag precisely
content = content.replace(
  /<video \n\s*src="\$\{v\.url\}" \n\s*autoplay loop muted playsinline \n\s*preload="auto" \n\s*style="position: relative; z-index: 1; width: 100%; height: 100%; object-fit: cover;"\n\s*><\/video>/g,
  `<video 
                        data-src="\${v.url}" 
                        loop muted playsinline 
                        preload="metadata" 
                        class="hero-lazy-video"
                        style="position: relative; z-index: 1; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.5s ease;"
                    ></video>`
);

// Replace the specific `heroGrid` block
content = content.replace(
  /heroGrid\.innerHTML = videos\.map\(v => `([\s\S]*?)`\)\.join\(''\);\n\s*\} else \{/g,
  `heroGrid.innerHTML = videos.map(v => \`$1\`).join('');

          // --- Sequential Video Loading & Optimization ---
          setTimeout(() => {
            const videoEls = document.querySelectorAll('.hero-lazy-video');
            if(videoEls.length === 0) return;
            
            const loadVideo = (vid) => {
              return new Promise((resolve) => {
                if (vid.src === vid.dataset.src) return resolve(); // Already loaded
                vid.src = vid.dataset.src;
                vid.load();
                
                const onCanPlay = () => {
                  vid.style.opacity = '1';
                  vid.play().catch(() => {});
                  resolve();
                };
                vid.addEventListener('canplay', onCanPlay, { once: true });
                vid.addEventListener('loadeddata', onCanPlay, { once: true });
                
                setTimeout(resolve, 1500); // Max wait 1.5s per video
              });
            };

            (async () => {
              for (let i = 0; i < videoEls.length; i++) {
                await loadVideo(videoEls[i]);
              }
            })();
          }, 100);

          } else {`
);

fs.writeFileSync(file, content);
console.log('Fixed precisely');
