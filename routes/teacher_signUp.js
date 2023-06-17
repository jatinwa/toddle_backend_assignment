const Teacher = require('../models/Teacher');
const express = require('express');
const router = express.Router();
const app = express();
const { v1:uuidv1 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticate = require('../middleware/authenticate');

const id = uuidv1();

router.post('/', async (req, res) => {
    try {
      const { username, password } = req.body;

      // Check if the teacher_id is already registered
      const existingTeacher = await Teacher.findOne({ username });
      if (existingTeacher) {
        return res.status(409).json({ error: 'username already exists' });
      }

      
      const securePassword = await bcrypt.hash(password, 10);

      const teacher =  new Teacher({
        teacher_id: id,
        username: username,
        password: securePassword
      });

      await teacher.save();

      const data = {
        user:{
          id: teacher.teacher_id
        }
      }

      const JWT_SECRET = 'jaajnvc#oui@bs3df';
      const token = jwt.sign(data, JWT_SECRET);
    
      res.json({token: token });
       
      res.status(201).json({ message: 'Teacher registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to register teacher' });
      console.log(error);
      console.log(error.message);
    }
  });
  

  router.post('/getteacher', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const user =  await Teacher.findOne({teacher_id: userId}).select("-password");
    res.send(user);
  }
  catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error");
  }
  });

  module.exports = router