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
        ctgrys = ctgry.group().reduce(reduceAdd,reduceRemove,reduceInitial),
        type = cf.dimension(function(d) { return d.tipo}),
        types = type.group().reduce(reduceAdd,reduceRemove,reduceInitial),
        date = cf.dimension(function(d) { return d.date }),
        dates = date.group(d3.timeMonth).reduce(reduceAdd,reduceRemove,reduceInitial),
        dts_id = cf.dimension(function(d) { return d.dts_id}),
        dts_ids = dts_id.group().reduce(reduceAdd,reduceRemove,reduceInitial),
        date_cat = cf.dimension(function(d) { return d.anno_mese + ' - ' + d.ctgry}),
        date_cats = date_cat.group().reduce(reduceAdd,reduceRemove,reduceInitial),
        date_dts_id = cf.dimension(function(d) { return d.anno_mese + ' - ' + d.dts_id}),
        date_dts_ids = date_dts_id.group().reduce(reduceAdd,reduceRemove,reduceInitial);

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

    function reduceAdd(p, v) {
      ++p.count;
      p.odabes += v.odabes;
      p.dwnld += v.dwnld;
      p.pgvws += v.pgvws;
      p.rtng += v.rtng;
      return p;
    }

    function reduceRemove(p, v) {
      --p.count;
      p.odabes -= v.odabes;
      p.dwnld -= v.dwnld;
      p.pgvws -= v.pgvws;
      p.rtng -= v.rtng;
      return p;
    }

    function reduceInitial() {
      return {count:0, odabes: 0, dwnld: 0, pgvws: 0, rtng: 0};
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
    exports.type = function() { return type};
    exports.types = function() { return types};
    exports.dts_id = function() { return dts_id};
    exports.dts_ids = function() { return dts_ids};
    exports.date_cat = function() { return date_cat};
    exports.date_cats = function() { return date_cats};
    exports.date_dts_id = function() { return date_dts_id};
    exports.date_dts_ids = function() { return date_dts_ids};
    // exports.partner = function() { return partner};
    // exports.partners = function() { return partners};
    // exports.continent = function() { return continent};
    // exports.continents = function() { return continents};
    // exports.type = function() { return type};
    // exports.types = function() { return types};
    // exports.imp = function() { return all.reduceSum(function(d) { return d.imp; }).value()};
    // exports.exp  = function() { return all.reduceSum(function(d) { return d.exp; }).value()};
    // exports.total  = function() { return all.reduceSum(function(d) { return d.total; }).value()};

    return exports;
  });
