'use strict';

var router = require('express').Router();
var _ = require('lodash');

var Thing = require('./thing.model');
var HttpError = require('../../utils/HttpError');

router.param('id', function (req, res, next, id) {
	Thing.findById(id).exec()
	.then(function (thing) {
		if (thing) {
			req.thing = thing;
			next();
		} else {
			throw HttpError(404);
		}
	})
	.then(null, next);
});

router.get('/', function (req, res, next) {
	Thing.find({}).exec()
	.then(function (things) {
		res.json(things);
	})
	.then(null, next);
});

router.get('/:id', function (req, res, next) {
	res.json(req.thing);
});

router.post('/', function (req, res, next) {
	Thing.create(req.body)
	.then(function (thing) {
		res.status(201).json(thing);
	})
	.then(null, next);
});

router.put('/:id', function (req, res, next) {
	delete req.body._id;
	_.extend(req.thing, req.body);
	req.thing.save()
	.then(function (updatedThing) {
		res.json(updatedThing);
	})
	.then(null, next);
});

router.delete('/:id', function (req, res, next) {
	req.thing.remove()
	.then(function () {
		res.status(204).end();
	})
	.then(null, next);
});

module.exports = router;