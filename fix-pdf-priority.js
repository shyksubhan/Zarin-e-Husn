const fs = require('fs');

let pdfFile = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\backend\\utils\\pdfGenerator.js';
let pdfContent = fs.readFileSync(pdfFile, 'utf8');

pdfContent = pdfContent.replace(
  /if \(\!localPngLogo && company\.logoUrl && company\.logoUrl\.startsWith\('http'\)\) \{/g,
  "if (company.logoUrl && company.logoUrl.startsWith('http')) {"
);

// We need to also skip localPngLogo if company.logoUrl exists
pdfContent = pdfContent.replace(
  /const localLogoPath = path\.join\(__dirname, '\.\.', '\.\.', 'images', 'logo\.png'\);/g,
  "const localLogoPath = path.join(__dirname, '..', '..', 'images', 'logo.png');\n    if (company.logoUrl) { /* skip local */ } else"
);

fs.writeFileSync(pdfFile, pdfContent);
console.log('Fixed pdfGenerator priority');
