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
      //console.log(input,aggregation)
      if(!input || !input.length || !aggregation){
        return
      }
      var output;
      switch (aggregation) {
        case 'aggregated':
          var odabesScale = d3.scaleLinear().rangeRound([1,100]).domain([0,d3.max(input,function(d){return d.value.odabes})])
          output = input.map(function(d){

            var values = d.value;
            values.title = d.key
            values.odabesPercentage = odabesScale(d.value.odabes)
            return values;
          })
          break;
        case 'evolution':
          console.log('evolution',input)
          var test = d3.nest()
            .key(function(d){return d.key.split(' - ')[1]})
            .entries(input)

          var ciao = test.map(function(d){
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

          console.log(ciao)

          // var test = []
          //
          // input.forEach(function(d){
          //   var elm = {}
          //   elm.title = d.key
          //   elm.evolution = d.values.map(function(v){
          //     var elmEvo = {}
          //     var parseTime = d3.timeParse("%Y/%m");
          //     elmEvo.date = parseTime(v.key.split(' - ')[0]);
          //     elmEvo.value = v.value.odabes;
          //     return elmEvo
          //   })
          //   elm.odabes = d3.sum(d.values, function(v){return v.value.odabes})
          //   elm.dwnld = d3.sum(d.values, function(v){return v.value.dwnld})
          //   elm.rtng = d3.sum(d.values, function(v){return v.value.rtng})
          //   elm.pgvws = d3.sum(d.values, function(v){return v.value.pgvws})
          //   test.push(elm)
          // })

          return ciao


          break;
      }

        //return output;
    };
  });
