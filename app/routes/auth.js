var User = require('../models/user');
module.exports = function(router, passport){
  //localhost:8080/auth
  router.get('/', function(req, res){
    res.render('pages/bookIndex.ejs',{NavMenu:'menu-index'});
  });
  //localhost:8080/auth/login
router.get('/login', function(req, res){
  res.render('login',{message:req.flash('loginMessage')});
});
router.post('/login', passport.authenticate('local-login',{
  successRedirect:'profile',
  failureRedirect:'login',
  failureFlash:true
}));
  //localhost:8080/auth/signup
router.get('/signup', function(req, res){
  res.render('signup',{message:req.flash('signupMessage')});
});

router.post('/signup', passport.authenticate('local-signup',{
  successRedirect:'/',
  failureRedirect:'/signup',
  failureFlash:true
})
);

// router.get('/profile', isLoggedIn, function(req, res){
//   res.render('profile.ejs',{user:req.user});
// });

//facebook auth
router.get('/facebook',
passport.authenticate('facebook', {scope: ['email']}));

router.get('/facebook/callback',
passport.authenticate('facebook', { failureRedirect: '/' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/profile');
});// end fafebook auth

//Google auth
router.get('/google',
passport.authenticate('google', {scope: ['profile','email']}));

router.get('/google/callback',
passport.authenticate('google', { failureRedirect: '/' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/profile');
});//end google auth


//linking part
router.get('/connect/facebook', passport.authorize('facebook',{scope:'email'}));
router.get('/connect/google', passport.authorize('google',{scope:['profile','email']}));

router.get('/connect/local', function(req, res){
  res.render('connect-local.ejs', {message:req.flash('signupMessage')});
});

router.post('/connect/local', passport.authenticate('local-signup',{
  successRedirect:'/profile',
  failureRedirect:'/connect/local',
  failureFlash:true
}));

//unlink routes
router.get('/unlink/facebook', function(req, res){
  var user = req.user;

  user.facebook.token = null;

  user.save(function(err){
    if(err){
      throw err;
    }else{
      res.redirect('/profile');
    }
  });
});

router.get('/unlink/local', function(req, res){
  var user = req.user;
  user.local.username = null;
  user.local.password = null;

  user.save(function(err){
    if(err){
      throw err;
    }else{
      res.redirect('/profile');
    }
});
});

router.get('/unlink/google', function(req, res){
  var user = req.user;
  user.google.token = null;

  user.save(function(err){
    if(err){
      throw err;
    }else{
      res.redirect('/profile');
    }
});
});

  router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  router.get('/loginPage', function(req, res){
    res.render('index');
  });

};
