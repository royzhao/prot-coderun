/**
 * Created by zpl on 15-2-2.
 */
'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('Home').config(['$httpProvider','$stateProvider', '$urlRouterProvider',
    function($httpProvider,$stateProvider, $urlRouterProvider) {
        $httpProvider.defaults.timeout = 5000;
        //interceptors
        $httpProvider.interceptors.push('httpInterceptor');
        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('login',{
                templateUrl: function (){
                    //TODO mock login
                    window.location.href = ssoUrl+window.location.href;
                }
            })
            .state('index',{
                url:"/",
                templateUrl:'templates/index.html'
            })
    }
]);
