/**
 * Created by zpl on 15-2-2.
 */
'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('Editor').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('editor',{
                url:"/editor/:codeid/:stepid",
                templateUrl:'templates/editor.html'
            })
            .state('show', {
                url: '/show/:codeid/:stepid',
                templateUrl: 'templates/show.html'
            });
    }
]);
