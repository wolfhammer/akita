//**** Issue Model ****//
var async = require('async');
var moment = require('moment');
var conf = require('../config');

// We create a connection once when app.js is run
// then pass around the client.
var db = require('../dev/db');
var client = db.client;

//**** Retuns 'numIssues' number of issues beginning with the newest issue ****//
exports.findRecent = function(numIssues, cb) {	
	
	var issueList = [];
	// debugging
	var numIssues = 50;

	// should experiment with a query builder
	var sql = 'SELECT i.issue_id, i.timestamp, date_part(\'epoch\',timestamp) AS js_timestamp, i.author, i.department, ' +
						'i.title, i.description, i.open, i.owner, d.dept_id, ' +
						'd.name AS dpt_name FROM issuetracker_issues i ' +
						'LEFT OUTER JOIN issuetracker_depts d ON d.dept_id = i.department ' +
						'ORDER BY timestamp DESC LIMIT $1';

	// Retrieve issues from db.  node-postgres allows
	// parameterized queries to prevent sql injection attacks.
	// Notice [numIssues] below.
	client.query(sql, [numIssues], function (err, result) {
		if (err) {
			cb(err);
		};
		for (i=0; i<result.rows.length; i++) {
			var d = result.rows[i].js_timestamp;
			result.rows[i].pretty_date = moment.unix(d).fromNow();
		};
		cb('', result.rows);
 	});
};

//**** Retuns a list of departments for forms and such ****//
exports.issueDepts = function(cb) {
	var sql = 'SELECT dept_id, name FROM issuetracker_depts ORDER BY name';
	client.query(sql, function(err, result) {
		if (err) {
			cb(err);
		};
		cb('', result.rows);
	})
}

//**** Returns a single issue.  Requires req.param.issue_id to be a valid INT ****//
exports.get = function(issue_id, cb) {
	var sql = 'SELECT i.issue_id, i.timestamp, date_part(\'epoch\',timestamp) AS js_timestamp, i.author, i.department, ' +
						'i.title, i.description, i.open, i.owner, d.dept_id, ' +
						'd.name AS dpt_name FROM issuetracker_issues i ' +
						'LEFT OUTER JOIN issuetracker_depts d ON d.dept_id = i.department ' +
						'WHERE i.issue_id = $1';

	client.query(sql, [issue_id], function (err, result) {
		if (err) {
			cb(err);
		};
		
		// Prettify the timestamp
		var d = result.rows[0].js_timestamp;
		result.rows[0].pretty_date = moment.unix(d).fromNow();
		cb('', result.rows[0]);
	});
};

//**** Allows a user to assign an issue to themselves ****//
exports.take = function(req, res, issue_id, cb) {
	var taker = req.session.c_id;
	req.assert('taker', 'Invalid taker').notEmpty().isInt();

	var errors = req.validationErrors(true);
	if (errors) {
		res.send('There were errors in the submitted data:' + errors);
	}

	var sql = 'UPDATE issuetracker_issues SET owner = $1 WHERE issue_id = $2'

	client.query(sql, [taker, issue_id], function(err, result) {
		if (err) {
			cb(err)
		};
		cb('', result)
	});
};

//**** Creates a new issue ****//
exports.new = function(req, res, cb) {
	var author = req.session.c_id;
	var department = req.body.department;
	var title = req.body.title;
	var description = req.body.description;
	var open = 't';

	req.assert('author', 'Invalid author').notEmpty().isInt();
	req.assert('title', 'Invalid title').notEmpty();
	req.assert('description', 'Invalid description').notEmpty();

	var errors = req.validationErrors(true);
	if (errors) {
		res.send('There were errors in the submitted data:' + errors);
	}

	var sql = 'INSERT INTO issuetracker_issues (issue_id, timestamp, author, department, title, description, open) VALUES (DEFAULT, DEFAULT, $1, $2, $3, $4, $5)';
	
	client.query(sql, [author, department, title, description, open], function(err, result) {
		if (err) {
			cb(err)
		};
		cb('', result.rowCount);
	})
};

//**** Retuns 'numIssues' number of issues beginning with the newest issue ****//
exports.adopted = function(req, res, cb) {

	// should experiment with a query builder
	var sql = 'SELECT i.issue_id, i.timestamp, date_part(\'epoch\',timestamp) AS js_timestamp, i.author, i.department, ' +
						'i.title, i.description, i.open, i.owner, d.dept_id, ' +
						'd.name AS dpt_name FROM issuetracker_issues i ' +
						'LEFT OUTER JOIN issuetracker_depts d ON d.dept_id = i.department ' +
						'WHERE owner = 5561'
						'ORDER BY timestamp DESC';

	// Retrieve issues from db.  node-postgres allows
	// parameterized queries to prevent sql injection attacks.
	// Notice [numIssues] below.
	client.query(sql, function (err, result) {
		if (err) {
			console.log(err);
			cb(err);
		};
		console.log(result);
		for (i=0; i<result.rows.length; i++) {
			var d = result.rows[i].js_timestamp;
			result.rows[i].pretty_date = moment.unix(d).fromNow();
		};
		cb('', result.rows);
 	});
};