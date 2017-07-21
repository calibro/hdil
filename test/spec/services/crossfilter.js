'use strict';

describe('Service: crossfilter', function () {

  // load the service's module
  beforeEach(module('hdilApp'));

  // instantiate service
  var crossfilter;
  beforeEach(inject(function (_crossfilter_) {
    crossfilter = _crossfilter_;
  }));

  it('should do something', function () {
    expect(!!crossfilter).toBe(true);
  });

});
