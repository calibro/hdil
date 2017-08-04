'use strict';

describe('Filter: tablenumber', function () {

  // load the filter's module
  beforeEach(module('hdilApp'));

  // initialize a new instance of the filter before each test
  var tablenumber;
  beforeEach(inject(function ($filter) {
    tablenumber = $filter('tablenumber');
  }));

  it('should return the input prefixed with "tablenumber filter:"', function () {
    var text = 'angularjs';
    expect(tablenumber(text)).toBe('tablenumber filter: ' + text);
  });

});
