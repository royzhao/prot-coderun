/**
 * Created by zpl on 15-2-2.
 */
'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('Editor').config(['$httpProvider','$stateProvider', '$urlRouterProvider',
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
                    window.location.href = 'http://sso.peilong.me/html/baigoSSO/mypage/login.php?refer=http://image.peilong.me:9000';
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
