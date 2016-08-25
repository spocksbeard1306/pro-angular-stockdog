'use strict';

/**
 * @ngdoc service
 * @name stockDogApp.authInterceptor
 * @description
 * # authInterceptor
 * Service in the stockDogApp.
 */
angular.module('stockDogApp')
  .service('authInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
    this.responseError = function(response){
    	alert(JSON.stringify(response));
    	$rootScope.$broadcast({
    		401: AUTH_EVENTS.notAuthenticated,
    		403: AUTH_EVENTS.notAuthorized,
    		419: AUTH_EVENTS.sessionTimeout,
    		440: AUTH_EVENTS.sessionTimeout
    	}[response.status], response);
    	return $q.reject(response);
    }
  });
