const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  journal_id: {
    type: String,
    required: true,
    unique: true,
  },
  published_by: {
    type: String,
    ref: 'Teacher',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  attachment: {
    type: String,
  },
  tagged_students: [{
    type: String,
    ref: 'Student',
  }],
});

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;