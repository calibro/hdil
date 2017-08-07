(function(){

  var hdil = window.hdil || (window.hdil = {});

  hdil.timeline = function(){

  var height = 600,
      width = 600,
      dispatch = d3.dispatch("brushEnd"),
      resetBrush = false,
      normalize = false,
      duration = 1000,
      maxY,
      extent;


  function timeline(selection){
    selection.each(function(data){
      var chart;
      var margin = {top: 0, right: 0, bottom: 0, left: 0},
          chartWidth = width - margin.left - margin.right,
          chartHeight = height - margin.top - margin.bottom;

      if (selection.select('svg').empty()){
        chart = selection.append('svg')
        .attr('width', width)
        .attr('height', height)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      }
      else
      {
        chart = selection.select('svg')
        .attr('width', width)
        .attr('height', height)
          .select("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      }

      var y = d3.scaleLinear()
                .rangeRound([chartHeight,0])

      var x = d3.scaleTime()
              .rangeRound([0, chartWidth]);

      var area = d3.area()
          .x(function(d) { return x(d.date); })
          .y1(function(d) { return y(d.value); })
          .curve(d3.curveStep)

      var timeRange = d3.timeMonth.range(extent);
      var dateMap = data.map(function(d){return d.date.getTime()})
      timeRange.forEach(function(d){
        if(dateMap.indexOf(d.getTime()) == -1){
          data.push({date:d,value:null})
        }
      })
      //x.domain(d3.extent(data, function(d) { return d.date; }));
      x.domain(extent);
      if(normalize){
        y.domain([0, maxY]);
      }else{
        y.domain([0, d3.max(data, function(d) { return d.value; })]);
      }

      area.y0(y(0));

      var path = chart.selectAll('path').data([data])

      path.enter().append("path")
        .attr("fill", "#00C5CA")
        .attr("d", area)
        //.attr('fill-opacity',0)
        //.transition()
        //.attr('fill-opacity',1)


      // path.transition().duration(duration)
      //   .attr("d", area);

      path.attr("d", area);


      // var bar = chart.selectAll("rect")
      //     .data(bins, function(d,i){
      //       return i
      //     })
      //
      // bar.enter().append("rect")
      //   .attr("class", "bar")
      //   .attr("x", 1)
      //   .attr("transform", function(d) {
      //     return "translate(" + x(d.x0) + "," + (chartHeight - y(d.length)) + ")";
      //   })
      //   .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
      //   .attr("height", function(d) {
      //     return y(d.length)
      //   });
      //
      // bar.transition().duration(duration)
      //   .attr("transform", function(d) {
      //     return "translate(" + x(d.x0) + "," + (chartHeight - y(d.length)) + ")";
      //   })
      //   .attr("height", function(d) {
      //     return y(d.length)
      //   });

      // var xAxis = chart.select('.xAxis');
      //
      // if(xAxis.empty()){
      //   chart.append("g")
      //       .attr('class', 'xAxis')
      //       .attr("transform", "translate(0," + chartHeight + ")")
      //       .call(
      //         d3.axisBottom(x).ticks(3)
      //         .tickFormat(function (d) {
      //                 return x.tickFormat(3,d3.format(",.1s"))(d)
      //         })
      //
      //       );
      // }else{
      //   xAxis.call(d3.axisBottom(x).ticks(3))
      // }

      // var yAxis = chart.select('.yAxis');
      //
      // if(yAxis.empty()){
      //   chart.append("g")
      //       .attr('class', 'yAxis')
      //       .call(d3.axisRight(y.copy().range([chartHeight,0])).tickSizeOuter(0).ticks(4));
      // }else{
      //   yAxis.transition().duration(duration).call(d3.axisRight(y.copy().range([chartHeight,0])).tickSizeOuter(0).ticks(4));
      // }


      // var brush = d3.brushX()
      //   .extent([[0, 0], [chartWidth, chartHeight]])
      //   .on("brush", movehandles)
      //   .on("end", brushed)
      //
      // var brushG = chart.select('.brush')
      // var handle;
      //
      // if(brushG.empty()){
      //   chart.append("g")
      //       .attr("class", "brush")
      //       .call(brush)
      //
      //   handle = chart.select('.brush').selectAll(".handle--custom")
      //     .data([{type: "w"}, {type: "e"}])
      //     .enter().append("circle")
      //       .attr("class", "handle--custom")
      //       .attr("fill", "#666")
      //       .attr("cursor", "ew-resize")
      //       .attr('cx', 0)
      //       .attr('cy', 0)
      //       .attr('r',4)
      //
      //   chart.select('.brush')
      //       .call(brush.move, x.range())
      // }else{
      //   handle = chart.select('.brush').selectAll(".handle--custom");
      // }
      //
      // if(resetBrush){
      //   chart.select('.brush')
      //       .call(brush.move, x.range())
      // }
      //
      // function brushed() {
      //   var s = d3.event.selection;
      //   if(!s){
      //     chart.select('.brush')
      //         .call(brush.move, x.range())
      //     s = x.range();
      //   }
      //   var newDateFilter = [x.invert(s[0]), x.invert(s[1])]
      //   handle.attr("display", null).attr("transform", function(d, i) { return "translate(" + s[i] + "," + chartHeight / 2 + ")"; });
      //   dispatch.call("brushEnd", this, newDateFilter);
      // }
      //
      // function movehandles() {
      //   var s = d3.event.selection
      //   if(!s){
      //     chart.select('.brush')
      //         .call(brush.move, x.range())
      //   }
      //   handle.attr("display", null).attr("transform", function(d, i) { return "translate(" + s[i] + "," + chartHeight / 2 + ")"; });
      // }

    }); //end selection
  } // end timeline

  timeline.height = function(x){
    if (!arguments.length) return height;
    height = x;
    return timeline;
  }

  timeline.width = function(x){
    if (!arguments.length) return width;
    width = x;
    return timeline;
  }

  timeline.extent = function(x){
    if (!arguments.length) return extent;
    extent = x;
    return timeline;
  }

  timeline.maxY = function(x){
    if (!arguments.length) return maxY;
    maxY = x;
    return timeline;
  }

  timeline.normalize = function(x){
    if (!arguments.length) return normalize;
    normalize = x;
    return timeline;
  }

  timeline.duration = function(x){
    if (!arguments.length) return duration;
    duration = x;
    return timeline;
  }

  timeline.resetBrush = function(x){
    if (!arguments.length) return resetBrush;
    resetBrush = x;
    return timeline;
  }

  timeline.on = function() {
    var value = dispatch.on.apply(dispatch, arguments);
    return value === dispatch ? timeline : value;
  }

  return timeline;

}

})();
