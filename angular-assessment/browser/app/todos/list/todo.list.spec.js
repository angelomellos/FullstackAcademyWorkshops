'use strict';
/* globals module inject chai */
var expect = chai.expect;

describe('Todos list', function () {

  /*------------------
      CONFIGURATION
  /------------------*/

  // load our Angular application from scratch
  beforeEach(module('angularAssessment'));

  describe('controller `TodoListCtrl`', function () {

    var $scope, Todo, $state, todos;
    beforeEach(inject(function($rootScope, $q, $controller, _$state_){
      // a new scope object we can manipulate directly
      $scope = $rootScope.$new();
      // fake resolved `todos` (doesn't rely on your state resolve)
      todos = [];
      // a fake `Todo` factory (doesn't rely on your `Todo` factory)
      // `add` method returns a promise for an object with an _id
      Todo = {
        add: chai.spy(function () {
          return $q.when({_id: '123'});
        })
      };
      // replace `$state.go` with a func that sets a `_mockUrl` property
      $state = _$state_;
      $state.go = function () {
        $state._mockUrl = $state.href.apply($state, arguments);
      };
      // instantiate the controller and inject our test objects
      $controller('TodoListCtrl', {
        $scope: $scope,
        todos: todos,
        Todo: Todo,
        $state: $state
      });
    }));

    /*------------------
        TEST SPECS
    /------------------*/

    it('places injected `todos` on the scope', function(){
      expect($scope.todos).to.equal(todos);
    });

    describe('`.setCategory` scope method', function () {

      xit('properly alters `$scope.filterByCompleted`', function () {
        // if you are curious how this is being used, check out line 15 of todo.list.html
        $scope.setCategory('all');
        expect($scope.filterByCompleted).to.equal('');
        $scope.setCategory('completed');
        expect($scope.filterByCompleted).to.equal(true);
        $scope.setCategory('active');
        expect($scope.filterByCompleted).to.equal(false);
      });

    });

    describe('`.isActiveCategory` scope method', function () {

      it('returns boolean for category string based on whether or not it is selected', function () {
        // if you are curious how this is being used, check out line 4,7,10 of todo.list.html
        $scope.setCategory('all');
        expect($scope.isActiveCategory('all')).to.equal(true);
        expect($scope.isActiveCategory('completed')).to.equal(false);
        expect($scope.isActiveCategory('active')).to.equal(false);
        // dynamic — it should accurately report the active category
        $scope.setCategory('completed');
        expect($scope.isActiveCategory('all')).to.equal(false);
        expect($scope.isActiveCategory('completed')).to.equal(true);
        expect($scope.isActiveCategory('active')).to.equal(false);
      });

    });

    describe('`.addTodo` scope method', function () {

      it('uses the `Todo` factory', function () {
        $scope.addTodo();
        expect(Todo.add).to.have.been.called.once.with($scope.toAdd);
      });

      // feel free to return here once you've defined the edit state
      it("goes to the todo's edit state after it has been added", function () {
        $scope.addTodo();
        // use `$state.go` to make this work.
        // We modified `$state.go` to change `$state._mockUrl`
        // instead of actually transitioning to a new state.
        $scope.$digest(); // makes settled $q promise call handler
        expect($state._mockUrl).to.equal('/todos/123/edit');
      });

    });

  });

  /*------------------
      CONFIGURATION
  /------------------*/

  describe('state `todos`', function () {

    var Todo, $state, $rootScope;
    beforeEach(inject(function ($q, _$state_, _$rootScope_) {
      $state = _$state_;
      $rootScope = _$rootScope_;
      // a fake Todo factory (doesn't rely on your Todo factory)
      // `getAll` method returns a promise for objects with `_id`s
      Todo = {
        getAll: chai.spy(function () {
          return $q.when([{_id: 'a'}, {_id: 'b'}]);
        })
      };
    }));

    /*------------------
        TEST SPECS
    /------------------*/

    it('url compiles correctly', function () {
      var url = $state.href('todos');
      expect(url).to.equal('/todos');
    });

    it('resolves with all `todos` from the `Todo` factory', function (done) {
      // check that `todos` state resolve's `todos` property is set
      var todoListState = $state.get('todos');
      var fn = todoListState.resolve.todos;
      expect(fn).to.be.a('function');
      // check that the `Todo` factory is used to fetch todos
      var result = fn(Todo);
      expect(Todo.getAll).to.have.been.called.once;
      // check that the results are being returned correctly
      result.then(function(todos){
        expect(todos).to.eql([{_id: 'a'}, {_id: 'b'}]);
        done();
      }).catch(done);
      // test framework stuff: force $q promises to settle
      $rootScope.$digest();
    });

  });

});
