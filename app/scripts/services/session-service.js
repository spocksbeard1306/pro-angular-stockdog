'use strict';

/**
 * @ngdoc service
 * @name stockDogApp.sessionService
 * @description
 * # sessionService
 * Service in the stockDogApp.
 */
angular.module('stockDogApp')
  .service('sessionService', function () {
    this.create = function(sesid, id, nombre, rol){
    	this.sesid = sesid;
    	this.id = id;
    	this.nombre = nombre;
    	this.rol = rol;
    };
    this.destroy = function(){
    	this.sesid = null;
    	this.id = null;
    	this.nombre = null;
    	this.rol = null;
    };
  });
