var express = require('express');

var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded());
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/assessjs');
mongoose.connection.on('error', console.error.bind(console, 'MongoDb connection error: '));
var Promise = require("bluebird");
Promise.promisifyAll(mongoose);


var Article = require('../models/article');

/**
 *
 *___ _____ _   ___ _____   _  _ ___ ___ ___
 / __|_   _/_\ | _ \_   _| | || | __| _ \ __|
 \__ \ | |/ _ \|   / | |   | __ | _||   / _|
 |___/ |_/_/ \_\_|_\ |_|   |_||_|___|_|_\___|
 *
 *
 */



router.get('/articles',function (req,res,next){
  Article.find({}).exec(
    function(err,article){
      if(article){
        res.json(article);
      }
      else{
        res.send([]);
      }
    }
  )
})

router.get('/articles/:id',function (req,res,next){


    Article.findOne({_id: req.params.id}).exec(function(err,article){
      if (err){res.status(500)}
      res.json(article)
    })


  })

//      Article.findById(req.params.id, function (err, article) {
//   if (err) return handleError(err);
//
//   article.size = 'large';
//   article.save(function (err) {
//     if (err) return handleError(err);
//     res.send(article);
//   });
// });

router.post('/articles', function(req,res,next){
  // if (req.body.content){
  // Article.create({
  //   title: req.body.title,
  //   content: req.body.content
  // }).then(
  //   function (article){
  //     res.json({article: article, message: 'Created successfully'});
  //   });
  // }
  // else{
  //   res.send(500);
  // }

  //with create and a callback instead of .then
  // if (req.body.content){
  // Article.create({
  //   title: req.body.title,
  //   content: req.body.content
  // }, function (err, article){
  //   if (err) return handleError(err);
  //   res.json({article: article, message: 'Created successfully'});
  // }).then(null,console.log)
  // }
  // else{
  //   res.send(500);
  // }


  //with save instead of create
  // if (req.body.content){
  //   article = new Article(
  //     {
  //       title: req.body.title,
  //       content: req.body.content,
  //     }
  //   );
  //   article.save(function (err,article){
  //     res.json({article: article, message: 'Created successfully'})
  //   })
  // }
  // else {
  //   res.send(500);
  // }

  if (req.body.content){
    article = new Article(
      {
        title: req.body.title,
        content: req.body.content,
      }
    );
    //This will not work without the Async. It will says cannot read property
    //then of undefined
    article.saveAsync().then(function (article){
      //article an array with two elements, one the actual article and the other
      //the num affected - only works with bluebird
      article = article[0];
      res.json({article: article, message: 'Created successfully'})
    })
  }
  else {
    res.send(500);
  }

  })




router.put('/articles/:id', function(req,res,next){
  //   Article.findByIdAndUpdate(req.params.id, { $set: { title: req.body.title }}, function (err, article) {
  //   if (err) return handleError(err);
  //   res.send({article: article, message: 'Updated successfully'});
  // });
  //
  //      Article.findById(req.params.id, function (err, article) {
  //   if (err) return handleError(err);
  //
  //   article.title = req.body.title;
  //   article.save(function (err) {
  //     if (err) return handleError(err);
  //     res.send({article: article, message: 'Updated successfully'});
  //   });
  // });

    Article.findOne({_id:req.params.id}).exec(function(err,article){
      article.title = req.body.title;
      article.save(function(err, article){
        res.send({article: article, message: 'Updated successfully'})
      })
    })

    // Article.find({_id:req.params.id}).exec(function(err,article){
    //   article = article[0];
    //   article.title = req.body.title;
    //   article.save(function(err, article){
    //     res.send({article: article, message: 'Updated successfully'})
    //   })
    // })

})


module.exports = router;
