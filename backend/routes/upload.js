/* ============================================================
   ZARIN-E-HUSN — Upload Routes
   Admin-only endpoint to upload product images/videos.
   Files are saved to local disk (images/products).
   ============================================================ */
const express = require('express');
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const { requireRole } = require('../middleware/auth');

const router = express.Router();

const uploadDir = path.join(__dirname, '..', '..', 'images', 'products');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/* ── Multer: save file to disk ── */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 },  /* 100MB max */
  fileFilter: (req, file, cb) => {
    const okImage = file.mimetype.startsWith('image/');
    const okVideo = file.mimetype.startsWith('video/');
    if (okImage || okVideo) return cb(null, true);
    cb(new Error('Only image or video files are allowed.'));
  },
});

/* ── POST /api/upload — single file (image or video), super_admin + admin only ── */
router.post('/', requireRole('super_admin', 'admin'), (req, res) => {
  upload.single('file')(req, res, async (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File is too large. Maximum allowed size is 100MB.' });
      }
      return res.status(400).json({ error: err.message || 'Upload failed.' });
    }
    if (!req.file) return res.status(400).json({ error: 'No file provided.' });

    try {
      const resourceType = req.file.mimetype.startsWith('video/') ? 'video' : 'image';
      // Returns a relative URL path that express.static can serve
      const fileUrl = `/images/products/${req.file.filename}`;
      
      return res.status(201).json({
        url:  fileUrl,
        type: resourceType,
        publicId: req.file.filename,
      });
    } catch (e) {
      console.error('Local upload error:', e);
      return res.status(500).json({ error: 'Failed to upload file. Please try again.' });
    }
  });
});

module.exports = router;
