'use strict';

/**
 * @ngdoc overview
 * @name stockDogApp
 * @description
 * # stockDogApp
 *
 * Main module of the application.
 */
angular
  .module('stockDogApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'mgcrea.ngStrap',
    'googlechart',
    'angular-jwt'
  ])
  .constant('AUTH_EVENTS',{
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-autenticated',
    notAuthorized: 'auth-not-authorized'
  })
  .constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    editor: 'editor',
    guest: 'guest'
  })
  .config(function ($routeProvider, $httpProvider, jwtOptionsProvider, USER_ROLES) {
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';

    jwtOptionsProvider.config({
      whiteListedDomains: ['127.0.0.1'],
      tokenGetter: function(){
        alert("holi token");
        return localStorage.getItem('token');
      }
    });
    $httpProvider.interceptors.push('authInterceptor');
    $httpProvider.interceptors.push('jwtInterceptor');

    $routeProvider
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        controllerAs: 'dashboard',
        data:{
          requireLogin: true,
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
        }
      })
      .when('/watchlist/:listId', {
        templateUrl: 'views/watchlist.html',
        controller: 'WatchlistCtrl',
        data:{
          requireLogin: true,
          authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
        }
        //controllerAs: 'watchlist'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login',
        data:{
          requireLogin: false
        }
      })
      .otherwise({
        redirectTo: '/dashboard',
        data:{}
      });
  }).run(function($rootScope, jwtHelper, $location, AUTH_EVENTS, LoginService){
    $rootScope.$on('$routeChangeStart', function(event, next){
      var authorizedRoles = next.data.authorizedRoles;
      if(next.data.requireLogin){
        if(!LoginService.isAuthenticated()){
          event.preventDefault();
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }else{
          if(!LoginService.isAuthorized(authorizedRoles)){
            event.preventDefault();
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
          }
        }
      }
    });
  });
