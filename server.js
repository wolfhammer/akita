// Load 3rd party modules
var nconf = require('nconf');
var express = require('express');
var app = express();

var ejs = require('ejs');
ejs.open = '<?';
ejs.close = '?>';

// Load our configuration and routes
var conf = require('./config');
var routes = require('./routes');

// log requests
app.use(express.logger('dev'));

// static files
app.use(express.static(__dirname + '/public'));

// views
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// environments
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
app.get('/', routes.index);
app.get('/api/latest', routes.findLatest);
app.get('/issues/open', routes.findLatest);
app.post('/issues/take/:uid/:issueId', routes.takeIssue);
app.get('/issues/assigned/:uid', routes.findByAssignee);
//app.get('/api/issues', routes.findAll);
app.get('/issues/:id', routes.findById);
app.post('/api/issues', routes.addIssue);
//app.put('/api/issues/:id', routes.updateIssue);
//app.delete('/api/issues/:id', routes.deleteIssue);

//app.get('*', function(req, res){
//	res.send(404);
//});

app.listen(nconf.get('http:port'));