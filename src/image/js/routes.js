/**
 * Created by zpl on 15-2-2.
 */
'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('Image').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/image.html'
            })
            .state('edit', {
                url: '/edit/:id',
                templateUrl: 'templates/edit.html',
                controller:'EditCtrl'
            })
            .state('term', {
                url:'/term/:base',
                templateUrl:'templates/terminal.html',
                controller:'TerminalCtrl'
            });
    }
]);
