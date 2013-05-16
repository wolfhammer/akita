var conf = require('../config');
var client = require('redis').createClient();

// This is a module in development that will verify a user is authenticated.
// If they aren't they will be redirected to the beta login.  Also supports
// using a dummy account when the development environment is being used.
exports.checkAuth = function(req, res, next) {

	if (process.env.NODE_ENV === "development") {
		req.session.c_id = conf.user.c_id;
		req.session.client_name = conf.user.client_name;
	};

	if (!req.session.c_id) {
  	if (!req.query["auth"]) {
    	res.redirect('http://107.0.77.197/betalogin?redir=akita');
  	} else {
  		client.hgetall('session:' + req.query["auth"], function(err, data){
  			if (data === 0) {
  				res.redirect('http://107.0.77.197/betalogin?redir=akita');
  			} else {
  				req.session.c_id = data.uid;
  				req.session.client_name = data.client_name;
  				next();
  			}
  		});
  	};
  } else {
    next();
  };
};