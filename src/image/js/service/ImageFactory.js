/**
 * Created by Administrator on 2015/4/21.
 */
angular.module('Image')
    .factory('Image', ['$resource',function($resource) {
        return $resource('/dockerapi/image/:action',{},{
            'save': { isArray: false, method: 'POST' },
            'edit': { isArray: false, method: 'POST' },
            'commit': { isArray: false, method: 'POST' },
            'push': {isArray:false, method: 'POST'}
        });
    }])