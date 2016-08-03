angular.module('starter.controllers', [])

.controller('RedditCtrl', function($http, $scope) {
    $scope.stories = []
    $http.get('https://www.reddit.com/r/Android/new/.json')
      .success(function(response){
        angular.forEach(response.data.children, function(child){
          $scope.stories.push(child.data);
        } );
      })
  })




.controller('ChatsCtrl', function($scope, Chats) {

  //$scope.$on('$ionicView.enter', function(e) {
  //});


  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
