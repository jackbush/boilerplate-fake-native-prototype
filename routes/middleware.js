var path = require('path');
var express = require('express');
var morgan = require('morgan');
var sampleContent = require('../sampleContent');

// Log things!
exports.logger = function () {
	return morgan('dev');
};

// Set a random-ish expire time, to force a hard relaod when we redeploy
exports.randomExpire = function () {
	return express.static(path.join(__dirname, '../public'), {
		maxAge: ~~(Math.random() * 123456789) + 1000000
	});
};

// Initialise view options
exports.viewConfig = function (req, res, next) {
	var isXhr = req.headers.xhr === 'true';
	res.locals.viewConfig = {
		header: true,
		nav: true,
		navItems: [{
			name: 'Home',
			path: '/'
		}],
		isomorphic: isXhr,
		isLogin: false
	};
	next();
};

// Load sample content
exports.sampleContent = function (req, res, next) {
	res.sampleContent = sampleContent;
	next();
};
