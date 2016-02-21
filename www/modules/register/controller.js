myApp.controller('RegisterController', function ($scope, $state, AuthenticationService) {

  $scope.registerData = {};

  $scope.doRegisteration = function () {
    AuthenticationService.register($scope.registerData);
  };

});
