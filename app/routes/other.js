module.exports = function(router, passport){
var mongoose = require('mongoose');
var Books            = require('../models/books');

router.get('/books', function(req, res){
  Books.find({ "onTrade": false}, function(err, books){
    if(err){
    throw err;
    //return done(err);
  }

    //  console.log(books);
  res.render('pages/books',{NavMenu:'menu-books',books:books});
});
});// /books end

}//module exports end
