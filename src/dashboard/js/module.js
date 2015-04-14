angular.module('RDash', ['ui.bootstrap', 'ui.router', 'ngCookies', 'ngResource'])
    .factory('Image', ['$resource',function($resource) {
        return $resource('/dockerapi/image/:action',{},{
            'save': { isArray: false, method: 'POST' },
            'edit': { isArray: false, method: 'POST' },
            'delete': { isArray: false, method: 'DELETE' },
            'star': {isArray:false,method:'POST'}
        });
    }])
    .factory('Images', ['$resource',function($resource) {
        return $resource('/dockerapi/images/:id/:action', {id: '@id',action:'@action' }, {
            'query': { isArray: true, method: 'GET' },
            'get': { isArray: false, method: 'GET' }
        });
    }])
    .factory('Star', ['$resource',function($resource){
        return $resource('/dockerapi/star/:uid/:id',{uid:'@uid',id:'@id'},{
            //'star':{isArray:false,method:'POST'},
            //'unstar':{isArray:false,method:'POST'},
            'query':{isArray:false,method:'GET'}
        })
    }]);