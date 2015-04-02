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
            'commit': { isArray: false, method: 'POST' }
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
            imageCreated: function() {
                image = {};
                create = false;
            },
            imageEdited: function() {
                image = {};
                edit = false;
            }
        };
    });