const Teacher = require('../models/Teacher');
const express = require('express');
const router = express.Router();
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if the teacher exists
      const teacher = await Teacher.findOne({ username });
      if (!teacher) {
        return res.status(404).json({ error: 'Teacher not found' });
      }
  
      // Check if the password matches

      const isValid = await bcrypt.compare(password, teacher.password);
      if (!isValid) {
        return res.status(401).json({ error: 'Incorrect password' });
      }
  
      // Generate a JWT
      const data = {
        user:{
          id: teacher.teacher_id
        }
      }

      const JWT_SECRET = 'jaajnvc#oui@bs3df';
      const token = jwt.sign(data, JWT_SECRET);
    
      res.json({token});
    } catch (error) {
      res.status(500).json({ error: 'Failed to log in' });
      console.error(error.message);
    }
  });
  
module.exports = router