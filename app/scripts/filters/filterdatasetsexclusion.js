'use strict';

/**
 * @ngdoc filter
 * @name hdilApp.filter:filterDatasetsExclusion
 * @function
 * @description
 * # filterDatasetsExclusion
 * Filter in the hdilApp.
 */
angular.module('hdilApp')
  .filter('filterDatasetsExclusion', function () {
    return function (input, value, dict) {
      if(!input){
        return
      }

      if(value){
        var output = input.filter(function(d){
          var title = dict.get(d.key).nome;
          return title.indexOf(value) !== -1;
        })
      }else{
        output = input;
      }

      return output
    };
  });
