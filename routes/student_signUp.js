const Student = require('../models/Student');
const express = require('express');
const router = express.Router();
const app = express();
const { v1:uuidv1 } = require('uuid');
const bcrypt = require('bcryptjs');
const authenticate = require('../middleware/authenticate');

const id = uuidv1();

router.post('/', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the student_id is already registered
      const existingStudent = await Student.findOne({ username });
      if (existingStudent) {
        return res.status(409).json({ error: 'username already exists' });
      }
  
      // Create a new student

      const securePassword = await bcrypt.hash(password, 10);

      const student = new Student({
        student_id: id,
        username: username,
        password: securePassword
      });
  
      // Save the student to the database
      await student.save();
  
      res.status(201).json({ message: 'Student registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to register student' });
    }
  });

  router.post('/getstudent', authenticate, async (req, res) => {
    try {
      const userId = req.user.id;
      const user =  await Student.findOne({student_id: userId}).select("-password");
      res.send(user);
    }
    catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  });

  module.exports = router