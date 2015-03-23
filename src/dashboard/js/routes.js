'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$httpProvider','$stateProvider', '$urlRouterProvider',
    function($httpProvider,$stateProvider, $urlRouterProvider) {

        $httpProvider.defaults.timeout = 5000;
        //interceptors
        $httpProvider.interceptors.push('httpInterceptor');

        ////set rest
        //RestangularProvider.setBaseUrl('http://localhost:8001/api')

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/dashboard.html'
            })
            .state('login',{
                templateUrl: function (){
                    //TODO mock login
                    alert('mock 登陆页面,先重定向到百度去')
                    window.location.href = 'http://www.baidu.com/';
                }
            })
            .state('mycode', {
                url: '/mycode',
                templateUrl: 'templates/mycode_table.html'
            }).state('newcode',{
                url: '/newcode',
                templateUrl: 'templates/newcode.html',
                data: {
                    permissions: {
                        except: ['anonymous'],
                        redirectTo: 'login'
                    }
                }
            }).state('myimage', {
                url: '/myimage',
                templateUrl: 'templates/myimage_table.html'
            }).state('codehub', {
                url: '/codehub',
                templateUrl: 'templates/codehub_table.html'
            }).state('imagehub', {
                url: '/imagehub',
                templateUrl: 'templates/imagehub_table.html'
            }).state('code', {
                url: '/code/:codeid',
                templateUrl: 'templates/single_code.html'
            }).state('image', {
                url: '/image/:imageid',
                templateUrl: 'templates/single_image.html'
            });
    }
]);