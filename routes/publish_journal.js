const Teacher = require('../models/Teacher');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Journal = require('../models/Journal');
const { v1:uuidv1 } = require('uuid');
const authenticate = require('../middleware/authenticate');
// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

// Filter for allowed file types
const fileFilter = function (req, file, cb) {
  const allowedTypes = ['.png', '.jpg', '.jpeg', '.pdf'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only PNG, JPG, JPEG, and PDF files are allowed.'));
  }
};

// Set up multer upload
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/', upload.single('attachment'), async (req, res) => {
  try {
    const { published_by, description, tagged_students } = req.body;
    const attachment = req.file ? req.file.path : null;

    // Check if the teacher exists
    const teacher = await Teacher.findOne({ teacher_id: published_by });
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    const id = uuidv1();
    // Create a new journal with timestamp
    const journal = new Journal({
      journal_id: id,
      published_by: published_by,
      description: description,
      timestamp: new Date().toISOString(),
      attachment: attachment,
      tagged_students: tagged_students,
    });

    // Save the journal to the database
    await journal.save();

    res.status(201).json({ message: 'Journal published successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to publish journal' });
    console.log(error.message);
  }
});


router.post('/protected', authenticate, upload.single('attachment'), async (req, res) => {
  try {
    const { published_by, description, tagged_students } = req.body;
    const attachment = req.file ? req.file.path : null;

    // Check if the teacher exists
    const teacher = await Teacher.findOne({ teacher_id: published_by });
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    const id = uuidv1();
    // Create a new journal with timestamp
    const journal = new Journal({
      journal_id: id,
      published_by: published_by,
      description: description,
      timestamp: new Date().toISOString(),
      attachment: attachment,
      tagged_students: tagged_students,
    });

    // Save the journal to the database
    await journal.save();

    res.status(201).json({ message: 'Journal published successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to publish journal' });
    console.log(error.message);
  }
});

module.exports = router;
