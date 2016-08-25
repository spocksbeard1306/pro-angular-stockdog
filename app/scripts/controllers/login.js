'use strict';

/**
 * @ngdoc function
 * @name stockDogApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the stockDogApp
 */
angular.module('stockDogApp')
  .controller('LoginCtrl', function ($scope,$rootScope,LoginService,AUTH_EVENTS,sessionService,jwtHelper,$location) {
    $scope.credentials = {
    	email: '',
    	password: ''
    };
    $scope.login = function(credentials){
		LoginService.login(credentials).then(function(res){
			if(res.data && res.data.success){
				$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
				//Almacenar el token en el local storage
                localStorage.setItem('token', res.data.token);
                //Decodificar el token
                var pyl = jwtHelper.decodeToken(res.data.token);
                //Almacenar la sesion en el servicio
                sessionService.create(pyl.sesid,pyl.id,pyl.nombre,pyl.rol);
                $scope.setCurrentUser(sessionService);
                $location.path('/dashboard');
			}else{
				$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
			}
			$scope.loginFailMsg = res.data.err_msg;
		});
    }
  });
