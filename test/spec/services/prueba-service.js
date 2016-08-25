'use strict';

describe('Service: pruebaService', function () {

  // load the service's module
  beforeEach(module('stockDogApp'));

  // instantiate service
  var pruebaService;
  beforeEach(inject(function (_pruebaService_) {
    pruebaService = _pruebaService_;
  }));

  it('should do something', function () {
    expect(!!pruebaService).toBe(true);
  });

});
