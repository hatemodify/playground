const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  author: {
    type: String,
    default: '관리자'
  },
  tit: {
    type: String
  },
  cont: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Board = mongoose.model('board', BoardSchema);
module.exports = Board;
