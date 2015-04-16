angular.module('RDash')
    .factory('Image', ['$resource',function($resource) {
        return $resource('/dockerapi/image/:action',{},{
            'save': { isArray: false, method: 'POST' },
            'edit': { isArray: false, method: 'POST' },
            'delete': { isArray: false, method: 'DELETE' },
            'star': {isArray:false,method:'POST'}
        });
    }])

