const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('test-arabic.pdf'));

doc.font('backend/utils/Cairo-Bold.ttf');
doc.fontSize(25).text('زَرِین حسن', 100, 100);

doc.end();
console.log('PDF created');
