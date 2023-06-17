const connectToMongo = require('./db');
const express = require('express');
const bodyParser = require('body-parser');

connectToMongo();
const port = 3000
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.use('/api/teacher-signUp', require('./routes/teacher_signUp'))

app.use('/api/student-signUp', require('./routes/student_signUp'))

app.use('/api/teacher-login', require('./routes/teacher_login'))

app.use('/api/student-login', require('./routes/student_login'))

app.use('/api/publish', require('./routes/publish_journal'))

app.use('/api/teacher-feed', require('./routes/teacher_feed'))

app.use('/api/student-feed', require('./routes/student_feed'))

app.use('/api/teacher-data', require('./routes/teacher_signUp'))

app.use('/api/delete-journal', require('./routes/delete_journal'));

app.use('/api/update-journal', require('./routes/update_journal'));

app.listen (port, () => {
    console.log('listening on port  ' + port );
})

