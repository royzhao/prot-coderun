angular.module('Home')
    .factory('Image', ['$resource',function($resource) {
        return $resource('/api/image/:action',{},{
            'save': { isArray: false, method: 'POST' },
            'edit': { isArray: false, method: 'POST' },
            'delete': { isArray: false, method: 'DELETE' },
            'star': {isArray:false,method:'POST'},
            'fork': {isArray:false,method:'POST'}
        });
    }])

