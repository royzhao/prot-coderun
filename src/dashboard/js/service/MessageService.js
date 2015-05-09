/**
 * Created by Administrator on 2015/5/6.
 */
angular.module('RDash')
    .factory('Message', ['$resource',function($resource) {
        return $resource('/api/message/:action/:id', {id: '@id' }, {
            'query': { isArray: true, method: 'GET' },
            'add': { isArray: false, method: 'POST' },
            'read': { isArray: false, method: 'GET' }
        });
    }])