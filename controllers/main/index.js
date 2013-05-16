exports.index = function(req, res, next){
	var issues = require('../../models/issues');
	issues.findRecent('50', function(err, data){
		if (err) throw err;
		res.render('main/index', {latestIssues: data, client_name: req.session.client_name});	
	});
};