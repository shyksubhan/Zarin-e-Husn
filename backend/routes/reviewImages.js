const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'reviewImages.json');

// Helper to load/save
function loadData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (err) {
    console.error('Error loading review images:', err);
  }
  return [];
}
function saveData(data) {
  try {
    if (!fs.existsSync(path.dirname(DATA_FILE))) {
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error saving review images:', err);
  }
}

const requireAdmin = (req, res, next) => next();

// GET all reviews
router.get('/', (req, res) => {
  const data = loadData().filter(v => v.active !== false).sort((a, b) => (a.order || 0) - (b.order || 0));
  res.json({ success: true, reviews: data });
});

// POST new review
router.post('/', requireAdmin, (req, res) => {
  const { url, label, order } = req.body;
  if (!url) return res.status(400).json({ success: false, message: 'URL is required' });
  
  const data = loadData();
  const newImg = { id: Date.now().toString(), url, label: label || 'Review', order: Number(order) || 0, active: true };
  data.push(newImg);
  saveData(data);
  
  res.json({ success: true, review: newImg });
});

// DELETE review
router.delete('/:id', requireAdmin, (req, res) => {
  let data = loadData();
  data = data.filter(v => v.id !== req.params.id);
  saveData(data);
  res.json({ success: true, message: 'Deleted' });
});

module.exports = router;
