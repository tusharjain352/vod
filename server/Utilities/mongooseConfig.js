var mongoose = require('mongoose');
mongoose.set('debug', true);

var config = require('./config').config;

module.exports = function () {
	// console.log("config db----",config);
	var db = mongoose.connect('mongodb://'+config.DB_URL.host+"/"+config.DB_URL.database);

	require('../Models/User');
	
	return db;
};
