angular.module('RDash', ['ui.bootstrap', 'ui.router', 'ngCookies', 'ngResource'])
    .factory('Image', ['$resource',function($resource) {
        return $resource('/dockerapi/image/:action/:id/:uid',{action:'@action',id:'@id',uid:'@uid'},{
            'save': { isArray: false, method: 'POST' },
            'edit': { isArray: false, method: 'POST' }
        });
    }])
    .factory('Images', ['$resource',function($resource) {
        return $resource('/dockerapi/images/:id/:action', {id: '@id',action:'@action' }, {
            'query': { isArray: false, method: 'GET' },
            'delete':{ isArray: true, method: 'DELETE'}
        });
    }]);