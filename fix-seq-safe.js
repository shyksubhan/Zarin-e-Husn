const fs = require('fs');
let file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\js\\products-render.js';
let content = fs.readFileSync(file, 'utf8');

const videoTagOld = `<video 
                      src="\${v.url}" 
                      autoplay loop muted playsinline 
                      preload="auto" 
                      style="position: relative; z-index: 1; width: 100%; height: 100%; object-fit: cover;"
                    ></video>`;
const videoTagNew = `<video 
                        data-src="\${v.url}" 
                        loop muted playsinline 
                        preload="metadata" 
                        class="hero-lazy-video"
                        style="position: relative; z-index: 1; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity 0.5s ease;"
                    ></video>`;

content = content.replace(/<video[\s\S]*?preload="auto"[\s\S]*?<\/video>/, videoTagNew);

const insert = `}).join('');

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
                setTimeout(resolve, 1500);
              });
            };

            (async () => {
              for (let i = 0; i < videoEls.length; i++) {
                await loadVideo(videoEls[i]);
              }
            })();
          }, 100);

          } else {`;

// Replace ONLY the first match by omitting the 'g' flag, and making the match very specific!
// Wait, the string is exactly `                \`).join('');\n          } else {`
content = content.replace(/\n\s*`\)\.join\(''\);\n\s*\} else \{/, insert);

fs.writeFileSync(file, content);
console.log('Done safe replace');
