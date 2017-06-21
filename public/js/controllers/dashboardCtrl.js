vodApp.controller('dashboardCtrl', ['$scope', 'httpFactory', 'toastr','$state', function($scope, httpFactory, toastr,$state) {

  console.log("dashboardCtrl loaded")
  var scrollPos = 0;
  var scrollWidth = 800;

  httpFactory.getVideos().then(function(res) {
    console.log(res);
    $scope.videos = res.data.entries;
  })

  $scope.scroll = function(direction) {
    if (direction == 'LEFT')
      scrollPos -= scrollWidth;
    else
      scrollPos += scrollWidth;

    $('#slide-container').animate({
      scrollLeft: scrollPos
    }, 800);
  }

  $scope.selectVideo = function(video) {
        console.log(video);
        $scope.selectedVideo = video;
        $state.go('videoDetails',{'video':$scope.selectedVideo});
  }

}]);
