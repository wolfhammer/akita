// Simple script to verify we can connect to postgres.
// After setting up config/config.development.js:
// # node dbtest.js
// Output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)

var pg = require('pg');
var conf = require('config');

var pgUser = conf.postgres.user;
var pgPass = conf.postgres.pass;
var pgHost = conf.postgres.host;
var pgDb = conf.postgres.db;

var conString = 'postgres://' + pgUser  + ':' + pgPass + '@' + pgHost '/' db;
var client = new pg.Client(conString);
client.connect(function(err) {
	if (err) throw err;
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
  		if (err) throw err;
      console.log(result.rows[0].theTime);
      //
  })
});