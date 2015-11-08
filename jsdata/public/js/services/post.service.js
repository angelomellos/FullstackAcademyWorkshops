'use strict';

app.factory('Post', function(DS, $state) {
	var Post = DS.defineResource({
      name: 'posts',
			methods: {
				go: function() {
					$state.go('post', {postId: this._id});
				}
			},
			relations: {
				belongsTo: {
					users: {
						localField: 'author',
						localKey: 'authorId'
					}
				}
			}
  });

  return Post;

}).run(function(Post) {});
