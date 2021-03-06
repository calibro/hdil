'use strict';

/**
 * @ngdoc service
 * @name hdilApp.apiservice
 * @description
 * # apiservice
 * Factory in the hdilApp.
 */
angular.module('hdilApp')
  .factory('apiservice', function ($http, $q) {

    var resourceEnpoint = 'https://www.dati.lombardia.it/resource/';
    var viewEndpoint = 'https://www.dati.lombardia.it/views/';
    var token = "TBT9Tm1QSXZ4rGrsVGYYIbRrG";

    return {

      getRowsCount : function(datasetId){
        var params = {
          "$$app_token" : token,
          "$query": 'select count(*) as count'
        }

        var url = resourceEnpoint + datasetId;
        var deferred = $q.defer();

        $http.get(url, {params:params})
          .then(
            function(response){
              deferred.resolve(response.data);
            },
            function(err){
              deferred.reject(err);
            }
          )
        return deferred.promise;
      },
      getDataset : function(datasetId, limit){

        var params = {
          "$$app_token" : token,
          "$limit": limit
        }

        var url = resourceEnpoint + datasetId;

        var deferred = $q.defer();
        $http.get(url, {params:params})
          .then(
            function(response){
              deferred.resolve(response.data);
            },
            function(err){
              deferred.reject(err);
            }
          )
        return deferred.promise;
      },
      getDatasetInfo: function(datasetId){

        var params = {
          "$$app_token" : token
        }

        var url = viewEndpoint + datasetId;

        var deferred = $q.defer();
        $http.get(url, {params:params})
          .then(
            function(response){
              deferred.resolve(response.data);
            },
            function(err){
              deferred.reject(err);
            }
          )
        return deferred.promise;
      }

    };
  });
