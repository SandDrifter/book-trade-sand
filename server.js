var express = require('express');
var app = express();
app.set('port',process.env.PORT || 8080);
//var port = process.env.PORT || 8080;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');

var configDB = require('./config/databse.js');
const MongoStore = require('connect-mongo')(session);
mongoose.connect(configDB.url);
require('./config/passport')(passport);

//middleware
app.use(express.static(__dirname + '/app/public'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret:'anystringtest',
saveUninitialized:true,
resave:true,
store:new MongoStore({mongooseConnection: mongoose.connection,
ttl:2*24*60*60})
}));


app.use(passport.initialize());//starts passport
app.use(passport.session());//passport uses previous session info..?
app.use(flash());

//setting view engine
app.set('view engine', 'ejs');
//setting up routes
var auth = express.Router();
auth.use(express.static(__dirname + '/app/public'));
require('./app/routes/auth.js')(auth, passport);
app.use('/auth',auth);

//my custom
var other = express.Router();
other.use(express.static(__dirname + '/app/public'));
require('./app/routes/other.js')(other, passport);
app.use('/other', other);
//my custom end

var secure = express.Router();
secure.use(express.static(__dirname + '/app/public'));
secure.use(bodyParser.urlencoded({extended: false}));
require('./app/routes/secure.js')(secure, passport);
app.use('/', secure);



//require('./app/routes.js')(app, passport);



app.listen(app.get('port'),function(){
  console.log('listenning on port:'+app.get('port'));
});
