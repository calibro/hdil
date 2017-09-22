'use strict';

/**
 * @ngdoc directive
 * @name hdilApp.directive:timeline
 * @description
 * # timeline
 */
angular.module('hdilApp')
  .directive('timeline', function ($timeout) {
    return {
      restrict: 'A',
      replace: false,
      scope: {
        data: '=',
        extent: '=',
        maxy: '=',
        normalize: '='
      },
      link: function postLink(scope, element, attrs) {
        var chart = d3.select(element[0]);
        var chartWidth,
            chartHeight,
            timeline;

        $timeout(function(){
          chartWidth = parseInt(chart.style("width").replace("px",""));
          chartHeight = parseInt(chart.style("height").replace("px",""));

          timeline = hdil.timeline()
                 .width(chartWidth)
                 .height(chartHeight)
                 .extent(scope.extent)
                 .maxY(scope.maxy)

          chart.datum(scope.data).call(timeline)

        },0,false)

        scope.$watch('data', function(newValue,oldValue) {

          if(newValue != oldValue && newValue){
            $timeout(function(){
              chart.datum(newValue).call(timeline.maxY(scope.maxy))
            },0,false)
          }

        },true);

        scope.$watch('normalize', function(newValue,oldValue) {

          if(newValue != oldValue && newValue){
            $timeout(function(){
              chart.call(timeline.normalize(newValue))
            },0,false)
          }else if (newValue != oldValue && !newValue) {
            $timeout(function(){
              chart.call(timeline.normalize(newValue))
            },0,false)
          }
        });
      }
    };
  });
