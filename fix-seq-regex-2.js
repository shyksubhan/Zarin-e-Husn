const fs = require('fs');

let file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\js\\products-render.js';
let content = fs.readFileSync(file, 'utf8');

// Match `).join('');` followed by `} else {`
content = content.replace(
  /\`\)\.join\(''\);\n\s*\} else \{/g,
  `\`).join('');

          // --- Sequential Video Loading & Optimization ---
          setTimeout(() => {
            const videoEls = document.querySelectorAll('.hero-lazy-video');
            if(videoEls.length === 0) return;
            
            const loadVideo = (vid) => {
              return new Promise((resolve) => {
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
console.log('Added setTimeout with fixed regex');
