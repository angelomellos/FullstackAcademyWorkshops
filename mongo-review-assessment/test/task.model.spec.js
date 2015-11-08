var helper = require('./helper')
  , expect = require('chai').expect
  , models = require('../models')
  , Task = models('Task')

/**
 * Start here
 *
 * These tests describe the model that you'll be setting up in models/task.model.js
 *
 */

describe('Task', function () {
  //clear the database before the tests
  before(function(done) {
    helper.clearDb().then(function() {
      done()
    }, done)
  })

  describe('Virtuals', function() {
    describe('timeRemaining', function() {
      it('returns the Infinity value if task has no due date', function() {
        var task = new Task()
        expect(task.timeRemaining).to.equal(Infinity)
      })

      it('returns the difference between due date and now', function() {
        //oneDay is a day expressed in milliseconds
        var oneDay = 1000 /*ms*/ * 60 /*s*/ * 60 /*m*/ * 24 /*h*/

        //create a task due tomorrow
        var task = new Task({
          //this function returns a date one day in the future
          due: helper.dates.tomorrow()
        })

        expect(task.timeRemaining).to.be.closeTo(oneDay, 10) //should be within 10 ms
      })
    })

    describe('overdue', function() {
      it('is overdue if the due date is in the past', function() {
        var task = new Task({
          due: helper.dates.yesterday()
        })
        expect(task.overdue).to.be.true
      })

      it('is not overdue if the due date is in the past but complete is true', function() {
        var task = new Task({
          due: helper.dates.yesterday(),
          complete: true
        })
        expect(task.overdue).to.be.false
      })

      it('is not overdue if the due date is in the future', function() {
        var task = new Task({
          due: helper.dates.tomorrow()
        })
        expect(task.overdue).to.be.false
        task = new Task({
          due: helper.dates.tomorrow(),
          complete: true
        })
        expect(task.overdue).to.be.false
      })
    })
  })


  describe('methods', function() {
    var task

    beforeEach(function(done) {
      task = new Task({
        name: 'task'
      })
      task.save(done)
    })

    describe('addChild', function() {
      it('should return a promise for a new task with the parent\'s id', function(done) {
        task
          .addChild({ name: 'task2' })
          .then(function(child) {
            expect(child).to.be.an.instanceOf(Task)
            expect(child.parent).to.equal(task._id)
            expect(child.name).to.equal('task2')
            done()
          })
          .then(null, done) //catch test errors
      })
    })

    describe('getChildren', function() {

      beforeEach(function(done) {
        task.addChild({ name: 'foo' }).then(function() {
          done()
        }, done)
      })

      it('should a promise for an array of the tasks children', function(done) {
        task
          .getChildren()
          .then(function(children) {
            expect(children).to.have.lengthOf(1);
            expect(children[0]).to.be.an.instanceOf(Task);
            expect(children[0].name).to.equal('foo');
            done();
          })
          .then(null, done); //catch test errors
      });
    });

    describe('getSiblings', function() {

      var childrenReferences = []

      var childBuilder = function(done) {
        task.addChild({ name: 'foo' }).then(function(child) {
          childrenReferences.push(child)
          done()
        }, done)
      }

      //build two children
      beforeEach(childBuilder)
      beforeEach(childBuilder)

      it('returns a promise for an array of siblings', function(done) {
        childrenReferences[0]
          .getSiblings()
          .then(function(siblings) {
            expect(siblings).to.have.lengthOf(1)
            expect(siblings[0]).to.be.an.instanceOf(Task)
            expect(siblings[0].id).to.equal(childrenReferences[1].id)
            done()
          })
          .then(null, done)
      })

    })

  })

});
