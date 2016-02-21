myApp.controller('MenuController', function ($scope, $state, AuthenticationService) {

  $scope.logout = function () {
    AuthenticationService.logout();
  }

});
