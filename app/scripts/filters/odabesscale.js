'use strict';

/**
 * @ngdoc filter
 * @name hdilApp.filter:odabesScale
 * @function
 * @description
 * # odabesScale
 * Filter in the hdilApp.
 */
angular.module('hdilApp')
  .filter('odabesScale', function () {
    return function (input, aggregation) {
      //console.log(input,aggregation)
      if(!input || !input.length || !aggregation){
        return
      }

      if(aggregation == 'aggregated'){
        var odabesScale = d3.scaleLinear().rangeRound([1,100]).domain([0,d3.max(input,function(d){return d.odabes})])
        input.forEach(function(d){
          d.odabesPercentage = odabesScale(d.odabes)
        })
      }else if ('evolution') {
        console.log(input)
        input = d3.nest()
          .key(function(d){return d.key.split(' - ')[1]})
          .entries(input)

        input.forEach(function(d){
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

      return input;
    };
  });
