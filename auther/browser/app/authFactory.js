app.factory('authFactory', function ($http) {
  user = undefined;
  signup = function (email, password) {
    return $http.post('/api/signup/', {email: email, password: password})
    .then(function(response){
      console.log(response.data);
    });
  };
  login = function (email, password) {
    return $http.post('/api/login/', {email: email, password: password})
    .then(function(response){
      user = response.data;
    }).then(null,console.log('not found'));
  };
  logout = function() {
    return $http.get('api/login/logout').then(function() {
      user = undefined;
      console.log('successfully logged Out');
    });
  };
  getLoggedUser = function(){
    return $http.get('').then(function(){

    })
  }

  return {user: user};
});
