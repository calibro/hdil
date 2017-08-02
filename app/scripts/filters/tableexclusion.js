'use strict';

/**
 * @ngdoc filter
 * @name hdilApp.filter:tableExclusion
 * @function
 * @description
 * # tableExclusion
 * Filter in the hdilApp.
 */
angular.module('hdilApp')
  .filter('tableExclusion', function () {
    return function (input) {
      if(!input || !input.length){
        return
      }
      var output = input.filter(function(d){
        if(d.odabes == 0 && d.dwnld == 0 && d.pgvws == 0 && d.rtng == 0){
          return false
        }else{
          return true
        }
      })

      return output
    };
  });
