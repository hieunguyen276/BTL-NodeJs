// server.js
const express = require('express');
var bodyParser = require('body-parser')
const API_V1 = require('./routes/v1');
const errorHandle = require('./middlewares/errorHandler');
const db = require('./configs/mongodb');

// Connect to DB
db.connect();

require('dotenv').config()


const app = express();
const port = 3000;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/uploads', express.static('uploads'))

// sử dụng app.use để định nghĩa routes trong server
app.use('/v1', API_V1);
app.use(errorHandle)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});