var pg = require('pg');
var conf = require('../config');

var pgUser = conf.postgres.user;
var pgPass = conf.postgres.pass;
var pgHost = conf.postgres.host;
var pgDb = conf.postgres.db;

var conString = 'postgres://' + pgUser  + ':' + pgPass + '@' + pgHost + '/' + pgDb;

module.exports.connect = function(cb) {
	var client = new pg.Client(conString);

	client.connect(function(err) {
	  if(err){
	     cb(err);
	     process.exit(1);
	  }

	  module.exports.client = client;
	  cb();
	});
};