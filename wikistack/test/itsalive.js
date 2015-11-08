var chai = require('chai');
var spies = require('chai-spies');
var expect = chai.expect;
var Page = require('../models').Page;
chai.use(spies);
var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/wikistack');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'mongodb connection error:'));
var page;
var page2;
beforeEach(function() {

    Page.remove(function(err, page){
      Page.find({title: 'Page 1'} );
    });

    Page.remove(function(err, page){
      Page.find({title: 'Page 2'});
    });

    page = new Page({
      url_name: "http://google.com",
      owner_id:   "1",
      body: "body",
      date: new Date(),
      status: 3,
      tags: ['tag1', 'tag2']
    });

    page2 = new Page({
      body: "body",
      title: "Page 2",
      tags: ['tag3', 'tag4']
    });
});


describe('Models', function () {

    describe('Validation', function (done) {
        it('rejects a page without a title', function () {
          page.validate(function(err, result, numAffected){
            expect(err.errors).to.have.property('title');
            done();
          });
        });
    });

    describe('Statics', function () {
      it('finds by tag' , function (done) {
        page.title = "Page 1";

        page.save().then(function(){
          return page2.save();
        }).then(function(){
          Page.findByTag("tag3", function(err, pages){
            expect(pages).to.have.length(1);
            done();
          });
        });
      });

      it('shouldnt find pages with a nonexistent tag' , function (done) {
        page.title = "Page 1";
        page.save().then(page2.save()).then(
          Page.findByTag('poop', function(err, pages){
            expect(pages).to.have.length(0);
            done();
          })
        );
      });
    });

    describe('Methods',function() {
      it('computes url name', function(done){
        page2.computeUrlName();
        expect(page2.urlName).to.be('page_2');
      })
    })
});
//describe('A different category', function () {});

/*what to test

-it connects to the database

models
-pageSchema should have the following props of the right data types
-pageSchema should have a comuteUrlName function that returns
a url for a given title
-we shouldn't be able to save a title with a length < 0
-pageSchema should have a virtual that returns the full route for a url name
-pageSchema should have a .getSimilar method that finds elements with matching tags
-pageSchema should have a .findByTag method that finds all pages with a given tag

-userSchema
  -should have name and email properites
  -name property should have a first and last property






Homepage:
-should show the title as Wikistack
-should access the database and list the pages
  -expect (some page) to be listed on the home page
-Should list the right number of pages
  -expect all pages to be listed



Users Page:


Add a Page Page:





*/



















// describe('Testing suite capabilities', function () {
//     it('confirms basic arithmetic', function () {
//         expect(2+2).to.equal(4);
//     });
//     it('confirms setTimeout\'s timer accuracy', function (done) {
//         var start = new Date();
//         setTimeout(function () {
//             var duration = new Date() - start;
//             expect(duration).to.be.closeTo(1000, 50);
//             done();
//         }, 1000);
//     });
//     it("does a thing for each thing", function(){
//       var arr = [1,2,3];
//       function theFunction(elem){
//         elem+=1;
//       }
//       var spy = chai.spy(theFunction);
//       arr.forEach(spy);
//       expect(spy).to.have.been.called.exactly(arr.length);
//     });
// });
