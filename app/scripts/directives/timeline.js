'use strict';

/**
 * @ngdoc directive
 * @name hdilApp.directive:timeline
 * @description
 * # timeline
 */
angular.module('hdilApp')
  .directive('timeline', function () {
    return {
      restrict: 'A',
      replace: false,
      scope: {
        data: '='
      },
      link: function postLink(scope, element, attrs) {
        var chart = d3.select(element[0]);

        var chartWidth = parseInt(chart.style("width").replace("px",""));
        var chartHeight = parseInt(chart.style("height").replace("px",""));

        console.log(chartWidth,chartHeight)

        var timeline = hdil.timeline()
               .width(chartWidth)
               .height(20)

        chart.datum(scope.data).call(timeline)
      }
    };
  });
