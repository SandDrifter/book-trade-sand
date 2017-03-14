/*var User = require('./models/user');
module.exports = function(app, passport){
  app.get('/', function(req, res){
    res.render('index');
  });

app.get('/login', function(req, res){
  res.render('login',{message:req.flash('loginMessage')});
});
app.post('/login', passport.authenticate('local-login',{
  successRedirect:'profile',
  failureRedirect:'login',
  failureFlash:true
}));

app.get('/signup', function(req, res){
  res.render('signup',{message:req.flash('signupMessage')});
});

app.post('/signup', passport.authenticate('local-signup',{
  successRedirect:'/',
  failureRedirect:'/signup',
  failureFlash:true
})
);

app.get('/profile', isLoggedIn, function(req, res){
  res.render('profile.ejs',{user:req.user});
});

//facebook auth
app.get('/auth/facebook',
passport.authenticate('facebook', {scope: ['email']}));

app.get('/auth/facebook/callback',
passport.authenticate('facebook', { failureRedirect: '/' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/profile');
});// end fafebook auth

//Google auth
app.get('/auth/google',
passport.authenticate('google', {scope: ['profile','email']}));

app.get('/auth/google/callback',
passport.authenticate('google', { failureRedirect: '/' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/profile');
});//end google auth


//linking part
app.get('/connect/facebook', passport.authorize('facebook',{scope:'email'}));
app.get('/connect/google', passport.authorize('google',{scope:['profile','email']}));

app.get('/connect/local', function(req, res){
  res.render('connect-local.ejs', {message:req.flash('signupMessage')});
});

app.post('/connect/local', passport.authenticate('local-signup',{
  successRedirect:'/profile',
  failureRedirect:'/connect/local',
  failureFlash:true
}));

//unlink routes
app.get('/unlink/facebook', function(req, res){
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

app.get('/unlink/local', function(req, res){
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

app.get('/unlink/google', function(req, res){
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

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });


};


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }

  res.redirect('/login');
} */
