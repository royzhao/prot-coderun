/**
 * Created by zpl on 15-2-2.
 */
angular.module('Image', ['angularTreeview','ui.bootstrap', 'ui.router', 'ngCookies','ngResource'])
    //.factory('CImage', ['$resource',function($resource) {
    //    return $resource('/dockerapi/image/create',{},{
    //        'save': { isArray: false, method: 'POST' }
    //    });
    //}])
    //.factory('EImage', ['$resource',function($resource) {
    //    return $resource('/dockerapi/image/edit',{},{
    //        'edit': { isArray: false, method: 'POST' }
    //    });
    //}])
    //.factory('CommitImage', ['$resource',function($resource) {
    //    return $resource('/dockerapi/image/commit',{},{
    //        'commit': { isArray: false, method: 'POST' }
    //    });
    //}])
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
    .filter('trustAsResourceUrl', ['$sce', function($sce) {
        return function(val) {
            return $sce.trustAsResourceUrl(val);
        };
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