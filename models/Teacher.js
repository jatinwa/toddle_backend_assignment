const mongoose = require('mongoose');
const Schema = mongoose.schema; 

const teacherSchema = new mongoose.Schema({
  teacher_id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;