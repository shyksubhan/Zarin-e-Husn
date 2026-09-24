const fs = require('fs');
const path = require('path');

const routeCode = `
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/spotlight.json');

router.get('/', (req, res) => {
  if (!fs.existsSync(dataPath)) {
    return res.json({ spotlight: [] });
  }
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  res.json(data);
});

router.post('/', (req, res) => {
  const { spotlight } = req.body;
  fs.writeFileSync(dataPath, JSON.stringify({ spotlight }, null, 2));
  res.json({ message: 'Spotlight updated' });
});

module.exports = router;
`;
fs.writeFileSync('backend/routes/spotlight.js', routeCode);

let serverCode = fs.readFileSync('backend/server.js', 'utf8');
if (!serverCode.includes('/api/admin/spotlight')) {
  serverCode = serverCode.replace(/app\.use\('\/api\/admin\/pinned', require\('\.\/routes\/pinned'\)\);/,
    "app.use('/api/admin/pinned', require('./routes/pinned'));\napp.use('/api/admin/spotlight', require('./routes/spotlight'));");
  fs.writeFileSync('backend/server.js', serverCode);
}
console.log('Spotlight route added');
