'use strict';
angular.module('stockDogApp')
.controller('MainCtrl', function ($scope, $location, WatchlistService, USER_ROLES, LoginService, logoutService, AUTH_EVENTS, pruebaService) {
	// [1] Populate watchlists for dynamic nav links
	$scope.watchlists = WatchlistService.query();
	// [2] Using the $location.path() function as a $watch expression
	$scope.$watch(function () {
		return $location.path();
	}, function (path) {
		if (_.includes(path, 'watchlist')) {
			$scope.activeView = 'watchlist';
		} else {
			$scope.activeView = 'dashboard';
		}
	});
	//Usuario actual
	$scope.currentUser = null;
	$scope.userRoles = USER_ROLES;
	$scope.isAuthorized = LoginService.isAuthorized;

	$scope.setCurrentUser = function(user){
		$scope.currentUser = user;
	}
	$scope.logout = function(){
		logoutService.logout();
		//$scope.setCurrentUser(null);
		$location.path('/login');
	};
	$scope.prueba = function(){
		pruebaService.prueba().then(function(res){
			if(res.data && res.data.success){
				alert(res.data.data.saludo);
			}
		});
	};
	$scope.$on(AUTH_EVENTS.notAuthenticated, function(res){
		alert("holi");
	});
 });