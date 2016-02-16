myApp.controller("MainController", function ($scope, $rootScope, $state, AuthenticationService) {


  var pageLoad = function () {

    bindEvents();
  };

  var bindEvents = function () {

    $rootScope.$on('$stateChangeStart', onStateChangeStartListener);
    $rootScope.$on('$stateChangeError', onStateChangeErrorListener);
    $rootScope.$on("onAuth", onAuthListener);
    $rootScope.$on("onRegister", onRegListener);
  };

  function onStateChangeErrorListener(event, toState, toParams, fromState, fromParams, error) {
    if (error == "AUTH_REQUIRED") {
      event.preventDefault();
      $state.go("login");
    }
  }

  function onStateChangeStartListener(event, toState, toParams, fromState, fromParams) {
    //code goes here

    if ($scope.authUser && (toState.url == "/login" || toState.url == "/signup")) {
      event.preventDefault();
    }
  }

  function onRegListener(event, regUser) {
    if (regUser) {
      console.log("Successfully registered as:", regUser);
      $state.go("app.home");
    }
  }

  function onAuthListener(event, authUser) {

    $scope.authUser = authUser;

    if (authUser) {
      console.log("Logged in as:", $scope.authUser.uid);
      $state.go("app.home");
    } else {
      $state.go("login");
    }
  }

  pageLoad();
});
