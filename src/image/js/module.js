/**
 * Created by zpl on 15-2-2.
 */
angular.module('Image', ['angularTreeview','ui.bootstrap', 'ui.router', 'ngCookies','ngResource'])
    .factory('Image', ['$resource',function($resource) {
        return $resource('/dockerapi/image/:action',{action:'@action'},{
            'save': { isArray: false, method: 'POST' },
            'edit': { isArray: false, method: 'POST' }
        });
    }])
    .factory('Images', ['$resource',function($resource) {
        return $resource('/dockerapi/images/:id/:action', {id: '@id',action:'@action' }, {
            'query': { isArray: true, method: 'GET' }
        });
    }]);