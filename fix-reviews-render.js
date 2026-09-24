const fs = require('fs');
const path = require('path');
const file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\js\\products-render.js';
let content = fs.readFileSync(file, 'utf8');

const target = `reviewsContainer.innerHTML = reviewImages.map((img, i) => \`
              <div class="review-highlight" onclick="openReviewLightbox('\${img.url}')">
                <div class="review-highlight-img"><img src="\${img.url}" alt="Review \${i+1}" loading="lazy"/></div>
                <p>\${img.label || 'Review'}</p>
              </div>
            \`).join('');`;

const replacement = `reviewsContainer.innerHTML = reviewImages.map((img, i) => \`
              <div class="review-highlight" onclick="openReviewLightbox('\${img.url}')" style="cursor:pointer; display:flex; flex-direction:column; align-items:center;">
                <div class="review-highlight-img" style="width: 100px; height: 100px; border-radius: 50%; border: 3px solid transparent; background: linear-gradient(white, white) padding-box, linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888) border-box; padding: 4px; margin: 0 auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1); transition: transform 0.3s;">
                  <img src="\${img.url}" alt="Review \${i+1}" loading="lazy" style="width:100%; height:100%; object-fit:cover; border-radius:50%;" />
                </div>
              </div>
            \`).join('');`;

content = content.replace(target, replacement);
fs.writeFileSync(file, content);
console.log('Fixed reviews rendering');
