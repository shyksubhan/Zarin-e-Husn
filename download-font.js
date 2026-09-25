const fs = require('fs');
const https = require('https');
const path = require('path');

const fontUrl = 'https://github.com/googlefonts/cairo/raw/master/fonts/ttf/Cairo-Bold.ttf';
const dest = path.join(__dirname, 'backend', 'utils', 'Cairo-Bold.ttf');

const file = fs.createWriteStream(dest);
https.get(fontUrl, (response) => {
  if (response.statusCode === 302) {
    https.get(response.headers.location, (res2) => {
      res2.pipe(file);
      file.on('finish', () => { file.close(); console.log('Downloaded Font!'); });
    });
  } else {
    response.pipe(file);
    file.on('finish', () => { file.close(); console.log('Downloaded Font!'); });
  }
}).on('error', (err) => {
  fs.unlink(dest);
  console.error(err.message);
});
