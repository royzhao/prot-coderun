angular.module('Editor')
    .factory('Images', ['$resource',function($resource) {
        return $resource(baseUrl+'/images/:id/:action', {id: '@id',action:'@action' }, {
            'query': { isArray: true, method: 'GET' },
            'get': { isArray: false, method: 'GET' }
        });
    }])