'use strict';

/**
 * @ngdoc overview
 * @name hdilApp
 * @description
 * # hdilApp
 *
 * Main module of the application.
 */
angular
  .module('hdilApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'angular-loading-bar',
    'rzModule',
    'ui.checkbox',
    'vs-repeat'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'home'
      })
      .when('/explore', {
        templateUrl: 'views/explore.html',
        controller: 'ExploreCtrl',
        controllerAs: 'explore'
      })
      .otherwise({
        redirectTo: '/home'
      });
  });
