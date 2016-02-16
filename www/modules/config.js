myApp.config(["AuthenticationServiceProvider", "SERVER", function(AuthenticationServiceProvider, SERVER){
	AuthenticationServiceProvider
	.setServer(SERVER.USER_DOMAIN);
}]);

myApp.config(function ($httpProvider) {
  // Use x-www-form-urlencoded Content-Type
  //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  //$httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

  $httpProvider.interceptors.push('customeInterceptor');
});

myApp.factory('customeInterceptor',['$timeout','$injector', '$q',function($timeout, $injector, $q) {

  var $http;

  function showLoadingText() {
    $injector.get("$ionicLoading").show({
      template: 'Loading...',
      animation: 'fade-in',
      showBackdrop: true
    });
  };

  function hideLoadingText(){
    $injector.get("$ionicLoading").hide();
  };

  return {
    request : function(config) {

      //$http = $http || $injector.get("$http");

      //if($http.pendingRequests.length >= 1) {
      showLoadingText();
      //}
      return config;
    },
    response : function(response) {

      $http = $http || $injector.get("$http");

      if($http.pendingRequests.length < 1){
        hideLoadingText();
        console.log('Response received with interceptor');
      }

      return response;
    },
    requestError : function (err) {
      hideLoadingText();
      console.log('Request Error logging via interceptor');
      return err;
    },
    responseError : function (err) {
      hideLoadingText();
      console.log('Response error via interceptor');
      return $q.reject(err);
    }
  }
}]);
