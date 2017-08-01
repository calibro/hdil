'use strict';

/**
 * @ngdoc function
 * @name hdilApp.controller:ExploreCtrl
 * @description
 * # ExploreCtrl
 * Controller of the hdilApp
 */
angular.module('hdilApp')
  .controller('ExploreCtrl', function ($scope, apiservice, cfservice,$filter) {

    // doing stuff
    $scope.collapseModel = {
      odabes: false,
      categorie: true,
      tipologie: true,
      datasets: true,
      tempo: true
    }

    $scope.filtersModel = {
      categorie:{},
      tipologie:{}
    }

    $scope.dimensionModel = 'ctgry';

    $scope.odabesModel = 'aggregated';

    $scope.normModel = false;

    $scope.sliders = {}

    $scope.sliders.dwnld = {
      value: 0.5,
      options: {
        floor: 0.0,
        ceil: 1.0,
        precision:1,
        step:0.1
      }
    };

    $scope.sliders.pgvws = {
      value: 0.5,
      options: {
        floor: 0.0,
        ceil: 1.0,
        precision:1,
        step:0.1
      }
    };


    $scope.sliders.rtng = {
      value: 0.5,
      options: {
        floor: 0.0,
        ceil: 1.0,
        precision:1,
        step:0.1
      }
    };

    // $scope.slider.pgvws = {
    //   min: 100,
    //   max: 180,
    //   options: {
    //     floor: 0,
    //     ceil: 450
    //   }
    // };

    // table

    $scope.dataTable;
    $scope.dataTableHeaders;

    // get data
    var datasetId = '4m2z-j67g.json';

    apiservice.getRowsCount(datasetId)
      .then(function(data){
        var limit = data[0].count;
        apiservice.getDataset(datasetId,limit)
          .then(function(data){

            var data = data.map(function(d){
              var dwnld = d.dwnld?+d.dwnld:0;
              var pgvws = d.pgvws?+d.pgvws:0;
              var rtng = d.rtng?+d.rtng:0;
              var odabes = Math.round((dwnld+pgvws+rtng)/3);
                return {
                  ctgry :d.ctgry,
                  dts_id: d.dts_id,
                  date: new Date(+d.anno_mese.split('/')[0],+d.anno_mese.split('/')[1]-1),
                  tipo: d.tipo,
                  nome: d.nome,
                  lnk_data: d.lnk_data,
                  dwnld: dwnld,
                  pgvws: pgvws,
                  rtng: rtng,
                  odabes: odabes,
                  anno_mese: d.anno_mese
                }
            })

            data = data.filter(function(d){
              return d.ctgry && d.dts_id && d.tipo
            })

            cfservice.add(data);


            $scope.dataTable = $filter('datatable')(cfservice.ctgrys().all(),$scope.odabesModel);
            $scope.dataTableHeaders = ["title","odabes","dwnld","pgvws","rtng"];

            $scope.categorie = cfservice.ctgrysSingle().all();
            $scope.categorie.forEach(function(d){
                $scope.filtersModel.categorie[d.key] = true;
            })
            $scope.tipologie = cfservice.typesSingle().all();
            $scope.tipologie.forEach(function(d){
                $scope.filtersModel.tipologie[d.key] = true;
            })
            //cfservice.type().filterAll()

          },function(error){
            $scope.errors = error;
          });

      },function(error){
        $scope.errors = error;
      });

  });
