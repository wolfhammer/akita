var fs = require('fs');
var nconf = require('nconf');

// Favor command-line arguments and environment variables
nconf.argv()
		 .file('settings.json')
		 .env();