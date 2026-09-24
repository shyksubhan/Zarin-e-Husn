const express = require('express');
const router = express.Router();
const HeroVideo = require('../models/HeroVideo');
const { requireAdmin } = require('../middleware/auth');

// GET /api/admin/hero-videos
router.get('/', async (req, res) => {
  try {
    const videos = await HeroVideo.find({ active: true }).sort({ order: 1 });
    res.json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/admin/hero-videos
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { url, order } = req.body;
    const newVideo = new HeroVideo({ url, order });
    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/admin/hero-videos/:id
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const updatedVideo = await HeroVideo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedVideo) return res.status(404).json({ error: 'Not found' });
    res.json(updatedVideo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/admin/hero-videos/:id
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const deletedVideo = await HeroVideo.findByIdAndDelete(req.params.id);
    if (!deletedVideo) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
