/**
 * Created by zpl on 15-2-2.
 */
angular.module('Image', ['angularTreeview','ui.bootstrap', 'ui.router', 'ngCookies','ngResource','permission'])
    .factory('Image', ['$resource',function($resource) {
        return $resource('/dockerapi/image/:action',{},{
            'save': { isArray: false, method: 'POST' },
            'edit': { isArray: false, method: 'POST' },
            'commit': { isArray: false, method: 'POST' },
            'push': {isArray:false, method: 'POST'}
        });
    }])
    .factory('Images', ['$resource',function($resource) {
        return $resource('/dockerapi/images/:id/:action', {id: '@id',action:'@action' }, {
            'query': { isArray: true, method: 'GET' },
            'get': { isArray: false, method: 'GET' }
        });
    }])
    .factory('User', ['$resource',function($resource) {
        return $resource('/api/sso/:action',{},{
            'login':{isArray:false,method:'POST'},
            'logout':{isArray:false,method:'POST'}
        })
    }])
    .factory('httpInterceptor',['$q','$cookies', function($q,$cookies){
        var isNeedAuth=function(uri,method){
            //check url is contain api
            if(uri.indexOf('api')){
                if(method == 'POST' || method== 'PUT' ||method=='DELETE'){
                    return true;
                }
            }
            return false;
        };
        var httpInterceptor = {
            request: function(config) {
                if (isNeedAuth(config.url,config.method)) {
                    if(($cookies.token)==undefined) {
                        return $q.reject(config);
                    }
                    config.headers['x-session-token'] = $cookies.token;
                }
                return config;
            },
            response : function(response) {
                return response;
            },
            responseError : function(response) {
                if (response.status == 401) {
                    alert('must login');
                    return $q.reject(response);
                } else if (response.status === 404) {
                    alert("404!");
                    return $q.reject(response);
                }
            },
            requestError : function(config){
                return $q.reject(config);
            }
        };
        return httpInterceptor;
    }
    ])
    .filter('trustAsResourceUrl', ['$sce', function($sce) {
        return function(val) {
            return $sce.trustAsResourceUrl(val);
        };
    }])
    .service('loginService',['User','$cookies','$window',function(User,$cookies,$window) {
        var verifyData = {
            App_id:1,
	        App_key:"Ei1F4LeTIUmJeFdO1MfbdkGQpZMeQ0CUX3aQD4kMOMVsRz7IAbjeBpurD6LTvNoI",
	        Token:null
        }
        return {
            isLogin:function(){
                if(($cookies.token)==undefined) {
                    $window.location.href = "http://sso.peilong.me/html/baigoSSO/mypage/login.php?refer=http://image.peilong.me:9000";
                }
                verifyData.Token = $cookies.token;
                User.login({action:'islogin'},verifyData,function(c){
                    if(!c.is_login) {
                        $window.location.href = "http://sso.peilong.me/html/baigoSSO/mypage/login.php?refer=http://image.peilong.me:9000";
                    }
                },function(err){
                    $window.location.href = "http://sso.peilong.me/html/baigoSSO/mypage/login.php?refer=http://image.peilong.me:9000";
                });
            }
        }
    }])
    .service('sharedProperties', function () {
        var image = {};
        var create = false;
        var edit = false;
        return {
            createImages: function (value) {
                create = true;
                image = value;
            },
            editImages: function (value) {
                edit = true;
                image = value;
            },
            getImage: function () {
                return image;
            },
            isCreate:function() {
                return create;
            },
            isEdit:function() {
                return edit;
            },
            imageCreated: function() {
                image = {};
                create = false;
            },
            imageEdited: function() {
                image = {};
                edit = false;
            }
        };
    })
    .directive('isUnique',['$http', function($http){
        var name;
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                //ctrl.$parsers.push(function(viewValue) {
                scope.$watch(attrs.ngModel, function (viewValue) {
                //elm.bind('blur',function (evt) {
                    name = scope.username + '-' + viewValue;
                    //$http({
                    //    method: 'GET',
                    //    url: '/dockerapi/images/' + viewValue + '/verify'
                    //}).success(function(data, status, headers, cfg) {
                    //    ctrl.$setValidity('unique', data.IsUnique);
                    //}).error(function(data, status, headers, cfg) {
                    //    ctrl.$setValidity('unique', false);
                    //});
                });
                elm.bind('blur',function(evt) {
                    $http({
                        method: 'GET',
                        url: '/dockerapi/images/' + name + '/verify'
                    }).success(function(data, status, headers, cfg) {
                        ctrl.$setValidity('unique', data.IsUnique);
                    }).error(function(data, status, headers, cfg) {
                        ctrl.$setValidity('unique', false);
                    });
                });
                //element.bind('focus', function(evt) {
                //    element.addClass(FOCUS_CLASS);
                //    scope.$apply(function() {ctrl.$focused = true;});
                //}).bind('blur', function(evt) {
                //    element.removeClass(FOCUS_CLASS);
                //    scope.$apply(function() {ctrl.$focused = false;});
                //});
            }
        };
    }]);