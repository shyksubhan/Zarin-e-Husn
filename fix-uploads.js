const fs = require('fs');

let serverFile = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\backend\\server.js';
let serverContent = fs.readFileSync(serverFile, 'utf8');

// Insert persistent upload serving BEFORE the general static middleware
const persistentCode = `
/* Hostinger Persistent Uploads Fix */
const hostingerPersistentDir = '/home/u480756160/domains/zarinehusn.com/persistent_uploads';
if (fs.existsSync('/home/u480756160/domains/zarinehusn.com')) {
  if (!fs.existsSync(hostingerPersistentDir)) fs.mkdirSync(hostingerPersistentDir, { recursive: true });
  app.use('/images/products', express.static(hostingerPersistentDir));
}
/* End Fix */
`;

serverContent = serverContent.replace(
  "app.use(express.static(path.join(__dirname, '..')",
  persistentCode + "\napp.use(express.static(path.join(__dirname, '..')"
);
fs.writeFileSync(serverFile, serverContent);


let uploadFile = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\backend\\routes\\upload.js';
let uploadContent = fs.readFileSync(uploadFile, 'utf8');

const newUploadCode = `
let uploadDir = path.join(__dirname, '..', '..', 'images', 'products');
const hostingerPersistentDir = '/home/u480756160/domains/zarinehusn.com/persistent_uploads';
if (fs.existsSync('/home/u480756160/domains/zarinehusn.com')) {
  uploadDir = hostingerPersistentDir;
}
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
`;

uploadContent = uploadContent.replace(
  /const uploadDir = path\.join\(__dirname, '\.\.', '\.\.', 'images', 'products'\);\nif \(!fs\.existsSync\(uploadDir\)\) fs\.mkdirSync\(uploadDir, \{ recursive: true \}\);/g,
  newUploadCode
);

fs.writeFileSync(uploadFile, uploadContent);
console.log('Fixed uploads persistence');
