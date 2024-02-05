// models/User.js

const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  background: { type: String, required: true},
  createAt: { type: Date, default: Date.now() },
});


const Board = mongoose.model('Board', boardSchema);

module.exports = Board;