var tweetBank = require('../tweetBank');
var db = require('../models/index.js');
module.exports = function (io) {
	var router = require('express').Router();

	router.get('/', function (req, res) {
		// will trigger res.send of the index.html file
		// after rendering with swig.renderFile

		db.Tweet.findAll( {include: [db.User]} ).then(function(tweets){
			res.render('index', {
				showForm: true,
				title: "Some title",
				tweets: tweets
			});

		});




	});



	router.get('/users/:name', function (req, res) {
		db.User.findOne(  {where: {name: req.params.name} ,include: [db.Tweet]}  )
		.then(function(user){
			res.render('index', {
				showForm: true,
				title: req.params.name,
				tweets: user.Tweets,
				theName: req.params.name
			});
		})

	});

	router.get('/users/:name/tweets/:id', function (req, res) {
		var id = parseInt(req.params.id);
		db.User.findOne(  {where: {name: req.params.name, },
		include: [{model : db.Tweet, where: {id : id}}] }  )
		.then(function(user){
			console.log('USER = '+JSON.stringify(user));
		  res.render('index', {title: req.params.name, tweets: user.Tweets})
		})
	});

	router.post('/submit', function (req, res) {
		tweetBank.add(req.body.shenanigans, req.body.text);
		var theNewTweet = tweetBank.list().pop();
		io.sockets.emit('new_tweet', theNewTweet);
		res.redirect('/');
	});
	return router;
};
