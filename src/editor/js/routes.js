/**
 * Created by zpl on 15-2-2.
 */
'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('Editor').config(['$httpProvider','$stateProvider', '$urlRouterProvider',
    function($httpProvider,$stateProvider, $urlRouterProvider) {
        $httpProvider.defaults.timeout = 800;
        //interceptors
        $httpProvider.interceptors.push('httpInterceptor');
        // For unmatched routes
        $urlRouterProvider.otherwise('/show');

        // Application routes
        $stateProvider
            .state('login',{
                templateUrl: function (){
                    //TODO mock login
                    window.location.href = ssoUrl+window.location.href;
                }
            })
            .state('editor',{
                url:"/editor/:codeid/:stepid",
                templateUrl:'templates/editor.html',
                data: {
                    permissions: {
                        except: ['anonymous'],
                        redirectTo: 'login'
                    }
                }
            })
            .state('show', {
                url: '/show/:codeid/:stepid',
                templateUrl: 'templates/show.html'
            });
    }
]);
