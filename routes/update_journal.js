const express = require('express');
const router = express.Router();
const Journal = require('../models/Journal');
const authenticate = require('../middleware/authenticate');

// Update a journal
router.put('/:journal_id', authenticate, async (req, res) => {
  try {
    const { journal_id } = req.params;
    const { teacher_id, description } = req.body;

    // Check if the journal exists
    const journal = await Journal.findOne({journal_id: journal_id});
    if (!journal) {
      return res.status(404).json({ error: 'Journal not found' });
    }

    // Check if the logged-in teacher is the owner of the journal
    if (journal.published_by !== teacher_id) {
      return res.status(403).json({ error: 'Unauthorized access' });
    }

    // Update the journal with new description
    journal.description = description;
    await journal.save();

    res.json({ message: 'Journal updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update journal' });
    console.log(error);
  }
});

module.exports = router;
