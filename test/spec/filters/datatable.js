'use strict';

describe('Filter: datatable', function () {

  // load the filter's module
  beforeEach(module('hdilApp'));

  // initialize a new instance of the filter before each test
  var datatable;
  beforeEach(inject(function ($filter) {
    datatable = $filter('datatable');
  }));

  it('should return the input prefixed with "datatable filter:"', function () {
    var text = 'angularjs';
    expect(datatable(text)).toBe('datatable filter: ' + text);
  });

});
