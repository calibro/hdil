'use strict';

describe('Filter: filterDatasetsExclusion', function () {

  // load the filter's module
  beforeEach(module('hdilApp'));

  // initialize a new instance of the filter before each test
  var filterDatasetsExclusion;
  beforeEach(inject(function ($filter) {
    filterDatasetsExclusion = $filter('filterDatasetsExclusion');
  }));

  it('should return the input prefixed with "filterDatasetsExclusion filter:"', function () {
    var text = 'angularjs';
    expect(filterDatasetsExclusion(text)).toBe('filterDatasetsExclusion filter: ' + text);
  });

});
