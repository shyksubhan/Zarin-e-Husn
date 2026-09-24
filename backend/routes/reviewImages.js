const express = require('express');
const router = express.Router();
const ReviewImage = require('../models/ReviewImage');
const { requireAdmin } = require('../middleware/auth');

// GET /api/admin/review-images
router.get('/', async (req, res) => {
  try {
    const images = await ReviewImage.find({ active: true }).sort({ order: 1 });
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/admin/review-images
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { url, label, order } = req.body;
    const newImage = new ReviewImage({ url, label, order });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/admin/review-images/:id
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const updatedImage = await ReviewImage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedImage) return res.status(404).json({ error: 'Not found' });
    res.json(updatedImage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/admin/review-images/:id
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const deletedImage = await ReviewImage.findByIdAndDelete(req.params.id);
    if (!deletedImage) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
