'use strict';

/**
 * @ngdoc function
 * @name hdilApp.controller:ExploreCtrl
 * @description
 * # ExploreCtrl
 * Controller of the hdilApp
 */
angular.module('hdilApp')
  .controller('ExploreCtrl', function ($scope, apiservice, cfservice,$filter, $timeout) {

    // models
    $scope.collapseModel = {
      odabes: false,
      categorie: true,
      tipologie: true,
      datasets: true,
      tempo: true,
    }

    $scope.filtersModel = {
      categorie:{},
      tipologie:{},
      datasets:{}
    }

    $scope.dimensionModel = 'ctgry';

    $scope.odabesModel = 'aggregated';

    $scope.normModel = false;

    $scope.searchDatasets = '';

    $scope.showDatasetsList = false;

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

    $scope.sliderTime = {
        options: {
          translate: function(date) {
            if (date){
              var formatTime = d3.timeFormat("%B %Y");
              return formatTime(date);
            }else {
              return '';
            }

          },
          noSwitching:true
        }
    };

    $scope.refreshSlider = function () {
      $timeout(function () {
        $scope.$broadcast('rzSliderForceRender');
      });
    };

    // table

    $scope.dataTable;
    $scope.dataTableHeaders;
    $scope.headerDict = {
      'odabes': 'odabes',
      'dwnld': 'download',
      'pgvws':'visualizzazioni',
      'rtng': 'voti',
      'ctgry': 'categoria',
      'type': 'tipologia',
      'dts_id': 'dataset'
    }

    // pagination
    $scope.tableItemsPerPage = 100;
    $scope.tableCurrentPage = 1;
    $scope.tableTotalItems = 0;
    $scope.tablePagMaxSize = 10;
    $scope.tableOffset = $scope.tableItemsPerPage * ($scope.tableCurrentPage-1);

    // get data
    var datasetId = '4m2z-j67g.json';

    apiservice.getDatasetInfo(datasetId)
      .then(
        function(data){
          var formatTime = d3.timeFormat("%d/%m/%Y");
          $scope.lastModified = formatTime(new Date(data.viewLastModified*1000))
        },
        function(error){
            $scope.errors = error;
        }
      );

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
                  anno_mese: d.anno_mese
                }
            })

            data = data.filter(function(d){
              return d.ctgry && d.dts_id && d.tipo
            })

            $scope.dts_dict = d3.map(data, function(d) { return d.dts_id; })

            cfservice.add(data);

            $scope.dataTable = cfservice.aggregated($scope.dimensionModel)

            $scope.tableTotalItems = $scope.dataTable.length;
            $scope.dataTableHeaders = ["title","odabes","viz","dwnld","pgvws","rtng"];

            $scope.categorie = cfservice.ctgrysSingle().all();
            $scope.categorie.forEach(function(d){
                $scope.filtersModel.categorie[d.key] = true;
            })
            $scope.tipologie = cfservice.typesSingle().all();
            $scope.tipologie.forEach(function(d){
                $scope.filtersModel.tipologie[d.key] = true;
            })

            $scope.datasets = cfservice.dts_idsSingle().all();
            $scope.datasets.forEach(function(d){
                $scope.filtersModel.datasets[d.key] = true;
            })

            $scope.sliderTime.options.stepsArray = d3.timeMonth.range(cfservice.date().bottom(1)[0].date, cfservice.date().top(1)[0].date)
            $scope.sliderTime.minValue = $scope.sliderTime.options.stepsArray[0];
            $scope.sliderTime.maxValue = $scope.sliderTime.options.stepsArray[$scope.sliderTime.options.stepsArray.length-1];
            $scope.sliderTime.options.onChange = $scope.changeFilterTime;

            $scope.totalDatasets = cfservice.dts_idsSingle().size();

          },function(error){
            $scope.errors = error;
          });

      },function(error){
        $scope.errors = error;
      });

      /* change filters*/


      $scope.changeFilterCtgry = function(){
        var filter  = d3.entries($scope.filtersModel.categorie)
          .filter(function(d){
            return d.value
          })
          .map(function(d){
            return d.key;
          })
        cfservice.ctgrySingle().filter(function(d){
          return filter.indexOf(d) > -1;
        });
      }

      $scope.changeFilterType = function(){
        var filter  = d3.entries($scope.filtersModel.tipologie)
          .filter(function(d){
            return d.value
          })
          .map(function(d){
            return d.key;
          })
        cfservice.typeSingle().filter(function(d){
          return filter.indexOf(d) > -1;
        });
      }

      $scope.changeFilterDatasets = function(){
        var filter  = d3.entries($scope.filtersModel.datasets)
          .filter(function(d){
            return d.value
          })
          .map(function(d){
            return d.key;
          })
        cfservice.dts_idSingle().filter(function(d){
          return filter.indexOf(d) > -1;
        });
      }

      $scope.changeFilterTime = function(sliderId, modelValue, highValue, pointerType){
        cfservice.date().filter(function(d){
          return d.getTime() >= modelValue.getTime() && d.getTime() <= highValue.getTime();
        });
      }

      $scope.filterSelectAll = function(filter){
        for (var key in $scope.filtersModel[filter]) {
            $scope.filtersModel[filter][key] = true;
        }
        switch (filter) {
          case 'categorie':
            $scope.changeFilterCtgry();
            break;
          case 'tipologie':
            $scope.changeFilterType();
            break;
          case 'datasets':
            $scope.changeFilterDatasets()
            break;
        }
      }

      $scope.filterDeSelectAll = function(filter){
        for (var key in $scope.filtersModel[filter]) {
            $scope.filtersModel[filter][key] = false;
        }
        switch (filter) {
          case 'categorie':
            $scope.changeFilterCtgry();
            break;
          case 'tipologie':
            $scope.changeFilterType();
            break;
          case 'datasets':
            $scope.changeFilterDatasets()
            break;
        }

      }

      $scope.pageChange = function(){
        $scope.tableOffset = $scope.tableItemsPerPage * ($scope.tableCurrentPage-1);
      }

      var getPaginationTotal = function(datatable,odabesModel) {
        var total = $filter('tableExclusion')(datatable).length
        return total;
      }

      /* watchers */
      $scope.$watch('dimensionModel', function(newValue, oldValue){
        if(newValue != oldValue && newValue){
          switch ($scope.odabesModel) {
            case 'aggregated':
              $scope.dataTable = cfservice.aggregated(newValue)
              break;
            case 'evolution':
              $scope.dataTable = cfservice.evolution(newValue)
              break;
          }
          $scope.tableTotalItems = getPaginationTotal($scope.dataTable);
        }
      })

      $scope.$watch('odabesModel', function(newValue, oldValue){
        if(newValue != oldValue && newValue){
          switch (newValue) {
            case 'aggregated':
              $scope.dataTable = cfservice.aggregated($scope.dimensionModel)
              break;
            case 'evolution':
              $scope.dataTable = cfservice.evolution($scope.dimensionModel)
              break;
          }
          $scope.tableTotalItems = getPaginationTotal($scope.dataTable);
        }
      })

      $scope.$watchGroup(['sliders.dwnld.value','sliders.pgvws.value','sliders.rtng.value'], function(newValue, oldValue){
        cfservice.upadateOdabes(newValue)

        //mock updates! find a better way!
        cfservice.typeSingle().filter('API')
        cfservice.typeSingle().filterAll()
      })

      cfservice.cf().onChange(function(event){
        if(!$scope.dataTable){
          return;
        }
        if(event == 'filtered'){
          switch ($scope.odabesModel) {
            case 'aggregated':
              $scope.dataTable = cfservice.aggregated($scope.dimensionModel)
              break;
            case 'evolution':
              $scope.dataTable = cfservice.evolution($scope.dimensionModel)
              break;
          }
          $scope.tableTotalItems = getPaginationTotal($scope.dataTable);
        }
      })


  });
