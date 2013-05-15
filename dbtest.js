var pg = require('pg');
var conf = require('config');

var conString = "postgres://postgres:bptdev@localhost/bpt";
var client = new pg.Client(conString);
client.connect(function(err) {
	if (err) throw err;
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
  		if (err) throw err;
      console.log(result.rows[0].theTime);
      //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
  })
});