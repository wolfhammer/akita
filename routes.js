exports.init = function(app, controllers) {
	app.get('/', controllers.index);
};