const fs = require('fs');

let file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\js\\products-render.js';
let content = fs.readFileSync(file, 'utf8');

const target = "}).join('');\n          } else {";
const replacement = `}).join('');

          // --- Sequential Video Loading & Optimization ---
          setTimeout(() => {
            const videoEls = document.querySelectorAll('.hero-lazy-video');
            if(videoEls.length === 0) return;
            
            const loadVideo = (vid) => {
              return new Promise((resolve) => {
                vid.src = vid.dataset.src;
                vid.load();
                
                vid.addEventListener('canplay', () => {
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
          }, 100);

          } else {`;

content = content.replace(target, replacement);
fs.writeFileSync(file, content);
console.log('Added setTimeout');
