'use strict';

/**
 * @ngdoc filter
 * @name hdilApp.filter:tablenumber
 * @function
 * @description
 * # tablenumber
 * Filter in the hdilApp.
 */
angular.module('hdilApp')
  .filter('tablenumber', function ($filter) {
    return function (input) {

      return angular.isNumber(input)?$filter('number')(Math.ceil(input),0):input;
    };
  });
