'use strict';

app.config(function($stateProvider) {
	$stateProvider.state('post', {
		url: '/post/:postId',
		templateUrl: 'js/post/post.html',
		controller: 'PostCtrl',
		resolve: {
			users: function(User){
				// GET - > '/api/users'
				return User.findAll();
			}
		}
	});

	$stateProvider.state('post.edit', {
		url: '/post/:postId/edit',
		template: '<p>hello! edit me</p>',
		controller: 'PostCtrl'
	});
});



// add necessary dependencies
app.controller('PostCtrl', function($scope,Post, $stateParams, $state) {


	/* 1. FIND POST
		use state params to retrieve the post id and attach post object to scope
		on controller load
	*/

	Post.find($stateParams.postId)
	.then(function(post)
	{
		$scope.post = post;
	});

	/*
		2. DELETE POST
		create a function that destroys the post, adds an alert that the post has been
		successfully deleted, and redirects to the main state.
	*/

	$scope.delete = function()
	{
		Post.destroy($scope.post._id);
		$state.go('main');
	}

	/*
		3. EDIT POST
		create a function that edits the post, adds an alert that the post has been
		successfully edited, and displays the edited post.

	*/
	$scope.edit = false;
	$scope.editMode = function()
	{
		$scope.edit = !$scope.edit;
	}

	$scope.submit = function(updatedPost)
	{
		$scope.post.DSUpdate(Post,$scope.post._id, {title: $scope.title, content: $scope.content});
		$scope.post.go();
	}

});
