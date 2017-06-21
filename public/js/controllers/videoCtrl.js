vodApp.controller('videoCtrl', ['$scope', '$stateParams', 'httpFactory', function($scope, $stateParams, httpFactory) {

  $scope.isFavourite = false;
  var user = JSON.parse(sessionStorage.getItem('user'));
  // console.log("videoCtrl loaded", $stateParams);
  if ($stateParams && $stateParams.video) {
    $scope.video = $stateParams.video;
    sessionStorage.setItem('video', JSON.stringify($scope.video));
  } else {
    $scope.video = JSON.parse(sessionStorage.getItem('video'));
  }

  $scope.addToFav = function(val) {
    var data = {
      "id":$scope.video.id,
      "email":user[0].email
    };
    if (val) {
      data['isFavourite'] = val;
    } else {
      data['isFavourite'] = val;
    }
    httpFactory.favourites(data).then(function(response){
    	console.log(response);
      if(val){
        $scope.isFavourite = true;
      }else{
        $scope.isFavourite = false;
      }
    })
  }
}]);
