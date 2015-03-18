/**
 * Created by zpl on 15-2-2.
 */
angular.module('Image', ['angularTreeview','ui.bootstrap', 'ui.router', 'ngCookies','ngResource'])
    .factory('CImage', ['$resource',function($resource) {
        return $resource('/dockerapi/image/create',{},{
            'save': { isArray: false, method: 'POST' }
        });
    }])
    .factory('EImage', ['$resource',function($resource) {
        return $resource('/dockerapi/image/edit',{},{
            'edit': { isArray: false, method: 'POST' }
        });
    }])
    .factory('Images', ['$resource',function($resource) {
        return $resource('/dockerapi/images/:id/:action', {id: '@id',action:'@action' }, {
            'query': { isArray: true, method: 'GET' },
            'get': { isArray: false, method: 'GET' }
        });
    }]);