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
  .filter('datatable', function (cfservice) {
    return function (input, aggregation) {
      //console.log(input,aggregation)
      if(!input || !input.length || !aggregation){
        return
      }
      var output;

      if(aggregation == 'aggregated'){
        var odabesScale = d3.scaleLinear().rangeRound([1,100]).domain([0,d3.max(input,function(d){return d.value.odabes})])
        output = input.map(function(d){

          var values = d.value;
          values.title = d.key
          values.odabesPercentage = odabesScale(d.value.odabes)
          return values;
        })
      }else if ('evolution') {
        output = d3.nest()
          .key(function(d){return d.key.split(' - ')[1]})
          .entries(input)

        output.forEach(function(d){
          d.title = d.key
          delete d.key
          d.evolution = d.values.map(function(v){
            var elm = {}
            var parseTime = d3.timeParse("%Y/%m");
            elm.date = parseTime(v.key.split(' - ')[0]);
            elm.value = v.value.odabes;
            return elm
          })
          d.odabes = d3.sum(d.values, function(v){return v.value.odabes})
          d.dwnld = d3.sum(d.values, function(v){return v.value.dwnld})
          d.rtng = d3.sum(d.values, function(v){return v.value.rtng})
          d.pgvws = d3.sum(d.values, function(v){return v.value.pgvws})
          delete d.values
        })

      }

      return output;
    };
  });
