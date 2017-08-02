'use strict';

describe('Filter: tableExclusion', function () {

  // load the filter's module
  beforeEach(module('hdilApp'));

  // initialize a new instance of the filter before each test
  var tableExclusion;
  beforeEach(inject(function ($filter) {
    tableExclusion = $filter('tableExclusion');
  }));

  it('should return the input prefixed with "tableExclusion filter:"', function () {
    var text = 'angularjs';
    expect(tableExclusion(text)).toBe('tableExclusion filter: ' + text);
  });

});
