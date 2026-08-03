/* ============================================================
   ZARIN-E-HUSN — Upload Routes
   Admin-only endpoint to upload product images/videos.
   Uploads to Firebase Storage if available, otherwise local disk.
   ============================================================ */
const express = require('express');
const multer  = require('multer');
const path    = require('path');
const fs      = require('fs');
const { requireRole } = require('../middleware/auth');
const { admin, getDB } = require('../utils/firebase');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const uploadDir = path.join(__dirname, '..', '..', 'images', 'products');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/* ── Multer: save to memory so we can push to Firebase ── */
const storage = multer.memoryStorage();

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
      const ext = path.extname(req.file.originalname) || '';
      const uniqueName = req.file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;

      /* Attempt Firebase Storage first */
      if (admin && getDB()) {
        try {
          const bucketName = process.env.FIREBASE_STORAGE_BUCKET || `${process.env.FIREBASE_PROJECT_ID}.appspot.com`;
          const bucket = admin.storage().bucket(bucketName);
          
          const file = bucket.file(`products/${uniqueName}`);
          const uuid = uuidv4();
          
          await file.save(req.file.buffer, {
            metadata: {
              contentType: req.file.mimetype,
              metadata: {
                firebaseStorageDownloadTokens: uuid
              }
            }
          });
          
          // Generate Firebase Storage public URL
          const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/products%2F${encodeURIComponent(uniqueName)}?alt=media&token=${uuid}`;
          
          return res.status(201).json({
            url: fileUrl,
            type: resourceType,
            publicId: uniqueName,
          });
        } catch (fbErr) {
          console.error('Firebase Storage upload failed, falling back to local:', fbErr);
          /* Fallback below */
        }
      }

      /* Fallback: Local Disk (Ephemeral on Render unless persistent disk attached) */
      const localPath = path.join(uploadDir, uniqueName);
      fs.writeFileSync(localPath, req.file.buffer);
      const fileUrl = `/images/products/${uniqueName}`;

      return res.status(201).json({
        url:  fileUrl,
        type: resourceType,
        publicId: uniqueName,
      });

    } catch (e) {
      console.error('Upload error:', e);
      return res.status(500).json({ error: 'Failed to upload file. Please try again.' });
    }
  });
});

module.exports = router;
