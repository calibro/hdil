'use strict';

/**
 * @ngdoc filter
 * @name hdilApp.filter:datatable
 * @function
 * @description
 * # datatable
 * Filter in the hdilApp.
 */
angular.module('hdilApp')
  .filter('datatable', function () {
    return function (input, aggregation) {
      var output;

      if(aggregation == 'aggregated'){
        var odabesScale = d3.scaleLinear().rangeRound([0,100]).domain([0,d3.max(input,function(d){return d.value.odabes})])
        output = input.map(function(d){

          var values = d.value;
          values.title = d.key
          values.odabesPercentage = odabesScale(d.value.odabes)
          return values;
        }).sort(function(a,b){
          return d3.descending(a.odabes,b.odabes)
        })
      }

      return output;
    };
  });
