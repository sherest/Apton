myApp.controller('LoginController', function ($scope, $state, AuthenticationService) {

  $scope.loginData = {};

  $scope.doLogin = function () {
    AuthenticationService.loginWithEmail($scope.loginData);
  };

  $scope.loginWithGoogle = function () {
    AuthenticationService.loginWithGoogle();
  };

});
