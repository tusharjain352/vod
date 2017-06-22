vodApp.controller('historyCtrl', ['$scope', 'httpFactory','$state', function($scope, httpFactory,$state) {

  var user = JSON.parse(sessionStorage.getItem('user'));
  console.log("historyCtrl loaed",user);
  var data = {
    "userId":user[0]["_id"]
  }
  
  httpFactory.getHistory(data).then(function(res) {
    console.log("history response----------",res.data.result[0].history);
    $scope.history = res.data.result[0].history;
  })
    

}]);
