module.exports = function(router, passport){
var Books            = require('../models/books');
var User            = require('../models/user');

  router.use(function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    console.log("req path:" + req.path);
    if(req.path ="/myBooks"){
      res.redirect('/auth/loginPage');
    }else{
    res.redirect('/auth');
  }
  // console.log('inside secure.js top function');
  //   res.redirect('/');
  });

  router.get('/profile', function(req, res){
    res.render('profile.ejs',{user:req.user, NavMenu:'menu-login'});
  });

  router.get('/myBooks', function(req, res){
    console.log(req.user.id);
    Books.find({ "owner":  req.user.id}, function(err, books){
      if(err){
        return done(err);
      }
    console.log(books);
    Books.find({ "owner":  req.user.id,"onTrade":true}, function(err, booksOnTrade){
      if(err){
        return done(err);
      }
    console.log(booksOnTrade);
    res.render('pages/myBooks',{NavMenu:'menu-myBooks', books:books, booksOnTrade:booksOnTrade});
    });

  });
  //  res.render('pages/myBooks.ejs',{NavMenu:'menu-myBooks'});
  });
  router.post('/myBooks', function(req, res){
    console.log("********post myBooks*******\n" + req.user.id);
    console.log(req.body.bName);
    //res.render('pages/myBooks',{NavMenu:'menu-myBooks',books:books});
    var newBook = new Books();
    var rngNum = Math.floor((Math.random() * 1000000) + 1);
    var rngNumStr = rngNum.toString();
    newBook.id = rngNumStr;
    newBook.name = req.body.bName;
    newBook.author = req.body.bAuthor;
    newBook.imgUrl = req.body.bImgUrl;
    newBook.owner =  req.user.id;
    newBook.onTrade = false;
    newBook.tradingWith = "null";
    newBook.save(function(err){
      if(err)
        throw err;
      res.redirect('/myBooks');
    })
  });

  router.post('/myBooksDelete', function(req, res){
    console.log("delete:" + req.query.bookId);
    var numStr = req.query.bookId.toString();
    Books.findOne({ id: numStr }, function(err, book){
      if(err){
        throw err;
      }
      book.remove();
      console.log('book deleted from the databse');
    //  res.send('smth');
      res.send('book deleted');
    });
  });

  router.post('/booksTrade',function(req, res){
    console.log("trade:" + req.query.bookId);
    var numStr = req.query.bookId.toString();
    Books.findOne({ id: numStr }, function(err, book){
      if(err){
        throw err;
      }
      book.onTrade = true;
      book.tradingWith =req.user.id;
      book.save();
      res.redirect('/other/books');
    });
  });

router.post('/myBooksDecline', function(req, res){
  console.log("decline:" + req.query.bookId);
  var numStr = req.query.bookId.toString();
  Books.findOne({ id: numStr }, function(err, book){
    if(err){
      throw err;
    }
    book.onTrade = false;
    book.tradingWith ="null";
    book.save();
    res.redirect('/myBooks');
  });
});

router.post('/profileUpdate', function(req, res){
  console.log("********Profile Updated***********" );
  console.log( "req.user.id"+req.user.id);
  var num2 = req.user.id;
  var num2Str = num2.toString();
  User.findById(req.user.id, function(err, user){
    if(err){
      throw err;
    }
    console.log(user);
    console.log( " req.body.name:"+req.body.profileName);
    user.name = req.body.profileName;
    user.city = req.body.city;
    user.state = req.body.state;
    user.save();
    res.redirect('/profile');
  });
});

router.get('/*', function(req, res){
  res.redirect('/profile');
});

}
