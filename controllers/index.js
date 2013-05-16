// Routing

exports.init = function(app) {

	// auth utility
	var auth = require('../dev/checkauth');

	// load controllers.
	var main = require('./main');
	var issues = require('./issues');

	// main routes
	app.get('/', auth.checkAuth, main.index);

	// issue routes
	app.get('/issues/new', auth.checkAuth, issues.showForm);
	app.get('/issues/adopted', auth.checkAuth, issues.adopted);
	app.get('/issues/:issue_id(\\d+)', auth.checkAuth, issues.viewIssue)
	app.post('/issues/take/:issue_id(\\d+)', auth.checkAuth, issues.take)
	app.post('/issues/new', auth.checkAuth, issues.new);
}

