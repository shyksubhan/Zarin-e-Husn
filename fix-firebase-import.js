const fs = require('fs');

const fixImport = (filePath) => {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace("require('../firebase')", "require('../utils/firebase')");
  fs.writeFileSync(filePath, content);
};

fixImport('c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\backend\\routes\\heroVideos.js');
fixImport('c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\backend\\routes\\reviewImages.js');

console.log('Fixed imports');
