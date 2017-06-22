vodApp.factory('httpFactory', function($http) {

  var CONFIG = {

    MOVIES_API: 'https://demo2697834.mockable.io',
    SERVICE_API: 'https://still-escarpment-8617.herokuapp.com/api',
    //SERVICE_API: 'http://localhost:3000/api', 
    DEFAULT_VIDEO_TILE: 'http://lorempixel.com/214/317/?t=26'
  };

  var url = "http://localhost:3000/login"
  var factory = {};

  factory.login = function(data) {
    return $http.post(url + '/login', data);
  };

  factory.signup = function(user) {
    return $http.post(url + '/signup', user);
  };

  factory.forgotPassword = function(data) {
    return $http.post(url + '/forgotPassword', data);
  };

  factory.getVideos = function() {
    return $http.get(CONFIG.MOVIES_API + '/movies');
  }

  factory.favouritesAndHistory = function(data) {
    return $http.post(url + '/favouriteAndHistory', data);
  };

  factory.getHistory = function(data) {
    return $http.post(url + '/getHistory', data);
  };
  return factory;
})


