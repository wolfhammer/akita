var redis = require('redis');
var nconf = require('nconf');
console.log('loaded');
var client = redis.createClient();

client.on("error", function(err) {
	console.log("Error " + err);
})

exports.index = function(req, res, next){
	console.log('test');
	function getSize(obj) {
		var size = 0; 
		var key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) size++;
	    }
	    return size;
	};
	
	function getLatestIssues() {
		client.lrange('newissues', 0, 49, function(err, keys){
			if (err) throw err;
			console.log(keys);

			if (!keys[0]) {
				res.render('index', { latestIssues: "" });
			}

			var latestIssues = [];
			var j = 0;
			var len = getSize(keys);

			function buildItemArry (item) {
				if (err) throw err;
				
				latestIssues.push(item);
				j++;
				if (j == len) {
					console.log(latestIssues);
					res.render('main/index', { latestIssues: latestIssues });
				};
			};

			for (var key in keys) {
				client.hgetall('issues:' + keys[key], function(err, issue){
					if (err) throw err;
					buildItemArry(issue);
				});
			};
		});
	};

	getLatestIssues();
	
};

// exports.findLatest = function(req, res){

// 	function getSize(obj) {
// 		var size = 0; 
// 		var key;
// 	    for (key in obj) {
// 	        if (obj.hasOwnProperty(key)) size++;
// 	    }
// 	    return size;
// 	};
	
// 	function getLatestIssues() {
// 		client.lrange('newissues', 0, 49, function(err, keys){
// 			if (err) throw err;

// 			var items = [];
// 			var j = 0;
// 			var len = getSize(keys);

// 			function buildItemArry (item) {
// 				if (err) throw err;
				
// 				items.push(item);
// 				j++;
// 				if (j == len) {
// 					res.render('openissues', {items: items});
// 				};
// 			};

// 			for (var key in keys) {
// 				client.hgetall('issues:' + keys[key], function(err, issue){
// 					if (err) throw err;
// 					buildItemArry(issue);
// 				});
// 			};
// 		});
// 	};

// 	getLatestIssues();
// };

// exports.findAll = function(req, res){
// 	res.send([{name:"Issue 1"}, {name:"Issue 2"}, {name:"Issue 3"}]);
// };

// exports.findOpenIssues = function(req, res){
// 	client.smembers('issues:open', function(err, data){
// 		if (err) throw err;

// 		var items = [];
// 		var j = 0;
// 		var len = getSize(keys);

// 		function buildItemArry (item) {
// 			if (err) throw err;
			
// 			items.push(item);
// 			j++;
// 			if (j == len) {
// 				res.render('openissues', {items: items});
// 			};
// 		};

// 		for (var i in data) {
// 			client.hgetall('issues:' + data[i], function(err, issue){
// 				if (err) throw err;
// 				buildItemArry(issue);
// 			});
// 		};
// 	});
// };

// exports.findById = function(req, res){
// 	var id =req.params.id;
// 	console.log(id);

// 	client.hgetall('issues:' + id, function(err, issue){
// 		if (err) throw err;
// 		console.log(issue);
// 		res.render('issue', { issue: issue});
// 	})
// };

// exports.takeIssue = function(req, res){
// 	//console.log(req);
// 	var issueId =req.param('issueId');
// 	var uid = req.param('uid');
// 	console.log(uid);
// 	console.log(issueId);

// 	client.sadd('assignee:' + uid, issueId, function(err, data) {
// 		if(err) throw err;
// 		console.log('this: ' + data);
// 		res.send('Success taking issue:' + issueId);
// 	});
// };

// exports.findByAssignee = function(req, res){
// 	var uid = req.params.uid;

// 	function getSize(obj) {
// 		var size = 0; 
// 		var key;
// 	    for (key in obj) {
// 	        if (obj.hasOwnProperty(key)) size++;
// 	    }
// 	    return size;
// 	};

// 	client.smembers('assignee:' + uid, function(err, keys){
// 		if (err) throw err;
// 		//console.log(keys);
// 		var items = [];
// 		var j = 0;
// 		var len = getSize(keys);

// 		function buildItemArry (item) {
// 			if (err) throw err;
			
// 			items.push(item);
// 			j++;
// 			if (j == len) {
// 				console.log(items);
// 				res.render('assigned', {uid: uid, items: items});
// 			};
// 		};

// 		for (var i in keys) {
// 			client.hgetall('issues:' + keys[i], function(err, issue){

// 				if (err) throw err;
// 				console.log(issue);
// 				buildItemArry(issue);
// 			});
// 		};
// 	});
// };



// exports.addIssue = function(req, res){
// 	// Creates new issue in redis data store
// 	var user = req.param('created');
// 	var title = req.param('title');
// 	var dept = req.param('department');
// 	var desc = req.param('description');
// 	var timestamp = new Date();
	
// 	// we have to use a callback to return our issue key
// 	// so we'll use this function to INCR the key
// 	function newIssue(callback) {
// 		client.incr('global:issueKey', function(err, val) {
// 			if (err) throw err;
// 			callback(val)
// 		});
// 	};

// 	// get a unique key for this issue and then HMSET
// 	newIssue(function(key) {
// 		var hashKey = 'issues:' + key;

// 		var issue = {};
// 		// Create new issue object
// 		issue = {
// 			issueId: key,
// 			createdBy: user,
// 			issueDepartment: dept,
// 			issueTitle: title,
// 			issueDescription: desc,
// 			createdOn: timestamp
// 		};

// 		// LPUSH this issue key to newissues list
// 		client.lpush('newissues', key, function(err, res) {
// 			if (err) throw err;
// 			console.log(res);
// 		});

// 		// LTRIM newissues to the last 50 added
// 		// this list will serve to display newest
// 		// issues in the view
// 		client.ltrim('newissues', 0, 50, function(err, res) {
// 			if (err) throw err;
// 			console.log(res);
// 		});
		
// 		// Store the issue object in redis
// 		client.hmset(hashKey, issue, function() {
// 			client.sadd('issues:open', key, function(err, data) {
// 				if(err) throw err;
// 				console.log(data);
// 				res.send('Created new issue: ' + hashKey);
// 			});
			
// 		});
// 	});

// 	// placeholder
// 	exports.updateIssue = function(req, res){
// 		res.render('index');
// 	};

// 	// placeholder
// 	exports.deleteIssue = function(req, res){
// 		res.render('index');
// 	};
// };