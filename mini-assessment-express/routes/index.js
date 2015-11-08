var express = require('express');
var router = express.Router();
var models = require('../models'),
	Author = models.Author,
	Book = models.Book,
	Chapter = models.Chapter;

	router.get('/numVisits', function(req,res,next){
	  if (req.session.number===undefined) req.session.number = -1;
	  req.session.number++;
	  console.log('number',req.session.number);
	  res.send({number: req.session.number});
	});

	router.put('/books/:id/chapters/:chapId', function(req, res, next) {
		Book.findById(req.params.id).populate('chapters').then(function(book){
			if(!book.chapters.some(function(chapter){
				return chapter._id == req.params.chapId;
			})){return res.send(404);}
			Chapter.findById(req.params.chapId).then(function(chapter){
				chapter.title = req.body.title;
				chapter.save().then(function(chapter){
					res.status(200).send(chapter);
				});
			});
		});
	});

  router.get('/books/:id/chapters/:chapId',function(req, res, next){
    Book.findById(req.params.id).populate('chapters').exec(function(err,book){
      if (!book) return res.send(404);
			book.chapters = book.chapters.filter(function(chapter){
				return chapter._id == req.params.chapId;
			});
			if (!book.chapters.length) return res.send(404);
      res.status(200).send(book.chapters[0]);
    });
  });

  router.get('/books/:id/chapters', function(req, res, next){
    Book.findById(req.params.id).then(function(book){
      res.send(book.chapters);
    });
  });


  router.post('/books/:id/chapters', function(req, res, next) {
    Book.findById(req.params.id, function (err, book) {
      if (err) return res.status(404).send();
      else {
        book.addChapter(req.body).then(function(chapter){
          res.status(201).send(chapter);
        });
      }
    });
  });

router.get('/books', function(req, res, next) {
  if (req.query.title){
    Book.find({title:req.query.title}).then(function(books){
      res.json(books);
    });
  }
  Book.find({}).then(function(books){
    res.json(books);
  });
});

router.post('/books', function(req, res, next) {
  Book.create(req.body).then(function(book){
    res.status(201).json(book);
  });
});

router.get('/books/:id', function(req, res, next) {
  res.json(req.book);
});

router.put('/books/:id', function(req, res, next) {
  // Book.findByIdAndUpdate( //why no work?
  //   req.params.id, { $set: { title: req.body.title }},
  //   function (err, book) {
  //     if (err) res.status(500).send();
  //     res.send(book);
  //   });
  Book.findById(req.params.id, function (err, book) {
    if (err) return res.status(404).send();
    book.title = req.body.title;
    book.save(function (err) {
      if (err) return handleError(err);
      res.send({title: book.title});
    });
  });
});

router.delete('/books/:id/chapters/:chapId', function(req, res, next) {
	Book.findById(req.params.id).populate('chapters').then(function(book){
		if(!book.chapters.some(function(chapter){
			return chapter._id == req.params.chapId;
		})){return res.send(404);}
		else {
			chapterToDelete = book.chapters.filter(function(chapter){
				return chapter._id == req.params.chapId;
			});
			book.chapters = book.chapters.filter(function(chapter){
				return chapter._id != req.params.chapId;
			});
			book.save();
			Chapter.findByIdAndRemove(chapterToDelete[0]._id).then(function(book){
					return res.send(204);
			});
		}
	});
});

  router.delete('/books/:id', function(req, res, next) {
    Book.findByIdAndRemove(req.params.id).exec(function(err,book){
      if (err) res.send(404);
      else res.send(204);
    }).then(null, next);
});

router.param('id', function(req,res,next,id){
	Book.findById(id).then(function(book){
		req.book = book;
		next();
	});
});

module.exports = router;
