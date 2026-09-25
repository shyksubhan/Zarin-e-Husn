const fs = require('fs');

let serverFile = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\backend\\server.js';
let content = fs.readFileSync(serverFile, 'utf8');

if (!content.includes("const fs = require('fs');\nconst express")) {
  content = content.replace("const express", "const fs = require('fs');\nconst express");
  fs.writeFileSync(serverFile, content);
  console.log('Fixed fs require');
}
