angular.module('starter.controllers', [])

.controller('RedditCtrl', function($http, $scope) {
    $scope.stories = [];


    function loadStories(params, callback) {
      $http.get('https://www.reddit.com/r/funny/new/.json', {params:params})
        .success(function(response){
          var stories = [];
          angular.forEach(response.data.children, function(child){
            $scope.stories.push(child.data);
          });
          callback(stories);
        });
    }

    $scope.loadOlderStories = function(){
      var params = {};
      if($scope.stories.length > 0){
        params['after'] = $scope.stories[$scope.stories.length - 1].name;
      }
      loadStories(params, function(olderStories){
        $scope.stories = $scope.stories.concat(olderStories);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    };

    $scope.loadNewerStories = function() {
      var params = {'before': $scope.stories[0].name};
      loadStories(params, function(newerStories){
        $scope.stories = newerStories.concat($scope.stories);
        $scope.$broadcast('scroll.refreshComplete');
      });

    };

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
