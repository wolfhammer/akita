// originally went with routes being created dynamically
// using regex but I much prefer the ease of reading explicit
// routes.  with explicit routes its also incredibly easy to
// inject middleware:
//
// var middleware = require('middleware');
//
// app.get('/', middleware.doStuff, main.index);
exports.init = function(app) {

	// auth utility
	var auth = require('../dev/checkauth');

	// load controllers.
	var main = require('./main');

	// map routes
	app.get('/', auth.checkAuth, main.index);
}