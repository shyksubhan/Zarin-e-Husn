const fs = require('fs');

function getPngDimensions(filePath) {
    const fd = fs.openSync(filePath, 'r');
    const buffer = Buffer.alloc(24);
    fs.readSync(fd, buffer, 0, 24, 0);
    fs.closeSync(fd);
    
    // PNG magic number is 8 bytes. IHDR starts at byte 8 (length 4), chunk type 'IHDR' (bytes 12-15)
    // Width is bytes 16-19, Height is bytes 20-23
    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    
    console.log(`Dimensions of ${filePath}: ${width}x${height}`);
}

getPngDimensions('images/logo.png');
