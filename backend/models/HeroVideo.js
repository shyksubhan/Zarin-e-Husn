const mongoose = require('mongoose');
const heroVideoSchema = new mongoose.Schema({
  url: { type: String, required: true },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true }
}, { timestamps: true });
module.exports = mongoose.model('HeroVideo', heroVideoSchema);
