var express = require('express');
var validator = require('express-validator');
var app = module.exports = express();


var RedisStore = require('connect-redis')(express);
var redis = require('redis');

var db = require('./dev/db');
db.connect(function(err){
	if (err) {
		console.log('Error connecting to postgres:');
		console.log(err);
	};
	console.log('Successfully connected to postgres!')
});

app.use(validator);

// SETTINGS

// Load config file
var conf = require('./config');

// EJS default is <% %> but we like question marks
var ejs = require('ejs');
ejs.open = '<?';
ejs.close = '?>';

// static files
app.use(express.static(__dirname + '/public'));

// set views for error and 404 pages
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// define a custom res.message() method
// which stores messages in the session
app.response.message = function(msg) {
	// reference 'req.session' via the 'this.req' reference
	var sess = this.req.session;
	// simply add the msg to an array for later
	sess.messages = sess.messages || [];
	sess.messages.push(msg);
	return this;
}

// log
if (!module.parent) app.use(express.logger('dev'));

// session support
app.use(express.cookieParser());
app.use(express.session({
	secret: 'secret'
}));

app.use(express.query());

// parse request bodies (req.body)
app.use(express.bodyParser());

// support _method (PUT in forms etc)
app.use(express.methodOverride());

// expose the "messages" local variable when views are rendered
app.use(function(req, res, next){
	var msgs = req.session.messages || []

	// expose "messages" local variable
	res.locals.messages = msgs;

	// expose "hasMessages"
	res.locals.hasMessages = !! msgs.length;

	next();
	// flush messages
	req.session.messages = [];
});

// environments
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// load controllers
//var controllers = require('./controllers');

// map controllers and routes
var routes = require('./controllers').init(app);

// assume "not found" in the error msgs
// is a 404. this is somewhat silly, but
// valid, you can do whatever you like, set
// properties, use instanceof etc.
app.use(function(err, req, res, next){
  // treat as 404
  if (~err.message.indexOf('not found')) return next();

  // log it
  console.error(err.stack);

  // error page
  res.status(500).render('5xx');
});

// assume 404 since no middleware responded
app.use(function(req, res, next){
  res.status(404).render('404', { url: req.originalUrl });
});

// serve static files
app.use(express.static(__dirname + '/public'));

if (!module.parent) {
	var port = conf.http.port;
	app.listen(port);
	console.log('\n listening on port' + port + '\n');
}