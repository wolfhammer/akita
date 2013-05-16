// Issue Controller
exports.showForm = function(req, res, next){
	var issues = require('../models/issues');
	issues.issueDepts(function(err, data){
		if (err) throw err;
		res.render('issues/issueform', {depts: data, client_name: req.session.client_name});	
	})
};

exports.viewIssue = function(req, res, next){
	console.log(req.params);
	var issue_id = req.params.issue_id;
	var issues = require('../models/issues');
	issues.get(issue_id, function(err, data){
		if (err) throw err;
		console.log(data);
		res.render('issues/issue', {issue: data, author_name: req.session.client_name});
	});
};

exports.new = function(req, res, next){
	var issues = require('../models/issues');
	issues.new(req, res, function(err){
		if (err) throw err;
		issues.findRecent('50', function(err, data){
			if (err) throw err;
			res.render('main/index', {latestIssues: data, client_name: req.session.client_name});
		});
	});
};

exports.take = function(req, res, next){
	var issues = require('../models/issues');
	var issue_id = req.params.issue_id;
	issues.take(req, res, issue_id, function(err){
		if (err) throw err;
		res.send('Issue successfully taken');
	})
};

exports.adopted = function(req, res, next){
	var issues = require('../models/issues');
	//var uuid = req.session.client_id;
	issues.adopted(req, res, function(err, data) {
		if (err) throw err;
		res.render('issues/adopted', {issues: data});
	});
};