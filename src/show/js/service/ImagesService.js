angular.module('Show')
    .factory('Images', ['$resource',function($resource) {
        return $resource('/api/images/:id/:action', {id: '@id',action:'@action' }, {
            'query': { isArray: true, method: 'GET' },
            'get': { isArray: false, method: 'GET' }
        });
    }])
