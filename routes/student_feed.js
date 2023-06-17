const Journal = require('../models/Journal');
const Student = require('../models/Student');
const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const app = express();

// Fetch student's feed (journals tagged to the student)
router.get('/:student_id', async (req, res) => {
  try {
    const { student_id } = req.params;

    // Check if the student exists
    const student = await Student.findOne({student_id});
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Fetch all journals
    const journals = await Journal.find();


    // Filter journals where the student is tagged
    const studentJournals = journals.filter((journal) => {
      return journal.tagged_students.includes(student_id);
    });

    res.json(studentJournals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student feed' });
  }
});

router.get('/protected/:student_id', authenticate ,async (req, res) => {
  try {
    const { student_id } = req.params;

    // Check if the student exists
    const student = await Student.findOne({student_id});
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Fetch all journals
    const journals = await Journal.find();


    // Filter journals where the student is tagged
    const studentJournals = journals.filter((journal) => {
      return journal.tagged_students.includes(student_id);
    });

    res.json(studentJournals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student feed' });
  }
});



module.exports = router
