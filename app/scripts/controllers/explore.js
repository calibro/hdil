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

            data.forEach(function(d){
              if(isNaN(d.odabes)){
                console.log(d)
              }
            })
            cfservice.add(data);

            //console.log(cfservice.dates().all())
             console.log(cfservice.ctgrys().all())
             console.log(cfservice.types().all())
            //cfservice.ctgry().filter('Agricoltura')
          //   var subgroup = cfservice.fakedates().all()
          //   subgroup = subgroup.filter(function(d){
          //     return d.key.split(' - ')[1] == 'Agricoltura'
          //   })
           //
          //  console.log(subgroup)
          //console.log(cfservice.dates().all())



          },function(error){
            $scope.errors = error;
          });

      },function(error){
        $scope.errors = error;
      });
  });
