vodApp.controller('loginCtrl', ['$scope', 'httpFactory', 'toastr', '$state', function($scope, httpFactory, toastr, $state) {

  $scope.userLogin = {};

  $scope.newUser = {};

  $scope.forgot = {};

  $scope.login = function() {
    httpFactory.login($scope.userLogin).then(function(response) {
      if (response && response.data && response.data.statusCode == 200) {
        $scope.userLogin = {};
        sessionStorage.setItem('user', JSON.stringify(response.data.result));
        toastr.success(response.data.statusMessage, 'success!');
        $state.go('dashboard');
        // alert(response.data.statusMessage)
      } else {
        $scope.userLogin = {};
        toastr.error(response.data.statusMessage, 'Error');
        //alert("Error!")
      }
    })
  }

  $scope.signup = function() {
    httpFactory.signup($scope.newUser).then(function(response) {
      if (response && response.data && response.data.statusCode == 200) {
        $scope.newUser = {};
        toastr.success(response.data.statusMessage, 'success!');
        // alert(response.data.statusMessage)
      } else {
        $scope.newUser = {};
        toastr.error(response.data.statusMessage, 'Error');
        // alert("Error!")
      }
    })
  }

  $scope.forgotPassword = function() {
    httpFactory.forgotPassword($scope.forgot).then(function(response) {
      //console.log("forgotPassword response",response);
      if (response && response.data && response.data.statusCode == 200) {
        $scope.newUser = {};
        toastr.success(`Reset Link Sent!!
          Check Your Email`, 'success!');
      } else {
        $scope.newUser = {};
        toastr.error(response.data.statusMessage, 'Error');
      }
    })
  }


}]);
