/**
 * Created by Administrator on 2015/4/21.
 */
angular.module('Image')
.factory('Images', ['$resource',function($resource) {
    return $resource('/dockerapi/images/:id/:action', {id: '@id',action:'@action' }, {
        'query': { isArray: true, method: 'GET' },
        'get': { isArray: false, method: 'GET' }
    });
}])