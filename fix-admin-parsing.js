const fs = require('fs');
const file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\backend\\admin\\index.html';
let content = fs.readFileSync(file, 'utf8');

// Fix Hero Videos parsing
content = content.replace(
  /const videos = await res\.json\(\);\s*if\(videos\.length === 0\)/g,
  `let videosData = await res.json();
      const videos = Array.isArray(videosData) ? videosData : (videosData.videos || []);
      if(videos.length === 0)`
);

// Fix Review Images parsing
content = content.replace(
  /const images = await res\.json\(\);\s*if\(images\.length === 0\)/g,
  `let imagesData = await res.json();
      const images = Array.isArray(imagesData) ? imagesData : (imagesData.reviews || imagesData.images || []);
      if(images.length === 0)`
);

fs.writeFileSync(file, content);
console.log('Fixed API parsing in Admin JS');
