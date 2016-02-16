myApp.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'modules/menu/menu.html',
      controller: 'MenuController',
      requireAuth: true,
      resolve: {
        auth: function (AuthenticationService) {
          return AuthenticationService.requireAuth();
        }
      }
    })

    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'modules/home/home.html'
        }
      }
    })

    .state('login', {
      url: "/login",
      templateUrl: 'modules/login/login.html',
      controller: 'LoginController',
      requireAuth: false
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'modules/register/signup.html',
      controller: 'RegisterController'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise(function () {
    return '/app/home';
  });
});
