'use strict';

describe('Filter: odabesScale', function () {

  // load the filter's module
  beforeEach(module('hdilApp'));

  // initialize a new instance of the filter before each test
  var odabesScale;
  beforeEach(inject(function ($filter) {
    odabesScale = $filter('odabesScale');
  }));

  it('should return the input prefixed with "odabesScale filter:"', function () {
    var text = 'angularjs';
    expect(odabesScale(text)).toBe('odabesScale filter: ' + text);
  });

});
