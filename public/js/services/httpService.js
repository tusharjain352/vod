vodApp.factory('httpFactory',function($http){
	
	var url = "http://localhost:3000/login"	
	var factory = {};

	factory.login = function(data){
		return $http.post( url + '/login', data );
	};

	factory.signup = function(user){
		return $http.post( url + '/signup', user );
	};

	factory.forgotPassword = function(){

	};

	return factory;
})