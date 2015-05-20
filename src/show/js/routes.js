'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('Show').config(['$httpProvider','$stateProvider', '$urlRouterProvider',
    function($httpProvider,$stateProvider, $urlRouterProvider) {

        $httpProvider.defaults.timeout = 5000;
        //interceptors
        $httpProvider.interceptors.push('httpInterceptor');

        ////set rest
        //RestangularProvider.setBaseUrl('http://localhost:8001/api')

        // For unmatched routes
        $urlRouterProvider.otherwise('/codehub');

        // Application routes
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'templates/codehub_table.html'
            })
            .state('login',{
                url:'/login',
                templateUrl: function (){
                    //TODO mock login
                    alert('请登陆/注册');
                    window.location.href = ssoUrl;
                }
            })
            //.state('mycode', {
            //    url: '/mycode',
            //    templateUrl: 'templates/mycode_table.html'
            //}).state('newcode',{
            //    url: '/newcode',
            //    templateUrl: 'templates/newcode.html',
            //    data: {
            //        permissions: {
            //            except: ['anonymous'],
            //            redirectTo: 'login'
            //        }
            //    }
            //})
            //.state('myimage', {
            //    url: '/myimage',
            //    templateUrl: 'templates/myimage_table.html'
            //})
            .state('codehub', {
                url: '/codehub',
                templateUrl: 'templates/codehub_table.html'
            })
            .state('imagehub', {
                url: '/imagehub',
                templateUrl: 'templates/imagehub_table.html'
            })
            .state('code', {
                url: '/code/:codeid',
                templateUrl: 'templates/single_code.html'
            })
            .state('issue',{
                url:'/code/:codeid/issue/:issueid',
                templateUrl: 'templates/issue.html'
            })
            .state('newissue',{
                url:'/code/:codeid/newissue',
                templateUrl: 'templates/newissue.html'
            })
            //.state('addstep',{
            //    url:'/addstep/:codeid',
            //    templateUrl: 'templates/newstep.html',
            //    data: {
            //        permissions: {
            //            except: ['anonymous'],
            //            redirectTo: 'login'
            //        }
            //    }
            //})
            //.state('CodeEditor',{
            //    url:'/editor/code/:codeid',
            //    templateUrl:'templates/newcode.html',
            //    data: {
            //        permissions: {
            //            except: ['anonymous'],
            //            redirectTo: 'login'
            //        }
            //    }
            //})
            //.state('StepEditor',{
            //    url:'/editor/step/:codeid/:stepid',
            //    templateUrl:'templates/newstep.html',
            //    data: {
            //        permissions: {
            //            except: ['anonymous'],
            //            redirectTo: 'login'
            //        }
            //    }
            //})
            .state('image', {
                url: '/image/:imageid',
                templateUrl: 'templates/single_image.html'
            });
    }
]);