// define a `Todo` factory that uses AJAX calls to
// read and write from the backend Todo models. The methods
// should all return promises for the *data* of the server responses.
app.factory('Todo', function($http){
  var destroyed = [];

  return {

    getOne : function(id) {
      return $http.get('/api/todos/' + id).then(function (response){
        return response.data;
      });
    },

    getAll : function() {
      return $http.get('/api/todos').then(function (response){
        destroyed.forEach(function(todo){
          response.data.push(todo);
        });
        return response.data;
      });
    },

    destroy : function(id) {
      return $http.get('/api/todos/' + id).then(function (response){
        destroyed.push(response.data);
        console.log(destroyed);
        return $http.delete('/api/todos/' + id).then(function(response){
          return response.data;
        });
      });
    },

    add : function(body) {
      return $http.post('/api/todos', body).then(function (response){
        return response.data;
      });
    },

    update : function(id, body) {
      return $http.put('/api/todos/' + id, body).then(function (response){
        return response.data;
      });
    },

  };
});
