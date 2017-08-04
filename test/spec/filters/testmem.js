'use strict';

describe('Filter: testmem', function () {

  // load the filter's module
  beforeEach(module('hdilApp'));

  // initialize a new instance of the filter before each test
  var testmem;
  beforeEach(inject(function ($filter) {
    testmem = $filter('testmem');
  }));

  it('should return the input prefixed with "testmem filter:"', function () {
    var text = 'angularjs';
    expect(testmem(text)).toBe('testmem filter: ' + text);
  });

});
