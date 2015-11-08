'use strict';

var mongoose = require('mongoose');

var db = require('../../db');

var Thing = new mongoose.Schema({
	name: String,
	isCool: {
		type: Boolean,
		default: true
	}
});

module.exports = db.model('Thing', Thing);