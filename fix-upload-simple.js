const fs = require('fs');

let file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\backend\\routes\\upload.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /const localPath = path\.join\(uploadDir, localName\);\n\s*fs\.writeFileSync\(localPath, req\.file\.buffer\);\n\s*const fileUrl/g,
  `const localPath = path.join(uploadDir, localName);
    try {
      fs.writeFileSync(localPath, req.file.buffer);
    } catch(e) {
      return res.status(500).json({ error: 'Local write failed: ' + e.message });
    }
    const fileUrl`
);

fs.writeFileSync(file, content);
console.log('Fixed hanging uploads perfectly');
