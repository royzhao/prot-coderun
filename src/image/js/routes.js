/**
 * Created by zpl on 15-2-2.
 */
'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('Image').config(['$stateProvider', '$urlRouterProvider','$httpProvider',
    function($stateProvider, $urlRouterProvider,$httpProvider) {

        $httpProvider.defaults.timeout = 5000;
        //interceptors
        $httpProvider.interceptors.push('httpInterceptor');
        //For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('login',{
                templateUrl: function (){
                    //TODO mock login
                    window.location.href =ssoUrl+window.location.href;
                }
            })
            .state('index', {
                url: '/',
                templateUrl: 'templates/image.html',
                data: {
                    permissions: {
                        except: ['anonymous'],
                        redirectTo: 'login'
                    }
                }
            })
            .state('edit', {
                url: '/edit/:id',
                templateUrl: 'templates/edit.html',
                controller:'EditCtrl',
                data: {
                    permissions: {
                        except: ['anonymous'],
                        redirectTo: 'login'
                    }
                }
            })
            .state('term', {
                url:'/term/:base',
                templateUrl:'templates/terminal.html',
                controller:'TerminalCtrl',
                data: {
                    permissions: {
                        except: ['anonymous'],
                        redirectTo: 'login'
                    }
                }
            });
    }
]);
