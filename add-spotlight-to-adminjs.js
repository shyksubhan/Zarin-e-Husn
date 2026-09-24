const fs = require('fs');
const file = 'c:\\Users\\Muhammad Subhan\\Desktop\\Me\\Zarin-e-Husn\\backend\\routes\\admin.js';
let content = fs.readFileSync(file, 'utf8');

const spotlightRoutes = `
/* 🎁 GET /api/admin/spotlight */
router.get('/spotlight', async (req, res) => {
  try {
    if (store.spotlight) return res.json({ spotlight: store.spotlight });
    
    if (isFirebaseAvailable()) {
      const doc = await getDB().collection('settings').doc('spotlight').get();
      if (doc.exists) {
        store.spotlight = doc.data().products || [];
        return res.json({ spotlight: store.spotlight });
      }
    }
    const fp = path.join(__dirname, '..', 'data', 'spotlight.json');
    if (fs.existsSync(fp)) {
      const data = JSON.parse(fs.readFileSync(fp, 'utf8'));
      store.spotlight = data;
      return res.json({ spotlight: data });
    }
    return res.json({ spotlight: [] });
  } catch (err) {
    return res.json({ spotlight: [] });
  }
});

/* 🎁 POST /api/admin/spotlight */
router.post('/spotlight', requireRole('super_admin', 'admin', 'ceo'), async (req, res) => {
  try {
    const { spotlight } = req.body;
    if (!Array.isArray(spotlight)) return res.status(400).json({ error: 'Expected array' });
    
    store.spotlight = spotlight;

    if (isFirebaseAvailable()) {
      try {
        await getDB().collection('settings').doc('spotlight').set({ products: spotlight });
      } catch (e) {}
    }
    try {
      const fp = path.join(__dirname, '..', 'data', 'spotlight.json');
      fs.writeFileSync(fp, JSON.stringify(spotlight, null, 2));
    } catch (e) {}
    
    return res.json({ message: 'Spotlight updated', spotlight });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update spotlight' });
  }
});
`;

if (!content.includes('/spotlight')) {
  content = content.replace(/module\.exports = router;/, spotlightRoutes + '\nmodule.exports = router;');
  fs.writeFileSync(file, content);
}
console.log('Added spotlight to admin.js');
