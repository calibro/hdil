'use strict';

/**
 * @ngdoc service
 * @name hdilApp.crossfilter
 * @description
 * # crossfilter
 * Factory in the hdilApp.
 */
angular.module('hdilApp')
  .factory('cfservice', function () {

    var cf = crossfilter([]),
        ctgry = cf.dimension(function(d) { return d.ctgry}),
        ctgrys = ctgry.group().reduce(reduceAdd,reduceRemove,reduceInitial).order(orderValue),
        ctgrySingle = cf.dimension(function(d) { return d.ctgry}),
        ctgrysSingle = ctgrySingle.group().reduce(reduceAddSingle,reduceRemoveSingle,reduceInitialSingle),
        type = cf.dimension(function(d) { return d.tipo}),
        types = type.group().reduce(reduceAdd,reduceRemove,reduceInitial).order(orderValue),
        typeSingle = cf.dimension(function(d) { return d.tipo}),
        typesSingle = typeSingle.group().reduce(reduceAddSingle,reduceRemoveSingle,reduceInitialSingle),
        date = cf.dimension(function(d) { return d.date }),
        dates = date.group(d3.timeMonth).reduce(reduceAdd,reduceRemove,reduceInitial).order(orderValue),
        dts_id = cf.dimension(function(d) { return d.dts_id}),
        dts_ids = dts_id.group().reduce(reduceAdd,reduceRemove,reduceInitial).order(orderValue),
        dts_idSingle = cf.dimension(function(d) { return d.dts_id}),
        dts_idsSingle = dts_idSingle.group().reduce(reduceAddSingle,reduceRemoveSingle,reduceInitialSingle),
        date_ctgry = cf.dimension(function(d) { return d.anno_mese + ' - ' + d.ctgry}),
        date_ctgrys = date_ctgry.group().reduce(reduceAdd,reduceRemove,reduceInitial).order(orderValue),
        date_type = cf.dimension(function(d) { return d.anno_mese + ' - ' + d.tipo}),
        date_types = date_type.group().reduce(reduceAdd,reduceRemove,reduceInitial).order(orderValue),
        date_dts_id = cf.dimension(function(d) { return d.anno_mese + ' - ' + d.dts_id}),
        date_dts_ids = date_dts_id.group().reduce(reduceAdd,reduceRemove,reduceInitial).order(orderValue);

    // all = cf.groupAll(),
    // date = cf.dimension(function(d) { return d.date }),
    // dates = date.group(d3.timeMonth).reduceSum(function(d){return d.odabes}),
    // ctgry = cf.dimension(function(d) { return d.ctgry}),
    // ctgrys = ctgry.group().reduceSum(function(d){return d.odabes});
    // continent = cf.dimension(function(d){return d.continent }),
    // continents = continent.group().reduce(reduceAddContinent, reduceRemoveContinent, reduceInitialContinent).order(order),
    // type = cf.dimension(function(d){return d.type}),
    // types = type.group();

    // ctgry :d.ctgry,
    // dts_id: d.dts_id,
    // date: new Date(+d.anno_mese.split('/')[0],+d.anno_mese.split('/')[1]-1),
    // tipo: d.tipo,
    // nome: d.nome,
    // lnk_data: d.lnk_data,
    // dwnld: dwnld,
    // pgvws: pgvws,
    // rtng: rtng,
    // odabes: odabes

    var a = 0.5,
        b = 0.5,
        c = 0.5;

    function reduceAddSingle(p, v) {

      if(v.dts_id in p.datasets){
          p.datasets[v.dts_id] += 1
      }
      else{
          p.datasets[v.dts_id] = 1;
          p.count++;
      }
      return p;
    }

    function reduceRemoveSingle(p, v) {

      p.datasets[v.dts_id]--;
     if(p.datasets[v.dts_id] === 0){
         delete p.datasets[v.dts_id];
         p.count--;
     }
     return p;

      return p;
    }

    function reduceInitialSingle() {
      return {count:0, datasets:{}};
    }


    function reduceAdd(p, v) {
      ++p.count;
      p.dwnld += v.dwnld;
      p.pgvws += v.pgvws;
      p.rtng += v.rtng;
      p.odabes = odabes(p.dwnld,p.pgvws,p.rtng)
      return p;
    }

    function reduceRemove(p, v) {
      --p.count;
      p.dwnld -= v.dwnld;
      p.pgvws -= v.pgvws;
      p.rtng -= v.rtng;
      p.odabes = odabes(p.dwnld,p.pgvws,p.rtng)
      return p;
    }

    function reduceInitial() {
      return {count:0, odabes: 0, dwnld: 0, pgvws: 0, rtng: 0};
    }

    function orderValue(d) {
      return d.odabes;
    }

    function odabes(dwnld,pgvws,rtng) {
      return Math.round(((dwnld*a)+(pgvws*b)+(rtng*c))/3); //remove round!!!
    }

    // Decide which dimension/group to expose
    var exports = {};

    exports.add = function(data){ cf.add(data); }; // add new items, as array
    exports.clear = function(){ cf.remove(); };// reset crossfilter
    exports.size = function() { return cf.size(); }; // crossfilter size total
    // exports.all = function() { return all};
    exports.date = function() { return date};
    exports.dates = function() { return dates};
    exports.ctgry = function() { return ctgry};
    exports.ctgrys = function() { return ctgrys};
    exports.ctgrySingle = function() { return ctgrySingle};
    exports.ctgrysSingle = function() { return ctgrysSingle};
    exports.type = function() { return type};
    exports.types = function() { return types};
    exports.typeSingle = function() { return typeSingle};
    exports.typesSingle = function() { return typesSingle};
    exports.dts_id = function() { return dts_id};
    exports.dts_ids = function() { return dts_ids};
    exports.dts_idSingle = function() { return dts_idSingle};
    exports.dts_idsSingle = function() { return dts_idsSingle};
    exports.date_ctgry = function() { return date_ctgry};
    exports.date_ctgrys = function() { return date_ctgrys};
    exports.date_type = function() { return date_type};
    exports.date_types = function() { return date_types};
    exports.date_dts_id = function() { return date_dts_id};
    exports.date_dts_ids = function() { return date_dts_ids};

    exports.cf = function() { return cf};

    exports.evolution = function(dimension) {
      var source;

      switch (dimension) {
        case 'ctgry':
          source = date_ctgrys.all()
          break;
        case 'type':
          source = date_types.all()
          break;
        case 'dts_id':
          source = date_dts_ids.all()
          break;
      }

      var nest = d3.nest()
        .key(function(d){return d.key.split(' - ')[1]})
        .entries(source)

      var output = nest.map(function(d){
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
        return d
      })

      return output
    };

    exports.aggregated = function(dimension) {
      var source;

      switch (dimension) {
        case 'ctgry':
          source = ctgrys.all()
          break;
        case 'type':
          source = types.all()
          break;
        case 'dts_id':
          source = dts_ids.all()
          break;
        default:

      }

      var odabesScale = d3.scaleLinear().rangeRound([1,100]).domain([0,d3.max(source,function(d){return d.value.odabes})])
      var output = source.map(function(d){

        var values = d.value;
        values.title = d.key
        values.odabesPercentage = odabesScale(d.value.odabes)
        return values;
      })

      return output
    };

    exports.upadateOdabes = function(data) {
      a = data[0],
      b = data[1],
      c = data[2]
    };
    // exports.imp = function() { return all.reduceSum(function(d) { return d.imp; }).value()};
    // exports.exp  = function() { return all.reduceSum(function(d) { return d.exp; }).value()};
    // exports.total  = function() { return all.reduceSum(function(d) { return d.total; }).value()};

    return exports;
  });
