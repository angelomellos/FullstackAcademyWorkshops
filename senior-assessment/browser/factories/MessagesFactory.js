app.factory('MessagesFactory', function ($http) {
  factory = {};
  factory.sendMessage = function (body) {
    return $http.post('/messages', body).then(function(response){
      return response.data;
    });
  }
  factory.getMessagesFrom = function (id) {
    return $http.get('/messages/from/' + id).then(function(response){
      return response.data;
    });
  }
  return factory;
});
