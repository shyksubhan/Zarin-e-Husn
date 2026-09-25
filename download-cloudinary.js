const fs = require('fs');
const https = require('https');
const path = require('path');

const imgUrl = 'https://res.cloudinary.com/demo/image/text/Cairo_100_bold/%D8%B2%D9%8E%D8%B1%D9%90%D9%8A%D9%86%20%D8%AD%D8%B3%D9%86.png';
const dest1 = path.join(__dirname, 'images', 'logo.png');
const dest2 = path.join(__dirname, 'images', 'logo-light.png');

const file1 = fs.createWriteStream(dest1);
https.get(imgUrl, (res) => {
  res.pipe(file1);
  file1.on('finish', () => { 
    file1.close();
    fs.copyFileSync(dest1, dest2);
    console.log('Downloaded Cloudinary Logo PNG to images/logo.png'); 
  });
});
