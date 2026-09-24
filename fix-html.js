const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn';
const files = ['index.html', 'about.html', 'shop.html', 'contact.html', 'jewelry.html', 'cosmetics.html', 'product.html', 'policy.html'];

files.forEach(file => {
  const filepath = path.join(dir, file);
  if (fs.existsSync(filepath)) {
    let content = fs.readFileSync(filepath, 'utf8');
    
    // 1. Fix logo image for white background
    content = content.replace(/logo-light\.png/g, 'logo-dark.png');
    // Increase logo size significantly
    content = content.replace(/height: 95px;/g, 'height: 120px;');
    
    // 2. Fix Instagram design
    // Find the Instagram section and replace it
    const instaRegex = /<section id="instagram-section">[\s\S]*?<\/section>/;
    const newInsta = `<section id="instagram-section">
    <div class="container" style="text-align: center;">
      <h2 class="section-title-simple" style="font-family: 'Playfair Display', serif; font-size: 2.5rem; margin-bottom: 5px;">Our <span style="color: #c4996c; font-style: italic;">Instagram</span></h2>
      <p style="color: #888; font-size: 0.9rem; margin-bottom: 20px;">Follow us for daily inspiration & new drops</p>
      <div style="margin-bottom: 30px;">
        <a href="https://www.instagram.com/zarin_e_husn" target="_blank" style="display: inline-block; background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); color: #fff; padding: 10px 25px; border-radius: 25px; text-decoration: none; font-weight: bold; font-size: 1rem;"><i class="fa-brands fa-instagram" style="margin-right: 8px;"></i> Follow @zarin_e_husn</a>
      </div>
      <div class="insta-grid" id="insta-grid">
        <!-- Will be populated by JS or static images -->
      </div>
    </div>
  </section>`;
    content = content.replace(instaRegex, newInsta);
    
    fs.writeFileSync(filepath, content);
  }
});
console.log('HTML files fixed (logo & insta)');
