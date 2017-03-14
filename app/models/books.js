var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
      "id": String,
      "name": String,
      "author":String,
      "imgUrl":String,
      "owner": String,
      "onTrade": Boolean,
      "tradingWith": String
});



module.exports = mongoose.model('books', bookSchema);
