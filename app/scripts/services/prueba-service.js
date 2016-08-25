'use strict';

/**
 * @ngdoc service
 * @name stockDogApp.pruebaService
 * @description
 * # pruebaService
 * Service in the stockDogApp.
 */
angular.module('stockDogApp')
  .service('pruebaService', function ($http, $q) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.prueba = function(){
    	var deferred = $q.defer();
    	$http.post('http://127.0.0.1:8000/server').then(function(res){
    		deferred.resolve(res);
    	},
    	function(res){
    		deferred.reject(res);
    	});
    	return deferred.promise;
    }
  });
