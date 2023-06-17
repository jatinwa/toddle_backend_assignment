const express = require('express');
const router = express.Router();
const Journal = require('../models/Journal');
const authenticate = require('../middleware/authenticate');

// Delete a journal
router.delete('/:journal_id', authenticate, async (req, res) => {
  try {
    const { journal_id } = req.params;

    // Check if the journal exists
    const journal = await Journal.findOne({journal_id: journal_id});
    if (!journal) {
      return res.status(404).json({ error: 'Journal not found' });
    }

    // Check if the logged-in teacher is the owner of the journal

    // Delete the journal
    await Journal.findOneAndDelete({journal_id: journal_id});

    res.json({ message: 'Journal deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete journal' });
  }
});

module.exports = router;
