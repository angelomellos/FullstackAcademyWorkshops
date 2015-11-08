'use  strict';

app.factory('User', function(DS) {
	var User = DS.defineResource({
      name: 'users',
			methods: {
				go: function(id) {
				}
			}
    });

  return User;

}).run(function(User) {});
