'use strict';

/**
 * @ngdoc directive
 * @name hdilApp.directive:evolutionaxis
 * @description
 * # evolutionaxis
 */
angular.module('hdilApp')
  .directive('evolutionaxis', function ($timeout) {
    return {
      restrict: 'A',
      replace: false,
      link: function postLink(scope, element, attrs) {
        var selection = d3.select(element[0]);
        var width,
            height,
            chart,
            x;

        $timeout(function(){
          width = parseInt(selection.style("width").replace("px",""));
          height = 15;

          var margin = {top: 0, right: 0, bottom: 0, left: 0},
              chartWidth = width - margin.left - margin.right,
              chartHeight = height - margin.top - margin.bottom;

          chart = selection.append('svg')
          .attr('width', width)
          .attr('height', height)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

          x = d3.scaleTime()
                  .rangeRound([0, chartWidth]);


          x.domain(d3.extent(scope.sliderTime.options.stepsArray))

          chart.append("g")
              .attr('class', 'xAxis')
              .attr("transform", "translate(0," + chartHeight + ")")
              .call(d3.axisTop(x).tickSize(0).tickPadding(0));

        },0,false)

        scope.$watch('scope.sliderTime.options.stepsArray', function(newValue,oldValue) {

          if(newValue != oldValue && newValue){
            $timeout(function(){
              x.domain(d3.extent(scope.sliderTime.options.stepsArray))
              chart.select('xAxis').call(d3.axisTop(x).tickSize(0).tickPadding(0))
            },0,false)
          }

        });
      }
    };
  });
