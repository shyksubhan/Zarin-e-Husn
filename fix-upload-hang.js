const fs = require('fs');
const path = require('path');
const file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\backend\\routes\\upload.js';
let content = fs.readFileSync(file, 'utf8');

// Add try-catch around local disk writing to prevent hanging
content = content.replace(
  /const localName = uniqueName \+ ext;\n\s*const localPath = path\.join\(uploadDir, localName\);\n\s*fs\.writeFileSync\(localPath, req\.file\.buffer\);\n\s*const fileUrl = `\/images\/products\/\$\{localName\}`;\n\s*console\.warn\('s,\? Saved locally \(ephemeral\):', fileUrl\);\n\s*return res\.status\(201\)\.json\(\{ url: fileUrl, type: resourceType, publicId: localName \}\);/g,
  `const localName = uniqueName + ext;
    const localPath = path.join(uploadDir, localName);
    try {
      fs.writeFileSync(localPath, req.file.buffer);
      const fileUrl = \`/images/products/\${localName}\`;
      console.warn('📦 Saved locally:', fileUrl);
      return res.status(201).json({ url: fileUrl, type: resourceType, publicId: localName });
    } catch (e) {
      console.error('Local write failed:', e);
      return res.status(500).json({ error: 'Failed to write file to disk. ' + e.message });
    }`
);

fs.writeFileSync(file, content);
console.log('Fixed hanging uploads');
