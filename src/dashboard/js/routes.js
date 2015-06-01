'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['flowFactoryProvider','$httpProvider','$stateProvider', '$urlRouterProvider',
    function(flowFactoryProvider,$httpProvider,$stateProvider, $urlRouterProvider) {

        flowFactoryProvider.defaults = {
            target: '/api/upload/pic',
            permanentErrors: [401,404, 500, 501],
            maxChunkRetries: 1,
            chunkRetryInterval: 5000,
            simultaneousUploads: 4,
            singleFile: true
        };
        flowFactoryProvider.on('catchAll', function (event) {
            console.log('catchAll', arguments);
        });

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
                    window.location.href = ssoUrl+window.location.href;
                }
            })
            .state('myinfo',{
                url:'/user/:userid/info',
                templateUrl: 'templates/info.html'
            })
            .state('newissue',{
                url:'/code/:codeid/newissue',
                templateUrl: 'templates/newissue.html'
            })
            .state('issue',{
                url:'/code/:codeid/issue/:issueid',
                templateUrl: 'templates/issue.html'
            })
            .state('newimageissue',{
                url:'/image/:imageid/newissue',
                templateUrl: 'templates/newimageissue.html'
            })
            .state('imageissue',{
                url:'/image/:imageid/issue/:issueid',
                templateUrl: 'templates/imageissue.html'
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
            })
            .state('myimage', {
                url: '/myimage',
                templateUrl: 'templates/myimage_table.html'
            }).state('codehub', {
                url: '/codehub',
                templateUrl: 'templates/codehub_table.html'
            }).state('imagehub', {
                url: '/imagehub',
                templateUrl: 'templates/imagehub_table.html'
            }).state('imagehubpage', {
                url: '/imagehub/:page',
                templateUrl: 'templates/imagehub_table.html'
            }).state('code', {
                url: '/code/:codeid',
                templateUrl: 'templates/single_code.html'
            }).state('addstep',{
                url:'/addstep/:codeid',
                templateUrl: 'templates/newstep.html',
                data: {
                    permissions: {
                        except: ['anonymous'],
                        redirectTo: 'login'
                    }
                }
            }).state('CodeEditor',{
                url:'/editor/code/:codeid',
                templateUrl:'templates/newcode.html',
                data: {
                    permissions: {
                        except: ['anonymous'],
                        redirectTo: 'login'
                    }
                }
            }).state('StepEditor',{
                url:'/editor/step/:codeid/:stepid',
                templateUrl:'templates/newstep.html',
                data: {
                    permissions: {
                        except: ['anonymous'],
                        redirectTo: 'login'
                    }
                }
            }).state('image', {
                url: '/image/:imageid',
                templateUrl: 'templates/single_image.html'
            });
    }
]);