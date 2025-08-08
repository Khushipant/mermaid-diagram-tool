const mongoose = require('mongoose');

const DiagramSchema = new mongoose.Schema({
  title: String,
  code: String,
  user: String,     // Optional, for user auth
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Diagram', DiagramSchema);
