'use strict';

const opn = require('opn');
const transomServerFunctions = require('@transomjs/transom-server-functions');
const Transom = require('@transomjs/transom-core');

const transom = new Transom();


const myApi = require('./myApi');
console.log("Running " + myApi.name);


// Register my TransomJS server functions plugin.
transom.configure(transomServerFunctions);


// Initialize my TransomJS API metadata.
transom.initialize(myApi).then(function (server) {

	// Render a simple Welcome page with some valid URL examples
	server.get('/', function (req, res, next) {
		const links = [
			'/api/v1/fx/timesten?val=123',
			'/api/v1/fx/timesten?val=45',
			'/api/v1/fx/hello'
		];

		let html = '<html><h1>Try these GET request URLs.</h1>';
		for (var i = 0; i < links.length; i++) {
			html += `<li><a href="${links[i]}" target="_blank">${links[i]}</a></li>`;
		}
		html += `</html>`;

		res.writeHead(200, {
			'Content-Type': 'text/html'
		});
		res.end(html);
	});

	// ****************************************************************************
	// Handle 404 errors when a route is undefined.
	// ****************************************************************************
	server.get('/.*', function (req, res, next) {
		var err = new Error(req.url + " does not exist");
		err.status = 404;
		next(err);
	});

	// ****************************************************************************
	// Handle Errors within the app as our last middleware.
	// ****************************************************************************
	server.use(function (error, req, res, next) {
		console.error("Error handler", error);
		var data = {};
		data.error = error;
		res.statusCode = error.status || 501;
		res.send(data);
	});

	// ****************************************************************************
	// Start the Transom server...
	// ****************************************************************************
	server.listen(7070, function () {
		console.log('%s listening at %s', server.name, server.url);
		opn(server.url);
	});
});

// ****************************************************************************
// Handle uncaught exceptions within your code.
// ****************************************************************************
process.on('uncaughtException', function (err) {
	console.error('Really bad Error!', err);
});

// ****************************************************************************
// Handle uncaught rejections within your code.
// ****************************************************************************
process.on('unhandledRejection', function (err) {
	console.error('unhandledRejection', err);
});
