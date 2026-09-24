const fs = require('fs');
const path = require('path');
const file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\js\\products-render.js';
let content = fs.readFileSync(file, 'utf8');

const regex = /\/\/ --- 5\. Render Featured Spotlight ---[\s\S]*?\/\/ --- 6\. Render Reviews Highlights ---/;

const replacement = `// --- 5. Render Featured Spotlight ---
      const spotlightRes = await apiGet('/admin/spotlight').catch(e => null);
      const spotlightIds = spotlightRes && spotlightRes.spotlight ? spotlightRes.spotlight : [];
      
      const spotlightSection = document.getElementById('featured-spotlight');
      
      if (spotlightSection && spotlightIds.length > 0) {
        const spotlightProducts = spotlightIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean);
        
        if (spotlightProducts.length > 0) {
          spotlightSection.className = 'collection-section product-section';
          spotlightSection.innerHTML = \`
            <div class="container">
              <div class="section-header-row" style="justify-content:center; text-align:center;">
                <h2 style="font-family: 'Amiri', 'Playfair Display', serif; font-size: 2.5rem; text-align: center; border-bottom: 2px solid var(--gold); padding-bottom: 5px; display: inline-block;">Spotlight</h2>
              </div>
              <div class="product-grid-4">
                \${spotlightProducts.map(p => zarinehusnCreateProductCard(p)).join('')}
              </div>
            </div>
          \`;
          zarinehusnReInitCards(spotlightSection);
          spotlightSection.style.display = 'block';
        } else {
          spotlightSection.style.display = 'none';
        }
      } else if (spotlightSection) {
        spotlightSection.style.display = 'none';
      }
      
      // --- 6. Render Reviews Highlights ---`;

content = content.replace(regex, replacement);

fs.writeFileSync(file, content);
console.log('Fixed render spotlight logic');
