const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
  name:{
    type:String,
    required:true,
  }, 
  password:{
    type:String,
    required:true
  },
  content:{
    type:String,
    required:true
  },
  regdate:{
    type:Date,
    default:getDate(Date.now())
  }
})



function getDate (dateObj){
  if (dateObj instanceof Date)
    return (
      dateObj.getFullYear() +
      '-' +
      get2digits(dateObj.getMonth() + 1) +
      '-' +
      get2digits(dateObj.getDate())
    );
};

function get2digits(num){
  return ("0" + num).slice(-2);
}

const Reply = mongoose.model('reply', ReplySchema);
module.exports = Reply;