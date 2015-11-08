'use strict';
/* globals module inject chai */
var expect = chai.expect;

describe('`Todo` factory', function () {

  /*------------------
      CONFIGURATION
  /------------------*/

  // load our Angular application from scratch
  beforeEach(module('angularAssessment'));

  // the `Todo` factory will be loaded before each test
  // $httpBackend lets us "stub" $http responses
  var Todo, $httpBackend;
  beforeEach(inject(function ($injector) {
    Todo = $injector.get('Todo');
    $httpBackend = $injector.get('$httpBackend');
  }));
  // checks that $httpBackend received and handled all expected calls
  afterEach(function(){
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });

  /*------------------
      TEST SPECS
  /------------------*/

  it('`.getOne` fetches a backend todo by id', function (done) {
    $httpBackend
      .expect('GET', '/api/todos/xyz123')
      .respond(200, {title: 'Thing'});
    Todo.getOne('xyz123')
      .then(function (todo) {
        expect(todo.title).to.equal('Thing');
        done();
      })
      .catch(done);
    $httpBackend.flush();
  });

  it('`.getAll` fetches all backend todos', function (done) {
    $httpBackend
      .expect('GET', '/api/todos')
      .respond(200, [{}, {}, {}, {}]);
    Todo.getAll()
      .then(function (todos) {
        expect(todos).to.have.length(4);
        done();
      })
      .catch(done);
    $httpBackend.flush();
  });

  it('`.destroy` deletes an existing backend todo', function (done) {
    $httpBackend
      .expect('DELETE', '/api/todos/abc123')
      .respond(204);
    Todo.destroy('abc123')
      .then(function(){ done(); })
      .catch(done);
    $httpBackend.flush();
  });

  it('`.add` creates a new backend todo', function (done) {
    $httpBackend
      .expect('POST', '/api/todos')
      .respond(201, {_id: '123', title: 'ThingX'});
    Todo.add({title: 'ThingX'})
      .then(function (todo) {
        expect(todo._id).to.equal('123');
        done();
      })
      .catch(done);
    $httpBackend.flush();
  });

  it('`.update` updates an existing backend todo', function (done) {
    $httpBackend
      .expect('PUT', '/api/todos/def123')
      .respond(200, {_id: 'def123', complete: true});
    Todo.update('def123', {complete: true})
      .then(function (todo) {
        expect(todo.complete).to.equal(true);
        done();
      })
      .catch(done);
    $httpBackend.flush();
  });

  /*------------------
      EXTRA CREDIT
  /------------------*/

  // NOTE: this extra credit section is a bit tricky and is intended
  // as an extra challenge AFTER you have already completed the rest
  // of the assessment. If you want to try it, change `xdescribe` to
  // `describe`.

  xdescribe('cached todo list', function () {

    var cachedTodos;
    beforeEach(function (done) {
      $httpBackend
        .when('GET', '/api/todos')
        .respond(200, [
          {title: 'Thing1', _id: 'a1xxxxxxxxxxxxxxxxxxxxxx'},
          {title: 'Thing2', _id: 'b2xxxxxxxxxxxxxxxxxxxxxx'},
          {title: 'Thing3', _id: 'c3xxxxxxxxxxxxxxxxxxxxxx'}
        ]);
      Todo.getAll()
        .then(function (all) {
          cachedTodos = all;
          done();
        })
        .catch(done);
      $httpBackend.flush();
    });

    it('addition adds to cache', function (done) {
      var fakeObjFromBackend = {title: 'Thing4', _id: 'd4xxxxxxxxxxxxxxxxxxxxxx'};
      $httpBackend
        .when('POST', '/api/todos')
        .respond(201, fakeObjFromBackend);
      Todo.add()
        .catch(done);
      $httpBackend.flush();
      expect(cachedTodos.pop().title).to.equal('Thing4');
      done();
    });

    it('destruction deletes from cache', function (done) {
      var firstInCache = cachedTodos[0];
      $httpBackend
        .when('DELETE', '/api/todos/a1xxxxxxxxxxxxxxxxxxxxxx')
        .respond(204);
      Todo.destroy('a1xxxxxxxxxxxxxxxxxxxxxx')
        .catch(done);
      $httpBackend.flush();
      expect(cachedTodos).to.not.contain(firstInCache);
      done();
    });

  });

});
