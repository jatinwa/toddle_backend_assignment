const Journal = require('../models/Journal');
const Teacher = require('../models/Teacher');
const express = require('express');
const router = express.Router();
const app = express();
const authenticate = require('../middleware/authenticate');

// Fetch journals published by a particular teacher
router.get('/:teacher_id', authenticate, async (req, res) => {
  try {
    const { teacher_id } = req.params;

    // Check if the teacher exists
    const teacher = await Teacher.findOne({teacher_id});
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    // Fetch all journals
    const journals = await Journal.find();

    // Filter journals published by the teacher
    const teacherJournals = journals.filter((journal) => {
      return journal.published_by === teacher_id;
    });

    res.json(teacherJournals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch journals' });
  }
});


router.get('/protected/:teacher_id', authenticate, async (req, res) => {
  try {
    const { teacher_id } = req.params;

    // Check if the teacher exists
    const teacher = await Teacher.findOne({teacher_id});
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    // Fetch all journals
    const journals = await Journal.find();

    // Filter journals published by the teacher
    const teacherJournals = journals.filter((journal) => {
      return journal.published_by === teacher_id;
    });

    res.json(teacherJournals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch journals' });
  }
});


module.exports = router
