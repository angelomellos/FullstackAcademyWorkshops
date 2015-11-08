'use strict';

var chance = require('chance')(123),
	_ = require('lodash'),
	Promise = require('bluebird');

var db = require('./server/db');
var Thing = require('./server/api/things/thing.model');

var numThings = 10;

function randThing () {
	return new Thing({
		name: chance.word(),
		isCool: chance.word()
	});
}

function generateAll () {
	return _.times(numThings, randThing);
}

function seed () {
	var things = generateAll();
	return Promise.map(things, function (thing) {
		return thing.save();
	});
}

db.drop = Promise.promisify(db.db.dropDatabase.bind(db.db));

db.on('open', function () {
	db.drop()
	.then(function () {
		return seed();
	})
	.then(function () {
		console.log('Seeding successful');
	}, function (err) {
		console.error('Error while seeding');
		console.error(err.stack);
	})
	.then(function () {
		process.exit();
	});
});