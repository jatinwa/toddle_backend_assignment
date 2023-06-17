const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const mongoURI = process.env.DATABASE_URL;

const connectToMongo = () => {
    mongoose.connect(mongoURI, { useNewUrlParser: true,useUnifiedTopology: true,
});
console.log("Connected to Mongo successfully");
}

module.exports = connectToMongo;
