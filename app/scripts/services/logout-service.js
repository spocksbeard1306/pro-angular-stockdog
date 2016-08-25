'use strict';

/**
 * @ngdoc service
 * @name stockDogApp.logoutService
 * @description
 * # logoutService
 * Service in the stockDogApp.
 */
angular.module('stockDogApp')
  .service('logoutService', function (sessionService) {
    this.logout = function(){
    	localStorage.removeItem('token');
    	sessionService.destroy();
    };
  });
