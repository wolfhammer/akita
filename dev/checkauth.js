exports.checkAuth = function(req, res, next) {
	if (!req.session.c_id) {
  	if (!req.query["auth"]) {
    	res.redirect('http://107.0.77.197/betalogin?redir=akita');
  	} else {
  		
  		var client = require('redis').createClient();
  		
  		client.hgetall('session:' + req.query["auth"], function(err, data){
  			if (data === 0) {
  				res.redirect('http://107.0.77.197/betalogin?redir=akita');
  			} else {
  				req.session.c_id = data.uid;
  				req.session.client_name = data.client_name;
  				next();
  			}
  		});
  	
  	}
  } else {
    next();
  }
};