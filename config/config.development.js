var config = module.exports = {};

config.env = 'development';

config.http = {};
config.http.host = '127.0.0.1';
config.http.port = '8080';

config.redis = {};
config.redis.host = '127.0.0.1';
config.redis.port = '6379';

config.postgres = {};
config.postgres.user = 'postgres';
config.postgres.pass = 'bptdev';
config.postgres.host = 'localhost';
config.postgres.port = '';
config.postgres.db = 'bpt';

config.user = {};
config.user.c_id = '5561';
config.user.client_name = 'River';