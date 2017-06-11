vodApp.controller('loginCtrl', ['$scope', 'httpFactory', function($scope, httpFactory) {

    $scope.userLogin = {};

    $scope.newUser = {};

    $scope.forgot = {};

    $scope.login = function() {
        httpFactory.login($scope.userLogin).then(function(response) {
            if (response && response.data && response.data.statusCode == 200) {
                $scope.userLogin = {};
                alert(response.data.statusMessage)
            } else {
                $scope.userLogin = {};
                alert("Error!")
            }
        })
    }

    $scope.signup = function() {
        httpFactory.signup($scope.newUser).then(function(response) {
            if (response && response.data && response.data.statusCode == 200) {
                $scope.newUser = {};
                alert(response.data.statusMessage)
            } else {
                $scope.newUser = {};
                alert("Error!")
            }
        })
    }

    $scope.forgotPassword = function() {

    }


}]);
