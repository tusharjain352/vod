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
  
  var histData = {
    "videoId": $scope.video.id,
    "userId": user[0]._id
  };
  
  httpFactory.favouritesAndHistory(histData).then(function(response) {
    console.log("history response",response);
    if (val) {
      $scope.isFavourite = true;
    } else {
      $scope.isFavourite = false;
    }
  })

  $scope.addToFav = function(val) {
    var data = {
      "videoId": $scope.video.id,
      "userId": user[0]._id
    };
    if (val) {
      data['isFavourite'] = val;
    } else {
      data['isFavourite'] = val;
    }
    httpFactory.favouritesAndHistory(data).then(function(response) {
      console.log(response);
      if (val) {
        $scope.isFavourite = true;
      } else {
        $scope.isFavourite = false;
      }
    })
  }
}]);
