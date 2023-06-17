const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const Teacher = require('./models/Teacher');

const app = express();
app.use(bodyParser.json());

const mongoURI = 'mongodb+srv://jatinwatts8:uBtrfss6PXD7x4zu@cluster0.hubsfwk.mongodb.net/';

const connectToMongo = () => {
    mongoose.connect(mongoURI, { useNewUrlParser: true,useUnifiedTopology: true,
});
console.log("Connected to Mongo successfully");
}

module.exports = connectToMongo;
