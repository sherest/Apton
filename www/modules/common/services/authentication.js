angular
  .module("app.Authentication", ["firebase"])
  .provider("AuthenticationService", function () {

    var serverPath;

    return {
      $get: ["$firebaseAuth", "$rootScope", "$ionicLoading", function ($firebaseAuth, $rootScope, $ionicLoading) {

        if (serverPath) {
          var ref = new Firebase(serverPath);
          var authObj = $firebaseAuth(ref);


          authObj.$onAuth(function (authUser) {
            $rootScope.$broadcast("onAuth", authUser);
            $ionicLoading.hide();
          })
        }

        return {
          loginWithEmail: function (user) {
            $ionicLoading.show({
              template: 'Loading...'
            });

            authObj.$authWithPassword({
              email: user.email,
              password: user.password
            }).then(function (authData) {
              //code goes here..
              $ionicLoading.hide();
            }).catch(function (error) {
              $ionicLoading.hide();
              console.error("Authentication failed:", error.message);
            });
          },

          loginWithGoogle: function () {
            $ionicLoading.show({
              template: 'Loading...'
            });

            authObj.$authWithOAuthPopup("google").then(function (authData) {
              //code goes here..
              $ionicLoading.hide();
            }).catch(function (error) {
              $ionicLoading.hide();
              console.error("Authentication failed:", error);
            });
          },

          logout: function () {
            $ionicLoading.show({
              template: 'Loading...'
            });
            authObj.$unauth();
          },

          register: function (user) {
            $ionicLoading.show({
              template: 'Loading...'
            });

            authObj.$createUser({
              email: user.email,
              password: user.password
            }).then(function (regUser) {
              $ionicLoading.hide();
              $rootScope.$broadcast("onRegister", regUser);
            }).catch(function (error) {
              $ionicLoading.hide();
              console.error("Authentication failed:", error.message);
            });
          },

          requireAuth: function () {
            return authObj.$requireAuth();
          }

        };
      }],

      setServer: function (path) {
        serverPath = path;
      }
    }
  });
