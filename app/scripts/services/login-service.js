'use strict';

/**
 * @ngdoc service
 * @name stockDogApp.login
 * @description
 * # login
 * Service in the stockDogApp.
 */
angular.module('stockDogApp')
  .service('LoginService', function ($http,$q,sessionService) {
    this.login = function(user){
    	var deferred;
    	deferred = $q.defer();
    	$http({
    		method: 'POST',
    		skipAuthorization: true,
    		url: "http://127.0.0.1:8080/login",
    		data: JSON.stringify({"email": user.email,"password": user.password }),
    		headers: {'Content-Type': 'application/json'}
    	}).then(function(res){
    		deferred.resolve(res);
    	}).then(function(error){
    		deferred.reject(error);
    	});
    	return deferred.promise;
    };
    this.isAuthenticated = function(){ 
        return !!sessionService.sesid
    };
    this.isAuthorized = function(authorizedRoles){
        if(!angular.isArray(authorizedRoles)){
            authorizedRoles = [authorizedRoles];
        }
        return (this.isAuthenticated() && authorizedRoles.indexOf(sessionService.rol) !== -1);
    };
  });
