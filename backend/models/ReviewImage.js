const mongoose = require('mongoose');
const reviewImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  label: { type: String, default: 'Review' },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true }
}, { timestamps: true });
module.exports = mongoose.model('ReviewImage', reviewImageSchema);
